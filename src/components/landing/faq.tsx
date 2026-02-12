import { Section } from "@/components/ui/section"
import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Faq() {
  const faqs = [
    {
      question: "What is Nueve Folio?",
      videoUrl: "https://www.youtube.com/embed/qoe0mvch634",
    },
    {
      question: "Is Nueve Folio legit?",
      videoUrl: "https://www.youtube.com/embed/FLwMHc56x1s",
    },
    {
      question: "Who is Stan Swiatkiewicz?",
      videoUrl: "https://www.youtube.com/embed/K08giQkoXRg",
    },
  ]

  return (
    <Section id="faq" className="bg-surface-grey">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-black tracking-tight text-nueve-black sm:text-6xl uppercase"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-black/10">
                <AccordionTrigger className="text-xl sm:text-2xl font-black tracking-tight text-left text-nueve-black hover:text-brand-orange px-2 py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-6 px-2">
                    <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/10 shadow-lg bg-black">
                      <iframe
                        src={faq.videoUrl}
                        title={faq.question}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </Section>
  )
}
