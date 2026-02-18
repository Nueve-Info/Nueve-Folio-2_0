import {
  AnnouncementBar,
  Navbar,
  Hero,
  Logos,
  Agenda,
  MarketChanged,
  ShipCta,
  Insights,
  FeaturedTestimonial,
  Story,
  AiSection,
  PublishSection,
  MeetMentor,
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
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <Logos />
        {/* <Problem /> */}
        <MarketChanged />
        <Agenda />
        <ShipCta />
        <Insights />
        <FeaturedTestimonial />
        <Story />
        <AiSection />
        <PublishSection />
        <MeetMentor />
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
