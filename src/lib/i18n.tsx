import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "pt";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved === "en" || saved === "pt") {
        setLangState(saved);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useT() {
  const { lang } = useLanguage();
  return (en: string, pt: string) => (lang === "pt" ? pt : en);
}

// ============================================================
// Structured content for both languages
// ============================================================

export type ProjectCopy = {
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  summary: string;
  tags: string[];
};

export type StatCopy = { label: string; value: string; sub: string };
export type CardCopy = { eyebrow?: string; n?: string; title: string; body: string };
export type PersonaCopy = { name: string; quote: string; problem: string; pain: string };

export type Copy = {
  nav: { work: string; about: string; contact: string; brandTitle: string; themeLight: string; themeDark: string; langToggle: string };
  hero: { eyebrow: string; title: string; viewWork: string; getInTouch: string };
  homeAbout: {
    title: string;
    body: string;
    educationKicker: string;
    education: string;
    educationSub: string;
    toolkitKicker: string;
    languagesKicker: string;
    languages: string[];
  };
  selectedWork: string;
  projects: ProjectCopy[];
  projectsView: { eyebrowSuffix: string; title: string };
  contact: {
    eyebrow: string;
    title: string;
    lede: string;
    email: string;
    phone: string;
    basedIn: string;
    basedInValue: string;
    elsewhere: string;
  };
  footer: { copyright: string };
  notFoundProject: { eyebrow: string; title: string; back: string };
  caseUI: {
    backWork: string;
    metaLineSous: string;
    metaLineOverseer: string;
    metaLineArgo: string;
    confidentiality: string;
    overview: string;
    prevProject: string;
    nextProject: string;
    allWork: string;
  };
  sous: {
    title: string;
    pills: string[];
    overview: string;
    stats: StatCopy[];
    researchTitle: string;
    researchIntro: string;
    research: CardCopy[];
    personasTitle: string;
    personasIntro: string;
    personas: PersonaCopy[];
    designProcessTitle: string;
    designProcessIntro: string;
    process: CardCopy[];
    designDecisionsTitle: string;
    designDecisionsIntro: string;
    decisions: CardCopy[];
    cookingTitle: string;
    cookingBody: string;
    cookingInsight: string;
    outcomeTitle: string;
    outcomeIntro: string;
    outcomes: string[];
    problemLabel: string;
    painLabel: string;
  };
  overseer: {
    title: string;
    pills: string[];
    overview: string;
    stats: StatCopy[];
    industryTitle: string;
    industryHeadline: string;
    industryBody: string;
    dsTitle: string;
    dsBody: string;
    dsInsight: string;
    focusTitle: string;
    focusIntro: string;
    decisionsWorkOrderLabel: string;
    decisionsAskseerLabel: string;
    decisions: CardCopy[];
    askseerDecisions: CardCopy[];
    workOrder: {
      sectionLabel: string;
      title: string;
      summary: string;
      capabilitiesTitle: string;
      capabilities: { name: string; body: string }[];
    };
    impactTitle: string;
    impactBody: string;
    impactStats: { org: string; label: string }[];
    outcomes: string[];
    askseer: {
      sectionLabel: string;
      title: string;
      summary: string;
      imageCaption: string;
      challengeTitle: string;
      challengeIntro: string;
      challengeItems: { name: string; body: string }[];
      solutionTitle: string;
      solutionBody: string;
      featuresTitle: string;
      askseerFeatures: { name: string; body: string }[];
      approachTitle: string;
      approachItems: { title: string; body: string }[];
      impactTitle: string;
      impactItems: { org: string; label: string }[];
      outcomes: string[];
    };
  };
  argo: {
    title: string;
    pills: string[];
    overview: string;
    stats: StatCopy[];
    contextTitle: string;
    contextHeadline: string;
    contextBody: string;
    estimateTitle: string;
    estimateIntro: string;
    optionA: { tag: string; title: string; summary: string; body: string; bullets: { label: string; value: string }[] };
    optionB: { tag: string; title: string; summary: string; body: string; bullets: { label: string; value: string }[] };
    estimateFollowup: string;
    estimateInsight: string;
    contributionTitle: string;
    contributionIntro: string;
    contributions: CardCopy[];
    challengesTitle: string;
    challengesIntro: string;
    challenges: CardCopy[];
    impactTitle: string;
    impactBody: string;
    outcomes: string[];
  };
};

const en: Copy = {
  nav: { work: "work", about: "about", contact: "contact", brandTitle: "ux/ui designer", themeLight: "Switch to dark mode", themeDark: "Switch to light mode", langToggle: "Switch language" },
  hero: {
    eyebrow: "portfolio · 2016 — 2026",
    title: "Helping people work better in complex tools.",
    viewWork: "view work →",
    getInTouch: "get in touch",
  },
  homeAbout: {
    title: "about",
    body: "I'm Arno Klettenberg, a UX/UI designer based in Curitiba, Brazil. I design complex digital products for regulated, data-heavy environments — aircraft maintenance platforms, carbon credit systems, and enterprise B2B tools. I care about the details that matter in the field: the table that's readable at 6am in a shop, the form that doesn't lose your data, the map tool that works without internet.",
    educationKicker: "education",
    education: "Bachelor of Industrial Design — PUC-PR, Curitiba.",
    educationSub: "Specialization in design trend watching.",
    toolkitKicker: "toolkit",
    languagesKicker: "languages",
    languages: ["Portuguese (native)", "English (fluent)"],
  },
  selectedWork: "selected work",
  projects: [
    { slug: "sous", title: "Sous — Just-in-Time Cooking", client: "Portfolio project", year: "2026", role: "UX/UI Designer", summary: "A just-in-time cooking assistant for busy beginners — no pantry database, no decision fatigue, just dinner.", tags: ["mobile", "ux design", "product concept"] },
    { slug: "overseer", title: "Overseer — Aircraft Maintenance Management", client: "Professional design project", year: "2025", role: "UX/UI Designer", summary: "A cross-platform web and mobile MRO platform that consolidates work orders, discrepancies, labor reporting and compliance into a single focused workspace.", tags: ["b2b saas", "web & mobile", "MRO platform", "ux design", "design system"] },
    { slug: "argo", title: "Argo — Carbon Credits Management Platform", client: "Professional design project", year: "2024", role: "UX/UI Designer", summary: "A carbon credits platform connecting farmers and ranchers with voluntary carbon markets — boundary drawing, data collection and an 11-year credit projection.", tags: ["b2b saas", "web app", "agtech", "ux design", "data visualization"] },
  ],
  projectsView: { eyebrowSuffix: "selected", title: "projects" },
  contact: {
    eyebrow: "contact",
    title: "let's talk.",
    lede: "I'm open to new projects and collaborations. If you're working on something thoughtful — wherever you are in the world — I'd love to hear about it.",
    email: "email",
    phone: "phone / whatsapp",
    basedIn: "based in",
    basedInValue: "Curitiba, PR — Brazil",
    elsewhere: "elsewhere",
  },
  footer: { copyright: "© 2026 arno klettenberg" },
  notFoundProject: { eyebrow: "not found", title: "that project doesn't exist.", back: "← work" },
  caseUI: {
    backWork: "← work",
    metaLineSous: "UX/UI Designer · Portfolio project · 2026 · Figma · Claude · Miro",
    metaLineOverseer: "UX/UI Designer · Professional design project · 2025 · Figma · B2B SaaS",
    metaLineArgo: "UX/UI Designer · Professional design project · 2024 · Figma · B2B SaaS",
    confidentiality: "This is a real shipped product. Name and branding have been changed for confidentiality.",
    overview: "overview",
    prevProject: "← previous project",
    nextProject: "next project →",
    allWork: "all work →",
  },
  sous: {
    title: "Sous — Just-in-Time Cooking",
    pills: ["mobile", "ux design", "product concept"],
    overview: "Sous is a just-in-time cooking assistant for busy beginners who want to eat well without the friction of meal planning or pantry management. Instead of asking users to maintain a digital inventory, Sous takes whatever ingredients they have on hand, a time budget, and a few dietary constraints, then narrows thousands of recipes down to 3–5 actionable matches.",
    stats: [
      { label: "target user", value: "busy beginner", sub: "cooks 1–2× a week" },
      { label: "core constraint", value: "≤ 15 sec", sub: "time to first recipe match" },
      { label: "app pillars", value: "4 screens", sub: "cook · saved · habits · profile" },
      { label: "project type", value: "concept", sub: "end-to-end UX design" },
    ],
    researchTitle: "research",
    researchIntro: "Every pixel in Sous was designed to solve a specific, researched problem — anchored on three pillars.",
    research: [
      { eyebrow: "pillar 01", title: "The psychology of administrative burden", body: "Every time an app asks a user to log an item or choose from a list of 100, it spends their mental energy. For someone coming home after an 8-hour workday, that energy is already at zero." },
      { eyebrow: "pillar 02", title: "Inventory managers vs. assistants", body: "Most cooking apps focus on storage — managing a database — rather than execution. That leaves a wide gap for a just-in-time engine that requires no prior data entry." },
      { eyebrow: "pillar 03", title: "The kitchen as a hostile environment", body: "Cooking happens in high-glare environments with temporarily disabled hands — messy, wet, busy. That reframed the work from mobile UI to contextual utility." },
    ],
    personasTitle: "personas",
    personasIntro: "Three archetypes cover the most common barriers to healthy cooking — different entry points into the same problem of administrative burnout.",
    personas: [
      { name: "Alex", quote: "I just want to eat something healthy without having to think about it after an 8-hour workday.", problem: "Has a fridge with random ingredients but lacks the mental energy to figure out how they fit together.", pain: "Choice overload sends Alex straight back to delivery apps." },
      { name: "Jordan", quote: "I want to eat better, but I'm terrified of wasting food or ruining a recipe because I'm missing one specific herb.", problem: "If a recipe calls for kale and Jordan only has spinach, they assume the dish is off the table.", pain: "Fear of failure and lack of chef's intuition." },
      { name: "Sam", quote: "I hate wasting food, but I don't have the patience to maintain a digital inventory of every onion in my drawer.", problem: "Has tried fridge tracker apps before but finds the upkeep impossible.", pain: "The tax of logging groceries is higher than the benefit of the app." },
    ],
    designProcessTitle: "design process",
    designProcessIntro: "Moving from the chaos of a messy kitchen to the clarity of a guided cooking experience, using the Design Thinking methodology.",
    process: [
      { n: "01", title: "Empathize", body: "Audited the recipe app landscape and identified that constant grocery logging creates an inventory burden — a real barrier to healthy eating. Users want to cook, not manage a database." },
      { n: "02", title: "Define", body: "Framed the product as a just-in-time engine: a high-value, zero-maintenance assistant that delivers immediate solutions without administrative upkeep." },
      { n: "03", title: "Ideate", body: "Mapped critical edge cases alongside the happy path — no matching ingredients, skipped steps, connectivity dropping mid-recipe — so the design held up under real-world failure." },
      { n: "04", title: "Prototype", body: "Built inclusive interactions: voice commands, oversized tap targets, and high-contrast surfaces that work with messy hands or limited dexterity." },
      { n: "05", title: "Test", body: "Working with a culinary expert, Cook Mode shifted from dense text lists to a one-step-at-a-time card layout with integrated timers — cutting cognitive load in high-activity kitchens." },
    ],
    designDecisionsTitle: "design decisions",
    designDecisionsIntro: "Four principles shaped every screen in the app.",
    decisions: [
      { n: "01", title: "Zero inventory model", body: "No pantry database to maintain. Ingredients are entered fresh at the moment of cooking — a 15-second input, not a 15-minute setup." },
      { n: "02", title: "Time-first matching", body: "The time slider is the first input. 'I have 20 minutes' becomes the starting point, not a constraint added after browsing." },
      { n: "03", title: "Mise en place screen", body: "Before any instruction appears, Sous surfaces every ingredient and physical tool needed. No mid-cook surprises, no dead ends at step 4." },
      { n: "04", title: "Smart substitutions", body: "When an ingredient is missing, Sous offers a vetted swap with a plain-language culinary reason — building intuition, not just workarounds." },
    ],
    cookingTitle: "cooking mode",
    cookingBody: "Cook Mode is the heart of Sous: one step at a time, oversized tap targets, integrated timers, and a screen that stays awake while hands stay busy.",
    cookingInsight: "The design principle: every feature in Cook Mode exists to reduce the number of things the user has to think about while physically cooking.",
    outcomeTitle: "outcome",
    outcomeIntro: "An end-to-end concept that reframes cooking apps from inventory managers into assistants.",
    outcomes: ["Zero inventory model", "Mise en place checkpoint", "Smart substitutions with culinary logic", "Habit loop with identity-based milestones", "Accessible Cook Mode with wakelock + timers"],
    problemLabel: "The problem.",
    painLabel: "Main pain point.",
  },
  overseer: {
    title: "Overseer — Aircraft Maintenance Management",
    pills: ["b2b saas", "web & mobile", "MRO platform", "ux design", "design system"],
    overview: "Overseer is a cross-platform aircraft maintenance management system — available on web and mobile — built for MRO organizations, independent A&P mechanics, and fleet operators. It digitizes the entire maintenance workflow: from work order creation and discrepancy tracking to labor reporting, compliance documentation, inventory management, and crew coordination. The platform serves pilots, fleets, and maintenance professionals across a single connected system.",
    stats: [
      { label: "platform", value: "web + mobile", sub: "cross-platform B2B SaaS" },
      { label: "users", value: "MROs · mechanics · fleet ops", sub: "pilots and maintenance professionals" },
      { label: "my contribution", value: "Work Order MX & AskSeer", sub: "plus supporting features and design system" },
      { label: "real-world impact", value: "Robinson · Garmin", sub: "enterprise deals closed" },
    ],
    industryTitle: "the industry context",
    industryHeadline: "Almost every aircraft in the world is still maintained with paper and pencil.",
    industryBody: "Even today, the majority of general aviation and MRO maintenance documentation is still analog — handwritten work orders, paper logbooks, pencil-marked inspection sheets. Regulatory compliance, multi-technician coordination, and customer communication all run through physical documents that can be lost, misread, or never filed. Overseer exists to replace that stack of paper with a single connected platform that travels with the aircraft.",
    dsTitle: "design system",
    dsBody: "The Overseer design system existed when I joined the project — but it was significantly outdated and inconsistent. Rather than patching it, I rebuilt it from scratch: re-establishing the token structure, auditing and redrawing components, and documenting usage rules the team could follow. I preserved variables and components where they still held up, but the result was effectively a new system built on the bones of the old one. The Work Order module was the first feature designed entirely within the rebuilt system.",
    dsInsight: "Designing within a system you built yourself creates a different kind of accountability. Every component decision in the Work Order had to work not just for this screen, but for every screen that came after it.",
    focusTitle: "focus: Work Order MX & AskSeer",
    focusIntro: "Two modules carried the most direct user impact across this platform. Work Order MX became the operational backbone — replacing paper squawk sheets with a single connected workflow — and AskSeer added a conversational layer on top of it, turning dense aircraft data into something users could simply ask for. The decisions below trace the core architectural calls for each, side by side.",
    decisionsWorkOrderLabel: "Work Order MX",
    decisionsAskseerLabel: "AskSeer",
    decisions: [
      { n: "01", title: "Work order as the single source of truth", body: "Customer info, aircraft context, schedule, labor rate, tooling, discrepancies, costs, and sign-offs all live inside one work order. Nothing is scattered across separate tools or paper sheets." },
      { n: "02", title: "Hierarchical discrepancy list", body: "Each work order contains a nested discrepancy list — items and sub-items — where mechanics log findings, estimated and actual hours, parts used, action taken, and approval status per line. This replaces the handwritten squawk sheet." },
      { n: "03", title: "Labor visibility for supervisors", body: "Hours are logged at the sub-item level by technician, giving supervisors a real-time view of job progress without walking the shop floor — and a client-ready labor report generates automatically from the same data." },
      { n: "04", title: "Tooling allocation", body: "Tools are assigned directly to the work order — not just noted on paper — creating accountability and reducing the 'where is the torque wrench' problem endemic to shared shop environments." },
      { n: "05", title: "Status workflow", body: "Work orders move through defined states (Estimate, In Progress, Submitted, Archived) with role-based permissions on transitions. Customers gain visibility into their aircraft's status without a phone call." },
    ],
    askseerDecisions: [
      { n: "01", title: "Conversational layer, not another module", body: "AskSeer was designed to sit on top of Overseer rather than become a separate destination. Users open it inside whatever screen they're already on and ask in natural language." },
      { n: "02", title: "Context-aware to the current aircraft", body: "The assistant always knows which tail number and which screen the user is on, so answers stay scoped to the right aircraft without re-stating context every turn." },
      { n: "03", title: "In-chat log upload and processing", body: "Aircraft logs can be dragged directly into the chat for parsing — the assistant extracts and surfaces what's relevant instead of asking the user to dig through a viewer." },
      { n: "04", title: "Compliance verification in seconds", body: "AD, Service Bulletin, manual, and documentation status can be validated through a single question per aircraft, replacing multi-step cross-referencing across modules." },
      { n: "05", title: "Embedded floating panel", body: "The assistant lives inside the existing workspace as a floating panel — not a separate tool or new page — so it amplifies the current workflow rather than fragmenting it." },
    ],
    workOrder: {
      sectionLabel: "module 01 of 02",
      title: "Work Order MX",
      summary: "Work Order MX is the operational backbone of Overseer. It replaces handwritten squawk sheets, paper logbooks, and scattered spreadsheets with a single connected workflow that travels with the aircraft — from estimate through sign-off and client-ready reporting.",
      capabilitiesTitle: "key capabilities",
      capabilities: [
        { name: "Single source of truth", body: "Customer info, aircraft context, schedule, labor rate, tooling, discrepancies, costs, and sign-offs all live inside one work order." },
        { name: "Hierarchical discrepancies", body: "Nested items and sub-items capture findings, estimated and actual hours, parts used, action taken, and approval status per line." },
        { name: "Labor & cost reporting", body: "Hours logged at the sub-item level by technician feed real-time progress views and auto-generated client-ready labor reports." },
        { name: "Tooling & status workflow", body: "Tools are assigned directly to the work order, and orders progress through defined states with role-based permissions on each transition." },
      ],
    },
    impactTitle: "impact",
    impactBody: "Overseer is a live product used by real MRO organizations. The Work Order module — and the broader platform work I contributed to — played a direct role in closing partnerships with two of the largest names in general aviation. These weren't small deals: Robinson Helicopter Company and Garmin both integrated Overseer into their aircraft and systems, validating the platform's readiness for enterprise-scale operations.",
    impactStats: [
      { org: "Robinson Helicopter Company", label: "Enterprise partnership — digital maintenance management added to future aircraft production." },
      { org: "Garmin", label: "Integration partnership — live flight logs, digital records, and maintenance management connected to Garmin avionics." },
    ],
    outcomes: ["cross-platform web + mobile", "work order module — built from scratch", "design system reconstruction", "hierarchical discrepancy tracking", "client-ready labor reporting", "Robinson & Garmin partnerships"],
    askseer: {
      sectionLabel: "a sub-product within Overseer",
      title: "AskSeer — AI-Powered Maintenance Assistant",
      summary: "AskSeer is an AI chatbot embedded directly into the Overseer platform. It gives maintenance teams, aircraft owners, operators, and administrators instant conversational access to aircraft information, maintenance records, compliance status, and documentation — without forcing them through multiple screens to find it.",
      imageCaption: "AskSeer answering an equipment-list question in context of the currently selected aircraft, embedded directly inside the Work Order MX screen.",
      challengeTitle: "the challenge",
      challengeIntro: "Aircraft maintenance and compliance involve a large amount of technical information spread across multiple modules. Even with Overseer consolidating the data, users still had to click through several screens for routine questions:",
      challengeItems: [
        { name: "Information overload", body: "Aircraft specs, equipment lists, maintenance history, and operational status are all available — but each lives in its own view." },
        { name: "Compliance complexity", body: "Confirming whether ADs, Service Bulletins, and current manuals are attached and up to date requires cross-referencing several records per aircraft." },
        { name: "Navigation inefficiencies", body: "Daily tasks like 'is this aircraft current?' or 'what's the latest squawk?' shouldn't require a multi-step navigation flow." },
      ],
      solutionTitle: "the solution",
      solutionBody: "Rather than building yet another module, AskSeer was designed as a conversational layer that sits on top of Overseer. Users open the assistant inside whatever screen they're already on, ask in natural language, and receive context-aware answers grounded in the currently selected aircraft.",
      featuresTitle: "key capabilities",
      askseerFeatures: [
        { name: "Aircraft information retrieval", body: "Ask about a specific aircraft and instantly receive specs, equipment lists, maintenance status, history, or operational details — without leaving the screen." },
        { name: "Log upload & processing", body: "Drag aircraft logs into the chat interface for analysis and processing, with the assistant extracting and surfacing what's relevant." },
        { name: "Compliance verification", body: "Validate in seconds whether ADs, Service Bulletins, maintenance manuals, and compliance records are present and current for the selected aircraft." },
        { name: "Intelligent workflow assistance", body: "Guides users through maintenance workflows, suggests the next reasonable action, and reduces the time spent hunting across modules." },
      ],
      approachTitle: "design approach",
      approachItems: [
        { title: "Understanding user workflows", body: "Mapped how mechanics, supervisors, and operators actually move through Overseer day to day to identify where friction concentrated — most of it sat in lookup and verification tasks, not in the core operational flows." },
        { title: "Conversational UX", body: "Designed the prompt patterns, suggested questions, and response formatting so that natural-language interaction reduced complexity instead of adding another interface to learn." },
        { title: "Context-aware assistance", body: "AskSeer always knows which aircraft is currently selected and which screen the user is on, so answers stay scoped to the right tail number without requiring users to re-specify context every turn." },
        { title: "Embedded experience", body: "The assistant lives inside the existing workspace as a floating panel — not as a separate tool or new page — so it amplifies the current workflow rather than fragmenting it." },
      ],
      impactTitle: "impact",
      impactItems: [
        { org: "Faster information access", label: "Routine aircraft and compliance lookups answered in a single question instead of multi-step navigation." },
        { org: "Reduced navigation time", label: "Users stay in the screen they were already working in; AskSeer brings the data to them." },
        { org: "Improved compliance visibility", label: "AD, SB, manual, and documentation status verifiable in seconds, on demand, per aircraft." },
        { org: "Better user efficiency", label: "Maintenance teams, owners, and admins complete daily operational tasks with fewer clicks and less context switching." },
      ],
      outcomes: ["embedded AI assistant", "context-aware to current aircraft", "conversational compliance checks", "in-chat log upload", "suggested prompts", "reduced navigation overhead"],
    },
  },
  argo: {
    title: "Argo — Carbon Credits Management Platform",
    pills: ["b2b saas", "web app", "agtech", "ux design", "data visualization"],
    overview: "Argo is a carbon credits management platform that connects farmers and ranchers with voluntary carbon markets. Landowners upload or draw their farm boundaries directly on a satellite map, apply science-backed land management practices, and receive an 11-year projection of the carbon credits their land could generate. Argo handles the entire process — from initial enrollment and soil data collection through credit issuance and payment — taking a percentage for facilitating the program. My work focused on two of the platform's most important user-facing modules: the Draw Boundary tool and the Data Collection module.",
    stats: [
      { label: "platform", value: "web app", sub: "B2B SaaS · agtech" },
      { label: "users", value: "farmers · ranchers", sub: "landowners across North America" },
      { label: "my contribution", value: "2 core modules", sub: "Draw Boundary + Data Collection" },
      { label: "project type", value: "real product", sub: "shipped · name changed for confidentiality" },
    ],
    contextTitle: "the context",
    contextHeadline: "Farmers are sitting on one of the largest untapped carbon sinks on the planet — and most don't know it.",
    contextBody: "Regenerative land management practices — reduced tillage, cover cropping, improved grazing — sequester carbon in the soil at scale. But translating those practices into verified, tradeable carbon credits requires scientific modeling, regulatory compliance, and years of documentation that most individual landowners can't navigate alone. Argo exists to make that process accessible: a farmer draws their fields, logs their practices, and Argo handles the rest — turning better land stewardship into a new revenue stream.",
    estimateTitle: "the estimate",
    estimateIntro: "The Estimate screen was the first thing I worked on after joining the project. My specific contribution was adding the Option B payment model and its business rules to the existing payment flow — designing a second payout structure that could sit alongside the original Option A without breaking the surrounding screens. Before a farmer commits to any practice changes, Argo gives them a full financial picture: total carbon tonnage, deductions, payable carbon, and a year-by-year payment calendar — so the decision is financial, not technical.",
    optionA: {
      tag: "Option A",
      title: "Full-payment model",
      summary: "Higher total return, longer wait.",
      body: "The farmer receives the total carbon value of their land in two payments — at year 5 and year 11. Best for landowners who can absorb the wait in exchange for the largest possible payout.",
      bullets: [
        { label: "Payout schedule", value: "year 5 and year 11" },
        { label: "Profile", value: "maximum return" },
        { label: "Tradeoff", value: "no early cash flow" },
      ],
    },
    optionB: {
      tag: "Option B",
      title: "Cash-flow model",
      summary: "Smaller, earlier payments to fund the work.",
      body: "Smaller payments distributed across years 1 through 5, followed by a larger payment at year 11. Lower total return, but the early payments help fund the practice changes required to generate the credits in the first place.",
      bullets: [
        { label: "Payout schedule", value: "years 1–5, plus year 11" },
        { label: "Profile", value: "sustained cash flow" },
        { label: "Tradeoff", value: "lower total payout" },
      ],
    },
    estimateFollowup: "Once the farmer selects a preferred option, they connect with Argo's support team, who guide them through the next steps: using the draw boundary tool to define their fields and submit the initial deliverables required by Argo's engineers and agronomists to begin setting up the practice program.",
    estimateInsight: "The estimate had to answer \"how much do I get and when?\" before anything else. Option A or Option B isn't a technical choice — it's a cash flow decision for a working farm. The design had to make that comparison immediate and legible, not buried in footnotes.",
    contributionTitle: "my contribution",
    contributionIntro: "I was primarily responsible for two modules that sit at the beginning and the middle of the landowner journey — the moments where complexity is highest and where dropping out is most likely.",
    contributions: [
      { n: "01", title: "Draw Boundary tool", body: "An interactive satellite map interface where farmers draw the precise boundaries of their fields using polygon tools. The tool supports multiple drawing modes — freehand polygon, circular border, inner border — and allows users to name fields, set acreage, define land ownership type, and classify field type (row crop, range and pasture) before saving. Accuracy here determines the carbon calculation downstream, so the UX had to be precise without being intimidating to a rancher who has never used GIS software." },
      { n: "02", title: "Data Collection module", body: "A centralized, structured view of all data associated with a producer's farm — herd data, fertilizer and amendment applications, forage management practices, and more. Data is organized into collapsible sections per practice category, with inline error surfacing, edit mode, and multi-year filtering. This screen is the scientific backbone of the carbon estimate: every field logged here feeds directly into the carbon modeling engine." },
    ],
    challengesTitle: "design challenges",
    challengesIntro: "Both modules required solving for a user who is an expert in their land — but not in software.",
    challenges: [
      { n: "01", title: "Spatial accuracy vs. accessibility", body: "The Draw Boundary tool needed to be precise enough for scientific modeling while remaining usable by someone drawing field boundaries on a tablet from a ranch office. The solution was a constrained, opinionated drawing toolbar — limited options, clear visual feedback, and a fields list panel that kept the user grounded in what they'd already defined." },
      { n: "02", title: "Data density without overwhelm", body: "The Data Collection module aggregates years of agricultural practice data across multiple categories. The challenge was making that density navigable — collapsible sections, progressive disclosure, a persistent error count (\"Show only errors: 3\"), and multi-axis filtering (by field, by year, by event) all worked together to give the user control without cognitive overload." },
      { n: "03", title: "Offline-first in remote environments", body: "Ranchers and farmers often live and work in areas with no reliable internet connection. The platform had to function fully offline — syncing data when connectivity was restored. This shaped every interaction that involved saving field boundaries or logging practice data: nothing could depend on a live connection, and nothing could be lost." },
      { n: "04", title: "Designing for non-technical users", body: "The target user is an expert in land and livestock — not software. Most ranchers' closest reference for data entry is a spreadsheet. Every screen had to feel familiar to that mental model: tabular layouts, clear labels, predictable row structures, and no interaction patterns that required prior digital literacy. Complexity had to be invisible." },
      { n: "05", title: "Trust in the numbers", body: "The carbon estimate is the emotional core of the product — it's the number that convinces a skeptical farmer to enroll. Every design decision in the flow leading up to it had to build confidence that the inputs were correct, the methodology was sound, and the projected payment was real." },
    ],
    impactTitle: "impact",
    impactBody: "Argo operates in a market where trust and scientific credibility are the product. The Draw Boundary tool and Data Collection module sit at the foundation of that trust — they're the surfaces where the platform's scientific claims become the farmer's documented reality. Getting these two modules right meant the carbon models were fed accurate data, the estimates were defensible, and the landowners felt in control of a process that could generate meaningful income from land they already own.",
    outcomes: ["Interactive satellite boundary drawing", "Multi-mode polygon tools", "Hierarchical agricultural data collection", "11-year carbon credit projection", "Inline error surfacing and validation", "Professional design project"],
  },
};

const pt: Copy = {
  nav: { work: "trabalhos", about: "sobre", contact: "contato", brandTitle: "designer ux/ui", themeLight: "Mudar para o modo escuro", themeDark: "Mudar para o modo claro", langToggle: "Alterar idioma" },
  hero: {
    eyebrow: "portfólio · 2016 — 2026",
    title: "Ajudando as pessoas a trabalharem melhor em ferramentas complexas.",
    viewWork: "ver trabalhos →",
    getInTouch: "entrar em contato",
  },
  homeAbout: {
    title: "sobre",
    body: "Sou Arno Klettenberg, designer de UX/UI baseado em Curitiba, Brasil. Projeto produtos digitais complexos para ambientes regulados e densos em dados — plataformas de manutenção aeronáutica, sistemas de créditos de carbono e ferramentas corporativas B2B. Cuido dos detalhes que importam no campo: a tabela legível às 6h numa oficina, o formulário que não perde seus dados, a ferramenta de mapa que funciona sem internet.",
    educationKicker: "formação",
    education: "Bacharelado em Design Industrial — PUC-PR, Curitiba.",
    educationSub: "Especialização em pesquisa de tendências de design.",
    toolkitKicker: "ferramentas",
    languagesKicker: "idiomas",
    languages: ["Português (nativo)", "Inglês (fluente)"],
  },
  selectedWork: "trabalhos selecionados",
  projects: [
    { slug: "sous", title: "Sous — Cozinha Just-in-Time", client: "Projeto de portfólio", year: "2026", role: "Designer UX/UI", summary: "Um assistente de cozinha just-in-time para iniciantes ocupados — sem cadastro de despensa, sem fadiga de decisão, só o jantar.", tags: ["mobile", "ux design", "conceito de produto"] },
    { slug: "overseer", title: "Overseer — Gestão de Manutenção Aeronáutica", client: "Projeto profissional de design", year: "2025", role: "Designer UX/UI", summary: "Uma plataforma MRO web e mobile que consolida ordens de serviço, discrepâncias, relatórios de mão de obra e compliance em um único workspace focado.", tags: ["b2b saas", "web & mobile", "MRO platform", "ux design", "design system"] },
    { slug: "argo", title: "Argo — Plataforma de Gestão de Créditos de Carbono", client: "Projeto profissional de design", year: "2024", role: "Designer UX/UI", summary: "Uma plataforma de créditos de carbono que conecta agricultores e pecuaristas a mercados voluntários — desenho de áreas, coleta de dados e projeção de créditos para 11 anos.", tags: ["b2b saas", "web app", "agtech", "ux design", "visualização de dados"] },
  ],
  projectsView: { eyebrowSuffix: "selecionados", title: "projetos" },
  contact: {
    eyebrow: "contato",
    title: "vamos conversar.",
    lede: "Estou aberto a novos projetos e colaborações. Se você está trabalhando em algo significativo — onde quer que esteja no mundo — adoraria saber mais.",
    email: "e-mail",
    phone: "telefone / whatsapp",
    basedIn: "localização",
    basedInValue: "Curitiba, PR — Brasil",
    elsewhere: "em outros lugares",
  },
  footer: { copyright: "© 2026 arno klettenberg" },
  notFoundProject: { eyebrow: "não encontrado", title: "esse projeto não existe.", back: "← trabalhos" },
  caseUI: {
    backWork: "← trabalhos",
    metaLineSous: "Designer UX/UI · Projeto de portfólio · 2026 · Figma · Claude · Miro",
    metaLineOverseer: "Designer UX/UI · Projeto profissional de design · 2025 · Figma · B2B SaaS",
    metaLineArgo: "Designer UX/UI · Projeto profissional de design · 2024 · Figma · B2B SaaS",
    confidentiality: "Este é um produto real em produção. Nome e marca foram alterados por motivo de confidencialidade.",
    overview: "visão geral",
    prevProject: "← projeto anterior",
    nextProject: "próximo projeto →",
    allWork: "todos os trabalhos →",
  },
  sous: {
    title: "Sous — Cozinha Just-in-Time",
    pills: ["mobile", "ux design", "conceito de produto"],
    overview: "Sous é um assistente de cozinha just-in-time para iniciantes ocupados que querem comer bem sem o atrito de planejar refeições ou gerenciar a despensa. Em vez de pedir que o usuário mantenha um inventário digital, o Sous parte dos ingredientes disponíveis, do tempo que a pessoa tem e de algumas restrições alimentares para reduzir milhares de receitas a 3–5 opções práticas.",
    stats: [
      { label: "usuário-alvo", value: "iniciante ocupado", sub: "cozinha 1–2× por semana" },
      { label: "restrição central", value: "≤ 15 seg", sub: "tempo até a primeira receita" },
      { label: "pilares do app", value: "4 telas", sub: "cozinhar · salvos · hábitos · perfil" },
      { label: "tipo de projeto", value: "conceito", sub: "design UX ponta a ponta" },
    ],
    researchTitle: "pesquisa",
    researchIntro: "Cada pixel do Sous foi desenhado para resolver um problema específico, ancorado em três pilares de pesquisa.",
    research: [
      { eyebrow: "pilar 01", title: "A psicologia da carga administrativa", body: "Toda vez que um app pede para o usuário registrar um item ou escolher entre 100 opções, ele consome energia mental. Para quem chega em casa depois de 8 horas de trabalho, essa energia já está em zero." },
      { eyebrow: "pilar 02", title: "Gerenciadores de estoque vs. assistentes", body: "A maioria dos apps de cozinha foca em armazenamento — gerenciar um banco de dados — em vez de execução. Isso abre espaço para um motor just-in-time que dispensa qualquer cadastro prévio." },
      { eyebrow: "pilar 03", title: "A cozinha como ambiente hostil", body: "Cozinhar acontece em ambientes com muita luz, mãos sujas e ocupadas. Isso mudou o trabalho de UI mobile para utilidade contextual." },
    ],
    personasTitle: "personas",
    personasIntro: "Três arquétipos cobrem as barreiras mais comuns para cozinhar de forma saudável — diferentes portas de entrada para o mesmo problema de esgotamento administrativo.",
    personas: [
      { name: "Alex", quote: "Só quero comer algo saudável sem ter que pensar nisso depois de 8 horas de trabalho.", problem: "Tem uma geladeira cheia de ingredientes variados, mas falta energia mental para combiná-los.", pain: "O excesso de escolha leva o Alex direto de volta para os apps de delivery." },
      { name: "Jordan", quote: "Quero comer melhor, mas tenho pavor de desperdiçar comida ou estragar uma receita por causa de uma erva que falta.", problem: "Se a receita pede couve e só tem espinafre, Jordan já desiste do prato.", pain: "Medo de errar e falta de intuição culinária." },
      { name: "Sam", quote: "Odeio desperdiçar comida, mas não tenho paciência para manter um inventário digital de cada cebola da gaveta.", problem: "Já tentou apps de controle de geladeira, mas acha a manutenção impossível.", pain: "O esforço de cadastrar compras é maior do que o benefício do app." },
    ],
    designProcessTitle: "processo de design",
    designProcessIntro: "Do caos de uma cozinha bagunçada à clareza de uma experiência guiada de cozinhar, usando a metodologia de Design Thinking.",
    process: [
      { n: "01", title: "Empatizar", body: "Auditei o cenário de apps de receita e identifiquei que o cadastro constante de compras cria uma carga de inventário — uma barreira real para comer bem. Os usuários querem cozinhar, não gerenciar banco de dados." },
      { n: "02", title: "Definir", body: "Posicionei o produto como um motor just-in-time: um assistente de alto valor e manutenção zero, que entrega soluções imediatas sem trabalho administrativo." },
      { n: "03", title: "Idear", body: "Mapeei os casos críticos de borda junto com o fluxo ideal — ingredientes que não batem, passos pulados, internet caindo no meio da receita — para que o design resistisse a falhas reais." },
      { n: "04", title: "Prototipar", body: "Construí interações inclusivas: comandos por voz, áreas de toque generosas e superfícies de alto contraste, que funcionam com mãos sujas ou destreza limitada." },
      { n: "05", title: "Testar", body: "Em parceria com um especialista culinário, o Cook Mode passou de listas densas de texto para um layout de cartão um passo por vez, com timers integrados — reduzindo a carga cognitiva em cozinhas de alta atividade." },
    ],
    designDecisionsTitle: "decisões de design",
    designDecisionsIntro: "Quatro princípios moldaram cada tela do app.",
    decisions: [
      { n: "01", title: "Modelo de inventário zero", body: "Nenhum banco de despensa para manter. Os ingredientes são informados na hora de cozinhar — 15 segundos de input, não 15 minutos de configuração." },
      { n: "02", title: "Tempo como primeiro filtro", body: "O slider de tempo é a primeira entrada. 'Tenho 20 minutos' vira o ponto de partida, não uma restrição adicionada depois." },
      { n: "03", title: "Tela de mise en place", body: "Antes de qualquer instrução, o Sous mostra todos os ingredientes e utensílios necessários. Sem surpresas no meio do preparo, sem becos sem saída no passo 4." },
      { n: "04", title: "Substituições inteligentes", body: "Quando falta um ingrediente, o Sous oferece uma troca validada com uma justificativa culinária em linguagem simples — construindo intuição, não só remendos." },
    ],
    cookingTitle: "Cook Mode",
    cookingBody: "O Cook Mode é o coração do Sous: um passo por vez, áreas de toque generosas, timers integrados e tela que continua acesa enquanto as mãos estão ocupadas.",
    cookingInsight: "Princípio de design: cada recurso do Cook Mode existe para reduzir o número de coisas em que o usuário precisa pensar enquanto cozinha.",
    outcomeTitle: "resultado",
    outcomeIntro: "Um conceito ponta a ponta que redefine apps de cozinha — de gerenciadores de inventário para assistentes.",
    outcomes: ["Modelo de inventário zero", "Checkpoint de mise en place", "Substituições inteligentes com lógica culinária", "Loop de hábito com marcos baseados em identidade", "Cook Mode acessível com wakelock + timers"],
    problemLabel: "O problema.",
    painLabel: "Principal dor.",
  },
  overseer: {
    title: "Overseer — Gestão de Manutenção Aeronáutica",
    pills: ["b2b saas", "web & mobile", "MRO platform", "ux design", "design system"],
    overview: "Overseer é um sistema multiplataforma de gestão de manutenção aeronáutica — disponível em web e mobile — construído para organizações MRO, mecânicos A&P independentes e operadores de frota. A plataforma digitaliza todo o fluxo de manutenção: da criação de ordens de serviço e rastreamento de discrepâncias ao relatório de mão de obra, documentação de compliance, gestão de estoque e coordenação de equipe. Atende pilotos, frotas e profissionais de manutenção em um único sistema conectado.",
    stats: [
      { label: "plataforma", value: "web + mobile", sub: "B2B SaaS multiplataforma" },
      { label: "usuários", value: "MROs · mecânicos · operação de frota", sub: "pilotos e profissionais de manutenção" },
      { label: "minha contribuição", value: "Módulo de Ordem de Serviço", sub: "mais recursos de apoio e design system" },
      { label: "impacto real", value: "Robinson · Garmin", sub: "contratos enterprise fechados" },
    ],
    industryTitle: "contexto do setor",
    industryHeadline: "Quase toda aeronave do mundo ainda é mantida com papel e lápis.",
    industryBody: "Até hoje, a maior parte da documentação de manutenção de aviação geral e MRO é analógica — ordens de serviço escritas à mão, livros de bordo em papel, fichas de inspeção marcadas a lápis. Compliance regulatório, coordenação entre técnicos e comunicação com o cliente passam por documentos físicos que podem ser perdidos, mal lidos ou nunca arquivados. O Overseer existe para substituir essa pilha de papel por uma plataforma única conectada, que viaja com a aeronave.",
    featuresTitle: "recursos da plataforma",
    featuresIntro: "O Overseer cobre toda a superfície operacional de uma organização MRO. Atuei em vários desses módulos — cada um resolvendo uma dor distinta de um tipo de usuário diferente.",
    features: [
      { name: "Minhas Reservas", body: "Visão pessoal de todas as aeronaves reservadas pelo usuário logado, com contexto de agenda e status da aeronave." },
      { name: "Gestão de Membros", body: "Gestão de papéis e permissões para todos os integrantes da organização — mecânicos, supervisores e administradores." },
      { name: "Gestão de Aeronaves", body: "Cadastro completo da aeronave: fabricante, modelo, número de série, prefixo, controle de horas (TTIS, SFRM, TT, SNEW) e histórico de manutenção." },
      { name: "Gestão de Estoque", body: "Inventário de peças e ferramentas em nível organizacional, separado dos componentes específicos de cada aeronave." },
      { name: "Centro de Documentos", body: "Gestão centralizada de documentos para ADs, SBs, manuais de manutenção e logbooks — todos associados à aeronave ou organização correspondente." },
      { name: "Work Order MX", body: "Ciclo completo da ordem de serviço: criação, rastreio de discrepâncias, registro de mão de obra, alocação de ferramentas, controle de custos, fluxo de aprovação e relatórios prontos para o cliente." },
      { name: "Fluxo de Compra de Peças", body: "Um sistema de compras multiorganização integrado à plataforma — uma mini experiência de e-commerce em que organizações MRO podem adquirir peças de outras organizações da rede." },
      { name: "AskSeer — Assistente de IA", body: "Um assistente de IA embutido diretamente no Overseer que responde perguntas específicas sobre cada aeronave, processa logs enviados pelo usuário e verifica documentação de compliance (ADs, SBs, manuais) sem sair da tela atual." },
    ],
    dsTitle: "design system",
    dsBody: "O design system do Overseer já existia quando entrei no projeto — mas estava bastante desatualizado e inconsistente. Em vez de aplicar remendos, reconstruí do zero: reestabelecendo a estrutura de tokens, auditando e redesenhando componentes e documentando regras de uso que o time pudesse seguir. Preservei variáveis e componentes que ainda funcionavam, mas o resultado foi, na prática, um sistema novo construído sobre o esqueleto do antigo. O módulo de Work Order foi o primeiro recurso desenhado inteiramente dentro do sistema reconstruído.",
    dsInsight: "Projetar dentro de um sistema que você mesmo construiu cria um tipo diferente de responsabilidade. Cada decisão de componente no Work Order precisava funcionar não só nessa tela, mas em todas as telas que viriam depois.",
    focusTitle: "foco: Work Order MX & AskSeer",
    focusIntro: "Dois módulos concentraram o impacto mais direto sobre o usuário nesta plataforma. O Work Order MX virou a espinha dorsal operacional — substituindo as squawk sheets de papel por um fluxo único e conectado — e o AskSeer adicionou uma camada conversacional sobre ele, transformando dados densos de aeronave em algo que o usuário simplesmente pode perguntar. As decisões abaixo descrevem a arquitetura do Work Order; o estudo de caso do AskSeer aparece em detalhe mais adiante nesta página.",
    decisions: [
      { n: "01", title: "Ordem de serviço como fonte única da verdade", body: "Dados do cliente, contexto da aeronave, agenda, valor de mão de obra, ferramentas, discrepâncias, custos e aprovações ficam dentro de uma única ordem. Nada espalhado em ferramentas separadas ou em papel." },
      { n: "02", title: "Lista hierárquica de discrepâncias", body: "Cada ordem contém uma lista de discrepâncias aninhada — itens e subitens — onde os mecânicos registram achados, horas estimadas e reais, peças utilizadas, ação tomada e status de aprovação por linha. Isso substitui a squawk sheet manuscrita." },
      { n: "03", title: "Visibilidade de mão de obra para supervisores", body: "As horas são registradas por técnico no nível do subitem, dando ao supervisor uma visão em tempo real do progresso sem precisar caminhar pelo hangar. O relatório de mão de obra gera automaticamente um documento pronto para o cliente a partir desses dados." },
      { n: "04", title: "Alocação de ferramentas", body: "As ferramentas são atribuídas diretamente à ordem de serviço — não só anotadas em papel — criando responsabilidade e reduzindo o problema do 'onde está o torquímetro' típico de oficinas compartilhadas." },
      { n: "05", title: "Fluxo de status", body: "As ordens passam por estados definidos (Estimativa, Em andamento, Enviada, Arquivada) com permissões baseadas em papel para cada transição. O cliente ganha visibilidade sobre o status da aeronave sem precisar de uma ligação." },
    ],
    impactTitle: "impacto",
    impactBody: "Overseer é um produto real em produção, usado por organizações MRO de verdade. O módulo de Work Order — e o trabalho mais amplo de plataforma para o qual contribuí — teve papel direto no fechamento de parcerias com dois dos maiores nomes da aviação geral. Não foram contratos pequenos: Robinson Helicopter Company e Garmin integraram o Overseer às suas aeronaves e sistemas, validando a prontidão da plataforma para operações em escala enterprise.",
    impactStats: [
      { org: "Robinson Helicopter Company", label: "Parceria enterprise — gestão digital de manutenção adicionada à produção de aeronaves futuras." },
      { org: "Garmin", label: "Parceria de integração — logs de voo ao vivo, registros digitais e gestão de manutenção conectados à aviônica Garmin." },
    ],
    outcomes: ["web + mobile multiplataforma", "módulo de work order — construído do zero", "reconstrução do design system", "rastreio hierárquico de discrepâncias", "relatório de mão de obra pronto para o cliente", "parcerias com Robinson & Garmin"],
    reportCaption: "Exemplo de relatório de mão de obra pronto para o cliente, gerado direto da plataforma — sem exportar para nenhuma ferramenta de terceiros.",
    askseer: {
      sectionLabel: "um sub-produto dentro do Overseer",
      title: "AskSeer — Assistente de Manutenção com IA",
      summary: "AskSeer é um chatbot de IA embutido diretamente na plataforma Overseer. Ele dá às equipes de manutenção, donos de aeronave, operadores e administradores acesso conversacional instantâneo a informações da aeronave, registros de manutenção, status de compliance e documentação — sem obrigá-los a navegar por várias telas para encontrar a resposta.",
      imageCaption: "AskSeer respondendo a uma pergunta sobre lista de equipamentos no contexto da aeronave atualmente selecionada, embutido diretamente na tela Work Order MX.",
      challengeTitle: "o desafio",
      challengeIntro: "Manutenção e compliance aeronáuticos envolvem uma quantidade enorme de informação técnica espalhada por vários módulos. Mesmo com o Overseer consolidando esses dados, o usuário ainda precisava clicar em várias telas para perguntas rotineiras:",
      challengeItems: [
        { name: "Excesso de informação", body: "Especificações, lista de equipamentos, histórico de manutenção e status operacional estão todos disponíveis — mas cada um vive em sua própria visualização." },
        { name: "Complexidade de compliance", body: "Confirmar se ADs, Service Bulletins e os manuais atuais estão anexados e em dia exige cruzar várias informações por aeronave." },
        { name: "Ineficiências de navegação", body: "Tarefas diárias como 'essa aeronave está em dia?' ou 'qual é a última squawk?' não deveriam exigir um fluxo de navegação de múltiplos passos." },
      ],
      solutionTitle: "a solução",
      solutionBody: "Em vez de criar mais um módulo, o AskSeer foi desenhado como uma camada conversacional sobre o Overseer. O usuário abre o assistente dentro da tela onde já está, pergunta em linguagem natural e recebe respostas contextuais ancoradas na aeronave atualmente selecionada.",
      featuresTitle: "principais capacidades",
      askseerFeatures: [
        { name: "Consulta de informações da aeronave", body: "Pergunte sobre uma aeronave específica e receba na hora especificações, lista de equipamentos, status de manutenção, histórico ou detalhes operacionais — sem sair da tela." },
        { name: "Upload e processamento de logs", body: "Arraste logs da aeronave para a interface de chat para análise e processamento, com o assistente extraindo e destacando o que é relevante." },
        { name: "Verificação de compliance", body: "Valide em segundos se ADs, Service Bulletins, manuais de manutenção e registros de compliance estão presentes e atualizados para a aeronave selecionada." },
        { name: "Assistência inteligente de fluxo", body: "Conduz o usuário por fluxos de manutenção, sugere a próxima ação razoável e reduz o tempo de caça à informação entre módulos." },
      ],
      approachTitle: "abordagem de design",
      approachItems: [
        { title: "Entender os fluxos do usuário", body: "Mapeei como mecânicos, supervisores e operadores realmente se movem pelo Overseer no dia a dia para identificar onde a fricção se concentrava — a maior parte estava em consulta e verificação, não nos fluxos operacionais centrais." },
        { title: "UX conversacional", body: "Desenhei os padrões de prompt, sugestões de pergunta e formatação de resposta para que a interação em linguagem natural reduzisse complexidade em vez de adicionar mais uma interface para aprender." },
        { title: "Assistência ciente de contexto", body: "O AskSeer sempre sabe qual aeronave está selecionada e em qual tela o usuário está, mantendo as respostas dentro do prefixo correto sem exigir que o usuário reespecifique contexto a cada turno." },
        { title: "Experiência embutida", body: "O assistente vive dentro do workspace existente como um painel flutuante — não como uma ferramenta separada nem uma nova página — então ele amplifica o fluxo atual em vez de fragmentá-lo." },
      ],
      impactTitle: "impacto",
      impactItems: [
        { org: "Acesso mais rápido à informação", label: "Consultas rotineiras de aeronave e compliance respondidas em uma única pergunta, em vez de navegação de múltiplos passos." },
        { org: "Menos tempo de navegação", label: "O usuário permanece na tela em que já estava trabalhando; o AskSeer traz os dados até ele." },
        { org: "Mais visibilidade de compliance", label: "Status de AD, SB, manual e documentação verificável em segundos, sob demanda, por aeronave." },
        { org: "Mais eficiência do usuário", label: "Equipes de manutenção, donos e administradores cumprem tarefas operacionais diárias com menos cliques e menos troca de contexto." },
      ],
      outcomes: ["assistente de IA embutido", "ciente da aeronave atual", "compliance por conversa", "upload de logs no chat", "prompts sugeridos", "menos sobrecarga de navegação"],
    },
  },
  argo: {
    title: "Argo — Plataforma de Gestão de Créditos de Carbono",
    pills: ["b2b saas", "web app", "agtech", "ux design", "visualização de dados"],
    overview: "Argo é uma plataforma de gestão de créditos de carbono que conecta agricultores e pecuaristas a mercados voluntários. Os proprietários de terra carregam ou desenham os limites de suas fazendas diretamente sobre um mapa de satélite, aplicam práticas de manejo respaldadas por ciência e recebem uma projeção de 11 anos dos créditos de carbono que a terra pode gerar. A Argo cuida de todo o processo — do cadastro inicial e da coleta de dados de solo até a emissão dos créditos e o pagamento — recebendo um percentual pela facilitação do programa. Meu trabalho focou em dois dos módulos voltados ao usuário mais importantes da plataforma: a ferramenta Draw Boundary e o módulo Data Collection.",
    stats: [
      { label: "plataforma", value: "web app", sub: "B2B SaaS · agtech" },
      { label: "usuários", value: "agricultores · pecuaristas", sub: "proprietários de terra na América do Norte" },
      { label: "minha contribuição", value: "2 módulos centrais", sub: "Draw Boundary + Data Collection" },
      { label: "tipo de projeto", value: "produto real", sub: "em produção · nome alterado por confidencialidade" },
    ],
    contextTitle: "o contexto",
    contextHeadline: "Agricultores estão sentados em um dos maiores sumidouros de carbono inexplorados do planeta — e a maioria não sabe disso.",
    contextBody: "Práticas regenerativas de manejo da terra — plantio direto, cultivo de cobertura, pastoreio melhorado — sequestram carbono no solo em larga escala. Mas traduzir essas práticas em créditos de carbono verificáveis e negociáveis exige modelagem científica, compliance regulatório e anos de documentação que a maioria dos proprietários individuais não tem como navegar sozinha. A Argo existe para tornar esse processo acessível: o agricultor desenha seus talhões, registra suas práticas, e a Argo cuida do resto — transformando um melhor manejo da terra em uma nova fonte de receita.",
    estimateTitle: "a estimativa",
    estimateIntro: "A tela de Estimativa foi a primeira coisa em que trabalhei depois de entrar no projeto. Minha contribuição específica foi adicionar o modelo de pagamento Option B e suas regras de negócio ao fluxo de pagamento existente — desenhando uma segunda estrutura de payout que pudesse conviver com o Option A original sem quebrar as telas em volta. Antes de o agricultor se comprometer com qualquer mudança de prática, a Argo entrega um quadro financeiro completo: tonelagem total de carbono, deduções, carbono pagável e um calendário de pagamento ano a ano — para que a decisão seja financeira, não técnica.",
    optionA: {
      tag: "Option A",
      title: "Modelo de pagamento integral",
      summary: "Retorno total maior, espera mais longa.",
      body: "O agricultor recebe o valor total de carbono da terra em duas parcelas — no ano 5 e no ano 11. Indicado para proprietários que conseguem absorver a espera em troca do maior payout possível.",
      bullets: [
        { label: "Calendário de pagamento", value: "ano 5 e ano 11" },
        { label: "Perfil", value: "retorno máximo" },
        { label: "Trade-off", value: "sem fluxo de caixa antecipado" },
      ],
    },
    optionB: {
      tag: "Option B",
      title: "Modelo de fluxo de caixa",
      summary: "Pagamentos menores e antecipados para financiar o trabalho.",
      body: "Pagamentos menores distribuídos do ano 1 ao 5, seguidos por um pagamento maior no ano 11. Retorno total menor, mas as parcelas antecipadas ajudam a financiar as mudanças de prática necessárias para gerar os créditos.",
      bullets: [
        { label: "Calendário de pagamento", value: "anos 1–5, mais ano 11" },
        { label: "Perfil", value: "fluxo de caixa sustentado" },
        { label: "Trade-off", value: "payout total menor" },
      ],
    },
    estimateFollowup: "Depois que o agricultor escolhe a opção preferida, ele entra em contato com o time de suporte da Argo, que conduz os próximos passos: usar a ferramenta Draw Boundary para definir os talhões e enviar os entregáveis iniciais que os engenheiros e agrônomos da Argo precisam para começar a montar o programa de práticas.",
    estimateInsight: "A estimativa precisava responder \"quanto eu recebo e quando?\" antes de qualquer outra coisa. Option A ou Option B não é uma escolha técnica — é uma decisão de fluxo de caixa para uma fazenda em operação. O design tinha que tornar essa comparação imediata e legível, não enterrada em notas de rodapé.",
    contributionTitle: "minha contribuição",
    contributionIntro: "Fui o principal responsável por dois módulos que ficam no começo e no meio da jornada do proprietário de terra — os momentos em que a complexidade é maior e o risco de abandono é mais alto.",
    contributions: [
      { n: "01", title: "Ferramenta Draw Boundary", body: "Uma interface interativa de mapa de satélite em que o agricultor desenha os limites exatos dos talhões usando ferramentas de polígono. A ferramenta oferece vários modos de desenho — polígono à mão livre, borda circular, borda interna — e permite nomear talhões, definir hectares, indicar o tipo de posse da terra e classificar o tipo de área (lavoura, pastagem) antes de salvar. A precisão aqui determina o cálculo de carbono à frente, então a UX precisava ser exata sem intimidar um pecuarista que nunca usou um software de GIS." },
      { n: "02", title: "Módulo Data Collection", body: "Uma visão centralizada e estruturada de todos os dados associados à fazenda do produtor — dados de rebanho, aplicação de fertilizantes e corretivos, práticas de manejo de forragem e mais. Os dados são organizados em seções recolhíveis por categoria de prática, com sinalização de erros em linha, modo de edição e filtro por múltiplos anos. Essa tela é a espinha dorsal científica da estimativa de carbono: cada campo registrado aqui alimenta diretamente o motor de modelagem de carbono." },
    ],
    challengesTitle: "desafios de design",
    challengesIntro: "Os dois módulos exigiam resolver para um usuário que é especialista na própria terra — mas não em software.",
    challenges: [
      { n: "01", title: "Precisão espacial vs. acessibilidade", body: "A ferramenta Draw Boundary precisava ser precisa o suficiente para modelagem científica e, ao mesmo tempo, utilizável por alguém desenhando talhões em um tablet no escritório do rancho. A solução foi uma barra de ferramentas opinativa e enxuta — opções limitadas, feedback visual claro e um painel com a lista de talhões que mantém o usuário ancorado no que já definiu." },
      { n: "02", title: "Densidade de dados sem sobrecarga", body: "O módulo Data Collection agrega anos de dados de prática agrícola em várias categorias. O desafio era tornar essa densidade navegável — seções recolhíveis, divulgação progressiva, um contador persistente de erros (\"Mostrar só erros: 3\") e filtros multi-eixo (por talhão, por ano, por evento) trabalharam juntos para dar controle ao usuário sem sobrecarga cognitiva." },
      { n: "03", title: "Offline-first em ambientes remotos", body: "Pecuaristas e agricultores muitas vezes vivem e trabalham em regiões sem conexão confiável de internet. A plataforma tinha que funcionar totalmente offline — sincronizando os dados quando a conectividade retornasse. Isso moldou cada interação que envolvia salvar limites de talhão ou registrar dados de prática: nada podia depender de conexão ativa, e nada podia ser perdido." },
      { n: "04", title: "Desenhar para usuários não-técnicos", body: "O usuário-alvo é especialista em terra e gado — não em software. Para a maioria dos pecuaristas, a referência mais próxima de entrada de dados é uma planilha. Cada tela precisava parecer familiar a esse modelo mental: layouts tabulares, rótulos claros, estrutura de linhas previsível e nenhum padrão de interação que exigisse alfabetização digital prévia. A complexidade tinha que ser invisível." },
      { n: "05", title: "Confiança nos números", body: "A estimativa de carbono é o coração emocional do produto — é o número que convence um agricultor cético a entrar no programa. Cada decisão de design no fluxo que leva até ele tinha que construir confiança de que os dados de entrada estavam corretos, a metodologia era sólida e o pagamento projetado era real." },
    ],
    impactTitle: "impacto",
    impactBody: "A Argo opera em um mercado em que confiança e credibilidade científica são o produto. A ferramenta Draw Boundary e o módulo Data Collection formam a base dessa confiança — são as superfícies em que as afirmações científicas da plataforma viram a realidade documentada do agricultor. Acertar nesses dois módulos significou que os modelos de carbono receberam dados precisos, as estimativas se sustentaram e os proprietários se sentiram no controle de um processo capaz de gerar uma renda relevante a partir da terra que já têm.",
    outcomes: ["Desenho interativo de áreas via satélite", "Ferramentas de polígono com múltiplos modos", "Coleta hierárquica de dados agrícolas", "Projeção de créditos de carbono em 11 anos", "Sinalização e validação de erros em linha", "Projeto profissional de design"],
  },
};

export function useCopy(): Copy {
  const { lang } = useLanguage();
  return lang === "pt" ? pt : en;
}
