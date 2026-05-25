"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileText, Upload } from "lucide-react";
import { submitAnalysis } from "@/features/analyze/actions";
import { JdInputSection } from "@/features/analyze/jd-input-section";
import { Button } from "@/components/ui/button";
import { ErrorBanner } from "@/components/shared/error-banner";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/utils/cn";
import {
  buildJobDescription,
  buildTargetRoleLabel,
  EXPERIENCE_LEVELS,
  TECH_ROLE_TEMPLATES,
  type JdInputMode,
} from "@/utils/tech-role-templates";

const DEFAULT_ROLE_ID = TECH_ROLE_TEMPLATES[0].id;
const DEFAULT_EXPERIENCE_ID = EXPERIENCE_LEVELS[1].id;

export function UploadForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [jdMode, setJdMode] = useState<JdInputMode>("template");
  const [roleId, setRoleId] = useState(DEFAULT_ROLE_ID);
  const [experienceId, setExperienceId] = useState(DEFAULT_EXPERIENCE_ID);
  const [manualJd, setManualJd] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const templateJd = useMemo(
    () => buildJobDescription(roleId, experienceId),
    [roleId, experienceId]
  );

  const targetRoleLabel = useMemo(() => {
    if (jdMode === "template") {
      return buildTargetRoleLabel(roleId, experienceId);
    }
    return "Custom Tech Role";
  }, [jdMode, roleId, experienceId]);

  const jobDescription = jdMode === "template" ? templateJd : manualJd;

  const onFile = useCallback((f: File | null) => {
    setError(null);
    setFile(f);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) onFile(dropped);
    },
    [onFile]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError("Please upload your resume.");
      return;
    }

    if (jdMode === "manual" && manualJd.trim().length < 20) {
      setError("Please paste a job description (at least 20 characters).");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);
    formData.append("targetRole", targetRoleLabel);
    formData.append("jdMode", jdMode);
    formData.append("experienceLevel", experienceId);

    startTransition(async () => {
      const result = await submitAnalysis(formData);
      if (!result.ok) {
        setError(result.error.message);
        return;
      }
      router.push(
        `/analyze/loading?session=${encodeURIComponent(result.sessionId)}`
      );
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-8">
      {error && <ErrorBanner message={error} />}

      <FadeIn>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={cn(
            "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-colors",
            dragActive
              ? "border-indigo-500/60 bg-indigo-950/20"
              : "border-zinc-800 hover:border-zinc-600",
            file && "border-indigo-500/40 bg-zinc-950/80"
          )}
        >
          <input
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
          {file ? (
            <>
              <FileText className="mb-3 h-10 w-10 text-indigo-400" />
              <p className="font-medium text-zinc-200">{file.name}</p>
              <p className="mt-1 text-xs text-zinc-500">Click or drop to replace</p>
            </>
          ) : (
            <>
              <Upload className="mb-3 h-10 w-10 text-zinc-600" />
              <p className="font-medium text-zinc-300">Upload your tech resume</p>
              <p className="mt-1 text-xs text-zinc-500">PDF or DOCX · Max 5MB</p>
            </>
          )}
        </div>
        <p className="mt-3 text-center text-xs text-zinc-600">
          Built for engineering, product, UX, and QA roles - analyzed privately and only as text.
        </p>
      </FadeIn>

      <FadeIn delay={0.08}>
        <JdInputSection
          mode={jdMode}
          onModeChange={(mode) => {
            setJdMode(mode);
            setError(null);
          }}
          roleId={roleId}
          onRoleChange={setRoleId}
          experienceId={experienceId}
          onExperienceChange={setExperienceId}
          jobDescription={manualJd}
          onJobDescriptionChange={setManualJd}
        />
      </FadeIn>

      <FadeIn delay={0.2}>
        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Starting analysis..." : "See Why I'm Getting Ignored"}
        </Button>
      </FadeIn>
    </form>
  );
}
