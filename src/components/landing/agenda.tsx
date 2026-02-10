import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { Section } from "@/components/ui/section"
import { ChevronDown, TrendingUp, Eye, Layers, PenTool, Wand2, Target } from "lucide-react"

const moduleVimeoIds: Record<number, string> = {
  1: "1163285260",
  2: "1163285474",
  3: "1163285765",
  4: "1163285937",
  5: "1163286170",
  6: "1163284876",
}

function getVimeoEmbedUrl(id: string) {
  return `https://player.vimeo.com/video/${id}?dnt=1&title=0&byline=0&portrait=0`
}

const modules = [
  {
    number: 1,
    week: "Week 1",
    title: "Design Job Market 2026",
    subtitle: "Know the landscape before you enter the arena",
    icon: TrendingUp,
    accent: "brand-orange",
    details: [
      "Decode hiring trends and in-demand skills shaping 2026",
      "Understand what separates hired designers from ignored ones",
      "Reverse-engineer real job postings to know exactly what companies want",
    ],
  },
  {
    number: 2,
    week: "Week 2",
    title: "Life of a Recruiter",
    subtitle: "See your portfolio through the eyes of the gatekeeper",
    icon: Eye,
    accent: "electric-blue",
    details: [
      "Learn how recruiters scan portfolios in under 60 seconds",
      "Understand the screening funnel from application to interview",
      "Avoid the silent killers that get portfolios rejected instantly",
    ],
  },
  {
    number: 3,
    week: "Week 3",
    title: "Nueve Folio",
    subtitle: "The framework behind portfolios that land interviews",
    icon: Layers,
    accent: "mint-cyan",
    details: [
      "Master the Nueve Folio structure for maximum impact",
      "Study real portfolios that got designers hired at top companies",
      "Learn the storytelling formula that makes case studies stick",
    ],
  },
  {
    number: 4,
    week: "Week 4",
    title: "Build Your Folio",
    subtitle: "From blank page to a portfolio you're proud of",
    icon: PenTool,
    accent: "vibrant-yellow",
    details: [
      "Build and ship your portfolio using the Nueve Folio system",
      "Write compelling case studies that showcase your thinking",
      "Get live feedback and iterate until it's interview-ready",
    ],
  },
  {
    number: 5,
    week: "Week 5",
    title: "AI for Designers",
    subtitle: "Use AI as your unfair advantage in the job search",
    icon: Wand2,
    accent: "brand-orange",
    details: [
      "Generate portfolio copy, case study drafts, and cover letters with AI",
      "Use AI tools to speed up visual mockups and presentations",
      "Stand out by demonstrating AI literacy in your design workflow",
    ],
  },
  {
    number: 6,
    week: "Week 6",
    title: "Searching for a Job",
    subtitle: "A proven system to land your next design role",
    icon: Target,
    accent: "electric-blue",
    details: [
      "Build a job search pipeline that actually gets responses",
      "Craft tailored applications that pass the recruiter filter",
      "Prepare for interviews with confidence and a winning strategy",
    ],
  },
]

const accentColorMap: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
  "brand-orange": {
    bg: "bg-brand-orange/10",
    text: "text-brand-orange",
    border: "border-brand-orange/20",
    iconBg: "bg-brand-orange/10",
  },
  "electric-blue": {
    bg: "bg-electric-blue/10",
    text: "text-electric-blue",
    border: "border-electric-blue/20",
    iconBg: "bg-electric-blue/10",
  },
  "mint-cyan": {
    bg: "bg-mint-cyan/10",
    text: "text-mint-cyan",
    border: "border-mint-cyan/20",
    iconBg: "bg-mint-cyan/10",
  },
  "vibrant-yellow": {
    bg: "bg-vibrant-yellow/10",
    text: "text-vibrant-yellow",
    border: "border-vibrant-yellow/20",
    iconBg: "bg-vibrant-yellow/10",
  },
}

export function Agenda() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Smooth out the movement
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
      style={{ cursor: isHovering ? 'none' : 'auto' }}
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
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: 360 
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              rotate: {
                repeat: Infinity,
                duration: 3,
                ease: "linear"
              },
              scale: { duration: 0.2 },
              opacity: { duration: 0.2 }
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
        {/* Badge - matching hero style */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/5 px-4 py-1.5 text-sm font-bold text-brand-orange">
            Course curriculum
          </div>
        </div>

        <h2 className="text-white">
          The step-by-step system to build a job-winning portfolio
          <span className="text-brand-orange">.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-lg font-medium leading-relaxed text-white/60">
          In 6 weeks, you'll go from overlooked applicant to a designer recruiters can't ignore.
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
                {/* Placeholder image - hidden on mobile */}
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
                      · {mod.week}
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
                      <div className="flex flex-col gap-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:flex-row md:items-center">
                        {/* Module details */}
                        <div className="flex-1 space-y-3">
                          <p className="text-xs font-bold uppercase tracking-widest text-white/30">
                            What you'll learn
                          </p>
                          <ul className="space-y-3">
                            {mod.details.map((detail, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                className="flex items-start gap-3"
                              >
                                <div className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${colors.text} bg-current`} />
                                <span className="text-base text-white/70">{detail}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Module video */}
                        <div className="w-full shrink-0 md:w-96">
                          <div className="overflow-hidden rounded-lg border border-white/5 bg-white/5">
                            <div className="aspect-video w-full">
                              <iframe
                                src={getVimeoEmbedUrl(moduleVimeoIds[mod.number])}
                                title={`Module ${mod.number} preview`}
                                className="h-full w-full"
                                loading="lazy"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          </div>
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
          6 modules · 6 weeks · From market insights to signed offer letter
        </p>
      </motion.div>
    </Section>
  )
}
