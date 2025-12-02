"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Stage, Environment } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

type SceneKey = "front";

type HotspotProps = {
  position: [number, number, number];
  title: string;
  onOpen: () => void;
  color?: string;
};

// Hotspot component
function Hotspot({ position, title, onOpen, color = "#ff7b2d" }: HotspotProps) {
  return (
    <Html position={position} center transform occluder>
      <div style={{ transform: "translate(-50%,-50%)" }}>
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

// Minimal house model (2 floors)
function House({ lift }: { lift: number }) {
  return (
    <group position-y={lift}>
      {/* Floor 1 */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[10, 0.2, 10]} />
        <meshStandardMaterial color="#d9d9d9" />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[10, 2, 10]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Floor 2 */}
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[10, 2, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </group>
  );
}

// MEP Layer
function MEP() {
  return (
    <group>
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[10, 0.1, 10]} />
        <meshStandardMaterial color="#0ea5a4" />
      </mesh>
      {/* Simple junction boxes / pipes */}
      <mesh position={[-3, -0.2, 2]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[2, -0.2, -2]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
    </group>
  );
}

// Main Component
export default function ThreeLanding() {
  const [lift, setLift] = useState(0);
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const hotspots = [
    { id: "smart-lock", title: "Smart Lock", pos: [1, 1, 4], content: "Keyless entry + logs." },
    { id: "camera", title: "Camera", pos: [-2, 1.5, -3], content: "Indoor camera with privacy." },
    { id: "sensor", title: "Temp Sensor", pos: [3, 3, 0], content: "Room temperature sensor." },
  ];

  // Animate lift using react-spring
  const { y } = useSpring({ y: lift, config: { mass: 1, tension: 170, friction: 26 } });

  return (
    <div style={{ width: "100%", height: "90vh", position: "relative" }}>
      {/* Toggle MEP */}
      <button
        onClick={() => setLift(lift === 0 ? 2 : 0)}
        style={{ position: "absolute", top: 20, left: 20, zIndex: 50, padding: "10px 20px" }}
      >
        {lift === 0 ? "Reveal MEP" : "Hide MEP"}
      </button>

      {/* Info Panel */}
      {activePanel && (
        <div style={{ position: "absolute", right: 20, top: 20, zIndex: 50, width: 250, background: "white", padding: 12, borderRadius: 12 }}>
          <h4>{hotspots.find((h) => h.id === activePanel)?.title}</h4>
          <p>{hotspots.find((h) => h.id === activePanel)?.content}</p>
          <button onClick={() => setActivePanel(null)}>Close</button>
        </div>
      )}

      <Canvas camera={{ position: [15, 10, 15], fov: 50 }}>
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 15, 10]} intensity={1.2} />
          <Stage adjustCamera={false} intensity={0.6}>
            {/* Animated House */}
            <animated.group position-y={y}>
              <House lift={lift} />
            </animated.group>

            {/* MEP (underground) */}
            {lift > 0 && <MEP />}
          </Stage>
          <OrbitControls makeDefault enablePan enableRotate enableZoom minDistance={5} maxDistance={50} />
        </Suspense>

        {/* Hotspots */}
        {hotspots.map((h) => (
          <Hotspot
            key={h.id}
            position={h.pos as [number, number, number]}
            title={h.title}
            onOpen={() => setActivePanel(h.id)}
          />
        ))}
      </Canvas>
    </div>
  );
}
