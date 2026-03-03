import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { Section } from "@/components/ui/section"
import { ChevronDown, TrendingUp, Wand2, PenTool, Rocket } from "lucide-react"

const modules = [
  {
    number: 1,
    lessonCount: 3,
    title: "Understand New Wave",
    subtitle: "The rules changed. Here's what's actually happening.",
    icon: TrendingUp,
    accent: "brand-orange",
    description: "Before you build anything, you need to see the full picture. You'll explore how fast AI is actually accelerating, what that means for the 2026 job market, and why the design process you learned two years ago is already outdated.",
    details: [
      "Understand the AI acceleration curve and why it keeps compounding",
      "See how 'everyone can ship' is reshaping hiring and team structures",
      "Learn the 2026 workflow: build → test → iterate, multiple times a day",
      "Know where Figma still fits — and where it's the bottleneck",
    ],
  },
  {
    number: 2,
    lessonCount: 4,
    title: "Master AI Tools",
    subtitle: "Stop chatting with AI. Start building with it.",
    icon: Wand2,
    accent: "electric-blue",
    description: "You'll go from 'I use ChatGPT sometimes' to running agentic coding assistants that build, test, and iterate on their own. Learn how to write PRDs by voice, manage AI sessions like a pro, and watch a complete app get built live from a single brief.",
    details: [
      "Use Claude Code and other agentic tools to ship real products",
      "Write PRDs by voice and manage context, sessions, and project memory",
      "Enable browser access so AI builds, tests, and iterates on its own",
      "Follow a live build: one PRD in, working app out",
    ],
  },
  {
    number: 3,
    lessonCount: 7,
    title: "Craft Your Story",
    subtitle: "Turn your projects into stories recruiters can't scroll past.",
    icon: PenTool,
    accent: "mint-cyan",
    description: "Your portfolio needs to sell in three seconds and hold attention for three minutes. You'll learn the FOLIO framework — a five-part case study structure that turns your projects into sharp, compelling narratives ending with a transformation worth remembering.",
    details: [
      "Structure case studies as stories: First Impression → Obstacle → Logic & Leverage → Iteration → Outcome",
      "Write sharp diagnoses and show strategic thinking — not generic process slides",
      "Build credibility by showing real iteration, failed experiments, and pivots",
      "Use three custom AI agents to go from project notes to a coded portfolio in 24 hours",
    ],
  },
  {
    number: 4,
    lessonCount: 1,
    title: "Ship It",
    subtitle: "Knowledge without execution is worthless. Go build.",
    icon: Rocket,
    accent: "vibrant-yellow",
    description: "Build a new case study over the weekend, post it for feedback, book your included portfolio review, and plug into a community that keeps you shipping.",
    details: [
      "Build new case studies that showcase AI-driven workflows",
      "Use the included portfolio feedback session to refine your work",
      "Join Discord and weekly office hours for ongoing support",
      "Share your process publicly and iterate based on real feedback",
    ],
  },
]

const accentColorMap: Record<string, { bg: string; text: string; border: string }> = {
  "brand-orange": {
    bg: "bg-brand-orange/10",
    text: "text-brand-orange",
    border: "border-brand-orange/20",
  },
  "electric-blue": {
    bg: "bg-electric-blue/10",
    text: "text-electric-blue",
    border: "border-electric-blue/20",
  },
  "mint-cyan": {
    bg: "bg-mint-cyan/10",
    text: "text-mint-cyan",
    border: "border-mint-cyan/20",
  },
  "vibrant-yellow": {
    bg: "bg-vibrant-yellow/10",
    text: "text-vibrant-yellow",
    border: "border-vibrant-yellow/20",
  },
}

export function Agenda() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 250 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const toggleModule = (moduleNumber: number) => {
    setExpandedModule(expandedModule === moduleNumber ? null : moduleNumber)
  }

  return (
    <Section
      id="agenda"
      className="relative bg-nueve-black py-20 lg:py-32 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ cursor: isHovering ? "none" : "auto" }}
    >
      {/* Spinning Custom Cursor */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[9999] h-15 w-15"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              rotate: { repeat: Infinity, duration: 3, ease: "linear" },
              scale: { duration: 0.2 },
              opacity: { duration: 0.2 },
            }}
          >
            <img
              src="/custom-cursor.png"
              alt="Custom Cursor"
              className="h-full w-full rounded-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/5 px-4 py-1.5 text-sm font-bold text-brand-orange">
            Course curriculum
          </div>
        </div>

        <h2 className="text-white">
          Everything you need to ship a portfolio that lands clients
          <span className="text-brand-orange">.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-lg font-medium leading-relaxed text-white/60">
          4 modules. 15 lessons. From understanding the market shift to shipping a portfolio powered by AI.
        </p>
      </motion.div>

      {/* Modules */}
      <div className="mt-16 flex flex-col gap-4 md:mt-20">
        {modules.map((mod, index) => {
          const colors = accentColorMap[mod.accent]
          const isExpanded = expandedModule === mod.number
          const Icon = mod.icon

          return (
            <motion.div
              key={mod.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <button
                onClick={() => toggleModule(mod.number)}
                className="group flex w-full items-center gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 text-left transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05] md:gap-8 md:p-8"
              >
                {/* Icon block - hidden on mobile */}
                <div className="hidden shrink-0 md:block">
                  <div className={`flex h-28 w-40 items-center justify-center rounded-xl border ${colors.border} ${colors.bg} transition-transform duration-300 group-hover:scale-105`}>
                    <Icon className={`h-10 w-10 ${colors.text} opacity-60 transition-opacity group-hover:opacity-100`} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col items-start gap-2">
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold uppercase tracking-widest ${colors.text}`}>
                      Module {mod.number}
                    </span>
                    <span className="text-sm font-medium tracking-wide text-white/30">
                      · {mod.lessonCount} {mod.lessonCount === 1 ? "lesson" : "lessons"}
                    </span>
                  </div>

                  <h3 className="text-white/90 transition-colors group-hover:text-white">
                    {mod.title}
                  </h3>

                  <p className="text-base text-white/50 transition-colors group-hover:text-white/70 md:text-lg">
                    {mod.subtitle}
                  </p>
                </div>

                {/* Expand indicator */}
                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden text-sm font-medium text-white/30 transition-colors group-hover:text-white/50 sm:block">
                    {isExpanded ? "Close" : "Learn more"}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/5">
                    <ChevronDown
                      className={`h-4 w-4 text-white/40 transition-transform duration-300 group-hover:text-white/70 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </button>

              {/* Expandable details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2">
                      <div className="flex flex-col gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:flex-row md:gap-10">
                        {/* Description — left */}
                        <div className="flex-1">
                          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/30">
                            Overview
                          </p>
                          <p className="text-base leading-relaxed text-white/60">
                            {mod.description}
                          </p>
                        </div>

                        {/* Bullets — right */}
                        <div className="flex-1">
                          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/30">
                            What you'll learn
                          </p>
                          <ul className="space-y-3">
                            {mod.details.map((detail, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.08 }}
                                className="flex items-start gap-3"
                              >
                                <div className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${colors.text} bg-current`} />
                                <span className="text-base text-white/70">{detail}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom stat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-16 flex flex-col items-center gap-6 text-center"
      >
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <p className="max-w-md text-base font-medium text-white/40">
          4 modules · 15 lessons · From market insight to shipped portfolio
        </p>
      </motion.div>
    </Section>
  )
}
