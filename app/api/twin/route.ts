import { NextResponse } from "next/server";
import { estateTopology } from "./topology";

export async function GET() {
  return NextResponse.json({
    status: "OPERATIONAL",

    metrics: {
      assets: estateTopology.buildings.length + estateTopology.facilities.length,
      devices: 5621,
      eventsPerMinute: 92,
      health: "OPERATIONAL",
    },

    topology: estateTopology,

    events: [
      "Access granted — Zone A",
      "Payment settled — Unit 14C",
      "Device heartbeat — Gate 7",
    ],

    timestamp: Date.now(),
    mode: "READ_ONLY",
  });
}
