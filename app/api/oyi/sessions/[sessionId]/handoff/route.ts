import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { callOyiBackend, oyiErrorResponse, oyiResponse } from "@/lib/oyi/backendProxy";
import { getIp, rateLimit, safeText } from "@/lib/oyi/security";

export const runtime = "nodejs";

// Requests a human Ochiga staff member join the existing session.
// Proxies to POST /communications/office-public/session/:id/handoff.
export async function POST(request: NextRequest, { params }: { params: { sessionId: string } }) {
  const requestId = crypto.randomUUID();
  const ip = getIp(request);

  const limited = rateLimit(`oyi-handoff:${ip}`, 60_000, 10);
  if (limited) {
    return NextResponse.json(
      { ok: false, error: "rate_limited", request_id: requestId },
      { status: 429, headers: { "retry-after": String(limited.retryAfter) } }
    );
  }

  const sessionId = safeText(params.sessionId, 200);
  if (!sessionId) {
    return NextResponse.json({ ok: false, error: "session_id_required", request_id: requestId }, { status: 400 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body", request_id: requestId }, { status: 400 });
  }

  const body = {
    public_session_id: safeText(raw.public_session_id, 200),
    oyi_thread_id: safeText(raw.oyi_thread_id, 200) || null,
    business_unit: safeText(raw.business_unit, 100, "corporate"),
    requested_capability: safeText(raw.requested_capability, 100, "corporate.office_desk"),
    reason: safeText(raw.reason, 1000, "Visitor requested human assistance."),
    priority: "normal",
    fallback_action: "continue_with_oyi",
    source: "visitor_or_oyi",
  };

  try {
    const result = await callOyiBackend(
      `/communications/office-public/session/${encodeURIComponent(sessionId)}/handoff`,
      { method: "POST", body, requestId }
    );
    return oyiResponse(result, requestId);
  } catch (error) {
    return oyiErrorResponse(error, requestId);
  }
}

// Reads current handoff(s) for a session — used to poll status.
// Proxies to GET /communications/office-public/session/:id/handoff.
export async function GET(request: NextRequest, { params }: { params: { sessionId: string } }) {
  const requestId = crypto.randomUUID();
  const ip = getIp(request);

  const limited = rateLimit(`oyi-handoff-read:${ip}`, 60_000, 60);
  if (limited) {
    return NextResponse.json(
      { ok: false, error: "rate_limited", request_id: requestId },
      { status: 429, headers: { "retry-after": String(limited.retryAfter) } }
    );
  }

  const sessionId = safeText(params.sessionId, 200);
  if (!sessionId) {
    return NextResponse.json({ ok: false, error: "session_id_required", request_id: requestId }, { status: 400 });
  }

  try {
    const result = await callOyiBackend(
      `/communications/office-public/session/${encodeURIComponent(sessionId)}/handoff`,
      { method: "GET", requestId }
    );
    return oyiResponse(result, requestId);
  } catch (error) {
    return oyiErrorResponse(error, requestId);
  }
}
