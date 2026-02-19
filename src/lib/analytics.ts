/**
 * Thin, typed wrappers around Meta Pixel (fbq) and PostHog.
 *
 * Both scripts are loaded from index.html.  These helpers no-op
 * gracefully when the SDKs haven't finished loading yet.
 */

/* ---------- global type declarations ---------- */

type MetaStandardEvent =
  | "PageView"
  | "AddToCart"
  | "InitiateCheckout"
  | "Lead"
  | "Purchase";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fbq = (...args: any[]) => void;

interface PostHogStub {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  capture: (event: string, properties?: Record<string, any>) => void;
  getFeatureFlag: (flagKey: string) => string | boolean | undefined;
  onFeatureFlags: (cb: () => void) => void;
  reloadFeatureFlags: () => void;
}

declare global {
  interface Window {
    fbq?: Fbq;
    posthog?: PostHogStub;
  }
}

/* ---------- Meta Pixel ---------- */

export function trackMeta(
  event: MetaStandardEvent,
  params?: Record<string, unknown>,
) {
  if (typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}

/* ---------- PostHog ---------- */

export function capturePosthog(
  event: string,
  props?: Record<string, unknown>,
) {
  if (window.posthog && typeof window.posthog.capture === "function") {
    window.posthog.capture(event, props);
  }
}

/* ---------- helpers ---------- */

/** Extract a human-readable label from a button element. */
export function getButtonLabel(el: HTMLElement): string {
  return (
    el.getAttribute("aria-label") ||
    el.textContent?.trim() ||
    "unknown"
  );
}
