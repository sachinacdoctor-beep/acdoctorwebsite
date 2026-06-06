"use client";

import type { ServiceCard as ServiceCardType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ServiceCardProps {
  service: ServiceCardType;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const isExternalIcon = /^https?:\/\//.test(service.iconImage || "");

  const isLongDescription = service.description?.length > 90;

  return (
    <div
      className="
        relative flex flex-col items-center text-center gap-0
        bg-[#fdfdfd]
        rounded-[10px] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.15)]
        overflow-hidden
        px-[10px] pt-[7px] pb-[9px] md:px-8 md:pt-6 md:pb-7
        hover:shadow-[0px_0px_24px_0px_rgba(227,30,37,0.18)]
        min-h-[152px] md:min-h-0
      "
    >
      {/* Icon circle */}
      <div className="flex items-center justify-center w-[52px] h-[52px] md:w-[106px] md:h-[106px] rounded-full bg-[#e31e25]/10 mb-[9px] md:mb-[22px] shrink-0">
        {service.iconImage ? (
          isExternalIcon ? (
            <img
              src={service.iconImage}
              alt={service.title}
              className="h-[34px] w-[34px] object-contain md:h-[60px] md:w-[60px]"
            />
          ) : (
            <Image
              src={service.iconImage}
              alt={service.title}
              width={60}
              height={60}
              className="h-[34px] w-[34px] object-contain md:h-[60px] md:w-[60px]"
            />
          )
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
      <div className="flex flex-col items-center gap-[5px] md:gap-[10px] mb-[8px] md:mb-[22px] w-full max-w-[362px]">
        <h3
          className="
            font-['Montserrat',sans-serif] font-semibold
            text-[16px] md:text-[28px] leading-[18px] md:leading-[38px]
            text-[#222]
            w-full
          "
        >
          {service.title}
        </h3>

        <p
          className={`
            font-['Montserrat',sans-serif] font-normal
            text-[9px] md:text-[16px] leading-[13px] md:leading-[22px]
            text-[#222]/70
            transition-all duration-300
            ${showFullDescription ? "" : "line-clamp-2 md:line-clamp-3"}
          `}
        >
          {service.description}
        </p>

        {isLongDescription && (
          <button
            type="button"
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="
              font-['Montserrat',sans-serif] font-semibold
              text-[9px] md:text-[14px]
              text-[#e31e25]
              hover:underline
              mt-[2px]
            "
          >
            {showFullDescription ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      {/* Book Now button */}
      <Link
        href={`/book-service/${service.id}`}
        aria-label={`Book ${service.title}`}
        className="
          flex items-center justify-center gap-[6px]
          border border-[#e31e25] rounded-[20px]
          px-[12px] md:px-[48px] py-[5px] md:py-[12px]
          font-['Montserrat',sans-serif] font-semibold
          text-[9px] md:text-[16px] leading-[13px] md:leading-[22px] text-[#e31e25]
          bg-transparent
          hover:bg-[#e31e25] hover:text-white
          active:bg-[#c8181e]
          w-full
          group/btn
        "
      >
        Book Now
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
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
      </Link>
    </div>
  );
}
