// app/components/MEPSystem.tsx
"use client";
import React, { useMemo } from "react";
import Hotspot from "./Hotspot";

const SERVICE_COLOR: Record<string, string> = {
  electrical: "#22c55e", // green
  water: "#06b6d4", // cyan
  fiber: "#2563eb", // blue
  gas: "#ef4444", // red
  sewer: "#94a3b8", // grey
  fire: "#ef4444",
  hvac: "#c084fc",
  street: "#94a3b8",
};

function Pipe({ from, to, color }: { from: [number, number, number]; to: [number, number, number]; color: string }) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const dz = to[2] - from[2];
  const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const mid = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2] as [number, number, number];

  // rotation to align the thin box between from and to
  const rotY = Math.atan2(dz, dx);
  const horizontalDist = Math.sqrt(dx * dx + dz * dz);
  const rotX = -Math.atan2(dy, horizontalDist);

  return (
    <mesh position={mid} rotation={[rotX, -rotY, 0]}>
      <boxGeometry args={[length, 0.05, 0.05]} />
      <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
    </mesh>
  );
}

export default function MEPSystem({
  estate,
  activeLayers,
  onOpenJunction,
}: {
  estate: any;
  activeLayers: Record<string, boolean>;
  onOpenJunction: (j: any) => void;
}) {
  const junctions = estate?.junctions ?? [];

  // facilities map: ensure coords typed
  const facilities: Record<string, any> = {
    electrical: estate?.facility?.powerHouse,
    water: estate?.facility?.waterHouse ?? estate?.facility?.waterPlant,
    fiber: estate?.facility?.fiberHouse ?? estate?.facility?.serverRoom,
    gas: estate?.facility?.gasPlant,
    sewer: estate?.facility?.sewagePlant,
    fire: estate?.facility?.fireHouse,
    hvac: estate?.facility?.powerHouse, // simple mapping
  };

  const pipes = useMemo(() => {
    const out: Array<{ from: [number, number, number]; to: [number, number, number]; color: string }> = [];

    Object.keys(activeLayers).forEach((k) => {
      if (!activeLayers[k]) return;
      const fac = facilities[k];
      if (!fac) return;
      junctions.forEach((j: any) => {
        // route only to matching junction types OR to all street junctions
        const color = SERVICE_COLOR[k] ?? "#ffffff";
        out.push({ from: fac.coords as [number, number, number], to: j.coords as [number, number, number], color });
      });
    });

    return out;
  }, [activeLayers, junctions, facilities]);

  return (
    <group>
      {/* facility markers */}
      {Object.keys(facilities).map((k) => {
        const f = facilities[k];
        if (!f) return null;
        const color = SERVICE_COLOR[k] ?? "#999";
        return (
          <group key={`fac-${k}`}>
            <mesh position={f.coords as any}>
              <boxGeometry args={[1.4, 0.8, 1.0]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <Hotspot position={f.coords as any} title={f.id ?? k} onOpen={() => onOpenJunction(f)} color={color} />
          </group>
        );
      })}

      {/* pipes */}
      {pipes.map((p, i) => (
        <Pipe key={`p-${i}`} from={p.from} to={p.to} color={p.color} />
      ))}

      {/* junction markers */}
      {junctions.map((j: any) => {
        const color = SERVICE_COLOR[j.type] ?? "#999";
        return (
          <group key={j.id}>
            <mesh position={j.coords as any}>
              <sphereGeometry args={[0.35, 12, 8]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <Hotspot position={j.coords as any} title={j.label ?? j.id} onOpen={() => onOpenJunction(j)} color={color} />
          </group>
        );
      })}
    </group>
  );
}
