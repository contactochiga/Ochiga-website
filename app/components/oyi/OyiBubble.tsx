"use client";

import { useDraggableBubble } from "./useDraggableBubble";

export function OyiBubble({ onOpen }: { onOpen: () => void }) {
  const { position, dragging, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, consumeWasDragged } =
    useDraggableBubble();

  return (
    <button
      type="button"
      aria-label="Open Ochiga Intelligence"
      aria-haspopup="dialog"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onClick={() => {
        if (!consumeWasDragged()) onOpen();
      }}
      style={
        position
          ? { left: position.x, top: position.y }
          : { right: "1.25rem", bottom: "calc(1.5rem + env(safe-area-inset-bottom))" }
      }
      className={`fixed z-[70] flex h-[60px] w-[60px] touch-none select-none items-center justify-center rounded-full border border-ochiga-white/15 bg-ochiga-charcoal/95 text-ochiga-white shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform duration-fast ease-editorial focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oyi-blue ${
        dragging ? "scale-105 cursor-grabbing" : "cursor-grab hover:scale-105"
      }`}
    >
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-oyi-blue/60 motion-reduce:animate-none" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-oyi-blue" />
      </span>
      <span className="sr-only">Ochiga Intelligence — Oyi</span>
    </button>
  );
}
