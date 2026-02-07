import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { Section } from "@/components/ui/section"

export function PublishSection() {
  return (
    <Section id="publish" className="bg-white py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center text-center"
      >
        <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-full bg-surface-grey">
          <Clock className="h-10 w-10 text-brand-orange" />
        </div>

        <h2 className="text-nueve-black">
          Publish your folio<br />
          <span className="relative inline-block">
            <span className="relative z-10">within 24 hours</span>
            <span className="absolute bottom-2 left-0 -z-10 h-4 w-full -rotate-1 bg-brand-orange/20 md:bottom-4 md:h-8" />
          </span>
        </h2>
        
        <p className="mx-auto mt-8 max-w-2xl text-xl font-medium leading-relaxed text-text-grey sm:text-2xl">
          Use a framework created and iterated for over <span className="font-bold text-nueve-black">14 years</span> of UX career.
        </p>
      </motion.div>
    </Section>
  )
}
