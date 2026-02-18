import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Sparkles, ChevronDown } from "lucide-react"
import { Section } from "@/components/ui/section"

import FigmaLogo from "@/Bubble/Figma-logo.svg"
import ClaudeLogo from "@/Bubble/Claude_AI_symbol.svg"
import JitterLogo from "@/Bubble/jitter-logo.png"
import RemotionLogo from "@/Bubble/remotion-logo.svg"
import VercelLogo from "@/Bubble/vercel-icon-svgrepo-com.svg"

const EASE = [0.22, 1, 0.36, 1] as const

interface WorkflowTool {
  step: string
  name: string
  role: string
  description: string
  logo: string
}

const tools: WorkflowTool[] = [
  {
    step: "01",
    name: "Figma",
    role: "Design",
    description:
      "Craft your portfolio layouts, components, and visual language.",
    logo: FigmaLogo,
  },
  {
    step: "02",
    name: "Claude",
    role: "AI Code",
    description:
      "Generate production code and refine copy in seconds.",
    logo: ClaudeLogo,
  },
  {
    step: "03",
    name: "Jitter",
    role: "Motion",
    description:
      "Add scroll animations and micro-interactions from your designs.",
    logo: JitterLogo,
  },
  {
    step: "04",
    name: "Remotion",
    role: "Video",
    description:
      "Create programmatic video walkthroughs and case study reels.",
    logo: RemotionLogo,
  },
  {
    step: "05",
    name: "Vercel",
    role: "Deploy",
    description:
      "Ship your portfolio live with instant deploys and edge performance.",
    logo: VercelLogo,
  },
]

function Tooltip({
  tool,
  position,
}: {
  tool: WorkflowTool
  position: "above" | "below"
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: position === "above" ? 8 : -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: position === "above" ? 8 : -8, scale: 0.95 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={`absolute z-20 w-64 rounded-lg border border-black/5 bg-white p-4 shadow-lg ${
        position === "above"
          ? "bottom-full left-1/2 mb-3 -translate-x-1/2"
          : "left-0 top-full mt-3"
      }`}
    >
      {position === "above" && (
        <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-black/5 bg-white" />
      )}
      <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
        {tool.role}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-text-grey">
        {tool.description}
      </p>
    </motion.div>
  )
}

function WorkflowNode({
  tool,
  index,
  activeNode,
  setActiveNode,
  inView,
}: {
  tool: WorkflowTool
  index: number
  activeNode: number | null
  setActiveNode: (i: number | null) => void
  inView: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const isActive = activeNode === index
  const showTooltip = hovered || isActive

  return (
    <motion.div
      className="relative flex flex-col items-center w-full md:w-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
      }
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.15, // Faster stagger
        ease: EASE,
      }}
    >
      {/* Step label - Desktop */}
      <span className="mb-2 hidden md:block text-xs font-bold uppercase tracking-widest text-text-grey">
        Step {tool.step}
      </span>

      {/* Node card — Desktop */}
      <motion.div
        className="relative hidden cursor-pointer md:flex h-[120px] w-[120px] items-center justify-center rounded-lg border border-black/5 bg-white p-5"
        whileHover={{ scale: 1.05, borderColor: "#F8810D" }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{
          boxShadow: showTooltip
            ? "0 0 20px rgba(248,129,13,0.15)"
            : "none",
        }}
      >
        <img
          src={tool.logo}
          alt={tool.name}
          className="h-full w-full object-contain"
        />
      </motion.div>

      {/* Node card — Mobile (Full Width Accordion) */}
      <motion.div
        className="relative flex w-full cursor-pointer flex-col md:hidden overflow-hidden rounded-xl border bg-white transition-colors duration-300"
        style={{
          borderColor: isActive ? "#F8810D" : "rgba(0,0,0,0.05)",
          backgroundColor: isActive ? "#FFF" : "rgba(255,255,255,0.6)",
        }}
        onClick={() => setActiveNode(isActive ? null : index)}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-grey/50 p-2">
              <img
                src={tool.logo}
                alt={tool.name}
                className="h-full w-full object-contain"
              />
            </div>
            
            {/* Text Info */}
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">
                Step {tool.step} • {tool.role}
              </span>
              <span className="text-base font-bold text-nueve-black">
                {tool.name}
              </span>
            </div>
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <ChevronDown className={`h-5 w-5 ${isActive ? "text-brand-orange" : "text-text-grey/50"}`} />
          </motion.div>
        </div>

        {/* Accordion Content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div className="px-4 pb-4 pt-0 text-left text-sm leading-relaxed text-text-grey">
                <div className="h-px w-full bg-black/5 mb-3" />
                {tool.description}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tool name - Desktop */}
      <span className="mt-2 hidden md:block text-sm font-bold text-nueve-black">
        {tool.name}
      </span>

      {/* Desktop tooltip */}
      <AnimatePresence>
        {hovered && (
          <div className="hidden md:block">
            <Tooltip tool={tool} position="above" />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ConnectorLine({
  index,
  inView,
}: {
  index: number
  inView: boolean
}) {
  const delay = 0.4 + index * 0.3

  return (
    <svg
      className="hidden md:block h-1 flex-1"
      viewBox="0 0 100 4"
      preserveAspectRatio="none"
      overflow="visible"
    >
      <defs>
        <filter id={`glow-${index}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base track */}
      <line
        x1="0"
        y1="2"
        x2="100"
        y2="2"
        stroke="#EBEBEB"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Animated overlay */}
      <motion.line
        x1="0"
        y1="2"
        x2="100"
        y2="2"
        stroke="#F8810D"
        strokeWidth="2"
        strokeLinecap="round"
        filter={`url(#glow-${index})`}
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.6, delay, ease: EASE }}
      />

      {/* Traveling dot */}
      <motion.circle
        r="3"
        fill="#F8810D"
        initial={{ cx: 0, cy: 2, opacity: 0 }}
        animate={
          inView
            ? { cx: [0, 100], opacity: [0, 1, 1, 0] }
            : { cx: 0, opacity: 0 }
        }
        transition={{
          duration: 0.6,
          delay,
          ease: "easeInOut",
        }}
      />
    </svg>
  )
}

function MobileConnector({
  index,
  inView,
}: {
  index: number
  inView: boolean
}) {
  const delay = 0.2 + index * 0.15

  return (
    <div className="relative flex md:hidden h-8 w-px items-center justify-center">
      {/* Base Line */}
      <div className="absolute h-full w-0.5 rounded-full bg-black/5" />
      
      {/* Animated Fill */}
      <motion.div
        className="absolute top-0 h-full w-0.5 rounded-full bg-brand-orange"
        initial={{ height: 0 }}
        animate={inView ? { height: "100%" } : { height: 0 }}
        transition={{ duration: 0.4, delay, ease: EASE }}
      />
    </div>
  )
}

export function AiSection() {
  const [activeNode, setActiveNode] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <Section id="ai" className="bg-white py-20 lg:py-32">
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="rounded-[2.5rem] border border-black/5 bg-surface-grey/30 p-6 shadow-sm md:p-12 lg:p-24"
      >
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-sm">
            <Sparkles className="h-4 w-4 text-brand-orange" />
            <span className="text-sm font-bold uppercase tracking-widest text-nueve-black">
              AI-Powered Workflow
            </span>
          </div>

          {/* Heading */}
          <h2 className="max-w-4xl text-nueve-black">
            Build effortlessly
            <br />
            <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">
              with AI
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-8 max-w-2xl text-xl font-medium leading-relaxed text-text-grey sm:text-2xl md:mt-10">
            Leverage the power of code without writing a single line. Every
            designer ships at least one project.
          </p>

          {/* Workflow — Desktop (horizontal) */}
          <div className="mt-16 hidden w-full max-w-5xl items-center justify-center md:mt-24 md:flex">
            {tools.map((tool, i) => (
              <div key={tool.name} className="contents">
                <WorkflowNode
                  tool={tool}
                  index={i}
                  activeNode={activeNode}
                  setActiveNode={setActiveNode}
                  inView={inView}
                />
                {i < tools.length - 1 && (
                  <ConnectorLine index={i} inView={inView} />
                )}
              </div>
            ))}
          </div>

          {/* Workflow — Mobile (vertical accordion) */}
          <div className="mt-12 flex w-full flex-col items-center gap-0 md:hidden px-2">
            {tools.map((tool, i) => (
              <div key={tool.name} className="flex flex-col items-center w-full max-w-md">
                <WorkflowNode
                  tool={tool}
                  index={i}
                  activeNode={activeNode}
                  setActiveNode={setActiveNode}
                  inView={inView}
                />
                {i < tools.length - 1 && (
                  <MobileConnector index={i} inView={inView} />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
