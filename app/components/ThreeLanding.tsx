// app/components/ThreeLanding.tsx
"use client";
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Hotspot from "./Hotspot";
import MEPSystem from "./MEPSystem";
import useTelemetrySimulator from "./TelemetrySimulator";

/* -------------------------
   Box helper for buildings
------------------------- */
function Box({ pos, size, color = "#fff", opacity = 1 }: { pos: [number, number, number]; size: [number, number, number]; color?: string; opacity?: number }) {
  return (
    <mesh position={pos} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

/* -------------------------
   Estate layout with streets & buildings
------------------------- */
const exampleEstate = {
  name: "Ochiga Estate",
  buildings: [
    // Right street 5-bed mansions (5 streets, 3 units per street)
    ...Array.from({ length: 5 }, (_, s) =>
      Array.from({ length: 3 }, (_, i) => ({
        id: `r-s${s + 1}-u${i + 1}`,
        type: "5bed-mansion",
        coords: [12, 1.5, -30 + i * 20 + s * 2], // adjust spacing per street
      }))
    ).flat(),
    // Left street duplexes
    ...Array.from({ length: 3 }, (_, s) =>
      Array.from({ length: 2 }, (_, i) => ({
        id: `l-s${s + 1}-u${i + 1}`,
        type: "5bed-duplex",
        coords: [-12, 1.5, -20 + i * 20 + s * 2],
      }))
    ).flat(),
    // L-turn units
    ...Array.from({ length: 12 }, (_, i) => ({
      id: `l-turn-u${i + 1}`,
      type: "3bed",
      coords: [30, 1.5, 40 + i * 4],
    })),
  ],
  units: [],
  junctions: [
    { id: "jn-power-main", type: "electrical", coords: [0, -0.6, -22], label: "Power House" },
    { id: "jn-water-main", type: "water", coords: [0, -0.6, 22], label: "Water House" },
    { id: "jn-fiber-1", type: "fiber", coords: [-26, -0.4, 0], label: "Fiber House" },
    { id: "jn-gas-1", type: "gas", coords: [10, -0.4, -10], label: "Gas Plant" },
    { id: "jn-fire-1", type: "fire", coords: [-10, -0.4, 10], label: "Fire House" },
    // Street junctions (access points)
    { id: "street-right-1", type: "street", coords: [12, 0, -30], label: "Right Street 1" },
    { id: "street-right-2", type: "street", coords: [12, 0, -10], label: "Right Street 2" },
    { id: "street-right-3", type: "street", coords: [12, 0, 10], label: "Right Street 3" },
    { id: "street-left-1", type: "street", coords: [-12, 0, -30], label: "Left Street 1" },
    { id: "street-left-2", type: "street", coords: [-12, 0, -10], label: "Left Street 2" },
    { id: "street-left-3", type: "street", coords: [-12, 0, 10], label: "Left Street 3" },
    { id: "l-turn-access", type: "street", coords: [30, 0, 40], label: "L Turn Access" },
  ],
  facility: {
    powerHouse: { id: "jn-power-main", type: "electrical", coords: [0, -0.6, -22] },
    waterHouse: { id: "jn-water-main", type: "water", coords: [0, -0.6, 22] },
    fiberHouse: { id: "jn-fiber-1", type: "fiber", coords: [-26, -0.4, 0] },
    gasPlant: { id: "jn-gas-1", type: "gas", coords: [10, -0.4, -10] },
    fireHouse: { id: "jn-fire-1", type: "fire", coords: [-10, -0.4, 10] },
  },
};

/* -------------------------
   Modern Villa placeholder (ground + demo buildings)
------------------------- */
function ModernVilla() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#e6eef6" />
      </mesh>

      {/* Demo buildings */}
      {exampleEstate.buildings.map((b: any) => (
        <Box key={b.id} pos={b.coords} size={[10, 6, 10]} color="#ffffff" />
      ))}
    </group>
  );
}

/* -------------------------
   ThreeLanding Component
------------------------- */
export default function ThreeLanding() {
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    electrical: true,
    water: false,
    fiber: false,
    gas: false,
    fire: false,
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
          Explore the estate’s energy, water, fiber, gas, and safety systems in one interactive model.
        </div>
      </div>

      {/* Controls */}
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
        <button onClick={() => toggleLayer("gas")} style={{ padding: 8, borderRadius: 8, background: activeLayers.gas ? "#f97316" : "#222", border: "none" }}>
          Gas
        </button>
        <button onClick={() => toggleLayer("fire")} style={{ padding: 8, borderRadius: 8, background: activeLayers.fire ? "#ef4444" : "#222", border: "none" }}>
          Fire
        </button>
      </div>

      <Canvas camera={{ position: [80, 40, 80], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[50, 60, 30]} intensity={1.2} />
        <Suspense fallback={null}>
          <ModernVilla />

          {/* MEPSystem renders pipes + junctions */}
          <MEPSystem estate={exampleEstate} activeLayers={activeLayers} onOpenJunction={(j: any) => setSelectedJunction(j)} />

          {/* Unit hotspots */}
          {exampleEstate.buildings.map((b: any) => (
            <Hotspot key={b.id} position={b.coords} title={b.id} onOpen={() => setSelectedJunction({ unit: b })} color="#ff7b2d" />
          ))}

          <OrbitControls enablePan enableZoom enableRotate />
        </Suspense>
      </Canvas>

      {/* Selected junction/unit panel */}
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
