"use client";

import type { ServiceCard as ServiceCardType } from "@/types";
import Image from "next/image";

interface ServiceCardProps {
  service: ServiceCardType;
  animationDelay?: number;
  isVisible?: boolean;
}

export function ServiceCard({
  service,
  animationDelay = 0,
  isVisible = true,
}: ServiceCardProps) {
  return (
    <div
      className="
        relative flex flex-col items-center text-center gap-0
        bg-[#fdfdfd] dark:bg-[#1a1a1a]
        rounded-[10px] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.15)]
        overflow-hidden
        px-8 pt-6 pb-7
        transition-all duration-500
        hover:shadow-[0px_0px_24px_0px_rgba(227,30,37,0.18)]
        hover:-translate-y-1
      "
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${animationDelay}ms, transform 0.55s ease ${animationDelay}ms`,
      }}
    >
      {/* Icon circle */}
      <div className="flex items-center justify-center w-[106px] h-[106px] rounded-full bg-[#e31e25]/10 dark:bg-[#e31e25]/15 mb-[22px] shrink-0">
        {service.iconImage ? (
          <Image
            src={service.iconImage}
            alt={service.title}
            width={60}
            height={60}
            className="object-contain"
          />
        ) : (
          <span
            role="img"
            aria-hidden="true"
            className="text-[2.6rem] leading-none"
          >
            {service.icon}
          </span>
        )}
      </div>

      {/* Text block */}
      <div className="flex flex-col items-center gap-[10px] mb-[22px] w-full max-w-[362px]">
        <h3
          className="
            font-['Montserrat',sans-serif] font-semibold
            text-[28px] leading-[38px]
            text-[#222] dark:text-[#f5f5f5]
            w-full
          "
        >
          {service.title}
        </h3>
        <p
          className="
            font-['Montserrat',sans-serif] font-normal
            text-[16px] leading-[22px]
            text-[#222]/70 dark:text-[#f5f5f5]/60
          "
        >
          {service.description}
        </p>
      </div>

      {/* Book Now button */}
      <button
        onClick={() =>
          document
            .getElementById("book")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label={`Book ${service.title}`}
        className="
          flex items-center justify-center gap-[6px]
          border border-[#e31e25] rounded-[20px]
          px-[48px] py-[12px]
          font-['Montserrat',sans-serif] font-semibold
          text-[16px] leading-[22px] text-[#e31e25]
          bg-transparent
          hover:bg-[#e31e25] hover:text-white
          active:bg-[#c8181e]
          transition-all duration-200
          w-full
          group/btn
        "
      >
        Book Now
        {/* Arrow right icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1"
          aria-hidden="true"
        >
          <path
            d="M4.167 10h11.666M10.833 5l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
