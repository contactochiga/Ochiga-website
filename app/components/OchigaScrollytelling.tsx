"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const scenes = [
  {
    label: "Technology Meets Architecture",
    title: "Ochiga designs intelligent physical environments.",
    copy: "We connect architecture, infrastructure, real estate, digital twins, AI, and operational systems so buildings and estates can be planned, operated, and improved as living environments.",
  },
  {
    label: "Intelligent Buildings",
    title: "Buildings are becoming infrastructure systems.",
    copy: "Access, utilities, devices, cameras, maintenance, services, and resident workflows belong inside one architecture-aware operating layer.",
  },
  {
    label: "Intelligent Estates",
    title: "Estates need more than connected devices.",
    copy: "Ochiga models homes, rooms, residents, visitors, operators, assets, edge nodes, and service workflows as part of the same built-environment intelligence.",
  },
  {
    label: "Infrastructure Intelligence",
    title: "Operational awareness for the built world.",
    copy: "Source quality, telemetry, incidents, maintenance, device health, utility posture, and spatial context become visible without pretending missing sources are live.",
  },
  {
    label: "Oyi Platform Ecosystem",
    title: "Oyi powers the operating layer.",
    copy: "Oyi Home, Facility, Watch, Edge, AI, and Twin are product surfaces under Ochiga, built to connect residents, operators, infrastructure, and intelligence.",
  },
  {
    label: "Future Communities",
    title: "The long view is intelligent real estate.",
    copy: "Ochiga is building toward smart communities where architecture, construction, infrastructure, and digital intelligence are designed together from the beginning.",
  },
];

const zones = [
  ["Architecture", "#38bdf8", [-2.8, 2.2, 0.1]],
  ["Estate Systems", "#22c55e", [2.7, 1.55, 0.1]],
  ["Utilities", "#f59e0b", [-2.4, 0.4, 0.1]],
  ["Digital Twin", "#14b8a6", [2.25, -0.1, 0.1]],
  ["Resident Life", "#a78bfa", [-1.2, -1.7, 0.1]],
  ["Intelligence", "#60a5fa", [1.35, -1.9, 0.1]],
] as const;

const ecosystem = [
  { title: "Intelligent Buildings", label: "Architecture-aware" },
  { title: "Intelligent Estates", label: "Operationally governed" },
  { title: "Digital Infrastructure", label: "Connected systems" },
  { title: "Oyi Platform", label: "Product ecosystem" },
];

const whatWeBuild = [
  {
    title: "Intelligent Buildings",
    body: "Buildings with digital structure, device awareness, access rules, utility context, and operational memory.",
  },
  {
    title: "Intelligent Estates",
    body: "Residential and mixed-use estates where residents, operators, visitors, services, and shared infrastructure work through one governed system.",
  },
  {
    title: "Digital Infrastructure",
    body: "The connective layer across identity, rooms, devices, cameras, utilities, payments, incidents, maintenance, and audit trails.",
  },
  {
    title: "Command Centers",
    body: "Large-screen operational environments for estate health, infrastructure posture, security, incidents, and staff response.",
  },
  {
    title: "Digital Twins",
    body: "Spatial and operational records that preserve how buildings, homes, rooms, assets, and events relate to one another.",
  },
  {
    title: "Smart Communities",
    body: "Future developments where architecture, construction, infrastructure, resident experience, and intelligence are planned together.",
  },
];

function Building({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const materialOpacity = THREE.MathUtils.clamp(1 - progress * 1.7, 0.16, 1);
  const wireOpacity = THREE.MathUtils.clamp((progress - 0.12) * 1.8, 0, 0.78);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.18) * 0.08 + progress * 0.38;
    group.current.position.y = -0.2 + Math.sin(clock.elapsedTime * 0.6) * 0.025;
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.2, 5.8, 1.35]} />
        <meshStandardMaterial
          color="#111827"
          metalness={0.52}
          roughness={0.32}
          transparent
          opacity={materialOpacity}
        />
      </mesh>
      {Array.from({ length: 10 }).map((_, floor) =>
        Array.from({ length: 5 }).map((__, col) => (
          <mesh key={`${floor}-${col}`} position={[-1.68 + col * 0.84, -2.45 + floor * 0.5, 0.71]}>
            <boxGeometry args={[0.42, 0.16, 0.025]} />
            <meshStandardMaterial color={floor % 3 === 0 ? "#fbbf24" : "#7dd3fc"} emissive={floor % 3 === 0 ? "#5b3300" : "#073b5f"} emissiveIntensity={0.6} />
          </mesh>
        ))
      )}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.26, 5.86, 1.42]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={wireOpacity} />
      </mesh>
      <mesh position={[0, 3.12, 0]}>
        <boxGeometry args={[3.4, 0.18, 1.1]} />
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.25} />
      </mesh>
      {zones.map(([label, color, pos]) => (
        <group key={label} position={pos as [number, number, number]}>
          <mesh>
            <sphereGeometry args={[0.085, 24, 24]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.18, 0.205, 48]} />
            <meshBasicMaterial color={color} transparent opacity={0.42} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function SceneCanvas({ progress }: { progress: number }) {
  return (
    <Canvas className="story-canvas" dpr={[1, 1.6]}>
      <PerspectiveCamera makeDefault position={[0, 0.45 + progress * 0.8, 9 - progress * 3.4]} fov={42} />
      <ambientLight intensity={0.42} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#dbeafe" />
      <pointLight position={[-4, 2, 3]} intensity={1.4} color="#f59e0b" />
      <fog attach="fog" args={["#020504", 8, 19]} />
      <Building progress={progress} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.22, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#030806" metalness={0.2} roughness={0.8} />
      </mesh>
      <Environment preset="night" />
    </Canvas>
  );
}

export default function OchigaScrollytelling() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      setProgress(THREE.MathUtils.clamp(-rect.top / travel, 0, 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeIndex = Math.min(scenes.length - 1, Math.floor(progress * scenes.length));
  const active = scenes[activeIndex];
  const pct = Math.round(progress * 100);

  return (
    <main className="ochiga-story" ref={rootRef}>
      <section className="story-sticky">
        <SceneCanvas progress={progress} />
        <div className="story-vignette" />
        <div className="story-grid" />
        <div className="story-copy">
          <p>{active.label}</p>
          <h1>{active.title}</h1>
          <span>{active.copy}</span>
        </div>
        <aside className="story-panel">
          <div className="story-panel-head">
            <strong>Built Environment Intelligence</strong>
            <span>{pct}%</span>
          </div>
          <div className="story-signal">
            {zones.map(([label, color]) => (
              <div key={label}>
                <i style={{ background: color }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </aside>
        <div className="story-products">
          {ecosystem.map((item) => (
            <div key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="story-cta">
          <Link href="/deployments">Request Deployment</Link>
          <span>Digital infrastructure for intelligent buildings, estates, and future smart communities.</span>
        </div>
      </section>
      <div className="story-scroll-space" aria-hidden="true">
        {scenes.map((scene) => (
          <section key={scene.label} />
        ))}
      </div>
      <section className="relative z-10 bg-[#020504] px-6 py-28 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-xs uppercase tracking-[0.24em] text-white/38">Technology Meets Architecture</p>
          <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-end">
            <h2 className="text-4xl md:text-6xl font-medium tracking-[-0.05em] leading-tight">
              We build the intelligence layer for physical environments.
            </h2>
            <p className="text-lg leading-8 text-white/62">
              Ochiga sits between architecture, construction, infrastructure, and technology. We help buildings and estates become legible systems: designed physically, mapped digitally, operated continuously, and improved over time.
            </p>
          </div>
        </div>
      </section>
      <section className="relative z-10 bg-black px-6 py-28 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 text-xs uppercase tracking-[0.24em] text-white/38">What We Build</p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whatWeBuild.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-white/10 bg-white/[0.025] p-7">
                <h3 className="text-2xl font-medium">{item.title}</h3>
                <p className="mt-4 text-white/58 leading-7">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="relative z-10 bg-[#020504] px-6 py-28 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.24em] text-white/38">Infrastructure Intelligence</p>
            <h2 className="text-4xl md:text-6xl font-medium tracking-[-0.05em] leading-tight">
              The building understands its own state.
            </h2>
          </div>
          <div className="space-y-6 text-white/64 leading-8">
            <p>Infrastructure Intelligence is the ability for a built environment to preserve context: what exists, where it belongs, who owns it, whether it is healthy, and what action should happen next.</p>
            <p>Oyi is the platform ecosystem that powers this operating layer today. Spartan is the future intelligence layer for deeper reasoning, planning, simulation, and autonomous coordination.</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/oyi" className="btn-secondary">Explore Oyi</Link>
              <Link href="/papers/infrastructure-intelligence" className="btn-primary">Read Intelligence Paper</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
