import { NextResponse } from "next/server";

// Server-only bridge between the website's own API routes and the
// Ochiga Backend's Office-gated public intelligence surface
// (/office/conversation/corporate, /communications/office-public/*).
//
// The Backend requires a server-side office credential (x-office-api-key)
// on every one of these endpoints — it is never sent to, or readable by,
// the browser. The browser only ever talks to our own same-origin
// /api/oyi/* routes, which hold this module server-side and forward the
// request. This also sidesteps the Backend's CORS allowlist, which does
// not currently include ochiga.com.ng — see the widget audit report.
const DEFAULT_BACKEND_URL = "https://oyi-os.onrender.com";
const REQUEST_TIMEOUT_MS = 20_000;

export class OyiBackendConfigError extends Error {}
export class OyiBackendUnavailableError extends Error {}

function backendBaseUrl() {
  return (process.env.OYI_BACKEND_URL || DEFAULT_BACKEND_URL).replace(/\/$/, "");
}

// OYI_BACKEND_OFFICE_KEY is the documented name; OFFICE_SYNC_API_KEY is
// accepted too since that's the Backend's own name for this same secret
// and is what actually got configured in Vercel — mirrors the Backend's
// own fallback between OFFICE_SYNC_API_KEY / OFFICE_EXPORT_API_KEY.
function backendOfficeKey() {
  return process.env.OYI_BACKEND_OFFICE_KEY || process.env.OFFICE_SYNC_API_KEY || "";
}

export type BackendResult = {
  status: number;
  ok: boolean;
  json: Record<string, unknown> | null;
};

export async function callOyiBackend(
  path: string,
  init: { method: "GET" | "POST"; body?: unknown; requestId: string }
): Promise<BackendResult> {
  const key = backendOfficeKey();
  if (!key) {
    throw new OyiBackendConfigError("OYI_BACKEND_OFFICE_KEY (or OFFICE_SYNC_API_KEY) is not configured");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${backendBaseUrl()}${path}`, {
      method: init.method,
      headers: {
        "Content-Type": "application/json",
        "x-office-api-key": key,
        "x-request-id": init.requestId,
      },
      body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
      signal: controller.signal,
      cache: "no-store",
    });
    const text = await response.text();
    let json: Record<string, unknown> | null = null;
    if (text) {
      try {
        json = JSON.parse(text);
      } catch {
        json = null;
      }
    }
    return { status: response.status, ok: response.ok, json };
  } catch (error) {
    throw new OyiBackendUnavailableError(error instanceof Error ? error.message : "oyi_backend_unreachable");
  } finally {
    clearTimeout(timeout);
  }
}

// Every /api/oyi/* route calls the Backend then funnels the outcome
// through this so the widget always gets one of three honest states:
// the Backend's real JSON, "not configured" (503), or "unreachable" (502).
// Never a frontend-fabricated answer.
export function oyiResponse(result: BackendResult, requestId: string) {
  return NextResponse.json(result.json ?? { ok: false, error: "empty_backend_response", request_id: requestId }, {
    status: result.status,
  });
}

export function oyiErrorResponse(error: unknown, requestId: string) {
  if (error instanceof OyiBackendConfigError) {
    return NextResponse.json(
      { ok: false, error: "oyi_not_configured", request_id: requestId },
      { status: 503 }
    );
  }
  return NextResponse.json(
    { ok: false, error: "oyi_unavailable", request_id: requestId },
    { status: 502 }
  );
}
