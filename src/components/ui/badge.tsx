import { cn } from "@/lib/utils";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline" | "glass";
};

export const Badge = ({ className, variant = "default", ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        variant === "default" && "border-transparent bg-white/90 text-slate-900",
        variant === "outline" && "border-white/50 bg-transparent text-white/80",
        variant === "glass" && "border-white/10 bg-white/5 text-white backdrop-blur",
        className,
      )}
      {...props}
    />
  );
};
