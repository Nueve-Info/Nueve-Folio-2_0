import { useCallback, useEffect, useRef, useState } from "react"

const STORAGE_KEY = "lead-magnet-dismissed"
const IDLE_MS = 45_000

export function useLeadMagnetTrigger() {
  const [showPopup, setShowPopup] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isDismissed = () => sessionStorage.getItem(STORAGE_KEY) === "1"

  const dismissPopup = useCallback(() => {
    setShowPopup(false)
    sessionStorage.setItem(STORAGE_KEY, "1")
  }, [])

  const triggerPopup = useCallback(() => {
    if (!isDismissed()) setShowPopup(true)
  }, [])

  // ── Idle timer (45 s without mouse movement) ──
  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(triggerPopup, IDLE_MS)
    }

    resetTimer()
    window.addEventListener("mousemove", resetTimer)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      window.removeEventListener("mousemove", resetTimer)
    }
  }, [triggerPopup])

  // ── Exit intent (mouse leaves viewport from the top) ──
  useEffect(() => {
    const handleLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) triggerPopup()
    }

    document.documentElement.addEventListener("mouseleave", handleLeave)
    return () =>
      document.documentElement.removeEventListener("mouseleave", handleLeave)
  }, [triggerPopup])

  return { showPopup, dismissPopup } as const
}
