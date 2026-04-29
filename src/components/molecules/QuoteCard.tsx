"use client";

import type { QuoteCard as QuoteCardType } from "@/types";

interface QuoteCardProps {
  card: QuoteCardType;
  animationDelay?: number;
  isVisible?: boolean;
}

export function QuoteCard({
  card,
  animationDelay = 0,
  isVisible = true,
}: QuoteCardProps) {
  return (
    <div
      className="card-base flex flex-col items-center gap-5 p-8 text-center overflow-hidden group cursor-pointer"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${animationDelay}ms, transform 0.55s ease ${animationDelay}ms`,
      }}
    >
      {/* Icon circle */}
      <div className="flex items-center justify-center w-28 h-28 rounded-full bg-brand-primary/8 dark:bg-brand-primary/15 text-5xl transition-transform duration-300 group-hover:scale-110">
        <span role="img" aria-label={card.title}>
          {card.icon}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="font-montserrat font-semibold italic text-card-title text-text-primary dark:text-brand-white leading-snug">
          {card.title}
        </h3>
        <p className="font-montserrat font-extralight text-body-lg text-text-primary/70 dark:text-brand-white/60 leading-relaxed">
          {card.description}
        </p>
      </div>
    </div>
  );
}
