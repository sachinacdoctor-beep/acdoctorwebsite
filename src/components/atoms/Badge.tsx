import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "muted" | "success";
  className?: string;
}

const variants = {
  primary: "bg-brand-primary text-white",
  muted: "bg-black/10 text-text-primary",
  success: "bg-green-100 text-green-800",
};

export function Badge({ children, variant = "primary", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-montserrat tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
