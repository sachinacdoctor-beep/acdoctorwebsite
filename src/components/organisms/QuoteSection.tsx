"use client";

import { QuoteCard } from "@/components/molecules/QuoteCard";
import { QUOTE_CARDS } from "@/lib/data";
import { useInView } from "@/hooks/useInView";

export function QuoteSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section
      id="quote"
      ref={ref}
      aria-label="Request Quote"
      className="py-16 md:py-20 bg-[#f5f5f5] dark:bg-[#111]"
    >
      <div className="max-w-[1362px] mx-auto px-6 sm:px-8 lg:px-10 flex flex-col gap-10">

        {/* ── Section header — dashed border box matching screenshot ── */}
        <div
          className={[
            "mx-auto w-full max-w-[755px] flex flex-col items-center text-center gap-[10px]",
            // "border border-dashed border-[#e31e25]/40 dark:border-[#e31e25]/30 rounded-[20px]",
            "px-10 py-8",
            "transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <h2 className="font-['Montserrat',sans-serif] font-bold text-[clamp(26px,3vw,44px)] leading-[1.4] text-[#222] dark:text-[#f5f5f5]">
            Request Quote
          </h2>
          <p className="font-['Montserrat',sans-serif] font-normal text-[clamp(14px,1.4vw,18px)] leading-[28px] text-[#222]/70 dark:text-[#f5f5f5]/60 max-w-[560px]">
            Need AC service for home, office, shop, or bulk projects? Get a quick custom quote from our team.
          </p>
        </div>

        {/* ── 4-column card grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {QUOTE_CARDS.map((card, i) => (
            <QuoteCard
              key={card.id}
              card={card}
              animationDelay={i * 120}
              isVisible={isInView}
            />
          ))}
        </div>

      </div>
    </section>
  );
}