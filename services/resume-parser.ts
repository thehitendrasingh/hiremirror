import mammoth from "mammoth";
import type { AnalysisError } from "@/types/analysis";
import { MIN_RESUME_CHARS } from "@/utils/constants";

export type ParseResult =
  | { ok: true; text: string }
  | { ok: false; error: AnalysisError };

async function parsePdf(buffer: Buffer): Promise<string> {
  const pdfParse = (await import("pdf-parse")).default;
  const data = await pdfParse(buffer);
  return data.text ?? "";
}

async function parseDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value ?? "";
}

function normalizeText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n\n")
    .trim();
}

function hasClearDates(text: string): boolean {
  const datePatterns = [
    /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4}\b/i,
    /\b\d{4}\s*[–-]\s*\d{4}\b/,
    /\b\d{1,2}\/\d{2,4}\b/,
    /\b(?:\d{1,2}\s+)?(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*[-–to]{1,3}\s*(?:\d{1,2}\s+)?(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\b/i,
  ];
  return datePatterns.some((pattern) => pattern.test(text));
}

export async function parseResume(
  buffer: Buffer,
  mimeType: string
): Promise<ParseResult> {
  try {
    let rawText = "";

    if (mimeType === "application/pdf") {
      rawText = await parsePdf(buffer);
    } else if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      rawText = await parseDocx(buffer);
    } else {
      return {
        ok: false,
        error: {
          code: "UNSUPPORTED_FORMAT",
          message: "Please upload a PDF or DOCX file.",
        },
      };
    }

    const text = normalizeText(rawText);

    if (!text || text.length < MIN_RESUME_CHARS) {
      return {
        ok: false,
        error: {
          code: "EMPTY_RESUME",
          message:
            "We couldn't extract enough text from your resume. Try a different file or ensure it's not image-only.",
        },
      };
    }

    if (!hasClearDates(text)) {
      return {
        ok: false,
        error: {
          code: "MISSING_DATES",
          message:
            "Your resume text was extracted, but we could not detect clear employment date ranges. Please upload a resume with explicit timeline/date formatting so we can avoid making assumptions.",
        },
      };
    }

    return { ok: true, text };
  } catch {
    return {
      ok: false,
      error: {
        code: "PARSE_FAILED",
        message:
          "We couldn't read your resume. Please try a different PDF or DOCX file.",
      },
    };
  }
}
