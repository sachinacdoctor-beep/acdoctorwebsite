"use client";

import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { ASSETS } from "@/lib/data";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] max-h-[1106px] overflow-hidden"
      aria-label="Hero — AC Doctor"
    >
      {/* Background image */}
      <Image
        src={ASSETS.heroBg}
        alt="AC unit hero background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 bg-hero-overlay"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 section-padding flex flex-col justify-center h-full max-w-[750px] gap-8 pt-24">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 w-fit"
          style={{
            animation: "fadeIn 0.6s ease 0.2s both",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
          <span className="font-montserrat text-white/90 text-sm font-medium tracking-wide">
            Certified AC Technicians — Indore
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-montserrat font-bold text-hero-xl text-brand-white leading-[1.05] tracking-tight"
          style={{ animation: "fadeUp 0.7s ease 0.35s both" }}
        >
          Experience
          <br />
          Cool Efficiency.
        </h1>

        {/* Sub */}
        <p
          className="font-montserrat font-normal text-hero-sub text-brand-white/80 leading-relaxed max-w-lg"
          style={{ animation: "fadeUp 0.7s ease 0.5s both" }}
        >
          Professional AC services — repair, installation & maintenance — at your doorstep.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4"
          style={{ animation: "fadeUp 0.7s ease 0.65s both" }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Shop AC products"
          >
            Shop Now
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => {
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Book an AC service"
          >
            Book Service
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
        style={{ animation: "fadeIn 1s ease 1.2s both" }}
      >
        <span className="font-montserrat text-white/50 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-0.5 h-10 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
