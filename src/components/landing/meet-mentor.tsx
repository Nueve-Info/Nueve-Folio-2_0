import { motion } from "framer-motion"
import { Cpu, Clock, Briefcase } from "lucide-react"
import { Section } from "@/components/ui/section"
import mentorAvatar from "@/assets/mentor-avatar.png"

const highlights = [
  {
    icon: Cpu,
    label: "Silicon Valley AI techniques",
  },
  {
    icon: Clock,
    label: "24/7 access to a mentor",
  },
]

const stats = [
  { value: "14+", label: "Years of experience" },
  { value: "2,900+", label: "Students mentored" },
]

export function MeetMentor() {
  return (
    <Section id="meet-mentor" className="py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 lg:p-20"
      >
        <div className="relative flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-1.5 shadow-sm">
              <Briefcase className="h-3.5 w-3.5 text-brand-orange" />
              <span className="text-xs font-bold uppercase tracking-widest text-text-grey">
                Industry Expert
              </span>
            </div>

            <h2 className="text-nueve-black">
              Meet your{" "}
              <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">
                mentor
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-text-grey sm:text-xl">
              Learn real-world design from a mentor with 14+ years at companies
              like <span className="text-nueve-black">Vans</span> and{" "}
              <span className="text-nueve-black">Mattel</span> — only the
              techniques that actually ship.
            </p>

            {/* Highlight Badges */}
            <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-2.5 rounded-full border border-brand-orange/20 bg-brand-orange/5 px-5 py-2.5"
                >
                  <item.icon className="h-4 w-4 text-brand-orange" />
                  <span className="text-sm font-bold text-nueve-black">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mentor Visual */}
          <div className="w-full shrink-0 lg:w-[400px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Mentor Card */}
              <div className="overflow-hidden rounded-3xl border border-black/5">
                {/* Avatar */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-grey">
                  <img
                    src={mentorAvatar}
                    alt="Stan Swiatkiewicz — Lead Mentor"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Info Bar */}
                <div className="p-6">
                  <p className="text-lg font-black tracking-tight text-nueve-black">
                    Stan Swiatkiewicz
                  </p>
                  <p className="mt-1 text-sm font-medium text-text-grey">
                    Lead Mentor · Product Designer
                  </p>

                  {/* Stats */}
                  <div className="mt-4 flex gap-6">
                    {stats.map((stat, i) => (
                      <div key={i}>
                        <p className="text-xl font-black tracking-tight text-brand-orange">
                          {stat.value}
                        </p>
                        <p className="text-xs font-medium text-text-grey">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Company Badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -left-4 top-8 rounded-xl border border-black/5 bg-white px-4 py-2.5 shadow-sm lg:-left-8"
              >
                <p className="text-xs font-bold text-text-grey">Worked with</p>
                <p className="mt-0.5 text-sm font-black tracking-tight text-nueve-black">
                  Vans · Mattel
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -right-4 bottom-28 rounded-xl border border-black/5 bg-white px-4 py-2.5 shadow-sm lg:-right-8"
              >
                <p className="text-xs font-bold text-text-grey">Experience</p>
                <p className="mt-0.5 text-sm font-black tracking-tight text-nueve-black">
                  14+ years
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
