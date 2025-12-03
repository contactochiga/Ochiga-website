// app/components/ThreeLanding.tsx
"use client";

import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Hotspot from "./Hotspot";
import MEPSystem from "./MEPSystem";
import useTelemetrySimulator from "./TelemetrySimulator";

/* ---------- Simple Box helper ---------- */
function Box({ pos, size, color = "#fff", opacity = 1 }: { pos: [number, number, number]; size: [number, number, number]; color?: string; opacity?: number }) {
  return (
    <mesh position={pos as any} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

/* ---------- Estate layout (DT / PT mapping) ---------- */
/**
 * Layout notes:
 * - Coordinates are meters in a local plane.
 * - Right-hand side has rows of DT (5-bed duplex/terrace).
 * - Left-hand side has PT blocks (multi-storey flats).
 * - Facility buildings are at the top of the plan.
 *
 * Modify coords to match exact placement later.
 */
const exampleEstate = {
  name: "Ochiga Demo Estate",
  // Facility cluster (top)
  facility: {
    powerHouse: { id: "power-house", type: "electrical", coords: [0, -0.4, -40], label: "Power House" },
    waterPlant: { id: "water-plant", type: "water", coords: [-30, -0.4, 30], label: "Water Plant" },
    serverRoom: { id: "fiber-hub", type: "fiber", coords: [30, -0.4, 30], label: "Fiber Headend" },
    gasPlant: { id: "gas-plant", type: "gas", coords: [0, -0.4, 42], label: "Gas Plant" },
    fireHouse: { id: "fire-house", type: "fire", coords: [-14, -0.4, 42], label: "Fire House" },
    sewagePlant: { id: "sewage-plant", type: "sewer", coords: [14, -0.4, 42], label: "Sewage Plant" },
  },

  // Junctions along streets (where pipes/ducts meet the road)
  junctions: [
    { id: "jn-main-1", type: "street", coords: [0, -0.3, 0], label: "Main Street Junction" },
    { id: "jn-right-1", type: "street", coords: [18, -0.3, -8], label: "Right Street J1" },
    { id: "jn-right-2", type: "street", coords: [18, -0.3, 8], label: "Right Street J2" },
    { id: "jn-left-1", type: "street", coords: [-18, -0.3, -8], label: "Left Street J1" },
    { id: "jn-left-2", type: "street", coords: [-18, -0.3, 8], label: "Left Street J2" },
    { id: "jn-bottom", type: "street", coords: [0, -0.3, 40], label: "Bottom Junction" },
  ],

  // Units: DT = terrace duplex (5-bed), PT = multi-storey (2/3/7-bed)
  units: [
    // Right side: DT1..DT6 — five-bedroom 2-floor terraces arranged down the right side
    { id: "DT1", type: "5bed-terrace", coords: [30, 0.8, -18] },
    { id: "DT2", type: "5bed-terrace", coords: [30, 0.8, -6] },
    { id: "DT3", type: "5bed-terrace", coords: [30, 0.8, 6] },
    { id: "DT4", type: "5bed-terrace", coords: [30, 0.8, 18] },
    { id: "DT5", type: "5bed-terrace", coords: [42, 0.8, -10] },
    { id: "DT6", type: "5bed-terrace", coords: [42, 0.8, 10] },

    // Left side: PT1..PT4
    // PT1: 2-bedroom (multi-storey)
    { id: "PT1-A", type: "2bed-flat", coords: [-28, 1.6, -14] },
    { id: "PT1-B", type: "2bed-flat", coords: [-28, 1.6, -4] },

    // PT2: 3-bedroom (multi-storey)
    { id: "PT2-A", type: "3bed-flat", coords: [-28, 1.6, 4] },
    { id: "PT2-B", type: "3bed-flat", coords: [-28, 1.6, 14] },

    // PT3 & PT4: larger terrace/penthouses (7-bed style)
    { id: "PT3-1", type: "7bed-terrace", coords: [-8, 2.4, -18] },
    { id: "PT3-2", type: "7bed-terrace", coords: [-8, 2.4, -6] },
    { id: "PT4-1", type: "7bed-terrace", coords: [-8, 2.4, 6] },
    { id: "PT4-2", type: "7bed-terrace", coords: [-8, 2.4, 18] },

    // Facility support / common areas (pool, gym, parking)
    { id: "pool", type: "amenity-pool", coords: [0, 0.3, 8] },
    { id: "gym", type: "amenity-gym", coords: [0, 0.3, -12] },
    { id: "facility-office", type: "facility-office", coords: [0, 0.3, 34] },
  ],
};

/* ---------- Small visual building generator ---------- */
function EstateMasses() {
  return (
    <group>
      {/* large ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[180, 160]} />
        <meshStandardMaterial color="#0b1220" />
      </mesh>

      {/* central road (white visible band) */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[8, 0.04, 120]} />
        <meshStandardMaterial color="#0f1724" />
      </mesh>

      {/* buildings placeholder for units */}
      {exampleEstate.units.map((u: any) => {
        // small heuristic for color by type
        const color =
          u.type.includes("5bed") ? "#fef08a" :
          u.type.includes("7bed") ? "#fb923c" :
          u.type.includes("3bed") ? "#bae6fd" :
          u.type.includes("2bed") ? "#bbf7d0" :
          u.type.includes("amenity") ? "#60a5fa" :
          "#c7c7c7";

        // size heuristics
        const size: [number, number, number] =
          u.type.includes("7bed") ? [8, 5, 8] :
          u.type.includes("5bed") ? [7, 3.6, 6] :
          u.type.includes("3bed") ? [6, 3.2, 5] :
          u.type.includes("2bed") ? [5, 3, 4.4] :
          [4, 2, 4];

        return <Box key={u.id} pos={u.coords} size={size} color={color} />;
      })}

      {/* facility cluster boxes */}
      {Object.values(exampleEstate.facility).map((f: any) => (
        <Box key={f.id} pos={f.coords} size={[6, 3, 6]} color="#7dd3fc" />
      ))}

      {/* junction markers (small boxes for clarity) */}
      {exampleEstate.junctions.map((j: any) => (
        <Box key={j.id} pos={j.coords} size={[1.2, 0.8, 1.2]} color="#94a3b8" />
      ))}
    </group>
  );
}

/* ---------- Main component ---------- */
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
    <div style={{ width: "100%", height: "92vh", position: "relative", background: "#020408" }}>
      {/* Caption */}
      <div style={{ position: "absolute", left: 20, top: 18, zIndex: 60, color: "white", maxWidth: 520 }}>
        <h3 style={{ margin: 0 }}>Take our smart infrastructure tour</h3>
        <div style={{ opacity: 0.85, marginTop: 6, fontSize: 13 }}>
          Tap the hotspots to inspect junctions, units and live telemetry — power, water, fiber, gas and more.
        </div>
        <div style={{ marginTop: 8, display: "flex", gap: 12, color: "#cbd5e1", fontSize: 13 }}>
          <span>Smart Home</span>
          <span>Smart Estate</span>
          <span>Safety & Access</span>
        </div>
      </div>

      {/* Layer controls */}
      <div style={{ position: "absolute", left: 18, bottom: 18, zIndex: 70, display: "flex", gap: 8 }}>
        <button onClick={() => toggleLayer("electrical")} style={{ padding: 8, borderRadius: 8, background: activeLayers.electrical ? "#facc15" : "#222", border: "none", color: "#000" }}>
          Electrical
        </button>
        <button onClick={() => toggleLayer("water")} style={{ padding: 8, borderRadius: 8, background: activeLayers.water ? "#06b6d4" : "#222", border: "none", color: "#fff" }}>
          Water
        </button>
        <button onClick={() => toggleLayer("fiber")} style={{ padding: 8, borderRadius: 8, background: activeLayers.fiber ? "#60a5fa" : "#222", border: "none", color: "#fff" }}>
          Fiber
        </button>
        <button onClick={() => toggleLayer("gas")} style={{ padding: 8, borderRadius: 8, background: activeLayers.gas ? "#fb923c" : "#222", border: "none", color: "#fff" }}>
          Gas
        </button>
        <button onClick={() => toggleLayer("sewer")} style={{ padding: 8, borderRadius: 8, background: activeLayers.sewer ? "#94a3b8" : "#222", border: "none", color: "#fff" }}>
          Sewer
        </button>
      </div>

      <Canvas camera={{ position: [80, 50, 80], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[60, 120, 40]} intensity={1.2} />
        <Suspense fallback={null}>
          <EstateMasses />

          <MEPSystem estate={exampleEstate} activeLayers={activeLayers} onOpenJunction={(j: any) => setSelectedJunction(j)} />

          {/* Unit hotspots */}
          {exampleEstate.units.map((u: any) => (
            <Hotspot key={u.id} position={u.coords} title={u.id} onOpen={() => setSelectedJunction({ unit: u })} color="#ff7b2d" />
          ))}

          <OrbitControls enablePan enableZoom enableRotate />
        </Suspense>
      </Canvas>

      {/* Selected Junction/Unit panel */}
      {selectedJunction && (
        <div style={{
          position: "absolute", right: 18, bottom: 18, zIndex: 99,
          width: 340, background: "white", color: "#111", padding: 14, borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
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
