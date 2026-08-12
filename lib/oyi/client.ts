// Browser-side calls — always same-origin, to our own /api/oyi/* proxy.
// Never calls the Backend directly, never sees the office credential.
import type {
  OyiHandoffResponse,
  OyiSessionReadResponse,
  OyiSessionResponse,
  OyiTextResponse,
  OyiVisualObservationResponse,
  OyiVoiceTurnResponse,
} from "./types";

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await response.json().catch(() => null);
  if (!json) {
    throw new Error("oyi_empty_response");
  }
  return json as T;
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  const json = await response.json().catch(() => null);
  if (!json) {
    throw new Error("oyi_empty_response");
  }
  return json as T;
}

export function sendOyiMessage(input: {
  message: string;
  publicSessionId: string;
  conversationThreadId: string | null;
  sourcePage: string;
}) {
  return postJson<OyiTextResponse>("/api/oyi/message", {
    message: input.message,
    public_session_id: input.publicSessionId,
    conversation_thread_id: input.conversationThreadId,
    source_page: input.sourcePage,
  });
}

export function createOyiCommunicationsSession(input: { publicSessionId: string; oyiThreadId: string | null }) {
  return postJson<OyiSessionResponse>("/api/oyi/sessions", {
    public_session_id: input.publicSessionId,
    oyi_thread_id: input.oyiThreadId,
  });
}

export function sendOyiVoiceTurn(input: {
  sessionId: string;
  audioDataUrl: string;
  publicSessionId: string;
  oyiThreadId: string | null;
  sourcePage: string;
}) {
  return postJson<OyiVoiceTurnResponse>(`/api/oyi/sessions/${encodeURIComponent(input.sessionId)}/voice-turn`, {
    audio_data_url: input.audioDataUrl,
    public_session_id: input.publicSessionId,
    oyi_thread_id: input.oyiThreadId,
    source_page: input.sourcePage,
  });
}

export function sendOyiVisualObservation(input: {
  sessionId: string;
  imageDataUrl: string;
  prompt?: string;
  publicSessionId: string;
  oyiThreadId: string | null;
  sourcePage: string;
}) {
  return postJson<OyiVisualObservationResponse>(
    `/api/oyi/sessions/${encodeURIComponent(input.sessionId)}/visual-observation`,
    {
      image_data_url: input.imageDataUrl,
      prompt: input.prompt || null,
      public_session_id: input.publicSessionId,
      oyi_thread_id: input.oyiThreadId,
      source_page: input.sourcePage,
    }
  );
}

export function requestOyiHandoff(input: {
  sessionId: string;
  publicSessionId: string;
  oyiThreadId: string | null;
  businessUnit: string;
  reason?: string;
}) {
  return postJson<OyiHandoffResponse>(`/api/oyi/sessions/${encodeURIComponent(input.sessionId)}/handoff`, {
    public_session_id: input.publicSessionId,
    oyi_thread_id: input.oyiThreadId,
    business_unit: input.businessUnit,
    reason: input.reason,
  });
}

export function requestOyiCallback(input: {
  sessionId: string;
  publicSessionId: string;
  oyiThreadId: string | null;
  businessUnit: string;
  reason?: string;
}) {
  return postJson<OyiHandoffResponse>(`/api/oyi/sessions/${encodeURIComponent(input.sessionId)}/callback`, {
    public_session_id: input.publicSessionId,
    oyi_thread_id: input.oyiThreadId,
    business_unit: input.businessUnit,
    reason: input.reason,
  });
}

export function readOyiHandoff(sessionId: string) {
  return getJson<OyiHandoffResponse>(`/api/oyi/sessions/${encodeURIComponent(sessionId)}/handoff`);
}

export function readOyiSession(sessionId: string) {
  return getJson<OyiSessionReadResponse>(`/api/oyi/sessions/${encodeURIComponent(sessionId)}`);
}
