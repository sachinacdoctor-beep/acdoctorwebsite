"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";

/* ── Figma assets (replace with /public paths before go-live) ── */
const IMG_BG =
  "https://www.figma.com/api/mcp/asset/46ebe8f4-5ece-4fff-aaa0-cb6bb324349f";
const IMG_AC_UNIT =
  "https://www.figma.com/api/mcp/asset/6f2fcfe7-202f-4902-aaff-f1c6c396381c";
const ICON_USER =
  "https://www.figma.com/api/mcp/asset/63c6e436-5fd4-4825-ad26-2cdbdb3bc7cc";
const ICON_PHONE =
  "https://www.figma.com/api/mcp/asset/8848dc26-5089-41fe-9f06-d85bb41055ae";
const ICON_MAIL =
  "https://www.figma.com/api/mcp/asset/87db6ebf-360f-4f8f-bc71-4a92b4af2e8e";

export function CTASection() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      aria-label="Contact Us"
      className="relative w-full overflow-hidden bg-[#0d0d0d]"
      // style={{ minHeight: "clamp(420px, 60vh, 820px)" }}
    >
      {/* ── Full-bleed background (dark room + red beam) ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={"./assets/images/contact_us_background.png"}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── AC Unit image — right-centre ── */}
      <div
        className="absolute pointer-events-none hidden md:flex inset-x-0 bottom-0 items-end justify-center md:inset-y-0 md:right-0 md:left-auto md:items-center md:pr-6 lg:pr-[110px]"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={"./assets/images/ac_outdoor.png"}
          alt=""
          className="h-[210px] md:h-[60%] w-auto object-contain opacity-80 md:opacity-100"
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto flex items-start md:items-center justify-center md:justify-start h-full px-4 sm:px-[70px] lg:px-[110px] py-6 md:py-12">
        {/* ── Contact Card ── */}
        <div
          className={[
            "bg-white rounded-[6px] md:rounded-[20px] border border-[#f5f5f5]",
            "px-[18px] sm:px-[40px] py-[18px] sm:py-[30px]",
            "flex flex-col gap-[16px] md:gap-[35px]",
            "w-full max-w-[340px] md:max-w-[470px]",
            "shadow-[0_8px_48px_rgba(0,0,0,0.40)]",
            "transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          {/* Heading — Figma: Montserrat SemiBold Italic 50px / lh 70px */}
          <h2 className="font-['Montserrat',sans-serif] font-semibold italic text-[26px] md:text-[clamp(32px,4vw,50px)] leading-[34px] md:leading-[1.4] text-black whitespace-nowrap">
            Contact us
          </h2>

          {/* Form + Submit */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[18px] md:gap-[45px] w-full"
            noValidate
          >
            {/* Input fields — gap-[14px] between each */}
            <div className="flex flex-col gap-[14px] w-full">
              {/* Name */}
              <label className="sr-only" htmlFor="c-name">
                Name
              </label>
              <div className="flex items-center gap-3 md:gap-5 border border-[rgba(90,94,104,0.4)] rounded-[3px] md:rounded-[10px] pl-3 md:pl-5 pr-3 md:pr-4 py-[4px] md:py-[10px] focus-within:border-[#e31e25] transition-colors duration-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ICON_USER}
                  alt=""
                  className="w-[14px] h-[14px] md:w-[22px] md:h-[22px] shrink-0 object-contain"
                  aria-hidden="true"
                />
                <input
                  id="c-name"
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="flex-1 bg-transparent font-['Montserrat',sans-serif] font-medium text-[12px] md:text-[clamp(16px,1.5vw,22px)] leading-[24px] md:leading-[40px] text-[#161616] placeholder:text-[#161616]/40 outline-none min-w-0"
                />
              </div>

              {/* Phone */}
              <label className="sr-only" htmlFor="c-phone">
                Phone Number
              </label>
              <div className="flex items-center gap-3 md:gap-5 border border-[rgba(90,94,104,0.4)] rounded-[3px] md:rounded-[10px] pl-3 md:pl-5 pr-3 md:pr-4 py-[4px] md:py-[10px] focus-within:border-[#e31e25] transition-colors duration-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ICON_PHONE}
                  alt=""
                  className="w-[14px] h-[14px] md:w-[22px] md:h-[22px] shrink-0 object-contain"
                  aria-hidden="true"
                />
                <input
                  id="c-phone"
                  type="tel"
                  placeholder="Phone No."
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="flex-1 bg-transparent font-['Montserrat',sans-serif] font-medium text-[12px] md:text-[clamp(16px,1.5vw,22px)] leading-[24px] md:leading-[40px] text-[#161616] placeholder:text-[#161616]/40 outline-none min-w-0"
                />
              </div>

              {/* Email */}
              <label className="sr-only" htmlFor="c-email">
                Email
              </label>
              <div className="flex items-center gap-3 md:gap-5 border border-[rgba(90,94,104,0.4)] rounded-[3px] md:rounded-[10px] pl-3 md:pl-5 pr-3 md:pr-4 py-[4px] md:py-[10px] focus-within:border-[#e31e25] transition-colors duration-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ICON_MAIL}
                  alt=""
                  className="w-[14px] h-[14px] md:w-[22px] md:h-[22px] shrink-0 object-contain"
                  aria-hidden="true"
                />
                <input
                  id="c-email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="flex-1 bg-transparent font-['Montserrat',sans-serif] font-medium text-[12px] md:text-[clamp(16px,1.5vw,22px)] leading-[24px] md:leading-[40px] text-[#161616] placeholder:text-[#161616]/40 outline-none min-w-0"
                />
              </div>
            </div>

            {/* Submit — Figma: border-[#e31e25] rounded-[50px] px-[78px] py-[19px] text-[#e31e25] SemiBold 20px */}
            <button
              type="submit"
              className="
                w-full
                border border-[#e31e25] rounded-[50px]
                px-[32px] md:px-[78px] py-[7px] md:py-[19px]
                font-['Montserrat',sans-serif] font-semibold text-[12px] md:text-[clamp(16px,1.4vw,20px)] text-[#e31e25]
                bg-transparent
                hover:bg-[#e31e25] hover:text-white
                active:bg-[#c8181e] active:border-[#c8181e]
                transition-all duration-200
              "
            >
              {submitted ? "Submitted ✓" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
