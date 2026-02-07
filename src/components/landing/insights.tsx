import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { PlaceholderBlock } from "@/components/ui"

export function Insights() {
  return (
    <Section id="insights" className="bg-white py-12 md:py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-black/5 bg-surface-grey/30 p-6 md:p-10 lg:p-16"
      >
        <h2 className="mb-8 text-center text-nueve-black md:mb-12">
          Apply unique insights from 9,000+ portfolios
        </h2>
        
        {/* Insights placeholder */}
        <PlaceholderBlock className="mx-auto aspect-[4/3] max-w-4xl bg-white shadow-sm md:aspect-[2/1]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4 p-8 opacity-40 blur-[1px] grayscale">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] w-32 rounded-lg bg-surface-grey shadow-inner" />
              ))}
            </div>
          </div>
        </PlaceholderBlock>
      </motion.div>
    </Section>
  )
}
