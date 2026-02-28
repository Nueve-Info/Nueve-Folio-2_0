import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Flame,
  ShieldCheck,
  Lock,
  Star,
  Video,
  ClipboardCheck,
  BookOpen,
  FlaskConical,
  Bot,
  Code2,
  Users,
  MessageCircle,
  Users2,
  MessageSquareLock,
  Map as MapIcon,
  Grid2x2,
  Briefcase,
  GraduationCap,
  Monitor,
  Clock,
  Plus,
} from "lucide-react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { trackMeta, capturePosthog } from "@/lib/analytics"
import { useCountdown } from "@/hooks/useCountdown"
import { useSpots } from "@/hooks/useSpots"
import { scrollToSection } from "@/lib/utils"
import { useBubbleAiAbConfig } from "@/lib/experiments"
import { CheckoutModal } from "@/components/landing/embedded-checkout"

/* ── Feature lists ── */

type Feature = { icon: React.ElementType; text: string }

const TIER1_FEATURES: Feature[] = [
  { icon: Video, text: "16 pre-recorded step-by-step lessons" },
  { icon: ClipboardCheck, text: "Portfolio audit checklist" },
  { icon: BookOpen, text: "Case study creation workflow" },
  { icon: FlaskConical, text: "Idea validation template" },
  { icon: Bot, text: "Case study AI Agent" },
  { icon: Code2, text: "Code review AI Agent" },
  { icon: Users, text: "Community access" },
]

const TIER2_FEATURES: Feature[] = [
  { icon: MessageCircle, text: "3 personalised 1:1 mentor feedback sessions" },
  { icon: Users2, text: "Weekly group accountability check-ins" },
  { icon: MessageSquareLock, text: "Private Discord community" },
  { icon: MapIcon, text: "Personalised career roadmap" },
  { icon: Grid2x2, text: "3 months free Grid access (job outreach tool)" },
  { icon: Briefcase, text: "Curated job opportunities board" },
]

const TIER3_FEATURES: Feature[] = [
  { icon: GraduationCap, text: "Full 1:1 mentoring program (weekly sessions)" },
  { icon: Monitor, text: "1 month free Claude Code access" },
]

/* ── Tier definitions ── */

const TIERS = [
  {
    name: "Do It Yourself",
    price: 37,
    tagline: "Build your portfolio solo — AI does the heavy lifting for you",
    badge: null as string | null,
    priceId: import.meta.env.VITE_STRIPE_TIER1_PRICE_ID || "",
    access: "1 month of course access",
    features: TIER1_FEATURES,
    inheritedLabel: null as string | null,
    isPopular: false,
    isDark: false,
    ctaVariant: "nueve" as "nueve",
    ctaClassName:
      "group w-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/20 hover:opacity-90",
  },
  {
    name: "Mentor Support",
    price: 57,
    tagline:
      "Mentor accountability + community to complete your career shift",
    badge: "🔥 MOST POPULAR",
    priceId: import.meta.env.VITE_STRIPE_TIER2_PRICE_ID || "",
    access: "Lifetime access + future updates",
    features: TIER2_FEATURES,
    inheritedLabel: "Everything in Do It Yourself, plus:",
    isPopular: true,
    isDark: false,
    ctaVariant: "nueve" as "nueve",
    ctaClassName:
      "group w-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/20 hover:opacity-90",
  },
  {
    name: "Advanced Mentorship",
    price: 1489,
    tagline:
      "Intensive 1:1 mentoring for the most committed career changers",
    badge: null as string | null,
    priceId: import.meta.env.VITE_STRIPE_TIER3_PRICE_ID || "",
    access: "Lifetime access + future updates",
    features: TIER3_FEATURES,
    inheritedLabel: "Everything in Mentor Support, plus:",
    isPopular: false,
    isDark: true,
    ctaVariant: "outline" as "outline",
    ctaClassName:
      "group w-full border-brand-orange text-brand-orange hover:bg-brand-orange/5",
  },
]

/* ── Component ── */

interface PricingProps {
  isCheckoutOpen: boolean
  onCheckoutChange: (open: boolean) => void
}

export function Pricing({ isCheckoutOpen, onCheckoutChange }: PricingProps) {
  const { days, hours, minutes, seconds, isExpired, isPaused } = useCountdown()
  const { pctRemaining } = useSpots()
  const { activeExperiment, variant } = useBubbleAiAbConfig()
  const [selectedPriceId, setSelectedPriceId] = useState("")
  const [selectedTierName, setSelectedTierName] = useState("")
  const [isStripSticky, setIsStripSticky] = useState(false)
  const stripRef = useRef<HTMLDivElement>(null)

  // Natural sticky-bottom: the fixed bar appears the instant the inline strip
  // scrolls fully above the viewport, giving a seamless "sticking" feel.
  useEffect(() => {
    const el = stripRef.current
    if (!el) return

    const check = () => {
      const rect = el.getBoundingClientRect()
      // Stick once the strip's bottom edge scrolls above the viewport top
      setIsStripSticky(rect.bottom <= 0)
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          check()
          ticking = false
        })
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    check()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleEnroll = (tier: (typeof TIERS)[0]) => {
    setSelectedPriceId(tier.priceId)
    setSelectedTierName(tier.name)
    trackMeta("InitiateCheckout", {
      content_name: tier.name,
      value: tier.price,
      currency: "USD",
    })
    capturePosthog("InitiateCheckout", {
      tier: tier.name,
      price: tier.price,
      ab_experiment: activeExperiment,
      ab_variant: variant,
    })
    onCheckoutChange(true)
  }

  return (
    <Section
      id="pricing"
      className="relative overflow-hidden bg-nueve-black py-16 lg:py-24"
      containerClassName="px-5 sm:px-12 lg:px-24 xl:px-36"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/8 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full bg-brand-orange/5 blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* ── Social-proof strip (inline version) ── */}
        <motion.div
          ref={stripRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className={`mx-auto mb-8 max-w-7xl rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 sm:px-6 ${
            isStripSticky ? "invisible" : ""
          }`}
        >
          {/* Mobile: centered two-row layout | Desktop: single row */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-4">
            {/* Row 1 on mobile / Left side on desktop: Stars + Alumni */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-brand-orange text-brand-orange" />
                ))}
              </div>
              <span className="text-xs text-white/30">|</span>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[
                    { src: "/avatars/alumni-3.png", alt: "Alumni 1" },
                    { src: "/avatars/krystian.png", alt: "Alumni 2" },
                    { src: "/avatars/monique.png", alt: "Alumni 3" },
                  ].map((avatar, i) => (
                    <div key={i} className="h-6 w-6 overflow-hidden rounded-full border-2 border-nueve-black sm:h-7 sm:w-7">
                      <img src={avatar.src} alt={avatar.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                    </div>
                  ))}
                </div>
                <span className="text-xs font-bold text-nueve-white sm:text-sm">2,900+ alumni</span>
              </div>
            </div>

            {/* Row 2 on mobile / Right side on desktop: Guarantee */}
            <button onClick={() => scrollToSection("guarantee")} className="group flex items-center gap-2 sm:gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 sm:h-8 sm:w-8">
                <ShieldCheck className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
              </div>
              <span className="text-xs font-bold text-nueve-white sm:text-sm">30-Day Money-Back Guarantee</span>
            </button>
          </div>
        </motion.div>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <span className="inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-orange">
            Limited Access
          </span>
          <h2 className="mt-5 text-nueve-white">Join Nueve Folio 2.0</h2>
          <p className="mx-auto mt-3 max-w-xl text-base font-medium text-white/50">
            Choose your path to a portfolio that gets you hired — one-time
            investment, no subscription, no recurring fees.
          </p>
        </motion.div>

        {/* ── Countdown strip ── */}
        {!isExpired && !isPaused && (
          <motion.div
            id="pricing-countdown"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mx-auto mb-10 max-w-7xl border-y border-white/[0.06] py-6"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

              {/* Left — label + clock */}
              <div className="flex flex-col items-center border-white/[0.06] md:items-start md:border-r md:pr-12">
                <div className="mb-4 flex items-center gap-2">
                  <Flame className="h-4 w-4 animate-pulse text-brand-orange" />
                  <span className="text-sm font-black uppercase tracking-widest text-white/70">
                    Pioneer Access Ends
                  </span>
                </div>
                <div className="flex items-center gap-5">
                  {[
                    { value: days, label: "Days" },
                    { value: hours, label: "Hours" },
                    { value: minutes, label: "Mins" },
                    { value: seconds, label: "Secs" },
                  ].map((unit, i, arr) => (
                    <div key={unit.label} className="flex items-center gap-5">
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-black tabular-nums text-white sm:text-4xl md:text-5xl">
                          {String(unit.value).padStart(2, "0")}
                        </span>
                        <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/30">
                          {unit.label}
                        </span>
                      </div>
                      {i < arr.length - 1 && (
                        <span className="mb-5 text-xl font-black text-white/20">:</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — seats claimed */}
              <div className="flex flex-col items-center md:items-start md:pl-12">
                <div className="mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-orange" />
                  <span className="text-sm font-black uppercase tracking-widest text-white/70">
                    Seats claimed
                  </span>
                </div>
                <div className="flex w-full flex-col items-center md:items-start">
                  <div className="relative mt-1.5 w-4/5">
                    <div className="h-6 w-full overflow-hidden rounded-xl bg-white/[0.06] sm:h-7 md:h-9">
                      <div
                        className="h-full rounded-xl bg-brand-orange transition-[width] duration-700 ease-out"
                        style={{ width: `${100 - pctRemaining}%`, boxShadow: '0 0 24px rgba(248, 129, 13, 0.4)' }}
                      />
                    </div>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black tabular-nums text-white/60">
                      {100 - pctRemaining}%
                    </span>
                  </div>
                  <span className="mt-2.5 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    {pctRemaining}% seats left
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ── 3-card grid ── */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {TIERS.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative border-0 ${
                tier.isPopular ? "order-first z-10 md:order-none" : ""
              }`}
            >
              {/* Subtle orange border glow — popular card */}
              {tier.isPopular && (
                <div
                  className="pointer-events-none absolute -inset-[2px] rounded-[1.9rem] border-[3px] border-brand-orange/10 shadow-[0_0_32px_rgba(248,129,13,0.28)]"
                  aria-hidden
                />
              )}

              {/* Blue glow — dark card */}
              {tier.isDark && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-electric-blue/5 blur-[80px]"
                  aria-hidden
                />
              )}

              {/* Badge — sits on the top border of the card */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-orange px-3.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-brand-orange/30">
                  {tier.badge}
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.12 }}
                className={`relative flex h-full flex-col rounded-[1.5rem] p-5 sm:p-7 ${
                  tier.isDark
                    ? "border border-brand-orange/40 bg-nueve-black text-white"
                    : tier.isPopular
                      ? "border-2 border-brand-orange bg-white"
                      : "border border-brand-orange/40 bg-white"
                }`}
              >
                {/* Name */}
                <h3
                  className={`mt-3 text-center text-xl font-black tracking-tight ${
                    tier.isDark ? "text-white" : "text-nueve-black"
                  }`}
                >
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="mt-4 text-center">
                  <span
                    className={`text-5xl font-black ${
                      tier.isDark ? "text-white" : "text-nueve-black"
                    }`}
                  >
                    ${tier.price.toLocaleString()}
                  </span>
                  <p className="mt-1 text-sm font-black text-brand-orange/70">
                    One-time payment
                  </p>
                </div>

                {/* Access duration — prominent badge */}
                <div
                  className={`mt-4 flex min-h-[3rem] items-center gap-2.5 rounded-xl border px-3.5 py-2.5 ${
                    tier.isDark
                      ? "border-brand-orange/25 bg-brand-orange/10"
                      : "border-brand-orange/20 bg-brand-orange/8"
                  }`}
                >
                  <Clock
                    className="h-4 w-4 shrink-0 text-brand-orange"
                    strokeWidth={2.5}
                  />
                  <span
                    className={`text-sm font-bold ${
                      tier.isDark ? "text-white" : "text-nueve-black"
                    }`}
                  >
                    {tier.access}
                  </span>
                </div>

                {/* Tagline */}
                <p
                  className={`mt-3 min-h-[2.5rem] text-sm leading-relaxed ${
                    tier.isDark ? "text-white/60" : "text-text-grey/60"
                  }`}
                >
                  {tier.tagline}
                </p>

                {/* Divider */}
                <div
                  className={`my-5 h-px ${
                    tier.isDark ? "bg-white/[0.08]" : "bg-black/5"
                  }`}
                />

                {/* Features */}
                <div className="flex-1">
                  <ul className="space-y-3">
                    {tier.inheritedLabel && (
                      <li className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            tier.isDark
                              ? "bg-brand-orange/15"
                              : "bg-brand-orange/10"
                          }`}
                        >
                          <Plus className="h-3 w-3 text-brand-orange" />
                        </div>
                        <span
                          className={`text-sm font-black leading-snug ${
                            tier.isDark ? "text-white/70" : "text-nueve-black"
                          }`}
                        >
                          {tier.inheritedLabel}
                        </span>
                      </li>
                    )}
                    {tier.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            tier.isDark
                              ? "bg-brand-orange/15"
                              : "bg-brand-orange/10"
                          }`}
                        >
                          <feature.icon className="h-3 w-3 text-brand-orange" />
                        </div>
                        <span
                          className={`text-sm font-medium leading-snug ${
                            tier.isDark ? "text-white/70" : "text-nueve-black"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <p className="mb-3 flex items-center justify-center gap-1.5 text-center text-xs font-black uppercase tracking-widest text-brand-orange">
                    <Clock className="h-3 w-3" />
                    Launching March 2nd
                  </p>
                  {tier.isDark ? (
                    <Button
                      variant={tier.ctaVariant}
                      size="lg"
                      rounded="pill"
                      className={tier.ctaClassName}
                      asChild
                    >
                      <a href="https://syh5xi59tr6.typeform.com/to/HtpRsu32" target="_blank" rel="noopener noreferrer">
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  ) : (
                    <Button
                      variant={tier.ctaVariant}
                      size="lg"
                      rounded="pill"
                      className={tier.ctaClassName}
                      onClick={() => handleEnroll(tier)}
                    >
                      <span>Enroll Now</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  )}
                </div>

                {/* Trust row */}
                <div
                  className={`mt-3 flex items-center justify-center text-xs font-medium ${
                    tier.isDark ? "text-white/30" : "text-text-grey/40"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    Secure checkout
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Sticky bottom bar (appears instantly when inline strip sticks) ── */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-nueve-black/90 backdrop-blur-lg ${
          isStripSticky ? "" : "pointer-events-none invisible"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 sm:justify-between sm:px-6 sm:py-3">
          {/* Stars + Alumni (single cluster) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-brand-orange text-brand-orange sm:h-3.5 sm:w-3.5" />
              ))}
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <div className="flex -space-x-1.5 sm:-space-x-2">
                {[
                  { src: "/avatars/alumni-3.png", alt: "Alumni 1" },
                  { src: "/avatars/krystian.png", alt: "Alumni 2" },
                  { src: "/avatars/monique.png", alt: "Alumni 3" },
                ].map((avatar, i) => (
                  <div key={i} className="h-5 w-5 overflow-hidden rounded-full border border-nueve-black sm:h-7 sm:w-7 sm:border-2">
                    <img src={avatar.src} alt={avatar.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
              <span className="text-[11px] font-bold text-nueve-white sm:text-sm">2,900+</span>
            </div>
          </div>

          {/* Guarantee */}
          <button onClick={() => scrollToSection("guarantee")} className="group hidden items-center gap-2.5 sm:flex">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
              <ShieldCheck className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-nueve-white">30-Day Money-Back Guarantee</span>
          </button>
          {/* Mobile: compact guarantee */}
          <button onClick={() => scrollToSection("guarantee")} className="flex items-center gap-1.5 sm:hidden">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[11px] font-bold text-nueve-white">30-Day Guarantee</span>
          </button>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        priceId={selectedPriceId}
        tierName={selectedTierName}
        abExperiment={activeExperiment}
        abVariant={variant}
        onClose={() => {
          onCheckoutChange(false)
          setSelectedPriceId("")
          setSelectedTierName("")
        }}
      />
    </Section>
  )
}
