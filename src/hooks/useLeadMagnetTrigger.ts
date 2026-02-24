import { useCallback, useEffect, useRef, useState } from "react"

const STORAGE_KEY = "lead-magnet-dismissed"
const DELAY_MS = 60_000

export function useLeadMagnetTrigger(checkoutOpen: boolean) {
  const [showPopup, setShowPopup] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isDismissed = () => sessionStorage.getItem(STORAGE_KEY) === "1"

  const dismissPopup = useCallback(() => {
    setShowPopup(false)
    sessionStorage.setItem(STORAGE_KEY, "1")
  }, [])

  // ── Show after 60 s, only if checkout is not open ──
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      if (!isDismissed() && !checkoutOpen) setShowPopup(true)
    }, DELAY_MS)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [checkoutOpen])

  // ── Hide if checkout opens while popup is visible ──
  useEffect(() => {
    if (checkoutOpen && showPopup) setShowPopup(false)
  }, [checkoutOpen, showPopup])

  return { showPopup, dismissPopup } as const
}
