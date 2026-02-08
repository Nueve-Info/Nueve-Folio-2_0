import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"

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
          Apply unique insights from{" "}
          <span className="relative z-0 inline-block whitespace-nowrap px-2">
            <span className="absolute inset-0 -z-10 translate-y-0.5 -rotate-2 scale-[1.05] rounded-lg bg-gradient-to-r from-brand-orange to-brand-orange-light" />
            <span className="relative z-10 text-white">9,000+</span>
          </span>{" "}
          portfolios
        </h2>
        
        {/* Vimeo video */}
        <div className="relative overflow-hidden rounded-lg border border-black/5 mx-auto aspect-[4/3] max-w-4xl bg-white shadow-sm md:aspect-[2/1]">
          <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/1152835057?h=86e7a358a2&autoplay=1&muted=1&loop=1"
            width="640"
            height="360"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </motion.div>
    </Section>
  )
}
