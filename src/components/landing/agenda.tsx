import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Section } from "@/components/ui/section"
import { ChevronDown, BookOpen, Search, Sparkles, MessageSquare, Shield } from "lucide-react"

const modules = [
  {
    number: 1,
    week: "Week 1",
    title: "Understand User Behaviors",
    subtitle: "With 3 proven mental models",
    icon: BookOpen,
    accent: "brand-orange",
    details: [
      "Map cognitive biases that drive user decisions",
      "Apply the Hook Model to your product flows",
      "Identify behavioral patterns through real case studies",
    ],
  },
  {
    number: 2,
    week: "Week 2–3",
    title: "Find The Gaps & Improve Any Experience",
    subtitle: "Know which psychology principle to use and when.",
    icon: Search,
    accent: "electric-blue",
    details: [
      "Audit existing UX with a psychology-driven framework",
      "Match the right principle to the right problem",
      "Prioritize improvements for maximum impact",
    ],
  },
  {
    number: 3,
    week: "Week 4",
    title: "Create Delightful Journeys",
    subtitle: "Aligned with your business goals",
    icon: Sparkles,
    accent: "mint-cyan",
    details: [
      "Design end-to-end flows that feel effortless",
      "Balance delight with conversion at every touchpoint",
      "Build emotional resonance into product moments",
    ],
  },
  {
    number: 4,
    week: "Week 5",
    title: "Communicate Product Decisions",
    subtitle: "To better rally your team & stakeholders",
    icon: MessageSquare,
    accent: "vibrant-yellow",
    details: [
      "Frame design decisions in business language",
      "Present psychology-backed rationales that stick",
      "Build alignment across cross-functional teams",
    ],
  },
  {
    number: 5,
    week: "Week 5",
    title: "Create Ethical & Humane Products",
    subtitle: "To earn loyal fans & succeed long-term",
    icon: Shield,
    accent: "brand-orange",
    details: [
      "Draw the line between persuasion and manipulation",
      "Design for long-term trust and user well-being",
      "Apply ethical frameworks to real product dilemmas",
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

  const toggleModule = (moduleNumber: number) => {
    setExpandedModule(expandedModule === moduleNumber ? null : moduleNumber)
  }

  return (
    <Section id="agenda" className="bg-nueve-black py-20 lg:py-32">
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
          The step-by-step system to apply product psychology
          <span className="text-brand-orange">.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-lg font-medium leading-relaxed text-white/60">
          In 5 weeks, you'll apply the right psychological principle to improve any product experience.
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
                    <div className="flex flex-col gap-4 px-5 pt-2 pb-2 md:flex-row md:gap-8 md:px-8 md:pl-[13.5rem]">
                      {/* Module details */}
                      <div className="flex-1 space-y-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
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

                      {/* Placeholder visual */}
                      <div className="flex w-full items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 md:w-72">
                        <div className="flex flex-col items-center gap-3 text-center">
                          <Icon className={`h-12 w-12 ${colors.text} opacity-40`} strokeWidth={1} />
                          <div className="space-y-2">
                            <div className="mx-auto h-2 w-24 rounded-full bg-white/5" />
                            <div className="mx-auto h-2 w-16 rounded-full bg-white/5" />
                          </div>
                          <p className="text-xs font-medium text-white/20">Preview coming soon</p>
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
          5 modules · 5 weeks · Psychology-driven product design from first principles
        </p>
      </motion.div>
    </Section>
  )
}
