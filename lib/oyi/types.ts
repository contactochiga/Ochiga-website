// Frontend-facing subset of the Backend's real response contracts.
// Kept intentionally narrow — only fields the widget actually renders.

export type OyiTextResponse = {
  ok: boolean;
  request_id: string;
  public_session_id: string;
  conversation_thread_id: string | null;
  answer: string;
  business_unit: string;
  handoff_recommended: boolean;
  // The Backend's real CorporateOyiCoreResponse contract carries these
  // too (confirmed via direct Ochiga-backend audit) — /api/oyi/message
  // forwards the Backend's raw JSON verbatim (see backendProxy.ts's
  // oyiResponse()), so they're already present on the wire; this type
  // just hadn't caught up. Fed through the shared response normalizer
  // (normalizeCorporateResponse) rather than read ad hoc.
  suggested_next_action?: string | null;
  knowledge_references?: Array<{ id?: string; title: string; source: string }>;
  tool_proposals?: Array<Record<string, unknown>>;
  commercial_signal?: string | null;
  error?: string;
  message?: string;
};

export type OyiSessionResponse = {
  ok: boolean;
  session?: { session_id: string; surface: string; status: string };
  error?: string;
};

export type OyiVoiceTurnResponse = {
  ok: boolean;
  oyi_thread_id: string | null;
  transcript?: { transcript: string };
  response_text?: string;
  audio?: { audio_data_url: string } | null;
  audio_unavailable?: boolean;
  audio_error?: string | null;
  error?: string;
  detail?: string;
  message?: string;
};

export type OyiVisualObservationResponse = {
  ok: boolean;
  oyi_thread_id: string | null;
  observation?: { summary: string; visible_objects: string[] };
  response_text?: string;
  error?: string;
  detail?: string;
  message?: string;
};

export type OyiHandoffStatus =
  | "requested"
  | "routing"
  | "offered"
  | "accepted"
  | "declined"
  | "timed_out"
  | "cancelled"
  | "completed";

export type OyiHandoff = {
  handoff_id: string;
  status: OyiHandoffStatus;
  assigned_staff_id?: string | null;
  fallback_action?: string | null;
};

export type OyiHandoffResponse = {
  ok: boolean;
  handoff?: OyiHandoff;
  handoffs?: OyiHandoff[];
  error?: string;
};

export type OyiParticipant = {
  participant_id?: string;
  role: string;
  state?: string;
  display_name?: string | null;
};

export type OyiSessionReadResponse = {
  ok: boolean;
  session?: { session_id: string; status: string };
  participants?: OyiParticipant[];
  handoffs?: OyiHandoff[];
  error?: string;
};

export type OyiMessage = {
  id: string;
  role: "visitor" | "oyi" | "system";
  mode: "text" | "voice" | "visual";
  text: string;
  createdAt: number;
  // Populated for "oyi"-role text replies via the shared response
  // normalizer (lib/oyi-shell/core/responseNormalizer.mjs) — optional
  // because voice/visual replies and system messages don't carry it.
  suggestions?: string[];
  knowledgeReferences?: Array<{ title: string; source: string }>;
};
