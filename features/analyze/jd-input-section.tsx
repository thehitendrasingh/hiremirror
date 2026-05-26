"use client";

import { cn } from "@/utils/cn";
import {
  buildJobDescription,
  buildTargetRoleLabel,
  EXPERIENCE_LEVELS,
  type JdInputMode,
} from "@/utils/tech-role-templates";

const ROLE_CATEGORIES: { label: string; roles: { id: string; label: string }[] }[] = [
  {
    label: "Engineering",
    roles: [
      { id: "swe", label: "Software Engineer" },
      { id: "ai-engineer", label: "AI Engineer" },
      { id: "frontend", label: "Frontend Engineer" },
      { id: "backend", label: "Backend Engineer" },
      { id: "fullstack", label: "Full Stack Engineer" },
      { id: "devops-sre", label: "DevOps / SRE" },
      { id: "data-engineer", label: "Data Engineer" },
      { id: "ml-engineer", label: "ML Engineer" },
      { id: "em", label: "Engineering Manager" },
      { id: "qa-engineer", label: "QA Engineer" },
    ],
  },
  {
    label: "Product",
    roles: [
      { id: "product-manager", label: "Product Manager (Technical)" },
      { id: "product-manager-non-tech", label: "Product Manager" },
      { id: "ai-product-manager", label: "AI Product Manager" },
    ],
  },
  {
    label: "Design",
    roles: [
      { id: "product-designer", label: "Product Designer" },
      { id: "ui-ux-designer", label: "UI/UX Designer" },
    ],
  },
  {
    label: "Data & Analytics",
    roles: [
      { id: "data-analyst", label: "Data Analyst" },
    ],
  },
  {
    label: "Marketing & Strategy",
    roles: [
      { id: "marketing-manager", label: "Marketing Manager" },
      { id: "solutions-architect", label: "Solutions / Cloud Architect" },
    ],
  },
];

type JdInputSectionProps = {
  mode: JdInputMode;
  onModeChange: (mode: JdInputMode) => void;
  roleId: string;
  onRoleChange: (roleId: string) => void;
  experienceId: string;
  onExperienceChange: (experienceId: string) => void;
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
};

export function JdInputSection({
  mode,
  onModeChange,
  roleId,
  onRoleChange,
  experienceId,
  onExperienceChange,
  jobDescription,
  onJobDescriptionChange,
}: JdInputSectionProps) {
  const isTemplate = mode === "template";
  const previewLabel = buildTargetRoleLabel(roleId, experienceId);

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-3 text-sm font-medium text-zinc-300">
          Job description source
        </p>
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-zinc-800 bg-zinc-950/50 p-1">
          <button
            type="button"
            onClick={() => onModeChange("template")}
            className={cn(
              "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              isTemplate
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            Role template
          </button>
          <button
            type="button"
            onClick={() => onModeChange("manual")}
            className={cn(
              "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              !isTemplate
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            Paste manually
          </button>
        </div>
      </div>

      {isTemplate ? (
        <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-950/30 p-4">
          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
              Tech role
            </span>
            <select
              value={roleId}
              onChange={(e) => onRoleChange(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
            >
              {ROLE_CATEGORIES.map((category) => (
                <optgroup key={category.label} label={category.label}>
                  {category.roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
              Your experience level
            </span>
            <select
              value={experienceId}
              onChange={(e) => onExperienceChange(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
            >
              {EXPERIENCE_LEVELS.map((exp) => (
                <option key={exp.id} value={exp.id}>
                  {exp.label} ({exp.yearsRange})
                </option>
              ))}
            </select>
          </label>

          <p className="text-xs text-zinc-500">
            Analyzing as:{" "}
            <span className="font-medium text-indigo-300">{previewLabel}</span>
          </p>

          <details className="group">
            <summary className="cursor-pointer text-xs text-zinc-500 hover:text-zinc-400">
              Preview generated JD
            </summary>
            <pre className="mt-2 max-h-40 overflow-y-auto whitespace-pre-wrap rounded-lg border border-zinc-800 bg-black/40 p-3 text-xs leading-relaxed text-zinc-400">
              {buildJobDescription(roleId, experienceId)}
            </pre>
          </details>
        </div>
      ) : (
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-zinc-300">
            Paste job description
          </span>
          <textarea
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            placeholder="Paste the full tech JD you're targeting - include level, stack, and ownership expectations."
            rows={10}
            className="w-full resize-y rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-sm leading-relaxed text-zinc-200 placeholder:text-zinc-600 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
          />
        </label>
      )}
    </div>
  );
}
