"use client";

import Link from "next/link";
import { ArrowRight, Download, RotateCcw } from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";
import { InsightCard } from "@/components/shared/insight-card";
import { SectionLabel } from "@/components/shared/section-label";
import { downloadReportPdf } from "@/utils/generate-report-pdf";

type ResultsViewProps = {
  data: AnalysisResult;
  targetRole: string;
};

export function ResultsView({ data, targetRole }: ResultsViewProps) {
  const handleSavePdf = () => {
    void downloadReportPdf(data, targetRole);
  };

  return (
    <article className="mx-auto max-w-3xl px-6 pb-32 pt-12">
      <FadeIn>
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          Your tech recruiter mirror
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Why you&apos;re getting ignored
        </h1>
        <p className="mt-3 text-sm text-indigo-400/90">
          Analyzed for: <span className="font-medium text-indigo-300">{targetRole}</span>
        </p>
      </FadeIn>

      <section className="mt-16">
        <SectionLabel>Core diagnosis</SectionLabel>
        <FadeIn delay={0.1} className="mt-4">
          <InsightCard variant="highlight" className="mt-0">
            <p className="text-xl font-medium leading-snug text-zinc-100 md:text-2xl">
              {data.coreDiagnosis}
            </p>
            <p className="mt-4 border-t border-indigo-500/20 pt-4 text-sm leading-relaxed text-zinc-400">
              <span className="font-medium text-zinc-300">Role fit: </span>
              {data.roleFitVerdict}
            </p>
          </InsightCard>
        </FadeIn>
      </section>

      <section className="mt-16">
        <SectionLabel>Recruiter 7-second scan</SectionLabel>
        <FadeIn delay={0.15} className="mt-4">
          <ul className="space-y-3">
            {data.recruiterScan.map((item, i) => (
              <FadeIn key={`${item}-${i}`} delay={0.2 + i * 0.08} direction="none">
                <li className="flex items-start gap-3 text-zinc-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                  <span className="text-base leading-relaxed">{item}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </FadeIn>
      </section>

      <section className="mt-16">
        <SectionLabel>Top hiring risks</SectionLabel>
        <div className="mt-4 space-y-4">
          {data.topHiringRisks.map((risk, i) => (
            <FadeIn key={risk.title} delay={0.25 + i * 0.08}>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-indigo-400">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-zinc-100">{risk.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                        {risk.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionLabel>One smart rewrite</SectionLabel>
        <FadeIn delay={0.4} className="mt-4">
          <Card className="overflow-hidden border-zinc-800">
            <CardContent className="space-y-6 p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Before
                </p>
                <p className="mt-2 rounded-lg bg-zinc-900/80 px-4 py-3 text-sm text-zinc-400 line-through decoration-zinc-600">
                  {data.rewriteExample.before}
                </p>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-indigo-400/80">
                  After
                </p>
                <p className="mt-2 rounded-lg border border-indigo-500/20 bg-indigo-950/30 px-4 py-3 text-sm font-medium text-zinc-100">
                  {data.rewriteExample.after}
                </p>
              </div>
              <p className="border-t border-zinc-800 pt-4 text-sm leading-relaxed text-zinc-400">
                <span className="font-medium text-zinc-300">Why this is better: </span>
                {data.rewriteExample.explanation}
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </section>

      <section className="mt-20 rounded-2xl border border-zinc-800 bg-zinc-950/50 p-8 text-center">
        <FadeIn delay={0.5}>
          <h2 className="text-xl font-semibold text-white">
            Want deeper recruiter insights?
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Download your PDF report or analyze another tech role.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="accent" onClick={handleSavePdf}>
              <Download className="h-4 w-4" />
              Download PDF Report
            </Button>
            <Button variant="outline" asChild>
              <Link href="/analyze">
                <RotateCcw className="h-4 w-4" />
                Analyze Another Role
              </Link>
            </Button>
          </div>
        </FadeIn>
      </section>
    </article>
  );
}
