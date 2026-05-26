"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, RotateCcw, TrendingUp, AlertTriangle } from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";
import { InsightCard } from "@/components/shared/insight-card";
import { SectionLabel } from "@/components/shared/section-label";
import { downloadReportPdf } from "@/utils/generate-report-pdf";
import { cn } from "@/utils/cn";

type ResultsViewProps = {
  data: AnalysisResult;
  targetRole: string;
};

/** Colour for a factor bar based on score */
function factorColor(score: number): string {
  if (score >= 70) return "bg-emerald-500";
  if (score >= 50) return "bg-amber-500";
  return "bg-red-500";
}

export function ResultsView({ data, targetRole }: ResultsViewProps) {
  const handleSavePdf = () => {
    void downloadReportPdf(data, targetRole);
  };

  const probabilityScore = data.interviewProbability?.score ?? 0;
  const probabilityExplanation = data.interviewProbability?.explanation ?? "";
  const strengths = data.strengths ?? [];
  const improvementSuggestions = data.improvementSuggestions ?? [];
  const scoringFactors = data.scoringFactors ?? [];
  const improvementDetails = data.improvementDetails ?? [];
  const rewriteExamples = data.rewriteExamples ?? [];

  return (
    <article className="mx-auto max-w-3xl px-6 pb-32 pt-12">
      <FadeIn>
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          Your tech recruiter mirror
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Why you're getting ignored
        </h1>
        <p className="mt-3 text-sm text-indigo-400/90">
          Analyzed for: <span className="font-medium text-indigo-300">{targetRole}</span>
        </p>
      </FadeIn>

      {/* FEATURE 1: Interview Probability */}
      <section className="mt-16">
        <SectionLabel>Interview Probability</SectionLabel>
        <FadeIn delay={0.05} className="mt-4">
          <Card className="overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900/80 to-zinc-950">
            <CardContent className="p-8">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="text-7xl font-bold tracking-tight text-white md:text-8xl">
                    {probabilityScore}
                    <span className="text-3xl font-medium text-zinc-500 md:text-4xl">%</span>
                  </div>
                </div>
                {probabilityExplanation && (
                  <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
                    {probabilityExplanation}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </section>

      {/* Scoring Factor Breakdown */}
      {scoringFactors.length > 0 && (
        <section className="mt-12">
          <SectionLabel>Where you score (and where you don't)</SectionLabel>
          <FadeIn delay={0.07} className="mt-4">
            <Card className="border-zinc-800/70">
              <CardContent className="p-6 space-y-4">
                {scoringFactors.map((factor, i) => (
                  <FadeIn key={factor.name} delay={0.09 + i * 0.04} direction="none">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-300">{factor.label}</span>
                        <span className={cn(
                          "font-mono text-xs font-medium",
                          factor.score >= 70 ? "text-emerald-400" : factor.score >= 50 ? "text-amber-400" : "text-red-400"
                        )}>
                          {factor.score}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-zinc-900">
                        <div
                          className={cn("h-full rounded-full transition-all duration-700", factorColor(factor.score))}
                          style={{ width: `${factor.score}%` }}
                        />
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </CardContent>
            </Card>
          </FadeIn>
        </section>
      )}

      {/* Core Diagnosis */}
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

      {/* FEATURE 2: Strengths Analysis */}
      {strengths.length > 0 && (
        <section className="mt-16">
          <SectionLabel>Why you're a strong fit for this role</SectionLabel>
          <FadeIn delay={0.12} className="mt-4">
            <div className="space-y-3">
              {strengths.map((strength, i) => (
                <FadeIn key={`strength-${i}`} delay={0.15 + i * 0.06} direction="none">
                  <Card className="border-emerald-900/30 bg-gradient-to-r from-emerald-950/20 to-transparent">
                    <CardContent className="flex items-start gap-3 p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <p className="text-sm leading-relaxed text-zinc-300">{strength}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {/* Recruiter 7-Second Scan */}
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

      {/* Top Hiring Risks */}
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

      {/* FEATURE 3: Improvement Suggestions */}
      <section className="mt-16">
        <SectionLabel>Top actions to improve interview probability</SectionLabel>
        <FadeIn delay={0.3} className="mt-4">
          <div className="space-y-3">
            {improvementSuggestions.map((suggestion, i) => {
              const detail = improvementDetails[i];
              return (
                <FadeIn key={`improve-${i}`} delay={0.33 + i * 0.06} direction="none">
                  <Card className="border-zinc-800">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-semibold text-zinc-400">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm leading-relaxed text-zinc-300">{suggestion}</p>
                          {detail?.impactScore && (
                            <div className="mt-2 flex items-center gap-2">
                              <TrendingUp className="h-3.5 w-3.5 text-indigo-400" />
                              <span className="text-xs text-zinc-500">
                                Impact score: <span className={cn(
                                  "font-medium",
                                  detail.impactScore >= 70 ? "text-emerald-400" : detail.impactScore >= 50 ? "text-amber-400" : "text-red-400"
                                )}>{detail.impactScore}%</span>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </FadeIn>
      </section>

      {/* Smart Rewrite (Primary) */}
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

      {/* Extra Rewrite Examples */}
      {rewriteExamples.length > 0 && (
        <section className="mt-8">
          <SectionLabel>More rewrites to try</SectionLabel>
          <div className="mt-4 space-y-4">
            {rewriteExamples.map((ex, i) => (
              <FadeIn key={`rewrite-${i}`} delay={0.43 + i * 0.06}>
                <Card className="overflow-hidden border-zinc-800/70">
                  <CardContent className="p-5 space-y-4">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">Before</p>
                      <p className="mt-1.5 rounded-lg bg-zinc-900/60 px-3 py-2.5 text-sm text-zinc-400 line-through decoration-zinc-600">
                        {ex.before}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="h-4 w-4 text-indigo-500/60" />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-indigo-400/60">After</p>
                      <p className="mt-1.5 rounded-lg border border-indigo-500/15 bg-indigo-950/20 px-3 py-2.5 text-sm font-medium text-zinc-100">
                        {ex.after}
                      </p>
                    </div>
                    <p className="border-t border-zinc-800/60 pt-3 text-xs leading-relaxed text-zinc-500">
                      <span className="font-medium text-zinc-400">Why: </span>
                      {ex.explanation}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* Download / CTA */}
      <section className="mt-20 rounded-2xl border border-zinc-800 bg-zinc-950/50 p-8 text-center">
        <FadeIn delay={0.5}>
          <h2 className="text-xl font-semibold text-white">
            Want deeper recruiter insights?
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Download your hiring visibility report or analyze another role.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="accent" onClick={handleSavePdf}>
              <Download className="h-4 w-4" />
              Download Hiring Visibility Report
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