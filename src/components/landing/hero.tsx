import { useEffect } from "react"
import { motion } from "framer-motion"
import { HeroBackground } from "./hero-background"
import { PlaceholderBlock } from "@/components/ui"

export function Hero() {
  useEffect(() => {
    // Load Vimeo player script
    const script = document.createElement("script")
    script.src = "https://player.vimeo.com/api/player.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background bg-[radial-gradient(at_40%_0%,rgba(255,179,71,0.12)_0px,transparent_50%),radial-gradient(at_60%_0%,rgba(248,129,13,0.12)_0px,transparent_50%)] pt-32 pb-20 lg:pt-40 lg:pb-24">
      {/* Unicorn Studio Embed */}
      <HeroBackground className="bg-transparent" />
      
      <div className="relative z-10 mx-auto max-w-[1440px] px-2.5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/5 px-4 py-1.5 text-sm font-bold text-brand-orange">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-orange"></span>
              </span>
              Enrollment open now
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-nueve-black"
          >
            Build a UX/UI portfolio that{" "}
            <span className="relative inline-block whitespace-nowrap px-2">
              <span className="absolute inset-0 -z-10 translate-y-1 -rotate-2 scale-[1.05] rounded-lg bg-gradient-to-r from-brand-orange to-brand-orange-light" />
              <span className="relative z-10 text-white">gets you hired</span>
            </span>{" "}
            in&nbsp;2026
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-8 max-w-2xl text-lg font-medium text-text-grey sm:text-xl"
          >
            Online masterclass with mentorship to help you craft a job-winning case valid for the AI era.
          </motion.p>

          {/* Alumni avatars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <div className="flex -space-x-4">
              {[
                { src: "/avatars/alumni-3.png", alt: "Alumni 1" },
                { src: "/avatars/krystian.png", alt: "Alumni 2" },
                { src: "/avatars/monique.png", alt: "Alumni 3" },
              ].map((avatar, i) => (
                <div
                  key={i}
                  className="h-12 w-12 overflow-hidden rounded-full border-2 border-white bg-nueve-black shadow-sm"
                >
                  <img
                    src={avatar.src}
                    alt={avatar.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="text-lg font-bold text-nueve-black">
              2,900+ Nueve Alumni
            </span>
          </motion.div>
        </div>

        {/* Vimeo Video - Moved outside the max-w-4xl container to use full max-w-7xl width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <PlaceholderBlock
            className="mx-auto aspect-video w-full rounded-2xl shadow-2xl ring-1 ring-gray-900/10"
            videoUrl="https://player.vimeo.com/video/1160304896"
          />
        </motion.div>
      </div>
    </section>
  )
}
