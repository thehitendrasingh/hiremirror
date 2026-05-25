export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const MIN_RESUME_CHARS = 100;
export const MIN_JOB_DESCRIPTION_CHARS = 20;
export const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;
export const ACCEPTED_EXTENSIONS = [".pdf", ".docx"] as const;

export const LOADING_MESSAGES = [
  "Reviewing resume content for fit...",
  "Matching experience to the target role...",
  "Flagging recruiter visibility risks...",
  "Finalizing the recruiter analysis...",
] as const;

export const SAMPLE_INSIGHTS = [
  "Your resume reads mid-level IC — this Senior SWE role expects cross-team technical ownership.",
  "Stack keywords are credible, but production scale and system design proof are missing.",
  "Bullets sound AI-polished; recruiters can't verify real shipping impact in 7 seconds.",
] as const;
