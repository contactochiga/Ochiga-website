// app/components/ThreeLanding.tsx
"use client";
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Hotspot from "./Hotspot";
import MEPSystem from "./MEPSystem";
import useTelemetrySimulator from "./TelemetrySimulator";

/* -------------------------
   Simple Box helper
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
   Convert LatLng to simple X,Z
   (y will be 0)
------------------------- */
function latLngToXZ(lat: number, lng: number, originLat: number, originLng: number): [number, number] {
  const scale = 111_000; // rough meters per degree
  const x = (lng - originLng) * scale;
  const z = (lat - originLat) * scale;
  return [x, z];
}

/* -------------------------
   Example estate using your coordinates
------------------------- */
const estatePolygonLatLng: [number, number][] = [
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

const origin = estatePolygonLatLng[0]; // first point as origin
const estatePolygonXZ = estatePolygonLatLng.map(([lat, lng]) => {
  const [x, z] = latLngToXZ(lat, lng, origin[0], origin[1]);
  return [x, 0, z] as [number, number, number]; // y=0
});

/* -------------------------
   Simple Modern Villa
------------------------- */
function ModernVilla() {
  return (
    <group>
      {/* ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[150, 150]} />
        <meshStandardMaterial color="#e6eef6" />
      </mesh>

      {/* buildings as boxes (placeholder) */}
      <Box pos={[0, 1.1, 0]} size={[12, 2.2, 9]} color="#ffffff" />
      <Box pos={[20, 1.1, 10]} size={[10, 2, 10]} color="#f3f4f6" />
      <Box pos={[-15, 1.1, -10]} size={[14, 2, 8]} color="#d1d5db" />
    </group>
  );
}

/* -------------------------
   Example estate data
------------------------- */
const exampleEstate = {
  name: "Ochiga Demo Estate",
  buildings: [
    { id: "b-left-1", kind: "multi-story", coords: [-18, 1.5, 0] },
    { id: "b-right-1", kind: "multi-story", coords: [18, 1.5, 0] },
    { id: "b-duplex-row", kind: "duplex", coords: [36, 1.5, 10] },
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

      <Canvas camera={{ position: [50, 30, 50], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[40, 60, 20]} intensity={1.2} />
        <Suspense fallback={null}>
          {/* Estate ground + buildings */}
          <ModernVilla />

          {/* MEP pipes + junctions */}
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
