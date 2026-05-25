import Link from "next/link";
import { ScanEye } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800/80 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/25">
            <ScanEye className="h-5 w-5 text-white" strokeWidth={2.25} />
          </span>
          <span className="text-xl font-bold tracking-tight text-white">
            Hire<span className="text-indigo-400">Mirror</span>
          </span>
        </Link>
        <Link
          href="/analyze"
          className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition-all hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40"
        >
          Analyze Resume
        </Link>
      </div>
    </header>
  );
}
