"use client";

import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import Hotspot from "./Hotspot";

function HouseModel() {
  const gltf = useGLTF("/house.glb");
  return <primitive object={gltf.scene} scale={1} />;
}

type HotspotInfo = {
  id: string;
  title: string;
  content: string;
  pos: [number, number, number];
};

export default function ThreeLanding() {
  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo | null>(null);

  const handleHotspotClick = (h: HotspotInfo) => {
    setActiveHotspot(h);
  };

  // --------------------------
  // HOUSE HOTSPOTS (SMART HOME)
  // --------------------------
  const houseHotspots: HotspotInfo[] = useMemo(
    () => [
      {
        id: "cam1",
        title: "Door Camera",
        pos: [-2.4, 1.6, -1.6],
        content: "HD Door Camera with smart access monitoring.",
      },
      {
        id: "lock1",
        title: "Smart Lock",
        pos: [-3.2, 0.9, -0.2],
        content: "Fingerprint + PIN + Phone Unlock",
      },
      {
        id: "temp1",
        title: "Thermostat",
        pos: [0.8, 1.9, 2.0],
        content: "Main Temperature Control Panel",
      },
      {
        id: "kitchen-panel",
        title: "Kitchen Automation",
        pos: [2.0, 1.1, 2.4],
        content: "Kitchen Control Panel",
      },
      {
        id: "living-sensor",
        title: "Motion Sensor",
        pos: [-2.6, 1.9, -0.2],
        content: "Living room Motion + Lighting automation",
      },
    ],
    []
  );

  // --------------------------
  // MEP HOTSPOTS (WIRING + PIPES)
  // --------------------------
  const mepHotspots: HotspotInfo[] = useMemo(
    () => [
      {
        id: "junction1",
        title: "Junction Box",
        pos: [-2.6, -0.3, 1.6],
        content: "Main electrical junction.",
      },
      {
        id: "pipe1",
        title: "Water Inlet",
        pos: [1.8, -0.3, -2.2],
        content: "Main water pipe inlet with pressure sensor.",
      },
    ],
    []
  );

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <Canvas camera={{ position: [10, 10, 10], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        <Suspense fallback={null}>
          <HouseModel />

          {/* Render HOUSE hotspots */}
          {houseHotspots.map((h) => (
            <Hotspot
              key={h.id}
              position={h.pos}
              title={h.title}
              onOpen={() => handleHotspotClick(h)}
            />
          ))}

          {/* Render MEP hotspots */}
          {mepHotspots.map((h) => (
            <Hotspot
              key={h.id}
              position={h.pos}
              title={h.title}
              onOpen={() => handleHotspotClick(h)}
              color="#00aaff"
            />
          ))}

          <OrbitControls enableZoom={true} enablePan={true} />
        </Suspense>
      </Canvas>

      {/* Popup Information Panel */}
      {activeHotspot && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            padding: "16px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            width: "260px",
            zIndex: 10,
          }}
        >
          <h3 style={{ margin: 0, fontWeight: "600" }}>{activeHotspot.title}</h3>
          <p style={{ marginTop: "8px" }}>{activeHotspot.content}</p>

          <button
            onClick={() => setActiveHotspot(null)}
            style={{
              marginTop: "10px",
              padding: "8px 14px",
              background: "#ff7b2d",
              color: "white",
              borderRadius: "8px",
              border: "none",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
