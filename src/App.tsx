import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import HomePage from "@/pages/HomePage"
import ThankYouPage from "@/pages/ThankYouPage"
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage"
import {
  trackMeta,
  capturePosthog,
  getButtonLabel,
} from "@/lib/analytics"

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
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
    </Routes>
  )
}

export default App
