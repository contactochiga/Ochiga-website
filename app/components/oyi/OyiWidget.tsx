"use client";

import { useState } from "react";
import { OyiBubble } from "./OyiBubble";
import { OyiPanel } from "./OyiPanel";
import { useOyiWidget } from "./useOyiWidget";

type Mode = "text" | "voice" | "camera";

export function OyiWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("text");
  const widget = useOyiWidget();

  return open ? (
    <OyiPanel
      widget={widget}
      mode={mode}
      setMode={setMode}
      onClose={() => {
        setOpen(false);
        setMode("text");
      }}
      onNewConversation={widget.resetConversation}
    />
  ) : (
    <OyiBubble onOpen={() => setOpen(true)} />
  );
}
