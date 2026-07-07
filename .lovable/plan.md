
## Overseer copy rewrite — plan

Scope: rewrite the body text of the Overseer project detail page for clarity and scannability. Keep every section, heading, image, layout, and design token exactly as-is. English only (`en.overseer` in `src/lib/i18n.tsx`, lines ~294–384). No changes to PT (`pt.overseer`), no changes to `src/routes/index.tsx`, no component/CSS changes.

### Guidelines applied to every string
- Short, direct sentences. 2–3 sentence chunks max per paragraph.
- Cut hedging, filler, and repetition ("really", "significantly", "the entire", "across a single connected system").
- Lead with the point, then support it.
- Preserve all facts already in the copy: Robinson, Garmin, Work Order MX, AskSeer, web + mobile, MRO users, module numbering, design-system rebuild, floating panel, log upload, AD/SB compliance, hierarchical discrepancies, tooling, status workflow, etc.
- Do NOT invent new facts, numbers, quotes, or capabilities.
- Keep exact same field shape (same array lengths, same keys, same `n` numbering, same `name`/`title`/`body` structure). No added or removed bullets/items.

### Fields to rewrite (all under `en.overseer`)
- `overview`
- `industryHeadline`, `industryBody`
- `dsBody`, `dsInsight`
- `focusIntro`
- `decisions[0..4].body` (Work Order MX — 5 items, titles kept)
- `askseerDecisions[0..4].body` (AskSeer — 5 items, titles kept)
- `workOrder.summary`
- `workOrder.capabilities[0..3].body` (names kept)
- `impactBody`
- `impactStats[0..1].label` (org names kept)
- `askseer.summary`
- `askseer.imageCaption`
- `askseer.challengeIntro`
- `askseer.challengeItems[0..2].body` (names kept)
- `askseer.solutionBody`
- `askseer.askseerFeatures[0..3].body` (names kept)
- `askseer.approachItems[0..3].body` (titles kept)
- `askseer.impactItems[0..3].label` (org kept)

Section headings, labels (`focusTitle`, `dsTitle`, `impactTitle`, `sectionLabel`, `capabilitiesTitle`, etc.), pills, stats values, and `outcomes` chips stay untouched — they already read as short, scannable chips/labels.

### Out of scope
- No changes to layout, grid alignment, images, or the 2×2 impact grid.
- No changes to PT translations, other projects, or shared components.
- No structural renaming or merging into "overview/problem/process/solution".

### Verification
- Read the updated `en.overseer` block back and confirm array lengths and keys match the TypeScript `Copy` interface.
- Rely on the automatic build to confirm no type errors.
