import { SiteHeader } from "@/components/layout/site-header";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="pointer-events-none fixed inset-0 bg-hero-glow" />
      <SiteHeader />
      <main className={`relative pt-[4.25rem] ${className}`}>{children}</main>
    </div>
  );
}
