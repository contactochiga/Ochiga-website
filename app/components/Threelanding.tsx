// app/components/ThreeLanding.tsx
"use client";

import React, { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Stage } from "@react-three/drei";
import { Vector3 } from "three";
import { animated, useSpring } from "@react-spring/three";

/* ------------------------------
   Simple Room Box
------------------------------ */
function RoomBox({
  pos,
  size,
  color = "#fff",
  opacity = 1,
}: {
  pos: [number, number, number];
  size: [number, number, number];
  color?: string;
  opacity?: number;
}) {
  return (
    <mesh position={pos} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        opacity={opacity}
        transparent
      />
    </mesh>
  );
}

/* ------------------------------
   Hotspot Button
------------------------------ */
function Hotspot({
  position,
  title,
  onOpen,
  color = "#ff7b2d",
}: {
  position: [number, number, number];
  title: string;
  onOpen: () => void;
  color?: string;
}) {
  return (
    <Html position={position} center transform occlude>
      <button
        onClick={onOpen}
        style={{
          background: color,
          padding: "8px 12px",
          borderRadius: 999,
          color: "white",
          border: "none",
          cursor: "pointer",
          fontWeight: 700,
          boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
        }}
      >
        {title}
      </button>
    </Html>
  );
}

/* ------------------------------
   MEP PIPES (FIXED ROTATIONS)
------------------------------ */
function MEP({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <group>
      {/* main pipe */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 12, 12]} />
        <meshStandardMaterial color="#0ea5a4" />
      </mesh>

      {/* electrical trunk */}
      <mesh
        position={[3.2, -0.4, -1.6]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.05, 0.05, 4.8, 12]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>

      {/* junctions */}
      <mesh position={[-2.6, -0.4, 1.6]}>
        <boxGeometry args={[0.4, 0.25, 0.4]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>

      <mesh position={[1.8, -0.4, -2.2]}>
        <boxGeometry args={[0.4, 0.25, 0.4]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>

      {/* sensor loop */}
      <mesh
        position={[0, -0.55, -4]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.03, 0.03, 8, 8]} />
        <meshStandardMaterial color="#60a5fa" />
      </mesh>
    </group>
  );
}

/* ------------------------------
   FULL HOUSE MODEL
------------------------------ */
function CodeHouse({ opacity = 1 }: { opacity?: number }) {
  return (
    <group>
      {/* Ground */}
      <mesh position={[0, -0.75, 0]} receiveShadow>
        <boxGeometry args={[30, 1.5, 22]} />
        <meshStandardMaterial color="#e6eef6" />
      </mesh>

      {/* Floors */}
      <RoomBox pos={[0, 0.9, 0]} size={[12, 1.8, 9]} color="#ffffff" opacity={opacity} />
      <RoomBox pos={[0, 2.8, 0]} size={[12, 1.8, 9]} color="#f3f4f6" opacity={opacity} />

      {/* Roof */}
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[12.6, 0.2, 9.6]} />
        <meshStandardMaterial color="#cbd5e1" transparent opacity={opacity} />
      </mesh>

      {/* Parking */}
      <RoomBox pos={[-10.2, 0.1, 2.6]} size={[6, 0.2, 10]} color="#d1d5db" opacity={opacity} />
      <mesh position={[-12, 0.21, -1.4]}>
        <boxGeometry args={[0.2, 0.02, 8]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>

      {/* Pool */}
      <RoomBox pos={[8.5, 0.1, -3.2]} size={[8, 0.2, 6]} color="#60a5fa" opacity={opacity} />
      <RoomBox pos={[8.5, 0.9, 2.4]} size={[5, 1.6, 3]} color="#f8fafc" opacity={opacity} />

      {/* Internal rooms */}
      <RoomBox pos={[-2.4, 0.9, -1.6]} size={[4.4, 1.6, 4]} color="#fff7ed" opacity={opacity} />
      <RoomBox pos={[3.6, 0.9, -2.2]} size={[3.6, 1.6, 3.2]} color="#fef3c7" opacity={opacity} />
      <RoomBox pos={[0.8, 0.9, 2.2]} size={[4.8, 1.6, 4.2]} color="#eef2ff" opacity={opacity} />
      <RoomBox pos={[4.6, 0.9, 1.6]} size={[1.4, 1.2, 1.6]} color="#f3f4f6" opacity={opacity} />
      <RoomBox pos={[3.6, 0.45, -0.2]} size={[0.8, 0.9, 1.2]} color="#fff" opacity={opacity} />

      {/* Bedrooms & ensuites */}
      <RoomBox pos={[-4.2, 2.8, -2.2]} size={[2.8, 1.6, 3]} color="#fef2f2" opacity={opacity} />
      <RoomBox pos={[-1.2, 2.8, -2.2]} size={[2.8, 1.6, 3]} color="#fff1f2" opacity={opacity} />
      <RoomBox pos={[1.8, 2.8, -2.2]} size={[2.8, 1.6, 3]} color="#fef6ee" opacity={opacity} />
      <RoomBox pos={[-1.2, 2.8, 1.6]} size={[2.8, 1.6, 3]} color="#f0fdf4" opacity={opacity} />
      <RoomBox pos={[3.2, 2.8, 1.6]} size={[3.2, 1.6, 3.6]} color="#eef2ff" opacity={opacity} />

      <RoomBox pos={[-5.4, 2.8, -2.2]} size={[1, 1, 2.6]} color="#e6e6e6" opacity={opacity} />
      <RoomBox pos={[2.8, 2.8, -2.2]} size={[0.8, 1, 2.6]} color="#e6e6e6" opacity={opacity} />
      <RoomBox pos={[4.6, 2.8, -2.2]} size={[0.8, 1, 2.6]} color="#e6e6e6" opacity={opacity} />
      <RoomBox pos={[-1.2, 2.8, 3]} size={[1, 1, 2.8]} color="#e6e6e6" opacity={opacity} />
      <RoomBox pos={[4.6, 2.8, 3]} size={[1, 1, 2.8]} color="#e6e6e6" opacity={opacity} />
    </group>
  );
}

/* ------------------------------
   Wrapper for opacity animation
------------------------------ */
function CodeHouseWrapper({ opacity }: { opacity: number }) {
  return <CodeHouse opacity={opacity} />;
}

/* ------------------------------
   Camera Controller
------------------------------ */
function CameraController({
  target,
  lookAt,
}: {
  target: Vector3 | null;
  lookAt: Vector3 | null;
}) {
  const { camera } = useThree();

  useFrame(() => {
    if (target) {
      camera.position.lerp(target, 0.12);
      if (lookAt) camera.lookAt(lookAt);
    }
  });

  return null;
}

/* ------------------------------
   MAIN COMPONENT
------------------------------ */
export default function ThreeLanding() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [hotspotData, setHotspotData] = useState<any>(null);
  const [cameraTarget, setCameraTarget] = useState<Vector3 | null>(null);
  const [cameraLookAt, setCameraLookAt] = useState<Vector3 | null>(null);
  const [meps, setMeps] = useState(false);

  const spring = useSpring({
    y: meps ? 1.1 : 0,
    opacity: meps ? 0.35 : 1,
    config: { tension: 150, friction: 24 },
  });

  const houseHotspots = useMemo(
    () => [
      { id: "cam1", title: "Door Camera", pos: [-2.4, 1.6, -1.6], content: "1080p door cam" },
      { id: "lock1", title: "Smart Lock", pos: [-3.2, 0.9, -0.2], content: "Keyless entry" },
      { id: "temp1", title: "Thermostat", pos: [0.8, 1.9, 2.0], content: "Main thermostat" },
      { id: "kitchen-panel", title: "Kitchen Panel", pos: [2.0, 1.1, 2.4], content: "Kitchen automation" },
      { id: "living-sensor", title: "Motion Sensor", pos: [-2.6, 1.9, -0.2], content: "Motion sensor" },
    ],
    []
  );

  const mepHotspots = useMemo(
    () => [
      { id: "junction1", title: "Junction Box", pos: [-2.6, -0.3, 1.6], content: "Electrical junction" },
      { id: "pipe1", title: "Water Inlet", pos: [1.8, -0.3, -2.2], content: "Flow sensor" },
    ],
    []
  );

  const hotspots = meps ? mepHotspots : houseHotspots;

  function handleHotspotClick(h: any) {
    setActiveHotspot(h.id);
    setHotspotData(h);

    const [x, y, z] = h.pos;
    const cam = new Vector3(x + 2.4, y + 1.6, z + 2.4);
    const look = new Vector3(x, y, z);

    setCameraTarget(cam);
    setCameraLookAt(look);
  }

  function closePanel() {
    setActiveHotspot(null);
    setHotspotData(null);
    setCameraTarget(null);
    setCameraLookAt(null);
  }

  return (
    <div style={{ width: "100%", height: "90vh", position: "relative" }}>
      {/* UI Controls */}
      <div style={{ position: "absolute", top: 12, left: 12, zIndex: 50, display: "flex", gap: 8 }}>
        <button
          onClick={() => setMeps((v) => !v)}
          style={{ padding: "8px 12px", background: "#111827", color: "white", borderRadius: 8 }}
        >
          {meps ? "Hide MEP" : "Show MEP"}
        </button>

        <button
          onClick={() => {
            setCameraTarget(new Vector3(12, 8, 12));
            setCameraLookAt(new Vector3(0, 1, 0));
            closePanel();
          }}
          style={{ padding: "8px 12px", background: "#059669", color: "white", borderRadius: 8 }}
        >
          Reset View
        </button>
      </div>

      {/* 3D Scene */}
      <Canvas shadows camera={{ position: [12, 8, 12], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[20, 40, 10]} intensity={1.1} castShadow />

        <Suspense fallback={null}>
          <Stage adjustCamera={false} intensity={0.8}>
            {/* animated lift + fade */}
            <animated.group position-y={spring.y}>
              <CodeHouseWrapper opacity={spring.opacity as any} />
            </animated.group>

            <MEP visible={meps} />

            {hotspots.map((h) => (
              <Hotspot
                key={h.id}
                position={h.pos}
                title={h.title}
                onOpen={() => handleHotspotClick(h)}
              />
            ))}
          </Stage>

          <CameraController target={cameraTarget} lookAt={cameraLookAt} />
        </Suspense>

        <OrbitControls enablePan={!activeHotspot} enableRotate={!activeHotspot} />
      </Canvas>

      {/* Hotspot panel */}
      {activeHotspot && (
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            width: 340,
            padding: 16,
            background: "white",
            borderRadius: 12,
            boxShadow: "0 14px 40px rgba(0,0,0,0.2)",
            zIndex: 99,
          }}
        >
          <h3 style={{ margin: 0 }}>{hotspotData.title}</h3>
          <p style={{ marginTop: 6 }}>{hotspotData.content}</p>

          <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
            <button style={{ padding: "8px 12px", background: "#111827", color: "white", borderRadius: 8 }}>
              Learn
            </button>
            <button style={{ padding: "8px 12px", background: "#059669", color: "white", borderRadius: 8 }}>
              Request Quote
            </button>

            <button
              onClick={closePanel}
              style={{ marginLeft: "auto", padding: "6px 10px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
