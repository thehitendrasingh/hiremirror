"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { runAnalysis } from "@/features/analyze/actions";
import { LOADING_MESSAGES } from "@/utils/constants";
import { saveClientSession } from "@/utils/client-session";

export function AnalysisLoader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(12);
  const [error, setError] = useState<string | null>(null);
  const startedFor = useRef<string | null>(null);
  const mounted = useRef(false);
  const progressStart = useRef<number | null>(null);

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    setProgress(12);
    progressStart.current = Date.now();

    const rotate = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1800);

    const progressTimer = setInterval(() => {
      const start = progressStart.current;
      if (!start) return;
      const elapsed = Date.now() - start;
      const duration = 7000;
      const target = 92;
      const next = Math.min(target, 12 + Math.round((elapsed / duration) * (target - 12)));
      setProgress(next);
    }, 120);

    return () => {
      clearInterval(rotate);
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
        <p className="text-red-300">{error}</p>
        <button
          type="button"
          onClick={() => router.push("/analyze")}
          className="mt-6 text-sm text-indigo-400 hover:text-indigo-300"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6">
      <motion.div
        className="relative h-24 w-24"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border border-zinc-800" />
        <div className="absolute inset-2 rounded-full border border-indigo-500/30" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-indigo-600/20 to-violet-600/10" />
        <motion.div
          className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-indigo-400"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      <p className="mt-12 text-sm font-medium uppercase tracking-widest text-zinc-500">
        HireMirror Analysis
      </p>

      <div className="mt-6 h-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="text-center text-lg text-zinc-300"
          >
            {LOADING_MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-8 w-full max-w-2xl">
        <div className="h-2 overflow-hidden rounded-full bg-zinc-900">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "tween", ease: "linear", duration: 0.12 }}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
          <span>Analysis progress</span>
          <span>{progress}% complete</span>
        </div>
        <p className="mt-3 text-center text-sm text-zinc-400">
          Most analyses finish quickly. We are comparing your resume to the role and recruiter expectations.
        </p>
      </div>
    </div>
  );
}
