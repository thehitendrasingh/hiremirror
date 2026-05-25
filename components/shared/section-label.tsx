import { cn } from "@/utils/cn";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-widest text-indigo-400/90",
        className
      )}
    >
      {children}
    </p>
  );
}
