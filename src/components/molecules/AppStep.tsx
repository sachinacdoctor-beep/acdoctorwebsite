import type { AppStep as AppStepType } from "@/types";

interface AppStepProps {
 step: AppStepType;
 isLast?: boolean;
}

export function AppStep({ step, isLast = false }: AppStepProps) {
 return (
 <div
 className="flex gap-6 items-start"
 >
 {/* Step indicator column */}
 <div className="flex flex-col items-center shrink-0">
 <div className="flex items-center justify-center w-[60px] h-[60px] rounded-[60px] border-2 border-brand-primary bg-white shadow-sm">
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
 <h3 className="font-montserrat font-semibold italic text-card-title text-text-primary leading-snug">
 {step.title}
 </h3>
 <p className="font-montserrat font-extralight text-body-lg text-text-primary/70 leading-relaxed max-w-md">
 {step.description}
 </p>
 </div>
 </div>
 );
}
