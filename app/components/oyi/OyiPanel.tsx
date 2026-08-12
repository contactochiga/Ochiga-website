"use client";

import { useEffect, useId, useRef } from "react";
import { MessageList } from "./MessageList";
import { Composer } from "./Composer";
import { VoiceDock } from "./VoiceDock";
import { CameraDock } from "./CameraDock";
import { HandoffBanner } from "./HandoffBanner";
import { IconClose, IconMinimize, IconNewConversation } from "./icons";
import type { useOyiWidget } from "./useOyiWidget";

type Mode = "text" | "voice" | "camera";

export function OyiPanel({
  widget,
  mode,
  setMode,
  onClose,
  onNewConversation,
}: {
  widget: ReturnType<typeof useOyiWidget>;
  mode: Mode;
  setMode: (mode: Mode) => void;
  onClose: () => void;
  onNewConversation: () => void;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>("input, button");
    firstFocusable?.focus({ preventScroll: true });
  }, []);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="fixed inset-x-0 bottom-0 z-[80] flex h-[min(640px,85dvh)] w-full flex-col overflow-hidden border border-ochiga-white/10 bg-ochiga-black shadow-[0_20px_60px_rgba(0,0,0,0.55)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:w-[384px] sm:rounded-lg"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <header className="flex shrink-0 items-center gap-3 border-b border-ochiga-white/10 px-4 py-3.5">
        <div className="flex-1 min-w-0">
          <h2 id={titleId} className="truncate text-sm font-medium text-ochiga-white">
            Ochiga Intelligence
          </h2>
          <p className="flex items-center gap-1.5 text-xs text-ochiga-grey-500">
            <span
              className={`h-1.5 w-1.5 rounded-full ${widget.backendUnavailable ? "bg-ochiga-red" : "bg-oyi-blue"}`}
              aria-hidden="true"
            />
            {widget.backendUnavailable ? "Unavailable — retrying" : "Oyi"}
          </p>
        </div>
        <button
          type="button"
          onClick={onNewConversation}
          aria-label="Start a new conversation"
          title="New conversation"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ochiga-grey-500 transition-colors duration-fast hover:bg-ochiga-graphite hover:text-ochiga-white"
        >
          <IconNewConversation className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Minimize"
          title="Minimize"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ochiga-grey-500 transition-colors duration-fast hover:bg-ochiga-graphite hover:text-ochiga-white"
        >
          <IconMinimize className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          title="Close"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ochiga-grey-500 transition-colors duration-fast hover:bg-ochiga-graphite hover:text-ochiga-white"
        >
          <IconClose className="h-4 w-4" />
        </button>
      </header>

      <MessageList messages={widget.messages} thinking={widget.sending} />

      {widget.handoff.recommended ? (
        <div className="px-4 pb-2">
          <button
            type="button"
            onClick={() => widget.requestHandoff()}
            className="rounded-full border border-oyi-blue/40 px-3 py-1.5 text-xs text-oyi-blue transition-colors duration-fast hover:bg-oyi-blue/10"
          >
            Talk to an Ochiga team member
          </button>
        </div>
      ) : null}

      <HandoffBanner
        phase={widget.handoff.phase}
        staffDisplayName={widget.handoff.staffDisplayName}
        onRequestCallback={() => widget.requestCallback()}
        onDismiss={widget.dismissHandoff}
      />

      {mode === "text" ? (
        <Composer
          onSend={widget.sendText}
          onStartVoice={() => setMode("voice")}
          onStartCamera={() => setMode("camera")}
          disabled={widget.sending}
        />
      ) : null}
      {mode === "voice" ? <VoiceDock sendVoiceAudio={widget.sendVoiceAudio} onClose={() => setMode("text")} /> : null}
      {mode === "camera" ? (
        <CameraDock sendVisualFrame={widget.sendVisualFrame} onClose={() => setMode("text")} />
      ) : null}
    </div>
  );
}
