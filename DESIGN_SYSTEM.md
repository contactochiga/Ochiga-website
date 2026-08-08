# Ochiga Design System (Phase 1 foundation)

Single source of truth: `tailwind.config.js` (`theme.extend`). Everything
below is implemented as Tailwind tokens — components should use Tailwind
utility classes built from these tokens, not inline `style={}` or new
one-off CSS.

## Colors

| Token | Value | Use |
|---|---|---|
| `ochiga-black` | `#050505` | Primary background |
| `ochiga-charcoal` | `#141414` | Secondary surface / cards |
| `ochiga-graphite` | `#232323` | Borders, dividers, raised surfaces |
| `ochiga-grey-100/300/500/700` | greyscale ramp | Body text on dark, muted UI |
| `ochiga-warmwhite` | `#f6f3ec` | Editorial light surfaces, light-mode sections |
| `ochiga-white` | `#ffffff` | High-contrast text/icons |
| `ochiga-red` / `ochiga-red-muted` / `ochiga-red-bright` | `#b3241b` family | Accent only — CTAs, small marks. Never a dominant field color. |

Rule: red is used deliberately (one CTA, one accent mark) — not as a
background wash or repeated decorative element.

## Typography

- `font-display` (serif — Georgia stack): headlines, editorial moments.
- `font-sans` (system stack): body copy, UI, labels, captions.
- Scale is expressed via Tailwind's default type scale (`text-sm` …
  `text-7xl`) combined with the two font families above rather than a
  bespoke scale, to keep the system easy to extend in Phase 4.

## Spacing & Layout widths

- `max-w-content` (720px): long-form reading (Insights articles, legal).
- `max-w-wide` (1200px): standard marketing sections.
- `max-w-cinematic` (1600px): full-bleed / hero / architectural imagery.

## Radius

`rounded-sm` (2px) → `rounded-lg` (10px). Deliberately minimal — no
bubbly SaaS-style large radii.

## Motion

`duration-fast` (180ms) UI feedback, `duration-base` (320ms) standard
transitions, `duration-slow` (600ms) section reveals, `duration-cinematic`
(1200ms) large architectural transitions (Phase 4). Easing:
`ease-editorial` (`cubic-bezier(0.22,1,0.36,1)`) for anything premium/slow;
default Tailwind easings elsewhere. All motion must respect
`prefers-reduced-motion` (baseline handled in `globals.css`).

## Global CSS

`app/globals.css` is intentionally minimal: reset, base typography,
scrollbar/selection styling, focus-visible states, and
`prefers-reduced-motion` handling. Component-specific styling belongs in
the component via Tailwind classes, not in global CSS. The previous
3,600+ line `globals.css` (containing stacked "V3" / "VA1" redesign
passes) has been retired — see the Phase 1 report for what was removed.
