import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { callOyiBackend, oyiErrorResponse, oyiResponse } from "@/lib/oyi/backendProxy";
import { getIp, rateLimit, safeText } from "@/lib/oyi/security";

export const runtime = "nodejs";

// Text turn — proxies to the Backend's public corporate conversation
// contract (POST /office/conversation/corporate). This is the same
// contract used for both the very first message and every follow-up;
// continuity comes from echoing back public_session_id / thread_id.
export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const ip = getIp(request);

  const limited = rateLimit(`oyi-message:${ip}`, 60_000, 20);
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

  const message = safeText(raw.message, 4000);
  if (!message) {
    return NextResponse.json({ ok: false, error: "message_required", request_id: requestId }, { status: 400 });
  }

  const body = {
    request_id: requestId,
    message,
    public_session_id: safeText(raw.public_session_id, 200),
    conversation_thread_id: safeText(raw.conversation_thread_id, 200) || null,
    engagement_mode: "text_conversation",
    source: {
      source_site: "ochiga_website",
      source_page: safeText(raw.source_page, 300),
      source_channel: "widget",
    },
  };

  try {
    const result = await callOyiBackend("/office/conversation/corporate", { method: "POST", body, requestId });
    return oyiResponse(result, requestId);
  } catch (error) {
    return oyiErrorResponse(error, requestId);
  }
}
