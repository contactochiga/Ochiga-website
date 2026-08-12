// Rate limiting + input hygiene for the Oyi widget's proxy API routes.
// In-memory, same known limitation as lib/leads/security.ts (per-instance
// only, not a substitute for a shared store) — acceptable for now since
// the real abuse boundary is the Backend's own auth/consent checks.
import type { NextRequest } from "next/server";

const rateState = new Map<string, { count: number; resetAt: number }>();

export function getIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.ip || "unknown";
}

export function rateLimit(key: string, windowMs: number, max: number) {
  const now = Date.now();
  const current = rateState.get(key);

  if (!current || current.resetAt <= now) {
    rateState.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  current.count += 1;
  if (current.count > max) {
    return { retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }

  return null;
}

export function safeText(value: unknown, maxLength: number, fallback = "") {
  const result = String(value ?? "").trim().slice(0, maxLength);
  return result || fallback;
}
