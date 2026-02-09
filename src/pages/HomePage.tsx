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
      </main>
      <Footer />
    </div>
  )
}
