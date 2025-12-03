// app/components/ThreeLanding.tsx
"use client";
import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

import Hotspot from "./Hotspot";
import MEPSystem from "./MEPSystem";
import useTelemetrySimulator from "./TelemetrySimulator";

/* -------------------------
   Simple Room/Box helper
   ------------------------- */
function RoomBox({ pos, size, color = "#fff", opacity = 1 }: { pos: [number, number, number]; size: [number, number, number]; color?: string; opacity?: number; }) {
  return (
    <mesh position={pos as any} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

/* -------------------------
   Simple Modern Villa (placeholder)
   ------------------------- */
function ModernVilla() {
  return (
    <group>
      {/* ground */}
      <RoomBox pos={[0, -0.75, 0]} size={[60, 1.5, 40]} color="#e6eef6" />
      {/* main building mass */}
      <RoomBox pos={[0, 1, 0]} size={[12, 2.2, 9]} color="#ffffff" />
      <RoomBox pos={[0, 3.0, 0]} size={[12, 2.2, 9]} color="#f3f4f6" />
      <RoomBox pos={[8.5, 0.1, -3.2]} size={[8, 0.2, 6]} color="#60a5fa" />
      <RoomBox pos={[-10.2, 0.1, 8]} size={[14, 0.2, 10]} color="#d1d5db" />
      {/* small external details */}
      <mesh position={[5.6, 0.9, 2.6]}>
        <boxGeometry args={[2, 1.4, 1]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
    </group>
  );
}

/* -------------------------
   Example estate data
   (replace with your full model later)
   ------------------------- */
const exampleEstate = {
  name: "Ochiga Demo Estate",
  buildings: [
    { id: "b-left-1", kind: "multi-story", coords: [-18, 0, 0] },
    { id: "b-right-1", kind: "multi-story", coords: [18, 0, 0] },
    { id: "b-duplex-row", kind: "duplex", coords: [36, 0, 10] },
  ],
  units: [
    { id: "u-left-1", type: "3bed", coords: [-18, 1.5, -3] },
    { id: "u-right-1", type: "2bed", coords: [18, 1.5, 3] },
    { id: "u-duplex-1", type: "5bed-duplex", coords: [36, 1.5, 10] },
  ],
  junctions: [
    { id: "jn-power-main", type: "electrical", coords: [0, -0.6, -22], label: "Power House" },
    { id: "jn-water-main", type: "water", coords: [0, -0.6, 22], label: "Water Plant" },
    { id: "jn-fiber-1", type: "fiber", coords: [-26, -0.4, 0], label: "Fiber Headend" },
    { id: "jn-st-1", type: "street", coords: [0, -0.4, 0], label: "Main Junction" },
    { id: "jn-st-2", type: "street", coords: [16, -0.4, 8], label: "Junction 2" },
    { id: "jn-st-3", type: "street", coords: [-16, -0.4, 8], label: "Junction 3" },
  ],
  facility: {
    powerHouse: { id: "jn-power-main", type: "electrical", coords: [0, -0.6, -22] },
    waterPlant: { id: "jn-water-main", type: "water", coords: [0, -0.6, 22] },
    serverRoom: { id: "jn-fiber-1", type: "fiber", coords: [-26, -0.4, 0] },
    gasPlant: undefined,
    sewagePlant: undefined,
  },
};

export default function ThreeLanding() {
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    electrical: true,
    water: false,
    fiber: false,
    gas: false,
    sewer: false,
    hvac: false,
  });

  const [selectedJunction, setSelectedJunction] = useState<any | null>(null);
  const telemetry = useTelemetrySimulator(exampleEstate);

  const toggleLayer = (k: string) => setActiveLayers((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div style={{ width: "100%", height: "90vh", position: "relative", background: "#020408" }}>
      {/* Top caption */}
      <div style={{ position: "absolute", left: 20, top: 18, zIndex: 60, color: "white" }}>
        <h3 style={{ margin: 0 }}>Take our smart infrastructure tour</h3>
        <div style={{ opacity: 0.8, marginTop: 6, fontSize: 13, maxWidth: 420 }}>
          Tap on the products below to see how Ochiga connects security, energy, automation and more — all in one place.
        </div>
        <div style={{ marginTop: 8, display: "flex", gap: 12, color: "#cbd5e1", fontSize: 13 }}>
          <span>Smart Home</span>
          <span>Smart Estate</span>
          <span>Safety & Access</span>
        </div>
      </div>

      {/* Controls (left) */}
      <div style={{ position: "absolute", left: 18, bottom: 18, zIndex: 70, display: "flex", gap: 8 }}>
        <button onClick={() => toggleLayer("electrical")} style={{ padding: 8, borderRadius: 8, background: activeLayers.electrical ? "#facc15" : "#222", border: "none" }}>
          Electrical
        </button>
        <button onClick={() => toggleLayer("water")} style={{ padding: 8, borderRadius: 8, background: activeLayers.water ? "#06b6d4" : "#222", border: "none" }}>
          Water
        </button>
        <button onClick={() => toggleLayer("fiber")} style={{ padding: 8, borderRadius: 8, background: activeLayers.fiber ? "#60a5fa" : "#222", border: "none" }}>
          Fiber
        </button>
      </div>

      <Canvas camera={{ position: [40, 20, 40], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[40, 60, 20]} intensity={1.2} />
        <Suspense fallback={null}>
          {/* simple ground + villa */}
          <ModernVilla />

          {/* MEP pipes + junctions */}
          <MEPSystem estate={exampleEstate} activeLayers={activeLayers} onOpenJunction={(j: any) => setSelectedJunction(j)} />

          {/* Example unit-level hotspots */}
          {exampleEstate.units.map((u: any) => (
            <Hotspot key={u.id} position={u.coords} title={u.id} onOpen={() => setSelectedJunction({ unit: u })} color="#ff7b2d" />
          ))}

          <OrbitControls enablePan enableZoom enableRotate />
        </Suspense>
      </Canvas>

      {/* Junction / Unit panel */}
      {selectedJunction && (
        <div style={{
          position: "absolute", right: 18, bottom: 18, zIndex: 99,
          width: 320, background: "white", color: "#111", padding: 14, borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
        }}>
          {selectedJunction.unit ? (
            <>
              <h4 style={{ margin: 0 }}>{selectedJunction.unit.id}</h4>
              <div style={{ marginTop: 8 }}>
                <div>Type: {selectedJunction.unit.type}</div>
                <div style={{ marginTop: 6 }}>Electric: {telemetry[`elec-${selectedJunction.unit.id}`]?.value ?? "–"} kW</div>
                <div>Water: {telemetry[`water-${selectedJunction.unit.id}`]?.value ?? "–"} L/s</div>
              </div>
            </>
          ) : (
            <>
              <h4 style={{ margin: 0 }}>{selectedJunction.label ?? selectedJunction.id}</h4>
              <div style={{ marginTop: 8 }}>
                <div>Service: {selectedJunction.type}</div>
                <div style={{ marginTop: 6 }}>Flow / Load: {telemetry[`jn-${selectedJunction.id}-flow`]?.value ?? "–"} {telemetry[`jn-${selectedJunction.id}-flow`]?.unit ?? ""}</div>
              </div>
            </>
          )}

          <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button onClick={() => setSelectedJunction(null)} style={{ padding: "8px 10px", borderRadius: 8 }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
