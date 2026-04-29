"use client";

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
      className="py-section-y bg-brand-white dark:bg-brand-black"
    >
      <div className="section-padding flex flex-col gap-14 max-w-[1680px] mx-auto">
        {/* Header */}
        <SectionHeader
          title="Book AC Service"
          subtitle="Professional AC services delivered to your home. Choose from our wide range of expert solutions."
          isVisible={isInView}
          className={`transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-black/5 dark:divide-white/5">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              animationDelay={i * 100}
              isVisible={isInView}
            />
          ))}
        </div>

        {/* Divider lines for desktop */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-0 -mt-10 px-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-px ${i < 2 ? "border-r border-black/5 dark:border-white/5" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
