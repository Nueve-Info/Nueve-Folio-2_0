import type { VercelRequest, VercelResponse } from "@vercel/node"
import Stripe from "stripe"

/* ── Lazy Stripe client (reads env at request time, not module load) ── */
let _stripe: Stripe | null = null
function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error(
        "STRIPE_SECRET_KEY is not set. Add it to .env.local or your Vercel project env vars."
      )
    }
    _stripe = new Stripe(key)
  }
  return _stripe
}

/* ── Allowed origins for CORS ── */
const ALLOWED_ORIGINS = [
  process.env.SITE_URL,
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:4173",
].filter(Boolean) as string[]

/* ── Known Price IDs ──
 *
 *  STRIPE_PRICE_TIER1 → Tier 1 "Do It Yourself" ($37)
 *  STRIPE_PRICE_TIER2 → Tier 2 "Mentor Support" ($57)
 */
const KNOWN_PRICE_IDS = new Set([
  process.env.STRIPE_PRICE_TIER1,
  process.env.STRIPE_PRICE_TIER2,
].filter(Boolean))

export default async function handler(req: VercelRequest, res: VercelResponse) {
  /* ── CORS ── */
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : ""
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin)
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  /* ── Input validation ── */
  const body = req.body as Record<string, unknown>
  const priceId = body.priceId

  if (typeof priceId !== "string" || !priceId.startsWith("price_")) {
    return res.status(400).json({ error: "Invalid priceId" })
  }

  if (KNOWN_PRICE_IDS.size > 0 && !KNOWN_PRICE_IDS.has(priceId)) {
    return res.status(400).json({ error: "Unknown priceId" })
  }

  const siteUrl = process.env.SITE_URL ?? "http://localhost:5173"
  const returnUrl = `${siteUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      return_url: returnUrl,
      custom_fields: [
        {
          key: "full_name",
          label: { type: "custom", custom: "Full name" },
          type: "text",
          optional: true,
        },
      ],
      consent_collection: {
        terms_of_service: "required",
      },
      metadata: {
        ab_experiment: typeof body.ab_experiment === "string" ? body.ab_experiment : "none",
        ab_variant: typeof body.ab_variant === "string" ? body.ab_variant : "control",
        funnel_id: typeof body.funnel_id === "string" ? body.funnel_id : "unknown",
        landing_url: typeof body.landing_url === "string" ? body.landing_url : "unknown",
      },
    })

    return res.status(200).json({ clientSecret: session.client_secret })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error"
    console.error("[create-checkout-session]", err)
    return res.status(500).json({ error: message })
  }
}
