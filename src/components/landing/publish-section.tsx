import { motion, useInView } from "framer-motion"
import { Section } from "@/components/ui/section"
import { useEffect, useState, useRef } from "react"

export function PublishSection() {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [isInView])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <Section id="publish" className="relative overflow-hidden bg-white py-20 lg:py-32">
      {/* Ambient background glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/5 blur-[100px]" />

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center text-center"
      >
        <div className="mb-8 inline-flex flex-col items-center justify-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-text-grey">
            Time left to finish portfolio
          </span>
          <div className="relative flex items-center justify-center rounded-full border border-white/60 bg-white/40 px-8 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl ring-1 ring-black/5 transition-all hover:scale-105 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
            <span className="font-mono text-4xl font-black tracking-widest text-brand-orange tabular-nums">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <h2 className="mb-8 text-nueve-black">
          Publish your folio<br />
          <span className="relative inline-block whitespace-nowrap px-2">
            <span className="absolute inset-0 z-0 translate-y-1 -rotate-2 scale-[1.05] rounded-lg bg-gradient-to-r from-brand-orange to-brand-orange-light" />
            <span className="relative z-10 text-white">within 24 hours</span>
          </span>
        </h2>
        
        <p className="mx-auto max-w-2xl text-xl font-medium leading-relaxed text-text-grey sm:text-2xl">
          Use a framework created and iterated for over <span className="font-bold text-nueve-black">14 years</span> of UX career.
        </p>
      </motion.div>
    </Section>
  )
}
