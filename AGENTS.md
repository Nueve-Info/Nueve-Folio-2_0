# AGENTS.md

## Cursor Cloud specific instructions

### Overview

NueveFolio 2.0 ("Bubble AI") is a React 19 + Vite 7 + TypeScript marketing landing page with Stripe embedded checkout. It is a static SPA (no database) deployed to Vercel. In dev mode, Vite plugins in `vite.config.ts` replicate the Vercel serverless `/api/*` endpoints locally — **no Vercel CLI needed**.

### Running the app

- **Dev server:** `npm run dev` (Vite, serves on `http://localhost:5173`)
- **Build:** `npm run build` (runs `tsc -b && vite build`)
- **Lint:** `npm run lint` (ESLint — note: there are pre-existing lint errors in the repo)
- **Preview:** `npm run preview` (serve the production build locally)

### Environment variables

- `.env` is committed and contains only public/publishable keys (e.g. `VITE_STRIPE_PUBLISHABLE_KEY`).
- For end-to-end Stripe checkout, a `STRIPE_SECRET_KEY` must be set in `.env.local` (not committed). Without it, clicking "Join Now" opens the checkout modal but Stripe returns an error — all other page functionality works fine.
- Optional: `ZAPIER_LEAD_WEBHOOK_URL`, `SITE_URL`, and various `VITE_STRIPE_PRICE_*` / `VITE_STRIPE_HEADING_*` vars have hardcoded fallbacks.

### Routes

The app has three client-side routes: `/` (landing page), `/thank-you`, and `/privacy-policy`.

### Gotchas

- The codebase has pre-existing ESLint errors (react-hooks purity rules, `no-explicit-any`, `no-empty`, etc.) so `npm run lint` exits with a non-zero code. This is expected.
- No test framework is configured — there are no automated tests to run.
