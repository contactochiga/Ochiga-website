import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { callOyiBackend, oyiErrorResponse, oyiResponse } from "@/lib/oyi/backendProxy";
import { getIp, rateLimit, safeText } from "@/lib/oyi/security";

export const runtime = "nodejs";

// Creates a communications (media) session — the container voice-turn
// and visual-observation calls attach to. Only created lazily, the first
// time a visitor activates voice or camera; text never needs one.
// Proxies to POST /communications/office-public/session.
export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const ip = getIp(request);

  const limited = rateLimit(`oyi-session:${ip}`, 60_000, 10);
  if (limited) {
    return NextResponse.json(
      { ok: false, error: "rate_limited", request_id: requestId },
      { status: 429, headers: { "retry-after": String(limited.retryAfter) } }
    );
  }

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body", request_id: requestId }, { status: 400 });
  }

  const publicSessionId = safeText(raw.public_session_id, 200);
  if (!publicSessionId) {
    return NextResponse.json({ ok: false, error: "public_session_id_required", request_id: requestId }, { status: 400 });
  }

  const body = {
    public_session_id: publicSessionId,
    session_id: `office_public_${publicSessionId}`,
    scope_id: publicSessionId,
    oyi_thread_id: safeText(raw.oyi_thread_id, 200) || null,
    media_mode: "audio_video",
    purpose: "public_widget_conversation",
  };

  try {
    const result = await callOyiBackend("/communications/office-public/session", { method: "POST", body, requestId });
    return oyiResponse(result, requestId);
  } catch (error) {
    return oyiErrorResponse(error, requestId);
  }
}
