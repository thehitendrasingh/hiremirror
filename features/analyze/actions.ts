"use server";

import {
  completeSession,
  createPendingSession,
  failSession,
  getPendingSession,
  getSessionFailure,
  getSessionReport,
} from "@/lib/session-store";
import { validateFile, validateJobDescription } from "@/lib/validate-upload";
import { parseResume } from "@/services/resume-parser";
import { analyzeResumeWithGemini } from "@/services/gemini";
import type { AnalysisError, AnalysisResponse } from "@/types/analysis";
import type { AnalysisReport } from "@/types/report";

export async function submitAnalysis(
  formData: FormData
): Promise<
  | { ok: true; sessionId: string }
  | { ok: false; error: { code: string; message: string } }
> {
  const file = formData.get("resume");
  const jobDescription = String(formData.get("jobDescription") ?? "");
  const targetRole = String(formData.get("targetRole") ?? "Software Engineer");
  const experienceLevel = String(formData.get("experienceLevel") ?? "").trim() || undefined;

  if (!(file instanceof File)) {
    return {
      ok: false,
      error: { code: "INVALID_FILE", message: "Please upload your resume." },
    };
  }

  const fileError = validateFile(file);
  if (fileError) return { ok: false, error: fileError };

  const jobError = validateJobDescription(jobDescription);
  if (jobError) return { ok: false, error: jobError };

  const buffer = Buffer.from(await file.arrayBuffer());
  const mimeType =
    file.type ||
    (file.name.endsWith(".pdf")
      ? "application/pdf"
      : "application/vnd.openxmlformats-officedocument.wordprocessingml.document");

  const parsed = await parseResume(buffer, mimeType);
  if (!parsed.ok) return { ok: false, error: parsed.error };

  const sessionId = createPendingSession(
    parsed.text,
    jobDescription,
    targetRole,
    experienceLevel
  );
  console.debug(`[actions] submitAnalysis created session ${sessionId}`);
  return { ok: true, sessionId };
}

export async function runAnalysis(
  sessionId: string
): Promise<AnalysisResponse> {
  const existing = getSessionReport(sessionId);
  if (existing) {
    return {
      ok: true,
      data: existing.result,
      sessionId,
      targetRole: existing.targetRole,
    };
  }

  const failure = getSessionFailure(sessionId);
  if (failure) {
    return {
      ok: false,
      error: {
        code: failure.code as AnalysisError["code"],
        message: failure.message,
      },
    };
  }

  const pending = getPendingSession(sessionId);
  if (!pending) {
    return {
      ok: false,
      error: {
        code: "UNKNOWN",
        message: "Session expired. Please upload your resume again.",
      },
    };
  }

  const analysis = await analyzeResumeWithGemini(
    pending.resumeText,
    pending.jobDescription,
    pending.targetRole,
    pending.experienceLevel
  );

  if (!analysis.ok) {
    failSession(sessionId, analysis.error.message, analysis.error.code);
    return { ok: false, error: analysis.error };
  }

  completeSession(sessionId, analysis.data, pending.targetRole);
  return {
    ok: true,
    data: analysis.data,
    sessionId,
    targetRole: pending.targetRole,
  };
}

export async function getAnalysisResult(
  sessionId: string
): Promise<
  | { ok: true; report: AnalysisReport }
  | { ok: false; error: { message: string } }
> {
  // Check if we already have a completed report
  const existing = getSessionReport(sessionId);
  if (existing) {
    return {
      ok: true,
      report: existing,
    };
  }

  // Check if there's a recorded failure
  const failure = getSessionFailure(sessionId);
  if (failure) {
    return {
      ok: false,
      error: {
        message: failure.message,
      },
    };
  }

  // Get pending session and run analysis if needed
  const pending = getPendingSession(sessionId);
  if (!pending) {
    return {
      ok: false,
      error: {
        message: "Session expired. Please upload your resume again.",
      },
    };
  }

  // Run the analysis
  const analysis = await analyzeResumeWithGemini(
    pending.resumeText,
    pending.jobDescription,
    pending.targetRole,
    pending.experienceLevel
  );

  if (!analysis.ok) {
    failSession(sessionId, analysis.error.message, analysis.error.code);
    return { ok: false, error: { message: analysis.error.message } };
  }

  // Store the completed session
  completeSession(sessionId, analysis.data, pending.targetRole);
  return {
    ok: true,
    report: { result: analysis.data, targetRole: pending.targetRole },
  };
}
