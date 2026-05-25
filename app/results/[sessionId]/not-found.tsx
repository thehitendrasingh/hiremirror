import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

export default function ResultsNotFound() {
  return (
    <PageShell>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-semibold text-white">Report not found</h1>
        <p className="mt-2 max-w-sm text-zinc-400">
          This analysis may have expired. Sessions are kept in memory for one
          hour.
        </p>
        <Button variant="accent" className="mt-8" asChild>
          <Link href="/analyze">Analyze My Resume</Link>
        </Button>
      </div>
    </PageShell>
  );
}
