"use client";

import type { ServiceCard as ServiceCardType } from "@/types";
import { Button } from "@/components/atoms/Button";

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
      className="flex flex-col items-center gap-4 text-center p-6 group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${animationDelay}ms, transform 0.55s ease ${animationDelay}ms`,
      }}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 text-4xl group-hover:scale-110 transition-transform duration-300">
        <span role="img" aria-hidden="true">
          {service.icon}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="font-montserrat font-semibold italic text-card-title text-text-primary dark:text-brand-white leading-tight">
          {service.title}
        </h3>
        <p className="font-montserrat font-extralight text-body-lg text-text-primary/70 dark:text-brand-white/60 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* CTA */}
      <Button
        variant="muted"
        size="sm"
        onClick={() => {
          const el = document.getElementById("book");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        className="mt-auto"
      >
        Book Now
      </Button>
    </div>
  );
}
