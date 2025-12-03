// app/components/MEPSystem.tsx
"use client";
import React, { useMemo } from "react";
import Hotspot from "./Hotspot";

const SERVICE_COLOR: Record<string, string> = {
  electrical: "#facc15",
  water: "#06b6d4",
  fiber: "#60a5fa",
  gas: "#f97316",
  sewer: "#94a3b8",
  hvac: "#c084fc",
  street: "#94a3b8",
};

/**
 * Pipe between two points using a thin box (easy rotation).
 * Keeps math simple and avoids quaternions.
 */
function Pipe({ from, to, color }: { from: [number, number, number]; to: [number, number, number]; color: string }) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const dz = to[2] - from[2];
  const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const mid = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2] as [number, number, number];

  // rotation angles
  const rotY = Math.atan2(dz, dx); // rotate around Y to align x/z plane
  const horizontalDist = Math.sqrt(dx * dx + dz * dz);
  const rotX = -Math.atan2(dy, horizontalDist); // tilt up/down

  return (
    <mesh position={mid} rotation={[rotX, -rotY, 0]}>
      <boxGeometry args={[length, 0.06, 0.06]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

/**
 * MEPSystem renders:
 * - pipes from facility points (simple: it connects each facility to each junction)
 * - junction spheres + hotspots
 *
 * estate: { junctions: [{id, type, coords, label}], facility: {powerHouse, waterPlant, serverRoom} }
 * activeLayers: { electrical: boolean, water:boolean, fiber:boolean, ... }
 */
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

  // facility lookup map
  const facilityMap: Record<string, any> = {
    electrical: estate?.facility?.powerHouse,
    water: estate?.facility?.waterPlant,
    fiber: estate?.facility?.serverRoom,
    gas: estate?.facility?.gasPlant,
    sewer: estate?.facility?.sewagePlant,
    hvac: estate?.facility?.powerHouse, // placeholder
  };

  // create pipes per active layer
  const pipes = useMemo(() => {
    const res: Array<{ from: [number, number, number]; to: [number, number, number]; color: string }> = [];
    Object.keys(activeLayers).forEach((k) => {
      if (!activeLayers[k]) return;
      const facility = facilityMap[k];
      if (!facility) return;
      junctions.forEach((j: any) => {
        const color = SERVICE_COLOR[k] ?? "#ffffff";
        res.push({ from: facility.coords as [number, number, number], to: j.coords as [number, number, number], color });
      });
    });
    return res;
  }, [activeLayers, junctions, facilityMap]);

  return (
    <group>
      {/* Pipes */}
      {pipes.map((p, i) => (
        <Pipe key={`pipe-${i}`} from={p.from} to={p.to} color={p.color} />
      ))}

      {/* Junction markers + hotspots */}
      {junctions.map((j: any) => {
        const color = SERVICE_COLOR[j.type] ?? "#999";
        return (
          <group key={j.id}>
            <mesh position={j.coords as any}>
              <sphereGeometry args={[0.32, 12, 10]} />
              <meshStandardMaterial color={color} />
            </mesh>

            <Hotspot
              position={j.coords as any}
              title={j.label ?? j.id}
              onOpen={() => onOpenJunction(j)}
              color={color}
            />
          </group>
        );
      })}
    </group>
  );
}
