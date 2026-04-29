import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  label?: string;
  error?: string;
}

export function Input({ icon, label, error, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-text-primary dark:text-brand-white/80">
          {label}
        </label>
      )}
      <div className="relative flex items-center bg-white rounded-[10px] px-5 py-3 gap-4 w-full shadow-sm">
        {icon && (
          <span className="text-text-muted shrink-0 text-xl">{icon}</span>
        )}
        <input
          className={[
            "flex-1 font-montserrat font-medium text-brand-black text-lg",
            "bg-transparent outline-none placeholder:text-gray-400",
            "min-w-0",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
      </div>
      {error && (
        <p className="text-brand-primary text-xs font-medium">{error}</p>
      )}
    </div>
  );
}
