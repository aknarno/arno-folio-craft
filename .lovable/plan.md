## AskSeer — Overseer case study additions

Three coordinated edits in `src/lib/i18n.tsx` (EN + PT) and `src/routes/index.tsx`. No new routes, no Work-grid card, no design-token changes.

### 1. Asset

Upload the attached chatbot screenshot via `lovable-assets` and write `src/assets/overseer/askseer.png.asset.json`. Import it in `src/routes/index.tsx` next to the other Overseer images.

### 2. Copy updates in `src/lib/i18n.tsx` (mirrored in EN ~L270 and PT ~L473)

**a. Platform features — acknowledge AskSeer**
Add a new entry to the existing `features[]` array so the chatbot is recognized as a first-class module alongside Document Center, Work Order MX, etc.:

```
{ name: "AskSeer — AI Assistant",
  body: "An AI assistant embedded directly into Overseer that answers aircraft-specific questions, processes uploaded logs, and verifies compliance documentation (ADs, SBs, manuals) without leaving the current screen." }
```

**b. Rebalance the "focus" framing**
The current focus block reads as "focus: Work Order MX". Rewrite `focusTitle` and `focusIntro` so the section frames *two* highlighted features instead of one:

- `focusTitle`: "focus: Work Order MX & AskSeer"
- `focusIntro`: rewritten to ~2 sentences explaining that these are the two modules with the most direct user impact — Work Order MX as the operational backbone, AskSeer as the conversational layer on top of it. The existing 5 numbered decisions remain unchanged (they're Work-Order-specific).

**c. New `askseer` sub-object** appended to `overseer`:

```
askseer: {
  sectionLabel,                              // "a sub-product within Overseer"
  title,                                     // "AskSeer — AI-Powered Maintenance Assistant"
  summary,
  imageCaption,
  challengeTitle, challengeIntro, challengeItems[],   // info overload, compliance complexity, navigation
  solutionTitle, solutionBody,
  featuresTitle,
  askseerFeatures: [{name, body}]            // 4 items: Aircraft Info Retrieval, Log Upload, Compliance Verification, Workflow Assistance
  approachTitle,
  approachItems: [{title, body}]             // 4 items: Workflows, Conversational UX, Context-Aware, Embedded Experience
  impactTitle, impactItems[],                // faster info access, less navigation, compliance visibility, efficiency
  outcomes[]                                 // pill tags
}
```

PT translations written in the same tone as the rest of the `pt` block.

### 3. Layout — `OverseerCase` in `src/routes/index.tsx`

Inserted between the existing report figure (L587) and `<CaseNav />` (L589). All class names already exist on the page, so spacing, typography, and reveal animations stay identical.

```tsx
<div className="askseer-divider reveal" />

<section className="sous-section reveal">
  <p className="sous-meta">{o.askseer.sectionLabel}</p>
  <h2 className="sous-title">{o.askseer.title}</h2>
  <p className="big">{o.askseer.summary}</p>
</section>

<figure className="sous-mockup reveal">
  <img src={askseerShot} alt="AskSeer — embedded AI assistant inside Overseer" loading="lazy" />
  <figcaption className="image-caption">{o.askseer.imageCaption}</figcaption>
</figure>

<section className="sous-section reveal">                {/* Challenge */}
  <h2 className="section-title">{o.askseer.challengeTitle}</h2>
  <p>{o.askseer.challengeIntro}</p>
  <ul className="feature-list">{o.askseer.challengeItems.map(...)}</ul>
</section>

<section className="sous-section reveal">                {/* Solution */}
  <h2 className="section-title">{o.askseer.solutionTitle}</h2>
  <p className="big">{o.askseer.solutionBody}</p>
</section>

<section className="sous-section reveal">                {/* Key Features */}
  <h2 className="section-title">{o.askseer.featuresTitle}</h2>
  <ul className="feature-list">{o.askseer.askseerFeatures.map(...)}</ul>
</section>

<section className="sous-section focus-section reveal">  {/* Design Thinking */}
  <h2 className="section-title">{o.askseer.approachTitle}</h2>
  <ol className="numbered-list">
    {o.askseer.approachItems.map((d, i) => ({ n: String(i + 1).padStart(2, "0"), ...d }))...}
  </ol>
</section>

<section className="sous-section reveal">                {/* Impact */}
  <h2 className="section-title">{o.askseer.impactTitle}</h2>
  <div className="impact-grid">
    <div className="impact-stats">
      {o.askseer.impactItems.map((s) => (
        <div className="impact-stat-card"><p className="impact-org">{s.org}</p><p className="impact-label">{s.label}</p></div>
      ))}
    </div>
  </div>
  <div className="ia-pills">{o.askseer.outcomes.map((t) => <span className="pill">{t}</span>)}</div>
</section>
```

### 4. Minimal CSS

Single rule appended to the overseer-specific CSS block (~L1291) to visually separate the sub-case:

```css
.askseer-divider {
  margin: clamp(4rem, 8vw, 7rem) auto 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-border), transparent);
}
```

### Out of scope

- No new route, no card on the Work grid, no nav changes
- No design-token edits
- No functional chatbot — narrative case study only
- Other case studies untouched

### Verification

- Build passes
- Scroll Overseer page on desktop + mobile: reveals fire, screenshot scales, sections inherit existing spacing
- Toggle EN ↔ PT: every new key renders in both languages
- Platform features list now includes AskSeer; focus section reads as Work Order MX **&** AskSeer
