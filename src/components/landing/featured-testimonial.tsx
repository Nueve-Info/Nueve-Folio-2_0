import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { Quote } from "lucide-react"
import testimonialImage from "@/assets/Screenshot 2026-02-05 at 16.28.27 1.png"

export function FeaturedTestimonial() {
  return (
    <Section id="featured-testimonial" className="bg-white py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-black/5 bg-surface-grey/30 p-8 md:p-12 lg:p-20"
      >
        {/* Background Accent */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-orange/10 blur-[100px]" />
        
        <div className="relative z-10 flex flex-col items-center gap-10 md:flex-row md:items-start lg:gap-16">
          {/* Photo with Nueve styling */}
          <div className="relative shrink-0">
            <div className="absolute -inset-2 rounded-2xl bg-brand-orange/20 opacity-20 blur-sm" />
            <div className="relative h-64 w-48 overflow-hidden rounded-2xl border border-nueve-black/5 bg-white md:h-80 md:w-60 lg:h-[400px] lg:w-[300px]">
              <img 
                src={testimonialImage} 
                alt="Slawek Kozik" 
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-all duration-500"
              />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <Quote className="mb-6 h-12 w-12 text-brand-orange opacity-50 mx-auto md:mx-0" />
            
            <h3 className="text-nueve-black">
              "In 2025 I landed my dream role at{" "}
              <span className="text-brand-orange">Santander Bank</span>"
            </h3>
            
            <p className="mt-8 text-lg font-medium leading-relaxed text-text-grey sm:text-xl lg:text-2xl">
              The Nueve Folio masterclass was the turning point. I stopped sending basic wireframes and started telling stories that recruiters actually wanted to read.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4 md:justify-start">
              <div className="h-px w-12 bg-brand-orange/50" />
              <div>
                <p className="text-xl font-black text-nueve-black">Slawek Kozik</p>
                <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">UX Designer @ Santander</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
