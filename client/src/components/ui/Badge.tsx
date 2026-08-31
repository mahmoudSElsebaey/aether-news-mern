import { cn } from "@/utils/cn";

type BadgeVariant = "default" | "accent" | "breaking" | "featured" | "trending" | "muted";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  breaking: "bg-accent text-white",
  featured: "bg-secondary text-white",
  trending: "bg-amber-500/15 text-amber-700",
  muted: "bg-slate-100 text-muted",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold tracking-wide uppercase",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
