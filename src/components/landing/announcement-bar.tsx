import { motion } from "framer-motion"
import { Flame } from "lucide-react"
import { useCountdown } from "@/hooks/useCountdown"
import { scrollToSection } from "@/lib/utils"

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-black text-white text-sm md:text-base tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-white/60 mt-0.5">
        {label}
      </span>
    </div>
  )
}

export function AnnouncementBar() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown()

  if (isExpired) return null

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[60] bg-nueve-black cursor-pointer"
      onClick={() => scrollToSection("pricing")}
    >
      <div className="mx-auto flex items-center justify-center gap-3 md:gap-5 px-4 py-2 md:py-2.5">
        {/* Label */}
        <div className="flex items-center gap-1.5">
          <Flame className="h-3.5 w-3.5 text-brand-orange shrink-0" />
          <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-white/90">
            Early Bird Ends
          </span>
        </div>

        {/* Separator */}
        <div className="h-4 w-px bg-white/20 hidden sm:block" />

        {/* Countdown */}
        <div className="flex items-center gap-2.5 md:gap-3">
          <TimeBox value={days} label="Days" />
          <span className="text-white/30 text-xs font-bold">:</span>
          <TimeBox value={hours} label="Hrs" />
          <span className="text-white/30 text-xs font-bold">:</span>
          <TimeBox value={minutes} label="Min" />
          <span className="text-white/30 text-xs font-bold">:</span>
          <TimeBox value={seconds} label="Sec" />
        </div>
      </div>
    </motion.div>
  )
}
