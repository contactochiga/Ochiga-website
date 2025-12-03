"use client";

import React, { Suspense, useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { Vector3 } from "three";
import Hotspot from "./Hotspot";

// ------------------------------
// 3D Models Placeholders
// ------------------------------
function ModernVilla() {
  const gltf = useGLTF("/house.glb");
  return <primitive object={gltf.scene} scale={1} />;
}

function SchoolBuilding() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[12, 6, 8]} />
      <meshStandardMaterial color="#e6eef6" />
    </mesh>
  );
}

function MallBuilding() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[20, 8, 12]} />
      <meshStandardMaterial color="#cbd5e1" />
    </mesh>
  );
}

function GymArea() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[10, 5, 6]} />
      <meshStandardMaterial color="#f3f4f6" />
    </mesh>
  );
}

// ------------------------------
// Types
// ------------------------------
type HotspotInfo = {
  id: string;
  title: string;
  content: string;
  pos: [number, number, number];
};

// ------------------------------
// Camera Controller
// ------------------------------
function CameraController({ target, lookAt }: { target: Vector3 | null; lookAt: Vector3 | null }) {
  const { camera } = useThree();

  useEffect(() => {
    if (target && lookAt) {
      camera.position.copy(target);
      camera.lookAt(lookAt);
    }
  }, [target, lookAt, camera]);

  return null;
}

// ------------------------------
// Main Component
// ------------------------------
export default function ThreeLanding() {
  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo | null>(null);
  const [selectedView, setSelectedView] = useState<string>("Smart Home");
  const [cameraTarget, setCameraTarget] = useState<Vector3 | null>(new Vector3(15, 10, 15));
  const [cameraLookAt, setCameraLookAt] = useState<Vector3 | null>(new Vector3(0, 0, 0));

  // --------------------------
  // Infrastructure Camera Positions
  // --------------------------
  const infrastructureViews: Record<string, [number, number, number]> = {
    "Smart Home": [15, 10, 15],
    "Smart School": [-15, 10, 10],
    "Smart Mall": [10, 15, -20],
    "Gym & Recreation": [-10, 5, -15],
  };

  useEffect(() => {
    if (selectedView) {
      const [x, y, z] = infrastructureViews[selectedView];
      setCameraTarget(new Vector3(x, y, z));
      setCameraLookAt(new Vector3(0, 0, 0));
    }
  }, [selectedView]);

  // --------------------------
  // Hotspots for Smart Home
  // --------------------------
  const houseHotspots: HotspotInfo[] = useMemo(
    () => [
      { id: "cam1", title: "Door Camera", pos: [-2.4, 1.6, -1.6], content: "HD Door Camera with smart access monitoring." },
      { id: "lock1", title: "Smart Lock", pos: [-3.2, 0.9, -0.2], content: "Fingerprint + PIN + Phone Unlock" },
      { id: "temp1", title: "Thermostat", pos: [0.8, 1.9, 2.0], content: "Main Temperature Control Panel" },
      { id: "kitchen-panel", title: "Kitchen Automation", pos: [2.0, 1.1, 2.4], content: "Kitchen Control Panel" },
      { id: "living-sensor", title: "Motion Sensor", pos: [-2.6, 1.9, -0.2], content: "Living room Motion + Lighting automation" },
    ],
    []
  );

  const handleHotspotClick = (h: HotspotInfo) => {
    setActiveHotspot(h);
  };

  // --------------------------
  // Infrastructure Renderer
  // --------------------------
  const renderInfrastructure = () => {
    switch (selectedView) {
      case "Smart Home":
        return <ModernVilla />;
      case "Smart School":
        return <SchoolBuilding />;
      case "Smart Mall":
        return <MallBuilding />;
      case "Gym & Recreation":
        return <GymArea />;
      default:
        return null;
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Caption + Infrastructure Buttons */}
      <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 20, width: "90%", maxWidth: 1200 }}>
        <h2 style={{ color: "#111827", fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 12 }}>
          Welcome to a Smart Residential Estate Demo
        </h2>

        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          {["Smart Home", "Smart School", "Smart Mall", "Gym & Recreation"].map((label) => (
            <button
              key={label}
              onClick={() => setSelectedView(label)}
              style={{
                padding: "10px 20px",
                borderRadius: 999,
                border: "2px solid #111827",
                background: selectedView === label ? "#111827" : "transparent",
                color: selectedView === label ? "white" : "#111827",
                fontWeight: 600,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {label}
              {selectedView === label && (
                <span style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: 2,
                  background: "#ff7b2d",
                  transition: "width 0.3s",
                }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [15, 10, 15], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        <Suspense fallback={null}>
          {renderInfrastructure()}

          {/* Render hotspots only for Smart Home */}
          {selectedView === "Smart Home" &&
            houseHotspots.map((h) => (
              <Hotspot key={h.id} position={h.pos} title={h.title} onOpen={() => handleHotspotClick(h)} />
            ))
          }

          <OrbitControls enableZoom={true} enablePan={true} />
          <CameraController target={cameraTarget} lookAt={cameraLookAt} />
        </Suspense>
      </Canvas>

      {/* Popup Information Panel */}
      {activeHotspot && (
        <div style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          padding: "16px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          width: "260px",
          zIndex: 10,
        }}>
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
