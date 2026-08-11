// A human-readable display reference derived from the existing lead
// request ID (already a crypto.randomUUID() — the real, canonical
// identifier used for local persistence and any future Office CRM
// ingestion). This is a pure formatting transform, not a new ID
// scheme: nothing new is generated or stored, so it stays compatible
// with whatever system eventually owns the canonical reference.
export function formatReference(prefix: string, requestId: string, date: Date = new Date()): string {
  const shortCode = requestId.replace(/-/g, "").slice(0, 8).toUpperCase();
  return `${prefix}-${date.getFullYear()}-${shortCode}`;
}

export function formatPrivateReference(requestId: string, date: Date = new Date()): string {
  return formatReference("OP", requestId, date);
}

export function formatPartnershipReference(requestId: string, date: Date = new Date()): string {
  return formatReference("PTN", requestId, date);
}
