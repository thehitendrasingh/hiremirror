import { PageShell } from "@/components/layout/page-shell";
import { FadeIn } from "@/components/motion/fade-in";
import { UploadForm } from "@/features/analyze/upload-form";

export default function AnalyzePage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-20">
        <FadeIn>
          <h1 className="text-center text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Upload your tech resume
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-zinc-400">
            Pick a target tech role or paste a JD - we mirror how
            technical recruiters perceive your level and scope.
          </p>
        </FadeIn>
        <div className="mt-12">
          <UploadForm />
        </div>
      </div>
    </PageShell>
  );
}
