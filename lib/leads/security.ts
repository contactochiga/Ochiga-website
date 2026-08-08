// Shared anti-spam and rate-limiting helpers for the lead API.
// Extracted from the original app/api/deployments/route.ts pattern —
// same protections, generalized across all five lead types.
//
// Known limitation: the rate limiter below is in-memory, so on
// serverless hosting (e.g. Vercel) it only protects within a single
// warm instance, not globally across all instances. It still stops
// naive scripted abuse but is not a substitute for a shared store
// (e.g. Upstash/Redis) if abuse becomes a real problem in production.
import type { NextRequest } from "next/server";
import crypto from "crypto";

const rateState = new Map<string, { count: number; resetAt: number }>();

export function getIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.ip || "unknown";
}

export function hashIp(ip: string) {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

export function rateLimit(key: string) {
  const windowMs = Number(process.env.OCHIGA_LEAD_RATE_WINDOW_MS || 10 * 60 * 1000);
  const maxRequests = Number(process.env.OCHIGA_LEAD_RATE_MAX || 5);
  const now = Date.now();
  const current = rateState.get(key);

  if (!current || current.resetAt <= now) {
    rateState.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  current.count += 1;
  if (current.count > maxRequests) {
    return { retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }

  return null;
}

// Honeypot ("website" should always be empty for a human) + minimum
// form-age (bots tend to submit near-instantly).
export function checkBotSignals(params: { website?: string; formStartedAt?: string }) {
  if (params.website && params.website.trim().length > 0) {
    return "We could not accept this request.";
  }

  const started = Number(params.formStartedAt || 0);
  const minAgeMs = Number(process.env.OCHIGA_LEAD_MIN_FORM_AGE_MS || 1500);
  if (started && Date.now() - started < minAgeMs) {
    return "Please review the form and try again.";
  }

  return "";
}

export function formAgeMs(formStartedAt?: string) {
  const started = Number(formStartedAt || 0);
  return started ? Date.now() - started : 0;
}

export const maxLeadBodyBytes = Number(process.env.OCHIGA_LEAD_MAX_BODY_BYTES || 16_000);
