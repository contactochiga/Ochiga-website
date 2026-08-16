"use client";

import { IconClose } from "./icons";
import { dockedSurfaceStyle, type OpenDirection } from "./useDockedOrb";

// Minimized state — distinct from closed. Keeps Oyi's presence (and,
// implicitly, the live conversation underneath) visible without the
// full panel; restoring returns to exactly where the conversation
// left off, since OyiWidget never unmounts useOyiWidget's state
// between minimize and restore.
export function OyiMinimizedBar({
  dock,
  onRestore,
  onClose,
}: {
  dock: { position: { x: number; y: number } | null; openDirection: OpenDirection };
  onRestore: () => void;
  onClose: () => void;
}) {
  const dockedStyle = dockedSurfaceStyle(dock.position, dock.openDirection);

  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-[80] flex min-w-[220px] items-center gap-2.5 rounded-full border border-ochiga-white/10 bg-ochiga-black py-2 pl-2 pr-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
      style={dockedStyle}
    >
      <button
        type="button"
        onClick={onRestore}
        aria-label="Restore Oyi"
        title="Restore"
        className="flex flex-1 items-center gap-2.5 text-left"
      >
        <span
          aria-hidden="true"
          className="h-[22px] w-[22px] shrink-0 rounded-full"
          style={{ background: "radial-gradient(circle at 32% 28%, #5B93FA, #3B82F6 55%, #0b1220 100%)" }}
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs font-medium text-ochiga-white">Oyi</span>
          <span className="block truncate text-[10px] text-ochiga-grey-500">Living Intelligence</span>
        </span>
      </button>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close Oyi"
        title="Close"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-ochiga-grey-500 transition-colors duration-fast hover:bg-ochiga-graphite hover:text-ochiga-white"
      >
        <IconClose className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
