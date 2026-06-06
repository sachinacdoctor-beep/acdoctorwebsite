import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonVariant, ButtonSize } from "@/types";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
 variant?: ButtonVariant;
 size?: ButtonSize;
 children: ReactNode;
 fullWidth?: boolean;
 as?: "button" | "a";
 href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
 primary:
 "bg-brand-primary text-white hover:bg-brand-primary-dark border border-transparent",
 ghost:
 "bg-white/10 border border-white/60 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm",
 muted:
 "bg-black/10 border border-transparent text-brand-primary hover:bg-black/20",
 outline:
 "bg-transparent border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
 sm: "px-5 py-2.5 text-sm",
 md: "px-8 py-[18px] text-base",
 lg: "px-10 py-6 text-lg",
};

export function Button({
 variant = "primary",
 size = "md",
 children,
 fullWidth = false,
 className = "",
 ...props
}: ButtonProps) {
 const base =
 "inline-flex items-center justify-center rounded-pill font-montserrat font-semibold " +
 " active:translate-y-0 " +
 "focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 " +
 "disabled:opacity-50 disabled:cursor-not-allowed disabled: " +
 "select-none cursor-pointer";

 return (
 <button
 className={[
 base,
 variantClasses[variant],
 sizeClasses[size],
 fullWidth ? "w-full" : "",
 className,
 ]
 .filter(Boolean)
 .join(" ")}
 {...props}
 >
 {children}
 </button>
 );
}
