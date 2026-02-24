import { useEffect, lazy, Suspense } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import {
  trackMeta,
  capturePosthog,
  getButtonLabel,
} from "@/lib/analytics"

// ── Lazy-loaded route pages (code-split into separate chunks) ──
const HomePage = lazy(() => import("@/pages/HomePage"))
const ThankYouPage = lazy(() => import("@/pages/ThankYouPage"))
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"))

/** Fire Meta Pixel PageView + PostHog $pageview on every SPA route change. */
function usePageViewTracking() {
  const location = useLocation()

  useEffect(() => {
    trackMeta("PageView")
    capturePosthog("$pageview", { path: location.pathname })
  }, [location.pathname])
}

/**
 * Delegated click listener (capture phase) that fires Meta `AddToCart`
 * for every button click EXCEPT buttons tagged with `data-meta-event`
 * (those have their own specific tracking).
 */
function useGlobalButtonTracking() {
  const location = useLocation()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const btn = (e.target as HTMLElement).closest("button")
      if (!btn) return

      // Skip buttons that have their own explicit Meta event
      if (btn.dataset.metaEvent) return

      const label = getButtonLabel(btn)
      trackMeta("AddToCart", { content_name: label })
      capturePosthog("AddToCart", {
        label,
        path: location.pathname,
      })
    }

    document.addEventListener("click", handleClick, true)
    return () => document.removeEventListener("click", handleClick, true)
  }, [location.pathname])
}

function App() {
  usePageViewTracking()
  useGlobalButtonTracking()

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-orange border-t-transparent" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
