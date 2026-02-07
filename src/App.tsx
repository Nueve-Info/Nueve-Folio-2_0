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
  FinalCta,
  VideoDeepDive,
} from "@/components/landing"

function App() {
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
        <FinalCta />
        <VideoDeepDive />
      </main>
    </div>
  )
}

export default App
