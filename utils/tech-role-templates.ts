export type ExperienceLevel = {
  id: string;
  label: string;
  yearsRange: string;
  recruiterNote: string;
};

/**
 * Experience levels use overlapping ranges so fractional years
 * (e.g. 2.5, 5.5, 6.5) always have a matching band.
 * Pick the band that best describes your level.
 */
export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  {
    id: "entry",
    label: "Early career",
    yearsRange: "0–3 years",
    recruiterNote:
      "Recruiters expect learning velocity, internship/co-op proof, foundational projects, and realistic scope — not senior ownership language.",
  },
  {
    id: "mid-early",
    label: "Junior mid-level",
    yearsRange: "2–4 years",
    recruiterNote:
      "Recruiters look for increasing ownership scope, some cross-team collaboration, and growing impact with metrics. Titles may still be mid-level.",
  },
  {
    id: "mid",
    label: "Mid-level",
    yearsRange: "3–6 years",
    recruiterNote:
      "Recruiters expect end-to-end feature ownership, credible stack depth, and metrics tied to product or system outcomes.",
  },
  {
    id: "mid-senior",
    label: "Senior mid-level",
    yearsRange: "5–7 years",
    recruiterNote:
      "Recruiters look for mentoring signals, independent technical decision-making, and scope beyond a single feature or squad.",
  },
  {
    id: "senior",
    label: "Senior",
    yearsRange: "6–9 years",
    recruiterNote:
      "Recruiters expect technical leadership, system design proof, mentoring, and cross-functional influence — not task-only bullets.",
  },
  {
    id: "senior-staff",
    label: "Senior to Staff+",
    yearsRange: "8–12 years",
    recruiterNote:
      "Recruiters look for org-level impact, multi-team technical direction, and evidence of raising the engineering bar across the organisation.",
  },
  {
    id: "staff",
    label: "Staff+",
    yearsRange: "10+ years",
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
    id: "ai-engineer",
    label: "AI Engineer",
    coreJD: `Build and productionize AI/ML systems, from model serving to LLM-powered features and agent architectures.

Key signals: deployed AI systems, model evaluation and observability, prompt engineering, RAG pipelines, AI infrastructure, production ML.`,
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
    id: "product-manager-non-tech",
    label: "Product Manager",
    coreJD: `Drive product strategy, user research, stakeholder alignment, and go-to-market execution.

Key signals: quantitative and qualitative research, roadmap prioritization, cross-functional leadership, business impact metrics.`,
  },
  {
    id: "ai-product-manager",
    label: "AI Product Manager",
    coreJD: `Lead AI/ML product development from ideation to deployment, balancing model capabilities with user needs.

Key signals: AI/ML product lifecycle experience, prompt engineering, model evaluation, responsible AI, cross-functional collaboration with data science and engineering.`,
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
  {
    id: "data-analyst",
    label: "Data Analyst",
    coreJD: `Turn complex data into actionable business insights that drive decision-making.

Key signals: SQL proficiency, dashboard ownership, stakeholder communication, analysis that influenced business outcomes.`,
  },
  {
    id: "marketing-manager",
    label: "Marketing Manager",
    coreJD: `Own campaign strategy, channel performance, and growth metrics across the marketing funnel.

Key signals: quantified campaign results (CAC, ROAS, conversion), channel expertise, brand strategy, cross-functional leadership.`,
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
