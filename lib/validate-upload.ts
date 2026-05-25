import {
  ACCEPTED_EXTENSIONS,
  ACCEPTED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
  MIN_JOB_DESCRIPTION_CHARS,
} from "@/utils/constants";
import type { AnalysisError } from "@/types/analysis";

export function validateFile(file: File): AnalysisError | null {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      code: "FILE_TOO_LARGE",
      message: "File is too large. Maximum size is 5MB.",
    };
  }

  const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
  const mimeOk = ACCEPTED_MIME_TYPES.includes(
    file.type as (typeof ACCEPTED_MIME_TYPES)[number]
  );
  const extOk = ACCEPTED_EXTENSIONS.includes(
    ext as (typeof ACCEPTED_EXTENSIONS)[number]
  );

  if (!mimeOk && !extOk) {
    return {
      code: "UNSUPPORTED_FORMAT",
      message: "Please upload a PDF or DOCX file.",
    };
  }

  return null;
}

export function validateJobDescription(jobDescription: string): AnalysisError | null {
  if (jobDescription.trim().length < MIN_JOB_DESCRIPTION_CHARS) {
    return {
      code: "MISSING_JOB_DESCRIPTION",
      message: "Please paste the job description you're applying to (at least 20 characters).",
    };
  }
  return null;
}
