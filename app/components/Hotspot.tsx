// app/components/Hotspot.tsx
"use client";
import React from "react";
import { Html } from "@react-three/drei";

type HotspotProps = {
  position: [number, number, number];
  title: string;
  onOpen: () => void;
  color?: string;
};

export default function Hotspot({ position, title, onOpen, color = "#ff7b2d" }: HotspotProps) {
  return (
    <Html position={position} center transform occlude>
      <div style={{ transform: "translate(-50%,-50%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <button
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
          style={{
            background: color,
            border: "none",
            padding: "8px 12px",
            borderRadius: 999,
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
            whiteSpace: "nowrap"
          }}
        >
          {title}
        </button>
      </div>
    </Html>
  );
}
