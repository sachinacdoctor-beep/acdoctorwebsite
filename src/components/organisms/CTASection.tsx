"use client";

import { useState } from "react";

/* ── Figma assets (replace with /public paths before go-live) ── */
const IMG_BG =
 "./assets/images/contact_us_background.png";
const IMG_AC_UNIT =
 "./assets/images/ac_outdoor.png";
const ICON_USER =
 "./assets/icons/user.png";
const ICON_PHONE =
 "./assets/icons/phone.png";
const ICON_MAIL =
 "./assets/icons/mail.png";

export function CTASection() {
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
 aria-label="Contact Us"
 className="relative w-full overflow-hidden bg-[#f5f5f5]"
 // style={{ minHeight: "clamp(420px, 60vh, 820px)" }}
 >
 {/* ── Full-bleed background (dark room + red beam) ── */}
 <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
 src={"./assets/images/contact_us_background.png"}
 alt=""
 className="w-full h-full object-cover opacity-10"
 />
 </div>

 {/* ── AC Unit image — right-centre ── */}
 <div
 className="pointer-events-none absolute inset-x-0 bottom-0 hidden items-end justify-center lg:inset-y-0 lg:left-auto lg:right-0 lg:flex lg:items-center lg:pr-[110px]"
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
 <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] items-start justify-center px-4 py-8 sm:px-[70px] md:items-center md:py-14 lg:justify-start lg:px-[110px] lg:py-12">
 {/* ── Contact Card ── */}
 <div
 className={[
 "bg-white rounded-[6px] md:rounded-[20px] border border-[#f5f5f5]",
 "px-[18px] sm:px-[40px] py-[18px] sm:py-[30px]",
 "flex flex-col gap-[16px] md:gap-[35px]",
 "w-full max-w-[340px] md:max-w-[470px]",
 "shadow-[0_8px_48px_rgba(0,0,0,0.40)]",
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
 <div className="flex items-center gap-3 md:gap-5 border border-[rgba(90,94,104,0.4)] rounded-[3px] md:rounded-[10px] pl-3 md:pl-5 pr-3 md:pr-4 py-[4px] md:py-[10px] focus-within:border-[#e31e25] ">
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
 <div className="flex items-center gap-3 md:gap-5 border border-[rgba(90,94,104,0.4)] rounded-[3px] md:rounded-[10px] pl-3 md:pl-5 pr-3 md:pr-4 py-[4px] md:py-[10px] focus-within:border-[#e31e25] ">
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
 onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
 maxLength={10}
 className="flex-1 bg-transparent font-['Montserrat',sans-serif] font-medium text-[12px] md:text-[clamp(16px,1.5vw,22px)] leading-[24px] md:leading-[40px] text-[#161616] placeholder:text-[#161616]/40 outline-none min-w-0"
 />
 </div>

 {/* Email */}
 <label className="sr-only" htmlFor="c-email">
 Email
 </label>
 <div className="flex items-center gap-3 md:gap-5 border border-[rgba(90,94,104,0.4)] rounded-[3px] md:rounded-[10px] pl-3 md:pl-5 pr-3 md:pr-4 py-[4px] md:py-[10px] focus-within:border-[#e31e25] ">
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
