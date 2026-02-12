import { useRef, useState, useEffect, type ReactNode } from "react"

interface LazySectionProps {
  children: ReactNode
  /** How far before the viewport to start loading (default: 300px) */
  rootMargin?: string
  /** Minimum height placeholder to prevent layout shift */
  minHeight?: string
  /** Optional CSS class for the wrapper */
  className?: string
}

/**
 * Defers rendering of children until the component is near the viewport.
 * Uses IntersectionObserver for efficient scroll-based lazy loading.
 * Once visible, the children are mounted and never unmounted again.
 */
export function LazySection({
  children,
  rootMargin = "300px",
  minHeight = "200px",
  className,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} className={className} style={{ minHeight: isVisible ? undefined : minHeight }}>
      {isVisible ? children : null}
    </div>
  )
}
