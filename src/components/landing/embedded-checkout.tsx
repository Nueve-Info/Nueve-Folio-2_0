import { useCallback, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  Users,
  MonitorPlay,
  CalendarCheck,
  MessageSquare,
  Rocket,
  Wand2,
  Lock,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

let _stripePromise: ReturnType<typeof loadStripe> | null = null
function getStripePromise() {
  if (!_stripePromise) {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined
    if (!key) throw new Error("Missing VITE_STRIPE_PUBLISHABLE_KEY env var")
    _stripePromise = loadStripe(key)
  }
  return _stripePromise
}

/* ── Tier-specific action plans ── */

interface Step {
  icon: LucideIcon
  title: string
  description: string
}

const DIY_STEPS: Step[] = [
  {
    icon: Mail,
    title: "Check your inbox",
    description: "Welcome email with login credentials arrives instantly",
  },
  {
    icon: MonitorPlay,
    title: "Access the course platform",
    description: "Week 1 opens on March 2nd",
  },
  {
    icon: Wand2,
    title: "Build with AI prompts",
    description: "Use the prompt pack to generate portfolio copy fast",
  },
  {
    icon: CalendarCheck,
    title: "Follow the weekly roadmap",
    description: "New module unlocks each week, one section at a time",
  },
  {
    icon: Rocket,
    title: "Export & launch",
    description: "Publish your portfolio and start getting interviews",
  },
]

const MENTOR_STEPS: Step[] = [
  {
    icon: Mail,
    title: "Check your inbox",
    description: "Welcome email with login credentials arrives instantly",
  },
  {
    icon: Users,
    title: "Join the community",
    description: "Get your invitation to our private group",
  },
  {
    icon: MonitorPlay,
    title: "Access the course platform",
    description: "Week 1 opens on March 2nd",
  },
  {
    icon: CalendarCheck,
    title: "Follow the weekly roadmap",
    description: "New module unlocks each week alongside your cohort",
  },
  {
    icon: MessageSquare,
    title: "Get mentor feedback",
    description: "Submit your work and receive actionable reviews",
  },
  {
    icon: Rocket,
    title: "Complete & launch",
    description: "Finish your portfolio with confidence, week by week",
  },
]

function getStepsForTier(tierName: string): Step[] {
  if (tierName === "Mentor Support") return MENTOR_STEPS
  return DIY_STEPS
}

/* ── Component ── */

interface CheckoutModalProps {
  isOpen: boolean
  priceId: string
  tierName: string
  abExperiment: string
  abVariant: string
  onClose: () => void
}

export function CheckoutModal({
  isOpen,
  priceId,
  tierName,
  abExperiment,
  abVariant,
  onClose,
}: CheckoutModalProps) {
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId,
        ab_experiment: abExperiment,
        ab_variant: abVariant,
        funnel_id: 'NUF2.0__Bubble-AI',
        landing_url: window.location.href,
      }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({})) as { error?: string }
      throw new Error(data.error ?? `HTTP ${res.status}`)
    }

    const data = await res.json() as { clientSecret: string }
    return data.clientSecret
  }, [priceId, abExperiment, abVariant])


  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const steps = getStepsForTier(tierName)

  return (
    <AnimatePresence>
      {isOpen && (
        <div key="checkout-overlay" className="fixed inset-0 z-[60] flex items-center justify-center px-4 pt-4 pb-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-nueve-black/80 backdrop-blur-sm"
            aria-hidden
          />

          {/* Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Checkout"
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-y-auto rounded-2xl bg-white animate-in fade-in duration-200 lg:flex-row lg:overflow-hidden"
          >
            {/* ── Action plan panel (left / top) ── */}
            <div className="shrink-0 bg-gradient-to-b from-white to-brand-orange/[0.03] px-5 py-5 sm:px-8 sm:py-6 lg:w-1/2 lg:overflow-y-auto lg:py-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange lg:text-xs">
                Here's your action plan
              </p>
              <h3 className="mt-1.5 text-lg font-black tracking-tight text-nueve-black lg:mt-2 lg:text-2xl">
                What happens after you sign up
              </h3>

              <ol className="mt-3 flex flex-col gap-0 lg:mt-10">
                {steps.map((step, i) => (
                  <li
                    key={i}
                    className="relative flex gap-2.5 pb-3.5 lg:gap-5 lg:pb-7"
                  >
                    {/* Timeline connector line */}
                    {i < steps.length - 1 && (
                      <div className="absolute left-[13px] top-[30px] bottom-0 w-px bg-brand-orange/15 lg:left-[23px] lg:top-[50px]" />
                    )}

                    {/* Step number circle */}
                    <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 lg:h-12 lg:w-12">
                      <span className="text-[11px] font-black text-brand-orange lg:text-base">{i + 1}</span>
                    </div>

                    {/* Step content */}
                    <div className="flex-1 pt-0.5 lg:pt-2">
                      <p className="flex items-center gap-1.5 text-[12px] font-bold text-nueve-black lg:gap-2 lg:text-base">
                        <step.icon className="h-3 w-3 text-brand-orange/60 lg:h-[18px] lg:w-[18px]" strokeWidth={1.5} />
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-text-grey lg:mt-1 lg:text-sm">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* ── Checkout column (right / bottom) ── */}
            <div className="flex-1 bg-nueve-black lg:overflow-y-auto lg:w-1/2">
              <div className="flex items-center justify-center gap-1.5 px-6 pb-2 pt-6 sm:px-8 lg:pt-10">
                <Lock className="h-3 w-3 text-white/40" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">
                  Secure checkout
                </span>
              </div>

              <div className="px-4 pb-6 sm:px-6 lg:pb-8">
                <div className="overflow-hidden rounded-xl bg-white">
                  <EmbeddedCheckoutProvider
                    stripe={getStripePromise()}
                    options={{ fetchClientSecret }}
                  >
                    <EmbeddedCheckout />
                  </EmbeddedCheckoutProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
