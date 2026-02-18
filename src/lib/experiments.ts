import { useState, useEffect, useMemo } from "react"
import { capturePosthog } from "./analytics"

/* ── Flag keys (must match PostHog dashboard) ── */

const FLAG_DIVIDER = "NUF2-0__Bubble-AI__Experiment-Divider-1"
const FLAG_PRICE = "NUF2-0__Bubble-AI__Price-1"
const FLAG_HEADING = "NUF2-0__Bubble-AI__Heading-1"

/* ── Stripe checkout URLs ── */

const STRIPE = {
  price: {
    control: "https://buy.stripe.com/eVq14meA3gFJ8IxclwgA81E", // $17
    test: "https://buy.stripe.com/4gM4gy2Rl3SX3odclwgA81J",    // $27
  },
  heading: {
    control: "https://buy.stripe.com/fZu4gygIbblpbUJbhsgA81K", // Var-A
    test: "https://buy.stripe.com/bJe00ifE72OTaQF1GSgA81L",    // Var-B
  },
} as const

/* ── Low-level hook: subscribe to PostHog flags ── */

function usePosthogFlag(flagKey: string): string | undefined {
  const [value, setValue] = useState<string | undefined>(() => {
    const raw = window.posthog?.getFeatureFlag(flagKey)
    return typeof raw === "string" ? raw : undefined
  })

  useEffect(() => {
    const ph = window.posthog
    if (!ph) return

    const read = () => {
      const raw = ph.getFeatureFlag(flagKey)
      setValue(typeof raw === "string" ? raw : undefined)
    }

    read()
    ph.onFeatureFlags(read)
  }, [flagKey])

  return value
}

/* ── Exposure tracking (once per session per experiment) ── */

function trackExposure(
  experiment: string,
  variant: string,
  divider: string | undefined,
) {
  const key = `ab_exposed__${experiment}`
  if (sessionStorage.getItem(key)) return
  sessionStorage.setItem(key, "1")
  capturePosthog("$experiment_exposure", {
    ab_experiment: experiment,
    ab_variant: variant,
    divider_variant: divider ?? "unknown",
  })
}

/* ── Public config hook ── */

export type ActiveExperiment = "heading" | "price" | "none"

export interface BubbleAiAbConfig {
  activeExperiment: ActiveExperiment
  variant: string
  heroH1Variant: "A" | "B"
  pricing: {
    displayPrice: 17 | 27
    checkoutUrl: string
  }
}

export function useBubbleAiAbConfig(): BubbleAiAbConfig {
  const divider = usePosthogFlag(FLAG_DIVIDER)
  const priceVariant = usePosthogFlag(FLAG_PRICE)
  const headingVariant = usePosthogFlag(FLAG_HEADING)

  const config = useMemo<BubbleAiAbConfig>(() => {
    const isHeadingBranch = divider === "heading"
    const isPriceBranch = divider !== undefined && !isHeadingBranch

    if (isHeadingBranch) {
      const isTest = headingVariant === "test"
      const variant = isTest ? "B" : "A"
      return {
        activeExperiment: "heading",
        variant,
        heroH1Variant: isTest ? "B" : "A",
        pricing: {
          displayPrice: 17,
          checkoutUrl: isTest ? STRIPE.heading.test : STRIPE.heading.control,
        },
      }
    }

    if (isPriceBranch) {
      const isTest = priceVariant === "test"
      const variant = isTest ? "test" : "control"
      return {
        activeExperiment: "price",
        variant,
        heroH1Variant: "A",
        pricing: {
          displayPrice: isTest ? 27 : 17,
          checkoutUrl: isTest ? STRIPE.price.test : STRIPE.price.control,
        },
      }
    }

    // Flags haven't loaded yet — safe default (control for everything)
    return {
      activeExperiment: "none",
      variant: "control",
      heroH1Variant: "A",
      pricing: {
        displayPrice: 17,
        checkoutUrl: STRIPE.price.control,
      },
    }
  }, [divider, priceVariant, headingVariant])

  // Fire exposure event once flags resolve
  useEffect(() => {
    if (config.activeExperiment === "none") return
    trackExposure(config.activeExperiment, config.variant, divider)
  }, [config.activeExperiment, config.variant, divider])

  return config
}
