import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Section } from "@/components/ui/section"

export function AiSection() {
  return (
    <Section id="ai" className="bg-white py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[2.5rem] bg-surface-grey/50 p-8 md:p-12 lg:p-24"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-sm">
            <Sparkles className="h-4 w-4 text-brand-orange" />
            <span className="text-sm font-bold uppercase tracking-widest text-nueve-black">AI-Powered Workflow</span>
          </div>

          <h2 className="max-w-4xl text-nueve-black">
            Build effortlessly<br />
            <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">with AI</span>
          </h2>
          
          <p className="mt-8 max-w-2xl text-xl font-medium leading-relaxed text-text-grey sm:text-2xl md:mt-10">
            Leverage the power of code without writing a single line. Every designer ships at least one project.
          </p>

          {/* Abstract Visualization */}
          <div className="relative mt-16 flex h-40 w-full max-w-2xl items-center justify-center gap-4 sm:gap-8 md:mt-24">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-orange/5 to-transparent blur-2xl" />
            
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative aspect-square h-24 rounded-2xl border border-white bg-white shadow-xl sm:h-32 md:h-40"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-surface-grey to-white opacity-50`} />
                {i === 2 && (
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
