import { useEffect, useRef, useCallback, useState } from "react"
import type { MotionValue } from "framer-motion"

// ---------------------------------------------------------------------------
// 1. Lazily resolve frame URLs (deferred — NOT eager)
//    import.meta.glob with eager:false returns () => Promise<module>.
//    We resolve URLs only when preloadAllFrames() is first called.
// ---------------------------------------------------------------------------
const frameModules = import.meta.glob<string>("@/assets/eye_sequence/*.png", {
  eager: true,
  import: "default",
})

const frameUrls: string[] = Object.entries(frameModules)
  .sort(([a], [b]) => b.localeCompare(a))
  .map(([, url]) => url)

// ---------------------------------------------------------------------------
// 2. Module-level decoded HTMLImageElement cache (shared across instances)
//    Frames are only fetched when preloadAllFrames() is called — NOT at
//    module evaluation time. This saves ~350 KB on initial page load.
// ---------------------------------------------------------------------------
let frameImages: HTMLImageElement[] = []
let preloadPromise: Promise<void> | null = null

function preloadAllFrames(): Promise<void> {
  if (preloadPromise) return preloadPromise

  preloadPromise = new Promise<void>((resolve) => {
    const total = frameUrls.length
    if (total === 0) { resolve(); return }

    let loaded = 0
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

// NOTE: preloadAllFrames() is NO LONGER called at module scope.
// It is triggered by the component when the section enters the viewport.

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
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false)

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

  // ── Intersection Observer: start preloading frames when near viewport ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true)
          observer.disconnect()
        }
      },
      { rootMargin: "500px" } // Start preloading 500px before visible
    )

    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  // Wait for preload (only triggered after entering viewport), then draw the first frame
  useEffect(() => {
    if (!hasEnteredViewport) return

    preloadAllFrames().then(() => {
      ready.current = true
      drawFrame(currentFrame.current)
    })
  }, [hasEnteredViewport, drawFrame])

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
