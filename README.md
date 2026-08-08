# Ochiga Website

Corporate site for Ochiga — **Development × Oyi × Ochiga Private**.
Next.js 14 (App Router), TypeScript, Tailwind, Sanity.

This is a phased rebuild. See `DESIGN_SYSTEM.md` for tokens and
`ASSET_REQUIREMENTS.md` for outstanding photography/video/3D needs.
Phase 1 (this state) is the IA, design-system, and content-foundation
layer — the cinematic homepage experience and the four lead-capture
forms are intentionally deferred to Phases 3–4.

## Architecture

- `app/` — routes, one folder per URL segment. Top-level sections:
  `development`, `oyi`, `private`, `partnerships`, `about`, `insights`,
  `contact`, plus retained utility routes `deployments` (Oyi lead intake,
  not in primary nav), `privacy`, `terms`, `support`.
- `app/components/` — shared UI. Design-system primitives (`PageHero`,
  `SectionBlock`, `Eyebrow`, `CTAButton`, `EngineTriad`, `ProcessFlow`)
  live here; page-specific markup should stay in the page file.
- `lib/company.ts` — single source of truth for company info, nav, and
  CTAs. Never hardcode Ochiga contact details or nav items in a
  component; import from here.
- `lib/seo.ts` — per-page metadata + JSON-LD builders. Add new routes
  to `seoPages` here.
- `lib/content.ts` — Insights data layer (Sanity-or-fallback, see below).
- `lib/email.ts` — Resend email abstraction. **Scaffolding only**, not
  yet wired into any route (Phase 3).

## Environment variables

Copy `.env.example` to `.env.local`. Nothing is required for local
development — every integration (Sanity, lead delivery, Oma, Resend)
degrades gracefully when unset. See the Phase 1 report for the exact
list of addresses/keys that need to be provisioned before production
use of forms or email.

## CMS (Sanity)

Studio config: `sanity.config.ts`. Schemas: `sanity/schemas/` (`post` =
Insights articles, `category`, `author`, `training`). The `post` schema
includes SEO fields (seoTitle/seoDescription/canonicalUrl/ogImage),
tags, featured status, and related-content references.

The website reads Insights through `lib/content.ts`, which:

1. If `NEXT_PUBLIC_SANITY_ENABLE=true`, fetches from Sanity via the
   queries in `lib/queries.ts`.
2. Otherwise (default), falls back to the bundled starter content in
   `lib/papers.ts` / `lib/insights.ts`, normalized to the same `Insight`
   shape. This is real content carried over from the previous site, not
   fabricated filler — but it should be migrated into Sanity as the
   editorial program ramps up, and the flag flipped to `true`.

To run Sanity Studio locally: `npm run sanity:dev`.

## Forms (lead system)

`app/api/leads/route.ts` is the single endpoint behind all five lead
types: `LAND_JV` (Propose a Development, on `/partnerships/landowners`),
`OYI_DEPLOYMENT` (Request Deployment, on `/oyi#deployment`),
`PRIVATE_MEMBERSHIP` (Request Membership Requirements, on
`/private/membership`), `STRATEGIC_PARTNER` (Work With Ochiga, on
`/partnerships/professional`), and `GENERAL_CONTACT` (on `/contact#general`).

- Validation: `lib/leads/schemas.ts` (Zod, one schema per lead type on
  a shared base).
- Anti-spam/rate limiting: `lib/leads/security.ts` (honeypot, minimum
  form-age, in-memory IP rate limit — extracted from the original
  `app/api/deployments/route.ts` pattern).
- Payload shape: `lib/leads/types.ts` / `lib/leads/build-payload.ts` —
  every submission is a shared base envelope plus one nested
  type-specific object, never a flat bag of fields.
- Delivery: `lib/email.ts` via Resend — one internal notification
  (routed by lead type, reply-to the submitter) and one acknowledgement
  email to the submitter. Fails clearly (never silently discards a
  lead) if `RESEND_API_KEY` is missing in production; falls back to
  local JSONL storage in development only (see `lib/leads/persist.ts`
  for why that fallback is not production-safe on serverless hosts).
- UI: `app/components/forms/` — shared accessible field primitives
  (`fields.tsx`), the submit lifecycle hook (`useLeadSubmit.ts`), and
  one form component per lead type.

The original `app/api/deployments/route.ts` + `/deployments` page are
retained untouched as a legacy, unlinked pipeline predating this
system — see the Phase 3 report before deciding whether to retire it.

## Oma (corporate concierge widget)

Preserved as-is from the previous implementation (`app/layout.tsx` +
the agent-forwarding branch in `app/api/deployments/route.ts`). See the
Phase 1 report for the full audit — it needs a dedicated relanguaging
pass before launch, not a rebuild.

## Deployment

Not yet deployed. Before production: provision the email addresses and
Resend domain listed in the Phase 1 report, confirm Sanity project
access, and complete Phases 2–5.
