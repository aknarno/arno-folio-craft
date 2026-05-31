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
import argoCover from "@/assets/argo/cover.png";
import argoEstimate from "@/assets/argo/estimate.png";
import argoDrawBoundary from "@/assets/argo/draw-boundary.png";
import argoDataCollection from "@/assets/argo/data-collection.png";
import { useCopy, useLanguage, type ProjectCopy } from "@/lib/i18n";

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

const covers: Record<string, string> = {
  sous: sousCover,
  overseer: overseerCover,
  argo: argoCover,
};

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

function useReveal(deps: unknown[] = []) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

function Index() {
  const hash = useHashRoute();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const copy = useCopy();
  const { lang, setLang } = useLanguage();

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

  const revealRef = useReveal([hash, lang]);

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
      <div className="site" ref={revealRef} key={`${hash}-${lang}`}>
        <header className="nav">
          <div className="nav-left">
            <a href="#home" className="nav-brand" aria-label="Arno Klettenberg — Home">
              <span className="nav-brand-name">arno klettenberg</span>
              <span className="nav-brand-title">{copy.nav.brandTitle}</span>
            </a>
            <button
              className="theme-toggle"
              aria-label={theme === "light" ? copy.nav.themeLight : copy.nav.themeDark}
              title={theme === "light" ? copy.nav.themeLight : copy.nav.themeDark}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? "☾" : "☀"}
            </button>
            <button
              className="lang-toggle"
              aria-label={copy.nav.langToggle}
              title={copy.nav.langToggle}
              aria-pressed={lang === "pt"}
              onClick={() => setLang(lang === "en" ? "pt" : "en")}
            >
              <span className={lang === "en" ? "lang-active" : ""}>
                <img src="https://flagcdn.com/w20/us.png" srcSet="https://flagcdn.com/w40/us.png 2x" width="20" height="15" alt="" className="lang-flag" /> EN
              </span>
              <span className="lang-sep" aria-hidden="true">/</span>
              <span className={lang === "pt" ? "lang-active" : ""}>
                <img src="https://flagcdn.com/w20/br.png" srcSet="https://flagcdn.com/w40/br.png 2x" width="20" height="15" alt="" className="lang-flag" /> PT-BR
              </span>
            </button>
          </div>
          <nav>
            <a
              href="#projects"
              className={view === "projects" || view === "project" ? "active" : ""}
            >
              {copy.nav.work}
            </a>
            <a href="#home" className={view === "home" ? "active" : ""}>
              {copy.nav.about}
            </a>
            <a href="#contact" className={view === "contact" ? "active" : ""}>
              {copy.nav.contact}
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
          <p className="footer-left">{copy.footer.copyright}</p>
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
  const copy = useCopy();
  return (
    <>
      <section className="hero">
        <p className="eyebrow reveal">{copy.hero.eyebrow}</p>
        <h1 className="reveal">{copy.hero.title}</h1>
        <div className="actions reveal">
          <a className="btn" href="#projects">{copy.hero.viewWork}</a>
          <a className="btn ghost" href="#contact">{copy.hero.getInTouch}</a>
        </div>
      </section>

      <section className="section about">
        <h2 className="section-title reveal">{copy.homeAbout.title}</h2>
        <p className="reveal big">{copy.homeAbout.body}</p>
        <div className="about-grid reveal">
          <div>
            <p className="kicker">{copy.homeAbout.educationKicker}</p>
            <p>{copy.homeAbout.education}</p>
            <p className="muted small">{copy.homeAbout.educationSub}</p>
          </div>
          <div>
            <p className="kicker">{copy.homeAbout.toolkitKicker}</p>
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
            <p className="kicker">{copy.homeAbout.languagesKicker}</p>
            {copy.homeAbout.languages.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title reveal">{copy.selectedWork}</h2>
        <div className="project-list">
          {copy.projects.map((p) => (
            <a key={p.slug} href={`#project/${p.slug}`} className="project-card reveal">
              <div className="project-cover">
                <img
                  src={covers[p.slug]}
                  alt={p.title}
                  width={1600}
                  height={1000}
                  loading="lazy"
                />
              </div>
              <div className="project-meta">
                <h3>{p.title}</h3>
                <p className="muted">{p.summary}</p>
                <p className="project-meta-line">{p.client} · {p.year} · {p.role}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function Projects() {
  const copy = useCopy();
  return (
    <section className="section">
      <p className="eyebrow reveal">{copy.nav.work} · {copy.projects.length} {copy.projectsView.eyebrowSuffix}</p>
      <h1 className="reveal">{copy.projectsView.title}</h1>
      <div className="project-list">
        {copy.projects.map((p) => (
          <a key={p.slug} href={`#project/${p.slug}`} className="project-card reveal">
            <div className="project-cover">
              <img src={covers[p.slug]} alt={p.title} width={1600} height={1000} loading="lazy" />
            </div>
            <div className="project-meta">
              <h3>{p.title}</h3>
              <p className="muted">{p.summary}</p>
              <p className="project-meta-line">{p.client} · {p.year} · {p.role}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const copy = useCopy();
  return (
    <section className="section narrow">
      <p className="eyebrow reveal">{copy.contact.eyebrow}</p>
      <h1 className="reveal">{copy.contact.title}</h1>
      <p className="lede reveal">{copy.contact.lede}</p>
      <div className="contact-grid reveal">
        <div>
          <p className="muted small">{copy.contact.email}</p>
          <a className="big-link" href="mailto:arnoklettenbergneto@gmail.com">arnoklettenbergneto@gmail.com</a>
        </div>
        <div>
          <p className="muted small">{copy.contact.phone}</p>
          <a className="big-link" href="tel:+5541992574885">+55 41 99257-4885</a>
        </div>
        <div>
          <p className="muted small">{copy.contact.basedIn}</p>
          <p className="big-link as-text">{copy.contact.basedInValue}</p>
        </div>
        <div>
          <p className="muted small">{copy.contact.elsewhere}</p>
          <a className="big-link" href="https://www.linkedin.com/in/arno-klettenberg-neto-b987a818a/" target="_blank" rel="noopener noreferrer">↗ linkedin</a>
        </div>
      </div>
    </section>
  );
}

function ProjectDetail({ slug }: { slug: string }) {
  const copy = useCopy();
  const project = copy.projects.find((p) => p.slug === slug);
  if (!project) {
    return (
      <section className="section narrow">
        <p className="eyebrow">{copy.notFoundProject.eyebrow}</p>
        <h1>{copy.notFoundProject.title}</h1>
        <p className="lede"><a href="#projects">{copy.notFoundProject.back}</a></p>
      </section>
    );
  }
  const idx = copy.projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? copy.projects[idx - 1] : null;
  const next = idx < copy.projects.length - 1 ? copy.projects[idx + 1] : null;

  if (slug === "sous") return <SousCase prev={prev} next={next} />;
  if (slug === "overseer") return <OverseerCase prev={prev} next={next} />;
  if (slug === "argo") return <ArgoCase prev={prev} next={next} />;

  return null;
}

function CaseNav({ prev, next }: { prev: ProjectCopy | null; next: ProjectCopy | null }) {
  const copy = useCopy();
  return (
    <div className="project-nav reveal">
      {prev ? <a href={`#project/${prev.slug}`} className="big-link">{copy.caseUI.prevProject}</a> : <span />}
      {next ? <a href={`#project/${next.slug}`} className="big-link">{copy.caseUI.nextProject}</a> : <a href="#projects" className="big-link">{copy.caseUI.allWork}</a>}
    </div>
  );
}

function SousCase({ prev, next }: { prev: ProjectCopy | null; next: ProjectCopy | null }) {
  const copy = useCopy();
  const s = copy.sous;
  return (
    <article className="section">
      <a href="#projects" className="back-link reveal">{copy.caseUI.backWork}</a>
      <h1 className="reveal sous-title">{s.title}</h1>
      <p className="sous-meta reveal">{copy.caseUI.metaLineSous}</p>
      <div className="sous-pills reveal">
        {s.pills.map((p) => <span key={p} className="pill">{p}</span>)}
      </div>

      <figure className="sous-mockup reveal">
        <img src={sousCover} alt="Sous app cover" loading="lazy" />
      </figure>

      <section className="sous-section reveal">
        <h2 className="section-title">{copy.caseUI.overview}</h2>
        <p className="big">{s.overview}</p>
        <div className="stat-row">
          {s.stats.map((st) => (
            <div key={st.label} className="stat">
              <p className="stat-label">{st.label}</p>
              <p className="stat-value">{st.value}</p>
              <p className="stat-sub">{st.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">{s.researchTitle}</h2>
        <p>{s.researchIntro}</p>
        <div className="pain-grid">
          {s.research.map((r) => (
            <div key={r.eyebrow} className="pain-card">
              <p className="pain-eyebrow">{r.eyebrow}</p>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">{s.personasTitle}</h2>
        <p>{s.personasIntro}</p>
        <div className="pain-grid">
          {s.personas.map((p) => (
            <div key={p.name} className="pain-card">
              <p className="pain-eyebrow">{p.name}</p>
              <blockquote className="pull-quote" style={{ margin: "0 0 1rem" }}>
                <p>"{p.quote}"</p>
              </blockquote>
              <p><strong>{s.problemLabel}</strong> {p.problem}</p>
              <p><strong>{s.painLabel}</strong> {p.pain}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">{s.designProcessTitle}</h2>
        <p>{s.designProcessIntro}</p>
        <ol className="numbered-list">
          {s.process.map((d) => (
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
        <h2 className="section-title">{s.designDecisionsTitle}</h2>
        <p>{s.designDecisionsIntro}</p>
        <ol className="numbered-list">
          {s.decisions.map((d) => (
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
        <h2 className="section-title">{s.cookingTitle}</h2>
        <p>{s.cookingBody}</p>
        <div className="insight-callout">
          <p>{s.cookingInsight}</p>
        </div>
        <figure className="sous-flow reveal">
          <img src={sousStepByStep} alt="Sous end-to-end flow — five key screens" loading="lazy" />
        </figure>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">{s.outcomeTitle}</h2>
        <p>{s.outcomeIntro}</p>
        <div className="ia-pills">
          {s.outcomes.map((t) => <span key={t} className="pill">{t}</span>)}
        </div>
      </section>

      <figure className="sous-flow reveal">
        <img src={sousDesignSystem} alt="Sous design system — colors, typography, components" loading="lazy" />
      </figure>

      <figure className="sous-mockup reveal">
        <img src={sousMockup} alt="Sous mockup in context" loading="lazy" />
      </figure>

      <CaseNav prev={prev} next={next} />
    </article>
  );
}

function OverseerCase({ prev, next }: { prev: ProjectCopy | null; next: ProjectCopy | null }) {
  const copy = useCopy();
  const o = copy.overseer;
  return (
    <article className="section">
      <a href="#projects" className="back-link reveal">{copy.caseUI.backWork}</a>
      <h1 className="reveal sous-title">{o.title}</h1>
      <p className="sous-meta reveal">{copy.caseUI.metaLineOverseer}</p>
      <div className="sous-pills reveal">
        {o.pills.map((p) => <span key={p} className="pill">{p}</span>)}
      </div>
      <div className="confidentiality-notice reveal">{copy.caseUI.confidentiality}</div>

      <figure className="sous-mockup reveal">
        <img src={overseerCover} alt="Overseer — aircraft maintenance management cover" loading="lazy" />
      </figure>

      <section className="sous-section reveal">
        <h2 className="section-title">{copy.caseUI.overview}</h2>
        <p className="big">{o.overview}</p>
        <div className="stat-row">
          {o.stats.map((s) => (
            <div key={s.label} className="stat">
              <p className="stat-label">{s.label}</p>
              <p className="stat-value">{s.value}</p>
              <p className="stat-sub">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">{o.industryTitle}</h2>
        <div className="industry-context">
          <h3>{o.industryHeadline}</h3>
          <p>{o.industryBody}</p>
        </div>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">{o.featuresTitle}</h2>
        <p>{o.featuresIntro}</p>
        <ul className="feature-list">
          {o.features.map((f) => (
            <li key={f.name}>
              <span className="feature-name">{f.name}</span>
              <span className="feature-body">{f.body}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">{o.dsTitle}</h2>
        <p>{o.dsBody}</p>
        <div className="insight-callout">
          <p>{o.dsInsight}</p>
        </div>
      </section>

      <section className="sous-section focus-section reveal">
        <h2 className="section-title">{o.focusTitle}</h2>
        <p>{o.focusIntro}</p>
        <ol className="numbered-list">
          {o.decisions.map((d) => (
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
        <img src={overseerDetail} alt="Overseer work order detail screen" loading="lazy" />
      </figure>

      <figure className="sous-mockup reveal">
        <img src={overseerList} alt="Overseer work order list" loading="lazy" />
      </figure>

      <section className="sous-section reveal">
        <h2 className="section-title">{o.impactTitle}</h2>
        <div className="impact-grid">
          <p>{o.impactBody}</p>
          <div className="impact-stats">
            {o.impactStats.map((s) => (
              <div key={s.org} className="impact-stat-card">
                <p className="impact-org">{s.org}</p>
                <p className="impact-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="ia-pills">
          {o.outcomes.map((t) => <span key={t} className="pill">{t}</span>)}
        </div>
      </section>

      <figure className="sous-mockup reveal">
        <img src={overseerReport} alt="Overseer labor report" loading="lazy" />
        <figcaption className="image-caption">{o.reportCaption}</figcaption>
      </figure>

      <CaseNav prev={prev} next={next} />
    </article>
  );
}

function ArgoCase({ prev, next }: { prev: ProjectCopy | null; next: ProjectCopy | null }) {
  const copy = useCopy();
  const a = copy.argo;
  return (
    <article className="section">
      <a href="#projects" className="back-link reveal">{copy.caseUI.backWork}</a>
      <h1 className="reveal sous-title">{a.title}</h1>
      <p className="sous-meta reveal">{copy.caseUI.metaLineArgo}</p>
      <div className="sous-pills reveal">
        {a.pills.map((p) => <span key={p} className="pill">{p}</span>)}
      </div>
      <div className="confidentiality-notice reveal">{copy.caseUI.confidentiality}</div>

      <figure className="sous-mockup reveal">
        <img src={argoCover} alt="Argo — carbon credits management platform cover" loading="lazy" />
      </figure>

      <section className="sous-section reveal">
        <h2 className="section-title">{copy.caseUI.overview}</h2>
        <p className="big">{a.overview}</p>
        <div className="stat-row">
          {a.stats.map((s) => (
            <div key={s.label} className="stat">
              <p className="stat-label">{s.label}</p>
              <p className="stat-value">{s.value}</p>
              <p className="stat-sub">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">{a.contextTitle}</h2>
        <div className="industry-context">
          <h3>{a.contextHeadline}</h3>
          <p>{a.contextBody}</p>
        </div>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">{a.estimateTitle}</h2>
        <p>{a.estimateIntro}</p>

        <div className="estimate-options">
          {[a.optionA, a.optionB].map((opt, i) => (
            <div key={opt.tag} className={`estimate-option ${i === 0 ? "estimate-option-a" : "estimate-option-b"}`}>
              <p className="estimate-tag">{opt.tag}</p>
              <h3>{opt.title}</h3>
              <p className="estimate-summary">{opt.summary}</p>
              <p>{opt.body}</p>
              <ul className="estimate-bullets">
                {opt.bullets.map((b) => (
                  <li key={b.label}><strong>{b.label}</strong> — {b.value}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p>{a.estimateFollowup}</p>

        <div className="insight-callout">
          <p>{a.estimateInsight}</p>
        </div>

        <figure className="sous-mockup" style={{ marginTop: "2rem" }}>
          <img src={argoEstimate} alt="Argo estimate screen" loading="lazy" />
        </figure>
      </section>

      <section className="sous-section reveal">
        <h2 className="section-title">{a.contributionTitle}</h2>
        <p>{a.contributionIntro}</p>
        <ol className="numbered-list">
          {a.contributions.map((d) => (
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
        <img src={argoDrawBoundary} alt="Argo Draw Boundary tool" loading="lazy" />
      </figure>

      <figure className="sous-mockup reveal">
        <img src={argoDataCollection} alt="Argo Data Collection module" loading="lazy" />
      </figure>

      <section className="sous-section reveal">
        <h2 className="section-title">{a.challengesTitle}</h2>
        <p>{a.challengesIntro}</p>
        <ol className="numbered-list">
          {a.challenges.map((d) => (
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
        <h2 className="section-title">{a.impactTitle}</h2>
        <p>{a.impactBody}</p>
        <div className="ia-pills">
          {a.outcomes.map((t) => <span key={t} className="pill">{t}</span>)}
        </div>
      </section>

      <CaseNav prev={prev} next={next} />
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
.nav, .nav *, .section-title {
  text-transform: lowercase;
}
.lang-toggle, .lang-toggle * { text-transform: none; }
.site { min-height: 100vh; display: flex; flex-direction: column; }
.nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.25rem clamp(1rem, 4vw, 3rem);
  border-bottom: 1px solid var(--color-divider);
  position: sticky; top: 0;
  background: #E8DBC8;
  backdrop-filter: blur(8px); z-index: 10;
}
.nav-left { display: flex; align-items: center; gap: 0.75rem; }
[data-theme="dark"] .nav { background: #060503; border-bottom-color: #060503; }
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
  width: 36px; height: 36px;
  border-radius: var(--radius-sm, 6px);
  border: 1px solid var(--color-border);
  background: var(--color-surface-offset);
  color: var(--color-text); cursor: pointer; font-size: 18px; line-height: 1;
  transition: color .2s, background .2s, border-color .2s;
  flex-shrink: 0;
}
.theme-toggle:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background: color-mix(in oklab, var(--color-primary) 10%, var(--color-surface-offset));
}
[data-theme="dark"] .theme-toggle { color: #E8DDD0; background: #312A18; border-color: #564A2F; }
[data-theme="dark"] .theme-toggle:hover { color: #F2AB6D; border-color: #F2AB6D; background: color-mix(in oklab, #F2AB6D 12%, #312A18); }
.lang-toggle {
  display: inline-flex; align-items: center; justify-content: center;
  gap: 0.35rem;
  height: 36px; padding: 0 0.65rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-surface-offset);
  color: var(--color-text-muted); cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.72rem; font-weight: 600; letter-spacing: 0.04em;
  transition: color .2s, background .2s, border-color .2s;
  flex-shrink: 0;
}
.lang-toggle:hover {
  border-color: var(--color-primary);
  background: color-mix(in oklab, var(--color-primary) 10%, var(--color-surface-offset));
}
.lang-toggle .lang-active { color: var(--color-primary); }
.lang-toggle .lang-sep { opacity: 0.5; }
[data-theme="dark"] .lang-toggle { color: #A89880; background: #312A18; border-color: #564A2F; }
[data-theme="dark"] .lang-toggle:hover { border-color: #F2AB6D; background: color-mix(in oklab, #F2AB6D 12%, #312A18); }
[data-theme="dark"] .lang-toggle .lang-active { color: #F2AB6D; }
.lang-toggle:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
.theme-toggle:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
.project-meta-line {
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin: 0.6rem 0 0;
  padding-top: 0.6rem;
  border-top: 1px solid var(--color-border);
  white-space: nowrap;
}
.image-caption {
  margin-top: 0.75rem; padding: 0 0.25rem;
  font-size: 0.85rem; color: var(--color-text-muted);
  font-style: italic; line-height: 1.5; text-align: center;
}
main { flex: 1; }
.hero {
  padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem);
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
  padding: clamp(1.75rem, 4vw, 3rem) clamp(1rem, 4vw, 3rem);
  max-width: 1100px; margin: 0 auto;
}
.section.narrow { max-width: 760px; }
.section-title {
  font-family: var(--font-display); font-weight: 700;
  font-size: 0.85rem; letter-spacing: 0.18em;
  color: var(--color-primary); margin-bottom: 2rem;
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
.project-meta { display: flex; flex-direction: column; gap: 0.4rem; }
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
.estimate-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin: 1.75rem 0;
}
@media (max-width: 760px) {
  .estimate-options { grid-template-columns: 1fr; }
}
.estimate-option {
  padding: 1.5rem 1.5rem 1.75rem;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  display: flex; flex-direction: column; gap: 0.6rem;
}
.estimate-option-a {
  background: var(--color-surface-offset);
  border-color: var(--color-divider);
}
.estimate-option-b {
  background: color-mix(in oklab, var(--color-primary) 8%, var(--color-surface));
  border-color: color-mix(in oklab, var(--color-primary) 35%, var(--color-border));
}
.estimate-option h3 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  margin: 0;
  color: var(--color-text);
}
.estimate-tag {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
}
.estimate-summary {
  font-style: italic;
  color: var(--color-text-muted);
  margin: 0 0 0.4rem;
}
.estimate-bullets {
  list-style: none;
  padding: 0;
  margin: 0.4rem 0 0;
  display: flex; flex-direction: column; gap: 0.4rem;
}
.estimate-bullets li {
  font-size: 0.92rem;
  color: var(--color-text);
  padding-top: 0.4rem;
  border-top: 1px solid var(--color-border);
}
.estimate-bullets li:first-child { border-top: none; padding-top: 0; }
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



/* overseer-specific */
.confidentiality-notice {
  margin: 0 0 2rem;
  padding: 0.75rem 1rem;
  background: var(--color-surface-offset);
  color: var(--color-text-muted);
  border-radius: 8px;
  font-size: 0.82rem;
  line-height: 1.5;
}
.industry-context {
  margin-top: 1.5rem;
  padding: 1.75rem 2rem;
  border-left: 3px solid var(--color-accent-warm);
  background: color-mix(in oklab, var(--color-accent-warm) 8%, transparent);
  border-radius: 0 12px 12px 0;
}
.industry-context h3 {
  font-family: var(--font-display); font-weight: 700;
  font-size: clamp(1.25rem, 2.2vw, 1.6rem);
  color: var(--color-text); margin: 0 0 0.75rem; line-height: 1.25;
}
.industry-context p {
  font-size: 1.05rem; color: var(--color-text); margin: 0; line-height: 1.65;
}
.feature-list {
  list-style: none; padding: 0; margin: 1.5rem 0 0;
}
.feature-list li {
  display: grid; grid-template-columns: 1fr 2fr; gap: 1.5rem;
  padding: 1.1rem 0; border-bottom: 1px solid var(--color-border);
  align-items: baseline;
}
.feature-list li:last-child { border-bottom: none; }
.feature-name {
  font-family: var(--font-display); font-weight: 700;
  font-size: 1rem; color: var(--color-text); letter-spacing: 0.01em;
}
.feature-body {
  color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.55;
}
.focus-section { margin: 5rem 0; }
.impact-grid {
  margin-top: 1.5rem;
  display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem;
  align-items: start;
}
.impact-grid > p { font-size: 1.02rem; line-height: 1.7; color: var(--color-text); margin: 0; }
.impact-stats { display: flex; flex-direction: column; gap: 1rem; }
.impact-stat-card {
  padding: 1.5rem;
  background: var(--color-surface-offset);
  border: 1px solid var(--color-divider);
  border-radius: 14px;
}
.impact-org {
  font-family: var(--font-display); font-weight: 700;
  font-size: clamp(1.1rem, 1.8vw, 1.35rem);
  color: var(--color-text); margin: 0 0 0.5rem; line-height: 1.2;
}
.impact-label {
  font-size: 0.85rem; color: var(--color-text-muted); margin: 0; line-height: 1.5;
}
@media (max-width: 768px) {
  .feature-list li { grid-template-columns: 1fr; gap: 0.4rem; }
  .impact-grid { grid-template-columns: 1fr; gap: 1.5rem; }
}
`;
