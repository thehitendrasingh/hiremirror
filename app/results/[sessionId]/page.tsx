import { PageShell } from "@/components/layout/page-shell";
import { ResultsPageClient } from "@/features/results/results-page-client";

type Props = {
  params: Promise<{ sessionId: string }>;
};

export default async function ResultsPage({ params }: Props) {
  const { sessionId } = await params;

  return (
    <PageShell>
      <ResultsPageClient sessionId={sessionId} />
    </PageShell>
  );
}
