import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";

type InsightCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "highlight";
};

export function InsightCard({
  children,
  className,
  variant = "default",
}: InsightCardProps) {
  return (
    <Card
      className={cn(
        variant === "highlight" &&
          "border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 to-zinc-950/80",
        className
      )}
    >
      <CardContent className="p-5 text-sm leading-relaxed text-zinc-300">
        {children}
      </CardContent>
    </Card>
  );
}
