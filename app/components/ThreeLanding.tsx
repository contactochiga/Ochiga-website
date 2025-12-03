// app/components/ThreeLanding.tsx
"use client";
import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Hotspot from "./Hotspot";
import MEPSystem from "./MEPSystem";
import useTelemetrySimulator from "./TelemetrySimulator";

/* -------------------------
   Simple Box Helper
   ------------------------- */
function Box({ pos, size, color = "#fff", opacity = 1 }: { pos: [number, number, number]; size: [number, number, number]; color?: string; opacity?: number; }) {
  return (
    <mesh position={pos as any} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

/* -------------------------
   Estate Polygon Ground
   ------------------------- */
const estatePolygon = [
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

// Simple function to convert lat/lng to 3D coordinates (rough scale)
const latLngToXYZ = (lat: number, lng: number): [number, number, number] => {
  const scale = 100000; // rough scaling for visualization
  return [(lng - 3.54189) * scale, 0, (6.45164 - lat) * scale];
};

/* -------------------------
   Full Estate Model
   ------------------------- */
const fullEstate = {
  name: "Ochiga Digital Twin Estate",
  buildings: [
    { id: "villa-1", type: "5bed-duplex", coords: [40, 0, -30] },
    { id: "villa-2", type: "5bed-duplex", coords: [60, 0, -30] },
    { id: "multi-left-1", type: "2bed", coords: [-30, 0, 10] },
    { id: "multi-left-2", type: "3bed", coords: [-10, 0, 10] },
  ],
  units: [
    { id: "u-villa-1", type: "5bed", coords: [40, 1.5, -30] },
    { id: "u-villa-2", type: "5bed", coords: [60, 1.5, -30] },
    { id: "u-left-1", type: "2bed", coords: [-30, 1.5, 10] },
    { id: "u-left-2", type: "3bed", coords: [-10, 1.5, 10] },
  ],
  junctions: [
    { id: "jn-power", type: "electrical", coords: [0, -0.6, -50], label: "Power House" },
    { id: "jn-water", type: "water", coords: [-50, -0.6, 0], label: "Water Plant" },
    { id: "jn-fiber", type: "fiber", coords: [50, -0.6, 0], label: "Fiber Headend" },
    { id: "jn-gas", type: "gas", coords: [0, -0.6, 50], label: "Gas Plant" },
    { id: "jn-street-1", type: "street", coords: [0, -0.4, 0], label: "Main Junction" },
    { id: "jn-street-2", type: "street", coords: [30, -0.4, 20], label: "Junction 2" },
    { id: "jn-street-3", type: "street", coords: [-30, -0.4, 20], label: "Junction 3" },
  ],
  facility: {
    powerHouse: { id: "jn-power", type: "electrical", coords: [0, -0.6, -50] },
    waterPlant: { id: "jn-water", type: "water", coords: [-50, -0.6, 0] },
    serverRoom: { id: "jn-fiber", type: "fiber", coords: [50, -0.6, 0] },
    gasPlant: { id: "jn-gas", type: "gas", coords: [0, -0.6, 50] },
    sewagePlant: undefined,
  },
};

export default function ThreeLanding() {
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    electrical: true,
    water: true,
    fiber: true,
    gas: false,
    sewer: false,
    hvac: false,
  });
  const [selectedJunction, setSelectedJunction] = useState<any | null>(null);
  const telemetry = useTelemetrySimulator(fullEstate);

  const toggleLayer = (k: string) => setActiveLayers((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div style={{ width: "100%", height: "90vh", position: "relative", background: "#020408" }}>
      {/* Estate Caption */}
      <div style={{ position: "absolute", left: 20, top: 18, zIndex: 60, color: "white" }}>
        <h3 style={{ margin: 0 }}>Ochiga Smart Estate Digital Twin</h3>
        <div style={{ opacity: 0.8, marginTop: 6, fontSize: 13, maxWidth: 420 }}>
          Explore buildings, facilities, and smart infrastructure live.
        </div>
      </div>

      {/* Layer Controls */}
      <div style={{ position: "absolute", left: 18, bottom: 18, zIndex: 70, display: "flex", gap: 8 }}>
        {["electrical","water","fiber","gas"].map((k) => (
          <button key={k} onClick={() => toggleLayer(k)}
            style={{
              padding: 8,
              borderRadius: 8,
              background: activeLayers[k] ? "#facc15" : "#222",
              border: "none",
              color: "white"
            }}>
            {k.charAt(0).toUpperCase() + k.slice(1)}
          </button>
        ))}
      </div>

      <Canvas camera={{ position: [150, 120, 150], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[100, 200, 100]} intensity={1.2} />
        <Suspense fallback={null}>
          {/* Ground plane */}
          <mesh rotation={[-Math.PI/2,0,0]} position={[0,0,0]}>
            <shapeBufferGeometry args={[estatePolygon.map(([lat,lng]) => latLngToXYZ(lat,lng).slice(0,2)) as any]} />
            <meshStandardMaterial color="#e6eef6" side={2} />
          </mesh>

          {/* Buildings */}
          {fullEstate.buildings.map((b) => (
            <Box key={b.id} pos={b.coords} size={[10, 6, 10]} color="#ffffff" />
          ))}

          {/* MEP pipes & junctions */}
          <MEPSystem estate={fullEstate} activeLayers={activeLayers} onOpenJunction={(j:any) => setSelectedJunction(j)} />

          {/* Unit Hotspots */}
          {fullEstate.units.map((u:any) => (
            <Hotspot key={u.id} position={u.coords} title={u.id} onOpen={() => setSelectedJunction({unit:u})} color="#ff7b2d" />
          ))}

          <OrbitControls enablePan enableZoom enableRotate />
        </Suspense>
      </Canvas>

      {/* Panel */}
      {selectedJunction && (
        <div style={{
          position: "absolute", right: 18, bottom: 18, zIndex: 99,
          width: 320, background: "white", color: "#111", padding: 14, borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
        }}>
          {selectedJunction.unit ? (
            <>
              <h4>{selectedJunction.unit.id}</h4>
              <div>Type: {selectedJunction.unit.type}</div>
              <div>Electric: {telemetry[`elec-${selectedJunction.unit.id}`]?.value ?? "–"} kW</div>
              <div>Water: {telemetry[`water-${selectedJunction.unit.id}`]?.value ?? "–"} L/s</div>
            </>
          ) : (
            <>
              <h4>{selectedJunction.label ?? selectedJunction.id}</h4>
              <div>Service: {selectedJunction.type}</div>
              <div>Flow / Load: {telemetry[`jn-${selectedJunction.id}-flow`]?.value ?? "–"} {telemetry[`jn-${selectedJunction.id}-flow`]?.unit ?? ""}</div>
            </>
          )}
          <button onClick={() => setSelectedJunction(null)} style={{ marginTop: 12, padding: 8, borderRadius: 8 }}>Close</button>
        </div>
      )}
    </div>
  );
}
