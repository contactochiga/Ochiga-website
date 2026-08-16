# Oyi Universal Interaction Shell — future consumer readiness

Ochiga Office and Ochiga Website are the first two production
consumers of the shell (see `core/SYNC.md` for how they share
`core/*.mjs`). This document is the Phase 6 deliverable: what it
actually takes to mount the same shell on the three deferred surfaces,
based on direct repo reconnaissance of each — not speculation. None of
these three are migrated yet. Migrate one only when there's a real
reason to prove the abstraction further, per the standing instruction
not to touch Consumer/Facility beyond extraction.

The shared core today: `docking.mjs`, `presence.mjs`,
`responseNormalizer.mjs`. Everything below is about what each new
surface needs *in addition* to those three files.

---

## getoyi.com (`Oyi-page`)

**Current state**: the "Oyi Assistant" widget (`src/components/oyi-widget/OyiAssistant.tsx`)
is confirmed decorative — a button that toggles a static link-menu,
zero fetch calls anywhere in the component. There is no backend
conversation contract to adapt *from* yet; this would be the first
surface where the shell ships before the intelligence does.

**What's already reusable as-is**: the site's own `--accent: #3B82F6`
token in `globals.css` already matches the shell's canonical Oyi blue
exactly — no theme work needed. Next.js/React/TypeScript, same stack
as Website, so the *same* `OyiOrb.tsx` / `useDockedOrb.ts` / `OyiPanel.tsx`
/ `OyiMinimizedBar.tsx` component set from Website ports over with
only the accent/copy already matching.

**What's missing**:
- **TransportAdapter**: no `/api/oyi/*` proxy exists yet. Website's
  `lib/oyi/backendProxy.ts` pattern (same-origin proxy holding a
  server-side credential, never exposed to the browser) is the
  template — but getoyi.com would need its own decision on *which*
  backend contract to target. `CorporateOyiCoreResponse` (Website's
  contract) is scoped to Ochiga's own commercial/CRM context and
  probably wrong for an Oyi-product marketing site; `CanonicalConversationResponse`
  requires session auth Oyi-page visitors won't have. This likely
  needs a new, narrower public contract on the Backend side scoped to
  "answer questions about the Oyi product" — out of scope for a
  frontend-only migration.
- **ResponseNormalizer adapter**: `normalizeCorporateResponse` only
  applies if getoyi.com ends up on the same corporate contract as
  Website. If it gets its own contract, it needs its own
  `normalize*Response` function added to `responseNormalizer.mjs` —
  small addition, same pattern as the existing three.

**Verdict**: mechanically the easiest of the three (same stack as an
already-migrated surface), but blocked on a real product decision
(what should Oyi answer here, and from which backend contract) rather
than anything technical.

---

## Oyi Consumer (`Oyi-os-frontend`)

**Current state**: has the most substance of any surface, but it's
still monolithic — the orb (both a static CSS version and a stateful
button version), `ConfirmationCard`, `ActionLifecycleCard`,
`ReviewCard`, `ConversationTable`, `StructuredCards`, `OperatingStatus`
are all defined inline inside a single 1558-line `src/app/ai/page.tsx`,
not separate components. No docking/drag exists there at all today —
the assistant is a full-screen route (`/ai`), not a floating shell.
Four separate, never-unified presence-state vocabularies exist across
that one file (`OyiOrb`'s own union, `VoiceStatus`, `AiMessage["state"]`,
and the backend's own `TruthState`).

**What's already reusable as-is**:
- `normalizeCanonicalConversationResponse` (in `responseNormalizer.mjs`)
  already targets Consumer's real backend response shape
  (`OyiChatResponse` from `src/services/oyiService.ts`) — built and
  ready, unused until Consumer's frontend is actually touched.
- The **dead `ai-console`** implementation's separation pattern
  (`src/app/components/ai-console/logic/*.ts` — pure, framework-free
  decision functions feeding dumb presentational components) is the
  right shape to migrate *toward*, even though its actual components
  are unused. Don't delete it; it's the template for how `/ai/page.tsx`
  should be decomposed when this surface is migrated.
- `ConfirmationCard`/`ActionLifecycleCard`/`ReviewCard`/`ConversationTable`
  are functionally solid — the migration work is extraction (their own
  files, normalized props) not a rewrite.

**What's missing / needs building**:
- **Orb + docking**: Consumer's orb needs to become a real floating,
  edge-docked component using `docking.mjs` + a `useDockedOrb`-style
  hook (identical to Website's), replacing the fixed full-screen `/ai`
  route with the shell's open/minimized/closed model. This is the
  single largest piece of work of the three deferred surfaces.
- **Presence unification**: the four existing state unions all need
  to collapse onto `presence.mjs`'s vocabulary. `AiMessage["state"]`
  (informational/report_ready/recommendation/clarification_required/
  approval_required/executing/action_confirmed/action_failed/denied/
  partial/unavailable) is richer than the shell's 7 states — some of
  those are response-level states, not presence-level, and should stay
  as message/response metadata rather than forcing the orb itself
  through 11 states.
- **ContextAdapter**: `ActiveIntelligenceContext` (Zustand store,
  `src/store/useActiveIntelligenceContextStore.ts`) and
  `OperationalObject` are real and well-specified — the adapter here
  is mostly plumbing (Consumer's context store already has
  `operationalObjectFromActiveContext()`/`targetFromActiveContext()`
  converters built).

**Verdict**: worth doing once there's a second real reason to prove
the shell generalizes beyond simple text chat — Consumer is where
voice waveform, structured cards and the real workflow-based
confirmation UX would get properly exercised.

---

## Oyi Facility (`facility-oyi`)

**Current state**: has a real, mobile-only assistant sheet
(`FacilityAssistantSheet.tsx`, explicitly `md:hidden` — **no desktop
equivalent exists at all**). No orb, no docking, anywhere in the repo.

**What's already reusable as-is**:
- `ois-tokens.css` is a genuine, comprehensive token foundation
  (status/severity, spacing, motion, elevation) — explicitly
  documented as "foundation-only, existing styles remain active"
  (Phase 3B of Facility's own internal migration plan; Phase 3C is
  when component migration is allowed). This is a strong sign Facility
  itself already intends to move toward exactly this kind of shared,
  token-driven system — good alignment, not a fight.
- `OisStatusBadge`'s status/severity vocabulary (stable/attention/
  warning/critical/unavailable + pending/verified/failed/escalated/
  blocked/overdue/resolved/completed) is a reasonable candidate to
  extend `presence.mjs`'s visual mapping with facility-specific
  states, *if* Facility ever needs the orb itself to reflect device/
  operational health rather than just conversational presence — not
  needed for Office or Website, so not built now.

**What's missing / needs building**:
- **Desktop orb + docking**: has to be built from nothing; there is no
  existing desktop assistant UI to extract from at all.
- **TransportAdapter**: Facility runs Socket.IO
  (`services/facilityRealtime.ts`), not SSE (Office) or request/
  response polling (Website). The shared core has no transport
  abstraction yet because neither Office nor Website needed one — this
  is a genuinely new piece of architecture, not an extraction. Per the
  standing instruction, Office stays on its existing SSE transport for
  now; Facility's Socket.IO stays too. A `TransportAdapter` concept
  should only get built when there are at least two *different*
  transports that need to feed the same presence/response pipeline —
  that's true today (SSE vs Socket.IO vs Website's plain fetch) but
  building the abstraction speculatively, before Facility is actually
  migrated, would be exactly the "prematurely creating a giant
  abstraction before proving it" this programme was told to avoid.
- **ContextAdapter**: `FacilityActiveIntelligenceContext` (a Zustand-
  held object, not a React Context despite the name — see
  `store/useFacilityAssistantStore.ts`) and `OperationalObject` map
  reasonably well onto the same shape Office's `{ref, safe_summary}`
  pattern and Consumer's `ActiveIntelligenceContext` already use — all
  three are "what specific object is the user looking at, with what
  scope and permissions" in slightly different clothes. Worth
  designing one shared context shape when a second non-Office surface
  actually gets migrated (Consumer, most likely, given it's ahead of
  Facility in every other dimension audited here).

**Verdict**: the furthest surface from ready — no existing desktop
assistant to extract from, and the only one requiring genuinely new
transport-abstraction work rather than pure extraction. Migrate last.

---

## What NOT to build yet

Per the standing "prove it with two before abstracting for five"
instruction: no `TransportAdapter`, `AuthorityAdapter`, or
`SurfaceAdapter` base class exists yet, and none should until a third
real surface is actually being migrated. Office and Website didn't
need transport/authority abstraction because they're different enough
(SSE + RBAC-gated staff context vs. same-origin proxy + public
zero-permission context) that hardcoding each was clearer than
guessing at a shared interface neither has proven yet. When Consumer
or Facility is actually migrated, the two additional real
implementations (SSE, Socket.IO, plain fetch) plus the two context
shapes already in hand (`{ref,safe_summary}` vs `ActiveIntelligenceContext`)
will make the right abstraction obvious instead of invented.
