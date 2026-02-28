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
    <Section id="publish" className="relative overflow-hidden bg-white py-24 pb-28 lg:py-36 lg:pb-40">
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
        {/* Copy block */}
        <h2 className="mb-4 text-nueve-black">
          Go live in<br />
          <span className="relative inline-block whitespace-nowrap px-2">
            <span className="absolute inset-0 z-0 translate-y-1 -rotate-2 scale-[1.05] rounded-lg bg-gradient-to-r from-brand-orange to-brand-orange-light" />
            <span className="relative z-10 text-white">under 24 hours</span>
          </span>
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-xl font-medium leading-relaxed text-text-grey sm:text-2xl lg:mb-16">
          Not a typo. Our AI-powered workflow and a framework refined over <span className="font-bold text-nueve-black">14 years</span> make it possible to build and publish a portfolio in a single day.
        </p>

        {/* Countdown — main visual asset */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-text-grey">
            Time left to finish portfolio
          </span>

          <div className="relative flex items-center justify-center rounded-2xl border border-black/5 bg-white px-10 py-8 shadow-[0_12px_40px_rgb(0,0,0,0.06)] ring-1 ring-black/[0.03] sm:px-14 sm:py-10 lg:px-20 lg:py-12">
            <div className="flex items-baseline gap-1 sm:gap-2">
              {formatTime(timeLeft).split(":").map((unit, i) => (
                <span key={i} className="flex items-baseline">
                  {i > 0 && (
                    <span className="mx-1 text-3xl font-light text-black/20 sm:mx-2 sm:text-5xl lg:mx-3 lg:text-6xl">
                      :
                    </span>
                  )}
                  <span className="font-mono text-5xl font-black tracking-tight text-brand-orange tabular-nums sm:text-7xl lg:text-8xl">
                    {unit}
                  </span>
                </span>
              ))}
            </div>
            {/* Unit labels below digits */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
              <div className="flex gap-12 sm:gap-20 lg:gap-28">
                {["Hours", "Minutes", "Seconds"].map((label) => (
                  <span key={label} className="text-[10px] font-semibold uppercase tracking-widest text-text-grey sm:text-xs">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
