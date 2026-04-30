"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ServiceCard } from "@/components/molecules/ServiceCard";
import { SERVICES } from "@/lib/data";
import { useInView } from "@/hooks/useInView";

export function ServicesSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section
      id="services"
      ref={ref}
      aria-label="Book AC Service"
      className="py-16 md:py-20 bg-[#f5f5f5] dark:bg-[#111]"
    >
      <div className="max-w-[1362px] mx-auto px-6 sm:px-8 lg:px-10 flex flex-col gap-12">
        {/* ── Section Header ── */}
        <div
          className={[
            "flex flex-col items-center text-center gap-[10px] transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <h2 className="font-['Montserrat',sans-serif] font-semibold text-[clamp(28px,3vw,44px)] leading-[1.5] text-[#222] dark:text-[#f5f5f5] whitespace-nowrap">
            Book AC Service
          </h2>
          <p className="font-['Montserrat',sans-serif] font-normal text-[clamp(15px,1.4vw,20px)] leading-[32px] text-[#222]/70 dark:text-[#f5f5f5]/60 max-w-[682px]">
            Get professional AC solutions at your doorstep. Trusted experts for
            all major AC brands with quick support and quality service.
          </p>
        </div>

        {/* ── 2×3 Card Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              animationDelay={i * 80}
              isVisible={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
