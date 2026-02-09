export function Footer() {
  return (
    <footer className="bg-[#0C0C0C] py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <img 
                src="/logos/nueve-logo.png" 
                alt="Nueve Logo" 
                className="h-5 w-auto invert" 
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              The premier design engineering course helping designers bridge the gap to code and build elite portfolios.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Nueve. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="/privacy-policy" className="text-white/40 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
