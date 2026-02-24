import { useState, useEffect, useMemo } from "react"
import { capturePosthog } from "./analytics"

/* ── Flag keys (must match PostHog dashboard) ── */

const FLAG_DIVIDER = "NUF2-0__Bubble-AI__Experiment-Divider-1"
const FLAG_PRICE = "NUF2-0__Bubble-AI__Price-1"
const FLAG_HEADING = "NUF2-0__Bubble-AI__Heading-1"

/* ── Stripe Price IDs ──
 *
 *  Find these in Stripe Dashboard → Products → [your product] → Pricing
 *  Each ID starts with "price_"
 *
 *  Map each A/B variant to the correct Price ID:
 *    price.control   → $17 price (control group)
 *    price.test      → $27 price (price test group)
 *    heading.control → price for heading Var-A group
 *    heading.test    → price for heading Var-B group
 */

const STRIPE = {
  price: {
    control: import.meta.env.VITE_STRIPE_PRICE_CONTROL || "price_1SyIYRBskYNJtWpXtUtJLXSR",
    test:    import.meta.env.VITE_STRIPE_PRICE_TEST    || "price_1T1k4ABskYNJtWpXJvfvhgjP",
  },
  heading: {
    control: import.meta.env.VITE_STRIPE_HEADING_CONTROL || "price_1T1k7iBskYNJtWpXyAn8qAta",
    test:    import.meta.env.VITE_STRIPE_HEADING_TEST    || "price_1T1k9lBskYNJtWpXikTy4UuS",
  },
}

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
    priceId: string
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
          priceId: isTest ? STRIPE.heading.test : STRIPE.heading.control,
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
          priceId: isTest ? STRIPE.price.test : STRIPE.price.control,
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
        priceId: STRIPE.price.control,
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
