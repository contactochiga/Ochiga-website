"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useGesture } from "@use-gesture/react";
import { Zap, Droplets, Wind, Lock, Box, Layers } from "lucide-react";

// ------------------------------
// Floors Data (CSS Mode)
const FLOORS = [
  { id: 0, name: "Ground Floor", z: 0, rooms: ["Lounge", "Kitchen", "Guest Bed", "Office", "Dining"] },
  { id: 1, name: "First Floor", z: 120, rooms: ["Master Bed", "Bed 2", "Bed 3", "Bath Main", "Landing"] },
  { id: 2, name: "Second Floor", z: 240, rooms: ["Penthouse Bed", "Bed 5", "Bed 6", "Terrace", "Cinema"] },
];

// ------------------------------
// Neon Button
const NeonButton = ({ active, onClick, icon: Icon, label, color, compact = false }) => (
  <button
    onClick={onClick}
    className={`
      relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 border backdrop-blur-md shrink-0
      ${active 
        ? `bg-${color}-500/20 border-${color}-400 text-${color}-400 shadow-[0_0_15px_rgba(var(--${color}-rgb),0.3)]` 
        : 'bg-slate-900/60 border-slate-700/50 text-slate-400 hover:bg-slate-800'
      }
      ${compact ? 'flex-col text-[10px] gap-1 px-2 min-w-[70px]' : ''}
    `}
  >
    <Icon size={compact ? 20 : 18} />
    <span className={compact ? 'text-[10px]' : ''}>{label}</span>
    {active && (
      <span className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-${color}-400 animate-pulse shadow-[0_0_5px_currentColor]`} />
    )}
  </button>
);

// ------------------------------
// Device Node (CSS Mode)
const DeviceNode = ({ x, y, type, active, color, onClick, label }) => (
  <div
    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30"
    style={{ left: `${x}%`, top: `${y}%` }}
    onClick={(e) => { e.stopPropagation(); onClick(); }}
  >
    <div className={`
      absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900/95 border border-${color}-500/50
      rounded-lg text-[10px] font-bold tracking-wider text-${color}-400 whitespace-nowrap
      opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50
    `}>{label}</div>

    <div className={`
      absolute inset-0 rounded-full blur-md transition-all duration-300
      ${active ? `bg-${color}-400/60 scale-150` : 'bg-transparent scale-100'}
    `} />

    <div className={`
      relative w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-all duration-300
      ${active 
        ? `bg-slate-900 border-${color}-400 text-${color}-400 shadow-[0_0_10px_rgba(var(--${color}-rgb),0.4)]` 
        : 'bg-slate-900/90 border-slate-600 text-slate-600 group-hover:border-slate-400'
      }
    `}>
      {type === 'light' && <Zap size={14} fill={active ? "currentColor" : "none"} />}
      {type === 'hvac' && <Wind size={14} className={active ? "animate-spin" : ""} />}
      {type === 'water' && <Droplets size={14} />}
      {type === 'security' && <Lock size={14} />}
    </div>
  </div>
);

// ------------------------------
// Floor Plate (CSS Mode)
const FloorPlate = ({ floorIndex, isExploded, config, devices, toggleDevice, activeLayers }) => {
  const yOffset = isExploded ? floorIndex * 160 : floorIndex * 20;

  return (
    <div
      className="absolute inset-0 transition-all duration-1000 ease-in-out transform-style-3d will-change-transform"
      style={{
        transform: `translateZ(${yOffset}px)`,
        opacity: isExploded ? 1 : 0.4,
        zIndex: floorIndex,
      }}
    >
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-4 bg-slate-900/80 border border-slate-600/30 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
          {/* Floor Grid */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

          {/* Room Labels */}
          {config.rooms.map((r, i) => (
            <div key={i} className="absolute text-[10px] font-mono text-white/30"
              style={{ top: `${i*15 + 5}%`, left: `${i*15 + 5}%` }}
            >{r}</div>
          ))}
        </div>
      </div>

      {/* Devices */}
      <div className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] z-30">
        {devices.filter(d => d.floor === floorIndex).map(d => {
          let visible = false;
          if (activeLayers.electrical && ['light'].includes(d.type)) visible = true;
          if (activeLayers.hvac && d.type === 'hvac') visible = true;
          if (activeLayers.plumbing && d.type === 'water') visible = true;
          if (activeLayers.security && d.type === 'security') visible = true;
          if (!visible) return null;

          const colors = { light: 'yellow', hvac: 'purple', water: 'cyan', security: 'red' };
          return <DeviceNode key={d.id} {...d} color={colors[d.type]} onClick={() => toggleDevice(d.id)} />;
        })}
      </div>
    </div>
  );
};

// ------------------------------
// WebGL Villa
function RoomBox({ pos, size, color = "#fff", opacity = 1 }) {
  return (
    <mesh position={pos} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function Hotspot({ position, title, onOpen, color = "#ff7b2d" }) {
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

function MEP({ visible }) {
  if (!visible) return null;
  return (
    <group>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 12, 12]} />
        <meshStandardMaterial color="#0ea5a4" />
      </mesh>
      <mesh position={[3.2, -0.4, -1.6]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 4.8, 12]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[-2.6, -0.4, 1.6]}>
        <boxGeometry args={[0.4, 0.25, 0.4]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      <mesh position={[1.8, -0.4, -2.2]}>
        <boxGeometry args={[0.4, 0.25, 0.4]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
    </group>
  );
}

function ModernVilla() {
  return (
    <group>
      <RoomBox pos={[0, -0.75, 0]} size={[30, 1.5, 22]} color="#e6eef6" />
      <RoomBox pos={[0, 0.9, 0]} size={[12, 1.8, 9]} color="#ffffff" />
      <RoomBox pos={[-4, 1.0, 4]} size={[2, 1.6, 0.2]} color="#9fd4f8" opacity={0.3} />
      <RoomBox pos={[4, 1.0, 4]} size={[2, 1.6, 0.2]} color="#9fd4f8" opacity={0.3} />
      <RoomBox pos={[0, 2.8, 0]} size={[12, 1.8, 9]} color="#f3f4f6" />
      <RoomBox pos={[-4, 3.0, 4]} size={[2, 1.6, 0.2]} color="#9fd4f8" opacity={0.3} />
      <RoomBox pos={[4, 3.0, 4]} size={[2, 1.6, 0.2]} color="#9fd4f8" opacity={0.3} />
      <RoomBox pos={[0, 4.0, 0]} size={[12.6, 0.2, 9.6]} color="#cbd5e1" />
      <RoomBox pos={[-10.2, 0.1, 2.6]} size={[6, 0.2, 10]} color="#d1d5db" />
      <RoomBox pos={[8.5, 0.1, -3.2]} size={[8, 0.2, 6]} color="#60a5fa" />
      <RoomBox pos={[8.5, 0.9, 2.4]} size={[5, 1.6, 3]} color="#f8fafc" />
      <RoomBox pos={[-4.2, 2.8, -2.2]} size={[2.8, 1.6, 3]} color="#fef2f2" />
      <RoomBox pos={[-1.2, 2.8, -2.2]} size={[2.8, 1.6, 3]} color="#fff1f2" />
      <RoomBox pos={[1.8, 2.8, -2.2]} size={[2.8, 1.6, 3]} color="#fef6ee" />
      <RoomBox pos={[-1.2, 2.8, 1.6]} size={[2.8, 1.6, 3]} color="#f0fdf4" />
      <RoomBox pos={[3.2, 2.8, 1.6]} size={[3.2, 1.6, 3.6]} color="#eef2ff" />
    </group>
  );
}

// ------------------------------
// MAIN COMPONENT
export default function ThreeLanding() {
  // Flip Mode
  const [mode, setMode] = useState<'css' | 'webgl'>('css');

  // CSS State
  const [viewMode, setViewMode] = useState<"exploded" | "stacked">("exploded");
  const [rotation, setRotation] = useState({ x: 30, y: 45 });
  const [scale, setScale] = useState(0.85);
  const [activeLayers, setActiveLayers] = useState({ electrical: true, plumbing: false, hvac: false, security: false });

  // WebGL State
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [showMEP, setShowMEP] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const initialDevices = useMemo(() => {
    const devs = [];
    FLOORS.forEach(floor => {
      devs.push(
        { id: `light-${floor.id}-1`, floor: floor.id, x: 20, y: 20, type: 'light', active: true, label: 'Room Light' },
        { id: `hvac-${floor.id}-1`, floor: floor.id, x: 50, y: 50, type: 'hvac', active: true, label: 'AC Vent' },
        { id: `water-${floor.id}-1`, floor: floor.id, x: 15, y: 15, type: 'water', active: false, label: 'Pipe' },
        { id: `sec-${floor.id}-1`, floor: floor.id, x: 10, y: 90, type: 'security', active: true, label: 'Motion Sensor' },
      );
    });
    return devs;
  }, []);
  const [devices, setDevices] = useState(initialDevices);
  const toggleDevice = (id) => setDevices(prev => prev.map(d => d.id === id ? { ...d, active: !d.active } : d));
  const toggleLayer = (layer) => setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gesture for CSS mode
  const bind = useGesture({
    onDrag: ({ delta: [dx, dy] }) => setRotation(r => ({ x: r.x + dy * 0.5, y: r.y + dx * 0.5 })),
    onPinch: ({ offset: [d] }) => setScale(Math.min(Math.max(0.5, d / 100), 2))
  });

  // WebGL hotspots
  const houseHotspots = useMemo(() => [
    { id: "cam1", title: "Door Camera", pos: [-2.4, 1.6, -1.6], content: "HD Door Camera" },
    { id: "lock1", title: "Smart Lock", pos: [-3.2, 0.9, -0.2], content: "Keyless entry" },
    { id: "temp1", title: "Thermostat", pos: [0.8, 1.9, 2.0], content: "Temperature Control" },
  ], []);
  const mepHotspots = useMemo(() => [
    { id: "junction1", title: "Junction Box", pos: [-2.6, -0.3, 1.6], content: "Electrical junction" },
    { id: "pipe1", title: "Water Inlet", pos: [1.8, -0.3, -2.2], content: "Water pipe inlet" },
  ], []);
  const hotspots = showMEP ? mepHotspots : houseHotspots;

  return (
    <div className="w-full overflow-x-hidden bg-[#020408] text-white relative">

      {/* Flip Mode Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setMode(mode === 'css' ? 'webgl' : 'css')}
          className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-bold"
        >
          {mode === 'css' ? 'Switch to 3D WebGL' : 'Switch to DOM CSS'}
        </button>
      </div>

      {mode === 'css' ? (
        // ------------------------------ CSS Mode
        <div className="w-full max-w-5xl mx-auto aspect-[4/3] relative bg-[#020408] rounded-xl overflow-hidden" {...bind()}>
          <div className="absolute top-4 right-4 flex gap-2 z-30">
            <NeonButton active={viewMode === 'stacked'} onClick={() => setViewMode('stacked')} icon={Layers} label="Stacked" color="cyan" compact />
            <NeonButton active={viewMode === 'exploded'} onClick={() => setViewMode('exploded')} icon={Box} label="Exploded" color="cyan" compact />
          </div>
          <div className="relative w-full h-full perspective-container">
            <div className="w-full h-full transition-transform duration-300 transform-style-3d" style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scale})` }}>
              {FLOORS.map(floor => (
                <FloorPlate
                  key={floor.id}
                  floorIndex={floor.id}
                  config={floor}
                  isExploded={viewMode === 'exploded'}
                  devices={devices}
                  toggleDevice={toggleDevice}
                  activeLayers={activeLayers}
                />
              ))}
            </div>
          </div>
          {/* Bottom MEP Controls */}
          <div className="absolute bottom-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800 pb-safe">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center gap-3 overflow-x-auto no-scrollbar">
              <NeonButton active={activeLayers.electrical} onClick={() => toggleLayer('electrical')} icon={Zap} label="Electrical" color="yellow" compact />
              <NeonButton active={activeLayers.plumbing} onClick={() => toggleLayer('plumbing')} icon={Droplets} label="Plumbing" color="cyan" compact />
              <NeonButton active={activeLayers.hvac} onClick={() => toggleLayer('hvac')} icon={Wind} label="HVAC" color="purple" compact />
              <NeonButton active={activeLayers.security} onClick={() => toggleLayer('security')} icon={Lock} label="Security" color="red" compact />
            </div>
          </div>
        </div>
      ) : (
        // ------------------------------ WebGL Mode
        <div className="relative w-full h-[150vh] overflow-y-scroll">
          <div className="sticky top-0 w-full h-screen flex items-center justify-center">
            <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px]" style={{ transform: `translateY(${scrollY * 0.3}px) scale(${scale}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}>
              <Canvas camera={{ position: [15, 10, 15], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <ModernVilla />
                <MEP visible={showMEP} />
                {hotspots.map(h => (
                  <Hotspot key={h.id} position={h.pos} title={h.title} onOpen={() => setActiveHotspot(h)} color={showMEP ? "#00aaff" : "#ff7b2d"} />
                ))}
                <OrbitControls enablePan enableZoom enableRotate />
              </Canvas>
            </div>
          </div>

          {/* Hotspot Panel */}
          {activeHotspot && (
            <div className="fixed bottom-8 left-4 w-72 p-4 bg-white text-black rounded-lg shadow-lg z-50">
              <h3 className="font-bold">{activeHotspot.title}</h3>
              <p className="mt-2 text-sm">{activeHotspot.content}</p>
              <button onClick={() => setActiveHotspot(null)} className="mt-4 px-4 py-2 bg-cyan-500 text-black rounded-lg font-bold">Close</button>
            </div>
          )}

          {/* MEP Toggle */}
          <div className="fixed top-4 left-4 flex flex-col gap-2 z-50">
            <button onClick={() => setShowMEP(v => !v)} className="px-3 py-2 bg-slate-900 rounded-lg text-white font-bold">
              {showMEP ? "Hide MEP" : "Show MEP"}
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .perspective-container { perspective: 1500px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
