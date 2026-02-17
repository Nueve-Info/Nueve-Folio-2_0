import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { PlaceholderBlock } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { scrollToSection } from "@/lib/utils"

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
            videoUrl="https://player.vimeo.com/video/1163284057"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Button
            variant="nueve"
            size="lg"
            rounded="pill"
            className="group bg-brand-orange text-white hover:bg-brand-orange/90 px-8 py-6 text-lg shadow-xl shadow-brand-orange/20 transition-all hover:scale-105 active:scale-95"
            onClick={() => window.open("https://calendar.notion.so/meet/stanswiatkiewicz/goc7j4oif", "_blank")}
          >
            Book a call
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </Section>
  )
}
