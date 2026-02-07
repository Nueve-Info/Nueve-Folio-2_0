import { useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  
  // Transform values based on scroll position
  const height = useTransform(scrollY, [0, 50], [72, 60])
  const paddingTop = useTransform(scrollY, [0, 50], [0, 12])
  const logoScale = useTransform(scrollY, [0, 50], [1, 0.9])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.div 
        style={{ height, paddingTop }}
        className="flex w-full items-center justify-between pointer-events-auto bg-white/40 backdrop-blur-lg border-b border-black/5 rounded-b-[24px]"
      >
        <div className="flex w-full max-w-7xl mx-auto items-center justify-between px-2.5 sm:px-6 lg:px-8 h-full">
          {/* Logo */}
          <motion.a 
            href="/" 
            className="flex items-center"
            style={{ scale: logoScale }}
          >
            <img 
              src="/logos/nueve-logo.png" 
              alt="Nueve Logo" 
              className="h-4 md:h-5 w-auto px-4"
            />
          </motion.a>

          {/* Right Side: Join Button */}
          <div 
            className="flex items-center py-2"
          >
            <Button 
              variant="default" 
              size="lg" 
              rounded="pill" 
              className="bg-gradient-to-r from-brand-orange to-brand-orange-light text-white font-bold px-8 hover:opacity-90 transition-opacity shadow-sm h-12"
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
              <Button variant="default" size="default" rounded="pill" className="bg-gradient-to-r from-brand-orange to-brand-orange-light text-white">
                Join Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
