"use client";

import { useEffect } from "react";
import { useDockedOrb, type OpenDirection } from "./useDockedOrb";

// Canonical Oyi orb — closed-state identity for the Universal
// Interaction Shell, shared across every Oyi surface. Same geometry
// and behavior as Ochiga Office's orb (public/office/index.html's
// .oyi-orb); only the accent differs (Oyi blue here, Ochiga red
// there), per the approved reference design. Docks to one of 6 edge
// anchors via the shared docking engine — never floats to the center.
export function OyiOrb({
  onOpen,
  onPositionChange,
  panelHeight,
}: {
  onOpen: () => void;
  onPositionChange: (position: { x: number; y: number } | null, openDirection: OpenDirection) => void;
  panelHeight: number;
}) {
  const { position, dragging, openDirection, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, consumeWasDragged } =
    useDockedOrb(panelHeight);

  // The panel (rendered once open) anchors itself off the orb's
  // current dock — keep the parent's copy in sync as it changes.
  useEffect(() => {
    onPositionChange(position, openDirection);
  }, [position, openDirection, onPositionChange]);

  return (
    <button
      type="button"
      aria-label="Open Oyi"
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
          ? { left: position.x, top: position.y, right: "auto", bottom: "auto" }
          : { right: "1.25rem", bottom: "calc(1.5rem + env(safe-area-inset-bottom))" }
      }
      className={`fixed z-[70] flex h-[60px] w-[60px] touch-none select-none items-center justify-center overflow-hidden rounded-full border border-ochiga-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-transform duration-fast ease-editorial focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oyi-blue ${
        dragging ? "scale-105 cursor-grabbing" : "cursor-grab hover:scale-105"
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 32% 28%, #5B93FA, #3B82F6 55%, #0b1220 100%)" }}
      />
      <span aria-hidden="true" className="relative text-[11px] font-semibold tracking-wide text-white">
        Oyi
      </span>
      <span className="sr-only">Oyi — Living Intelligence</span>
    </button>
  );
}
