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
      className="relative h-[728px] min-h-[728px] w-full overflow-hidden sm:h-[760px] sm:min-h-[760px] md:h-[840px] md:min-h-[760px] lg:h-screen lg:min-h-[600px] lg:max-h-[1106px]"
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
        className="absolute inset-0 bg-gradient-to-b from-[#e31e25]/30 via-black/10 to-black/75 lg:bg-gradient-to-r lg:from-black/60 lg:via-black/20 lg:to-transparent"
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
      <div className="relative z-10 flex h-full flex-col gap-0 px-4 pb-[31px] pt-[102px] sm:px-10 sm:pt-[112px] md:pt-[120px] lg:flex-row lg:items-center lg:px-16 lg:pb-16 lg:pt-24 xl:px-24">
        {/* ── 1. Text block (badge + headline + sub) ── */}
        <div className="flex w-full shrink-0 flex-col items-start gap-[13px] text-left md:gap-7 lg:w-1/2 xl:w-[52%]">
          {/* Badge */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            custom={0.15}
            className="hidden w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm md:inline-flex"
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
            className="font-['Montserrat',sans-serif] text-[42px] font-bold leading-[1.05] tracking-tight text-white sm:text-[56px] lg:text-[clamp(2.5rem,6vw,5rem)]"
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
            className="font-['Montserrat',sans-serif] max-w-[325px] text-[20px] font-medium leading-[29px] text-white/90 sm:max-w-[520px] lg:max-w-[420px] lg:text-[clamp(0.9rem,1.5vw,1.125rem)] lg:font-normal lg:leading-relaxed lg:text-white/80"
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
            className="hidden flex-row gap-4 lg:flex"
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
          className="pointer-events-none relative mt-auto h-[295px] w-full flex-shrink-0 sm:h-[330px] md:h-[330px] lg:absolute lg:bottom-0 lg:right-0 lg:top-0 lg:mt-0 lg:mr-4 lg:h-full lg:w-1/2"
          aria-hidden="true"
        >
          <Image
            src={"/assets/images/hero_image.png"}
            alt="Split AC unit"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain object-bottom lg:object-center"
            priority
          />
        </motion.div>

        {/* ── 3. CTA Buttons — mobile only, rendered AFTER the image ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.6}
          className="mt-[19px] flex w-full flex-row items-center justify-center gap-[14px] px-0 lg:hidden"
        >
          <button
            onClick={() => scrollTo("products")}
            aria-label="Shop AC products"
            className="font-['Montserrat',sans-serif] rounded-full bg-[#cf1e2a] px-[25px] py-[14px] text-[14px] font-semibold text-white shadow-[0_4px_20px_rgba(227,30,37,0.45)] transition-all duration-200 hover:bg-[#c8181e] active:bg-[#b5161c] sm:px-8 sm:text-[15px]"
          >
            Shop Now
          </button>
          <button
            onClick={() => scrollTo("services")}
            aria-label="Book an AC service"
            className="font-['Montserrat',sans-serif] rounded-full border border-white bg-white/10 px-[22px] py-[14px] text-[14px] font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/15 sm:px-8 sm:text-[15px]"
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
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
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
