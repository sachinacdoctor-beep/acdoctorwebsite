import type { AppStep as AppStepType } from "@/types";

interface AppStepProps {
  step: AppStepType;
  animationDelay?: number;
  isVisible?: boolean;
  isLast?: boolean;
}

export function AppStep({
  step,
  animationDelay = 0,
  isVisible = true,
  isLast = false,
}: AppStepProps) {
  return (
    <div
      className="flex gap-6 items-start"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(40px)",
        transition: `opacity 0.55s ease ${animationDelay}ms, transform 0.55s ease ${animationDelay}ms`,
      }}
    >
      {/* Step indicator column */}
      <div className="flex flex-col items-center shrink-0">
        <div className="flex items-center justify-center w-[60px] h-[60px] rounded-[60px] border-2 border-brand-primary bg-white dark:bg-brand-black shadow-sm">
          <span className="text-brand-primary text-xl">
            {/* Icon per step */}
            {step.id === "download" && "📱"}
            {step.id === "profile" && "👤"}
            {step.id === "book" && "📅"}
          </span>
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 min-h-[60px] bg-brand-primary/30 mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 pb-10">
        <p className="font-montserrat font-bold text-brand-primary text-sm tracking-widest">
          {step.number}
        </p>
        <h3 className="font-montserrat font-semibold italic text-card-title text-text-primary dark:text-brand-white leading-snug">
          {step.title}
        </h3>
        <p className="font-montserrat font-extralight text-body-lg text-text-primary/70 dark:text-brand-white/60 leading-relaxed max-w-md">
          {step.description}
        </p>
      </div>
    </div>
  );
}
