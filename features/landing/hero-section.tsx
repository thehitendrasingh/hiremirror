"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { InsightCard } from "@/components/shared/insight-card";
import { SAMPLE_INSIGHTS } from "@/utils/constants";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 pt-24 text-center md:pt-32">
      <FadeIn>
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          Tech hiring visibility intelligence
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-6xl md:leading-[1.05]">
          Find out why recruiters
          <br />
          <span className="bg-gradient-to-r from-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            ignore your resume.
          </span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          See how technical recruiters actually perceive your resume
          - level, stack, scope, and ownership in one brutal mirror.
        </p>
      </FadeIn>

      <FadeIn delay={0.3} className="mt-10">
        <Button variant="accent" size="lg" asChild>
          <Link href="/analyze">Analyze My Resume</Link>
        </Button>
      </FadeIn>

      <div className="mt-20 grid gap-4 text-left md:grid-cols-3">
        {SAMPLE_INSIGHTS.map((insight, i) => (
          <FadeIn key={insight} delay={0.4 + i * 0.1} direction="up">
            <InsightCard>
              <span className="text-zinc-500">&ldquo;</span>
              {insight}
              <span className="text-zinc-500">&rdquo;</span>
            </InsightCard>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
