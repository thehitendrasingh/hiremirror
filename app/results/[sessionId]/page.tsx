import { PageShell } from "@/components/layout/page-shell";
import { ResultsPageClient } from "@/features/results/results-page-client";

type Props = {
  params: { sessionId: string };
};

export default function ResultsPage({ params }: Props) {
  return (
    <PageShell>
      <ResultsPageClient sessionId={params.sessionId} />
    </PageShell>
  );
}
