"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  const [viewMode, setViewMode] = useState<"exploded" | "stacked">("exploded");
  const [rotation, setRotation] = useState({ x: 25, y: 45 });
  const [scale, setScale] = useState(0.9);
  const [scrollY, setScrollY] = useState(0);

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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-[#020408] text-white">
      
      {/* Caption */}
      <div className="max-w-3xl mx-auto text-center py-8 px-4">
        <h2 className="text-xl font-bold mb-2">Take our smart infrastructure tour</h2>
        <p className="text-sm text-slate-300 mb-4">
          Tap on the products below to see how Ochiga connects security, energy, automation, and more—all in one place.
        </p>
        <div className="flex justify-center gap-4 text-xs text-slate-400">
          <span>Smart Home</span>
          <span>Smart Estate</span>
          <span>Safety & Access Control</span>
        </div>
      </div>

      {/* View Mode Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setViewMode("stacked")}
          className={`px-4 py-2 rounded-lg font-bold ${viewMode === "stacked" ? "bg-cyan-500 text-black" : "bg-slate-800 text-white"}`}
        >
          Stacked
        </button>
        <button
          onClick={() => setViewMode("exploded")}
          className={`px-4 py-2 rounded-lg font-bold ${viewMode === "exploded" ? "bg-cyan-500 text-black" : "bg-slate-800 text-white"}`}
        >
          Exploded
        </button>
      </div>

      {/* 3D Container */}
      <div className="relative w-full h-[150vh] overflow-y-scroll">
        <div className="sticky top-0 w-full h-screen flex items-center justify-center">
          <div
            className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px]"
            style={{ transform: `translateY(${scrollY * 0.3}px) scale(${scale}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
          >
            <Canvas camera={{ position: [15, 10, 15], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 10]} intensity={1} />
              <ModernVilla />
              <MEP visible={showMEP} />
              {hotspots.map((h) => (
                <Hotspot key={h.id} position={h.pos} title={h.title} onOpen={() => setActiveHotspot(h)} color={showMEP ? "#00aaff" : "#ff7b2d"} />
              ))}
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Canvas>
          </div>
        </div>
      </div>

      {/* Hotspot panel */}
      {activeHotspot && (
        <div
          className="fixed bottom-8 left-4 w-72 p-4 bg-white text-black rounded-lg shadow-lg z-50"
        >
          <h3 className="font-bold">{activeHotspot.title}</h3>
          <p className="mt-2 text-sm">{activeHotspot.content}</p>
          <button
            onClick={() => setActiveHotspot(null)}
            className="mt-4 px-4 py-2 bg-cyan-500 text-black rounded-lg font-bold"
          >
            Close
          </button>
        </div>
      )}

      {/* MEP Toggle */}
      <div className="fixed top-4 left-4 flex flex-col gap-2 z-50">
        <button
          onClick={() => setShowMEP(v => !v)}
          className="px-3 py-2 bg-slate-900 rounded-lg text-white font-bold"
        >
          {showMEP ? "Hide MEP" : "Show MEP"}
        </button>
      </div>
    </div>
  );
}
