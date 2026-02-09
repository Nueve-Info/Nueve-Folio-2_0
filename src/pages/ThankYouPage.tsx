/**
 * Thank-you / success page shown after a successful purchase.
 *
 * Configure your external checkout provider to redirect here on success:
 *
 *   Stripe Checkout
 *     success_url: "https://yourdomain.com/thank-you?session_id={CHECKOUT_SESSION_ID}"
 *
 *   LemonSqueezy
 *     redirect_url: "https://yourdomain.com/thank-you"
 *
 *   Paddle
 *     successUrl: "https://yourdomain.com/thank-you"
 */

import { motion } from "framer-motion"
import { Mail, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import thankYouImg from "@/assets/thank-you-image.png"

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      {/* Radial glow behind the icon */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full bg-brand-orange/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="h-48 w-48 md:h-64 md:w-64 overflow-hidden rounded-full border-4 border-brand-orange/20 shadow-2xl shadow-brand-orange/10">
            <img 
              src={thankYouImg} 
              alt="Thank you" 
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-nueve-black">
          You're in<span className="text-brand-orange">.</span>
        </h1>

        {/* Sub-heading */}
        <p className="mt-6 max-w-md text-lg font-medium text-text-grey md:text-xl">
          Thanks for joining — you'll receive an email soon with all the details to get started.
        </p>

        {/* Email notice card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 w-full max-w-sm rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-center gap-3 text-nueve-black">
            <Mail className="h-5 w-5 shrink-0 text-brand-orange" />
            <span className="text-sm font-bold uppercase tracking-wider">Check your inbox</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-grey">
            Don't see it? Check your spam or promotions folder. If it hasn't arrived within 10 minutes, reach out to{" "}
            <a
              href="mailto:info@nueve.design"
              className="text-brand-orange font-bold underline underline-offset-2 hover:text-brand-orange-light transition-colors"
            >
              info@nueve.design
            </a>
          </p>
        </motion.div>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10"
        >
          <Link to="/">
            <Button
              variant="default"
              size="lg"
              rounded="pill"
              className="bg-brand-orange text-white hover:bg-brand-orange/90 font-bold px-8 shadow-lg shadow-brand-orange/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
