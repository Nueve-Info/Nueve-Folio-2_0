import { useRef, useState } from "react"
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Eye, Layout, Sparkles, ArrowRight, Zap } from "lucide-react"


const statements = [
  {
    text: "Recruiters spend 6&nbsp;seconds scanning your portfolio.",
    Icon: Eye,
    insertAfter: "spend",
  },
  {
    text: "Basic Case Studies with wireframes and personas won't cut it.",
    Icon: Layout,
    insertAfter: "Studies",
  },
  {
    text: "You have to stand out.",
    Icon: Sparkles,
    insertAfter: "stand",
  },
  {
    text: "We'll show you how.",
    Icon: ArrowRight,
    insertAfter: "show",
  },
  {
    text: "Fast and easy with AI.",
    Icon: Zap,
    insertAfter: "easy",
  },
]

type StatementState = "before" | "active" | "after"

const transitionConfig = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
}

function BubbleIcon({ Icon, state }: { Icon: any, state: StatementState }) {
  return (
    <span className="relative inline-flex items-center justify-center w-[1.15em] h-[1.15em] rounded-full border border-white/20 bg-white/10 backdrop-blur-sm shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:bg-white/20 hover:scale-110 mx-[0.25em] align-middle -translate-y-[0.1em] overflow-hidden">
      <Icon className="w-[0.65em] h-[0.65em] text-brand-orange drop-shadow-sm relative z-10" strokeWidth={3} />
      
      {/* Shine effect */}
      <motion.span
        initial={{ x: "-100%" }}
        animate={state === "active" ? { x: "200%" } : { x: "-100%" }}
        transition={{ 
          duration: 1.2, 
          ease: "easeInOut",
          delay: 0.2,
          repeat: 0
        }}
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/90 to-transparent -skew-x-12 pointer-events-none z-20"
      />
    </span>
  )
}

function ScrollStatement({
  statement,
  state,
  index,
}: {
  statement: typeof statements[0]
  state: StatementState
  index: number
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

  const renderTextWithIcon = () => {
    const parts = statement.text.split(statement.insertAfter)
    if (parts.length < 2) return <span dangerouslySetInnerHTML={{ __html: statement.text }} />

    return (
      <>
        <span dangerouslySetInnerHTML={{ __html: parts[0] }} />
        {statement.insertAfter}
        <BubbleIcon Icon={statement.Icon} state={state} />
        <span dangerouslySetInnerHTML={{ __html: parts.slice(1).join(statement.insertAfter) }} />
      </>
    )
  }

  return (
    <motion.div
      initial="before"
      animate={state}
      variants={variants}
      transition={transitionConfig}
      className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6"
    >
      <div className="w-full max-w-5xl">
        <p className="text-center text-5xl font-black tracking-tighter leading-[1.15] text-nueve-black sm:text-6xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl mb-14 sm:mb-16 lg:mb-16">
          {renderTextWithIcon()}
        </p>
        <div className="w-full md:w-[85%] lg:w-[80%] mx-auto aspect-video rounded-2xl overflow-hidden">
          <iframe
            title="vimeo-player"
            src={index === 0
              ? "https://player.vimeo.com/video/1152835057?h=86e7a358a2&autoplay=1&muted=1&loop=1"
              : "https://player.vimeo.com/video/1140418453?h=0729acb1d9"
            }
            className="w-full h-full"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </motion.div>
  )
}

export function Problem() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)

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
    const clampedIndex = progress <= 0 ? 0 : Math.min(newIndex, statements.length - 1)

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
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background"
      >
        {/* Radial Gradient Background — outer resets on paragraph change, inner drifts with scroll */}
        <motion.div
          key={activeIndex}
          initial={{ scale: 1.1, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={transitionConfig}
          className="absolute right-[-5%] top-1/2 -translate-y-1/2 pointer-events-none"
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
        <div className="relative h-[60vh] md:h-[80vh] w-full max-w-6xl">
          {statements.map((statement, index) => (
            <ScrollStatement
              key={index}
              index={index}
              statement={statement}
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

