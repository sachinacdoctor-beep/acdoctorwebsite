"use client";

import { SectionHeader } from "@/components/molecules/SectionHeader";
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
      className="py-section-y bg-brand-white dark:bg-brand-black"
    >
      <div className="section-padding max-w-[1680px] mx-auto flex flex-col gap-14">
        {/* Header */}
        <div
          className={`transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <SectionHeader
            title="Request Quote"
            subtitle="Beyond standard services — we offer comprehensive solutions for every AC-related need you have."
          />
        </div>

        {/* Grid: 1 → 2 → 4 columns */}
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
