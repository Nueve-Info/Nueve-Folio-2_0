import { Section } from "@/components/ui/section"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"

const logos = [
  "/logos/samsung.png",
  "/logos/medium.png",
  "/logos/allegro.png",
  "/logos/accenture.png",
  "/logos/behance.png",
  "/logos/mattel.png",
  "/logos/comarch.png",
  "/logos/agh.png",
  "/logos/pzu.png",
  "/logos/timberland.png",
  "/logos/dhl.png",
  "/logos/vans.png",
  "/logos/heineken.png",
  "/logos/estee-lauder.png",
]

export function Logos() {
  return (
    <Section id="logos" className="bg-transparent pt-0 pb-12 md:pb-16 lg:pb-20">
      <div className="overflow-hidden rounded-2xl bg-brand-orange p-8 md:p-12 lg:p-16">
        <div className="grid grid-cols-2 items-center gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-x-10 lg:grid-cols-5 lg:gap-x-12">
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={logo}
                alt={`Logo ${index}`}
                className="h-10 md:h-12 w-auto object-contain brightness-0 invert opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
