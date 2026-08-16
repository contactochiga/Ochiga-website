# Oyi Shell Core — sync manifest

This directory is the **source of truth** for the Oyi Universal Interaction
Shell's framework-agnostic core (`docking.mjs`, `presence.mjs`,
`responseNormalizer.mjs`). It's deliberately plain, dependency-free ES
modules — no React, no DOM access, no Next.js-specific syntax — so it's
importable two ways with zero build step:

- **Ochiga Website**: `import { ... } from "@/lib/oyi-shell/core/docking.mjs"`
  (or via a re-exporting `.ts` wrapper for typed call sites).
- **Ochiga Office**: native `<script type="module">` — Office's frontend
  has no bundler, so these files can't be `npm install`ed. Instead they're
  **vendored** (copied) into
  `ochiga-office/public/office/shared/oyi-core/`, served as static files
  exactly like the rest of `public/office/`.

## Why a copy instead of a real shared package

Office has zero frontend build tooling on purpose (see its own comments
in `public/office/office.js`), and introducing one just to consume three
small files would be a bigger, riskier change than keeping a synced copy.
A private npm package would need registry/publishing infra neither repo
currently has. Vendoring is the lowest-risk option that still keeps
**one authored implementation** — Office's copy is never hand-edited,
only replaced wholesale from here.

## How to sync after changing a core file

From `Ochiga-website/`:

```sh
cp lib/oyi-shell/core/docking.mjs \
   lib/oyi-shell/core/presence.mjs \
   lib/oyi-shell/core/responseNormalizer.mjs \
   ../ochiga-office/public/office/shared/oyi-core/
cd lib/oyi-shell/core && shasum -a 256 *.mjs
```

Update the checksums below in the same commit as the source change, and
commit the vendored copy in `ochiga-office` as its own paired commit
(different repos, so it can't be one commit — but land them together).

## Current checksums (sha256)

| File | Website (source) | Office (vendored) |
|---|---|---|
| `docking.mjs` | `f18e27fae4a41c292b19deae5729de670531ef380ec0abd21e731687aa84b206` | matches |
| `presence.mjs` | `d973458bcdc75fc8b03e761b42fec7c89d08b15779d5bb110880b92a4c16084c` | matches |
| `responseNormalizer.mjs` | `17deaa77eb2fb1dc185f195984c4bdda967fc59c94689ec8b5bd3d2e73fe825c` | matches |

If Office's copy ever needs to diverge (a genuine surface-specific
behavior difference, not drift), stop and document why in this file
rather than letting it silently fork.
