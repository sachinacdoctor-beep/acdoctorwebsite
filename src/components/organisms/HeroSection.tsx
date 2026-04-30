"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* ─── animation variants ──────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: 60, scale: 0.96 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

/* ─── component ───────────────────────────────────────────────── */
export function HeroSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      aria-label="Hero — AC Doctor"
      className="relative w-full min-h-[600px] h-screen max-h-[1106px] overflow-hidden"
    >
      {/* ── Background image ── */}
      <Image
        src={"/assets/images/background.png"}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />

      {/* ── Gradient overlays ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
      />

      {/* ── Main content grid ── */}
      {/*
        Mobile:  single column — badge → headline → sub → [image] → [buttons]
        Desktop: two-column row — left text+buttons | right image (absolute)
        We achieve the mobile reorder with `order-*` utilities:
          badge/headline/sub  → order-1
          image               → order-2   (shows between text and buttons on mobile)
          buttons             → order-3
        On md+ the absolute-positioned image exits normal flow entirely.
      */}
      {/* ── Main content grid ── */}
      <div className="relative z-10 h-full flex flex-col md:flex-row md:items-center px-6 sm:px-10 lg:px-16 xl:px-24 pt-24 pb-16 gap-0">
        {/* ── 1. Text block (badge + headline + sub) ── */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left gap-6 md:gap-7 w-full md:w-1/2 xl:w-[52%] shrink-0">
          {/* Badge */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            custom={0.15}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-[#e31e25] animate-pulse shrink-0" />
            <span className="font-['Montserrat',sans-serif] text-white/90 text-xs sm:text-sm font-medium tracking-wide">
              Certified AC Technicians — Indore
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="font-['Montserrat',sans-serif] font-bold text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight text-white"
          >
            Experience
            <br />
            Cool Efficiency.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.45}
            className="font-['Montserrat',sans-serif] font-normal text-[clamp(0.9rem,1.5vw,1.125rem)] text-white/80 leading-relaxed max-w-[420px]"
          >
            Fast, reliable, and affordable AC services for homes and offices
            with Expert &amp; Certified technicians.
          </motion.p>

          {/* CTA Buttons — hidden on mobile here, shown below image via the duplicate below */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.6}
            className="hidden md:flex flex-row gap-4"
          >
            <button
              onClick={() => scrollTo("products")}
              aria-label="Shop AC products"
              className="font-['Montserrat',sans-serif] font-semibold text-[15px] text-white bg-[#e31e25] hover:bg-[#c8181e] active:bg-[#b5161c] px-8 py-[14px] rounded-full transition-all duration-200 shadow-[0_4px_20px_rgba(227,30,37,0.45)] hover:shadow-[0_6px_28px_rgba(227,30,37,0.6)]"
            >
              Shop Now
            </button>
            <button
              onClick={() => scrollTo("services")}
              aria-label="Book an AC service"
              className="font-['Montserrat',sans-serif] font-semibold text-[15px] text-white bg-transparent hover:bg-white/10 border-2 border-white/70 hover:border-white px-8 py-[14px] rounded-full transition-all duration-200"
            >
              Book Service
            </button>
          </motion.div>
        </div>

        {/* ── 2. Hero image — mobile: between text and buttons, desktop: absolute right ── */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          animate="show"
          className="relative w-full mr-4 md:w-1/2 h-[240px] sm:h-[300px] md:h-full md:absolute md:right-0 md:top-0 md:bottom-0 pointer-events-none flex-shrink-0 mt-4 md:mt-0"
          aria-hidden="true"
        >
          <Image
            src={"/assets/images/hero_image.png"}
            alt="Split AC unit"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain object-center"
            priority
          />
        </motion.div>

        {/* ── 3. CTA Buttons — mobile only, rendered AFTER the image ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.6}
          className="flex md:hidden flex-col gap-3 w-full mt-4 px-0"
        >
          <button
            onClick={() => scrollTo("products")}
            aria-label="Shop AC products"
            className="font-['Montserrat',sans-serif] font-semibold text-[15px] text-white bg-[#e31e25] hover:bg-[#c8181e] active:bg-[#b5161c] px-8 py-[14px] rounded-full transition-all duration-200 shadow-[0_4px_20px_rgba(227,30,37,0.45)] w-full"
          >
            Shop Now
          </button>
          <button
            onClick={() => scrollTo("services")}
            aria-label="Book an AC service"
            className="font-['Montserrat',sans-serif] font-semibold text-[15px] text-white bg-transparent hover:bg-white/10 border-2 border-white/70 hover:border-white px-8 py-[14px] rounded-full transition-all duration-200 w-full"
          >
            Book Service
          </button>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        custom={1.1}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
        <span className="font-['Montserrat',sans-serif] text-white/40 text-[10px] tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="w-px h-9 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
