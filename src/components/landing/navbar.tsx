import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn, scrollToSection } from "@/lib/utils"
import { useCountdown } from "@/hooks/useCountdown"

export function Navbar() {
  const [isOpen] = useState(false)
  const { scrollY } = useScroll()
  const [isMobile, setIsMobile] = useState(false)
  const { isExpired } = useCountdown()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])
  
  // Logo scale on scroll (navbar height stays fixed)
  const logoScale = useTransform(scrollY, [0, 50], [1, 0.9])

  return (
    <nav className={cn(
      "fixed left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300",
      isExpired ? "top-0" : "top-[59px] md:top-[72px]"
    )}>
      <motion.div 
        style={isMobile ? { height: 72 } : {}}
        className={cn(
          "flex w-full items-center justify-between pointer-events-auto transition-all duration-300",
          isMobile 
            ? "bg-white/40 backdrop-blur-lg border-b border-black/5 rounded-b-[24px]" 
            : "max-w-7xl mx-auto px-6 lg:px-8 mt-6 bg-transparent border-none"
        )}
      >
        <div className={cn(
          "flex w-full items-center justify-between h-full",
          isMobile ? "max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8" : ""
        )}>
          {/* Left Side: Logo (Pill on Desktop) */}
          <div className={cn(
            "flex items-center transition-all duration-300",
            !isMobile && "bg-white/40 backdrop-blur-lg border border-black/5 rounded-full px-6 py-3"
          )}>
            <motion.a 
              href="/" 
              className="flex items-center"
              style={{ scale: isMobile ? logoScale : 1 }}
            >
              <img 
                src="/logos/nueve-logo.png" 
                alt="Nueve Logo" 
                className={cn("h-4 md:h-5 w-auto", isMobile && "px-4")}
              />
            </motion.a>
          </div>

          {/* Right Side: Join Button (Pill on Desktop) */}
          <div 
            className={cn(
              "flex items-center",
              isMobile && "py-2"
            )}
          >
            <Button 
              variant="default" 
              size="lg" 
              rounded="pill" 
              className="bg-gradient-to-r from-brand-orange to-brand-orange-light text-white font-bold px-8 hover:opacity-90 transition-opacity shadow-sm h-12"
              onClick={() => scrollToSection('pricing')}
            >
              Join Now
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-6 right-6 border border-black/5 bg-white/60 backdrop-blur-lg rounded-2xl md:hidden pointer-events-auto overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              <a href="#" className="text-nueve-black font-medium">Features</a>
              <a href="#" className="text-nueve-black font-medium">Pricing</a>
              <a href="#" className="text-nueve-black font-medium">About</a>
              <hr className="border-black/5" />
              <Button 
                variant="default" 
                size="default" 
                rounded="pill" 
                className="bg-gradient-to-r from-brand-orange to-brand-orange-light text-white"
                onClick={() => scrollToSection('pricing')}
              >
                Join Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
