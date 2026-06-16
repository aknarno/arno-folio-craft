# Overseer page restructure

Goal: present Work Order MX and AskSeer as two parallel, equally-weighted modules on the Overseer case page, with matching structure and a side-by-side decisions comparison.

## 1. "My contribution" stat (i18n EN + PT)

In `overseer.stats`, update the `my contribution` card:
- EN value: `"Work Order MX & AskSeer"` — sub: `"plus supporting features and design system"`
- PT value: `"Work Order MX & AskSeer"` — sub: `"mais recursos de apoio e design system"`

## 2. Remove "Platform features" section

- In `src/routes/index.tsx`, delete the `<section>` rendering `o.featuresTitle / featuresIntro / features` (lines 522–533).
- In `src/lib/i18n.tsx`, remove `featuresTitle`, `featuresIntro`, and the `features[]` array from the `overseer` type and from both EN and PT copy blocks.

## 3. Remove labor report image

- In `src/routes/index.tsx`, delete the `<figure>` at lines 585–588 (`overseerReport` image + `reportCaption`).
- Remove the `overseerReport` import (line 10).
- Remove `reportCaption` from the `overseer` type and from EN/PT copy.
- Leave the asset file on disk (no other refs); no need to delete it.

## 4. Side-by-side decisions grid

Replace the existing single `numbered-list` inside the "focus: Work Order MX & AskSeer" section with a two-column grid:

```text
focus: Work Order MX & AskSeer
[ intro paragraph — slightly rewritten so it no longer says "the decisions below trace the Work Order architecture; the AskSeer case follows later" ]

┌────────────── Work Order MX ──────────────┬────────────── AskSeer ──────────────┐
│ 01 Work order as single source of truth   │ 01 Conversational layer, not module  │
│ 02 Hierarchical discrepancy list          │ 02 Context-aware to current aircraft │
│ 03 Labor visibility for supervisors       │ 03 In-chat log upload & processing   │
│ 04 Tooling allocation                     │ 04 Compliance verification in seconds│
│ 05 Status workflow                        │ 05 Embedded floating panel           │
└────────────────────────────────────────────┴───────────────────────────────────────┘
```

i18n changes:
- Keep `overseer.decisions` (Work Order) as-is.
- Add `overseer.askseerDecisions: CardCopy[]` (5 entries, EN + PT) sourced from the existing AskSeer approach/solution content so both columns have 5 numbered items of comparable weight.
- Add two short column headers: `decisionsWorkOrderLabel` / `decisionsAskseerLabel` (EN: "Work Order MX" / "AskSeer", PT equivalents).
- Rewrite `focusIntro` so it frames the comparison instead of deferring AskSeer to "later on the page".

Markup change in `OverseerCase`:
- Replace the single `<ol className="numbered-list">` with a `<div className="decisions-compare">` containing two columns; each column has an `<h3>` header and its own `<ol className="numbered-list">`.

CSS in the overseer-specific block:
```css
.decisions-compare { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 4vw, 4rem); }
.decisions-compare h3.compare-head { /* small uppercase label, matches sous-meta */ }
@media (max-width: 760px) { .decisions-compare { grid-template-columns: 1fr; } }
```

## 5. Parallel Work Order MX / AskSeer sections

Restructure the page so each module gets its own clearly-labelled block with the same shape: section label, title, mockups, capabilities, impact.

New order inside `OverseerCase` after the design-system section:

1. `focus: Work Order MX & AskSeer` intro + side-by-side decisions grid.
2. `askseer-divider`.
3. **Work Order MX** sous-section:
   - `sous-meta`: "module 01 of 02"
   - `sous-title`: "Work Order MX"
   - `big` summary paragraph (new short copy — reuses themes from current impactBody + focusIntro).
   - Figures: `overseerDetail`, `overseerList`.
   - `feature-list` "key capabilities" — 4 items derived from the existing decisions (single source of truth, hierarchical discrepancies, labor visibility, tooling + status).
   - `impact-grid` with `impactBody` + `impactStats` (Robinson / Garmin) + outcomes pills (kept).
4. `askseer-divider`.
5. **AskSeer** sous-section (existing block, kept structurally identical to Work Order MX):
   - section label / title / summary
   - screenshot figure
   - challenge `feature-list`
   - solution paragraph
   - capabilities `feature-list`
   - approach numbered list (kept — distinct from the comparison grid; it explains how AskSeer was designed)
   - impact grid + outcomes pills
6. `CaseNav`.

i18n adds (EN + PT):
- `overseer.workOrder`: `{ sectionLabel, title, summary, capabilitiesTitle, capabilities: { name, body }[] }` — 4 capability items.
- Tweak `askseer.sectionLabel` to "module 02 of 02" so the two modules read as a matched pair.

No backend, no new routes, no design-token changes. All styling reuses existing classes; only the new `.decisions-compare` grid rule is added.

## Files touched
- `src/lib/i18n.tsx` — types + EN + PT copy.
- `src/routes/index.tsx` — `OverseerCase` JSX + import cleanup + CSS rule for `.decisions-compare`.
