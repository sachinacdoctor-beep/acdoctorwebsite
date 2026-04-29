"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { AppStep } from "@/components/molecules/AppStep";
import { Button } from "@/components/atoms/Button";
import { APP_STEPS, ASSETS } from "@/lib/data";
import { useInView } from "@/hooks/useInView";

export function AppSection() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="app"
      ref={ref}
      aria-label="How the AC Doctor App Works"
      className="py-section-y bg-brand-white dark:bg-brand-black overflow-hidden"
    >
      <div className="section-padding max-w-[1680px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: phone mockup */}
          <div
            className={`relative h-[500px] sm:h-[600px] lg:h-[700px] transition-all duration-700 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            {/* Decorative background blob */}
            <div
              className="absolute inset-8 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-brand-primary/5 dark:bg-brand-primary/10"
              aria-hidden="true"
            />
            <Image
              src={ASSETS.appMockup}
              alt="AC Doctor app mockup"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </div>

          {/* Right: steps */}
          <div className="flex flex-col gap-8">
            {/* Section title */}
            <div
              className={`transition-all duration-700 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
            >
              <SectionHeader
                title="How Does the AC Doctor App Work?"
                align="left"
              />
            </div>

            {/* Steps */}
            <div className="flex flex-col">
              {APP_STEPS.map((step, i) => (
                <AppStep
                  key={step.id}
                  step={step}
                  animationDelay={i * 150 + 200}
                  isVisible={isInView}
                  isLast={i === APP_STEPS.length - 1}
                />
              ))}
            </div>

            {/* Store buttons */}
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <Button
                variant="muted"
                size="lg"
                className="flex items-center gap-3 !text-brand-primary"
                aria-label="Download on App Store"
              >
                <span className="text-2xl">🍎</span>
                <span>App Store</span>
              </Button>
              <Button
                variant="muted"
                size="lg"
                className="flex items-center gap-3 !text-brand-primary"
                aria-label="Get it on Play Store"
              >
                <span className="text-2xl">▶️</span>
                <span>Play Store</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
