import { useState, useEffect, useRef } from "react"
import { useMotionValueEvent } from "framer-motion"
import type { MotionValue } from "framer-motion"

// Eagerly import all eye-sequence frames — Vite resolves each to its final URL
const frameModules = import.meta.glob<string>("@/assets/eye_sequence/*.png", {
  eager: true,
  import: "default",
})

// Sort by filename to guarantee correct order
const frameUrls: string[] = Object.entries(frameModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)

interface EyeSequenceProps {
  progress: MotionValue<number>
  className?: string
}

export function EyeSequence({ progress, className = "" }: EyeSequenceProps) {
  const [frameIndex, setFrameIndex] = useState(0)
  const imgRef = useRef<HTMLImageElement>(null)
  const prefersReducedMotion = useRef(false)

  // Detect reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    prefersReducedMotion.current = mq.matches
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Preload all frames into the browser's image cache
  useEffect(() => {
    frameUrls.forEach((url) => {
      const img = new Image()
      img.src = url
    })
  }, [])

  // Map scroll progress (0–1) → frame index
  useMotionValueEvent(progress, "change", (p) => {
    if (prefersReducedMotion.current) return
    const clamped = Math.max(0, Math.min(1, p))
    const idx = Math.round(clamped * (frameUrls.length - 1))
    setFrameIndex(idx)
  })

  if (frameUrls.length === 0) return null

  return (
    <img
      ref={imgRef}
      src={frameUrls[frameIndex]}
      alt="Eye animation sequence"
      className={`h-full w-full object-contain ${className}`}
      draggable={false}
    />
  )
}
