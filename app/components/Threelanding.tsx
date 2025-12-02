"use client";

import React, { Suspense, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, Html, useGLTF } from "@react-three/drei";
import { Vector3 } from "three";

type HotspotType = {
  id: string;
  title: string;
  position: [number, number, number];
  content: string;
};

const HouseModel = ({ showMEP }: { showMEP: boolean }) => {
  const house = useGLTF("/house.glb");
  const mep = useGLTF("/mep.glb");
  return <primitive object={showMEP ? mep.scene : house.scene} />;
};

// Camera Zoom Hook
const CameraZoom = ({ targetPos }: { targetPos: Vector3 | null }) => {
  const { camera } = useThree();
  useFrame(() => {
    if (targetPos) {
      camera.position.lerp(targetPos, 0.1);
      camera.lookAt(0, 0, 0);
    }
  });
  return null;
};

const Hotspot = ({ position, title, onOpen }: { position: [number, number, number]; title: string; onOpen: () => void }) => (
  <Html position={position} center transform occlude>
    <button
      onClick={onOpen}
      style={{
        background: "#ff7b2d",
        border: "none",
        padding: "8px 12px",
        borderRadius: 999,
        color: "#fff",
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
      }}
    >
      {title}
    </button>
  </Html>
);

export default function ThreeLanding() {
  const [showMEP, setShowMEP] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<HotspotType | null>(null);
  const [cameraTarget, setCameraTarget] = useState<Vector3 | null>(null);

  const hotspots: HotspotType[] = [
    { id: "camera", title: "Smart Camera", position: [2, 3, 1], content: "1080p indoor camera with motion detection" },
    { id: "door", title: "Smart Door", position: [-1, 1, -2], content: "Keyless entry with logs & remote unlock" },
    { id: "sensor", title: "Temp Sensor", position: [0, 2, 0], content: "Temperature & humidity monitoring" },
    { id: "kitchen", title: "Smart Kitchen", position: [3, 1, -1], content: "Control panels for appliances & energy" },
  ];

  const handleHotspotClick = (h: HotspotType) => {
    setActiveHotspot(h);
    // Zoom camera toward hotspot
    setCameraTarget(new Vector3(h.position[0] + 1, h.position[1] + 1, h.position[2] + 2));
  };

  const handleClose = () => {
    setActiveHotspot(null);
    setCameraTarget(null);
  };

  return (
    <div style={{ width: "100%", height: "90vh", position: "relative" }}>
      {/* Toggle Button */}
      <button
        onClick={() => setShowMEP(!showMEP)}
        style={{ position: "absolute", top: 20, left: 20, zIndex: 10, padding: 10 }}
      >
        {showMEP ? "Show House" : "Show MEP"}
      </button>

      {/* Canvas */}
      <Canvas camera={{ position: [5, 5, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <OrbitControls enablePan={!activeHotspot} enableRotate={!activeHotspot} />
        <Suspense fallback={null}>
          <Stage adjustCamera={false} intensity={0.7}>
            <HouseModel showMEP={showMEP} />
            {/* Hotspots */}
            {!showMEP && hotspots.map(h => (
              <Hotspot key={h.id} position={h.position} title={h.title} onOpen={() => handleHotspotClick(h)} />
            ))}
          </Stage>
          <CameraZoom targetPos={cameraTarget} />
        </Suspense>
      </Canvas>

      {/* Hotspot Dashboard */}
      {activeHotspot && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            maxWidth: "300px",
          }}
        >
          <h3 style={{ margin: 0 }}>{activeHotspot.title}</h3>
          <p>{activeHotspot.content}</p>
          <button onClick={handleClose} style={{ marginTop: 10, padding: 6 }}>Close</button>
        </div>
      )}
    </div>
  );
}
