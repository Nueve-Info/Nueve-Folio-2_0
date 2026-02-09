import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { Star } from "lucide-react"

const testimonialData = [
  {
    initials: "SK",
    name: "Miro K.",
    role: "Product Designer",
    content: "(...) This later allowed me to land a $5000 project, which led to getting a full-time job.",
    avatar: null
  },
  {
    initials: "MM",
    name: "Monique M.",
    role: "UX Designer",
    content: "Folio was a game changer for me. It allowed me to showcase my work in a way that was not possible before.",
    avatar: "/avatars/monique.png"
  },
  {
    initials: "CK",
    name: "Chris K.",
    role: "Freelance Designer",
    content: "I get so many projects that I can comfortably work as a freelancer.",
    avatar: "/avatars/krystian.png"
  }
]

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-nueve-black mb-6">
            Join The First Wave of <span className="text-brand-orange">Design Engineers</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {testimonialData.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface-grey/30 rounded-2xl p-6 border border-black/5 shadow-sm hover:border-brand-orange/30 transition-all flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                {t.avatar ? (
                  <img 
                    src={t.avatar} 
                    alt={t.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-black/5"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-light flex items-center justify-center text-white font-bold text-sm">
                    {t.initials}
                  </div>
                )}
                <div>
                  <div className="font-bold text-nueve-black">{t.name}</div>
                  <div className="text-sm text-text-grey">{t.role}</div>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                  ))}
                </div>
                <p className="text-nueve-black font-medium text-lg leading-relaxed">
                  "{t.content}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="flex items-center justify-center gap-4">
            <div className="flex -space-x-4">
              {[
                { src: "/avatars/alumni-3.png", alt: "Alumni 1" },
                { src: "/avatars/krystian.png", alt: "Alumni 2" },
                { src: "/avatars/monique.png", alt: "Alumni 3" },
              ].map((avatar, i) => (
                <div
                  key={i}
                  className="h-12 w-12 overflow-hidden rounded-full border-2 border-white bg-nueve-black shadow-sm"
                >
                  <img
                    src={avatar.src}
                    alt={avatar.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="text-lg font-bold text-nueve-black">
              2,900+ Nueve Alumni
            </span>
          </div>
        </div>
      </div>
    </Section>
  )
}
