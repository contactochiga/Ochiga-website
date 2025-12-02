"use client";

import React, { Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stage, Html, useGLTF } from "@react-three/drei";
import { Vector3 } from "three";

type HotspotType = {
  id: string;
  title: string;
  position: [number, number, number];
  content: string;
};

// ----- 3D Models -----
const HouseModel = ({ showMEP }: { showMEP: boolean }) => {
  const house = useGLTF("/house.glb");
  const mep = useGLTF("/mep.glb");
  return <primitive object={showMEP ? mep.scene : house.scene} />;
};

// ----- Camera Zoom Hook -----
const CameraZoom = ({ targetPos }: { targetPos: Vector3 | null }) => {
  const { camera } = useThree();
  useFrame(() => {
    if (targetPos) {
      camera.position.lerp(targetPos, 0.1);
      camera.lookAt(targetPos);
    }
  });
  return null;
};

// ----- Hotspot Component -----
const Hotspot = ({
  position,
  title,
  onOpen,
}: {
  position: [number, number, number];
  title: string;
  onOpen: () => void;
}) => (
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

// ----- Main Component -----
export default function ThreeLanding() {
  const [showMEP, setShowMEP] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<HotspotType | null>(null);
  const [cameraTarget, setCameraTarget] = useState<Vector3 | null>(null);

  // ----- Hotspots -----
  const houseHotspots: HotspotType[] = [
    { id: "camera", title: "Smart Camera", position: [2, 3, 1], content: "1080p indoor camera with motion detection" },
    { id: "door", title: "Smart Door", position: [-1, 1, -2], content: "Keyless entry with logs & remote unlock" },
    { id: "sensor", title: "Temp Sensor", position: [0, 2, 0], content: "Temperature & humidity monitoring" },
    { id: "kitchen", title: "Smart Kitchen", position: [3, 1, -1], content: "Control panels for appliances & energy" },
  ];

  const mepHotspots: HotspotType[] = [
    { id: "junction", title: "Junction Box", position: [-2, 0.5, 1], content: "Electrical junction box with sensor data" },
    { id: "pipes", title: "Water Pipes", position: [1, 0.5, -1], content: "Plumbing network with flow sensors" },
    { id: "hvac", title: "HVAC Panel", position: [0, 1, 2], content: "Heating & cooling control panel" },
  ];

  const hotspots = showMEP ? mepHotspots : houseHotspots;

  // ----- Handlers -----
  const handleHotspotClick = (h: HotspotType) => {
    setActiveHotspot(h);
    setCameraTarget(new Vector3(h.position[0] + 1.5, h.position[1] + 1.5, h.position[2] + 2));
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
        style={{ position: "absolute", top: 20, left: 20, zIndex: 10, padding: "10px 16px", borderRadius: 8 }}
      >
        {showMEP ? "Show House" : "Show MEP"}
      </button>

      {/* Canvas */}
      <Canvas camera={{ position: [5, 5, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <OrbitControls enablePan={!activeHotspot} enableRotate={!activeHotspot} />
        <Suspense fallback={<Html center><div style={{ color: "#fff" }}>Loading 3D Model...</div></Html>}>
          <Stage adjustCamera={false} intensity={0.7}>
            <HouseModel showMEP={showMEP} />
            {!showMEP &&
              houseHotspots.map(h => (
                <Hotspot key={h.id} position={h.position} title={h.title} onOpen={() => handleHotspotClick(h)} />
              ))}
            {showMEP &&
              mepHotspots.map(h => (
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
