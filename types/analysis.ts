import { z } from "zod";

// --- Sub-schemas ---

export const interviewProbabilitySchema = z.object({
  score: z.number().min(0).max(100),
  explanation: z.string().min(20).max(600),
});

export const scoringFactorSchema = z.object({
  name: z.string().min(1),
  score: z.number().min(0).max(100),
  label: z.string().min(1),
});

export const hiringRiskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const rewriteExampleSchema = z.object({
  before: z.string().min(1),
  after: z.string().min(1),
  explanation: z.string().min(1),
});

export const improvementSuggestionSchema = z.object({
  action: z.string().min(8),
  impactScore: z.number().min(1).max(100).optional(),
  category: z.string().optional(),
  example: z.string().optional(),
});

// --- Master analysis result ---

export const analysisResultSchema = z.object({
  interviewProbability: interviewProbabilitySchema,

  scoringFactors: z.array(scoringFactorSchema).optional(),

  coreDiagnosis: z.string().min(20).max(500),

  strengths: z.array(z.string().min(8)).min(3).max(5),

  roleFitVerdict: z.string().min(15).max(300),

  recruiterScan: z.array(z.string().min(8)).min(3).max(5),

  topHiringRisks: z.array(hiringRiskSchema).length(3),

  improvementSuggestions: z.array(z.string().min(8)).min(3).max(3),

  improvementDetails: z.array(improvementSuggestionSchema).optional(),

  rewriteExample: rewriteExampleSchema,

  rewriteExamples: z.array(rewriteExampleSchema).optional(),
});

// --- Inferred types ---

export type InterviewProbability = z.infer<typeof interviewProbabilitySchema>;
export type ScoringFactor = z.infer<typeof scoringFactorSchema>;
export type HiringRisk = z.infer<typeof hiringRiskSchema>;
export type RewriteExample = z.infer<typeof rewriteExampleSchema>;
export type ImprovementSuggestion = z.infer<typeof improvementSuggestionSchema>;
export type AnalysisResult = z.infer<typeof analysisResultSchema>;

// --- Error types ---

export type AnalysisErrorCode =
  | "INVALID_FILE"
  | "EMPTY_RESUME"
  | "PARSE_FAILED"
  | "FILE_TOO_LARGE"
  | "UNSUPPORTED_FORMAT"
  | "AI_FAILED"
  | "INVALID_AI_RESPONSE"
  | "MISSING_JOB_DESCRIPTION"
  | "MISSING_DATES"
  | "UNKNOWN";

export type AnalysisError = {
  code: AnalysisErrorCode;
  message: string;
};

export type AnalysisSuccess = {
  ok: true;
  data: AnalysisResult;
  sessionId: string;
  targetRole?: string;
};

export type AnalysisFailure = {
  ok: false;
  error: AnalysisError;
};

export type AnalysisResponse = AnalysisSuccess | AnalysisFailure;
