import { Section } from "@/components/ui/section"

// Import logos from src/logos
import Accenture from "@/logos/Accenture.svg"
import Allegro from "@/logos/Allegro.pl_sklep.svg"
import Behance from "@/logos/behance-3.svg"
import CocaCola from "@/logos/Coca-Cola-European-Partners.svg"
import EsteeLauder from "@/logos/estee-lauder.svg"
import Heineken from "@/logos/Heineken_logo.svg"
import Mattel from "@/logos/Mattel_Creations.svg"
import Medium from "@/logos/Medium_(website)_logo.svg"
import Samsung from "@/logos/Samsung_wordmark.svg"
import Vans from "@/logos/Vans_(brand)_logo.svg"

const logos = [
  { src: Samsung, alt: "Samsung", color: "#1428a0" },
  { src: Medium, alt: "Medium", color: "#000000" },
  { src: Allegro, alt: "Allegro", color: "#ff5a00" },
  { src: Accenture, alt: "Accenture", color: "#a100ff" },
  { src: Behance, alt: "Behance", color: "#0057ff" },
  { src: Mattel, alt: "Mattel", color: "#e4002b" },
  { src: CocaCola, alt: "Coca Cola", color: "#f40009" },
  { src: EsteeLauder, alt: "Estee Lauder", color: "#002d5d" },
  { src: Heineken, alt: "Heineken", color: "#217121" },
  { src: Vans, alt: "Vans", color: "#ba0c2f" },
]

export function Logos() {
  return (
    <Section id="logos" className="bg-transparent py-0">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-8 sm:gap-x-6 lg:gap-x-12">
        {logos.map((logo, index) => (
          <div key={index} className="flex justify-center group w-[calc(25%-1rem)] sm:w-[calc(16.66%-1.5rem)] lg:w-[calc(10%-3rem)]">
            <img
              src={logo.src}
              alt={logo.alt}
              style={{ "--brand-color": logo.color } as React.CSSProperties}
                className="h-8 md:h-10 lg:h-12 w-auto object-contain hover:scale-110 transition-all duration-500 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </Section>
  )
}
