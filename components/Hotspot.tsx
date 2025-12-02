// components/Hotspot.tsx
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
    <Html position={position} center transform occluder>
      <div style={{
        transform: "translate(-50%,-50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <button
          onClick={onOpen}
          style={{
            background: color,
            border: "none",
            padding: "10px 14px",
            borderRadius: 999,
            boxShadow: "0 8px 20px rgba(2,6,23,0.6)",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {title}
        </button>
      </div>
    </Html>
  );
}
