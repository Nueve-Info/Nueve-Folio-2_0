const START_MS = new Date('2026-01-01T00:00:00Z').getTime()
const END_MS   = new Date('2026-03-14T00:00:00Z').getTime()
const TOTAL_SPOTS = 47

/** Smooth cubic ease-in-out (slow start, fast middle, slow finish) */
function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t))
  return c * c * (3 - 2 * c)
}

export function useSpots() {
  const t = Math.max(0, Math.min(1, (Date.now() - START_MS) / (END_MS - START_MS)))
  const claimed      = Math.min(TOTAL_SPOTS, Math.floor(TOTAL_SPOTS * smoothstep(t)))
  const remaining    = TOTAL_SPOTS - claimed
  const pctRemaining = Math.round((remaining / TOTAL_SPOTS) * 100)
  return { remaining, total: TOTAL_SPOTS, pctRemaining }
}
