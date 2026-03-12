import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { HeroBackground } from "./hero-background"
import { FloatingBubbles } from "./floating-bubbles"
import { useBubbleAiAbConfig } from "@/lib/experiments"

export function Hero() {
  const videoRef = useRef<HTMLDivElement>(null)
  const [loadVideo, setLoadVideo] = useState(false)
  const { heroH1Variant } = useBubbleAiAbConfig()

  // ── Defer Vimeo iframe: only load when video area is near viewport ──
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadVideo(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Load Vimeo player API script only when iframe is loaded
  useEffect(() => {
    if (!loadVideo) return

    const script = document.createElement("script")
    script.src = "https://player.vimeo.com/api/player.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [loadVideo])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background bg-[radial-gradient(at_40%_0%,rgba(255,179,71,0.12)_0px,transparent_50%),radial-gradient(at_60%_0%,rgba(248,129,13,0.12)_0px,transparent_50%)] pt-40 pb-20 lg:pt-48 lg:pb-24">
      {/* Unicorn Studio Embed */}
      <HeroBackground className="bg-transparent" />
      
      <div className="relative z-10 mx-auto max-w-[1440px] px-2.5 sm:px-6 lg:px-8">
        <div className="relative">
          <FloatingBubbles className="z-20" />
          <div className="mx-auto max-w-5xl text-center relative z-10">
            {/* Alumni badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-3">
              {[
                { src: "/avatars/alumni-3.png", alt: "Alumni 1" },
                { src: "/avatars/krystian.png", alt: "Alumni 2" },
                { src: "/avatars/monique.png", alt: "Alumni 3" },
              ].map((avatar, i) => (
                <div
                  key={i}
                  className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-nueve-black shadow-sm"
                >
                  <img
                    src={avatar.src}
                    alt={avatar.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="text-sm font-bold text-nueve-black">
              2,900+ Nueve Alumni
            </span>
          </motion.div>

          {/* Heading — A/B tested via PostHog */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-nueve-black"
          >
            {heroH1Variant === "B" ? (
              <>
                Land your dream UX/UI role with a{" "}
                <span className="relative inline-block whitespace-nowrap px-2">
                  <span className="absolute inset-0 -z-10 translate-y-1 -rotate-2 scale-[1.05] rounded-lg bg-gradient-to-r from-brand-orange to-brand-orange-light" />
                  <span className="relative z-10 text-white">portfolio that converts</span>
                </span>
              </>
            ) : (
              <>
                Build a UX/UI portfolio that{" "}
                <span className="relative inline-block whitespace-nowrap px-2">
                  <span className="absolute inset-0 -z-10 translate-y-1 -rotate-2 scale-[1.05] rounded-lg bg-gradient-to-r from-brand-orange to-brand-orange-light" />
                  <span className="relative z-10 text-white">gets you hired</span>
                </span>{" "}
                in&nbsp;2026
              </>
            )}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-8 max-w-2xl text-lg font-medium text-text-grey sm:text-xl"
          >
            Online masterclass with mentorship to help you craft a job-winning case valid for the{" "}
            <span className="relative inline-block whitespace-nowrap px-1">
              <span className="absolute inset-0 -z-10 translate-y-0.5 -rotate-1 scale-[1.02] rounded bg-gradient-to-r from-brand-orange to-brand-orange-light opacity-20" />
              <span className="relative z-10 font-bold text-brand-orange">AI era.</span>
            </span>
          </motion.p>

          {/* Trustpilot – Micro TrustScore (static) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex justify-center"
          >
            <a
              href="https://www.trustpilot.com/review/nueve.design"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm no-underline"
            >
              {/* Trustpilot star icon */}
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 0L15.6 8.4H24L17.4 13.2L19.8 22.8L12 17.4L4.2 22.8L6.6 13.2L0 8.4H8.4L12 0Z" fill="#00b67a" />
                <path d="M16.8 15.6L15.6 8.4L12 17.4L16.8 15.6Z" fill="#005128" />
              </svg>
              <span className="font-bold text-nueve-black">TrustScore 4.5</span>
              <span className="mx-0.5 text-black/20">|</span>
              <span className="text-text-grey">15 reviews</span>
              <span className="mx-0.5 text-black/20">|</span>
              {/* Trustpilot logo */}
              <svg className="h-4" viewBox="0 0 120 30" fill="none" aria-hidden="true">
                <path d="M30.6 11.1H24.1L22 4.5L19.9 11.1H13.4L18.8 15.3L16.7 21.9L22 17.7L27.3 21.9L25.2 15.3L30.6 11.1Z" fill="#00b67a" />
                <text x="34" y="20" fill="#191919" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="700" letterSpacing="-0.01em">Trustpilot</text>
              </svg>
            </a>
          </motion.div>

          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <div
            ref={videoRef}
            className="mx-auto aspect-video w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gray-900/10 bg-nueve-black"
          >
            {loadVideo ? (
              <iframe
                src="https://player.vimeo.com/video/1163267877?autoplay=1&muted=1&loop=1&badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&playsinline=1&background=1"
                className="h-full w-full"
                frameBorder="0"
                sandbox="allow-scripts allow-same-origin"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Hero_trimed"
                loading="lazy"
              ></iframe>
            ) : (
              /* Lightweight placeholder while iframe loads */
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-orange border-t-transparent" />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
