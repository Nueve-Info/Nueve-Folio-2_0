import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"

export function ShipCta() {
  return (
    <Section id="ship" className="bg-white py-12 md:py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="text-nueve-black">
          Ship your portfolio by tomorrow.
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 md:mt-8"
        >
          <Button variant="default" size="lg" rounded="pill" className="bg-surface-grey text-nueve-black hover:bg-surface-grey/80">
            Join Nueve Folio 2.0
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  )
}
