import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"
import { Section } from "@/components/ui/section"

export function Story() {
  return (
    <Section id="story" className="bg-white py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] border border-black/5 bg-surface-grey/30 px-6 py-16 shadow-sm sm:px-10 md:px-16 lg:px-24"
      >
        {/* Abstract Background */}
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/80 via-white/40 to-transparent blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="text-nueve-black">
            Turn boring process into <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">captivating story</span>
          </h2>
          
          <div className="mx-auto mt-8 max-w-2xl space-y-6 md:mt-12">
            <p className="text-lg font-medium leading-relaxed text-text-grey sm:text-xl md:text-2xl">
              Transform your portfolio from a list of features into a <span className="text-nueve-black">narrative that captivates</span>. Great storytelling reveals your design thinking, the challenges you faced, and the impact you created - making every project memorable.
            </p>
          </div>

          {/* NDA Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 inline-flex items-center gap-3 rounded-full border border-black/5 bg-white px-6 py-3 shadow-sm md:mt-16"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-lg font-bold text-nueve-black">NDA-Safe Portfolio System</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  )
}
