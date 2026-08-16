"use client";

import { useCallback, useState } from "react";
import { OyiOrb } from "./OyiOrb";
import { OyiPanel } from "./OyiPanel";
import { OyiMinimizedBar } from "./OyiMinimizedBar";
import { useOyiWidget } from "./useOyiWidget";
import type { OpenDirection } from "./useDockedOrb";

type Mode = "text" | "voice" | "camera";
type ShellState = "closed" | "minimized" | "open";

const DEFAULT_PANEL_HEIGHT = 600;

export function OyiWidget() {
  const [shellState, setShellState] = useState<ShellState>("closed");
  const [mode, setMode] = useState<Mode>("text");
  const [dock, setDock] = useState<{ position: { x: number; y: number } | null; openDirection: OpenDirection }>({
    position: null,
    openDirection: { horizontal: "left", vertical: "up" },
  });
  const widget = useOyiWidget();

  const handlePositionChange = useCallback((position: { x: number; y: number } | null, openDirection: OpenDirection) => {
    setDock({ position, openDirection });
  }, []);

  const open = useCallback(() => setShellState("open"), []);
  const minimize = useCallback(() => setShellState("minimized"), []);
  const close = useCallback(() => {
    setShellState("closed");
    setMode("text");
  }, []);
  const restore = useCallback(() => setShellState("open"), []);

  return (
    <>
      {/* The orb stays mounted across every shell state (matching
          Ochiga Office's architecture) so its docked position and
          drag state survive open/minimize/close transitions instead
          of resetting on every remount. */}
      <div className={shellState === "closed" ? "" : "hidden"}>
        <OyiOrb onOpen={open} onPositionChange={handlePositionChange} panelHeight={DEFAULT_PANEL_HEIGHT} />
      </div>
      {shellState === "open" ? (
        <OyiPanel
          widget={widget}
          mode={mode}
          setMode={setMode}
          dock={dock}
          onMinimize={minimize}
          onClose={close}
          onNewConversation={widget.resetConversation}
        />
      ) : null}
      {shellState === "minimized" ? <OyiMinimizedBar dock={dock} onRestore={restore} onClose={close} /> : null}
    </>
  );
}
