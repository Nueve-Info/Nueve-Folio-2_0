import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { PlaceholderBlock } from "@/components/ui"

export function VideoDeepDive() {
  return (
    <Section id="video" className="bg-white py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-2.5 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center text-nueve-black"
        >
          Still not convinced?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <PlaceholderBlock
            className="mx-auto aspect-video w-full rounded-2xl shadow-2xl ring-1 ring-gray-900/10"
            videoUrl="https://player.vimeo.com/video/1160304896"
          />
        </motion.div>
      </div>
    </Section>
  )
}
