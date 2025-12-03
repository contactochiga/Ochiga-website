"use client";

import React, { useState, useMemo } from 'react';
import { 
  Zap, Droplets, Wind, Layers, Box, Home, ChevronUp, ChevronDown, Lock, Video, Power, Lightbulb, Fan, X, Activity
} from 'lucide-react';

// --- Data & Configuration ---
const FLOORS = [
  { id: 0, name: "Ground Floor", z: 0, rooms: ["Lounge", "Kitchen", "Guest Bed", "Office", "Dining"] },
  { id: 1, name: "First Floor", z: 120, rooms: ["Master Bed", "Bed 2", "Bed 3", "Bath Main", "Landing"] },
  { id: 2, name: "Second Floor", z: 240, rooms: ["Penthouse Bed", "Bed 5", "Bed 6", "Terrace", "Cinema"] }
];

// --- Sub-Components ---
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

const DeviceNode = ({ x, y, type, active, color, onClick, label }) => (
  <div 
    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30"
    style={{ left: `${x}%`, top: `${y}%` }}
    onClick={(e) => { e.stopPropagation(); onClick(); }}
  >
    {/* Tooltip */}
    <div className={`
      absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900/95 border border-${color}-500/50 
      rounded-lg text-[10px] font-bold tracking-wider text-${color}-400 whitespace-nowrap 
      opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50
    `}>
      {label}
    </div>

    {/* Glow Effect */}
    <div className={`
      absolute inset-0 rounded-full blur-md transition-all duration-300
      ${active ? `bg-${color}-400/60 scale-150` : 'bg-transparent scale-100'}
    `} />
    
    {/* Icon Container */}
    <div className={`
      relative w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-all duration-300
      ${active 
        ? `bg-slate-900 border-${color}-400 text-${color}-400 shadow-[0_0_10px_rgba(var(--${color}-rgb),0.4)]` 
        : 'bg-slate-900/90 border-slate-600 text-slate-600 group-hover:border-slate-400'
      }
    `}>
      {type === 'light' && <Lightbulb size={14} fill={active ? "currentColor" : "none"} />}
      {type === 'hvac' && <Fan size={14} className={active ? "animate-spin" : ""} />}
      {type === 'water' && <Droplets size={14} />}
      {type === 'security' && <Video size={14} />}
      {type === 'socket' && <Power size={14} />}
    </div>
  </div>
);

const ConnectionPath = ({ points, color, active, dashed, flow }) => {
  if (!points || points.length < 2) return null;
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <g className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-5'}`}>
      <path d={pathData} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.2" className="blur-[1px]" />
      <path d={pathData} fill="none" stroke={color} strokeWidth="1.5" strokeDasharray={dashed ? "4,4" : "none"} />
      {flow && active && (
        <circle r="2" fill="white">
          <animateMotion dur="3s" repeatCount="indefinite" path={pathData} keyPoints="0;1" keyTimes="0;1" />
        </circle>
      )}
    </g>
  );
};

const FloorPlate = ({ floorIndex, isActive, isExploded, config, devices, toggleDevice, activeLayers }) => {
  const yOffset = isExploded ? floorIndex * 160 : floorIndex * 20;
  
  return (
    <div 
      className="absolute inset-0 transition-all duration-1000 ease-in-out transform-style-3d will-change-transform"
      style={{ 
        transform: `translateZ(${yOffset}px)`,
        opacity: isExploded ? 1 : (floorIndex === 2 ? 1 : 0.3),
        zIndex: floorIndex
      }}
    >
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-4 bg-slate-900/80 border border-slate-600/30 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
          {/* Grid & Floor Texture */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute bottom-0 left-0 w-[35%] h-[40%] border-r border-t border-white/10 bg-white/5" />
          <div className="absolute top-[30%] left-[35%] w-[15%] h-[30%] border border-yellow-500/10 bg-yellow-500/5 flex flex-col justify-center items-center">
            <div className="text-[8px] text-yellow-500/30 tracking-widest rotate-90">STAIRS</div>
          </div>
          <div className="absolute top-0 right-0 w-[40%] h-full border-l border-white/10" />

          {/* Room Labels */}
          <div className="absolute top-4 left-4 text-[10px] font-mono text-white/30">{config.rooms[1]}</div>
          <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/30">{config.rooms[0]}</div>
          <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/30">{config.rooms[4]}</div>
        </div>
      </div>

      {/* Wiring/Piping Layer */}
      <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] pointer-events-none overflow-visible z-20">
        {activeLayers.electrical && devices.filter(d => d.floor === floorIndex && ['light','socket'].includes(d.type)).map(d => (
           <ConnectionPath key={`elec-${d.id}`} points={[{x:'35%',y:'50%'},{x:`${d.x}%`,y:`${d.y}%`}]} color="#facc15" active={d.active} />
        ))}
        {activeLayers.hvac && devices.filter(d => d.floor === floorIndex && d.type === 'hvac').map(d => (
           <ConnectionPath key={`hvac-${d.id}`} points={[{x:'50%',y:'0%'},{x:'50%',y:'40%'},{x:`${d.x}%`,y:`${d.y}%`}]} color="#c084fc" dashed active={d.active} flow />
        ))}
        {activeLayers.plumbing && devices.filter(d => d.floor === floorIndex && d.type === 'water').map(d => (
           <ConnectionPath key={`plumb-${d.id}`} points={[{x:'10%',y:'100%'},{x:'10%',y:`${d.y}%`},{x:`${d.x}%`,y:`${d.y}%`}]} color="#22d3ee" flow active={d.active} />
        ))}
      </svg>

      {/* Devices Layer */}
      <div className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] z-30">
        {devices.filter(d => d.floor === floorIndex).map(d => {
           let visible = false;
           if (activeLayers.electrical && ['light', 'socket'].includes(d.type)) visible = true;
           if (activeLayers.hvac && d.type === 'hvac') visible = true;
           if (activeLayers.plumbing && d.type === 'water') visible = true;
           if (activeLayers.security && d.type === 'security') visible = true;
           if (!visible) return null;

           const colors = { light: 'yellow', socket: 'yellow', hvac: 'purple', water: 'cyan', security: 'red' };
           return <DeviceNode key={d.id} {...d} color={colors[d.type]} onClick={() => d.onClick()} label={d.label} />;
        })}
      </div>
    </div>
  );
};

// --- Main Application ---
export default function Ochiga3DDemo() {
  const [viewMode, setViewMode] = useState('exploded');
  const [rotation, setRotation] = useState(45);
  const [showStats, setShowStats] = useState(false);
  const [activeLayers, setActiveLayers] = useState({
    electrical: true, plumbing: false, hvac: false, security: false
  });
  const [activeDevice, setActiveDevice] = useState(null);

  // Init Devices
  const initialDevices = useMemo(() => {
    const devs = [];
    FLOORS.forEach(floor => {
      const createDevice = (dev) => ({ ...dev, onClick: () => setActiveDevice(dev) });
      devs.push(
        createDevice({ id: `light-${floor.id}-1`, floor: floor.id, x: 20, y: 20, type: 'light', active: true, label: 'Room Light' }),
        createDevice({ id: `light-${floor.id}-2`, floor: floor.id, x: 80, y: 80, type: 'light', active: false, label: 'Main Spot' }),
        createDevice({ id: `hvac-${floor.id}-1`, floor: floor.id, x: 50, y: 50, type: 'hvac', active: true, label: 'AC Vents' }),
        createDevice({ id: `socket-${floor.id}-1`, floor: floor.id, x: 90, y: 15, type: 'socket', active: true, label: 'Utility' }),
        createDevice({ id: `sec-${floor.id}-1`, floor: floor.id, x: 10, y: 90, type: 'security', active: true, label: 'Motion' }),
      );
      if (floor.id >= 0) devs.push(createDevice({ id: `water-${floor.id}-1`, floor: floor.id, x: 15, y: 15, type: 'water', active: false, label: 'Plumbing' }));
    });
    return devs;
  }, []);

  const [devices, setDevices] = useState(initialDevices);
  const toggleLayer = (layer) => setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));

  return (
    <div className="fixed inset-0 bg-[#020408] text-slate-200 font-sans overflow-hidden flex flex-col">
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-start pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
           <div className="bg-cyan-500/10 border border-cyan-500/30 p-2 rounded-xl backdrop-blur-md">
             <Home size={20} className="text-cyan-400" />
           </div>
           <div>
             <h1 className="text-lg font-bold text-white leading-tight">Ochiga <span className="text-cyan-400 font-light">3D Demo</span></h1>
             <p className="text-[10px] text-slate-400 font-mono tracking-wider">Explore smart home automation & estate integration</p>
           </div>
        </div>
      </header>

      {/* Device Info Panel */}
      {activeDevice && (
        <div className="absolute bottom-20 left-4 md:left-20 z-50 w-64 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-white">{activeDevice.label}</h3>
            <button onClick={() => setActiveDevice(null)}><X size={14} className="text-slate-500 hover:text-white" /></button>
          </div>
          <p className="text-xs text-slate-400 mb-2">Type: <span className="font-mono text-white">{activeDevice.type}</span></p>
          <p className="text-xs text-slate-400">Status: <span className="font-mono text-white">{activeDevice.active ? 'ON' : 'OFF'}</span></p>
          <p className="text-[10px] text-slate-400 mt-2">Ochiga connects this device to your smart estate platform, enabling centralized control and automation.</p>
        </div>
      )}

      {/* 3D Viewport */}
      <div className="flex-1 relative perspective-container flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0f172a] via-[#050b14] to-[#020408]" />

         <div 
            className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] transition-transform duration-700 ease-out transform-style-3d"
            style={{ transform: `rotateX(60deg) rotateZ(${rotation}deg) scale(0.85)` }}
         >
            {FLOORS.map(floor => (
              <FloorPlate 
                key={floor.id} 
                floorIndex={floor.id} 
                config={floor} 
                isActive={true} 
                isExploded={viewMode==='exploded'} 
                devices={devices} 
                toggleDevice={() => {}} 
                activeLayers={activeLayers} 
              />
            ))}
         </div>

         {/* Rotate Controls */}
         <div className="absolute right-4 bottom-32 flex flex-col gap-2">
            <button onClick={() => setRotation(r => r - 45)} className="p-3 bg-slate-900/80 rounded-full border border-slate-700 text-white shadow-lg backdrop-blur-sm"><ChevronUp size={20} /></button>
            <button onClick={() => setRotation(r => r + 45)} className="p-3 bg-slate-900/80 rounded-full border border-slate-700 text-white shadow-lg backdrop-blur-sm"><ChevronDown size={20} /></button>
         </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800 pb-safe">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between md:justify-center gap-4 overflow-x-auto no-scrollbar mask-gradient">
            <NeonButton active={activeLayers.electrical} onClick={()=>toggleLayer('electrical')} icon={Zap} label="Electrical" color="yellow" compact />
            <NeonButton active={activeLayers.plumbing} onClick={()=>toggleLayer('plumbing')} icon={Droplets} label="Plumbing" color="cyan" compact />
            <NeonButton active={activeLayers.hvac} onClick={()=>toggleLayer('hvac')} icon={Wind} label="HVAC" color="purple" compact />
            <NeonButton active={activeLayers.security} onClick={()=>toggleLayer('security')} icon={Lock} label="Security" color="red" compact />
          </div>
        </div>
      </div>

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
