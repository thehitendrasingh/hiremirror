"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAnalysisResult } from "@/features/analyze/actions";
import { ResultsView } from "@/features/results/results-view";
import { ResultsSkeleton } from "@/features/results/results-skeleton";
import { Button } from "@/components/ui/button";
import type { AnalysisReport } from "@/types/report";
import { getClientSession, saveClientSession } from "@/utils/client-session";

type ResultsPageClientProps = {
  sessionId: string;
};

export function ResultsPageClient({ sessionId }: ResultsPageClientProps) {
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const cached = getClientSession(sessionId);
      if (cached) {
        if (!cancelled) {
          setReport(cached);
          setLoading(false);
        }
        return;
      }

      const server = await getAnalysisResult(sessionId);
      if (cancelled) return;

      if (server.ok) {
        saveClientSession(sessionId, server.report);
        setReport(server.report);
        setLoading(false);
        return;
      }

      setNotFound(true);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  if (loading) {
    return <ResultsSkeleton />;
  }

  if (notFound || !report) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-semibold text-white">Report not found</h1>
        <p className="mt-2 max-w-sm text-zinc-400">
          This report isn&apos;t available in this browser session. Run a new
          analysis to see your results.
        </p>
        <Button variant="accent" className="mt-8" asChild>
          <Link href="/analyze">Analyze My Resume</Link>
        </Button>
      </div>
    );
  }

  return (
    <ResultsView
      data={report.result}
      targetRole={report.targetRole}
    />
  );
}
