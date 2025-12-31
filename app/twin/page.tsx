"use client";

import { useEffect, useState } from "react";
import Metric from "@/app/components/Metric";
import EventLog from "@/app/components/EventLog";
import TwinMap from "@/app/components/TwinMap";

export default function Twin() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/twin")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) return <p>INITIALIZING DIGITAL TWIN…</p>;

  return (
    <section className="section">
      <small>READ-ONLY MODE</small>
      <h1>Live Digital Twin</h1>

      <div className="grid">
        <Metric label="Assets" value={data.metrics.assets} />
        <Metric label="Devices" value={data.metrics.devices} />
        <Metric label="Events / min" value={data.metrics.eventsPerMinute} />
        <Metric label="Health" value={data.metrics.health} />
      </div>

      <TwinMap topology={data.topology} />
      <EventLog events={data.events} />
    </section>
  );
}
