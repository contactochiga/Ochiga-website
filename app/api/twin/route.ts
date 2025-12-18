import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    assets: 18432,
    devices: 5621,
    eventsPerMinute: 92,
    health: "OPERATIONAL",
    events: [
      "Access granted — Zone A",
      "Payment settled — Unit 14C",
      "Device heartbeat — Gate 7",
    ],
  });
}
