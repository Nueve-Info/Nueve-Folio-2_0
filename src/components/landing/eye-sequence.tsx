import { useEffect, useRef, useCallback } from "react"
import type { MotionValue } from "framer-motion"

// ---------------------------------------------------------------------------
// 1. Eagerly resolve frame URLs at module level (runs once, no runtime cost)
// ---------------------------------------------------------------------------
const frameModules = import.meta.glob<string>("@/assets/eye_sequence/*.png", {
  eager: true,
  import: "default",
})

const frameUrls: string[] = Object.entries(frameModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)

// ---------------------------------------------------------------------------
// 2. Module-level decoded HTMLImageElement cache (shared across instances)
//    We decode every frame into an ImageBitmap-ready HTMLImageElement once.
// ---------------------------------------------------------------------------
let frameImages: HTMLImageElement[] = []
let preloadPromise: Promise<void> | null = null

function preloadAllFrames(): Promise<void> {
  if (preloadPromise) return preloadPromise

  preloadPromise = new Promise<void>((resolve) => {
    let loaded = 0
    const total = frameUrls.length
    if (total === 0) { resolve(); return }

    frameImages = new Array(total)

    frameUrls.forEach((url, i) => {
      const img = new Image()
      img.decoding = "async"
      img.src = url
      img.onload = img.onerror = () => {
        frameImages[i] = img
        loaded++
        if (loaded >= total) resolve()
      }
    })
  })
  return preloadPromise
}

// Kick off preload immediately at module evaluation (before React mounts)
preloadAllFrames()

// ---------------------------------------------------------------------------
// 3. Component — Canvas-based, zero React re-renders during scroll
// ---------------------------------------------------------------------------
interface EyeSequenceProps {
  progress: MotionValue<number>
  className?: string
}

export function EyeSequence({ progress, className = "" }: EyeSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentFrame = useRef(0)
  const rafId = useRef(0)
  const ready = useRef(false)
  const prefersReducedMotion = useRef(false)

  // Draw a specific frame index onto the canvas
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current
    if (!canvas || !ready.current) return

    const img = frameImages[idx]
    if (!img) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Match canvas internal resolution to the image
    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)
  }, [])

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

  // Wait for preload, then draw the first frame
  useEffect(() => {
    preloadAllFrames().then(() => {
      ready.current = true
      drawFrame(currentFrame.current)
    })
  }, [drawFrame])

  // Subscribe to the MotionValue — updates bypass React state entirely
  useEffect(() => {
    const unsubscribe = progress.on("change", (p: number) => {
      if (prefersReducedMotion.current) return

      const clamped = Math.max(0, Math.min(1, p))
      const idx = Math.round(clamped * (frameUrls.length - 1))

      // Skip if we're already showing this frame
      if (idx === currentFrame.current) return
      currentFrame.current = idx

      // Batch the draw call into the next animation frame
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => drawFrame(idx))
    })

    return () => {
      unsubscribe()
      cancelAnimationFrame(rafId.current)
    }
  }, [progress, drawFrame])

  if (frameUrls.length === 0) return null

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Eye animation sequence"
      className={`h-full w-full object-contain ${className}`}
      style={{ willChange: "transform" }}
    />
  )
}
