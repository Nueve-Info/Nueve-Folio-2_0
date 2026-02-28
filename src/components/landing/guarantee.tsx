import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"
import { Section } from "@/components/ui/section"

export function Guarantee() {
  return (
    <Section id="guarantee" className="bg-white py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl rounded-[2.5rem] border border-black/5 bg-surface-grey/30 p-8 shadow-sm md:p-12 lg:p-16"
      >
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:gap-12 md:text-left">
          {/* Guarantee Badge */}
          <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 md:h-40 md:w-40 shadow-lg shadow-green-500/20">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/40 animate-[spin_10s_linear_infinite]" />
            <div className="flex flex-col items-center justify-center gap-1">
              <ShieldCheck className="h-8 w-8 text-white" />
              <span className="text-2xl font-black text-white">30</span>
              <span className="text-xs font-bold uppercase tracking-widest text-white/90">Days</span>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-nueve-black">
              100% Risk-Free Guarantee
            </h3>
            <p className="mt-4 text-lg font-medium leading-relaxed text-text-grey sm:text-xl">
              If you're not completely satisfied within 30 days, we'll refund you in full. No questions asked.
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
