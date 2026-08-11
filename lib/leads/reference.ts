// A human-readable display reference derived from the existing lead
// request ID (already a crypto.randomUUID() — the real, canonical
// identifier used for local persistence and any future Office CRM
// ingestion). This is a pure formatting transform, not a new ID
// scheme: nothing new is generated or stored, so it stays compatible
// with whatever system eventually owns the canonical reference.
export function formatPrivateReference(requestId: string, date: Date = new Date()): string {
  const shortCode = requestId.replace(/-/g, "").slice(0, 8).toUpperCase();
  return `OP-${date.getFullYear()}-${shortCode}`;
}
