// Minimal analytics abstraction. No provider is wired yet — this pushes
// to window.dataLayer (GA4-compatible) when present, and otherwise logs
// to the console in development only. Never pass sensitive form values
// (names, emails, phone numbers, message content) — event names and
// small non-identifying metadata only.
type EventName =
  | "land_jv_start"
  | "land_jv_submit"
  | "oyi_deployment_start"
  | "oyi_deployment_submit"
  | "private_membership_start"
  | "private_membership_submit"
  | "partner_form_submit"
  | "partner_form_start"
  | "contact_submit"
  | "contact_start";

export function track(event: EventName, data?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;

  const w = window as typeof window & { dataLayer?: Array<Record<string, unknown>> };
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event, ...data });
  }

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, data || {});
  }
}
