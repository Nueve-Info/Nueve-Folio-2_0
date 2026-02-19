import { useState, useEffect, useRef } from "react"

interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
  isPaused: boolean
}

/** Feb 24, 2026 11:59 PM PST = Feb 25, 2026 07:59:00 UTC */
const INITIAL_DEADLINE_MS = new Date("2026-02-25T07:59:00Z").getTime()

const PAUSE_DURATION_MS = 3 * 60 * 60 * 1000 // 3 hours
const RENEWAL_DURATION_MS = 5 * 24 * 60 * 60 * 1000 // 5 days

const STORAGE_KEY = "countdown_deadline"

function getDeadline(initialDeadline: number): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return Number(stored)
  } catch {}
  return initialDeadline
}

function saveDeadline(deadline: number) {
  try {
    localStorage.setItem(STORAGE_KEY, String(deadline))
  } catch {}
}

function calculate(deadlineMs: number): CountdownTime {
  const diff = deadlineMs - Date.now()

  if (diff <= 0) {
    const timeSinceExpiry = Date.now() - deadlineMs
    const isPaused = timeSinceExpiry < PAUSE_DURATION_MS
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, isPaused }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isExpired: false,
    isPaused: false,
  }
}

export function useCountdown(initialDeadline: number = INITIAL_DEADLINE_MS): CountdownTime {
  const [deadline, setDeadline] = useState(() => getDeadline(initialDeadline))
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() => calculate(deadline))
  const deadlineRef = useRef(deadline)
  deadlineRef.current = deadline

  useEffect(() => {
    const tick = () => {
      const current = calculate(deadlineRef.current)
      setTimeLeft(current)

      if (current.isExpired && !current.isPaused) {
        const newDeadline = Date.now() + RENEWAL_DURATION_MS
        deadlineRef.current = newDeadline
        setDeadline(newDeadline)
        saveDeadline(newDeadline)
      }
    }
    tick()
    const id = setInterval(tick, 1_000)
    return () => clearInterval(id)
  }, [])

  return timeLeft
}
