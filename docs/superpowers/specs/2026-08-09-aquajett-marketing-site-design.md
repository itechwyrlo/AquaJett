# Aquajett Water Heaters — Marketing Website Design

Date: 2026-08-09
Status: Approved (pending final user read-through)
Project root: `c:\Users\Wyrlo\projects\Aquajett\aquajett` (existing Vite + React + TS scaffold)

## 1. Purpose

Build a premium, production-quality one-page marketing website for Aquajett Water
Heaters Trading inside the existing Vite/React/TypeScript scaffold. The full
functional/content/visual requirements are specified in the user's original brief
(48 numbered sections, reproduced in full in the conversation that produced this
document — treated here as the binding source of truth for content, copy, colors,
motion behavior, and structure). This design doc captures the technical and
architectural decisions needed to turn that brief into an implementation plan, plus
the resolutions to the open questions the brief left unanswered.

**Source of truth for content**: the user's spec text only. No external business
material exists or will be looked up. Anything not explicitly stated in the spec
(prices, warranty, technical specs, testimonials, install duration, payment methods,
etc.) is NOT invented — the relevant UI directs the visitor to contact Aquajett
instead.

## 2. Current project state (verified by inspection)

- Vite 8 + React 19 + TypeScript, scaffolded via the standard `react-ts` template.
- Dependencies: `react`, `react-dom` only. Dev deps: `@vitejs/plugin-react`, `oxlint`,
  `typescript`, `@types/*`. No CSS framework, no router, no animation library, no
  state-management library.
- Styling: plain CSS with `:root` custom properties in `index.css`, plus a
  component-scoped `App.css`. No CSS Modules, no Tailwind, no Sass configured (Vite
  supports CSS Modules natively with zero extra dependency if we choose to use them).
- `src/App.tsx`, `src/App.css`, `src/index.css` contain only Vite/React starter
  boilerplate (counter demo, Vite/React links) — no real Aquajett content. These will
  be replaced entirely.
- `public/icons.svg` is a starter sprite (GitHub/Discord/X/Bluesky/doc icons) used by
  the boilerplate — irrelevant to Aquajett content, will be removed.
- **Real Aquajett assets present**: `src/assets/aquajett-primary-logo.png` (full
  lockup — deep-blue "AquaJett" wordmark + red "Water Heaters" sub-wordmark),
  `src/assets/aquajett-mark.png` (blue triangular "A" monogram with a wave cutout),
  `src/assets/aquajett-favicon.png`. **No product photos, no installation photos, no
  hero/lifestyle imagery exist in the project or anywhere located during search.**
- Not a git repository. Per the user's explicit instruction (spec §47: "Do not
  commit changes"), no commits will be made at any point in this build, and no git
  init will be performed.

## 3. Resolved open questions

| Question | Resolution |
|---|---|
| No product/installation/hero photos exist | Build with a reusable placeholder-imagery system now (§7). Data files carry an optional `image` field so real photos can be dropped in later with no component changes. |
| Is the spec text the complete source of truth? | Yes — confirmed by user. No other business material exists or will be sought. |
| Icon sourcing | Add `lucide-react` (small, tree-shakeable — only imported icons are bundled) rather than hand-drawing an SVG sprite. |
| Styling approach | CSS Modules (`Component.module.css`), native Vite support, zero new dependency, automatic scoping across ~25+ components. Global tokens/resets/animations live in plain (non-module) CSS files imported once in `main.tsx`. |
| Typeface | No typeface was specified in the brief. Selecting **Plus Jakarta Sans** (headings) + **Inter** (body), both self-hosted as variable-font `.woff2` in `src/assets/fonts/`, loaded via local `@font-face` (no runtime Google Fonts request). Chosen for a warm-but-confident "premium appliance brand" feel that avoids the generic all-Inter SaaS look the brief warns against. |
| Routing | None. Single scrolling page; nav items are anchor links with smooth scroll (respecting `prefers-reduced-motion`). |
| SEO head management | Static `<title>`/meta description set directly in `index.html`; `LocalBusiness` JSON-LD embedded in `index.html` using only verified business fields (name, address, phone, email, url, sameAs → Facebook). No react-helmet dependency needed for a single static page. |

## 4. Business information (verbatim, for reference)

- Name: Aquajett Water Heaters Trading
- Website: aquajettwaterheaters.com
- Description: "Aquajett Water Heaters Trading was put up to supply your water
  heater needs in the South, Metro Manila and nationwide."
- Address: Unit R Level 2 CM 1 Amable Bldg., Sta. Rosa Heights, Brgy. Puting Kahoy,
  Silang, Cavite, Sta. Rosa - Tagaytay Road
- Phone: (049) 539 5785
- Mobile: +63 915 500 0830
- Email: aquajett.sales@gmail.com
- Facebook: https://www.facebook.com/aquajett.tagaytay/ (~930 followers at time of
  writing — rendered as approximate/non-authoritative copy, not hardcoded as a
  permanent stat; do not present as live/real-time)

## 5. Design tokens (`src/styles/tokens.css`)

Colors exactly as specified:

```css
:root {
  --color-primary: #073B5C;
  --color-primary-dark: #052B43;
  --color-accent: #00AFC1;
  --color-accent-light: #DDF7FA;
  --color-background: #F5F9FB;
  --color-white: #FFFFFF;
  --color-text: #102A43;
  --color-text-secondary: #526777;
  --color-border: #D9E5EA;
  --color-success: #16845B;
}
```

Usage ratio target: ~60% light/neutral surfaces, ~30% deep blue/dark text, ~10% aqua
accent (aqua guides attention, does not dominate).

Note: the supplied logo's "Water Heaters" wordmark is printed in red. The logo file
is used as-is (real brand asset, untouched) but red is not introduced anywhere else
in the site's palette — the site strictly uses the blue/aqua/neutral system above.

Additional token groups, all centralized (no hardcoded values in components):
- **Spacing scale**: 4/8/12/16/24/32/48/64/96/128 (px, as `--space-*` rem-based
  tokens).
- **Radius scale**: `--radius-sm/md/lg` (moderate — brief explicitly warns against
  excessive rounding).
- **Shadow scale**: `--shadow-sm/md/lg`, soft and low-opacity.
- **Transitions**: `--duration-fast` (180ms), `--duration-standard` (300ms),
  `--duration-large` (550ms), `--duration-ambient` (5s); easing
  `--ease-out`/`--ease-in-out`.
- **Container widths**: `--container-max: 1280px`.
- **Breakpoints**: documented as CSS custom media comments (native CSS custom media
  isn't broadly supported without a plugin, so breakpoints are expressed as literal
  `min-width` values matching 375/576/768/992/1200/1440/1920 in each component's
  module, with 320px as the unconditional mobile-first base).

Typography scale: hero heading `clamp(2.5rem, 7vw, 5.5rem)`, section heading
`clamp(2rem, 4vw, 3.5rem)`, body `1rem`–`1.125rem`, comfortable line-height,
constrained measure (~65ch max) on body copy blocks.

## 6. Component architecture

```text
src/
├── assets/
│   ├── fonts/                  Plus Jakarta Sans + Inter (woff2, self-hosted)
│   ├── logo/                   moved: aquajett-primary-logo.png, aquajett-mark.png, aquajett-favicon.png
│   └── images/
│       ├── hero/                README.md — drop real hero/lifestyle photo here
│       ├── products/             README.md — drop real product photos here
│       ├── installations/        README.md — drop real installation photos here
│       └── general/              README.md — misc future imagery
├── components/
│   ├── layout/
│   │   ├── Header.tsx / .module.css
│   │   ├── Footer.tsx / .module.css
│   │   └── MobileContactBar.tsx / .module.css
│   ├── navigation/
│   │   └── MobileMenu.tsx / .module.css
│   ├── hero/
│   │   └── Hero.tsx / .module.css
│   ├── products/
│   │   ├── ProductSection.tsx
│   │   ├── ProductCard.tsx
│   │   └── ProductComparison.tsx   (Singlepoint vs Multipoint interactive visual)
│   ├── installations/
│   │   ├── InstallationGallery.tsx
│   │   ├── InstallationCard.tsx
│   │   └── Lightbox.tsx
│   ├── sections/
│   │   ├── Benefits.tsx        (emotional: comfort/warmth/relaxation/cleanliness/reliability/confidence)
│   │   ├── Features.tsx        (concrete documented product features)
│   │   ├── InstallationProcess.tsx  (Choose→Contact→Discuss→Delivery&Install→Enjoy)
│   │   ├── Coverage.tsx
│   │   ├── About.tsx
│   │   ├── FAQ.tsx
│   │   └── FinalCTA.tsx
│   └── ui/
│       ├── Button.tsx          (primary/secondary/ghost/dark variants)
│       ├── SectionHeading.tsx
│       ├── Container.tsx
│       ├── ImagePlaceholder.tsx
│       └── RevealOnScroll.tsx  (wraps useScrollReveal for declarative use)
├── data/
│   ├── products.ts
│   ├── installations.ts
│   ├── faq.ts
│   └── nav.ts
├── hooks/
│   ├── useScrollReveal.ts      (IntersectionObserver-based)
│   ├── useMediaQuery.ts
│   └── useLockBodyScroll.ts    (mobile menu + lightbox open state)
├── styles/
│   ├── tokens.css
│   ├── globals.css             (resets, base type, focus-ring utility)
│   └── animations.css          (shared @keyframes + reveal utility classes)
├── App.tsx
└── main.tsx
```

Page composition in `App.tsx` (single scroll, in order):

`Header` → `Hero` → `ProductSection` (cards + `ProductComparison`) → `Benefits` →
`Features` → `InstallationProcess` → `InstallationGallery` → `Coverage` → `About` →
`FAQ` → `FinalCTA` → `Footer`, with `MobileContactBar` rendered as a fixed
mobile-only overlay outside the normal section flow.

Nav anchors (`data/nav.ts`) map to section ids: Products → `#products`, Services →
`#installation-process`, Installations → `#gallery`, About → `#about`, FAQ → `#faq`,
Contact → `#contact`.

## 7. Placeholder imagery system

Since no real photography exists yet, every image slot must look intentionally
designed rather than broken/missing:

- `ImagePlaceholder` component: an angled, low-saturation aqua-to-deep-blue gradient
  panel with a centered `lucide-react` line icon (context-appropriate — water drop
  for hero, appliance-type icon for product cards, map-pin/home icon for gallery
  cards) at reduced opacity, plus a subtle repeating diagonal-line texture. Carries
  `data-placeholder="true"` in the DOM for easy discovery later, but no visible
  "placeholder" label in the rendered UI (keeps the page looking finished).
- Every content entry in `data/products.ts` and `data/installations.ts`, and the
  hero's image slot, has an optional `image?: string` field. When absent, the
  relevant component renders `ImagePlaceholder` with the same box size, radius, and
  hover/reveal treatment as a real `<img>` would get. When a real path is supplied
  later, only the data file changes — no component/layout edits required.
- Hero, product cards, and gallery all keep identical crop/aspect-ratio containers
  regardless of whether the placeholder or a real photo is active, so swapping in
  real assets later causes no layout shift.

## 8. Content data (drawn only from the supplied spec)

**Products** (`data/products.ts`) — 3 entries: SUPREME V2 Singlepoint, SUPREME V2
Multipoint, EXTREME/B V2 Multipoint. Intended use: Singlepoint → one shower point;
Multipoint → multiple water fixtures. Common documented features: fully automatic
operation, adjustable temperature, temperature indicator, temperature selector,
splash-proof casing. Additional features attributed **only** to the two documented
Multipoint models: IPX4 rating, standard installation fittings included — not
attributed to Singlepoint, since the brief scopes those to "documented multipoint
models." CTA: "Ask About This Model."

**Installations** (`data/installations.ts`) — the 14 named locations from the brief,
verbatim: Uptown Place Tower 3 (BGC, Taguig City), Regency Executive Townhomes
(Dasmariñas, Cavite), Paws & Play Pet Hotel by Village Vet (South Forbes, Silang,
Cavite), Royale Tagaytay Estates (Alfonso, Cavite), Green 2 Residences by SMDC
(Dasmariñas, Cavite), Bellavita Subdivision (General Trias, Cavite), North
Greenhills (San Juan City), Margaret Homes (Sta. Maria, Bulacan), Sta. Rosa Heights
Subdivision (Silang, Cavite), Tagaytay Country Homes 3, Kaytambog (Indang, Cavite),
Wind Residences Tagaytay, Project 4 (Quezon City), Kasa Luntian Tagaytay by Alveo
Land. No product is attributed to any specific location (not documented in the
brief). No endorsement by any named property/organization is implied anywhere in
copy.

**FAQ** (`data/faq.ts`) — questions restricted to confirmed facts only:
1. What areas does Aquajett serve? → South, Metro Manila, and nationwide (product
   supply).
2. What's the difference between Singlepoint and Multipoint water heaters? → one
   shower point vs. multiple fixtures.
3. Does Aquajett install the water heaters it sells? → yes, delivery & installation
   service (process steps as documented).
4. What features do Aquajett water heaters have? → the documented feature list
   (§8 above), scoped correctly per model.
5. What about pricing, warranty, or payment options? → not published here — directs
   the visitor to call/message/email Aquajett directly. (Explicitly does NOT
   fabricate a number or policy.)
6. How can I reach Aquajett? → phone, mobile, email, Facebook, address.

## 9. Motion system

- Shared `@keyframes` in `styles/animations.css`: fade-up, scale-in, steam-drift,
  water-flow-dash (for the Singlepoint/Multipoint comparison), float-particle.
- `useScrollReveal` hook: IntersectionObserver-based, adds a reveal class once an
  element enters the viewport (one-shot, unobserves after triggering). Small
  movement distances (20–40px), never 100px+. Related content is grouped into single
  reveal units rather than animating every child independently.
- Page-load entrance sequence on the hero only, staggered per the brief's timing
  (background 0ms → product 100ms → heading 200ms → description 300ms → CTA 400ms →
  decorative 500ms).
- All animation uses `transform`/`opacity` (and `clip-path` where called for);
  nothing animates `width`/`height`/`top`/`left`.
- `prefers-reduced-motion: reduce` — ambient motion, parallax, and large transforms
  are stripped; scroll reveals degrade to simple opacity fades; page-load sequence
  collapses to near-instant.

## 10. Accessibility

Semantic HTML throughout (real `<button>`/`<a>`, landmark elements, heading
hierarchy). Visible aqua focus ring (`outline: 3px solid rgba(0,175,193,0.25);
outline-offset: 3px`) on every interactive element, never removed without
replacement. FAQ accordion is keyboard-operable with correct ARIA
(`aria-expanded`, `aria-controls`) and animates height via a measured-content
technique (no `height: auto` transition hacks that break on content changes).
Mobile menu traps focus while open and restores focus on close. All images either
have empty `alt=""` (decorative) or descriptive `alt` text (informative/gallery
images) — never missing.

## 11. Performance & SEO

- `loading="lazy"` on all below-the-fold images (product cards, gallery); hero image
  (or its placeholder) loads eager/unlazy since it's above the fold.
- No animation JS loops — CSS transitions/keyframes + one shared IntersectionObserver
  instance pattern.
- `index.html`: title "Aquajett Water Heaters | Water Heater Supply & Installation",
  meta description as specified, `LocalBusiness` JSON-LD with only verified fields.
  Section copy naturally incorporates the specified phrases (water heater
  Philippines/Cavite/Silang/Tagaytay, installation, supplier, singlepoint,
  multipoint) without keyword stuffing.

## 12. Explicit non-goals / guardrails

No backend, no auth, no database, no ecommerce checkout. **No contact form is built
at all** — the brief's contact actions (§31) are satisfied entirely with `tel:`,
`mailto:`, the Facebook link, and a maps/directions link, none of which need a
submission handler or backend. This sidesteps the fake-form-submission trap by
construction. No fabricated prices/specs/warranty/certifications/reviews/history/
stats, no commits, no git init, no deletion of the existing logo assets, no new
large dependencies beyond `lucide-react`.
