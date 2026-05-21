import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

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
    title: "Replenishment Dashboard",
    client: "Northwind Retail",
    year: "2025",
    role: "Lead Product Designer",
    summary:
      "A calm, data-dense interface that helps planners forecast stock without drowning in numbers.",
    tags: ["Enterprise", "Data Viz", "Design System"],
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Northwind's planning team manages thousands of SKUs across 40 stores. The legacy tool buried them in spreadsheets. We rebuilt the experience around a single question: what needs my attention today?",
    sections: [
      {
        heading: "The problem",
        body: "Planners spent the first 90 minutes of every day rebuilding context — pulling reports, cross-checking inventory, mentally flagging risk. The retailer's growth made the old workflow untenable.",
      },
      {
        heading: "Approach",
        body: "We shadowed planners for two weeks, mapped their decision points, and prototyped a triage-first dashboard. Every screen now opens with prioritized actions instead of raw tables.",
      },
      {
        heading: "Outcome",
        body: "Time-to-first-decision dropped from 47 minutes to under 6. Forecast accuracy improved 12% in the first quarter post-launch.",
      },
    ],
  },
  {
    slug: "field-notes-mobile",
    title: "Field Notes Mobile",
    client: "Terra Studio",
    year: "2024",
    role: "Product Designer",
    summary:
      "A note-taking app for field researchers, designed for one-handed use in unpredictable conditions.",
    tags: ["Mobile", "iOS", "Research"],
    cover:
      "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Built for biologists and geologists working far from connectivity. The interface had to survive gloves, rain, and bright sunlight.",
    sections: [
      {
        heading: "Constraints",
        body: "Offline-first. Glove-friendly tap targets. Legible at noon in the desert and at dusk in the forest. Battery efficient.",
      },
      {
        heading: "Design choices",
        body: "High-contrast typography, oversized touch zones, voice-capture as the primary input. Sync happens silently when signal returns.",
      },
    ],
  },
  {
    slug: "harbor-banking",
    title: "Harbor Banking",
    client: "Harbor Financial",
    year: "2024",
    role: "Senior UX Designer",
    summary:
      "Reimagining personal banking for people who'd rather think about anything else.",
    tags: ["Fintech", "Web", "Brand"],
    cover:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Harbor wanted to be the bank that respects your time. We translated that promise into every screen — fewer numbers, more meaning.",
    sections: [
      {
        heading: "Principles",
        body: "Show the answer, not the data. Default to plain language. Never use red unless something is genuinely wrong.",
      },
    ],
  },
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
          <a href="#home" className="brand">
            Arno K. Neto
          </a>
          <nav>
            <a href="#home" className={view === "home" ? "active" : ""}>
              Index
            </a>
            <a
              href="#projects"
              className={view === "projects" || view === "project" ? "active" : ""}
            >
              Work
            </a>
            <a href="#contact" className={view === "contact" ? "active" : ""}>
              Contact
            </a>
            <button
              className="theme-toggle"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? "☾" : "☀"}
            </button>
          </nav>
        </header>

        <main>
          {view === "home" && <Home />}
          {view === "projects" && <Projects />}
          {view === "contact" && <Contact />}
          {view === "project" && <ProjectDetail slug={projectSlug} />}
        </main>

        <footer className="footer">
          <div>
            <p className="footer-mark">Arno K. Neto</p>
            <p className="muted">UX/UI Designer · Curitiba, Brazil</p>
          </div>
          <div className="footer-links">
            <a href="mailto:arnoklettenbergneto@gmail.com">arnoklettenbergneto@gmail.com</a>
            <a href="tel:+5541992574885">+55 41 99257-4885</a>
            <a href="#contact">Contact</a>
          </div>
          <p className="muted small">© {new Date().getFullYear()}. Made with care.</p>
        </footer>
      </div>
    </>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow reveal">Portfolio · 2020 — 2025</p>
        <h1 className="reveal">
          Designing quiet, considered<br />interfaces for ambitious teams.
        </h1>
        <p className="lede reveal">
          I'm Arno, a UX/UI designer working with founders and product teams to
          turn complex problems into calm, usable products.
        </p>
        <div className="actions reveal">
          <a className="btn" href="#projects">
            See selected work
          </a>
          <a className="btn ghost" href="#contact">
            Get in touch
          </a>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title reveal">Selected work</h2>
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
                <p className="muted small">
                  {p.client} · {p.year}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section about">
        <h2 className="section-title reveal">About</h2>
        <p className="reveal big">
          Ten years of designing for fintech, retail, and research tools. I care
          about typography, restraint, and the patience to remove what doesn't
          belong.
        </p>
      </section>
    </>
  );
}

function Projects() {
  return (
    <section className="section">
      <p className="eyebrow reveal">Work · {projects.length} selected</p>
      <h1 className="reveal">Projects</h1>
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
              <p className="muted small">
                {p.client} · {p.year} · {p.role}
              </p>
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
      <p className="eyebrow reveal">Contact</p>
      <h1 className="reveal">Let's make something quiet together.</h1>
      <p className="lede reveal">
        I'm currently taking on a small number of new projects for late 2025 and
        early 2026. If you're working on something thoughtful, I'd love to hear
        about it.
      </p>
      <div className="contact-grid reveal">
        <div>
          <p className="muted small">Email</p>
          <a className="big-link" href="mailto:hello@arno.studio">
            hello@arno.studio
          </a>
        </div>
        <div>
          <p className="muted small">Elsewhere</p>
          <a className="big-link" href="#">
            Read.cv
          </a>
          <a className="big-link" href="#">
            LinkedIn
          </a>
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
        <p className="eyebrow">Not found</p>
        <h1>That project doesn't exist.</h1>
        <p className="lede">
          <a href="#projects">← Back to all work</a>
        </p>
      </section>
    );
  }
  return (
    <article className="section narrow">
      <a href="#projects" className="back-link reveal">
        ← Back to work
      </a>
      <p className="eyebrow reveal">
        {project.client} · {project.year}
      </p>
      <h1 className="reveal">{project.title}</h1>
      <p className="lede reveal">{project.summary}</p>

      <dl className="meta-grid reveal">
        <div>
          <dt>Client</dt>
          <dd>{project.client}</dd>
        </div>
        <div>
          <dt>Year</dt>
          <dd>{project.year}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Tags</dt>
          <dd>{project.tags.join(" · ")}</dd>
        </div>
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

      <div className="next reveal">
        <a href="#projects" className="big-link">
          See more work →
        </a>
      </div>
    </article>
  );
}

const styles = `
:root[data-theme="light"] {
  --bg: #f5f1ea;
  --surface: #ebe5d9;
  --ink: #2a2620;
  --ink-soft: #6b6358;
  --line: #d9d1c1;
  --accent: #8a6a3b;
}
:root[data-theme="dark"] {
  --bg: #14110d;
  --surface: #1c1813;
  --ink: #ece6d6;
  --ink-soft: #948a78;
  --line: #2a2520;
  --accent: #c9a87a;
}
html, body { background: var(--bg); color: var(--ink); }
body {
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  font-feature-settings: "ss01", "ss02";
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
.site { min-height: 100vh; display: flex; flex-direction: column; }
.nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.25rem clamp(1rem, 4vw, 3rem);
  border-bottom: 1px solid var(--line);
  position: sticky; top: 0; background: color-mix(in oklab, var(--bg) 92%, transparent);
  backdrop-filter: blur(8px); z-index: 10;
}
.brand { font-weight: 500; letter-spacing: -0.01em; color: var(--ink); text-decoration: none; }
.nav nav { display: flex; gap: 0.5rem; align-items: center; }
.nav nav a {
  color: var(--ink-soft); text-decoration: none; padding: 0.6rem 0.9rem;
  min-height: 44px; display: inline-flex; align-items: center; border-radius: 999px;
  font-size: 0.95rem; transition: color .2s;
}
.nav nav a:hover, .nav nav a.active { color: var(--ink); }
.theme-toggle {
  width: 44px; height: 44px; border-radius: 999px; border: 1px solid var(--line);
  background: transparent; color: var(--ink); cursor: pointer; font-size: 1rem;
}
main { flex: 1; }
.hero {
  padding: clamp(4rem, 12vw, 9rem) clamp(1rem, 4vw, 3rem) clamp(3rem, 8vw, 6rem);
  max-width: 1100px; margin: 0 auto;
}
.eyebrow {
  text-transform: uppercase; letter-spacing: 0.18em; font-size: 0.75rem;
  color: var(--ink-soft); margin-bottom: 1.5rem;
}
h1 {
  font-family: ui-serif, Georgia, "Times New Roman", serif;
  font-weight: 400; font-size: clamp(2.2rem, 5.6vw, 4.6rem);
  line-height: 1.05; letter-spacing: -0.02em; margin: 0 0 1.5rem;
}
.lede { font-size: clamp(1.05rem, 1.6vw, 1.25rem); color: var(--ink-soft); max-width: 36em; }
.actions { display: flex; gap: 0.75rem; margin-top: 2rem; flex-wrap: wrap; }
.btn {
  display: inline-flex; align-items: center; min-height: 44px; padding: 0 1.25rem;
  border-radius: 999px; background: var(--ink); color: var(--bg);
  text-decoration: none; font-size: 0.95rem; transition: opacity .2s;
}
.btn:hover { opacity: 0.85; }
.btn.ghost { background: transparent; color: var(--ink); border: 1px solid var(--line); }
.section {
  padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem);
  max-width: 1100px; margin: 0 auto;
}
.section.narrow { max-width: 760px; }
.section-title {
  font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.18em;
  color: var(--ink-soft); margin-bottom: 2.5rem; font-weight: 500;
}
.project-list { display: grid; gap: clamp(2rem, 5vw, 4rem); }
.project-card {
  display: grid; gap: 1.25rem; color: var(--ink); text-decoration: none;
}
.project-cover {
  background: var(--surface); border-radius: 4px; overflow: hidden; aspect-ratio: 16/10;
}
.project-cover.wide { margin: 2.5rem 0; }
.project-cover img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform .8s ease;
}
.project-card:hover .project-cover img { transform: scale(1.02); }
.project-meta { display: flex; justify-content: space-between; gap: 2rem; align-items: end; flex-wrap: wrap; }
.project-meta h3 {
  font-family: ui-serif, Georgia, serif; font-weight: 400; font-size: 1.5rem;
  margin: 0 0 0.4rem; letter-spacing: -0.01em;
}
.muted { color: var(--ink-soft); margin: 0; }
.small { font-size: 0.85rem; }
.about .big, .big {
  font-family: ui-serif, Georgia, serif; font-size: clamp(1.4rem, 2.4vw, 2rem);
  line-height: 1.35; color: var(--ink); max-width: 24em; font-weight: 400;
}
.contact-grid {
  margin-top: 3rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;
  padding-top: 2rem; border-top: 1px solid var(--line);
}
.big-link {
  display: block; font-family: ui-serif, Georgia, serif; font-size: 1.6rem;
  color: var(--ink); text-decoration: none; margin-top: 0.4rem;
  letter-spacing: -0.01em;
}
.big-link:hover { color: var(--accent); }
.back-link {
  display: inline-block; margin-bottom: 2rem; color: var(--ink-soft);
  text-decoration: none; font-size: 0.9rem;
}
.back-link:hover { color: var(--ink); }
.meta-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem; margin: 2.5rem 0; padding: 1.5rem 0;
  border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
}
.meta-grid dt {
  font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.18em;
  color: var(--ink-soft); margin-bottom: 0.4rem;
}
.meta-grid dd { margin: 0; font-size: 0.95rem; }
.case-section { margin: 2.5rem 0; }
.case-section h2 {
  font-family: ui-serif, Georgia, serif; font-weight: 400; font-size: 1.4rem;
  margin: 0 0 0.75rem; letter-spacing: -0.01em;
}
.case-section p { color: var(--ink-soft); max-width: 36em; }
.next { margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--line); }
.footer {
  border-top: 1px solid var(--line); padding: 3rem clamp(1rem, 4vw, 3rem);
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; align-items: end;
  max-width: 1100px; margin: 0 auto; width: 100%;
}
.footer-mark { margin: 0; font-weight: 500; }
.footer-links { display: flex; flex-direction: column; gap: 0.4rem; }
.footer-links a { color: var(--ink-soft); text-decoration: none; }
.footer-links a:hover { color: var(--ink); }
.reveal { opacity: 0; transform: translateY(12px); transition: opacity .8s ease, transform .8s ease; }
.reveal.visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  .project-card:hover .project-cover img { transform: none; }
}
@media (max-width: 640px) {
  .meta-grid { grid-template-columns: 1fr 1fr; }
  .contact-grid { grid-template-columns: 1fr; }
  .footer { grid-template-columns: 1fr; }
}
`;
