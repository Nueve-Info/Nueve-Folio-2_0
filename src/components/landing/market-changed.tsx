import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { MonitorPlay, Lightbulb, Briefcase } from "lucide-react"
import { useInViewOnce } from "@/hooks/useInViewOnce"

const cards = [
  {
    title: "Think like a business partner",
    description: "Design decisions happen within business constraints. Master the metrics companies value and showcase strategic thinking in your portfolio.",
    icon: Briefcase,
    gradient: "from-brand-orange/20 to-brand-orange/5",
  },
  {
    title: "Use AI as leverage",
    description: "AI is reshaping how the best designers work. Learn to integrate AI into real-world workflows to stay competitive.",
    icon: Lightbulb,
    gradient: "from-electric-blue/20 to-electric-blue/5",
  },
  {
    title: "Build credible projects",
    description: "No commercial work? No problem. We’ll help you build realistic case studies that stand up to hiring scrutiny in 2026.",
    icon: MonitorPlay,
    gradient: "from-mint-cyan/20 to-mint-cyan/5",
  },
]

export function MarketChanged() {
  const [gridRef, gridInView] = useInViewOnce()

  return (
    <Section className="bg-white py-20 lg:py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-nueve-black text-4xl md:text-5xl font-bold tracking-tight mb-6">
            The market changed.
            <br />
            Hiring didn’t. Top candidates
            <br />
            <span className="relative inline-block whitespace-nowrap px-2">
              <span className="absolute inset-0 -z-10 translate-y-1 -rotate-2 scale-[1.05] rounded-lg bg-gradient-to-r from-brand-orange to-brand-orange-light" />
              <span className="relative z-10 text-white">still get hired.</span>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-text-grey">
            In 2026, knowing Figma and completing a bootcamp is baseline. What matters is how you
            present real work, your decision-making process, and business context.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div ref={gridRef} className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:shadow-md hover:border-black/10"
            >
              {/* Image / Video */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                {index === 0 && gridInView ? (
                  <iframe
                    title="vimeo-player"
                    src="https://player.vimeo.com/video/1152984649?h=1883b628c6&autoplay=1&muted=1&controls=0&background=1&loop=1&autopause=0"
                    className="absolute inset-0 block h-full w-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    allowFullScreen
                  />
                ) : index === 1 && gridInView ? (
                  <iframe
                    title="vimeo-player"
                    src="https://player.vimeo.com/video/1152980459?h=1708bf874a&autoplay=1&muted=1&controls=0&background=1&loop=1&autopause=0"
                    className="absolute inset-0 block h-full w-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    allowFullScreen
                  />
                ) : index === 2 && gridInView ? (
                  <iframe
                    title="vimeo-player"
                    src="https://player.vimeo.com/video/1152992910?autoplay=1&muted=1&controls=0&background=1&loop=1&autopause=0"
                    className="absolute inset-0 block h-full w-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10 transition-opacity group-hover:opacity-20`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <card.icon className="h-12 w-12 text-black/10" strokeWidth={1} />
                    </div>
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
                  </>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <h3 className="mb-3 text-xl font-bold text-nueve-black">
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed text-text-grey">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
