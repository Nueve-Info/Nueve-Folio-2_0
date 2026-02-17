import { useEffect, useRef, useState } from "react"

/**
 * Returns a ref and a boolean that flips to `true` once the element
 * enters the viewport (plus optional rootMargin). Fires only once.
 * Used to defer heavy resources (e.g. Vimeo iframes) until visible.
 */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "200px",
) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return [ref, inView] as const
}
