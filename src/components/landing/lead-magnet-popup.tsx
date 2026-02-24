import { type FormEvent, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, Check } from "lucide-react"
import ebookCover from "@/assets/ebook-state-of-design-2026.png"
import { Button } from "@/components/ui/button"
import { trackMeta, capturePosthog } from "@/lib/analytics"
import { LEAD_WEBHOOK_URL } from "@/lib/lead-webhook"

interface LeadMagnetPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function LeadMagnetPopup({ isOpen, onClose }: LeadMagnetPopupProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  // ── Escape key ──
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  // ── Body scroll lock ──
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // ── Auto-dismiss after success ──
  useEffect(() => {
    if (status !== "success") return
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [status, onClose])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || status === "loading") return

    setStatus("loading")

    try {
      await fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "lead_magnet_popup" }),
      })
    } catch {
      // silently fail — don't block the UX
    }

    trackMeta("Lead", { content_name: "ebook_state_of_design_2026" })
    capturePosthog("lead_magnet_submit", {
      email,
      source: "popup",
      ebook: "state_of_design_2026",
    })

    setStatus("success")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          key="lead-popup-overlay"
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-nueve-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Download free ebook"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-2xl bg-white p-8 sm:p-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-nueve-black transition-colors hover:bg-black/10"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10">
                  <Check className="h-7 w-7 text-brand-orange" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-black tracking-tight text-nueve-black">
                  Check your inbox!
                </h3>
                <p className="text-sm text-text-grey">
                  We've sent the ebook to your email.
                </p>
              </div>
            ) : (
              <>


                <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange">
                  Free Ebook
                </p>
                <h3 className="mt-1.5 text-2xl font-black tracking-tight text-nueve-black">
                  The State of Design in 2026
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-grey">
                  Discover the trends, tools, and strategies shaping the design
                  industry this year. Get your free copy instantly.
                </p>
                <div className="mt-6 mb-6 overflow-hidden rounded-lg border border-nueve-black/10">
                  <img
                    src={ebookCover}
                    alt="The State of Design in 2026 ebook cover"
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full rounded-full border border-nueve-black/10 bg-surface-grey/50 px-5 text-sm text-nueve-black placeholder:text-text-grey/60 outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                  />
                  <Button
                    type="submit"
                    variant="nueve"
                    size="lg"
                    rounded="pill"
                    disabled={status === "loading"}
                    className="group w-full"
                  >
                    {status === "loading" ? "Sending…" : "Get free ebook"}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>

                <p className="mt-3 text-center text-[11px] text-text-grey/60">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
