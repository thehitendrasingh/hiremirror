export function ResultsSkeleton() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse px-6 pb-32 pt-12">
      <div className="h-4 w-40 rounded bg-zinc-800" />
      <div className="mt-4 h-10 w-3/4 rounded bg-zinc-800" />

      {/* Interview Probability skeleton */}
      <div className="mt-16">
        <div className="h-3 w-36 rounded bg-zinc-800" />
        <div className="mt-4 h-40 rounded-2xl bg-zinc-900" />
      </div>

      {/* Core Diagnosis skeleton */}
      <div className="mt-16">
        <div className="h-3 w-28 rounded bg-zinc-800" />
        <div className="mt-4 h-32 rounded-2xl bg-zinc-900" />
      </div>

      {/* Strengths skeleton */}
      <div className="mt-16">
        <div className="h-3 w-48 rounded bg-zinc-800" />
        <div className="mt-4 space-y-3">
          <div className="h-14 w-full rounded-xl bg-zinc-900" />
          <div className="h-14 w-5/6 rounded-xl bg-zinc-900" />
          <div className="h-14 w-4/6 rounded-xl bg-zinc-900" />
        </div>
      </div>

      {/* Recruiter scan skeleton */}
      <div className="mt-16 space-y-3">
        <div className="h-3 w-44 rounded bg-zinc-800" />
        <div className="mt-4 h-4 w-full rounded bg-zinc-900" />
        <div className="h-4 w-5/6 rounded bg-zinc-900" />
        <div className="h-4 w-4/6 rounded bg-zinc-900" />
      </div>
    </div>
  );
}
