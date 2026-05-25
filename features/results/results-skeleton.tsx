export function ResultsSkeleton() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse px-6 pb-32 pt-12">
      <div className="h-4 w-40 rounded bg-zinc-800" />
      <div className="mt-4 h-10 w-3/4 rounded bg-zinc-800" />
      <div className="mt-16 h-32 rounded-2xl bg-zinc-900" />
      <div className="mt-16 space-y-3">
        <div className="h-4 w-full rounded bg-zinc-900" />
        <div className="h-4 w-5/6 rounded bg-zinc-900" />
        <div className="h-4 w-4/6 rounded bg-zinc-900" />
      </div>
    </div>
  );
}
