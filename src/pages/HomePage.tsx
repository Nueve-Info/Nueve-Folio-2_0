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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Logos />
        <Problem />
        <Agenda />
        <ShipCta />
        <Insights />
        <FeaturedTestimonial />
        <Story />
        <AiSection />
        <PublishSection />
        <MentorSection />
        <CourseFit />
        <SocialProof />
        <Pricing />
        <Guarantee />
        <Testimonials />
        <VideoDeepDive />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
