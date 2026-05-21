"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const scenes = [
  {
    label: "Physical Layer",
    title: "Ochiga — Technology Meets Infrastructure.",
    copy: "Building Africa's infrastructure operating layer for estates, buildings, and connected operational environments.",
  },
  {
    label: "Operational Layer",
    title: "One Operational Platform.",
    copy: "Security, utilities, maintenance, devices, access control, and infrastructure operations coordinated from one operational environment.",
  },
  {
    label: "Live Infrastructure View",
    title: "Infrastructure becomes visible.",
    copy: "Explore estate portfolio, security, utilities, community operations, environmental sensors, and infrastructure intelligence inside one living view.",
  },
  {
    label: "Infrastructure Intelligence",
    title: "Operational awareness, not just automation.",
    copy: "Live maps, heat layers, telemetry, diagnostics, and AI-assisted signals turn buildings into continuously supervised systems.",
  },
  {
    label: "Lifecycle Onboarding",
    title: "Enterprise-grade infrastructure onboarding.",
    copy: "Facility operators provision resident access through Oyi Facility. Residents enter Oyi Home with permission-aware operational visibility.",
  },
  {
    label: "Ecosystem",
    title: "Building Africa's Infrastructure Operating Layer.",
    copy: "Oyi Facility, Oyi Home, Oyi AI, and Oyi Edge operate as one connected infrastructure ecosystem.",
  },
];

const zones = [
  ["Estate Portfolio", "#38bdf8", [-2.8, 2.2, 0.1]],
  ["Security & Access", "#22c55e", [2.7, 1.55, 0.1]],
  ["Utilities", "#f59e0b", [-2.4, 0.4, 0.1]],
  ["Environment", "#14b8a6", [2.25, -0.1, 0.1]],
  ["Community Ops", "#a78bfa", [-1.2, -1.7, 0.1]],
  ["Intelligence", "#60a5fa", [1.35, -1.9, 0.1]],
] as const;

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

  const products = useMemo(() => ["Oyi Facility", "Oyi Home", "Oyi AI", "Oyi Edge"], []);

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
            <strong>Live Infrastructure View</strong>
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
          {products.map((product) => (
            <div key={product}>
              <strong>{product}</strong>
              <span>{product === "Oyi Facility" ? "Estate runtime" : product === "Oyi Home" ? "Resident OS" : product === "Oyi AI" ? "Command layer" : "Hardware bridge"}</span>
            </div>
          ))}
        </div>
        <div className="story-cta">
          <Link href="/deployments">Request Enterprise Demo</Link>
          <span>Operational deployments for estates, buildings, and infrastructure environments.</span>
        </div>
      </section>
      <div className="story-scroll-space" aria-hidden="true">
        {scenes.map((scene) => (
          <section key={scene.label} />
        ))}
      </div>
    </main>
  );
}
