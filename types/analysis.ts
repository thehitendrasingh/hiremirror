import { z } from "zod";

export const hiringRiskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const rewriteExampleSchema = z.object({
  before: z.string().min(1),
  after: z.string().min(1),
  explanation: z.string().min(1),
});

export const analysisResultSchema = z.object({
  coreDiagnosis: z.string().min(20).max(500),
  roleFitVerdict: z.string().min(15).max(300),
  recruiterScan: z.array(z.string().min(8)).min(3).max(5),
  topHiringRisks: z.array(hiringRiskSchema).length(3),
  rewriteExample: rewriteExampleSchema,
});

export type HiringRisk = z.infer<typeof hiringRiskSchema>;
export type RewriteExample = z.infer<typeof rewriteExampleSchema>;
export type AnalysisResult = z.infer<typeof analysisResultSchema>;

export type AnalysisErrorCode =
  | "INVALID_FILE"
  | "EMPTY_RESUME"
  | "PARSE_FAILED"
  | "FILE_TOO_LARGE"
  | "UNSUPPORTED_FORMAT"
  | "AI_FAILED"
  | "INVALID_AI_RESPONSE"
  | "MISSING_JOB_DESCRIPTION"
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
