import { Suspense } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { AnalysisLoader } from "@/features/analyze/analysis-loader";

function LoaderFallback() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <p className="text-zinc-500">Preparing analysis...</p>
    </div>
  );
}

export default function AnalyzeLoadingPage() {
  return (
    <PageShell>
      <Suspense fallback={<LoaderFallback />}>
        <AnalysisLoader />
      </Suspense>
    </PageShell>
  );
}
