"use client";

import Image from "next/image";
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
    //   border border-dashed border-[#e31e25]/40 dark:border-[#e31e25]/30

      className="
        relative flex flex-col items-center text-center
        bg-white dark:bg-[#1a1a1a]
        rounded-[20px]
        px-7 pt-6 pb-8
        transition-all duration-500
        hover:border-[#e31e25]/70 hover:shadow-[0_4px_24px_rgba(227,30,37,0.10)]
        hover:-translate-y-1
        cursor-pointer
        group
      "
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${animationDelay}ms, transform 0.55s ease ${animationDelay}ms`,
      }}
    >
      {/* Icon — 148×148px, top-centred, matching Figma exactly */}
      <div className="relative w-[148px] h-[148px] mb-1 shrink-0 transition-transform duration-300 group-hover:scale-105">
        {card.iconImage ? (
          <Image
            src={card.iconImage}
            alt={card.title}
            fill
            className="object-contain"
            sizes="148px"
          />
        ) : (
          <span
            className="flex items-center justify-center w-full h-full text-[4rem]"
            role="img"
            aria-label={card.title}
          >
            {card.icon}
          </span>
        )}
      </div>

      {/* Text block */}
      <div className="flex flex-col items-center gap-[6px]">
        <h3 className="font-['Montserrat',sans-serif] font-semibold text-[28px] leading-[60px] text-[#222] dark:text-[#f5f5f5] whitespace-nowrap">
          {card.title}
        </h3>
        <p className="font-['Montserrat',sans-serif] font-normal text-[16px] leading-[22px] text-[#222]/70 dark:text-[#f5f5f5]/60">
          {card.description}
        </p>
      </div>
    </div>
  );
}
