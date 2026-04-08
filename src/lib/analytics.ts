export interface AnalyticsEvent {
  name: string;
  payload?: Record<string, unknown>;
  at: string;
}

const ANALYTICS_KEY = "emimos-analytics-events";

export const trackEvent = (name: string, payload?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;

  const event: AnalyticsEvent = {
    name,
    payload,
    at: new Date().toISOString(),
  };

  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    const current = raw ? (JSON.parse(raw) as AnalyticsEvent[]) : [];
    const next = [event, ...current].slice(0, 300);
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(next));
  } catch {
    // no-op fallback for storage issues
  }
};
