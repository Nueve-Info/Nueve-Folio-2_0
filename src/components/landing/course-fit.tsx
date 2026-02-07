import { motion } from "framer-motion"
import { CheckCircle2, XCircle } from "lucide-react"
import { Section } from "@/components/ui/section"

const forYouItems = [
  "You finished bootcamps/courses and/or have commercial experience and want to find a new job in the product design industry",
  "You're creating your portfolio from scratch",
  "You finished your portfolio, search for job and keep on failing",
]

const notForYouItems = [
  "You're starting to learn basics UX/UI design",
  "You don't have any projects (even bootcamp ones)",
  "You don't want to incorporate AI in your process",
  "You think there's nothing wrong with your portfolio or job searching technique",
]

export function CourseFit() {
  return (
    <Section id="course-fit" className="bg-white py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-16 text-center text-nueve-black">
          Is this course for me?
        </h2>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12">
          {/* For you column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[2rem] bg-neutral-100 p-8 text-nueve-black md:p-12 border border-black/5"
          >
            <h3 className="mb-8 text-nueve-black">
              This course is <span className="text-brand-orange">for you</span> if:
            </h3>
            <ul className="space-y-6">
              {forYouItems.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-brand-orange" />
                  <span className="text-lg font-medium leading-relaxed text-text-grey sm:text-xl">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not for you column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-[2rem] bg-surface-grey p-8 md:p-12"
          >
            <h3 className="mb-8 text-nueve-black">
              This course is <span className="text-text-grey line-through decoration-brand-orange decoration-4">NOT</span> for you if:
            </h3>
            <ul className="space-y-6">
              {notForYouItems.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <XCircle className="mt-1 h-6 w-6 shrink-0 text-text-grey/40" />
                  <span className="text-lg font-medium leading-relaxed text-text-grey sm:text-xl">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  )
}
