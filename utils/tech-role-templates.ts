export type ExperienceLevel = {
  id: string;
  label: string;
  yearsRange: string;
  recruiterNote: string;
};

export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  {
    id: "entry",
    label: "Early career",
    yearsRange: "0–2 years",
    recruiterNote:
      "Recruiters expect learning velocity, internship/co-op proof, foundational projects, and realistic scope — not senior ownership language.",
  },
  {
    id: "mid",
    label: "Mid-level",
    yearsRange: "3–5 years",
    recruiterNote:
      "Recruiters expect end-to-end feature ownership, credible stack depth, and metrics tied to product or system outcomes.",
  },
  {
    id: "senior",
    label: "Senior",
    yearsRange: "6–8 years",
    recruiterNote:
      "Recruiters expect technical leadership, system design proof, mentoring, and cross-functional influence — not task-only bullets.",
  },
  {
    id: "staff",
    label: "Staff+",
    yearsRange: "9+ years",
    recruiterNote:
      "Recruiters expect org-level impact, multi-team technical direction, and evidence of raising the engineering bar beyond one squad.",
  },
];

export type TechRoleTemplate = {
  id: string;
  label: string;
  coreJD: string;
};

export const TECH_ROLE_TEMPLATES: TechRoleTemplate[] = [
  {
    id: "swe",
    label: "Software Engineer",
    coreJD: `Build and ship product features in a modern tech stack. Own features from design through monitoring.

Key signals: production code, debugging, APIs/databases, collaboration with PM/design, clear ownership language.`,
  },
  {
    id: "senior-swe",
    label: "Senior Software Engineer",
    coreJD: `Drive technical decisions, mentor engineers, and deliver complex features or subsystems.

Key signals: system design, reliability/observability, code review culture, measurable technical impact.`,
  },
  {
    id: "staff-swe",
    label: "Staff Software Engineer",
    coreJD: `Set technical direction across teams, solve ambiguous platform/product problems, and raise engineering standards.

Key signals: multi-team influence, architecture strategy, major migrations, org-level unblocking.`,
  },
  {
    id: "frontend",
    label: "Frontend Engineer",
    coreJD: `Own user-facing experiences with high craft, performance, and accessibility.

Key signals: React/TypeScript depth, Core Web Vitals, component architecture, design collaboration.`,
  },
  {
    id: "backend",
    label: "Backend Engineer",
    coreJD: `Build reliable services, APIs, and data layers at scale.

Key signals: service ownership, latency/throughput wins, databases, queues, on-call maturity.`,
  },
  {
    id: "fullstack",
    label: "Full Stack Engineer",
    coreJD: `Ship end-to-end product capabilities across frontend and backend.

Key signals: credible depth on both sides, full feature ownership, product iteration with stakeholders.`,
  },
  {
    id: "devops-sre",
    label: "DevOps / SRE",
    coreJD: `Improve reliability, delivery speed, and infrastructure efficiency.

Key signals: SLOs, incident leadership, IaC, CI/CD, cloud cost and uptime metrics.`,
  },
  {
    id: "data-engineer",
    label: "Data Engineer",
    coreJD: `Build trustworthy data pipelines and datasets for analytics and ML.

Key signals: ETL/ELT scale, data modeling, warehouse tooling, data quality outcomes.`,
  },
  {
    id: "ml-engineer",
    label: "ML Engineer",
    coreJD: `Productionize models and ship ML-powered product capabilities.

Key signals: deployed models, offline/online metrics, feature pipelines, engineering rigor beyond notebooks.`,
  },
  {
    id: "em",
    label: "Engineering Manager",
    coreJD: `Lead a team delivering product outcomes with strong people and delivery practices.

Key signals: team results, hiring/coaching, planning, credible prior IC background.`,
  },
  {
    id: "product-manager",
    label: "Product Manager (Technical)",
    coreJD: `Own roadmap, discovery, and execution for a software product area with technical fluency.

Key signals: outcome metrics, PRD quality, engineer trust, technical tradeoff judgment.`,
  },
  {
    id: "product-designer",
    label: "Product Designer",
    coreJD: `Craft product experiences that solve user problems and influence cross-functional roadmaps.

Key signals: user research, prototyping, product metrics, design partnerships, clear UX rationale.`,
  },
  {
    id: "ui-ux-designer",
    label: "UI/UX Designer",
    coreJD: `Design polished interfaces and usable flows that scale across products.

Key signals: interaction design, accessibility, design systems, user testing, production handoff quality.`,
  },
  {
    id: "qa-engineer",
    label: "QA Engineer",
    coreJD: `Own quality for software delivery with test automation, release gating, and bug prevention.

Key signals: automation strategy, test coverage, incident triage, regression management, developer collaboration.`,
  },
  {
    id: "solutions-architect",
    label: "Solutions / Cloud Architect",
    coreJD: `Lead technical discovery and scalable designs for customer or internal deployments.

Key signals: cloud architecture depth, customer outcomes, proposals/POCs, executive communication.`,
  },
];

export type JdInputMode = "template" | "manual";

export function getExperienceLevel(id: string): ExperienceLevel | undefined {
  return EXPERIENCE_LEVELS.find((e) => e.id === id);
}

export function getTechRoleById(id: string): TechRoleTemplate | undefined {
  return TECH_ROLE_TEMPLATES.find((r) => r.id === id);
}

export function buildTargetRoleLabel(
  roleId: string,
  experienceId: string
): string {
  const role = getTechRoleById(roleId);
  const exp = getExperienceLevel(experienceId);
  if (!role || !exp) return "Tech Role";
  return `${role.label} · ${exp.yearsRange}`;
}

export function buildJobDescription(
  roleId: string,
  experienceId: string
): string {
  const role = getTechRoleById(roleId);
  const exp = getExperienceLevel(experienceId);
  if (!role || !exp) return "";

  return `${role.label}
Experience target: ${exp.label} (${exp.yearsRange})

${role.coreJD}

Experience-level recruiter lens:
${exp.recruiterNote}

What we evaluate in 7 seconds for this band:
- Title and bullet scope match ${exp.yearsRange} expectations
- Proof of impact appropriate for ${exp.label} (not inflated)
- Stack and domain credibility for ${role.label}
- Red flags: job hopping, AI slop, buzzwords without scale, level mismatch`;
}
