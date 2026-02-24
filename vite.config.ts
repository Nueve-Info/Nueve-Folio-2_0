import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import type { IncomingMessage, ServerResponse } from 'node:http'

/**
 * Vite plugin that handles /api/create-checkout-session in dev mode
 * so `npm run dev` works without `vercel dev`.
 */
function stripeApiPlugin(allEnv: Record<string, string>): Plugin {
  return {
    name: 'stripe-checkout-api',
    configureServer(server) {
      server.middlewares.use(
        '/api/create-checkout-session',
        async (req: IncomingMessage, res: ServerResponse) => {
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

          if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return }
          if (req.method !== 'POST') {
            res.writeHead(405); res.end(JSON.stringify({ error: 'Method not allowed' })); return
          }

          const body: Record<string, unknown> = await new Promise((resolve, reject) => {
            let data = ''
            req.on('data', (c: Buffer) => (data += c.toString()))
            req.on('end', () => { try { resolve(JSON.parse(data)) } catch (e) { reject(e) } })
          })

          const secretKey = allEnv.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY
          if (!secretKey) {
            res.writeHead(500)
            res.end(JSON.stringify({ error: 'STRIPE_SECRET_KEY is not set in .env.local' }))
            return
          }

          const priceId = body.priceId
          if (typeof priceId !== 'string' || !priceId.startsWith('price_')) {
            res.writeHead(400); res.end(JSON.stringify({ error: 'Invalid priceId' })); return
          }

          try {
            const Stripe = (await import('stripe')).default
            const stripe = new Stripe(secretKey)
            const siteUrl = allEnv.SITE_URL || process.env.SITE_URL || 'http://localhost:5173'

            const session = await stripe.checkout.sessions.create({
              ui_mode: 'embedded',
              mode: 'payment',
              line_items: [{ price: priceId, quantity: 1 }],
              return_url: `${siteUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
              metadata: {
                ab_experiment: typeof body.ab_experiment === 'string' ? body.ab_experiment : 'none',
                ab_variant: typeof body.ab_variant === 'string' ? body.ab_variant : 'control',
              },
            })

            res.writeHead(200)
            res.end(JSON.stringify({ clientSecret: session.client_secret }))
          } catch (err) {
            const message = err instanceof Error ? err.message : 'Stripe error'
            console.error('[vite-stripe-api]', err)
            res.writeHead(500)
            res.end(JSON.stringify({ error: message }))
          }
        },
      )
    },
  }
}

const ZAPIER_LEAD_URL =
  'https://hooks.zapier.com/hooks/catch/15087615/ucn4yqg/'

/**
 * Vite plugin that proxies /api/lead-webhook in dev to avoid CORS when forwarding to Zapier.
 */
function leadWebhookApiPlugin(allEnv: Record<string, string>): Plugin {
  return {
    name: 'lead-webhook-api',
    configureServer(server) {
      server.middlewares.use(
        '/api/lead-webhook',
        async (req: IncomingMessage, res: ServerResponse) => {
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

          if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return }
          if (req.method !== 'POST') {
            res.writeHead(405); res.end(JSON.stringify({ error: 'Method not allowed' })); return
          }

          let body: Record<string, unknown>
          try {
            const raw = await new Promise<string>((resolve, reject) => {
              let data = ''
              req.on('data', (c: Buffer) => (data += c.toString()))
              req.on('end', () => resolve(data))
              req.on('error', reject)
            })
            body = raw ? JSON.parse(raw) : {}
          } catch {
            res.writeHead(400); res.end(JSON.stringify({ error: 'Invalid JSON' })); return
          }

          const email = typeof body.email === 'string' ? body.email.trim() : ''
          const source = typeof body.source === 'string' ? body.source : 'unknown'
          if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            res.writeHead(400); res.end(JSON.stringify({ error: 'Valid email required' })); return
          }

          const webhookUrl = allEnv.ZAPIER_LEAD_WEBHOOK_URL || process.env.ZAPIER_LEAD_WEBHOOK_URL || ZAPIER_LEAD_URL
          try {
            const forward = await fetch(webhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, source }),
            })
            if (!forward.ok) {
              res.writeHead(502); res.end(JSON.stringify({ error: 'Webhook delivery failed' })); return
            }
            res.writeHead(200); res.end(JSON.stringify({ ok: true }))
          } catch (err) {
            console.error('[vite-lead-webhook]', err)
            res.writeHead(500); res.end(JSON.stringify({ error: 'Webhook request failed' }))
          }
        },
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd(), 'VITE_')
  const allEnv = loadEnv(mode, process.cwd(), '')

  return {
  plugins: [react(), tailwindcss(), stripeApiPlugin(allEnv), leadWebhookApiPlugin(allEnv)],

  define: {
    'import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY': JSON.stringify(
      viteEnv.VITE_STRIPE_PUBLISHABLE_KEY ?? process.env.VITE_STRIPE_PUBLISHABLE_KEY ?? ''
    ),
    'import.meta.env.VITE_STRIPE_PRICE_CONTROL': JSON.stringify(
      viteEnv.VITE_STRIPE_PRICE_CONTROL ?? process.env.VITE_STRIPE_PRICE_CONTROL ?? ''
    ),
    'import.meta.env.VITE_STRIPE_PRICE_TEST': JSON.stringify(
      viteEnv.VITE_STRIPE_PRICE_TEST ?? process.env.VITE_STRIPE_PRICE_TEST ?? ''
    ),
    'import.meta.env.VITE_STRIPE_HEADING_CONTROL': JSON.stringify(
      viteEnv.VITE_STRIPE_HEADING_CONTROL ?? process.env.VITE_STRIPE_HEADING_CONTROL ?? ''
    ),
    'import.meta.env.VITE_STRIPE_HEADING_TEST': JSON.stringify(
      viteEnv.VITE_STRIPE_HEADING_TEST ?? process.env.VITE_STRIPE_HEADING_TEST ?? ''
    ),
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // ── Code splitting for better caching and parallel loading ──
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor: React core (rarely changes → long cache)
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Vendor: animation libraries (heavy, shared across pages)
          'vendor-motion': ['framer-motion'],
          // Vendor: UI primitives
          'vendor-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-slot',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
          ],
          // Vendor: Stripe (loaded lazily via CheckoutModal)
          'vendor-stripe': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
        },
      },
    },

    // Target modern browsers for smaller output
    target: 'es2020',

    // Increase chunk size warning (after splitting, chunks are smaller)
    chunkSizeWarningLimit: 600,

    // Enable CSS code splitting
    cssCodeSplit: true,

    // Minification
    minify: 'esbuild',
  },
  }
})
