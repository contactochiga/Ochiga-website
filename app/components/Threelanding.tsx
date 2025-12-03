"use client";

import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";

type HotspotInfo = {
  id: string;
  title: string;
  content: string;
  pos: [number, number, number];
};

// ------------------------------
// Simple Box Room / Window
// ------------------------------
function RoomBox({
  pos,
  size,
  color = "#fff",
  opacity = 1,
}: {
  pos: [number, number, number];
  size: [number, number, number];
  color?: string;
  opacity?: number;
}) {
  return (
    <mesh position={pos} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

// ------------------------------
// Hotspot Button
// ------------------------------
function Hotspot({
  position,
  title,
  onOpen,
  color = "#ff7b2d",
}: {
  position: [number, number, number];
  title: string;
  onOpen: () => void;
  color?: string;
}) {
  return (
    <Html position={position} center transform occlude>
      <button
        onClick={onOpen}
        style={{
          background: color,
          padding: "8px 12px",
          borderRadius: 999,
          color: "white",
          border: "none",
          cursor: "pointer",
          fontWeight: 700,
          boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
        }}
      >
        {title}
      </button>
    </Html>
  );
}

// ------------------------------
// MEP Pipes
// ------------------------------
function MEP({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <group>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 12, 12]} />
        <meshStandardMaterial color="#0ea5a4" />
      </mesh>
      <mesh position={[3.2, -0.4, -1.6]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 4.8, 12]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[-2.6, -0.4, 1.6]}>
        <boxGeometry args={[0.4, 0.25, 0.4]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      <mesh position={[1.8, -0.4, -2.2]}>
        <boxGeometry args={[0.4, 0.25, 0.4]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
    </group>
  );
}

// ------------------------------
// Villa Layout
// ------------------------------
function ModernVilla() {
  return (
    <group>
      {/* Ground */}
      <RoomBox pos={[0, -0.75, 0]} size={[30, 1.5, 22]} color="#e6eef6" />

      {/* Ground Floor Walls */}
      <RoomBox pos={[0, 0.9, 0]} size={[12, 1.8, 9]} color="#ffffff" />
      <RoomBox pos={[-4, 1.0, 4]} size={[2, 1.6, 0.2]} color="#9fd4f8" opacity={0.3} />
      <RoomBox pos={[4, 1.0, 4]} size={[2, 1.6, 0.2]} color="#9fd4f8" opacity={0.3} />

      {/* First Floor */}
      <RoomBox pos={[0, 2.8, 0]} size={[12, 1.8, 9]} color="#f3f4f6" />
      <RoomBox pos={[-4, 3.0, 4]} size={[2, 1.6, 0.2]} color="#9fd4f8" opacity={0.3} />
      <RoomBox pos={[4, 3.0, 4]} size={[2, 1.6, 0.2]} color="#9fd4f8" opacity={0.3} />

      {/* Roof */}
      <RoomBox pos={[0, 4.0, 0]} size={[12.6, 0.2, 9.6]} color="#cbd5e1" />

      {/* Parking */}
      <RoomBox pos={[-10.2, 0.1, 2.6]} size={[6, 0.2, 10]} color="#d1d5db" />

      {/* Pool */}
      <RoomBox pos={[8.5, 0.1, -3.2]} size={[8, 0.2, 6]} color="#60a5fa" />

      {/* Outdoor Lounge */}
      <RoomBox pos={[8.5, 0.9, 2.4]} size={[5, 1.6, 3]} color="#f8fafc" />

      {/* Bedrooms */}
      <RoomBox pos={[-4.2, 2.8, -2.2]} size={[2.8, 1.6, 3]} color="#fef2f2" />
      <RoomBox pos={[-1.2, 2.8, -2.2]} size={[2.8, 1.6, 3]} color="#fff1f2" />
      <RoomBox pos={[1.8, 2.8, -2.2]} size={[2.8, 1.6, 3]} color="#fef6ee" />
      <RoomBox pos={[-1.2, 2.8, 1.6]} size={[2.8, 1.6, 3]} color="#f0fdf4" />
      <RoomBox pos={[3.2, 2.8, 1.6]} size={[3.2, 1.6, 3.6]} color="#eef2ff" />
    </group>
  );
}

// ------------------------------
// MAIN COMPONENT
// ------------------------------
export default function ThreeLanding() {
  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo | null>(null);
  const [showMEP, setShowMEP] = useState(false);

  const houseHotspots: HotspotInfo[] = useMemo(
    () => [
      { id: "cam1", title: "Door Camera", pos: [-2.4, 1.6, -1.6], content: "HD Door Camera" },
      { id: "lock1", title: "Smart Lock", pos: [-3.2, 0.9, -0.2], content: "Keyless entry" },
      { id: "temp1", title: "Thermostat", pos: [0.8, 1.9, 2.0], content: "Temperature Control" },
    ],
    []
  );

  const mepHotspots: HotspotInfo[] = useMemo(
    () => [
      { id: "junction1", title: "Junction Box", pos: [-2.6, -0.3, 1.6], content: "Electrical junction" },
      { id: "pipe1", title: "Water Inlet", pos: [1.8, -0.3, -2.2], content: "Water pipe inlet" },
    ],
    []
  );

  const hotspots = showMEP ? mepHotspots : houseHotspots;

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Caption */}
      <div style={{ textAlign: "center", padding: "16px" }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Take our smart infrastructure tour</h2>
        <p style={{ marginTop: 8, fontSize: 16, color: "#4b5563" }}>
          Tap on the products below to see how Ochiga connects security, energy, automation and more—all in one place.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 8, flexWrap: "wrap", fontWeight: 600 }}>
          <span style={{ cursor: "pointer" }}>Smart Home</span>
          <span style={{ cursor: "pointer" }}>Smart Estate</span>
          <span style={{ cursor: "pointer" }}>Safety & Access Control</span>
        </div>
      </div>

      {/* Canvas */}
      <div style={{ width: "100%", minHeight: "60vh", position: "relative" }}>
        <Canvas camera={{ position: [15, 10, 15], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={1} />

          <Suspense fallback={null}>
            <ModernVilla />
            <MEP visible={showMEP} />

            {hotspots.map((h) => (
              <Hotspot
                key={h.id}
                position={h.pos}
                title={h.title}
                onOpen={() => setActiveHotspot(h)}
                color={showMEP ? "#00aaff" : "#ff7b2d"}
              />
            ))}

            <OrbitControls />
          </Suspense>
        </Canvas>

        {/* Hotspot panel */}
        {activeHotspot && (
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              width: 260,
              padding: 16,
              background: "white",
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 10,
            }}
          >
            <h3 style={{ margin: 0 }}>{activeHotspot.title}</h3>
            <p style={{ marginTop: 8 }}>{activeHotspot.content}</p>
            <button
              onClick={() => setActiveHotspot(null)}
              style={{ marginTop: 10, padding: "8px 14px", background: "#ff7b2d", color: "white", borderRadius: 8, border: "none" }}
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Show MEP Button */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <button
          onClick={() => setShowMEP((v) => !v)}
          style={{ padding: "8px 16px", borderRadius: 8, background: "#111827", color: "white" }}
        >
          {showMEP ? "Hide MEP" : "Show MEP"}
        </button>
      </div>
    </div>
  );
}
