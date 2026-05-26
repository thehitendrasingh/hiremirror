import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  RECRUITER_ANALYSIS_SYSTEM,
  buildRecruiterAnalysisPrompt,
} from "@/prompts/recruiter-analysis";
import { analysisResultSchema, type AnalysisResult } from "@/types/analysis";
import type { AnalysisError } from "@/types/analysis";
import { getRoleConfig, buildRoleContextBlock } from "@/lib/role-config";

export type GeminiResult =
  | { ok: true; data: AnalysisResult }
  | { ok: false; error: AnalysisError };

const DEFAULT_MODEL = "gemini-2.5-flash";
const MAX_ATTEMPTS = 2;

function getGeminiErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const msg = error.message;
    if (msg.includes("404") || msg.includes("not found")) {
      return "AI model unavailable. Set GEMINI_MODEL=gemini-2.5-flash in .env.local and restart the dev server.";
    }
    if (msg.includes("API key not valid") || msg.includes("API_KEY_INVALID")) {
      return "Invalid Gemini API key. Check GEMINI_API_KEY in .env.local.";
    }
    if (msg.includes("429") || msg.includes("quota")) {
      return "Gemini rate limit reached. Please wait a moment and try again.";
    }
    return msg;
  }
  return "Analysis failed. Please try again in a moment.";
}

function extractJson(raw: string): string {
  const trimmed = raw.trim();
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) return fenceMatch[1].trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start !== -1 && end !== -1) return trimmed.slice(start, end + 1);
  return trimmed;
}

async function callGemini(
  apiKey: string,
  resumeText: string,
  jobDescription: string,
  targetRoleLabel: string,
  experienceLevel: string | undefined,
  strictRetry: boolean
): Promise<{ raw: string | null; error: unknown | null }> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL ?? DEFAULT_MODEL,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: strictRetry ? 0.4 : 0.65,
    },
  });

  // Resolve role config for recruiter psychology context
  const roleConfig = getRoleConfig(targetRoleLabel);
  const roleContextBlock = buildRoleContextBlock(roleConfig);

  const prompt = buildRecruiterAnalysisPrompt(
    resumeText,
    jobDescription,
    targetRoleLabel,
    experienceLevel,
    roleContextBlock
  );
  const retryNote = strictRetry
    ? "\n\nPREVIOUS RESPONSE FAILED VALIDATION. Return JSON only with all required fields, exactly 3 hiring risks, 3-5 recruiterScan bullets with (Tag) prefixes."
    : "";

  try {
    const result = await model.generateContent([
      { text: RECRUITER_ANALYSIS_SYSTEM },
      { text: prompt + retryNote },
    ]);
    return { raw: result.response.text(), error: null };
  } catch (error) {
    return { raw: null, error };
  }
}

function parseAndValidate(raw: string): AnalysisResult | null {
  const jsonStr = extractJson(raw);
  try {
    const parsed = JSON.parse(jsonStr) as unknown;
    const validated = analysisResultSchema.safeParse(parsed);
    if (!validated.success) return null;
    return validated.data;
  } catch {
    return null;
  }
}

export async function analyzeResumeWithGemini(
  resumeText: string,
  jobDescription: string,
  targetRoleLabel: string,
  experienceLevel?: string
): Promise<GeminiResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      ok: false,
      error: {
        code: "AI_FAILED",
        message:
          "Analysis service is not configured. Please set GEMINI_API_KEY.",
      },
    };
  }

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const { raw, error } = await callGemini(
      apiKey,
      resumeText,
      jobDescription,
      targetRoleLabel,
      experienceLevel,
      attempt > 0
    );

    if (error) {
      console.error("[gemini] analysis failed:", error);
      return {
        ok: false,
        error: {
          code: "AI_FAILED",
          message: getGeminiErrorMessage(error),
        },
      };
    }

    if (!raw) {
      return {
        ok: false,
        error: {
          code: "AI_FAILED",
          message: "Analysis returned empty. Please try again.",
        },
      };
    }

    const data = parseAndValidate(raw);
    if (data) {
      return { ok: true, data };
    }
  }

  return {
    ok: false,
    error: {
      code: "INVALID_AI_RESPONSE",
      message: "Analysis didn't meet quality checks. Please try again.",
    },
  };
}
