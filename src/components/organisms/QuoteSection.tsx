"use client";

import { QuoteCard } from "@/components/molecules/QuoteCard";
import { QUOTE_CARDS } from "@/lib/data";

export function QuoteSection() {
 return (
 <section
 id="quote"
 aria-label="Request Quote"
 className="py-[28px] md:py-20 bg-[#f5f5f5]"
 >
 <div className="max-w-[1362px] mx-auto px-4 sm:px-8 lg:px-10 flex flex-col gap-[22px] md:gap-10">

 {/* ── Section header — dashed border box matching screenshot ── */}
 <div
 className={[
 "mx-auto w-full max-w-[755px] flex flex-col items-center text-center gap-[10px]",
 // "border border-dashed border-[#e31e25]/40 rounded-[20px]",
 "px-0 py-0 md:px-10 md:py-8",
 ].join(" ")}
 >
 <h2 className="font-['Montserrat',sans-serif] font-semibold md:font-bold text-[26px] md:text-[clamp(26px,3vw,44px)] leading-[34px] md:leading-[1.4] text-[#222]">
 Request Quote
 </h2>
 <p className="font-['Montserrat',sans-serif] font-normal text-[14px] md:text-[clamp(14px,1.4vw,18px)] leading-[22px] md:leading-[28px] text-[#222]/70 max-w-[367px] md:max-w-[560px]">
 Need AC service for home, office, shop, or bulk projects? Get a quick custom quote from our team.
 </p>
 </div>

 {/* ── 4-column card grid ── */}
 <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-[14px] gap-y-[14px] md:gap-6">
 {QUOTE_CARDS.map((card) => (
 <QuoteCard
 key={card.id}
 card={card}
 />
 ))}
 </div>

 </div>
 </section>
 );
}
