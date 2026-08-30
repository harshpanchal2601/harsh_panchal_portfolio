type GtagFunction = (
  command: "event" | "config" | "js" | "set",
  targetIdOrEventName: string | Date,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFunction;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  try {
    window.gtag("event", eventName, params);
  } catch {
    // Analytics failures must never break user interactions
  }
}
