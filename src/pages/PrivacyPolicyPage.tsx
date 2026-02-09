import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Section } from "@/components/ui/section"

const tocItems = [
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "google-analytics-gtm", label: "Google Analytics & GTM" },
  { id: "meta-technologies", label: "Meta Technologies" },
  { id: "embedded-content", label: "Embedded Content" },
  { id: "how-we-use", label: "How We Use Information" },
  { id: "legal-basis", label: "Legal Basis" },
  { id: "your-rights", label: "Your Rights" },
  { id: "cookies", label: "Cookies" },
  { id: "changes", label: "Changes to This Policy" },
]

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = "Privacy Policy — NueveFolio 2.0"
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky glassmorphism header */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="flex w-full items-center justify-between pointer-events-auto max-w-7xl mx-auto px-6 lg:px-8 mt-6 bg-transparent border-none">
          {/* Logo pill */}
          <div className="flex items-center bg-white/40 backdrop-blur-lg border border-black/5 rounded-full px-6 py-3">
            <Link to="/" className="flex items-center">
              <img
                src="/logos/nueve-logo.png"
                alt="Nueve Logo"
                className="h-4 md:h-5 w-auto"
              />
            </Link>
          </div>

          {/* Back to home pill */}
          <Link
            to="/"
            className="flex items-center gap-2 bg-white/40 backdrop-blur-lg border border-black/5 rounded-full px-6 py-3 text-sm font-bold text-nueve-black hover:bg-white/60 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero / title area */}
        <Section className="pt-36 md:pt-44 pb-8 md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-sm font-bold uppercase tracking-wider text-text-grey mb-4">
              Last updated: January 30, 2026
            </p>
            <h1 className="text-nueve-black">
              Privacy Policy<span className="text-brand-orange">.</span>
            </h1>
            <p className="mt-6 text-lg text-text-grey leading-relaxed max-w-2xl">
              This Privacy Policy explains how DOKO Stanislaw Swiatkiewicz
              ("we", "us", "our") collects, uses, and shares information when
              you visit or use this website (the "Site").
            </p>
          </motion.div>
        </Section>

        {/* Table of Contents + Content */}
        <Section className="pt-0 pb-20 md:pb-32">
          <div className="max-w-3xl mx-auto">
            {/* Table of Contents */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="mb-16 rounded-2xl border border-black/5 bg-white p-6 md:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-text-grey mb-4">
                On this page
              </p>
              <ol className="grid gap-2 md:grid-cols-2">
                {tocItems.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="group flex items-baseline gap-2 text-sm text-nueve-black hover:text-brand-orange transition-colors"
                    >
                      <span className="text-xs font-bold text-text-grey/50 group-hover:text-brand-orange transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </motion.nav>

            {/* Policy content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="prose-nueve"
            >
              {/* Controller */}
              <p className="text-sm font-bold text-nueve-black mb-12">
                Controller / Business:{" "}
                <span className="text-brand-orange">
                  DOKO Stanislaw Swiatkiewicz
                </span>
              </p>

              {/* Section: Information We Collect */}
              <PolicySection id="information-we-collect" number="01" title="Information We Collect">
                <p>
                  We may collect information you provide directly (for example,
                  when contacting us) and information collected automatically
                  when you use the Site.
                </p>
                <ul>
                  <li>
                    <strong>Cookie / similar technologies:</strong> identifiers
                    used for analytics/advertising where enabled.
                  </li>
                  <li>
                    <strong>Usage data:</strong> pages viewed, clicks,
                    approximate location, device/browser info, and referrer
                    URLs.
                  </li>
                  <li>
                    <strong>Contact data:</strong> name, email, and message
                    content (if you email us).
                  </li>
                </ul>
              </PolicySection>

              {/* Section: Google Analytics & GTM */}
              <PolicySection id="google-analytics-gtm" number="02" title="Google Analytics & Google Tag Manager">
                <p>
                  We use (or may use) Google Analytics 4 (GA4) to understand how
                  visitors interact with the Site (e.g., page views and
                  engagement). GA4 may set cookies or use similar technologies
                  to collect usage data.
                </p>
                <p>
                  We also use (or may use) Google Tag Manager (GTM) to deploy
                  and manage tags (including GA4 and other tools). GTM itself
                  does not typically collect personal data, but tags deployed
                  through GTM may.
                </p>
                <ul>
                  <li>
                    <strong>More info:</strong> Google's documentation and
                    policies explain how Google processes data.
                  </li>
                  <li>
                    <strong>Opt-out:</strong> You can use the Google Analytics
                    opt-out browser add-on (where available) or adjust your
                    cookie preferences.
                  </li>
                </ul>
              </PolicySection>

              {/* Section: Meta Technologies */}
              <PolicySection id="meta-technologies" number="03" title="Meta Technologies">
                <p>
                  We use (or may use) Meta technologies such as the Meta Pixel
                  (sometimes referred to as a "Meta tag") to measure ad
                  performance, build audiences, and understand conversions.
                </p>
                <p>
                  Meta may collect information about your interaction with the
                  Site and may use cookies or similar technologies. This data
                  may be used for interest-based advertising.
                </p>
                <ul>
                  <li>
                    <strong>Opt-out:</strong> You can manage ad preferences in
                    your Meta account and/or via your device/browser settings.
                  </li>
                </ul>
              </PolicySection>

              {/* Section: Embedded Content */}
              <PolicySection id="embedded-content" number="04" title="Embedded Content (Vimeo)">
                <p>
                  The Site includes embedded videos (for example, via Vimeo).
                  When you view an embedded video, Vimeo may collect usage data
                  and set cookies according to their policies.
                </p>
                <p>
                  We do not control how third-party embedded providers collect
                  or use data. Please review their privacy policies for details.
                </p>
              </PolicySection>

              {/* Section: How We Use Information */}
              <PolicySection id="how-we-use" number="05" title="How We Use Information">
                <ul>
                  <li>
                    To comply with legal obligations and protect against
                    abuse/fraud.
                  </li>
                  <li>To communicate with you (if you contact us).</li>
                  <li>
                    To measure marketing performance and understand user
                    behavior (analytics).
                  </li>
                  <li>To operate and improve the Site.</li>
                </ul>
              </PolicySection>

              {/* Section: Legal Basis */}
              <PolicySection id="legal-basis" number="06" title="Legal Basis (GDPR / UK GDPR)">
                <p>
                  Where GDPR/UK GDPR applies, we process personal data under
                  legal bases such as consent (for non-essential cookies),
                  legitimate interests (site improvement and security), and
                  contract (where relevant).
                </p>
              </PolicySection>

              {/* Section: Your Rights */}
              <PolicySection id="your-rights" number="07" title="Your Rights">
                <p>
                  Depending on your location, you may have rights to access,
                  correct, delete, or object to processing of your personal
                  data, and to withdraw consent for cookie-based processing.
                </p>
              </PolicySection>

              {/* Section: Cookies */}
              <PolicySection id="cookies" number="08" title="Cookies">
                <p>
                  Cookies are small text files stored on your device. Some
                  cookies are necessary for the Site to work, while others are
                  used for analytics and advertising. You can control cookies
                  through your browser settings and (where available) on-site
                  consent tools.
                </p>
              </PolicySection>

              {/* Section: Changes */}
              <PolicySection id="changes" number="09" title="Changes to This Policy">
                <p>
                  We may update this Privacy Policy from time to time. We will
                  post the updated version on this page and update the "Last
                  updated" date above.
                </p>
              </PolicySection>
            </motion.article>

            {/* Footer / back link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-20 pt-8 border-t border-black/5 flex items-center justify-between"
            >
              <Link
                to="/"
                className="flex items-center gap-2 text-sm font-bold text-nueve-black hover:text-brand-orange transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
              <p className="text-xs text-text-grey">
                &copy; {new Date().getFullYear()} DOKO Stanislaw Swiatkiewicz
              </p>
            </motion.div>
          </div>
        </Section>
      </main>
    </div>
  )
}

/* ─── Helper component for each policy section ─── */

function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mb-14 scroll-mt-28">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-xs font-bold text-brand-orange">{number}</span>
        <h3 className="text-nueve-black !text-xl sm:!text-2xl">{title}</h3>
      </div>
      <div className="space-y-4 text-text-grey leading-relaxed text-base [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-nueve-black [&_strong]:font-semibold">
        {children}
      </div>
    </section>
  )
}
