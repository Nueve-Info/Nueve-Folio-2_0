import {
  Navbar,
  Hero,
  Logos,
  Problem,
  Agenda,
  ShipCta,
  Insights,
  FeaturedTestimonial,
  Story,
  AiSection,
  PublishSection,
  MentorSection,
  CourseFit,
  SocialProof,
  Pricing,
  Guarantee,
  Testimonials,
  VideoDeepDive,
  Faq,
  Footer,
} from "@/components/landing"
import { LazySection } from "@/components/ui/lazy-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* ── Above the fold: loaded immediately ── */}
        <Hero />
        <Logos />

        {/* ── Below the fold: lazy-loaded as the user scrolls ── */}
        <LazySection minHeight="600px">
          <Problem />
        </LazySection>
        <LazySection minHeight="500px">
          <Agenda />
        </LazySection>
        <LazySection minHeight="300px">
          <ShipCta />
        </LazySection>
        <LazySection minHeight="400px">
          <Insights />
        </LazySection>
        <LazySection minHeight="400px">
          <FeaturedTestimonial />
        </LazySection>
        <LazySection minHeight="400px">
          <Story />
        </LazySection>
        <LazySection minHeight="500px">
          <AiSection />
        </LazySection>
        <LazySection minHeight="400px">
          <PublishSection />
        </LazySection>
        <LazySection minHeight="400px">
          <MentorSection />
        </LazySection>
        <LazySection minHeight="400px">
          <CourseFit />
        </LazySection>
        <LazySection minHeight="300px">
          <SocialProof />
        </LazySection>
        <LazySection minHeight="500px">
          <Pricing />
        </LazySection>
        <LazySection minHeight="300px">
          <Guarantee />
        </LazySection>
        <LazySection minHeight="400px">
          <Testimonials />
        </LazySection>
        <LazySection minHeight="400px">
          <VideoDeepDive />
        </LazySection>
        <LazySection minHeight="300px">
          <Faq />
        </LazySection>
      </main>
      <LazySection minHeight="200px">
        <Footer />
      </LazySection>
    </div>
  )
}
