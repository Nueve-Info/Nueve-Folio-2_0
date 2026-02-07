import { useRef, useState } from "react"
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"

const statements = [
  "Recruiters spend 6 seconds scanning your portfolio.",
  "Basic Case Studies with wireframes and personas won't cut it.",
  "You have to stand out.",
  "We'll show you how.",
  "Fast and easy with AI.",
]

type StatementState = "before" | "active" | "after"

const transitionConfig = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
}

function ScrollStatement({
  text,
  state,
}: {
  text: string
  state: StatementState
}) {
  const variants = {
    before: {
      opacity: 0,
      y: 60,
      scale: 0.95,
      filter: "blur(8px)",
    },
    active: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    after: {
      opacity: 0,
      y: -60,
      scale: 0.95,
      filter: "blur(8px)",
    },
  }

  return (
    <motion.p
      initial="before"
      animate={state}
      variants={variants}
      transition={transitionConfig}
      className="absolute inset-0 flex items-center justify-center px-2.5 sm:px-6 text-center text-3xl font-black tracking-tight text-nueve-black sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
    >
      {text}
    </motion.p>
  )
}

export function Problem() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const activeIndexRef = useRef(-1)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Parallax: compute local progress within current segment (0–1) → small Y drift
  const parallaxY = useTransform(scrollYProgress, (progress) => {
    const segmentSize = 1 / statements.length
    const idx = activeIndexRef.current
    const segmentStart = Math.max(0, idx) * segmentSize
    const local = Math.max(0, Math.min(1, (progress - segmentStart) / segmentSize))
    return local * 200 // 200px max drift per segment
  })

  // Watch scroll progress and update active statement
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const segmentSize = 1 / statements.length
    const newIndex = Math.floor(progress / segmentSize)
    const clampedIndex = progress <= 0 ? -1 : Math.min(newIndex, statements.length - 1)

    if (clampedIndex !== activeIndexRef.current) {
      activeIndexRef.current = clampedIndex
      setActiveIndex(clampedIndex)
    }
  })

  const getStatementState = (index: number): StatementState => {
    if (index < activeIndex) return "after"
    if (index === activeIndex) return "active"
    return "before"
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: `${statements.length * 100}vh` }}>
      <div
        id="problem"
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-white"
      >
        {/* Radial Gradient Background — outer resets on paragraph change, inner drifts with scroll */}
        <motion.div
          key={activeIndex}
          initial={{ scale: 1.1, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={transitionConfig}
          className="absolute left-[60%] top-[35%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <motion.div
            style={{ y: parallaxY }}
            className="h-[35vh] w-[35vh]"
          >
            <div className="absolute inset-0 rounded-full bg-brand-orange/30 blur-[80px]" />
            <div className="absolute inset-6 rounded-full bg-brand-orange/50 blur-[50px]" />
          </motion.div>
        </motion.div>

        {/* Statements container */}
        <div className="relative h-32 w-full max-w-6xl sm:h-40 md:h-48 lg:h-56">
          {statements.map((statement, index) => (
            <ScrollStatement
              key={index}
              text={statement}
              state={getStatementState(index)}
            />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute bottom-8 md:bottom-12"
        >
          <Button
            variant="default"
            size="lg"
            rounded="pill"
            className="bg-gradient-to-r from-brand-orange to-brand-orange-light text-white font-bold hover:opacity-90 transition-opacity"
          >
            Join Nueve Folio 2.0
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
