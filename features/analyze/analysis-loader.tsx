"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { runAnalysis } from "@/features/analyze/actions";
import { LOADING_STAGES } from "@/utils/constants";
import { saveClientSession } from "@/utils/client-session";
import { cn } from "@/utils/cn";

export function AnalysisLoader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");
  const [progress, setProgress] = useState(12);
  const [error, setError] = useState<string | null>(null);
  const startedFor = useRef<string | null>(null);
  const mounted = useRef(false);
  const progressStart = useRef<number | null>(null);

  const stageCount = LOADING_STAGES.length;
  const currentStage = Math.min(
    Math.floor((progress / 100) * stageCount),
    stageCount - 1
  );

  useEffect(() => {
    if (!sessionId) return;

    setProgress(12);
    progressStart.current = Date.now();

    const progressTimer = setInterval(() => {
      const start = progressStart.current;
      if (!start) return;
      const elapsed = Date.now() - start;
      // Faster: complete in ~4s instead of 7s
      const duration = 4000;
      const target = 95;
      const next = Math.min(target, 12 + Math.round((elapsed / duration) * (target - 12)));
      setProgress(next);
    }, 80);

    return () => {
      clearInterval(progressTimer);
    };
  }, [sessionId]);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    if (mounted.current && !sessionId) {
      router.replace("/analyze");
    }
  }, [sessionId, router]);

  useEffect(() => {
    if (!sessionId) return;
    if (startedFor.current === sessionId) return;
    startedFor.current = sessionId;

    runAnalysis(sessionId).then((result) => {
      if (!result.ok) {
        setError(result.error.message);
        return;
      }
      setProgress(100);
      saveClientSession(sessionId, {
        result: result.data,
        targetRole: result.targetRole ?? "Software Engineer",
      });
      router.replace(`/results/${sessionId}`);
    });
  }, [sessionId, router]);

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 rounded-full bg-red-950/50 p-4 ring-1 ring-red-500/20">
          <Loader2 className="h-8 w-8 text-red-400" />
        </div>
        <p className="text-red-300">{error}</p>
        <button
          type="button"
          onClick={() => router.push("/analyze")}
          className="mt-6 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition-all hover:from-indigo-500 hover:to-violet-500"
        >
          Try again
        </button>
      </div>
    );
  }

  const activeStageData = LOADING_STAGES[currentStage];

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/5 blur-[120px]" />
      </div>

      {/* Simple spinner */}
      <div className="relative h-16 w-16">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-zinc-800"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-t-2 border-indigo-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-2 flex items-center justify-center">
          <span className="text-xl">{activeStageData.emoji}</span>
        </div>
      </div>

      <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
        {activeStageData.label}
      </p>

      {/* Stage message */}
      <div className="mt-3 h-5 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-center text-sm text-zinc-500"
          >
            {activeStageData.message}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-full max-w-sm">
        <div className="h-1.5 overflow-hidden rounded-full bg-zinc-900">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "tween", ease: "linear", duration: 0.08 }}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-zinc-600">
          <span>Analyzing your resume</span>
          <span className="font-mono">{progress}%</span>
        </div>
      </div>

      {/* Compact stage list */}
      <div className="mt-8 flex items-center gap-2">
        {LOADING_STAGES.map((stage, i) => {
          const isActive = i === currentStage;
          const isDone = i < currentStage;
          return (
            <div key={stage.label} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs transition-all duration-300",
                  isDone
                    ? "bg-emerald-500/20 text-emerald-400"
                    : isActive
                    ? "bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-500/30"
                    : "bg-zinc-800/50 text-zinc-600"
                )}
              >
                {isDone ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <span>{stage.emoji}</span>
                )}
              </div>
              {i < stageCount - 1 && (
                <div
                  className={cn(
                    "h-px w-6 transition-colors duration-300",
                    i < currentStage ? "bg-emerald-500/40" : "bg-zinc-800"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}