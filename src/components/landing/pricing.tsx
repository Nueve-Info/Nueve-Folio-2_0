import { motion } from "framer-motion"
import { Check, ArrowRight, Zap } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"

const features = [
  "24/7 Mentor Access",
  "AI-Powered Workflow",
  "NDA-Safe Storytelling",
  "Publish in 24 Hours",
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
                  <span className="text-6xl font-black text-nueve-black md:text-7xl">$17</span>
                  <span className="text-xl font-medium text-text-grey/50">/ one-time</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                   <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                   <span className="text-red-500">Early bird ends Feb 06</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl bg-surface-grey p-4 transition-colors hover:bg-black/5"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-lg font-medium text-nueve-black">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10">
                <Button 
                  variant="nueve" 
                  size="lg" 
                  rounded="pill" 
                  className="group w-full bg-nueve-black text-white hover:bg-nueve-black/90"
                >
                  <span className="mr-2">Join Now</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="mt-4 text-center text-xs font-medium uppercase tracking-wider text-text-grey/40">
                  Program Starts: Feb 28
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
