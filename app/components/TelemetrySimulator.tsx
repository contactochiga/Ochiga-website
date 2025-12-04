// app/components/TelemetrySimulator.tsx
"use client";
import { useEffect, useState } from "react";

export type TelemetryPoint = {
  id: string;
  type: string;
  value: number;
  unit: string;
  updatedAt: number;
};

export default function useTelemetrySimulator(estate: any) {
  const [points, setPoints] = useState<Record<string, TelemetryPoint>>({});

  useEffect(() => {
    if (!estate) return;
    const init: Record<string, TelemetryPoint> = {};

    (estate.units || []).forEach((u: any) => {
      init[`elec-${u.id}`] = { id: `elec-${u.id}`, type: "electrical", value: +(1 + Math.random() * 3).toFixed(2), unit: "kW", updatedAt: Date.now() };
      init[`water-${u.id}`] = { id: `water-${u.id}`, type: "water", value: +(5 + Math.random() * 40).toFixed(1), unit: "L/s", updatedAt: Date.now() };
      init[`temp-${u.id}`] = { id: `temp-${u.id}`, type: "hvac", value: +(19 + Math.random() * 6).toFixed(1), unit: "°C", updatedAt: Date.now() };
    });

    (estate.junctions || []).forEach((j: any) => {
      const t = j.type || "electrical";
      init[`jn-${j.id}-flow`] = {
        id: `jn-${j.id}-flow`,
        type: t,
        value: +(t === "electrical" ? (5 + Math.random() * 10).toFixed(2) : (1 + Math.random() * 20).toFixed(2)),
        unit: t === "electrical" ? "kW" : t === "water" ? "L/s" : "pkt",
        updatedAt: Date.now(),
      };
    });

    setPoints(init);
  }, [estate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPoints((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          const p = next[k];
          const drift = (Math.random() - 0.45) * (p.type === "electrical" ? 0.6 : p.type === "water" ? 2 : 0.4);
          p.value = Math.max(0, +(p.value + drift).toFixed(p.type === "electrical" ? 2 : 1));
          p.updatedAt = Date.now();
        });
        return next;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return points;
}
