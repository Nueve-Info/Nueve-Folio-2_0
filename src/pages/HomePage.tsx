import { useState } from "react"
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
  LeadMagnetSection,
  LeadMagnetPopup,
  Faq,
  Footer,
} from "@/components/landing"
import { useLeadMagnetTrigger } from "@/hooks/useLeadMagnetTrigger"

export default function HomePage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const { showPopup, dismissPopup } = useLeadMagnetTrigger(isCheckoutOpen)

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
        <Pricing
          isCheckoutOpen={isCheckoutOpen}
          onCheckoutChange={setIsCheckoutOpen}
        />
        <Guarantee />
        <Testimonials />
        <VideoDeepDive />
        <LeadMagnetSection />
        <Faq />
      </main>
      <Footer />
      <LeadMagnetPopup isOpen={showPopup} onClose={dismissPopup} />
    </div>
  )
}
