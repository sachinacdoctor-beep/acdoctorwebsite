"use client";

import Image from "next/image";
import type { QuoteCard as QuoteCardType } from "@/types";

interface QuoteCardProps {
 card: QuoteCardType;
}

export function QuoteCard({ card }: QuoteCardProps) {
 return (
 <div
 // border border-dashed border-[#e31e25]/40

 className="
 relative flex flex-col items-center text-center
 bg-white
 rounded-[6px] md:rounded-[20px]
 px-[8px] pt-[9px] pb-[13px] md:px-7 md:pt-6 md:pb-8
 hover:border-[#e31e25]/70 hover:shadow-[0_4px_24px_rgba(227,30,37,0.10)]
 cursor-pointer
 group
 "
 >
 {/* Icon — 148×148px, top-centred, matching Figma exactly */}
 <div className="relative w-[72px] h-[72px] md:w-[148px] md:h-[148px] mb-1 shrink-0">
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
 <h3 className="font-['Montserrat',sans-serif] font-semibold text-[16px] md:text-[28px] leading-[22px] md:leading-[60px] text-[#222] whitespace-nowrap">
 {card.title}
 </h3>
 <p className="font-['Montserrat',sans-serif] font-normal text-[9px] md:text-[16px] leading-[13px] md:leading-[22px] text-[#222]/70">
 {card.description}
 </p>
 </div>
 </div>
 );
}
