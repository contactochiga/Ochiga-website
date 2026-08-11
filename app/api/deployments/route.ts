import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

type DeploymentRequest = {
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  projectType: string;
  projectSize: string;
  deploymentInterest: string;
  notes: string;
  website?: string;
  formStartedAt?: string;
};

const rateState = new Map<string, { count: number; resetAt: number }>();
const maxBodyBytes = Number(process.env.OCHIGA_DEPLOYMENT_MAX_BODY_BYTES || 12_000);
const hostedAgentBase = (
  process.env.OCHIGA_DEPLOYMENT_AGENT_BASE ||
  process.env.NEXT_PUBLIC_OCHIGA_WIDGET_API_BASE ||
  "https://ochiga-lead-agents.onrender.com"
).replace(/\/$/, "");

const requiredFields: Array<keyof DeploymentRequest> = [
  "name",
  "company",
  "email",
  "phone",
  "location",
  "projectType",
  "projectSize",
  "deploymentInterest",
  "notes",
];

function clean(value: unknown, max = 1000) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function getIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.ip || "unknown";
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string) {
  const digits = phone.replace(/[^\d]/g, "");
  return digits.length >= 7 && digits.length <= 16;
}

function rateLimit(ip: string) {
  const windowMs = Number(process.env.OCHIGA_DEPLOYMENT_RATE_WINDOW_MS || 10 * 60 * 1000);
  const maxRequests = Number(process.env.OCHIGA_DEPLOYMENT_RATE_MAX || 5);
  const now = Date.now();
  const current = rateState.get(ip);

  if (!current || current.resetAt <= now) {
    rateState.set(ip, { count: 1, resetAt: now + windowMs });
    return null;
  }

  current.count += 1;
  if (current.count > maxRequests) {
    return {
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  return null;
}

function validateBotSignals(body: DeploymentRequest) {
  if (clean(body.website)) {
    return "We could not accept this request.";
  }

  const started = Number(body.formStartedAt || 0);
  const minAgeMs = Number(process.env.OCHIGA_DEPLOYMENT_MIN_FORM_AGE_MS || 1500);
  if (started && Date.now() - started < minAgeMs) {
    return "Please review the form and try again.";
  }

  return "";
}

function validateBody(raw: Partial<DeploymentRequest>) {
  const body: DeploymentRequest = {
    name: clean(raw.name, 120),
    company: clean(raw.company, 160),
    email: clean(raw.email, 180).toLowerCase(),
    phone: clean(raw.phone, 80),
    location: clean(raw.location, 180),
    projectType: clean(raw.projectType, 120),
    projectSize: clean(raw.projectSize, 120),
    deploymentInterest: clean(raw.deploymentInterest, 160),
    notes: clean(raw.notes, 1600),
    website: clean(raw.website, 200),
    formStartedAt: clean(raw.formStartedAt, 40),
  };

  const missing = requiredFields.filter((field) => !body[field]);
  if (missing.length) {
    return { body, error: `Missing required fields: ${missing.join(", ")}` };
  }

  if (!validateEmail(body.email)) {
    return { body, error: "Enter a valid email address." };
  }

  if (!validatePhone(body.phone)) {
    return { body, error: "Enter a valid phone number." };
  }

  const botError = validateBotSignals(body);
  if (botError) {
    return { body, error: botError };
  }

  return { body, error: "" };
}

function buildLeadPayload(body: DeploymentRequest, requestId: string, ip: string) {
  const summary = [
    `Deployment request from ${body.company || body.name}.`,
    `Project type: ${body.projectType}.`,
    `Project size: ${body.projectSize}.`,
    `Interest: ${body.deploymentInterest}.`,
    `Location: ${body.location}.`,
    `Notes: ${body.notes}`,
  ].join(" ");

  return {
    request_id: requestId,
    source: "ochiga_website_deployment_request",
    name: body.name,
    company: body.company,
    email: body.email,
    phone: body.phone,
    location: body.location,
    project_type: body.projectType,
    unit_count: Number.parseInt(body.projectSize, 10) || undefined,
    status: "new",
    owner: "marketing_agent",
    commercial_stage: "inbound",
    primary_channel: "website",
    summary,
    next_action: "Review deployment request and qualify project fit.",
    metadata: {
      project_size: body.projectSize,
      deployment_interest: body.deploymentInterest,
      notes: body.notes,
      ip_hash: crypto.createHash("sha256").update(ip).digest("hex"),
    },
  };
}

async function persistLocal(record: unknown) {
  const explicitlyEnabled = process.env.OCHIGA_DEPLOYMENT_LOCAL_FALLBACK === "true";
  const explicitlyDisabled = process.env.OCHIGA_DEPLOYMENT_LOCAL_FALLBACK === "false";

  if (explicitlyDisabled || (process.env.NODE_ENV === "production" && !explicitlyEnabled)) {
    return { ok: false, reason: "disabled" };
  }

  const storePath =
    process.env.OCHIGA_DEPLOYMENT_LOCAL_STORE ||
    path.join(process.cwd(), "data", "deployment-requests.jsonl");

  try {
    await mkdir(path.dirname(storePath), { recursive: true });
    await appendFile(storePath, `${JSON.stringify(record)}\n`, "utf8");
    return { ok: true, path: storePath };
  } catch {
    return { ok: false, reason: "local_persistence_failed" };
  }
}

async function forwardToOffice(payload: unknown) {
  const endpoint = process.env.OCHIGA_OFFICE_INTAKE_ENDPOINT || process.env.OCHIGA_DEPLOYMENT_LEAD_ENDPOINT;
  if (!endpoint) {
    return { ok: false, skipped: true, reason: "missing_endpoint" };
  }

  const headers: Record<string, string> = {
    "content-type": "application/json",
    "x-ochiga-surface": "website",
  };
  const token = process.env.OCHIGA_OFFICE_INTAKE_TOKEN || process.env.OCHIGA_DEPLOYMENT_LEAD_TOKEN;
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  const leadPayload = payload as ReturnType<typeof buildLeadPayload>;
  const officeEnvelope = {
    request_id: leadPayload.request_id,
    idempotency_key: crypto
      .createHash("sha256")
      .update([
        leadPayload.source,
        leadPayload.email,
        leadPayload.phone,
        leadPayload.request_id,
      ].join("|"))
      .digest("hex"),
    submitted_at: new Date().toISOString(),
    source_channel: "website",
    source_site: "ochiga_website",
    source_page: "/deployments",
    source_form: "legacy_deployments",
    business_unit: "technology",
    inquiry_type: "oyi_deployment",
    contact: {
      name: leadPayload.name,
      email: leadPayload.email,
      phone: leadPayload.phone,
    },
    organization: {
      name: leadPayload.company,
      location: leadPayload.location,
      unit_count: leadPayload.metadata.project_size,
    },
    payload: leadPayload,
    consent: { website_contact: true },
    campaign: {},
    metadata: leadPayload.metadata,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(officeEnvelope),
  });

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      reason: "office_endpoint_rejected",
    };
  }

  const data = await response.json().catch(() => ({}));
  return { ok: true, status: response.status, data };
}

async function forwardToWebhook(payload: unknown) {
  const webhookUrl = process.env.OCHIGA_DEPLOYMENT_WEBHOOK_URL;
  if (!webhookUrl) {
    return { ok: false, skipped: true, reason: "missing_webhook" };
  }

  const secret = process.env.OCHIGA_DEPLOYMENT_WEBHOOK_SECRET || "";
  const body = JSON.stringify(payload);
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "x-ochiga-surface": "website",
  };

  if (secret) {
    headers["x-ochiga-signature"] = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers,
    body,
  });

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      reason: "webhook_rejected",
    };
  }

  return { ok: true, status: response.status };
}

async function forwardToAgent(payload: ReturnType<typeof buildLeadPayload>, body: DeploymentRequest) {
  if (process.env.OCHIGA_DEPLOYMENT_AGENT_FALLBACK === "false") {
    return { ok: false, skipped: true, reason: "disabled" };
  }

  const endpoint =
    process.env.OCHIGA_DEPLOYMENT_AGENT_ENDPOINT ||
    `${hostedAgentBase}/api/lead-agents/public/chat`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-ochiga-surface": "website",
    },
    body: JSON.stringify({
      source: "ochiga_website_deployment_request",
      message: [
        "New Ochiga deployment request.",
        `Name: ${body.name}`,
        `Company / Estate: ${body.company}`,
        `Email: ${body.email}`,
        `Phone: ${body.phone}`,
        `Location: ${body.location}`,
        `Project type: ${body.projectType}`,
        `Project size: ${body.projectSize}`,
        `Deployment interest: ${body.deploymentInterest}`,
        `Notes: ${body.notes}`,
        `Request reference: ${payload.request_id}`,
      ].join("\n"),
      profile: {
        interaction_mode: "deployment_form",
        widget_context:
          "Ochiga website deployment request. Route this as an infrastructure deployment lead for human review.",
        deployment_request: payload,
      },
    }),
  });

  if (!response.ok) {
    return { ok: false, status: response.status, reason: "agent_endpoint_rejected" };
  }

  const data = await response.json().catch(() => ({}));
  return { ok: true, status: response.status, data };
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const ip = getIp(request);
  const limited = rateLimit(ip);

  if (limited) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many deployment requests. Please try again shortly.",
        requestId,
      },
      {
        status: 429,
        headers: { "retry-after": String(limited.retryAfter) },
      }
    );
  }

  let raw: Partial<DeploymentRequest>;
  try {
    const text = await request.text();
    if (Buffer.byteLength(text, "utf8") > maxBodyBytes) {
      return NextResponse.json(
        { ok: false, error: "Request is too large.", requestId },
        { status: 413 }
      );
    }
    raw = JSON.parse(text || "{}");
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body.", requestId },
      { status: 400 }
    );
  }

  const { body, error } = validateBody(raw);
  if (error) {
    return NextResponse.json({ ok: false, error, requestId }, { status: 400 });
  }

  const payload = buildLeadPayload(body, requestId, ip);
  const receivedAt = new Date().toISOString();
  const auditRecord = {
    type: "deployment.request.received",
    request_id: requestId,
    received_at: receivedAt,
    payload,
  };

  try {
    const office = await forwardToOffice(payload);
    const webhook = office.ok ? { ok: false, skipped: true, reason: "office_succeeded" } : await forwardToWebhook(payload);
    const agent = office.ok || webhook.ok ? { ok: false, skipped: true, reason: "primary_delivery_succeeded" } : await forwardToAgent(payload, body);
    const local = office.ok || webhook.ok || agent.ok ? { ok: false, skipped: true, reason: "remote_delivery_succeeded" } : await persistLocal(auditRecord);

    const delivered = office.ok || webhook.ok || agent.ok || local.ok;

    if (!delivered) {
      return NextResponse.json(
        {
          ok: false,
          error: "We could not submit your request right now. Please try again.",
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
          office: office.ok ? "sent" : office.skipped ? "not_configured" : "failed",
          webhook: webhook.ok ? "sent" : webhook.skipped ? "not_configured" : "failed",
          agent: agent.ok ? "sent" : agent.skipped ? "not_configured" : "failed",
          local: local.ok ? "persisted" : "disabled",
        },
      },
      { status: office.ok || webhook.ok || agent.ok ? 201 : 202 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "We could not submit your request right now. Please try again.",
        requestId,
      },
      { status: 500 }
    );
  }
}
