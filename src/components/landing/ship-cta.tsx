import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"

export function ShipCta() {
  return (
    <Section id="ship" className="bg-nueve-black pt-0 pb-20 lg:pt-0 lg:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="text-white">
          Ship your portfolio within 24 hours
          <span className="text-brand-orange">.</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 md:mt-10"
        >
          <Button variant="default" size="lg" rounded="pill" className="bg-brand-orange text-nueve-black hover:bg-brand-orange/90 font-bold px-8 py-6 text-lg">
            Join Nueve Folio 2.0
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  )
}
