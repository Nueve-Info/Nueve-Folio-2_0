import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import testimonialImage from "@/assets/girl.png"

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

export function SocialProof() {
  return (
    <Section id="social-proof" className="bg-white py-12 md:py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white shadow-sm">
            <img 
              src={testimonialImage} 
              alt="Slawek Kozik" 
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-lg font-medium text-nueve-black md:text-xl max-w-2xl">
            "Nueve Folio changed my career and helped me land my dream role."<br></br><span className="text-brand-orange">Margaret | Design Lead | SemHub</span>
          </p>
        </div>

        {/* Logos row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:mt-12 md:gap-8 lg:gap-12">
          {logos.map((logo, index) => (
            <div key={index} className="group relative flex items-center justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-6 md:h-8 lg:h-9 w-auto object-contain opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}
