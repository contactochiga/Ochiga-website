"use client";

import { useEffect, useState } from "react";
import Metric from "../../components/Metric";
import EventLog from "../../components/EventLog";
import TwinMap from "../../components/TwinMap";

export default function Twin() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/twin").then(r => r.json()).then(setData);
  }, []);

  if (!data) return <p>INITIALIZING DIGITAL TWIN…</p>;

  return (
    <section className="section">
      <small>READ-ONLY MODE</small>
      <h1>Live Digital Twin</h1>

      <div className="grid">
        <Metric label="Assets" value={data.assets} />
        <Metric label="Devices" value={data.devices} />
        <Metric label="Events/min" value={data.eventsPerMinute} />
        <Metric label="Health" value={data.health} />
      </div>

      <TwinMap />
      <EventLog events={data.events} />
    </section>
  );
}
