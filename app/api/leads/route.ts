import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { leadSchemas } from "@/lib/leads/schemas";
import type { LeadType } from "@/lib/leads/types";
import { checkBotSignals, getIp, maxLeadBodyBytes, rateLimit } from "@/lib/leads/security";
import { persistLead } from "@/lib/leads/persist";
import { sendLeadEmails } from "@/lib/email";
import {
  buildGeneralContactPayload,
  buildLandJvPayload,
  buildOyiDeploymentPayload,
  buildPrivateMembershipPayload,
  buildStrategicPartnerPayload,
} from "@/lib/leads/build-payload";

export const runtime = "nodejs";

const validLeadTypes = Object.keys(leadSchemas) as LeadType[];

function buildPayload(type: LeadType, input: any, ctx: { requestId: string; ip: string }) {
  switch (type) {
    case "LAND_JV":
      return buildLandJvPayload(input, ctx);
    case "OYI_DEPLOYMENT":
      return buildOyiDeploymentPayload(input, ctx);
    case "PRIVATE_MEMBERSHIP":
      return buildPrivateMembershipPayload(input, ctx);
    case "STRATEGIC_PARTNER":
      return buildStrategicPartnerPayload(input, ctx);
    case "GENERAL_CONTACT":
      return buildGeneralContactPayload(input, ctx);
  }
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const ip = getIp(request);

  let raw: Record<string, unknown>;
  try {
    const text = await request.text();
    if (Buffer.byteLength(text, "utf8") > maxLeadBodyBytes) {
      return NextResponse.json({ ok: false, error: "Request is too large.", requestId }, { status: 413 });
    }
    raw = JSON.parse(text || "{}");
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body.", requestId }, { status: 400 });
  }

  const leadType = raw.leadType as LeadType;
  if (!leadType || !validLeadTypes.includes(leadType)) {
    return NextResponse.json({ ok: false, error: "Unknown lead type.", requestId }, { status: 400 });
  }

  const limited = rateLimit(`${leadType}:${ip}`);
  if (limited) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly.", requestId },
      { status: 429, headers: { "retry-after": String(limited.retryAfter) } }
    );
  }

  const botError = checkBotSignals({ website: raw.website as string, formStartedAt: raw.formStartedAt as string });
  if (botError) {
    return NextResponse.json({ ok: false, error: botError, requestId }, { status: 400 });
  }

  const schema = leadSchemas[leadType];
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = flattenZodError(parsed.error);
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields and try again.", fieldErrors, requestId },
      { status: 400 }
    );
  }

  const payload = buildPayload(leadType, parsed.data, { requestId, ip });

  try {
    const emailResult = await sendLeadEmails(payload);
    const emailDelivered = emailResult.internal.ok;

    const local = emailDelivered ? { ok: false, reason: "email_succeeded" } : await persistLead(payload);
    const delivered = emailDelivered || local.ok;

    if (!delivered) {
      // Never silently discard a submission — surface a real failure so
      // the visitor knows to retry or reach out directly.
      return NextResponse.json(
        {
          ok: false,
          error: "We could not submit your request right now. Please try again or contact us directly.",
          requestId,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        requestId,
        delivery: {
          email: emailResult.internal.ok ? "sent" : emailResult.internal.skipped ? "not_configured" : "failed",
          acknowledgement: emailResult.acknowledgement.ok ? "sent" : "not_sent",
          local: local.ok ? "persisted" : "disabled",
        },
      },
      { status: emailDelivered ? 201 : 202 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not submit your request right now. Please try again.", requestId },
      { status: 500 }
    );
  }
}

function flattenZodError(error: ZodError) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}
