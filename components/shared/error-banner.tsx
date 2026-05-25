"use client";

import { AlertCircle } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

type ErrorBannerProps = {
  message: string;
};

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <FadeIn>
      <div
        role="alert"
        className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-950/30 px-4 py-3 text-sm text-red-200"
      >
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
        <p>{message}</p>
      </div>
    </FadeIn>
  );
}
