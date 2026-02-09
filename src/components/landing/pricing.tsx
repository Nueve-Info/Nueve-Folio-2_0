import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { trackMeta, capturePosthog } from "@/lib/analytics"

const features = [
  "24/7 mentor access — portfolio, career & technical help",
  "AI-powered workflow — ship without writing code",
  "Recruiter-proof case study storytelling",
  "NDA-safe portfolio system",
  "Live feedback until your folio is interview-ready",
  "Publish your portfolio within 24 hours",
  "Job-search pipeline & interview strategy",
  "Insights distilled from 9,000+ reviewed portfolios",
]

export function Pricing() {
  return (
    <Section id="pricing" className="bg-white py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-md"
      >
        <div className="relative">
          {/* Glowing Effect */}
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-brand-orange to-brand-orange-light opacity-30 blur-xl" />
          
          <div className="relative overflow-hidden rounded-[2rem] bg-white p-1 shadow-2xl">
            <div className="relative rounded-[1.8rem] bg-white p-8 md:p-10 border border-black/5">
              
              {/* Header */}
              <div className="mb-8 text-center">
                <span className="inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-orange">
                  Limited Access
                </span>
                <h2 className="mt-6 text-nueve-black">
                  Nueve Folio 2.0
                </h2>
              </div>

              {/* Price */}
              <div className="mb-10 flex flex-col items-center justify-center gap-2 border-y border-black/5 py-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-black text-brand-orange md:text-7xl">$17</span>
                  <span className="text-xl font-medium text-text-grey/50">/ one-time</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                   <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-green-500">Early bird ends Feb 16</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-green-500" />
                    <span className="text-sm font-medium leading-snug text-nueve-black">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-10">
                <Button 
                  variant="nueve" 
                  size="lg" 
                  rounded="pill" 
                  className="group w-full bg-green-500 text-white hover:opacity-90 shadow-lg shadow-green-500/20"
                  data-meta-event="InitiateCheckout"
                  onClick={() => {
                    trackMeta("InitiateCheckout", {
                      content_name: "Nueve Folio 2.0",
                      value: 17,
                      currency: "USD",
                    })
                    capturePosthog("InitiateCheckout", {
                      label: "Join Now",
                      path: window.location.pathname,
                    })
                    window.open("https://buy.stripe.com/5kQ00idvZ3SX5wlgBMgA81G", "_blank")
                  }}
                >
                  <span className="mr-2">Join Now</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="mt-4 text-center text-xs font-medium uppercase tracking-wider text-text-grey/40">
                  Program Starts: Feb 16
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
