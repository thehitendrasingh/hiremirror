/**
 * Role-specific recruiter psychology configuration.
 *
 * Each role defines the lens through which the AI evaluates resumes.
 * This keeps prompt logic scalable — add a new role by adding a config entry,
 * not by rewriting prompts.
 */

export type RoleConfig = {
  /** Machine-readable role identifier */
  role: string;
  /** Human-readable label */
  label: string;
  /** Core focus areas recruiters screen for in this role */
  focusAreas: string[];
  /** What recruiters expect to see in the first 7-second scan */
  recruiterExpectations: string[];
  /** How strengths should be weighted / what counts as strong signal */
  strengthsWeighting: string[];
  /** Rewrite style — what "good" looks like for this role's bullets */
  rewriteStyle: string;
  /** Red flags specific to this role */
  riskDetection: string[];
  /** Domain-specific terminology patterns that signal credibility */
  terminologyPatterns: string[];
};

export const ROLE_CONFIGS: RoleConfig[] = [
  {
    role: "product-manager",
    label: "Product Manager",
    focusAreas: [
      "ownership",
      "strategy",
      "stakeholder management",
      "data-driven decision making",
      "roadmap prioritization",
    ],
    recruiterExpectations: [
      "Outcome-driven language (revenue, retention, adoption metrics)",
      "Evidence of cross-functional leadership with engineering and design",
      "Strategic thinking beyond feature delivery",
      "Customer empathy signals with research or discovery proof",
      "Ability to articulate business impact, not just feature lists",
    ],
    strengthsWeighting: [
      "Quantified business outcomes",
      "Stakeholder management scope",
      "Strategic ownership beyond execution",
      "Domain-specific product expertise (B2B, B2C, platform)",
      "Technical fluency without over-engineering language",
    ],
    rewriteStyle:
      "Transform feature-list bullets into outcome-driven statements with user impact, business metrics, and strategic context. Show ownership of 'why', not just 'what'.",
    riskDetection: [
      "Feature-factory language without business outcomes",
      "Missing stakeholder or cross-functional influence",
      "No metrics or vague 'improved user experience' claims",
      "Title inflation — PM title but execution-only scope",
      "Generic strategy buzzwords without proof of decisions made",
    ],
    terminologyPatterns: [
      "PRD", "OKR", "discovery", "A/B test", "north star metric",
      "user research", "roadmap", "trade-off", "prioritization framework",
      "stakeholder alignment", "go-to-market", "retention", "adoption",
    ],
  },
  {
    role: "product-manager-non-tech",
    label: "Product Manager (Non-Technical)",
    focusAreas: [
      "user research",
      "go-to-market strategy",
      "stakeholder alignment",
      "business impact",
      "roadmap communication",
    ],
    recruiterExpectations: [
      "User research evidence with qualitative and quantitative validation",
      "Go-to-market execution with measurable launch outcomes",
      "Stakeholder alignment and executive communication signals",
      "Business impact tied to product decisions (revenue, retention, NPS)",
      "Prioritization frameworks and trade-off reasoning",
    ],
    strengthsWeighting: [
      "Business outcome quantification",
      "Customer empathy with research proof",
      "Cross-functional orchestration scope",
      "Strategic thinking with market awareness",
      "Clear communication of product vision and rationale",
    ],
    rewriteStyle:
      "Transform execution-focused bullets into strategy-driven statements showing the user problem, business context, decision made, and measurable outcome. Emphasize stakeholder influence and product thinking.",
    riskDetection: [
      "Execution-only language without strategic context",
      "No user research or customer evidence",
      "Missing business impact or metrics",
      "Vague 'led product' without specificity on scope or outcome",
      "Lack of cross-functional collaboration signals",
    ],
    terminologyPatterns: [
      "user research", "discovery", "go-to-market", "launch", "roadmap",
      "OKR", "KPI", "stakeholder", "prioritization", "retention",
      "adoption", "NPS", "cohort", "strategy", "executive presentation",
    ],
  },
  {
    role: "ai-product-manager",
    label: "AI Product Manager",
    focusAreas: [
      "AI/ML product strategy",
      "model lifecycle management",
      "user-facing AI experiences",
      "responsible AI",
      "cross-functional AI delivery",
    ],
    recruiterExpectations: [
      "Experience shipping AI/ML-powered products, not just prototypes",
      "Understanding of model evaluation, prompt engineering, and AI system design",
      "Evidence of balancing model capabilities with user needs and business goals",
      "Cross-functional leadership with data science, ML engineering, and research",
      "Awareness of responsible AI, bias detection, and ethical considerations",
    ],
    strengthsWeighting: [
      "Shipped AI/ML products with measurable user or business outcomes",
      "Technical fluency in AI concepts (LLMs, embeddings, RAG, fine-tuning)",
      "Data-informed decision making with experimentation rigor",
      "Strategic product thinking applied to emerging AI capabilities",
      "Stakeholder education and AI opportunity identification",
    ],
    rewriteStyle:
      "Transform generic PM bullets into AI-specific impact statements showing technical understanding of model capabilities, user experience decisions, and the measurable outcome of AI features. Highlight cross-functional AI delivery leadership.",
    riskDetection: [
      "Buzzword-heavy AI language without shipped product proof",
      "No differentiation between AI feature ownership vs. using AI tools",
      "Missing model evaluation or quality metrics",
      "Vague 'AI strategy' without concrete product examples",
      "No evidence of managing uncertainty inherent to AI development",
    ],
    terminologyPatterns: [
      "LLM", "prompt engineering", "RAG", "fine-tuning", "embeddings",
      "model evaluation", "hallucination", "responsible AI", "bias",
      "A/B test", "experimentation", "data pipeline", "ML lifecycle",
      "transformer", "retrieval augmented generation", "AI safety",
    ],
  },
  {
    role: "ai-engineer",
    label: "AI Engineer",
    focusAreas: [
      "AI/ML system productionization",
      "model serving and infrastructure",
      "LLM application development",
      "evaluation and observability",
      "AI system reliability",
    ],
    recruiterExpectations: [
      "Production-level AI/ML system ownership, not just notebook experimentation",
      "Evidence of deploying and maintaining models or LLM features in production",
      "Engineering rigor around data pipelines, evaluation, and monitoring",
      "Stack credibility with relevant AI/ML tools and frameworks",
      "Measurable impact on model quality, latency, cost, or user-facing AI experience",
    ],
    strengthsWeighting: [
      "Shipped AI/ML features with production metrics",
      "Deep technical understanding of model behavior, evaluation, and failure modes",
      "End-to-end ownership of AI pipelines from data to deployment",
      "System design for AI infrastructure (serving, caching, monitoring)",
      "Collaboration with research, product, and platform teams",
    ],
    rewriteStyle:
      "Transform AI/ML experiment bullets into production engineering statements showing deployed impact, evaluation methodology, and system-level thinking. Highlight what you built, how you measured it, and how it performed at scale.",
    riskDetection: [
      "AI/ML language without production deployment evidence",
      "Notebook-only work presented as production engineering",
      "Buzzword-heavy descriptions without evaluation or quality metrics",
      "Missing scale indicators (latency, throughput, cost, accuracy)",
      "No evidence of monitoring, observability, or incident response for AI systems",
    ],
    terminologyPatterns: [
      "LLM", "RAG", "embedding", "fine-tuning", "prompt engineering",
      "model serving", "inference", "evaluation", "observability",
      "pipeline", "training", "deployment", "A/B test", "drift detection",
      "vector database", "agent", "tool use", "guardrails",
    ],
  },
  {
    role: "software-engineer",
    label: "Software Engineer",
    focusAreas: [
      "technical depth",
      "system ownership",
      "code quality",
      "production impact",
      "collaboration",
    ],
    recruiterExpectations: [
      "Production-level code ownership with deployment evidence",
      "Stack credibility matching the target role",
      "Measurable system impact (latency, uptime, throughput, cost)",
      "Evidence of debugging, incident response, or reliability work",
      "Feature ownership from design through monitoring",
    ],
    strengthsWeighting: [
      "System design and architecture decisions",
      "Production scale and reliability metrics",
      "End-to-end feature ownership",
      "Code review and mentoring signals",
      "Technical depth in relevant stack",
    ],
    rewriteStyle:
      "Transform task-description bullets into ownership statements with technical specificity, system scale, and measurable outcomes. Show what you built, how it performed, and what broke less.",
    riskDetection: [
      "Task-execution language without ownership",
      "Buzzword stack without production proof",
      "Missing scale indicators (users, requests, data volume)",
      "AI-generated or overly polished phrasing",
      "No evidence of debugging, incidents, or hard technical problems",
    ],
    terminologyPatterns: [
      "API", "microservice", "CI/CD", "latency", "throughput",
      "SLA", "uptime", "migration", "refactor", "code review",
      "production", "deploy", "monitoring", "observability",
    ],
  },
  {
    role: "data-analyst",
    label: "Data Analyst",
    focusAreas: [
      "analytical rigor",
      "business insight translation",
      "data storytelling",
      "tool proficiency",
      "stakeholder communication",
    ],
    recruiterExpectations: [
      "SQL proficiency with evidence of complex query work",
      "Business impact from analysis — decisions influenced, revenue found",
      "Dashboard or reporting ownership with stakeholder adoption",
      "Statistical literacy beyond basic descriptive stats",
      "Clear communication of insights to non-technical audiences",
    ],
    strengthsWeighting: [
      "Analysis that drove business decisions",
      "Tool stack credibility (SQL, Python, Tableau, Looker)",
      "Stakeholder trust and influence",
      "Data quality or pipeline improvement contributions",
      "Domain-specific analytical expertise",
    ],
    rewriteStyle:
      "Transform vague 'analyzed data' bullets into insight-driven statements showing the question asked, method used, finding discovered, and business decision influenced.",
    riskDetection: [
      "Vague 'analyzed data' without specifying what was found",
      "Tool listing without evidence of depth",
      "No business outcomes tied to analysis work",
      "Missing stakeholder context — who consumed the insights",
      "Confusing data engineering work with data analysis",
    ],
    terminologyPatterns: [
      "SQL", "Python", "Tableau", "Looker", "A/B test",
      "cohort analysis", "funnel", "segmentation", "dashboard",
      "KPI", "metric definition", "statistical significance",
    ],
  },
  {
    role: "ux-designer",
    label: "UX Designer",
    focusAreas: [
      "user research",
      "interaction design",
      "design systems",
      "usability testing",
      "cross-functional collaboration",
    ],
    recruiterExpectations: [
      "User research evidence — not just wireframes and mockups",
      "Design decisions tied to user outcomes or metrics",
      "Portfolio-quality case study thinking in resume bullets",
      "Collaboration proof with PM and engineering",
      "Accessibility and inclusive design awareness",
    ],
    strengthsWeighting: [
      "Research-informed design decisions",
      "Measurable UX improvements (task completion, NPS, adoption)",
      "Design system contributions or ownership",
      "Cross-functional influence on product direction",
      "Iteration and testing methodology",
    ],
    rewriteStyle:
      "Transform deliverable-focused bullets ('created wireframes') into outcome-driven statements showing the user problem, design approach, and measurable result.",
    riskDetection: [
      "Deliverable-only language (wireframes, mockups) without outcomes",
      "No user research or testing evidence",
      "Missing collaboration signals with engineering/PM",
      "Portfolio dependency — resume bullets should stand alone",
      "Aesthetic focus without usability or business metrics",
    ],
    terminologyPatterns: [
      "user research", "usability testing", "information architecture",
      "design system", "accessibility", "WCAG", "prototype",
      "user flow", "heuristic evaluation", "task completion rate",
      "Figma", "interaction design", "design critique",
    ],
  },
  {
    role: "marketing-manager",
    label: "Marketing Manager",
    focusAreas: [
      "campaign performance",
      "growth metrics",
      "brand strategy",
      "channel expertise",
      "cross-functional leadership",
    ],
    recruiterExpectations: [
      "Revenue or pipeline attribution from marketing efforts",
      "Channel-specific expertise with measurable results",
      "Campaign ownership from strategy through optimization",
      "Brand building balanced with performance marketing",
      "Cross-functional collaboration with sales, product, and creative",
    ],
    strengthsWeighting: [
      "Quantified campaign results (CAC, ROAS, conversion, pipeline)",
      "Channel depth and strategic versatility",
      "Team leadership and agency management",
      "Brand strategy with market positioning proof",
      "Data-driven optimization and experimentation",
    ],
    rewriteStyle:
      "Transform activity-based bullets ('managed social media') into performance statements showing channel, strategy, result, and business impact.",
    riskDetection: [
      "Activity-based language without performance metrics",
      "Channel breadth without depth in any single channel",
      "Missing budget or team scope indicators",
      "No evidence of strategy — only execution",
      "Vanity metrics (impressions, followers) without business tie-back",
    ],
    terminologyPatterns: [
      "CAC", "ROAS", "conversion rate", "pipeline", "MQL", "SQL",
      "brand awareness", "content strategy", "paid media",
      "organic growth", "attribution", "A/B test", "campaign",
      "go-to-market", "demand generation", "lifecycle marketing",
    ],
  },
];

/**
 * Find role config by role ID.
 * Falls back to software-engineer if no match (safe default).
 */
export function getRoleConfig(roleIdentifier: string): RoleConfig {
  const normalized = roleIdentifier.toLowerCase();

  // Direct match
  const direct = ROLE_CONFIGS.find((r) => r.role === normalized);
  if (direct) return direct;

  // Fuzzy match by label keywords
  const byLabel = ROLE_CONFIGS.find((r) =>
    normalized.includes(r.label.toLowerCase()) ||
    r.label.toLowerCase().includes(normalized)
  );
  if (byLabel) return byLabel;

  // Keyword-based matching
  if (normalized.includes("ai") && normalized.includes("product")) {
    return ROLE_CONFIGS.find((r) => r.role === "ai-product-manager")!;
  }
  if (normalized.includes("product") && normalized.includes("manag")) {
    // Check for non-technical first
    if (normalized.includes("non") || normalized.includes("general") || normalized.includes("business")) {
      return ROLE_CONFIGS.find((r) => r.role === "product-manager-non-tech")!;
    }
    // Default to technical PM
    return ROLE_CONFIGS.find((r) => r.role === "product-manager")!;
  }
  if (normalized.includes("data") && (normalized.includes("analyst") || normalized.includes("analytics"))) {
    return ROLE_CONFIGS.find((r) => r.role === "data-analyst")!;
  }
  if (normalized.includes("ux") || normalized.includes("design")) {
    return ROLE_CONFIGS.find((r) => r.role === "ux-designer")!;
  }
  if (normalized.includes("market")) {
    return ROLE_CONFIGS.find((r) => r.role === "marketing-manager")!;
  }

  // Default to software engineer
  return ROLE_CONFIGS.find((r) => r.role === "software-engineer")!;
}

/**
 * Build a role-context block for AI prompts.
 * This injects role-specific recruiter psychology into the prompt
 * without hardcoding role logic in the prompt template.
 */
export function buildRoleContextBlock(roleConfig: RoleConfig): string {
  return `ROLE-SPECIFIC RECRUITER LENS: ${roleConfig.label}

Focus areas recruiters screen for:
${roleConfig.focusAreas.map((a) => `- ${a}`).join("\n")}

What recruiters expect in a 7-second scan:
${roleConfig.recruiterExpectations.map((e) => `- ${e}`).join("\n")}

Strengths that matter for this role:
${roleConfig.strengthsWeighting.map((s) => `- ${s}`).join("\n")}

Rewrite style for this role:
${roleConfig.rewriteStyle}

Red flags specific to this role:
${roleConfig.riskDetection.map((r) => `- ${r}`).join("\n")}

Credibility terminology for this role:
${roleConfig.terminologyPatterns.join(", ")}`;
}
