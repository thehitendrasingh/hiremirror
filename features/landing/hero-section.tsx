"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ScanSearch,
  Target,
  Sparkles,
  ArrowRight,
  BarChart3,
  ListChecks,
  TrendingUp,
} from "lucide-react";

const FEATURES = [
  {
    icon: Target,
    title: "Interview Probability",
    description:
      "See a data-driven percentage of your actual recruiter callback odds, with nuanced explanation of what's holding you back.",
    gradient: "from-indigo-600/20 via-violet-600/10 to-transparent",
  },
  {
    icon: BarChart3,
    title: "Strengths Analysis",
    description:
      "Discover the recruiter-positive signals in your resume that actually move the needle for your target role.",
    gradient: "from-emerald-600/20 via-emerald-500/10 to-transparent",
  },
  {
    icon: ListChecks,
    title: "Improvement Roadmap",
    description:
      "Get 3 concrete, role-specific actions to improve your recruiter visibility — no generic advice, just what works.",
    gradient: "from-amber-600/20 via-amber-500/10 to-transparent",
  },
  {
    icon: TrendingUp,
    title: "Role-Specific Analysis",
    description:
      "Every analysis is calibrated against 5 distinct role configurations — PM, SWE, Data Analyst, UX Designer, Marketing Manager.",
    gradient: "from-sky-600/20 via-sky-500/10 to-transparent",
  },
];

const DIAGNOSIS_QUOTES = [
  {
    text: "Your resume reads mid-level IC — this Senior SWE role expects cross-team technical ownership.",
    type: "Level mismatch",
  },
  {
    text: "Stack keywords are credible, but production scale and system design proof are missing.",
    type: "Signal gap",
  },
  {
    text: "Bullets sound AI-polished; recruiters can't verify real shipping impact in 7 seconds.",
    type: "Authenticity risk",
  },
];

export function HeroSection() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative mx-auto max-w-5xl px-6 pb-16 pt-24 text-center md:pt-36 md:pb-20">
        {/* Glow effect */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/5 blur-[120px]" />
          <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/5 blur-[100px]" />
        </div>

        <FadeIn>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-950/30 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-indigo-300">
            <Sparkles className="h-3 w-3" />
            AI-Powered Recruiter Intelligence
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-6xl md:leading-[1.04]">
            Find out why recruiters
            <br />
            <span className="bg-gradient-to-r from-indigo-200 via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              ignore your resume.
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
            A brutally honest mirror for tech professionals. Get a role-specific,
            recruiter-authentic analysis of your resume — level, stack, scope,
            ownership, and risks — in under 10 seconds.
          </p>
        </FadeIn>

        <FadeIn delay={0.22} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button variant="accent" size="lg" asChild className="group relative px-8 py-3.5 text-base">
            <Link href="/analyze">
              <ScanSearch className="mr-2 h-5 w-5" />
              Analyze My Resume
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <p className="text-xs text-zinc-600">
            Free · No signup · Takes 10 seconds
          </p>
        </FadeIn>

        {/* ── Trust / diagnosis quotes ── */}
        <FadeIn delay={0.3}>
          <div className="mt-20 grid gap-3 text-left md:grid-cols-3">
            {DIAGNOSIS_QUOTES.map((q, i) => (
              <FadeIn key={q.text} delay={0.35 + i * 0.06} direction="none">
                <Card className="border-zinc-800/60 bg-zinc-950/50">
                  <CardContent className="p-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-indigo-400/70 mb-2">
                      {q.type}
                    </p>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      &ldquo;{q.text}&rdquo;
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Feature Panels ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              What you get
            </h2>
            <p className="mt-3 text-sm text-zinc-500 max-w-lg mx-auto">
              Every analysis is calibrated to your target role, level, and
              experience band — no generic feedback.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <FadeIn key={feature.title} delay={0.1 + i * 0.08}>
              <Card className="group relative overflow-hidden border-zinc-800/60 bg-zinc-950/60 transition-all duration-300 hover:border-zinc-700/60 hover:bg-zinc-950/80">
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <CardContent className="relative z-10 p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900">
                    <feature.icon className="h-5 w-5 text-indigo-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="mx-auto max-w-4xl px-6 pb-24 md:pb-32">
        <FadeIn>
          <div className="mb-14 text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              How it works
            </h2>
            <p className="mt-3 text-sm text-zinc-500">
              Three steps to recruiter clarity.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Upload resume & pick role",
              description:
                "Upload your resume (PDF, DOCX). Select your target tech role and experience level, or paste a real JD.",
            },
            {
              step: "2",
              title: "AI recruiter analysis",
              description:
                "Gemini simulates a senior technical recruiter's 7-second scan across 7 scoring factors calibrated to your target role.",
            },
            {
              step: "3",
              title: "Actionable intelligence",
              description:
                "Get Interview Probability, Strengths, Risks, Improvement Suggestions, a Rewrite example, and a downloadable PDF report.",
            },
          ].map((item) => (
            <FadeIn key={item.step} delay={0.1 + Number(item.step) * 0.08}>
              <div className="flex flex-col items-center text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600/20 text-sm font-bold text-indigo-400 ring-1 ring-indigo-500/30">
                  {item.step}
                </span>
                <h3 className="mt-5 text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400 max-w-xs">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Roles supported ── */}
      <section className="mx-auto max-w-4xl px-6 pb-24 md:pb-32">
        <FadeIn>
          <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/50 p-8 md:p-12 text-center">
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              Built for technical roles
            </h2>
            <p className="mt-3 text-sm text-zinc-500 max-w-md mx-auto">
              Each role has its own recruiter psychology configuration —
              calibrated for the signals that actually matter.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                "Product Manager",
                "Software Engineer",
                "Data Analyst",
                "UX Designer",
                "Marketing Manager",
              ].map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300"
                >
                  {role}
                </span>
              ))}
            </div>
            <div className="mt-10">
              <Button variant="accent" asChild>
                <Link href="/analyze">
                  <ScanSearch className="mr-2 h-4 w-4" />
                  Get Your Analysis
                </Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}