import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import sousCover from "@/assets/sous/cover.png";
import sousDesignSystem from "@/assets/sous/design-system.png";
import sousMockup from "@/assets/sous/mockup.png";
import sousStepByStep from "@/assets/sous/step-by-step.png";
import overseerCover from "@/assets/overseer/cover.png";
import overseerList from "@/assets/overseer/work-order-list.png";
import overseerDetail from "@/assets/overseer/work-order-detail.png";
import overseerReport from "@/assets/overseer/labor-report.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Arno Klettenberg — UX/UI Designer" },
      {
        name: "description",
        content:
          "Portfolio of Arno Klettenberg — UX/UI designer crafting quiet, content-first digital products.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Quicksand:wght@700&family=Open+Sans:wght@300..700&display=swap",
      },
    ],
  }),
});

type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  summary: string;
  tags: string[];
  cover: string;
  intro?: string;
  sections?: { heading: string; body: string }[];
};

const projects: Project[] = [
  {
    slug: "replenishment-dashboard",
    title: "replenishment dashboard",
    client: "northwind retail",
    year: "2025",
    role: "lead product designer",
    summary:
      "a calm, data-dense interface that helps planners forecast stock without drowning in numbers.",
    tags: ["enterprise", "data viz", "design system"],
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    intro:
      "northwind's planning team manages thousands of skus across 40 stores. the legacy tool buried them in spreadsheets. we rebuilt the experience around a single question: what needs my attention today?",
    sections: [
      {
        heading: "the problem",
        body: "planners spent the first 90 minutes of every day rebuilding context — pulling reports, cross-checking inventory, mentally flagging risk. the retailer's growth made the old workflow untenable.",
      },
      {
        heading: "approach",
        body: "we shadowed planners for two weeks, mapped their decision points, and prototyped a triage-first dashboard. every screen now opens with prioritized actions instead of raw tables.",
      },
      {
        heading: "outcome",
        body: "time-to-first-decision dropped from 47 minutes to under 6. forecast accuracy improved 12% in the first quarter post-launch.",
      },
    ],
  },
  {
    slug: "design-system-foundation",
    title: "design system foundation",
    client: "terra studio",
    year: "2024",
    role: "product designer",
    summary:
      "a note-taking app for field researchers, designed for one-handed use in unpredictable conditions.",
    tags: ["mobile", "ios", "research"],
    cover:
      "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&w=1600&q=80",
    intro:
      "built for biologists and geologists working far from connectivity. the interface had to survive gloves, rain, and bright sunlight.",
    sections: [
      {
        heading: "constraints",
        body: "offline-first. glove-friendly tap targets. legible at noon in the desert and at dusk in the forest. battery efficient.",
      },
      {
        heading: "design choices",
        body: "high-contrast typography, oversized touch zones, voice-capture as the primary input. sync happens silently when signal returns.",
      },
    ],
  },
  {
    slug: "onboarding-flow-redesign",
    title: "onboarding flow redesign",
    client: "harbor financial",
    year: "2024",
    role: "senior ux designer",
    summary:
      "reimagining personal banking for people who'd rather think about anything else.",
    tags: ["fintech", "web", "brand"],
    cover:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    intro:
      "harbor wanted to be the bank that respects your time. we translated that promise into every screen — fewer numbers, more meaning.",
    sections: [
      {
        heading: "principles",
        body: "show the answer, not the data. default to plain language. never use red unless something is genuinely wrong.",
      },
    ],
  },
  {
    slug: "sous",
    title: "sous — just-in-time cooking",
    client: "portfolio project",
    year: "2025",
    role: "ux/ui designer",
    summary:
      "a just-in-time cooking assistant for busy beginners — no pantry database, no decision fatigue, just dinner.",
    tags: ["mobile", "ux design", "product concept"],
    cover: sousCover,
  },
  {
    slug: "overseer",
    title: "overseer — aircraft maintenance management",
    client: "portfolio project",
    year: "2024",
    role: "ux/ui designer",
    summary:
      "a web-based mro platform that consolidates work orders, discrepancies, labor reporting and compliance into a single focused workspace.",
    tags: ["b2b saas", "web & mobile", "mro platform", "ux design", "design system"],
    cover: overseerCover,
  },
];


const tools = [
  { name: "figma", slug: "figma" },
  { name: "jira", slug: "jira" },
  { name: "notion", slug: "notion" },
  { name: "miro", slug: "miro" },
  { name: "claude", slug: "claude" },
];

function useHashRoute() {
  const [hash, setHash] = useState(() =>
    typeof window === "undefined" ? "home" : window.location.hash.replace(/^#/, "") || "home"
  );
  useEffect(() => {
    const onHash = () =>
      setHash(window.location.hash.replace(/^#/, "") || "home");
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash;
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = root.querySelectorAll<HTMLElement>(".reveal");
    if (reduced) {
      nodes.forEach((n) => n.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  });
  return ref;
}

function Index() {
  const hash = useHashRoute();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const m = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(m.matches ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [hash]);

  const revealRef = useReveal();

  let view: "home" | "projects" | "contact" | "project" = "home";
  let projectSlug = "";
  if (hash === "projects") view = "projects";
  else if (hash === "contact") view = "contact";
  else if (hash.startsWith("project/")) {
    view = "project";
    projectSlug = hash.split("/")[1];
  }

  return (
    <>
      <style>{styles}</style>
      <div className="site" ref={revealRef} key={hash}>
        <header className="nav">
          <div className="nav-left">
            <a href="#home" className="nav-brand" aria-label="Arno Klettenberg — Home">
              <span className="nav-brand-name">arno klettenberg</span>
              <span className="nav-brand-title">ux/ui designer</span>
            </a>
            <button
              className="theme-toggle"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              title="toggle theme"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? "☾" : "☀"}
            </button>
          </div>
          <nav>
            <a
              href="#projects"
              className={view === "projects" || view === "project" ? "active" : ""}
            >
              work
            </a>
            <a href="#home" className={view === "home" ? "active" : ""}>
              about
            </a>
            <a href="#contact" className={view === "contact" ? "active" : ""}>
              contact
            </a>
          </nav>
        </header>

        <main>
          {view === "home" && <Home />}
          {view === "projects" && <Projects />}
          {view === "contact" && <Contact />}
          {view === "project" && <ProjectDetail slug={projectSlug} />}
        </main>

        <footer className="footer">
          <p className="footer-left">© 2026 arno klettenberg</p>
          <div className="footer-right">
            <a href="https://www.linkedin.com/in/arno-klettenberg-neto-b987a818a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">↗ linkedin</a>
            <a href="mailto:arnoklettenbergneto@gmail.com">arnoklettenbergneto@gmail.com</a>
          </div>
        </footer>
      </div>
    </>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow reveal">portfolio · 2016 — 2026</p>
        <h1 className="reveal">designing experiences that feel effortless.</h1>
        <p className="lede reveal">ux/ui designer based in curitiba, brazil.</p>
        <div className="actions reveal">
          <a className="btn" href="#projects">view work →</a>
          <a className="btn ghost" href="#contact">get in touch</a>
        </div>
      </section>

      <section className="section about">
        <h2 className="section-title reveal">about</h2>
        <p className="reveal big">
          around ten years designing for international clients — from livestock
          and agriculture platforms to real-time aircraft intelligence systems.
          most recently as lead designer at tekna.rocks, where i led research,
          prototyping and final ui across long-term saas engagements.
        </p>
        <div className="about-grid reveal">
          <div>
            <p className="kicker">education</p>
            <p>bachelor of industrial design — puc-pr, curitiba.</p>
            <p className="muted small">specialization in design trend watching.</p>
          </div>
          <div>
            <p className="kicker">toolkit</p>
            <div className="toolkit-list">
              {tools.map((t) => (
                <div className="toolkit-item" key={t.slug}>
                  <img
                    src={`https://cdn.simpleicons.org/${t.slug}`}
                    alt={t.name}
                    width={20}
                    height={20}
                    loading="lazy"
                  />
                  <span>{t.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="kicker">languages</p>
            <p>portuguese (native) · english (fluent)</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title reveal">selected work</h2>
        <div className="project-list">
          {projects.map((p) => (
            <a key={p.slug} href={`#project/${p.slug}`} className="project-card reveal">
              <div className="project-cover">
                <img
                  src={p.cover}
                  alt={p.title}
                  width={1600}
                  height={1000}
                  loading="lazy"
                />
              </div>
              <div className="project-meta">
                <div>
                  <h3>{p.title}</h3>
                  <p className="muted">{p.summary}</p>
                </div>
                <p className="muted small">{p.client} · {p.year}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function Projects() {
  return (
    <section className="section">
      <p className="eyebrow reveal">work · {projects.length} selected</p>
      <h1 className="reveal">projects</h1>
      <div className="project-list">
        {projects.map((p) => (
          <a key={p.slug} href={`#project/${p.slug}`} className="project-card reveal">
            <div className="project-cover">
              <img src={p.cover} alt={p.title} width={1600} height={1000} loading="lazy" />
            </div>
            <div className="project-meta">
              <div>
                <h3>{p.title}</h3>
                <p className="muted">{p.summary}</p>
              </div>
              <p className="muted small">{p.client} · {p.year} · {p.role}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section narrow">
      <p className="eyebrow reveal">contact</p>
      <h1 className="reveal">let's talk.</h1>
      <p className="lede reveal">
        i'm open to new projects and collaborations. if you're working on
        something thoughtful — wherever you are in the world — i'd love to hear
        about it.
      </p>
      <div className="contact-grid reveal">
        <div>
          <p className="muted small">email</p>
          <a className="big-link" href="mailto:arnoklettenbergneto@gmail.com">arnoklettenbergneto@gmail.com</a>
        </div>
        <div>
          <p className="muted small">phone / whatsapp</p>
          <a className="big-link" href="tel:+5541992574885">+55 41 99257-4885</a>
        </div>
        <div>
          <p className="muted small">based in</p>
          <p className="big-link as-text">curitiba, pr — brazil</p>
        </div>
        <div>
          <p className="muted small">elsewhere</p>
          <a className="big-link" href="https://www.linkedin.com/in/arno-klettenberg-neto-b987a818a/" target="_blank" rel="noopener noreferrer">↗ linkedin</a>
        </div>
      </div>
    </section>
  );
}

function ProjectDetail({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return (
      <section className="section narrow">
        <p className="eyebrow">not found</p>
        <h1>that project doesn't exist.</h1>
        <p className="lede"><a href="#projects">← work</a></p>
      </section>
    );
  }
  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  if (slug === "sous") {
    return <SousCase prev={prev} next={next} />;
  }

  if (slug === "overseer") {
    return <OverseerCase prev={prev} next={next} />;
  }

  return (
    <article className="section narrow">
      <a href="#projects" className="back-link reveal">← work</a>
      <p className="eyebrow reveal">{project.client} · {project.year}</p>
      <h1 className="reveal">{project.title}</h1>
      <p className="lede reveal">{project.summary}</p>

      <dl className="meta-grid reveal">
        <div><dt>client</dt><dd>{project.client}</dd></div>
        <div><dt>year</dt><dd>{project.year}</dd></div>
        <div><dt>role</dt><dd>{project.role}</dd></div>
        <div><dt>tags</dt><dd>{project.tags.join(" · ")}</dd></div>
      </dl>

      <div className="project-cover wide reveal">
        <img src={project.cover} alt={project.title} width={1600} height={1000} loading="lazy" />
      </div>

      {project.intro && <p className="big reveal">{project.intro}</p>}

      {project.sections?.map((s) => (
        <div key={s.heading} className="case-section reveal">
          <h2>{s.heading}</h2>
          <p>{s.body}</p>
        </div>
      ))}

      <div className="project-nav reveal">
        {prev ? <a href={`#project/${prev.slug}`} className="big-link">← previous project</a> : <span />}
        {next ? <a href={`#project/${next.slug}`} className="big-link">next project →</a> : <a href="#projects" className="big-link">all work →</a>}
      </div>
    </article>
  );
}

function SousCase({ prev, next }: { prev: Project | null; next: Project | null }) {
  const stats = [
    { label: "target user", value: "busy beginner", sub: "cooks 1–2× a week" },
    { label: "core constraint", value: "≤ 15 sec", sub: "time to first recipe match" },
    { label: "app pillars", value: "4 screens", sub: "cook · saved · habits · profile" },
    { label: "project type", value: "concept", sub: "end-to-end ux design" },
  ];
  const pains = [
    { eyebrow: "pain 01", title: "the inventory tax", body: "traditional cooking apps demand tedious ingredient logging. after an 8-hour workday, that 'tax' is higher than the benefit — users abandon the app and order delivery." },
    { eyebrow: "pain 02", title: "decision fatigue", body: "thousands of recipes look like a feature. for a tired beginner, it's a wall. browsing for the 'right' meal burns the same energy needed to cook it." },
    { eyebrow: "pain 03", title: "fear of failure", body: "missing one herb feels like a dead end. without 'chef's intuition,' beginners assume a recipe is broken instead of adaptable." },
    { eyebrow: "pain 04", title: "the hostile kitchen", body: "cooking happens in glare, with wet or messy hands. an interface designed for the couch fails the moment hands touch food." },
  ];
  const decisions = [
    { n: "01", title: "zero inventory model", body: "no pantry database to maintain. ingredients are entered fresh at the moment of cooking. a 15-second input, not a 15-minute setup." },
    { n: "02", title: "time-first matching", body: "the time slider is the first input. 'i have 20 minutes' becomes the starting point, not a constraint added after browsing." },
    { n: "03", title: "mise en place screen", body: "before any instruction appears, sous surfaces every ingredient and physical tool needed. no mid-cook surprises. no dead ends at step 4." },
    { n: "04", title: "smart substitutions", body: "when an ingredient is missing, sous offers a vetted swap with a plain-language culinary reason. this builds intuition, not just workarounds." },
  ];
  const ia = [
    "cook — ingredient input + time = recipe match",
    "saved — pre-checks ingredient availability",
    "habits — streaks, milestones, time saved",
    "profile — dietary flags + equipment toggles",
  ];
  const outcomes = [
    "zero inventory model",
    "mise en place checkpoint",
    "smart substitutions with culinary logic",
    "habit loop with identity-based milestones",
    "accessible cook mode with wakelock + timers",
  ];
  return (
    <article className="section">
      <a href="#projects" className="back-link reveal">← work</a>
      <h1 className="reveal sous-title">sous — just-in-time cooking</h1>
      <p className="sous-meta reveal">ux/ui designer · portfolio project · 2025 · figma · stitch · claude</p>
      <div className="sous-pills reveal">
        <span className="pill">mobile</span>
        <span className="pill">ux design</span>
        <span className="pill">product concept</span>
      </div>

      <figure className="sous-mockup reveal">
        <img src={sousCover} alt="sous app cover" loading="lazy" />
      </figure>

      <section className="sous-section reveal">
        <h2 className="section-title">overview</h2>
        <p className="big">
          sous is a just-in-time cooking assistant for busy beginners who want to eat well
          without meal planning or pantry management. it narrows thousands of recipes down to
          3–5 actionable matches, then guides cooking with high-contrast visuals and large tap
          targets built for messy hands.
        </p>
        <div className="stat-row">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <p className="stat-label">{s.label}</p>
              <p className="stat-value">{s.value}</p>
              <p className="stat-sub">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">the problem</h2>
        <p>most food apps treat users like warehouse clerks. sous treats them like cooks.</p>
        <div className="pain-grid">
          {pains.map((p) => (
            <div key={p.eyebrow} className="pain-card">
              <p className="pain-eyebrow">{p.eyebrow}</p>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
        <blockquote className="pull-quote">
          <p>"i want to eat better but i never know what to cook with what i have. by the time i figure it out, i've already ordered food."</p>
          <cite>— john, 28, the target persona</cite>
        </blockquote>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">design decisions</h2>
        <p>four principles shaped every screen in the app.</p>
        <ol className="numbered-list">
          {decisions.map((d) => (
            <li key={d.n}>
              <span className="num">{d.n}</span>
              <div>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">information architecture</h2>
        <p>four pillars, each with a single job. nothing competes for attention.</p>
        <div className="ia-pills">
          {ia.map((t) => <span key={t} className="pill">{t}</span>)}
        </div>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">cooking mode</h2>
        <p>
          cook mode is the heart of sous: one step at a time, oversized tap targets, integrated
          timers, and a screen that stays awake while hands stay busy.
        </p>
        <div className="insight-callout">
          <p>the design principle: every feature in cook mode exists to reduce the number of things the user has to think about while physically cooking.</p>
        </div>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">outcome</h2>
        <p>an end-to-end concept that reframes cooking apps from inventory managers to assistants.</p>
        <div className="ia-pills">
          {outcomes.map((t) => <span key={t} className="pill">{t}</span>)}
        </div>
      </section>

      <figure className="sous-flow reveal">
        <img src={sousDesignSystem} alt="sous design system — colors, typography, components" loading="lazy" />
      </figure>

      <figure className="sous-flow reveal">
        <img src={sousStepByStep} alt="sous end-to-end flow — five key screens" loading="lazy" />
      </figure>

      <figure className="sous-mockup reveal">
        <img src={sousMockup} alt="sous mockup in context" loading="lazy" />
      </figure>

      <div className="project-nav reveal">
        {prev ? <a href={`#project/${prev.slug}`} className="big-link">← previous project</a> : <span />}
        {next ? <a href={`#project/${next.slug}`} className="big-link">next project →</a> : <a href="#projects" className="big-link">all work →</a>}
      </div>
    </article>
  );
}

function OverseerCase({ prev, next }: { prev: Project | null; next: Project | null }) {
  const stats = [
    { label: "platform type", value: "web app", sub: "b2b saas · mro-focused" },
    { label: "core users", value: "mx professionals", sub: "mros, a&p mechanics, fleet managers" },
    { label: "key modules", value: "4 areas", sub: "work orders · labor · inventory · reports" },
    { label: "project type", value: "concept", sub: "end-to-end ux design" },
  ];
  const pains = [
    { eyebrow: "pain 01", title: "fragmented workflows", body: "work order creation, discrepancy tracking, labor logging, and reporting lived in separate tools — or on paper. no single source of truth." },
    { eyebrow: "pain 02", title: "zero visibility on labor", body: "supervisors had no real-time view of who was working what, how many hours were logged, or where a job stood without walking the floor." },
    { eyebrow: "pain 03", title: "compliance risk", body: "ad/sb tracking and sign-off documentation were manual and error-prone. one missed entry could ground an aircraft or trigger a regulatory finding." },
    { eyebrow: "pain 04", title: "customer disconnect", body: "mro customers had no visibility into their aircraft's maintenance status. updates came by phone, if at all." },
  ];
  const decisions = [
    { n: "01", title: "work order as the atomic unit", body: "everything — labor entries, discrepancy items, tooling allocation, cost tracking — is anchored to a single work order. nothing lives outside of it." },
    { n: "02", title: "discrepancy list as the task layer", body: "within each work order, a hierarchical discrepancy list (items and sub-items) gives mechanics a structured way to log findings, estimates, and actions taken — without free-form notes that get lost." },
    { n: "03", title: "labor visibility through reporting", body: "a dedicated labor report surfaces hours by work order, by sub-item, and by technician — giving supervisors the audit trail they need without building a separate reporting tool." },
    { n: "04", title: "progressive disclosure for complexity", body: "the work order form surfaces only what's needed at each stage: customer info first, then aircraft context, then scheduling, then scope. 620-row sku tables appear only after the job is defined." },
  ];
  const screens = [
    { n: "01", title: "work order list", body: "the operations hub. filterable by maintainer, status, date range, and tail number. each row surfaces the work order number, aircraft identity, assignees, and status at a glance. a 'create new work order' cta is always accessible from here." },
    { n: "02", title: "work order detail", body: "the most complex screen in the platform. organized into customer, aircraft, schedule, and discrepancy sections. the discrepancy list supports nested items with labor rate, estimated and actual hours, cost, action taken, and approval status per line." },
    { n: "03", title: "labor report", body: "a generated document view showing logged hours by work order and sub-item, grouped by technician. designed to be print-ready and client-shareable without exporting to another tool." },
  ];
  const outcomes = [
    "work order management",
    "hierarchical discrepancy tracking",
    "real-time labor logging",
    "print-ready labor reports",
    "fleet-level aircraft context",
    "role-based assignment",
  ];
  return (
    <article className="section">
      <a href="#projects" className="back-link reveal">← work</a>
      <h1 className="reveal sous-title">overseer — aircraft maintenance management</h1>
      <p className="sous-meta reveal">ux/ui designer · portfolio project · 2024 · figma · b2b saas</p>
      <div className="sous-pills reveal">
        <span className="pill">b2b saas</span>
        <span className="pill">web app</span>
        <span className="pill">mro platform</span>
        <span className="pill">ux design</span>
      </div>

      <figure className="sous-mockup reveal">
        <img src={overseerList} alt="overseer work order list" loading="lazy" />
      </figure>

      <section className="sous-section reveal">
        <h2 className="section-title">overview</h2>
        <p className="big">
          overseer is a web-based aircraft maintenance management platform built for mro
          organizations and maintenance professionals. it centralizes work order creation,
          discrepancy tracking, labor reporting, and compliance documentation into a single
          focused workspace — replacing fragmented spreadsheets and paper-based workflows that
          still dominate the aviation maintenance industry.
        </p>
        <div className="stat-row">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <p className="stat-label">{s.label}</p>
              <p className="stat-value">{s.value}</p>
              <p className="stat-sub">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">the problem</h2>
        <p>
          aviation maintenance organizations operate in one of the most compliance-heavy
          environments outside of healthcare — yet most still rely on paper work orders,
          disconnected spreadsheets, and manual labor logs. four core problems defined the
          design challenge.
        </p>
        <div className="pain-grid">
          {pains.map((p) => (
            <div key={p.eyebrow} className="pain-card">
              <p className="pain-eyebrow">{p.eyebrow}</p>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
        <blockquote className="pull-quote">
          <p>"every shop i visited had the same setup — a whiteboard, a folder of printed work orders, and someone whose entire job was chasing updates."</p>
          <cite>— research synthesis</cite>
        </blockquote>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">design decisions</h2>
        <p>four decisions shaped the platform's structure and interaction model.</p>
        <ol className="numbered-list">
          {decisions.map((d) => (
            <li key={d.n}>
              <span className="num">{d.n}</span>
              <div>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">key screens</h2>
        <p>three screens carry most of the platform's functional weight.</p>
        <ol className="numbered-list">
          {screens.map((d) => (
            <li key={d.n}>
              <span className="num">{d.n}</span>
              <div>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <figure className="sous-mockup reveal">
        <img src={overseerDetail} alt="overseer work order detail screen" loading="lazy" />
      </figure>

      <figure className="sous-mockup reveal">
        <img src={overseerReport} alt="overseer labor report" loading="lazy" />
      </figure>

      <section className="sous-section reveal">
        <h2 className="section-title">design considerations</h2>
        <p>
          aviation maintenance is a high-stakes, highly regulated environment. every design
          decision had to account for two things: the cognitive load of a mechanic mid-job,
          and the audit requirements of an faa-regulated shop. this meant prioritizing
          scannable tables over dashboards, explicit status labels over ambiguous icons, and
          a form structure that mirrors the mental model of an experienced a&p mechanic
          rather than a generic project management tool.
        </p>
        <div className="insight-callout">
          <p>the platform uses a dark sidebar with a high-contrast yellow accent — not as a style choice, but as a functional one. in a shop environment with varying light conditions, high-contrast navigation reduces the cognitive cost of context-switching between the screen and the aircraft.</p>
        </div>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">outcome</h2>
        <p>
          overseer consolidates the full mro workflow — from work order creation through
          labor reporting — into a single platform that matches how maintenance professionals
          actually think and work. the result is a system that reduces documentation overhead,
          gives supervisors real-time job visibility, and provides customers a transparent
          window into their aircraft's maintenance status.
        </p>
        <div className="ia-pills">
          {outcomes.map((t) => <span key={t} className="pill">{t}</span>)}
        </div>
      </section>

      <div className="project-nav reveal">
        {prev ? <a href={`#project/${prev.slug}`} className="big-link">← previous project</a> : <span />}
        {next ? <a href={`#project/${next.slug}`} className="big-link">next project →</a> : <a href="#projects" className="big-link">all work →</a>}
      </div>
    </article>
  );
}


const styles = `
:root, :root[data-theme="light"] {
  --color-bg: #F7F0E8;
  --color-surface: #F2EAE0;
  --color-surface-2: #EDE3D7;
  --color-surface-offset: #D9C5AD;
  --color-surface-dynamic: #C9B49A;
  --color-divider: #C4A98A;
  --color-border: #B89D7E;
  --color-text: #40361B;
  --color-text-muted: #595336;
  --color-text-faint: #8C7A5E;
  --color-text-inverse: #F7F0E8;
  --color-primary: #8C4E37;
  --color-primary-hover: #7A3E2A;
  --color-primary-active: #622F1E;
  --color-primary-highlight: #E8D3C8;
  --color-accent-warm: #F2AB6D;
  --color-accent-warm-hover: #E8954E;
  --shadow-sm: 0 1px 3px oklch(0.25 0.04 50 / 0.08);
  --shadow-md: 0 4px 16px oklch(0.25 0.04 50 / 0.10);
  --shadow-lg: 0 12px 32px oklch(0.25 0.04 50 / 0.14);
  --font-display: 'Quicksand', 'Georgia', sans-serif;
  --font-body: 'Open Sans', 'Helvetica Neue', sans-serif;
}
:root[data-theme="dark"] {
  --color-bg: #1A160C;
  --color-surface: #211C10;
  --color-surface-2: #282214;
  --color-surface-offset: #312A18;
  --color-surface-dynamic: #3D3420;
  --color-divider: #4A4028;
  --color-border: #564A2F;
  --color-text: #E8DDD0;
  --color-text-muted: #A89880;
  --color-text-faint: #6E5F48;
  --color-text-inverse: #211C10;
  --color-primary: #C47058;
  --color-primary-hover: #D4806A;
  --color-primary-active: #E0907C;
  --color-primary-highlight: #3D2820;
  --color-accent-warm: #F2AB6D;
  --color-accent-warm-hover: #F5BC88;
  --shadow-sm: 0 1px 3px oklch(0 0 0 / 0.25);
  --shadow-md: 0 4px 16px oklch(0 0 0 / 0.35);
  --shadow-lg: 0 12px 32px oklch(0 0 0 / 0.45);
}
html, body { background: var(--color-bg); color: var(--color-text); }
body, body * {
  font-family: var(--font-body);
}
body {
  font-weight: 400;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4, h5, h6,
.nav-brand-name, .section-title, .kicker,
.project-meta h3, .big-link, .case-section h2,
.meta-grid dt {
  font-family: var(--font-display);
}
h1, h2, h3, h4, h5, h6,
p, a, button, label, li,
nav a, .nav-brand-name,
.btn, .tag, .badge,
.card-title, .card-description,
.section-label, .meta,
footer, figcaption {
  text-transform: lowercase;
}
.site { min-height: 100vh; display: flex; flex-direction: column; }
.nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.25rem clamp(1rem, 4vw, 3rem);
  border-bottom: 1px solid var(--color-divider);
  position: sticky; top: 0;
  background: var(--color-surface);
  backdrop-filter: blur(8px); z-index: 10;
}
.nav-left { display: flex; align-items: center; gap: 0.75rem; }
[data-theme="dark"] .nav { background: #0F0D08; border-bottom-color: #0F0D08; }
.nav-brand {
  display: flex; flex-direction: column; gap: 1px;
  text-decoration: none; line-height: 1.2;
}
.nav-brand-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
  color: #40361B;
  letter-spacing: -0.01em;
}
.nav-brand-title {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: clamp(0.65rem, 0.6rem + 0.2vw, 0.75rem);
  color: #595336;
  letter-spacing: 0.08em;
}
[data-theme="dark"] .nav-brand-name { color: #E8DDD0; }
[data-theme="dark"] .nav-brand-title { color: #A89880; }
.nav-brand:hover .nav-brand-name { color: var(--color-primary); }
[data-theme="dark"] .nav-brand:hover .nav-brand-name { color: #F2AB6D; }
.nav nav { display: flex; gap: 0.25rem; align-items: center; }
.nav nav a {
  color: var(--color-text-muted); text-decoration: none; padding: 0.6rem 0.9rem;
  min-height: 44px; display: inline-flex; align-items: center; border-radius: 999px;
  font-size: 0.95rem; transition: color .2s;
}
.nav nav a:hover { color: var(--color-primary); }
.nav nav a.active { color: var(--color-primary); font-weight: 600; }
[data-theme="dark"] .nav nav a { color: #A89880; }
[data-theme="dark"] .nav nav a:hover { color: #F2AB6D; }
[data-theme="dark"] .nav nav a.active { color: #F2AB6D; }
.theme-toggle {
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border-radius: 10px;
  border: none; background: transparent;
  color: #D9C5AD; cursor: pointer; font-size: 18px; line-height: 1;
  transition: color .2s, background .2s;
  flex-shrink: 0;
}
.theme-toggle:hover {
  color: var(--color-primary);
  background: color-mix(in oklab, var(--color-primary) 10%, transparent);
}
[data-theme="dark"] .theme-toggle { color: #A89880; }
[data-theme="dark"] .theme-toggle:hover { color: #F2AB6D; background: color-mix(in oklab, #F2AB6D 12%, transparent); }
main { flex: 1; }
.hero {
  padding: clamp(4rem, 12vw, 9rem) clamp(1rem, 4vw, 3rem) clamp(3rem, 8vw, 6rem);
  max-width: 1100px; margin: 0 auto;
}
.eyebrow {
  letter-spacing: 0.18em; font-size: 0.75rem;
  color: var(--color-primary); margin-bottom: 1.5rem; font-weight: 600;
}
h1 {
  font-family: var(--font-display); font-weight: 700;
  font-size: clamp(2.2rem, 5.6vw, 4.6rem);
  line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 1.5rem;
  color: var(--color-text);
}
.lede { font-size: clamp(1.05rem, 1.6vw, 1.25rem); color: var(--color-text-muted); max-width: 36em; }
.actions { display: flex; gap: 0.75rem; margin-top: 2rem; flex-wrap: wrap; }
.btn {
  display: inline-flex; align-items: center; min-height: 44px; padding: 0 1.4rem;
  border-radius: 999px; background: var(--color-primary); color: #fff;
  text-decoration: none; font-size: 0.95rem; font-weight: 600;
  font-family: var(--font-body);
  transition: transform .2s ease, box-shadow .2s ease, background .2s;
  box-shadow: var(--shadow-sm);
  border: none; cursor: pointer;
}
.btn:hover { background: var(--color-primary-hover); transform: translateY(-1px); box-shadow: var(--shadow-md); }
.btn.ghost {
  background: transparent; color: var(--color-primary);
  border: 1.5px solid var(--color-primary); box-shadow: none;
}
.btn.ghost:hover { background: var(--color-primary-highlight); color: var(--color-primary); }
.section {
  padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem);
  max-width: 1100px; margin: 0 auto;
}
.section.narrow { max-width: 760px; }
.section-title {
  font-family: var(--font-display); font-weight: 700;
  font-size: 0.85rem; letter-spacing: 0.18em;
  color: var(--color-primary); margin-bottom: 2.5rem;
  display: inline-flex; align-items: center; gap: 0.6rem;
}
.section-title::before {
  content: ""; display: inline-block; width: 24px; height: 2px;
  background: var(--color-accent-warm); border-radius: 2px;
}
.project-list { display: grid; gap: clamp(2rem, 5vw, 4rem); }
.project-card {
  display: grid; gap: 1.25rem; color: var(--color-text); text-decoration: none;
}
.project-cover {
  background: var(--color-surface); border-radius: 14px; overflow: hidden; aspect-ratio: 16/10;
  box-shadow: var(--shadow-sm);
}
.project-cover.wide { margin: 2.5rem 0; border-radius: 18px; }
.project-cover img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform .8s ease;
}
.project-card:hover .project-cover img { transform: scale(1.03); }
.project-meta { display: flex; justify-content: space-between; gap: 2rem; align-items: end; flex-wrap: wrap; }
.project-meta h3 {
  font-family: var(--font-display); font-weight: 700;
  font-size: 1.5rem; margin: 0 0 0.4rem; letter-spacing: -0.01em;
  color: var(--color-text);
}
.project-card:hover .project-meta h3 { color: var(--color-primary); }
.muted { color: var(--color-text-muted); margin: 0; }
.small { font-size: 0.85rem; }
.big {
  font-family: var(--font-body); font-weight: 300;
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  line-height: 1.5; color: var(--color-text); max-width: 28em;
}
.about-grid {
  margin-top: 3rem; display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.about-grid > div {
  padding: 1.5rem; border-radius: 14px;
  background: var(--color-surface);
  border: 1px solid var(--color-divider);
}
.about-grid > div:nth-child(1) { border-left: 3px solid var(--color-primary); }
.about-grid > div:nth-child(2) { border-left: 3px solid var(--color-accent-warm); }
.about-grid > div:nth-child(3) { border-left: 3px solid var(--color-primary); }
.about-grid p { margin: 0 0 0.4rem; }
.kicker {
  font-family: var(--font-display); font-weight: 700;
  font-size: 0.75rem; letter-spacing: 0.16em;
  color: var(--color-primary); margin-bottom: 0.75rem !important;
}
.toolkit-list { display: flex; flex-direction: column; }
.toolkit-item {
  display: flex; align-items: center; gap: 0.6rem;
  font-family: var(--font-body); font-size: 0.875rem;
  color: var(--color-text-muted);
  padding: 0.4rem 0;
  border-bottom: 1px solid var(--color-divider);
}
.toolkit-item:last-child { border-bottom: none; }
.toolkit-item img { width: 20px; height: 20px; flex-shrink: 0; }
[data-theme="dark"] .toolkit-item img[alt="notion"] { filter: invert(1); }
.contact-grid {
  margin-top: 3rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem 2.5rem;
  padding-top: 2rem; border-top: 1px solid var(--color-divider);
}
.big-link {
  display: block; font-family: var(--font-display); font-weight: 700;
  font-size: 1.4rem; color: var(--color-text); text-decoration: none; margin-top: 0.4rem;
  letter-spacing: -0.01em; transition: color .2s;
}
.big-link.as-text { cursor: default; }
.big-link:hover:not(.as-text) { color: var(--color-primary); }
.back-link {
  display: inline-block; margin-bottom: 2rem; color: var(--color-text-muted);
  text-decoration: none; font-size: 0.9rem;
}
.back-link:hover { color: var(--color-primary); }
.meta-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem; margin: 2.5rem 0; padding: 1.5rem 0;
  border-top: 1px solid var(--color-divider); border-bottom: 1px solid var(--color-divider);
}
.meta-grid dt {
  font-family: var(--font-display); font-weight: 700;
  font-size: 0.7rem; letter-spacing: 0.18em;
  color: var(--color-primary); margin-bottom: 0.4rem;
}
.meta-grid dd { margin: 0; font-size: 0.95rem; color: var(--color-text); }
.case-section { margin: 2.5rem 0; border-left: 2px solid var(--color-accent-warm); padding-left: 1.25rem; }
.case-section h2 {
  font-family: var(--font-display); font-weight: 700;
  font-size: 1.4rem; margin: 0 0 0.75rem; letter-spacing: -0.01em;
  color: var(--color-text);
}
.case-section p { color: var(--color-text-muted); max-width: 36em; }
.project-nav {
  margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--color-divider);
  display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
}
input:focus, textarea:focus { outline: none; border: 2px solid var(--color-primary); }
.footer {
  border-top: 1px solid var(--color-divider); padding: 2rem clamp(1rem, 4vw, 3rem);
  display: flex; justify-content: space-between; gap: 1.5rem; align-items: center;
  max-width: 1100px; margin: 0 auto; width: 100%;
  flex-wrap: wrap;
}
.footer-left { margin: 0; color: var(--color-text-faint); font-size: 0.875rem; }
.footer-right { display: flex; gap: 1.5rem; flex-wrap: wrap; }
.footer-right a { color: var(--color-text-faint); text-decoration: none; font-size: 0.875rem; }
.footer-right a:hover { color: var(--color-primary); }
[data-theme="dark"] .site > .footer,
[data-theme="dark"] footer.footer {
  background: #0F0D08;
  border-top-color: #0F0D08;
  max-width: none;
  padding-left: clamp(1rem, 4vw, 3rem);
  padding-right: clamp(1rem, 4vw, 3rem);
}
[data-theme="dark"] .footer-left { color: #6E5F48; }
[data-theme="dark"] .footer-right a { color: #A89880; }
[data-theme="dark"] .footer-right a:hover { color: #F2AB6D; }
.reveal { opacity: 0; transform: translateY(12px); transition: opacity .8s ease, transform .8s ease; }
.reveal.visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  .project-card:hover .project-cover img { transform: none; }
}
@media (max-width: 768px) {
  .nav-brand-title { display: none; }
}
@media (max-width: 640px) {
  .meta-grid { grid-template-columns: 1fr 1fr; }
  .contact-grid { grid-template-columns: 1fr; }
  .about-grid { grid-template-columns: 1fr; }
  .footer { flex-direction: column; align-items: flex-start; }
  .stat-row { grid-template-columns: 1fr !important; }
  .pain-grid { grid-template-columns: 1fr !important; }
  
}

/* sous case study */
.sous-title { margin-bottom: 1rem; }
.sous-meta {
  font-family: var(--font-display); font-weight: 700;
  font-size: 0.75rem; letter-spacing: 0.18em;
  color: var(--color-text-muted); margin: 0 0 1.25rem;
}
.sous-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
.pill {
  display: inline-flex; align-items: center;
  padding: 0.35rem 0.9rem; border-radius: 999px;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  background: color-mix(in oklab, var(--color-primary) 8%, transparent);
  font-size: 0.78rem; font-weight: 600; letter-spacing: 0.04em;
  transition: opacity .2s;
}
.pill:hover { opacity: 0.75; }
.sous-section { margin: 3.5rem 0; }
.stat-row {
  margin-top: 1.75rem;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
  padding: 1.75rem; border-radius: 14px;
  background: color-mix(in oklab, var(--color-accent-warm) 10%, var(--color-surface));
  border: 1px solid var(--color-divider);
}
.stat-label {
  font-family: var(--font-display); font-weight: 700;
  font-size: 0.7rem; letter-spacing: 0.16em;
  color: var(--color-text-muted); margin: 0 0 0.5rem;
}
.stat-value {
  font-family: var(--font-display); font-weight: 700;
  font-size: clamp(1.25rem, 2vw, 1.6rem);
  color: var(--color-text); margin: 0 0 0.4rem; letter-spacing: -0.01em;
  line-height: 1.15;
}
.stat-sub { font-size: 0.8rem; color: var(--color-text-muted); margin: 0; }
@media (max-width: 900px) { .stat-row { grid-template-columns: 1fr 1fr; } }
.pain-grid { margin-top: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.pain-card {
  padding: 1.5rem; border-radius: 14px;
  background: var(--color-surface-offset);
  border: 1px solid var(--color-divider);
}
.pain-eyebrow {
  font-family: var(--font-display); font-weight: 700;
  font-size: 0.7rem; letter-spacing: 0.16em;
  color: var(--color-primary); margin: 0 0 0.5rem;
}
.pain-card h3 {
  font-family: var(--font-display); font-weight: 700;
  font-size: 1.15rem; margin: 0 0 0.5rem; color: var(--color-text);
}
.pain-card p { margin: 0; color: var(--color-text-muted); font-size: 0.95rem; }
.pull-quote {
  margin: 2rem 0 0; padding: 1.25rem 1.5rem;
  border-left: 2px solid var(--color-accent-warm);
  background: color-mix(in oklab, var(--color-accent-warm) 8%, transparent);
  border-radius: 0 10px 10px 0;
}
.pull-quote p { font-style: italic; font-size: 1.05rem; color: var(--color-text); margin: 0 0 0.5rem; }
.pull-quote cite { font-style: normal; font-size: 0.85rem; color: var(--color-text-muted); }
.numbered-list { list-style: none; padding: 0; margin: 1.5rem 0 0; }
.numbered-list li {
  display: flex; gap: 1.25rem; align-items: flex-start;
  padding: 1.25rem 0; border-bottom: 1px solid var(--color-divider);
}
.numbered-list li:last-child { border-bottom: none; }
.numbered-list .num {
  min-width: 2rem;
  font-family: var(--font-display); font-weight: 700;
  font-size: 1rem; letter-spacing: 0.08em;
  color: var(--color-accent-warm);
}
.numbered-list h3 {
  font-family: var(--font-display); font-weight: 700;
  font-size: 1.1rem; margin: 0 0 0.35rem; color: var(--color-text);
}
.numbered-list p { margin: 0; color: var(--color-text-muted); font-size: 0.95rem; }
.ia-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.25rem; }
.insight-callout {
  margin-top: 1.5rem; padding: 1.25rem 1.5rem;
  border-left: 2px solid var(--color-accent-warm);
  background: color-mix(in oklab, var(--color-accent-warm) 8%, transparent);
  border-radius: 0 10px 10px 0;
}
.insight-callout p { font-style: italic; margin: 0; color: var(--color-text); }
.sous-flow {
  margin: 3rem 0 0;
  background: var(--color-surface);
  border-radius: 18px;
  padding: clamp(1rem, 3vw, 2rem);
  box-shadow: var(--shadow-sm);
}
.sous-flow img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}
.sous-mockup {
  margin: 2.5rem 0;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
.sous-mockup img {
  width: 100%;
  height: auto;
  display: block;
}
`;
