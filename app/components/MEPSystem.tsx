// app/components/MEPSystem.tsx
"use client";
import React, { useMemo } from "react";
import Hotspot from "./Hotspot";

const SERVICE_COLOR: Record<string, string> = {
  electrical: "#facc15",
  water: "#06b6d4",
  fiber: "#60a5fa",
  gas: "#f97316",
  fire: "#ef4444",
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

  const rotY = Math.atan2(dz, dx);
  const horizontalDist = Math.sqrt(dx * dx + dz * dz);
  const rotX = -Math.atan2(dy, horizontalDist);

  return (
    <mesh position={mid} rotation={[rotX, -rotY, 0]}>
      <boxGeometry args={[length, 0.06, 0.06]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

/**
 * MEPSystem renders:
 * - pipes from facility points to street access junctions
 * - junction spheres + hotspots
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

  // Define street access junctions for streets/L-turns
  const streetAccessJunctions = [
    { id: "street-right-1", type: "street", coords: [12, 0, -30], label: "Right Street 1 Access" },
    { id: "street-right-2", type: "street", coords: [12, 0, -10], label: "Right Street 2 Access" },
    { id: "street-right-3", type: "street", coords: [12, 0, 10], label: "Right Street 3 Access" },
    { id: "street-left-1", type: "street", coords: [-12, 0, -30], label: "Left Street 1 Access" },
    { id: "street-left-2", type: "street", coords: [-12, 0, -10], label: "Left Street 2 Access" },
    { id: "street-left-3", type: "street", coords: [-12, 0, 10], label: "Left Street 3 Access" },
    { id: "l-turn-access", type: "street", coords: [30, 0, 40], label: "L Turn Street Access" },
  ];

  // Merge estate junctions + street access junctions
  const allJunctions = [...junctions, ...streetAccessJunctions];

  // facility lookup map
  const facilityMap: Record<string, any> = {
    electrical: estate?.facility?.powerHouse,
    water: estate?.facility?.waterHouse,
    fiber: estate?.facility?.fiberHouse ?? estate?.facility?.serverRoom,
    gas: estate?.facility?.gasPlant,
    fire: estate?.facility?.fireHouse,
    hvac: estate?.facility?.powerHouse, // placeholder
  };

  // create pipes per active layer
  const pipes = useMemo(() => {
    const res: Array<{ from: [number, number, number]; to: [number, number, number]; color: string }> = [];
    Object.keys(activeLayers).forEach((k) => {
      if (!activeLayers[k]) return;
      const facility = facilityMap[k];
      if (!facility) return;

      // Connect facility to each street access junction
      streetAccessJunctions.forEach((j: any) => {
        const color = SERVICE_COLOR[k] ?? "#ffffff";
        res.push({ from: facility.coords as [number, number, number], to: j.coords as [number, number, number], color });
      });
    });
    return res;
  }, [activeLayers, facilityMap]);

  return (
    <group>
      {/* Pipes */}
      {pipes.map((p, i) => (
        <Pipe key={`pipe-${i}`} from={p.from} to={p.to} color={p.color} />
      ))}

      {/* Junction markers + hotspots */}
      {allJunctions.map((j: any) => {
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
