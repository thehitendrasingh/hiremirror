import type { AnalysisResult } from "@/types/analysis";
import type { AnalysisReport } from "@/types/report";

type PendingSession = {
  status: "pending";
  resumeText: string;
  jobDescription: string;
  targetRole: string;
  experienceLevel?: string;
  createdAt: number;
};

type CompleteSession = {
  status: "complete";
  report: AnalysisReport;
  createdAt: number;
};

type FailedSession = {
  status: "failed";
  message: string;
  code: string;
  createdAt: number;
};

type SessionEntry = PendingSession | CompleteSession | FailedSession;

const store = new Map<string, SessionEntry>();
const TTL_MS = 60 * 60 * 1000;

import fs from "fs";
import path from "path";

const PERSIST_DIR = path.join(process.cwd(), ".hiremirror_sessions");

function ensurePersistDir() {
  try {
    if (!fs.existsSync(PERSIST_DIR)) fs.mkdirSync(PERSIST_DIR, { recursive: true });
  } catch {
    // ignore
  }
}

function persistPending(sessionId: string, entry: PendingSession) {
  try {
    ensurePersistDir();
    const file = path.join(PERSIST_DIR, `${sessionId}.json`);
    fs.writeFileSync(file, JSON.stringify(entry), "utf8");
  } catch {
    // ignore
  }
}

function removePersisted(sessionId: string) {
  try {
    const file = path.join(PERSIST_DIR, `${sessionId}.json`);
    if (fs.existsSync(file)) fs.unlinkSync(file);
  } catch {
    // ignore
  }
}

function readPersisted(sessionId: string): PendingSession | null {
  try {
    const file = path.join(PERSIST_DIR, `${sessionId}.json`);
    if (!fs.existsSync(file)) return null;
    const raw = fs.readFileSync(file, "utf8");
    const parsed = JSON.parse(raw) as PendingSession;
    return parsed;
  } catch {
    return null;
  }
}

function pruneExpired() {
  const now = Date.now();
  for (const [id, entry] of Array.from(store.entries())) {
    if (now - entry.createdAt > TTL_MS) {
      store.delete(id);
      // cleanup persisted file if present
      try {
        removePersisted(id);
      } catch {}
    }
  }
}

export function createPendingSession(
  resumeText: string,
  jobDescription: string,
  targetRole: string,
  experienceLevel?: string
): string {
  pruneExpired();
  const sessionId = crypto.randomUUID();
  store.set(sessionId, {
    status: "pending",
    resumeText,
    jobDescription,
    targetRole,
    experienceLevel,
    createdAt: Date.now(),
  });
  try {
    persistPending(sessionId, {
      status: "pending",
      resumeText,
      jobDescription,
      targetRole,
      experienceLevel,
      createdAt: Date.now(),
    });
  } catch {}
  console.debug(`[session-store] createPendingSession -> ${sessionId}`);
  return sessionId;
}

export function getPendingSession(sessionId: string): {
  resumeText: string;
  jobDescription: string;
  targetRole: string;
  experienceLevel?: string;
} | null {
  pruneExpired();
  let entry = store.get(sessionId);
  // If not in-memory, attempt to read persisted pending session
  if (!entry) {
    const persisted = readPersisted(sessionId);
    if (persisted) {
      store.set(sessionId, persisted as SessionEntry);
      entry = store.get(sessionId)!;
    }
  }
  console.debug(`[session-store] getPendingSession -> ${sessionId} found=${!!entry && entry.status === 'pending'}`);
  if (!entry || entry.status !== "pending") return null;
  if (Date.now() - entry.createdAt > TTL_MS) {
    store.delete(sessionId);
    try {
      removePersisted(sessionId);
    } catch {}
    return null;
  }
  return {
    resumeText: entry.resumeText,
    jobDescription: entry.jobDescription,
    targetRole: entry.targetRole,
    experienceLevel: entry.experienceLevel,
  };
}

export function completeSession(
  sessionId: string,
  result: AnalysisResult,
  targetRole: string
): void {
  store.set(sessionId, {
    status: "complete",
    report: { result, targetRole },
    createdAt: Date.now(),
  });
  try {
    removePersisted(sessionId);
  } catch {}
}

export function failSession(
  sessionId: string,
  message: string,
  code: string
): void {
  store.set(sessionId, {
    status: "failed",
    message,
    code,
    createdAt: Date.now(),
  });
  try {
    removePersisted(sessionId);
  } catch {}
}

export function getSessionReport(sessionId: string): AnalysisReport | null {
  pruneExpired();
  const entry = store.get(sessionId);
  if (!entry || entry.status !== "complete") return null;
  if (Date.now() - entry.createdAt > TTL_MS) {
    store.delete(sessionId);
    return null;
  }
  return entry.report;
}

/** @deprecated Use getSessionReport */
export function getSessionResult(sessionId: string): AnalysisResult | null {
  const report = getSessionReport(sessionId);
  return report?.result ?? null;
}

export function getSessionFailure(
  sessionId: string
): { message: string; code: string } | null {
  pruneExpired();
  const entry = store.get(sessionId);
  if (!entry || entry.status !== "failed") return null;
  return { message: entry.message, code: entry.code };
}
