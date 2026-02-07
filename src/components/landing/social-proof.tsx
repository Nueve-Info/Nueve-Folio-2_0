import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { LogoMarkPlaceholder } from "@/components/ui"

const logos = Array(12).fill(null).map((_, i) => ({
  id: i,
  hasCaseStudy: [0, 4, 6, 10].includes(i),
}))

export function SocialProof() {
  return (
    <Section id="social-proof" className="bg-white py-12 md:py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-brand-orange to-brand-orange-light shadow-sm"
              />
            ))}
          </div>
          <p className="text-lg font-medium text-nueve-black md:text-xl">
            Kamil Grzaba <span className="text-text-grey">|</span> Senior Designer at Stampli
          </p>
          <p className="text-sm text-text-grey">
            Joined by 2,900+ alumni
          </p>
        </div>

        {/* Logos row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12 md:gap-4 lg:gap-6">
          {logos.map((logo, index) => (
            <div key={index} className="group relative flex items-center gap-1 md:gap-2">
              <LogoMarkPlaceholder className="h-8 w-24 bg-surface-grey/50 transition-colors group-hover:bg-surface-grey" />
              
              {logo.hasCaseStudy && (
                <span className="absolute -right-2 -top-2 hidden h-4 items-center rounded-full bg-brand-orange px-1.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm transition-transform group-hover:scale-110 sm:flex">
                  Case Study
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}
