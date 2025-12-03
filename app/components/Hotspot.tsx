"use client";

import React from "react";
import { Html } from "@react-three/drei";

type HotspotProps = {
  position: [number, number, number];
  title: string;
  onOpen: () => void;
  color?: string;
};

export default function Hotspot({
  position,
  title,
  onOpen,
  color = "#ff7b2d",
}: HotspotProps) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color={color} />

      <Html center distanceFactor={15}>
        <button
          onClick={onOpen}
          style={{
            padding: "4px 8px",
            fontSize: "12px",
            background: color,
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </button>
      </Html>
    </mesh>
  );
}
