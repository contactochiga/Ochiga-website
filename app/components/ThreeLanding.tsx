// app/components/ThreeLanding.tsx
"use client";
import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Hotspot from "./Hotspot";
import MEPSystem from "./MEPSystem";
import useTelemetrySimulator from "./TelemetrySimulator";

/* Simple box helper */
function Box({ pos, size, color = "#fff", opacity = 1 }: { pos: [number, number, number]; size: [number, number, number]; color?: string; opacity?: number }) {
  return (
    <mesh position={pos as any} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

/* Convert lat/lng -> rough meters relative coordinate so we can keep the map anchored (optional) */
function latLngToXZ(lat: number, lng: number, originLat: number, originLng: number): [number, number] {
  const metersPerDeg = 111000;
  const x = (lng - originLng) * metersPerDeg;
  const z = (lat - originLat) * metersPerDeg;
  return [x, z];
}

/* Use your coordinates as a scaled estate footprint (we keep simple units) */
const estateLatLng = [
  [6.4516412, 3.5418909],
  [6.4506977, 3.5419019],
  [6.4507024, 3.5414641],
  [6.4501151, 3.5415003],
  [6.4500751, 3.5425571],
  [6.4512871, 3.5425742],
  [6.4513031, 3.5423874],
  [6.4516179, 3.5423827],
  [6.4516412, 3.5418909],
];

const originLat = estateLatLng[0][0];
const originLng = estateLatLng[0][1];
const estateXZ = estateLatLng.map(([lat, lng]) => {
  const [x, z] = latLngToXZ(lat, lng, originLat, originLng);
  // scale down so it fits nicely in the 3D scene
  const scale = 0.06; // tune if needed
  return [x * scale, 0, z * scale] as [number, number, number];
});

/* Full estate data (facilities + junctions + units) */
const fullEstate = {
  name: "Ochiga Estate - Digital Twin",
  // Example: 15 DT units (5-bed duplex row), PT multi-story blocks, etc.
  // coords chosen roughly around the estateXZ origin; tweak for fine placement later.
  buildings: [
    { id: "street-left-row", kind: "dt-row", coords: [-22, 0.9, -6] },
    { id: "street-right-block", kind: "pt-block", coords: [22, 0.9, -6] },
    { id: "duplex-row-right", kind: "duplex", coords: [36, 0.9, 10] },
  ],
  // units (a few samples; expand programmatically later)
  units: [
    { id: "DT1", type: "5bed-duplex", coords: [32, 1.2, 12] },
    { id: "DT2", type: "5bed-duplex", coords: [36, 1.2, 12] },
    { id: "DT3", type: "DT-...sample", coords: [40, 1.2, 12] },
    { id: "PT1-101", type: "3bed-apt", coords: [20, 1.2, -4] },
    { id: "PT1-102", type: "2bed-apt", coords: [24, 1.2, -4] },
    { id: "PT2-201", type: "3bed-apt", coords: [-18, 1.2, -4] },
    // ... expand to full estate programmatically later
  ],
  junctions: [
    // street junctions around estate (these will be endpoints for pipes)
    { id: "jn-main-entrance", type: "electrical", coords: [0, -0.3, 28], label: "Entrance Junction" },
    { id: "jn-st-1", type: "street", coords: [0, -0.3, 0], label: "Main Junction" },
    { id: "jn-st-2", type: "street", coords: [16, -0.3, 8], label: "Junction 2" },
    { id: "jn-st-3", type: "street", coords: [-16, -0.3, 8], label: "Junction 3" },
    // sample junctions near PT/DT clusters
    { id: "jn-pt1", type: "electrical", coords: [20, -0.3, -6], label: "PT1 Junction" },
    { id: "jn-dt-row", type: "electrical", coords: [36, -0.3, 10], label: "DT Row Junction" },
  ],
  facility: {
    powerHouse: { id: "powerhouse", type: "electrical", coords: [0, -0.5, 36] },
    waterHouse: { id: "waterhouse", type: "water", coords: [-26, -0.5, 12] },
    fiberHouse: { id: "fiberhouse", type: "fiber", coords: [-26, -0.4, -6] },
    gasPlant: { id: "gasplant", type: "gas", coords: [28, -0.4, 36] },
    fireHouse: { id: "firehouse", type: "fire", coords: [-10, -0.4, -18] },
    sewagePlant: { id: "sewerhouse", type: "sewer", coords: [8, -0.4, -28] },
  },
};

/* Main scene */
export default function ThreeLanding() {
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    electrical: true,
    water: true,
    fiber: false,
    gas: false,
    sewer: false,
    fire: false,
    hvac: false,
  });

  const [selectedJunction, setSelectedJunction] = useState<any | null>(null);
  const telemetry = useTelemetrySimulator(fullEstate);

  const toggleLayer = (k: string) => setActiveLayers((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div style={{ width: "100%", height: "92vh", position: "relative", background: "#020408" }}>
      {/* Top caption */}
      <div style={{ position: "absolute", left: 20, top: 18, zIndex: 60, color: "white", maxWidth: 520 }}>
        <h3 style={{ margin: 0 }}>Take our smart infrastructure tour</h3>
        <div style={{ opacity: 0.85, marginTop: 6, fontSize: 13 }}>
          Tap on the products below to see how Ochiga connects security, energy, automation and more — all in one place.
        </div>
        <div style={{ marginTop: 8, display: "flex", gap: 12, color: "#cbd5e1", fontSize: 13 }}>
          <span>Smart Home</span>
          <span>Smart Estate</span>
          <span>Safety & Access</span>
        </div>
      </div>

      {/* Left controls */}
      <div style={{ position: "absolute", left: 18, bottom: 18, zIndex: 70, display: "flex", gap: 8 }}>
        <button onClick={() => toggleLayer("electrical")} style={{ padding: 8, borderRadius: 8, background: activeLayers.electrical ? "#16a34a" : "#222", color: "#fff", border: "none" }}>
          Power
        </button>
        <button onClick={() => toggleLayer("water")} style={{ padding: 8, borderRadius: 8, background: activeLayers.water ? "#06b6d4" : "#222", color: "#fff", border: "none" }}>
          Water
        </button>
        <button onClick={() => toggleLayer("fiber")} style={{ padding: 8, borderRadius: 8, background: activeLayers.fiber ? "#2563eb" : "#222", color: "#fff", border: "none" }}>
          Fiber
        </button>
        <button onClick={() => toggleLayer("gas")} style={{ padding: 8, borderRadius: 8, background: activeLayers.gas ? "#ef4444" : "#222", color: "#fff", border: "none" }}>
          Gas
        </button>
        <button onClick={() => toggleLayer("sewer")} style={{ padding: 8, borderRadius: 8, background: activeLayers.sewer ? "#6b7280" : "#222", color: "#fff", border: "none" }}>
          Sewer
        </button>
        <button onClick={() => toggleLayer("fire")} style={{ padding: 8, borderRadius: 8, background: activeLayers.fire ? "#ef4444" : "#222", color: "#fff", border: "none" }}>
          Fire
        </button>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [50, 28, 50], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[40, 60, 20]} intensity={1.2} />
        <Suspense fallback={null}>
          {/* estate ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial color="#071025" />
          </mesh>

          {/* draw estate footprint (thin line boxes) */}
          {estateXZ.map((p, i) => (
            <mesh key={`foot-${i}`} position={p}>
              <sphereGeometry args={[0.2, 6, 6]} />
              <meshStandardMaterial color="#94a3b8" />
            </mesh>
          ))}

          {/* buildings (boxes) */}
          {fullEstate.buildings.map((b: any) => (
            <Box key={b.id} pos={b.coords} size={[12, 3.5, 8]} color="#f3f4f6" />
          ))}

          {/* units hotspots */}
          {fullEstate.units.map((u: any) => (
            <group key={u.id}>
              <Box pos={u.coords} size={[4, 2.4, 3]} color="#f59e0b" />
              <Hotspot position={u.coords} title={u.id} onOpen={() => setSelectedJunction({ unit: u })} color="#ff7b2d" />
            </group>
          ))}

          {/* facilities + MEP pipes */}
          <MEPSystem estate={fullEstate} activeLayers={activeLayers} onOpenJunction={(j: any) => setSelectedJunction(j)} />

          <OrbitControls enablePan enableZoom enableRotate />
        </Suspense>
      </Canvas>

      {/* Right-bottom selected panel */}
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
                <div>Temp: {telemetry[`temp-${selectedJunction.unit.id}`]?.value ?? "–"} °C</div>
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
