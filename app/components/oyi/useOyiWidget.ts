"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  createOyiCommunicationsSession,
  readOyiHandoff,
  readOyiSession,
  requestOyiCallback,
  requestOyiHandoff,
  sendOyiMessage,
  sendOyiVisualObservation,
  sendOyiVoiceTurn,
} from "@/lib/oyi/client";
import type { OyiHandoffStatus, OyiMessage } from "@/lib/oyi/types";

const SESSION_KEY = "oyi_public_session_id";
const THREAD_KEY = "oyi_thread_id";
const COMMS_SESSION_KEY = "oyi_comms_session_id";
const HANDOFF_POLL_MS = 4000;
const STAFF_POLL_MS = 5000;

export type HandoffPhase =
  | "none"
  | "requesting"
  | "waiting"
  | "staff_joining"
  | "staff_joined"
  | "unavailable"
  | "callback_requested"
  | "error";

function readSession(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSession(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // sessionStorage unavailable — continuity just won't survive a refresh.
  }
}

function makeId() {
  return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random()}`;
}

function terminalHandoffPhase(status: OyiHandoffStatus | undefined): HandoffPhase | null {
  if (status === "accepted") return "staff_joined";
  if (status === "declined" || status === "timed_out" || status === "cancelled") return "unavailable";
  return null;
}

export function useOyiWidget() {
  const pathname = usePathname() || "/";

  const [publicSessionId] = useState(() => {
    const existing = readSession(SESSION_KEY);
    if (existing) return existing;
    const created = `pub_${makeId()}`;
    writeSession(SESSION_KEY, created);
    return created;
  });

  const [oyiThreadId, setOyiThreadId] = useState<string | null>(() => readSession(THREAD_KEY));
  const [communicationsSessionId, setCommunicationsSessionId] = useState<string | null>(() =>
    readSession(COMMS_SESSION_KEY)
  );
  const [lastBusinessUnit, setLastBusinessUnit] = useState("corporate");
  const [messages, setMessages] = useState<OyiMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [backendUnavailable, setBackendUnavailable] = useState(false);
  const [handoffPhase, setHandoffPhase] = useState<HandoffPhase>("none");
  const [handoffId, setHandoffId] = useState<string | null>(null);
  const [staffDisplayName, setStaffDisplayName] = useState<string | null>(null);
  const [handoffRecommended, setHandoffRecommended] = useState(false);

  const sessionCreationInFlight = useRef<Promise<string | null> | null>(null);

  useEffect(() => {
    if (oyiThreadId) writeSession(THREAD_KEY, oyiThreadId);
  }, [oyiThreadId]);

  useEffect(() => {
    if (communicationsSessionId) writeSession(COMMS_SESSION_KEY, communicationsSessionId);
  }, [communicationsSessionId]);

  const pushMessage = useCallback((message: Omit<OyiMessage, "id" | "createdAt">) => {
    setMessages((current) => [...current, { ...message, id: makeId(), createdAt: Date.now() }]);
  }, []);

  const sendText = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || sending) return;
      pushMessage({ role: "visitor", mode: "text", text: trimmed });
      setSending(true);
      try {
        const result = await sendOyiMessage({
          message: trimmed,
          publicSessionId,
          conversationThreadId: oyiThreadId,
          sourcePage: pathname,
        });
        if (result.ok) {
          setBackendUnavailable(false);
          if (result.conversation_thread_id) setOyiThreadId(result.conversation_thread_id);
          if (result.business_unit) setLastBusinessUnit(result.business_unit);
          setHandoffRecommended(Boolean(result.handoff_recommended) && handoffPhase === "none");
          const { normalizeCorporateResponse } = await import("@/lib/oyi-shell/core/responseNormalizer.mjs");
          const normalized = normalizeCorporateResponse(result);
          pushMessage({
            role: "oyi",
            mode: "text",
            text: normalized.answer,
            suggestions: normalized.suggestions,
            knowledgeReferences: normalized.knowledgeReferences,
          });
        } else {
          setBackendUnavailable(true);
          pushMessage({
            role: "system",
            mode: "text",
            text: "Oyi could not answer that just now. Please try again in a moment.",
          });
        }
      } catch {
        setBackendUnavailable(true);
        pushMessage({
          role: "system",
          mode: "text",
          text: "Oyi is temporarily unavailable. Please try again shortly.",
        });
      } finally {
        setSending(false);
      }
    },
    [handoffPhase, oyiThreadId, pathname, publicSessionId, pushMessage, sending]
  );

  // Lazily created once, the first time voice or camera is activated,
  // then reused for the rest of the conversation (including handoff).
  const ensureCommunicationsSession = useCallback(async (): Promise<string | null> => {
    if (communicationsSessionId) return communicationsSessionId;
    if (sessionCreationInFlight.current) return sessionCreationInFlight.current;

    const promise = (async () => {
      try {
        const result = await createOyiCommunicationsSession({ publicSessionId, oyiThreadId });
        if (result.ok && result.session?.session_id) {
          setCommunicationsSessionId(result.session.session_id);
          return result.session.session_id;
        }
        return null;
      } catch {
        return null;
      } finally {
        sessionCreationInFlight.current = null;
      }
    })();
    sessionCreationInFlight.current = promise;
    return promise;
  }, [communicationsSessionId, oyiThreadId, publicSessionId]);

  const sendVoiceAudio = useCallback(
    async (audioDataUrl: string) => {
      const sessionId = await ensureCommunicationsSession();
      if (!sessionId) {
        pushMessage({ role: "system", mode: "voice", text: "Voice is unavailable right now. You can keep typing." });
        return { ok: false as const };
      }
      try {
        const result = await sendOyiVoiceTurn({
          sessionId,
          audioDataUrl,
          publicSessionId,
          oyiThreadId,
          sourcePage: pathname,
        });
        if (result.ok) {
          if (result.oyi_thread_id) setOyiThreadId(result.oyi_thread_id);
          if (result.transcript?.transcript) {
            pushMessage({ role: "visitor", mode: "voice", text: result.transcript.transcript });
          }
          pushMessage({ role: "oyi", mode: "voice", text: result.response_text || "" });
          return { ok: true as const, audioDataUrl: result.audio?.audio_data_url || null };
        }
        pushMessage({
          role: "system",
          mode: "voice",
          text: result.detail || result.message || "Oyi could not process that voice turn.",
        });
        return { ok: false as const };
      } catch {
        pushMessage({ role: "system", mode: "voice", text: "Voice is temporarily unavailable." });
        return { ok: false as const };
      }
    },
    [ensureCommunicationsSession, oyiThreadId, pathname, publicSessionId, pushMessage]
  );

  const sendVisualFrame = useCallback(
    async (imageDataUrl: string, prompt?: string) => {
      const sessionId = await ensureCommunicationsSession();
      if (!sessionId) {
        pushMessage({ role: "system", mode: "visual", text: "Visual analysis is unavailable right now." });
        return { ok: false as const };
      }
      try {
        const result = await sendOyiVisualObservation({
          sessionId,
          imageDataUrl,
          prompt,
          publicSessionId,
          oyiThreadId,
          sourcePage: pathname,
        });
        if (result.ok) {
          if (result.oyi_thread_id) setOyiThreadId(result.oyi_thread_id);
          pushMessage({
            role: "visitor",
            mode: "visual",
            text: prompt || "Showing Oyi something.",
          });
          pushMessage({ role: "oyi", mode: "visual", text: result.response_text || "" });
          return { ok: true as const };
        }
        pushMessage({
          role: "system",
          mode: "visual",
          text: result.detail || result.message || "Oyi could not analyze that.",
        });
        return { ok: false as const };
      } catch {
        pushMessage({ role: "system", mode: "visual", text: "Visual analysis is temporarily unavailable." });
        return { ok: false as const };
      }
    },
    [ensureCommunicationsSession, oyiThreadId, pathname, publicSessionId, pushMessage]
  );

  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const staffPollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearPolls = useCallback(() => {
    if (pollTimer.current) clearInterval(pollTimer.current);
    if (staffPollTimer.current) clearInterval(staffPollTimer.current);
    pollTimer.current = null;
    staffPollTimer.current = null;
  }, []);

  useEffect(() => clearPolls, [clearPolls]);

  const watchStaffJoin = useCallback(
    (sessionId: string) => {
      if (staffPollTimer.current) clearInterval(staffPollTimer.current);
      staffPollTimer.current = setInterval(async () => {
        try {
          const result = await readOyiSession(sessionId);
          const staff = (result.participants || []).find((p) => p.role === "staff" && p.state === "joined");
          if (staff) {
            setStaffDisplayName(staff.display_name || "An Ochiga team member");
            setHandoffPhase("staff_joined");
            pushMessage({
              role: "system",
              mode: "text",
              text: `${staff.display_name || "An Ochiga team member"} has joined the conversation.`,
            });
            if (staffPollTimer.current) clearInterval(staffPollTimer.current);
            staffPollTimer.current = null;
          }
        } catch {
          // transient — next tick will retry.
        }
      }, STAFF_POLL_MS);
    },
    [pushMessage]
  );

  const watchHandoffStatus = useCallback(
    (sessionId: string) => {
      if (pollTimer.current) clearInterval(pollTimer.current);
      pollTimer.current = setInterval(async () => {
        try {
          const result = await readOyiHandoff(sessionId);
          const latest = (result.handoffs || [])[0];
          if (!latest) return;
          if (latest.status === "offered" || latest.status === "routing") {
            setHandoffPhase("staff_joining");
          }
          const terminal = terminalHandoffPhase(latest.status);
          if (terminal === "staff_joined") {
            if (pollTimer.current) clearInterval(pollTimer.current);
            pollTimer.current = null;
            watchStaffJoin(sessionId);
          } else if (terminal === "unavailable") {
            setHandoffPhase("unavailable");
            pushMessage({
              role: "system",
              mode: "text",
              text: "No Ochiga team member is available right now. You can request a callback or keep talking with Oyi.",
            });
            if (pollTimer.current) clearInterval(pollTimer.current);
            pollTimer.current = null;
          }
        } catch {
          // transient — next tick will retry.
        }
      }, HANDOFF_POLL_MS);
    },
    [pushMessage, watchStaffJoin]
  );

  const requestHandoff = useCallback(
    async (reason?: string) => {
      const sessionId = await ensureCommunicationsSession();
      if (!sessionId) {
        setHandoffPhase("unavailable");
        return;
      }
      setHandoffPhase("requesting");
      setHandoffRecommended(false);
      try {
        const result = await requestOyiHandoff({
          sessionId,
          publicSessionId,
          oyiThreadId,
          businessUnit: lastBusinessUnit,
          reason,
        });
        if (result.ok && result.handoff) {
          setHandoffId(result.handoff.handoff_id);
          setHandoffPhase("waiting");
          pushMessage({ role: "system", mode: "text", text: "Finding the right Ochiga team member…" });
          watchHandoffStatus(sessionId);
        } else {
          setHandoffPhase("error");
        }
      } catch {
        setHandoffPhase("error");
      }
    },
    [ensureCommunicationsSession, lastBusinessUnit, oyiThreadId, publicSessionId, pushMessage, watchHandoffStatus]
  );

  const requestCallback = useCallback(
    async (reason?: string) => {
      const sessionId = await ensureCommunicationsSession();
      if (!sessionId) return;
      try {
        const result = await requestOyiCallback({
          sessionId,
          publicSessionId,
          oyiThreadId,
          businessUnit: lastBusinessUnit,
          reason,
        });
        if (result.ok) {
          setHandoffPhase("callback_requested");
          pushMessage({
            role: "system",
            mode: "text",
            text: "Thanks — the Ochiga team will follow up. You can keep talking with Oyi in the meantime.",
          });
        }
      } catch {
        // The banner keeps its current state; visitor can retry.
      }
    },
    [ensureCommunicationsSession, lastBusinessUnit, oyiThreadId, publicSessionId, pushMessage]
  );

  const dismissHandoff = useCallback(() => {
    clearPolls();
    setHandoffPhase("none");
    setHandoffId(null);
    setStaffDisplayName(null);
  }, [clearPolls]);

  // Starts a fresh Oyi thread and media session — the public session
  // identity (this browser tab's visit) is kept, everything downstream
  // of it is not. There is no Backend "list my threads" endpoint on the
  // public surface yet, so this is a reset, not history browsing.
  const resetConversation = useCallback(() => {
    clearPolls();
    setMessages([]);
    setOyiThreadId(null);
    setCommunicationsSessionId(null);
    setHandoffPhase("none");
    setHandoffId(null);
    setStaffDisplayName(null);
    setHandoffRecommended(false);
    setBackendUnavailable(false);
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(THREAD_KEY);
        window.sessionStorage.removeItem(COMMS_SESSION_KEY);
      } catch {
        // sessionStorage unavailable — nothing to clean up.
      }
    }
  }, [clearPolls]);

  return {
    pathname,
    publicSessionId,
    oyiThreadId,
    communicationsSessionId,
    lastBusinessUnit,
    messages,
    sending,
    backendUnavailable,
    sendText,
    ensureCommunicationsSession,
    sendVoiceAudio,
    sendVisualFrame,
    handoff: { phase: handoffPhase, id: handoffId, staffDisplayName, recommended: handoffRecommended },
    requestHandoff,
    requestCallback,
    dismissHandoff,
    resetConversation,
  };
}
