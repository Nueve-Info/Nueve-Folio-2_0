import { useCallback, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Route,
  BookOpen,
  ClipboardCheck,
  Sparkles,
  LayoutTemplate,
  Lock,
  Check,
} from "lucide-react"

let _stripePromise: ReturnType<typeof loadStripe> | null = null
function getStripePromise() {
  if (!_stripePromise) {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined
    if (!key) throw new Error("Missing VITE_STRIPE_PUBLISHABLE_KEY env var")
    _stripePromise = loadStripe(key)
  }
  return _stripePromise
}

const benefits = [
  {
    icon: Route,
    title: "Verified End-to-End Workflow",
  },
  {
    icon: BookOpen,
    title: "Storytelling Case-Study System",
  },
  {
    icon: ClipboardCheck,
    title: "Recruiter Review Rubric",
  },
  {
    icon: Sparkles,
    title: "AI Prompt Pack",
  },
  {
    icon: LayoutTemplate,
    title: "Plug-and-Play Templates",
  },
] as const

interface CheckoutModalProps {
  isOpen: boolean
  priceId: string
  abExperiment: string
  abVariant: string
  onClose: () => void
}

export function CheckoutModal({
  isOpen,
  priceId,
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
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

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
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Checkout"
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-y-auto rounded-2xl bg-white animate-in fade-in duration-200 lg:flex-row lg:overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-nueve-black transition-colors hover:bg-black/10 lg:bg-white/10 lg:text-white lg:hover:bg-white/20"
              aria-label="Close checkout"
            >
              <X className="h-4 w-4" />
            </button>

            {/* ── Benefits panel (left / top) ── */}
            <div className="shrink-0 bg-gradient-to-b from-white to-brand-orange/[0.03] px-5 py-5 sm:px-8 sm:py-6 lg:w-1/2 lg:overflow-y-auto lg:py-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange lg:text-xs">
                What you'll unlock
              </p>
              <h3 className="mt-1.5 text-lg font-black tracking-tight text-nueve-black lg:mt-2 lg:text-2xl">
                Everything in one program
              </h3>

              <ul className="mt-4 flex flex-col gap-0 divide-y divide-nueve-black/[0.06] lg:mt-8 lg:gap-3 lg:divide-y-0">
                {benefits.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 py-2.5 lg:gap-4 lg:rounded-xl lg:border lg:border-nueve-black/[0.06] lg:bg-nueve-black/[0.02] lg:p-3 lg:py-3 lg:transition-colors lg:hover:border-brand-orange/20 lg:hover:bg-brand-orange/[0.03]"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10 lg:h-10 lg:w-10 lg:bg-white lg:shadow-sm lg:ring-1 lg:ring-black/5">
                      <b.icon className="h-4 w-4 text-brand-orange lg:h-5 lg:w-5" strokeWidth={1.5} />
                    </div>
                    <span className="flex-1 text-[13px] font-semibold text-nueve-black lg:text-sm lg:font-bold">
                      {b.title}
                    </span>
                    <Check className="h-3.5 w-3.5 shrink-0 text-brand-orange/40 lg:hidden" strokeWidth={2.5} />
                    <div className="hidden lg:flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                      <Check className="h-3 w-3 text-brand-orange" strokeWidth={3} />
                    </div>
                  </li>
                ))}
              </ul>
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
