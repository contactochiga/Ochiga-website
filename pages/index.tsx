// pages/index.tsx
import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stage, Html } from "@react-three/drei";
import Hotspot from "../components/Hotspot";

type SceneKey = "front" | "living" | "kitchen" | "bedroom-1" | "gate";

function DemoLayout() {
  // simple primitive demo of a duplex compound: ground plane, cubes for rooms, gate
  return (
    <group>
      {/* ground */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[30, 0.2, 24]} />
        <meshStandardMaterial color={"#f3f5f7"} />
      </mesh>

      {/* main block (house) */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[12, 4, 8]} />
        <meshStandardMaterial color={"#ffffff"} />
      </mesh>

      {/* second floor */}
      <mesh position={[0, 5.2, 0]}>
        <boxGeometry args={[10, 2.2, 6.8]} />
        <meshStandardMaterial color={"#f8fafc"} />
      </mesh>

      {/* balcony */}
      <mesh position={[0, 4.1, -3.5]}>
        <boxGeometry args={[4.5, 0.2, 1]} />
        <meshStandardMaterial color={"#e6e9ee"} />
      </mesh>

      {/* garage / extra room */}
      <mesh position={[-5.5, 1, 3]}>
        <boxGeometry args={[3.2, 2.2, 3.6]} />
        <meshStandardMaterial color={"#f1f5f9"} />
      </mesh>

      {/* sliding gate */}
      <mesh position={[8, 1.0, 0]}>
        <boxGeometry args={[0.4, 2.4, 6]} />
        <meshStandardMaterial color={"#111827"} />
      </mesh>

      {/* small objects representing devices */}
      <mesh position={[2.6, 0.8, 3.2]}>
        <boxGeometry args={[0.3, 0.4, 0.1]} />
        <meshStandardMaterial color={"#0f1724"} />
      </mesh>

      <mesh position={[0.6, 1.6, -2.2]}>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshStandardMaterial color={"#0ea5a4"} />
      </mesh>
    </group>
  );
}

export default function Home() {
  const [sceneKey, setSceneKey] = useState<SceneKey>("front");
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const hotspots = useMemo(() => [
    { id: "smart-lock", title: "Smart Lock", pos: [2.6, 0.9, 3.2], scene: "front", content: "Keyless entry with logs + remote unlock." },
    { id: "door-cam", title: "Door Camera", pos: [0.6, 1.6, -2.2], scene: "front", content: "1080p door cam with motion detection." },
    { id: "kitchen-panel", title: "Control Panel", pos: [-1.8, 1.6, 0.6], scene: "kitchen", content: "Control hub for energy & automations." },
    { id: "solar", title: "Solar Inverter", pos: [9.6, 0.7, -1.4], scene: "gate", content: "Hybrid inverter + battery ready." },
    { id: "living-cam", title: "Living Camera", pos: [0.9, 2.1, -1.1], scene: "living", content: "Indoor camera with privacy shutter." },
  ], []);

  const sceneHotspots = hotspots.filter(h => h.scene === sceneKey);

  const cameraPresets: Record<SceneKey, { pos: [number, number, number]; target?: [number, number, number] }> = {
    front: { pos: [0, 4.4, 18] },
    living: { pos: [0, 3.0, 8] },
    kitchen: { pos: [-2.4, 2.6, 5] },
    "bedroom-1": { pos: [0, 6.6, -6] },
    gate: { pos: [12, 4.6, 0] },
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <header style={{ position: "absolute", top: 20, left: 20, zIndex: 60 }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>Take our smart home tour</h1>
        <p style={{ margin: 0, opacity: 0.9 }}>Tap on the products to see how security, energy & automation connect.</p>
      </header>

      {/* scene controls */}
      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 60, display: "flex", gap: 12 }}>
        <button onClick={() => {
          const order: SceneKey[] = ["front", "living", "kitchen", "bedroom-1", "gate"];
          const i = order.indexOf(sceneKey);
          setSceneKey(order[(i - 1 + order.length) % order.length]);
        }} style={{ pointerEvents: "auto", padding: 12, borderRadius: 8 }}>←</button>
        <button onClick={() => {
          const order: SceneKey[] = ["front", "living", "kitchen", "bedroom-1", "gate"];
          const i = order.indexOf(sceneKey);
          setSceneKey(order[(i + 1) % order.length]);
        }} style={{ pointerEvents: "auto", padding: 12, borderRadius: 8 }}>→</button>
      </div>

      {/* info panel */}
      <div style={{ position: "absolute", right: 20, top: 20, zIndex: 60, width: 320, pointerEvents: "auto" }}>
        <div style={{ background: "rgba(255,255,255,0.95)", padding: 12, borderRadius: 12, color: "#071127" }}>
          <strong>Scene</strong>
          <div style={{ marginTop: 8 }}>
            <select value={sceneKey} onChange={(e) => setSceneKey(e.target.value as SceneKey)} style={{ width: "100%", padding: 8 }}>
              <option value="front">Front / Compound</option>
              <option value="living">Living Room</option>
              <option value="kitchen">Kitchen</option>
              <option value="bedroom-1">Master Bedroom</option>
              <option value="gate">Gate & Solar</option>
            </select>
          </div>
          <div style={{ marginTop: 12 }}>
            <strong>Active:</strong>
            <div style={{ marginTop: 6 }}>{activePanel ?? "None"}</div>
          </div>
        </div>
      </div>

      <Canvas camera={{ position: cameraPresets[sceneKey].pos, fov: 50 }}>
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 15, 10]} intensity={1.2} />
          <Stage adjustCamera={false} intensity={0.6}>
            <DemoLayout />
          </Stage>
          <OrbitControls makeDefault enablePan enableRotate enableZoom minDistance={5} maxDistance={50} />
        </Suspense>

        {/* invisible anchors (optional) */}
      </Canvas>

      {/* Hotspots over scene (Html anchors) */}
      <div className="tour-ui">
        {sceneHotspots.map(h => (
          <Hotspot key={h.id} position={h.pos as [number, number, number]} title={h.title} onOpen={() => setActivePanel(h.id)} />
        ))}
      </div>

      {/* bottom info modal */}
      {activePanel && (
        <div style={{
          position: "absolute", left: "50%", transform: "translateX(-50%)",
          bottom: 96, zIndex: 70, width: "min(980px, 94%)", pointerEvents: "auto"
        }}>
          <div style={{ padding: 18, background: "white", borderRadius: 12, color: "#071127" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ margin: 0 }}>{hotspots.find(s => s.id === activePanel)?.title}</h3>
                <p style={{ marginTop: 8 }}>{hotspots.find(s => s.id === activePanel)?.content}</p>
              </div>
              <div>
                <button onClick={() => setActivePanel(null)} style={{ padding: 8 }}>Close</button>
              </div>
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button style={{ padding: 10, borderRadius: 8 }}>Learn More</button>
              <button style={{ padding: 10, borderRadius: 8 }}>Request Quote</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
