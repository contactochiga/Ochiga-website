import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { callOyiBackend, oyiErrorResponse, oyiResponse } from "@/lib/oyi/backendProxy";
import { getIp, rateLimit, safeText } from "@/lib/oyi/security";

export const runtime = "nodejs";

// Reads a communications session (events/participants/handoffs) — used
// to poll for staff-join / handoff-status changes.
// Proxies to GET /communications/office-public/session/:sessionId.
export async function GET(request: NextRequest, { params }: { params: { sessionId: string } }) {
  const requestId = crypto.randomUUID();
  const ip = getIp(request);

  const limited = rateLimit(`oyi-session-read:${ip}`, 60_000, 60);
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
    const result = await callOyiBackend(`/communications/office-public/session/${encodeURIComponent(sessionId)}`, {
      method: "GET",
      requestId,
    });
    return oyiResponse(result, requestId);
  } catch (error) {
    return oyiErrorResponse(error, requestId);
  }
}
