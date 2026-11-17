/**
 * Process page content. DRAFT: the "you decide" and "we deliver" lines, the commitments and the FAQs are
 * written from what the site already says and need PDBS to confirm them.
 */

export const PROCESS_HERO = {
  title: "Fifteen steps. Three phases.",
  tagline: "One path from first conversation to handover.",
  lead: "One disciplined path on every project, from the first conversation to the day we hand over the keys. You always know where you are, what comes next and what it costs.",
};

export type Step = { title: string; text: string; decide: string; deliver: string };
export type Phase = {
  id: string;
  label: string;
  short: string;
  range: string;
  title: string;
  summary: string;
  tone: "paper" | "blueprint" | "site";
  steps: Step[];
};

export const PHASES: Phase[] = [
  {
    id: "phase-1",
    label: "Phase 1, steps 1 to 5",
    short: "Study",
    range: "Steps 1 to 5",
    title: "Preliminary Study",
    summary: "Understand your goals, site and budget, and see a first design direction with an estimate before you commit.",
    tone: "paper",
    steps: [
      { title: "Initial consultation", text: "We listen to your goals, timeline and constraints, and explain how we work.", decide: "Your goals, timeline and who needs to be involved.", deliver: "A clear account of how we work and what happens next." },
      { title: "Site visit and goals", text: "We walk the site, review conditions and agree on what success looks like.", decide: "What success looks like for you.", deliver: "A site review and a written summary of conditions and constraints." },
      { title: "Program and budget", text: "We define the spaces, performance and budget range the project must meet.", decide: "The spaces you need and the budget range.", deliver: "A program that fits the budget, with the trade-offs made visible." },
      { title: "Feasibility review", text: "We check zoning, permitting, utilities and risks that could affect cost or schedule.", decide: "How much risk you are willing to carry.", deliver: "Findings on zoning, permits and utilities that could change cost or schedule." },
      { title: "Preliminary design and estimate", text: "You receive an integrated preliminary design with an early cost estimate to decide on.", decide: "Whether to go on to full design.", deliver: "An integrated preliminary design with an early cost estimate." },
    ],
  },
  {
    id: "phase-2",
    label: "Phase 2, steps 6 to 10",
    short: "Design",
    range: "Steps 6 to 10",
    title: "Design Development",
    summary: "Develop the drawings, selections and contract price together, with your input at every decision.",
    tone: "blueprint",
    steps: [
      { title: "Design agreement", text: "We confirm scope, fees and the schedule for design and pricing.", decide: "Scope, fees and the design schedule.", deliver: "An agreement that sets out what is designed, priced and when." },
      { title: "Schematic design", text: "Plans, elevations and massing are refined with your feedback.", decide: "Layout, massing and priorities.", deliver: "Plans, elevations and massing, refined with your feedback." },
      { title: "Design development and selections", text: "Systems, materials and finishes are chosen and coordinated.", decide: "Materials, finishes and systems.", deliver: "Coordinated drawings and a schedule of selections." },
      { title: "Value engineering and pricing", text: "Builders and trades price the design, and we balance cost against your priorities.", decide: "Where to save and where to invest.", deliver: "Trade pricing against the design, with options and what each costs." },
      { title: "Construction documents and permits", text: "Final drawings are issued and permit applications are filed.", decide: "Final approval of the drawings.", deliver: "Issued drawings and filed permit applications." },
    ],
  },
  {
    id: "phase-3",
    label: "Phase 3, steps 11 to 15",
    short: "Construction",
    range: "Steps 11 to 15",
    title: "Construction",
    summary: "Build to the plan, with one point of contact, regular reporting and a thorough handover.",
    tone: "site",
    steps: [
      { title: "Contract and buyout", text: "We finalize the contract and award trade packages.", decide: "Approval of the contract and the trade awards.", deliver: "A final contract and awarded trade packages." },
      { title: "Mobilization and schedule", text: "The site team, safety plan and detailed schedule are put in place.", decide: "Access, working hours and site rules.", deliver: "A site team, a safety plan and a detailed schedule." },
      { title: "Construction and quality control", text: "We build, inspect each stage and report on cost and schedule.", decide: "Any change you want, once its cost is known.", deliver: "Inspected stages and regular cost and schedule reports." },
      { title: "Punch list and commissioning", text: "We complete final items and test building systems to confirm they perform.", decide: "Sign-off on completed work.", deliver: "Final items finished and building systems tested." },
      { title: "Handover and warranty", text: "You receive training, documentation and warranty support.", decide: "Who receives training and documents.", deliver: "Training, documentation and warranty support." },
    ],
  },
];

export const COMMITMENTS = {
  heading: "Built on discipline",
  lead: "Four commitments that hold in every phase and on every project.",
  items: [
    { title: "Safety first", text: "A site safety plan before mobilization, daily oversight, and authority for anyone to stop unsafe work." },
    { title: "Clear communication", text: "One project manager, a regular reporting rhythm and no surprises on cost or schedule." },
    { title: "Quality control", text: "Defined standards and inspection before each trade hands over to the next." },
    { title: "Local partnerships", text: "Trusted local trades and suppliers, and room for new firms to earn a place." },
  ],
};

export const PROCESS_FAQS = {
  eyebrow: "Frequently Asked Questions",
  title: "Process FAQs",
  cta: { label: "Start a project", href: "#inquiry" },
  items: [
    { q: "Do I have to commit before design starts?", a: "No. The first phase ends with an integrated preliminary design and an early cost estimate, so you can decide with real numbers before you go on." },
    { q: "How long does a project take?", a: "It depends on the size and complexity of the building. After the preliminary study we give you a schedule for the design and construction phases." },
    { q: "Can I make changes once construction has started?", a: "Yes. We price a change before it goes ahead, so you decide with the cost and the effect on schedule in front of you." },
    { q: "Who will I deal with day to day?", a: "One project manager, from the first meeting to handover, who reports to you on cost, schedule and quality." },
  ],
};

/** The three states of the opening, one per phase. DRAFT wording. */
export const HERO_STATES = [
  { word: "Study", statement: "We study your goals, site and budget first.", plate: "#082b52", accent: "#e3c98f", image: "/assets/gallery/landmark/5.jpg", position: "center 60%" },
  { word: "Design", statement: "We design and price it together, with your input.", plate: "#082b52", accent: "#8fb0d6", image: "/assets/process-design.jpg", position: "center 40%" },
  { word: "Build", statement: "We build to the plan, with one point of contact.", plate: "#082b52", accent: "#e3c98f", image: "/assets/offerings-talent.jpg", position: "center 75%" },
];

/**
 * The statement and figures that follow the opening. Every figure comes from what the site already states
 * (fifteen steps, three phases, three regions, 80 to 90 percent repeat business); "1 project manager" is from
 * the draft FAQ and needs PDBS to confirm it.
 */
export const INTRO = {
  /** Words wrapped in [[ ]] take the accent colour */
  statement: "[[Fifteen steps]] and one accountable team, with a clear [[decision at every stage]] and no surprises on [[cost or schedule]].",
  stats: [
    { value: 15, suffix: "", label: "Steps on every project" },
    { value: 3, suffix: "", label: "Phases from study to handover" },
    { value: 1, suffix: "", label: "Project manager from start to finish" },
    { value: 3, suffix: "", label: "Regions served: Maryland, DC and Virginia" },
    { text: "80–90%", label: "Repeat business" },
  ] as ({ value: number; suffix: string; label: string; text?: undefined } | { text: string; label: string; value?: undefined; suffix?: undefined })[],
};
