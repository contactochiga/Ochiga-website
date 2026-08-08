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
    development/   development-skyline-dusk.webp, development-construction-network.webp,
                    development-pre-construction.webp, development-urban-systems.webp
                    (+ development-construction.webp — original Phase 1 asset).
                    Skyline + construction-network are concept renders supplied 2026-08-08,
                    in active use (homepage, /development, /development/studies).
    oyi/            oyi-smart-lobby-dashboard.webp (concept render, supplied 2026-08-08,
                    in use on homepage + /oyi) plus 10 older product-UI screenshots —
                    reference/getoyi.com material, NOT the architectural-cinema
                    visual language, not used on any corporate page.
    partnerships/  partnerships-jv-handshake.webp (concept render, supplied 2026-08-08,
                    in use on /partnerships/landowners).
    company/       empty — needs sourcing
    private/       empty — needs sourcing
  video/           empty — hero.mp4 was corrupted and deleted, needs sourcing
  models/          empty — house.glb / placeholder_mep.glb were 1-byte
                   placeholders and deleted, needs sourcing
  partners/        empty — partner1-4.png were empty files, deleted
```

**On the 4 images supplied 2026-08-08:** these read as AI-generated/rendered
concept visuals (a Miami-looking skyline and construction site, a generic
office handshake, a stylized lobby dashboard overlay) — not photography of
an actual Ochiga site or a confirmed real location. They've been used only
in places where illustrative/concept imagery is appropriate (Development
Study cards, ecosystem previews, the JV process section) and captioned with
neutral `alt` text ("Illustrative concept render of...") rather than
implying a real, named Ochiga project or location. If any of these are
meant to represent an actual site or location, let us know so the copy and
alt text can be corrected — otherwise they should stay labeled as concept
imagery, consistent with the "Development Study / Concept" language used
everywhere else on the site.

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
