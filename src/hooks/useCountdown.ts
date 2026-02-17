import { useState, useEffect, useRef } from "react"

interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

/** Feb 17, 2026 11:59 PM PST = Feb 18, 2026 07:59:00 UTC */
const EARLY_BIRD_DEADLINE_MS = new Date("2026-02-18T07:59:00Z").getTime()

function calculate(deadlineMs: number): CountdownTime {
  const diff = deadlineMs - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isExpired: false,
  }
}

/**
 * Counts down to the early-bird deadline.
 * Uses a module-level constant so the useEffect dependency is stable.
 */
export function useCountdown(deadlineMs: number = EARLY_BIRD_DEADLINE_MS): CountdownTime {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() => calculate(deadlineMs))
  const deadlineRef = useRef(deadlineMs)
  deadlineRef.current = deadlineMs

  useEffect(() => {
    const tick = () => setTimeLeft(calculate(deadlineRef.current))
    tick()
    const id = setInterval(tick, 1_000)
    return () => clearInterval(id)
  }, [])

  return timeLeft
}
