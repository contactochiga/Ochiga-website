"use client";

import React, { Suspense, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Html, useGLTF } from "@react-three/drei";
import { Vector3 } from "three";
import { animated, useSpring } from "@react-spring/three";

// --------------------
// Hotspot component
// --------------------
type HotspotProps = {
  position: [number, number, number];
  title: string;
  onOpen: () => void;
  color?: string;
};

function Hotspot({ position, title, onOpen, color = "#ff7b2d" }: HotspotProps) {
  return (
    <Html position={position} center transform occlude>
      <div
        style={{
          transform: "translate(-50%,-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={onOpen}
          style={{
            background: color,
            border: "none",
            padding: "10px 14px",
            borderRadius: 999,
            boxShadow: "0 8px 20px rgba(2,6,23,0.6)",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {title}
        </button>
      </div>
    </Html>
  );
}

// --------------------
// GLB Loader Hook
// --------------------
function House({ url }: { url: string }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} scale={1} />;
}

// --------------------
// MEP Layer Component
// --------------------
function MEPLayer({ url, visible }: { url: string; visible: boolean }) {
  const gltf = useGLTF(url);
  const { scale } = useSpring({ scale: visible ? 1 : 0, config: { mass: 1, tension: 170 } });

  return <animated.primitive object={gltf.scene} scale={scale as any} />;
}

// --------------------
// Main Landing Component
// --------------------
export default function ThreeLanding() {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [showMEP, setShowMEP] = useState(false);

  // Hotspots with 3D positions (placeholders)
  const hotspots = useMemo(
    () => [
      { id: "smart-lock", title: "Smart Lock", pos: [1.2, 1.5, 2], content: "Keyless entry" },
      { id: "door-cam", title: "Door Camera", pos: [-1.5, 2, -1.2], content: "1080p camera" },
      { id: "smart-bulb", title: "Smart Bulb", pos: [0, 2.5, 0.5], content: "WiFi light control" },
      { id: "motion-sensor", title: "Motion Sensor", pos: [2, 2, -0.5], content: "Detects movement" },
      { id: "temperature-sensor", title: "Temp Sensor", pos: [-0.5, 2, 1.2], content: "Monitors temp" },
    ],
    []
  );

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* TOGGLE MEP BUTTON */}
      <button
        onClick={() => setShowMEP(!showMEP)}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 60,
          padding: "10px 16px",
          borderRadius: 8,
          background: "#ff7b2d",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {showMEP ? "Hide MEP Layer" : "Show MEP Layer"}
      </button>

      {/* 3D CANVAS */}
      <Canvas camera={{ position: [5, 5, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <OrbitControls makeDefault enablePan enableRotate enableZoom minDistance={5} maxDistance={30} />

          {/* House Model */}
          <House url="/placeholder_house.glb" />

          {/* MEP Layer */}
          <MEPLayer url="/placeholder_mep.glb" visible={showMEP} />

          {/* Hotspots */}
          {hotspots.map((h) => (
            <Hotspot key={h.id} position={h.pos as [number, number, number]} title={h.title} onOpen={() => setActivePanel(h.id)} />
          ))}
        </Suspense>
      </Canvas>

      {/* Info Panel */}
      {activePanel && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 50,
            zIndex: 70,
            width: "min(600px, 90%)",
            background: "white",
            borderRadius: 12,
            padding: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ margin: 0 }}>{hotspots.find((s) => s.id === activePanel)?.title}</h3>
              <p style={{ marginTop: 4 }}>{hotspots.find((s) => s.id === activePanel)?.content}</p>
            </div>
            <button onClick={() => setActivePanel(null)} style={{ padding: 6 }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
