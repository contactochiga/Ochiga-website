import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { callOyiBackend, oyiErrorResponse, oyiResponse } from "@/lib/oyi/backendProxy";
import { getIp, rateLimit, safeText } from "@/lib/oyi/security";

export const runtime = "nodejs";

// One spoken turn: browser-recorded audio in, Backend runs
// transcription -> Oyi Core -> speech synthesis, audio + transcript out.
// Proxies to POST /communications/office-public/session/:id/voice-turn.
export async function POST(request: NextRequest, { params }: { params: { sessionId: string } }) {
  const requestId = crypto.randomUUID();
  const ip = getIp(request);

  const limited = rateLimit(`oyi-voice:${ip}`, 60_000, 15);
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

  const audioDataUrl = safeText(raw.audio_data_url, 20_000_000);
  if (!audioDataUrl.startsWith("data:audio/")) {
    return NextResponse.json({ ok: false, error: "audio_data_url_required", request_id: requestId }, { status: 400 });
  }

  const body = {
    audio_data_url: audioDataUrl,
    consent: { microphone: true },
    public_session_id: safeText(raw.public_session_id, 200),
    oyi_thread_id: safeText(raw.oyi_thread_id, 200) || null,
    engagement_mode: "voice_conversation",
    source: {
      source_site: "ochiga_website",
      source_page: safeText(raw.source_page, 300),
      source_channel: "widget",
    },
  };

  try {
    const result = await callOyiBackend(
      `/communications/office-public/session/${encodeURIComponent(sessionId)}/voice-turn`,
      { method: "POST", body, requestId }
    );
    return oyiResponse(result, requestId);
  } catch (error) {
    return oyiErrorResponse(error, requestId);
  }
}
