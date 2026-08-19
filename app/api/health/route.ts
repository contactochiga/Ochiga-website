import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Minimal, honest liveness probe — reports only what this app can
// actually know about itself (it responded), not the health of
// anything downstream. Ochiga Office probes this directly for the
// AI Agents System Health panel, replacing trace-inference.
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "ochiga-website",
    checked_at: new Date().toISOString(),
    commit: process.env.VERCEL_GIT_COMMIT_SHA || null,
  });
}
