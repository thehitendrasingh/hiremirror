import Link from "next/link";
import { ScanSearch } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800/80 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all hover:opacity-90"
        >
          {/* Logo mark */}
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/40">
            <ScanSearch className="h-5 w-5 text-white" strokeWidth={2.25} />
            <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-300" />
            </span>
          </span>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white leading-none">
              Hire<span className="text-indigo-400">Mirror</span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-600">
              Recruiter Intelligence
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/analyze"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition-all hover:from-indigo-500 hover:to-violet-500 hover:shadow-lg hover:shadow-indigo-500/40"
          >
            <span className="relative z-10">Analyze Resume</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-transform duration-300 group-hover:translate-x-0" />
          </Link>
        </nav>
      </div>
    </header>
  );
}