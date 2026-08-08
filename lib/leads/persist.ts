// Fallback persistence for lead submissions.
//
// IMPORTANT: this is a development convenience, not a production data
// store. Serverless hosts (Vercel and similar) run on an ephemeral,
// per-invocation filesystem — anything written to disk here can vanish
// on the next cold start and is never shared across instances. It must
// never be the only thing standing between a real lead and data loss.
//
// Production behavior: if email delivery fails and no CRM/database is
// connected, the API returns a clear failure to the client instead of
// silently "succeeding" to a file that may never be read.
//
// When ready to persist real leads, replace `persistLead` below with a
// call to Supabase (or another proper store) — the LeadPayload shape in
// lib/leads/types.ts is already what you'd insert as a row/document.
import { appendFile, mkdir } from "fs/promises";
import path from "path";
import type { LeadPayload } from "@/lib/leads/types";

export async function persistLead(payload: LeadPayload): Promise<{ ok: boolean; reason?: string }> {
  const explicitlyEnabled = process.env.OCHIGA_LEAD_LOCAL_FALLBACK === "true";
  const explicitlyDisabled = process.env.OCHIGA_LEAD_LOCAL_FALLBACK === "false";

  if (explicitlyDisabled || (process.env.NODE_ENV === "production" && !explicitlyEnabled)) {
    return { ok: false, reason: "disabled_in_production" };
  }

  const storePath = process.env.OCHIGA_LEAD_LOCAL_STORE || path.join(process.cwd(), "data", "leads.jsonl");

  try {
    await mkdir(path.dirname(storePath), { recursive: true });
    await appendFile(storePath, `${JSON.stringify(payload)}\n`, "utf8");
    return { ok: true };
  } catch {
    return { ok: false, reason: "local_persistence_failed" };
  }
}
