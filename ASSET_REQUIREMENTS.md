# Asset Requirements (outstanding after Phase 1)

Phase 1 cleaned up and reorganized what existed; it did not source new
photography, video, or 3D models. Nothing below should be filled with
generic stock imagery — see Section 2/22 of the brief. Temporary
placeholders must stay clearly labeled as such (`PlaceholderNotice`
component) until real assets land.

## Structure

```
public/
  brand/           ochiga-logo.png (only real brand asset currently)
  images/
    development/   3 images, repurposed from old media, NOT final photography
    oyi/            10 images — old product-UI screenshots, suitable for
                    reference/getoyi.com, NOT the new architectural-cinema
                    visual language. Not used on any Phase 1 page.
    company/       empty — needs sourcing
    private/       empty — needs sourcing
  video/           empty — hero.mp4 was corrupted and deleted, needs sourcing
  models/          empty — house.glb / placeholder_mep.glb were 1-byte
                   placeholders and deleted, needs sourcing
  partners/        empty — partner1-4.png were empty files, deleted
```

## Outstanding, by destination

- **Homepage cinematic hero** (Phase 4): architectural film or high-end
  stills of a premium African residential tower/environment. Nothing
  currently in the repo fits — the retained `images/development/*`
  assets are construction/urban-systems stock, not hero-grade.
- **Vertical development concept**: renders or reference imagery for
  Prime Vertical Living. None exist; page currently ships text-only.
- **Residential community concept**: renders/reference imagery for
  Contemporary Residential Community. None exist.
- **Development pages**: real project/site photography once available;
  currently text-only by design (no fabricated portfolio imagery).
- **Ochiga Private**: discreet, editorial imagery (not stock "investment"
  photography — see Section 2 exclusions). None exist.
- **JV / Landowners**: none required for Phase 1 (form-led page).
- **Partnerships**: none required for Phase 1.
- **Oyi integration**: the existing `images/oyi/*` set is legacy product
  dashboard UI, not usable as-is for ochiga.com.ng's architectural
  direction; getoyi.com may still want them.
- **Company / journey**: no team, office, or history photography exists.
  About page is currently text-only.
- **Insights**: no cover images on any fallback article; Sanity schema
  supports `coverImage` + alt text once editorial content is created.
- **Open Graph / social**: `app/opengraph-image.tsx` and `app/icon.tsx`
  are programmatic (generated, not static files) and have been retinted
  to the new palette — functional today, but a designed static OG
  template may be preferred later.
- **Mobile alternatives**: no mobile-specific crops/versions exist yet;
  not needed until real photography is sourced.
- **Video**: none. `hero.mp4` was corrupted (contained stray text, not
  video data) and has been deleted rather than shipped broken.
- **3D models**: none usable. Both `.glb` files were 1-byte placeholders
  and have been deleted. Phase 4's cinematic/interactive work will need
  real models (building massing, MEP layers, or similar) sourced or
  commissioned — nothing here to build on.

## Logo

Only one source file exists (`ochiga-logo.png`, renamed from `.PNG` for
case-safety). No dark/light variants, no standalone icon/mark, no
favicon-quality source. Per the brief, the logo has not been redesigned
or fabricated — `app/icon.tsx` / `app/apple-icon.tsx` currently generate
a programmatic "O" mark in the new palette as an interim favicon.
Provide primary/light/dark/icon/social variants when available.
