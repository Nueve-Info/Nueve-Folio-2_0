import { Link } from "react-router-dom"
import { Section } from "@/components/ui/section"

export function FinalCta() {
  return (
    <Section id="final-cta" className="bg-white py-12 md:py-16 lg:py-24">
      <div className="border-t border-black/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-grey">
          &copy; {new Date().getFullYear()} DOKO Stanislaw Swiatkiewicz. All
          rights reserved.
        </p>
        <Link
          to="/privacy-policy"
          className="text-xs font-semibold text-text-grey hover:text-brand-orange transition-colors"
        >
          Privacy Policy
        </Link>
      </div>
    </Section>
  )
}
