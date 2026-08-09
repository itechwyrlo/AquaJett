# Product photos and simplified product cards

## Context

The three placeholder-era product photos (`AQUAJET_EXTREME.jpg`, `AQUAJET_SUPREME_V2.jpg`,
`AQUAJET_SUPREME_BLACK_EDITION.jpg`) have been deleted. Real Aquajett product spec-sheet scans
for all 9 current models were dropped into `src/assets/images/products/`: Classic SP, Deluxe MP,
Extreme SP, Grande MP, Grande SP, Paradigm SP, Premium MP, Supreme MP, Supreme SP.

## Goals

- Replace the product card photos with real unit photos, extracted from the spec-sheet scans.
- Remove the color-variant picker (Black Edition swatch) — it no longer applies to the real lineup.
- Show the unit's specs and features as marketing copy on the card.

## Image pipeline

Each scan is a full letterhead page: header, one framed studio photo of the unit (black backdrop
for 7 of the 9; plain white backdrop for the 2 Supreme scans), the model title, then
SPECIFICATIONS/FEATURES text. For each scan:

1. Locate the framed photo region (connected-component analysis of the backdrop color, distinct
   from the page's white/light-blue-gradient background and small body text).
2. Key out the backdrop by color-distance threshold from the sampled backdrop color, clean the
   resulting mask (fill small interior holes from reflections, keep only the largest connected
   component so stray specks are dropped), and trim tight to the unit + its accessories (shower
   head, riser bar, etc. — whatever is in frame).
3. Apply plain photographic enhancement only: auto-contrast, mild sharpening. No generative fill,
   no added elements.
4. Save as a transparent-background PNG: `src/assets/images/products/aquajett-<model>-<version>.png`.

Each cutout is visually re-inspected before being wired into the data file. Raw scans are deleted
from the repo once their corresponding cutouts are confirmed and in use.

## Data model (`src/data/products.ts`)

Drop `ColorVariant` and the color list entirely. Group into 7 `ProductLine` entries; Grande and
Supreme keep their MP/SP split as `VersionOption`s (tab selector, no color row), the other 5
models (Classic, Deluxe, Extreme, Paradigm, Premium) get a single version each.

```ts
export interface VersionOption {
  id: string; // 'mp' | 'sp'
  label: string; // 'MP' | 'SP'
  image: string; // cutout PNG
  details: string; // single paragraph: specs + features combined
}

export interface ProductLine {
  id: string;
  name: string; // 'Aquajett Grande'
  intendedUse: string; // short marketing tagline, one per line
  versions: VersionOption[];
}
```

`details` is curated for a customer-facing card, not the full installer datasheet: Type, Power
rating, Flow rate, Dimensions, followed by the Features bullets folded into prose. Wire
gauge/breaker amperage are omitted as installer-only detail.

## Component changes (`ProductCard.tsx` + `.module.css`)

- Remove the color swatch row and its `colorId` state.
- Keep the version tab row only where a line has more than one version (Grande, Supreme).
- `.imageBox` switches from `object-fit: cover` to `object-fit: contain` on a light neutral panel
  background, since cutouts are transparent and shouldn't be cropped by a `cover` box sized for
  opaque rectangular photos.
- The features `<ul>` is replaced with a single `<p className={styles.details}>{version.details}</p>`.

## Out of scope

- `ProductComparison.tsx` (the singlepoint/multipoint diagram) does not consume product data and
  is unaffected.
