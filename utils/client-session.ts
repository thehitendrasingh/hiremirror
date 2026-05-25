import type { AnalysisReport } from "@/types/report";

const STORAGE_PREFIX = "hiremirror:session:";

export function saveClientSession(
  sessionId: string,
  report: AnalysisReport
): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      `${STORAGE_PREFIX}${sessionId}`,
      JSON.stringify(report)
    );
  } catch {
    // sessionStorage full or unavailable
  }
}

export function getClientSession(sessionId: string): AnalysisReport | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(`${STORAGE_PREFIX}${sessionId}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AnalysisReport;
    if (!parsed?.result || !parsed?.targetRole) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function removeClientSession(sessionId: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(`${STORAGE_PREFIX}${sessionId}`);
  } catch {
    // ignore
  }
}
