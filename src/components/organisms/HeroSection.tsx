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
      className="relative w-full h-[728px] min-h-[728px] md:min-h-[600px] md:h-screen md:max-h-[1106px] overflow-hidden"
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
        className="absolute inset-0 bg-gradient-to-b from-[#e31e25]/30 via-black/10 to-black/75 md:bg-gradient-to-r md:from-black/60 md:via-black/20 md:to-transparent"
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
      <div className="relative z-10 h-full flex flex-col md:flex-row md:items-center px-4 sm:px-10 lg:px-16 xl:px-24 pt-[102px] md:pt-24 pb-[31px] md:pb-16 gap-0">
        {/* ── 1. Text block (badge + headline + sub) ── */}
        <div className="flex flex-col items-start text-left gap-[13px] md:gap-7 w-full md:w-1/2 xl:w-[52%] shrink-0">
          {/* Badge */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            custom={0.15}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 w-fit"
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
            className="font-['Montserrat',sans-serif] font-bold text-[42px] md:text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight text-white"
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
            className="font-['Montserrat',sans-serif] font-medium md:font-normal text-[20px] md:text-[clamp(0.9rem,1.5vw,1.125rem)] text-white/90 md:text-white/80 leading-[29px] md:leading-relaxed max-w-[325px] md:max-w-[420px]"
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
          className="relative w-full mr-0 md:mr-4 md:w-1/2 h-[295px] sm:h-[300px] md:h-full md:absolute md:right-0 md:top-0 md:bottom-0 pointer-events-none flex-shrink-0 mt-auto md:mt-0"
          aria-hidden="true"
        >
          <Image
            src={"/assets/images/hero_image.png"}
            alt="Split AC unit"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain object-bottom md:object-center"
            priority
          />
        </motion.div>

        {/* ── 3. CTA Buttons — mobile only, rendered AFTER the image ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.6}
          className="mt-[19px] flex md:hidden flex-row items-center justify-center gap-[14px] w-full px-0"
        >
          <button
            onClick={() => scrollTo("products")}
            aria-label="Shop AC products"
            className="font-['Montserrat',sans-serif] font-semibold text-[14px] text-white bg-[#cf1e2a] hover:bg-[#c8181e] active:bg-[#b5161c] px-[25px] py-[14px] rounded-full transition-all duration-200 shadow-[0_4px_20px_rgba(227,30,37,0.45)]"
          >
            Shop Now
          </button>
          <button
            onClick={() => scrollTo("services")}
            aria-label="Book an AC service"
            className="font-['Montserrat',sans-serif] font-semibold text-[14px] text-white bg-white/10 hover:bg-white/15 border border-white hover:border-white px-[22px] py-[14px] rounded-full transition-all duration-200"
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
        className="hidden md:flex absolute bottom-7 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10"
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
