"use client";

import type { HandoffPhase } from "./useOyiWidget";
import { IconPerson } from "./icons";

export function HandoffBanner({
  phase,
  staffDisplayName,
  onRequestCallback,
  onDismiss,
}: {
  phase: HandoffPhase;
  staffDisplayName: string | null;
  onRequestCallback: () => void;
  onDismiss: () => void;
}) {
  if (phase === "none") return null;

  const copy: Record<Exclude<HandoffPhase, "none">, string> = {
    requesting: "Requesting an Ochiga team member…",
    waiting: "Finding the right Ochiga team member…",
    staff_joining: "A team member is joining the conversation…",
    staff_joined: `${staffDisplayName || "An Ochiga team member"} has joined.`,
    unavailable: "No one is available right now.",
    callback_requested: "Thanks — the Ochiga team will follow up.",
    error: "Could not reach the team just now.",
  };

  return (
    <div
      role="status"
      className="mx-4 mb-2 flex items-center gap-2.5 rounded-lg border border-ochiga-white/10 bg-ochiga-charcoal px-3 py-2.5 text-xs text-ochiga-grey-300"
    >
      <IconPerson className="h-4 w-4 shrink-0 text-oyi-blue" />
      <span className="flex-1">{copy[phase]}</span>
      {phase === "unavailable" ? (
        <button
          type="button"
          onClick={onRequestCallback}
          className="shrink-0 rounded bg-ochiga-red px-2.5 py-1 text-xs font-medium text-ochiga-white transition-colors duration-fast hover:bg-ochiga-red-bright"
        >
          Request callback
        </button>
      ) : null}
      {phase === "staff_joined" || phase === "unavailable" || phase === "callback_requested" || phase === "error" ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 text-ochiga-grey-500 transition-colors duration-fast hover:text-ochiga-white"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
