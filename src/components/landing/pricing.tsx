import { motion } from "framer-motion"
import {
  Check,
  ArrowRight,
  Flame,
  ShieldCheck,
  Lock,
  Zap,
  Users,
  Briefcase,
  TrendingUp,
  Star,
} from "lucide-react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { trackMeta, capturePosthog } from "@/lib/analytics"
import { useCountdown } from "@/hooks/useCountdown"
import { scrollToSection } from "@/lib/utils"
import { useBubbleAiAbConfig } from "@/lib/experiments"
import { CheckoutModal } from "@/components/landing/embedded-checkout"

/* ── Card feature bullets (concise, high-signal) ── */
const cardFeatures = [
  "Proven framework from 9,000+ portfolio reviews",
  "Ship a live portfolio in 24 hrs using AI for the heavy lifting",
  "Build real case studies, even without client work",
  "See how recruiters screen you in 60 seconds",
  "mentor feedback until you're interview-ready",
  "Complete job-search playbook & interview prep",
]

/* ── Value buckets for left column story ── */
const valueBuckets = [
  {
    icon: Users,
    label: "14-Year Proven Framework",
    description:
      "Not theory — a system refined across 9,000+ real portfolio reviews and 2,900+ alumni.",
  },
  {
    icon: Zap,
    label: "AI-Powered, No Code",
    description:
      "Leverage AI to build and ship a professional portfolio — even if you've never touched code.",
  },
  {
    icon: Briefcase,
    label: "Works Without Client Work",
    description:
      "Build credible, NDA-safe case studies that showcase business thinking — no agency experience needed.",
  },
  {
    icon: TrendingUp,
    label: "Recruiter Insider Access",
    description:
      "Learn exactly how hiring managers screen portfolios in 60 seconds — then beat the filter.",
  },
]

interface PricingProps {
  isCheckoutOpen: boolean
  onCheckoutChange: (open: boolean) => void
}

export function Pricing({ isCheckoutOpen, onCheckoutChange }: PricingProps) {
  const { days, hours, minutes, seconds, isExpired, isPaused } = useCountdown()
  const { pricing, activeExperiment, variant } = useBubbleAiAbConfig()

  return (
    <Section
      id="pricing"
      className="relative overflow-hidden bg-nueve-black py-20 lg:py-32"
    >
      {/* ── Ambient background glows ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/8 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full bg-brand-orange/5 blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center lg:mb-16"
        >
          <span className="inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-orange">
            Limited Access
          </span>
          <h2 className="mt-6 text-nueve-white">
            Join Nueve Folio 2.0
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-white/50">
            Everything you need to build a portfolio that gets you hired
            — mentorship, AI tools, and a proven system.
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
          {/* ─── Left column — value story (below card on mobile) ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 flex flex-col gap-8 lg:order-1"
          >
            <h3 className="text-2xl font-black tracking-tight text-nueve-white sm:text-3xl">
              What you get
            </h3>

            {/* Value buckets grid */}
            <div className="grid gap-5 sm:grid-cols-2">
              {valueBuckets.map((bucket, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
                  className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.04] p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange/15">
                    <bucket.icon className="h-5 w-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-bold text-nueve-white">{bucket.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/50">
                      {bucket.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social proof row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="flex flex-wrap items-center gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.04] px-6 py-5"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-brand-orange text-brand-orange"
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {[
                    { src: "/avatars/alumni-3.png", alt: "Alumni 1" },
                    { src: "/avatars/krystian.png", alt: "Alumni 2" },
                    { src: "/avatars/monique.png", alt: "Alumni 3" },
                  ].map((avatar, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 overflow-hidden rounded-full border-2 border-nueve-black"
                    >
                      <img
                        src={avatar.src}
                        alt={avatar.alt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-sm font-bold text-nueve-white">
                  2,900+ alumni
                </span>
              </div>
            </motion.div>

            {/* Guarantee teaser */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.65 }}
              onClick={() => scrollToSection("guarantee")}
              className="group flex items-center gap-4 text-left"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-nueve-white">
                  30-Day Risk-Free Guarantee
                </p>
                <p className="text-sm text-white/40 transition-colors group-hover:text-white/60">
                  Land an interview or get a full refund. No questions asked.
                </p>
              </div>
            </motion.button>
          </motion.div>

          {/* ─── Right column — checkout card (first on mobile) ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            {/* Orange glow behind card */}
            <div
              className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-b from-brand-orange/20 to-brand-orange-light/10 blur-2xl"
              aria-hidden
            />

            <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-2xl">
              {/* Countdown strip */}
              {!isExpired && !isPaused && (
                <div className="relative flex flex-col items-center justify-center bg-brand-orange px-4 py-8 overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]" />
                  </div>
                  
                  <div className="relative z-10 mb-5 flex items-center gap-2.5 rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-sm">
                    <Flame className="h-5 w-5 shrink-0 text-white animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-white">
                      Early Bird Ends:
                    </span>
                  </div>
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl shadow-nueve-black/10">
                        <span className="text-4xl font-black tabular-nums text-nueve-black">
                          {String(days).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-white">
                        Days
                      </span>
                    </div>
                    
                    <span className="mb-6 text-3xl font-black text-white/60">:</span>
                    
                    <div className="flex flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl shadow-nueve-black/10">
                        <span className="text-4xl font-black tabular-nums text-nueve-black">
                          {String(hours).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-white">
                        Hours
                      </span>
                    </div>
                    
                    <span className="mb-6 text-3xl font-black text-white/60">:</span>
                    
                    <div className="flex flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl shadow-nueve-black/10">
                        <span className="text-4xl font-black tabular-nums text-nueve-black">
                          {String(minutes).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-white">
                        Mins
                      </span>
                    </div>
                    
                    <span className="mb-6 text-3xl font-black text-white/60">:</span>
                    
                    <div className="flex flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl shadow-nueve-black/10">
                        <span className="text-4xl font-black tabular-nums text-nueve-black">
                          {String(seconds).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-white">
                        Secs
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-8 md:p-10">
                {/* Price block */}
                <div className="mb-8 text-center">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-6xl font-black text-nueve-black md:text-7xl">
                      ${pricing.displayPrice}
                    </span>
                    <span className="text-lg font-medium text-text-grey/50">
                      / one-time
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-text-grey/60">
                    Program Starts: Feb 28
                  </p>
                </div>

                {/* Divider */}
                <div className="mb-6 h-px bg-black/5" />

                {/* Feature checklist */}
                <ul className="space-y-3">
                  {cardFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                        <Check
                          className="h-3 w-3 text-brand-orange"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-sm font-medium leading-snug text-nueve-black">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8">
                  <Button
                    variant="nueve"
                    size="lg"
                    rounded="pill"
                    className="group w-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/20 hover:opacity-90"
                    data-meta-event="InitiateCheckout"
                    onClick={() => {
                      trackMeta("InitiateCheckout", {
                        content_name: "Nueve Folio 2.0",
                        value: pricing.displayPrice,
                        currency: "USD",
                      })
                      capturePosthog("InitiateCheckout", {
                        label: "Join Now",
                        path: window.location.pathname,
                        ab_experiment: activeExperiment,
                        ab_variant: variant,
                        price: pricing.displayPrice,
                      })
                      onCheckoutChange(true)
                    }}
                  >
                    <span className="mr-2">Join Now</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                {/* Trust row */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-text-grey/40">
                  <span className="flex items-center gap-1.5">
                    <Lock className="h-3 w-3" />
                    Secure checkout
                  </span>
                  <span className="hidden h-3 w-px bg-black/10 sm:block" aria-hidden />
                  <span>One-time payment</span>
                  <span className="hidden h-3 w-px bg-black/10 sm:block" aria-hidden />
                  <span>Instant access</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        priceId={pricing.priceId}
        abExperiment={activeExperiment}
        abVariant={variant}
        onClose={() => onCheckoutChange(false)}
      />
    </Section>
  )
}
