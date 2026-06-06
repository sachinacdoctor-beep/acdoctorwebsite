// import Image from "next/image";

// export function AboutPageScreen() {
// return (
// <div className="overflow-hidden bg-white pt-[86px] text-[#222] md:pt-[118px]">
// {/* Hero Section */}
// <section className="py-8 md:py-12">
// <div className="mx-auto max-w-[1230px] px-4 sm:px-8 lg:px-10">
// <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
// {/* Image (mobile first) */}
// <div className="order-1 lg:order-2 relative rounded-[20px] overflow-hidden min-h-[280px] sm:min-h-[360px] lg:min-h-[480px]">
// <Image
// src="/assets/images/about-hero-bg.png"
// alt="AC Doctor about hero"
// fill
// priority
// sizes="100vw"
// className="object-cover"
// />

// {/* Mobile overlay title centered on image */}
// <div className="absolute inset-0 z-10 flex items-start justify-center pt-8 lg:hidden">
// <div className="rounded-full bg-white/95 px-4 py-2 text-center shadow-lg">
// <h2 className="text-[28px] font-bold uppercase text-[#e31e25] sm:text-[30px]">
// About Us
// </h2>
// </div>
// </div>
// </div>

// {/* Text column */}
// <div className="order-2 lg:order-1 lg:pr-12">
// <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#e31e25]
// hidden sm:inline-block">
// Service
// </p>
// <h1 className="text-[#e31e25] font-['Montserrat',sans-serif] text-[36px] font-extrabold leading-[1.02] sm:text-[48px] lg:text-[64px]">
// About Us
// </h1>
// <p className="mt-6 max-w-[640px] text-[16px] leading-[28px] text-[#222]/80 sm:text-[18px] sm:leading-[30px]">
// Lorem Ipsum is simply dummy text of the printing and typesetting industry.
// </p>
// </div>
// </div>
// </div>
// </section>

// {/* Stats Section */}
// <section className="bg-white py-12 md:py-16">
// <div className="mx-auto max-w-[1230px] px-4 sm:px-8 lg:px-10">
// <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
// <div>
// <p className="text-[18px] font-semibold leading-[28px] text-[#222] sm:text-[20px]">
// Lorem Ipsum is simply dummy text of the printing and typesetting industry.
// </p>
// </div>

// <div className="grid gap-6 sm:grid-cols-2">
// <div className="rounded-[20px] border border-[#e31e25]/18 bg-white px-6 py-7 shadow-[0_10px_36px_rgba(0,0,0,0.06)]">
// <p className="text-[34px] font-bold text-[#222]">6M+</p>
// <div className="mt-3 flex items-center gap-2 text-[#ffc107]">
// <span>★★★★★</span>
// </div>
// <p className="mt-4 text-[13px] font-medium uppercase tracking-[0.12em] text-[#222]/65">
// Lorem ipsum is simply
// </p>
// </div>

// <div className="rounded-[20px] border border-[#e31e25]/18 bg-white px-6 py-7 shadow-[0_10px_36px_rgba(0,0,0,0.06)]">
// <p className="text-[34px] font-bold text-[#222]">4.0</p>
// <div className="mt-3 flex items-center gap-2 text-[#ffc107]">
// <span>★★★★★</span>
// </div>
// <p className="mt-4 text-[13px] font-medium uppercase tracking-[0.12em] text-[#222]/65">
// Lorem ipsum is simply
// </p>
// </div>
// </div>
// </div>
// </div>
// </section>

// {/* Heading Section */}
// <section className="bg-white py-12 md:py-16">
// <div className="mx-auto max-w-[1230px] px-4 sm:px-8 lg:px-10">
// <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
// <div className="relative min-h-[340px] overflow-hidden rounded-[24px] bg-[#f5f5f5] shadow-[0_16px_48px_rgba(0,0,0,0.08)] sm:min-h-[420px]">
// <Image
// src="/assets/images/heading-img.png"
// alt="AC units"
// fill
// sizes="(max-width: 1024px) 100vw, 560px"
// className="object-contain p-8 sm:p-10"
// />
// </div>

// <div>
// <h2 className="font-['Montserrat',sans-serif] text-[32px] font-semibold leading-[40px] text-[#222] sm:text-[42px] sm:leading-[50px]">
// Heading
// </h2>
// <p className="mt-5 max-w-[620px] text-[16px] leading-[28px] text-[#222]/72 sm:text-[18px] sm:leading-[30px]">
// For a top-quality inverter ACs with energy-saving performance and
// powerful cooling for every season.
// </p>
// </div>
// </div>
// </div>
// </section>

// {/* Our Team Section */}
// <section className="bg-[#f8f8f8] py-12 md:py-16">
// <div className="mx-auto max-w-[1230px] px-4 sm:px-8 lg:px-10">
// <div className="mb-12 text-center">
// <h2 className="font-['Montserrat',sans-serif] text-[32px] font-semibold leading-[40px] text-[#222] sm:text-[42px] sm:leading-[50px]">
// Our Team
// </h2>
// </div>

// <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-6">
// {[
// { name: "Irshad Mubeen", role: "Co-Founder & CEO", image: "/assets/images/irshaad-sir.png" },
// { name: "Yajuvendra Singh Sisodiya", role: "Co-Founder & COO", image: "/assets/images/yajuvendra-sir.png" },
// { name: "Suraj Malviya", role: "CTO", image: "/assets/images/suraj-sir.png" },
// { name: "Shantanu Deshpande", role: "Product Manager", image: "/assets/images/shantanu-sir.png" },
// ].map((member, index) => (
// <div key={index} className="flex flex-col items-center text-center">
// <div className="mx-auto flex h-[120px] w-[120px] items-center justify-center rounded-full border-4 border-white bg-[#e8e8e8] shadow-[0_12px_32px_rgba(0,0,0,0.08)] sm:h-[140px] sm:w-[140px] overflow-hidden">
// <Image
// src={member.image}
// alt={member.name}
// width={140}
// height={140}
// className="object-cover"
// />
// </div>
// <div className="mt-4">
// <p className="text-[18px] font-semibold text-[#222]">
// {member.name}
// </p>
// <p className="mt-1 text-[14px] text-[#222]/60">
// {member.role}
// </p>
// </div>
// </div>
// ))}
// </div>
// </div>
// </section>

// {/* Why Choose Us Section */}
// <section className="bg-white py-12 md:py-16">
// <div className="mx-auto max-w-[1230px] px-4 sm:px-8 lg:px-10">
// <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
// <div className="relative min-h-[360px] overflow-hidden rounded-[24px] bg-[#f5f5f5] shadow-[0_16px_48px_rgba(0,0,0,0.08)] sm:min-h-[420px]">
// <Image
// src="/assets/images/why-choose-us-img.png"
// alt="Why choose us AC unit"
// fill
// sizes="(max-width: 1024px) 100vw, 560px"
// className="object-contain p-8 sm:p-10"
// />
// </div>

// <div>
// <h2 className="font-['Montserrat',sans-serif] text-[32px] font-semibold leading-[40px] text-[#222] sm:text-[42px] sm:leading-[50px]">
// Why Choose Us
// </h2>
// <p className="mt-5 max-w-[620px] text-[16px] leading-[28px] text-[#222]/72 sm:text-[18px] sm:leading-[30px]">
// Lorem Ipsum is simply dummy text of the printing and typesetting industry.
// </p>

// <div className="mt-8 grid gap-4">
// {[
// {
// title: "Expert & Verified Technicians",
// description: "Highly skilled & certified technicians.",
// icon: "/assets/icons/tool-kit.png",
// },
// {
// title: "Fast & Same-Day Service",
// description: "Lorem Ipsum is simply dummy text.",
// icon: "/assets/icons/clock-fast.png",
// },
// {
// title: "Affordable Pricing",
// description: "Lorem Ipsum is simply dummy text.",
// icon: "/assets/icons/money-bag.png",
// },
// ].map((item) => (
// <div
// key={item.title}
// className="flex gap-4 rounded-[16px] border border-[#e31e25]/10 bg-[#fef8f8] p-4"
// >
// <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ffe5e5]">
// <Image
// src={item.icon}
// alt=""
// width={24}
// height={24}
// className="object-contain"
// aria-hidden="true"
// />
// </span>
// <div>
// <h3 className="text-[15px] font-semibold leading-[22px] text-[#222]">
// {item.title}
// </h3>
// <p className="mt-1 text-[13px] leading-[20px] text-[#222]/65">
// {item.description}
// </p>
// </div>
// </div>
// ))}
// </div>
// </div>
// </div>
// </div>
// </section>

// {/* FAQ Section */}
// <section className="bg-[#f8f8f8] py-12 md:py-16">
// <div className="mx-auto max-w-[920px] px-4 sm:px-8 lg:px-10">
// <div className="mb-10 text-center">
// <h2 className="font-['Montserrat',sans-serif] text-[32px] font-semibold leading-[40px] text-[#222] sm:text-[42px] sm:leading-[50px]">
// Frequently Ask Questions
// </h2>
// <p className="mx-auto mt-4 max-w-[700px] text-[15px] leading-[26px] text-[#222]/65 sm:text-[16px]">
// Lorem Ipsum is simply dummy text of the printing and typesetting industry.
// </p>
// </div>

// <div className="grid gap-3">
// {[
// "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
// "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
// "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
// "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
// "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
// ].map((question, index) => (
// <details
// key={index}
// className="group rounded-[12px] bg-white px-5 py-4 shadow-[0_6px_20px_rgba(0,0,0,0.04)] sm:px-6"
// >
// <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold leading-[23px] text-[#222] sm:text-[16px]">
// {question}
// <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e31e25]/10 text-[#e31e25] text-[20px]">
// +
// </span>
// </summary>
// <p className="mt-4 text-[14px] leading-[24px] text-[#222]/65 sm:text-[15px]">
// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
// eiusmod tempor incididunt ut labore et dolore magna aliqua.
// </p>
// </details>
// ))}
// </div>
// </div>
// </section>
// </div>
// );
// }
"use client";

import Image from "next/image";
import { useState } from "react";

const faqItems = [
 {
 question: "What types of AC services do you offer?",
 answer:
 "We offer a comprehensive range of services including AC installation, repair, regular maintenance, gas refilling, and deep cleaning for all types of air conditioners.",
 },
 {
 question: "Do you provide services for all AC brands?",
 answer:
 "Yes, our certified technicians are experienced in servicing and repairing all major AC brands and models, including split, window, and central air conditioning systems.",
 },
 {
 question: "How can I book a service with AC Doctor?",
 answer:
 "You can easily book a service through our website by filling out the contact form, or by downloading our mobile app for a faster booking experience. You can also call us directly.",
 },
 {
 question: "What are your service hours?",
 answer:
 "Our services are available 24/7. We offer flexible scheduling to accommodate your needs, including emergency services for urgent repairs.",
 },
 {
 question: "Do you offer any warranty on your repairs?",
 answer:
 "Yes, we provide a service warranty on our repairs to ensure your peace of mind. The duration of the warranty varies depending on the nature of the service provided.",
 },
];

const teamMembers = [
 { name: "Irshad Mubeen", role: "Co-Founder & CEO", image: "/assets/images/irshaad-sir.png" },
 { name: "Yajuvendra Singh Sisodiya", role: "Co-Founder & COO", image: "/assets/images/yajuvendra-sir.png" },
 { name: "Suraj Malviya", role: "CTO", image: "/assets/images/suraj-sir.png" },
 { name: "Shantanu Deshpande", role: "Product Manager", image: "/assets/images/shantanu-sir.png" },
];

const whyChooseItems = [
 {
 title: "Expert & Verified Technicians",
 description: "Trained and verified experts for safe, reliable AC service.",
 icon: "/assets/icons/tool-kit.png",
 },
 {
 title: "Fast & Same-Day Service",
 description: "Get quick, same-day AC service at your doorstep.",
 icon: "/assets/icons/clock-fast.png",
 },
 {
 title: "Affordable Pricing",
 description: "Transparent pricing with no hidden charges.",
 icon: "/assets/icons/money-bag.png",
 },
];

function FaqItem({ item }: { item: { question: string; answer: string } }) {
 const [open, setOpen] = useState(false);
 return (
 <div className="border-b border-black/20">
 <button
 onClick={() => setOpen(!open)}
 className="flex w-full items-center justify-between gap-6 px-2 py-4 text-left"
 >
 <span className="font-['Montserrat',sans-serif] text-[15px] font-medium leading-[28px] text-[#222] sm:text-[18px] sm:leading-[36px]">
 {item.question}
 </span>
 <span
 className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#222]/20 text-[#222] text-[22px] font-light ${
 open ? "rotate-45" : ""
 }`}
 >
 +
 </span>
 </button>
 {open && (
 <p className="px-2 pb-4 text-[14px] leading-[24px] text-[#222]/65 sm:text-[15px]">
 {item.answer}
 </p>
 )}
 </div>
 );
}

export function AboutPageScreen() {
 return (
 <div className="overflow-hidden bg-[#f5f5f5] text-[#222]">

 {/* ═══════════════════════════════════════════════════════════
 HERO SECTION
 ─────────────────────────────────────────────────────────
 Mobile / tablet:
 • Image fills the full hero at full opacity (no overlay)
 using object-contain so ALL AC units are visible, just
 like the screenshot — nothing cropped, nothing dimmed.
 • "About Us" centred horizontally & vertically over the image.

 Desktop (lg+):
 • Two-column flex: text left (38 %), image right (62 %).
 • Image uses object-contain + object-bottom so it never crops.
 • Section bg matches the image's own light pinkish-grey.
 • Text size scales fluidly with clamp() for full responsiveness.
 ════════════════════════════════════════════════════════════ */}

 {/* ── Mobile / tablet hero ─────────────────────────────────── */}
 {/*
 The image is rendered as a CSS background-image on the section.
 background-color: #ede8e8 + background-blend-mode: multiply
 blends the warm pink through the image's white areas — giving
 the same pinkish tinted look as the desktop column.
 */}
 <section
 className="relative flex items-center justify-center lg:hidden"
 style={{
 backgroundImage: "url('/assets/images/about-hero-bg.png')",
 backgroundSize: "contain",
 backgroundRepeat: "no-repeat",
 backgroundPosition: "center center",
 backgroundColor: "#ede8e8",
 backgroundBlendMode: "multiply",
 minHeight: "56vw",
 paddingTop: "86px",
 paddingBottom: "16px",
 }}
 >
 <h1
 className="font-['Montserrat',sans-serif] font-extrabold text-[#e31e25]"
 style={{ fontSize: "clamp(32px, 10vw, 56px)", lineHeight: 1.1 }}
 >
 About Us
 </h1>
 </section>

 {/* ── Desktop hero (lg+) ───────────────────────────────────── */}
 <section
 className="relative hidden overflow-hidden lg:block"
 style={{ backgroundColor: "#ede8e8" }}
 >
 {/*
 Height scales with viewport: clamp keeps it between 480px and 720px.
 This gives proper responsiveness across 1024px → 1920px+ screens.
 */}
 <div
 className="flex w-full"
 style={{ height: "clamp(480px, 42vw, 720px)" }}
 >
 {/* Left column — text, left-aligned, vertically centred */}
 <div
 className="flex h-full shrink-0 items-center"
 style={{ width: "38%", paddingLeft: "clamp(40px, 4.5vw, 100px)" }}
 >
 <h1
 className="font-['Montserrat',sans-serif] font-bold text-[#e31e25]"
 /*
 Font scales fluidly:
 min 56px → preferred 6vw → max 96px
 */
 style={{
 fontSize: "clamp(56px, 6vw, 96px)",
 lineHeight: 1.05,
 }}
 >
 About Us
 </h1>
 </div>

 {/* Right column — image contained, anchored to bottom */}
 <div className="relative flex-1">
 <Image
 src="/assets/images/about-hero-bg.png"
 alt="AC Doctor about hero"
 fill
 priority
 sizes="62vw"
 className="object-contain object-bottom"
 />
 </div>
 </div>

 {/* Subtle Figma gradient overlay */}
 <div
 className="pointer-events-none absolute inset-0"
 style={{
 background:
 "linear-gradient(92.93deg, rgba(239,160,163,0.1) 2.562%, rgba(125,17,20,0.1) 93.476%)",
 }}
 />
 </section>

 {/* ─── Stats Section ─── */}
 <section className="bg-white py-12 md:py-16">
 <div className="mx-auto max-w-[1230px] px-4 sm:px-8 lg:px-10">
 <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
 <div className="lg:flex-1">
 <p className="font-['Montserrat',sans-serif] text-[18px] font-semibold leading-[30px] text-[#222] sm:text-[22px] sm:leading-[34px]">
 We pride ourselves on delivering top-notch air conditioning services backed by
 years of experience and a commitment to customer satisfaction.
 </p>
 </div>

 <div className="flex gap-8 sm:gap-16 lg:shrink-0">
 <div className="flex flex-col gap-2">
 <p className="font-['Montserrat',sans-serif] text-[36px] font-bold italic leading-[1.2] tracking-[3px] text-[#222] sm:text-[50px]">
 6M+
 </p>
 <p className="text-[18px] sm:text-[22px]">⭐⭐⭐⭐⭐</p>
 <p className="font-['Montserrat',sans-serif] text-[13px] font-extralight text-[#222]/70 sm:text-[16px]">
 Happy Customers
 </p>
 </div>

 <div className="flex flex-col gap-2">
 <p className="font-['Montserrat',sans-serif] text-[36px] font-bold italic leading-[1.2] tracking-[2px] text-[#222] sm:text-[50px]">
 4.0
 </p>
 <p className="text-[18px] sm:text-[22px]">⭐⭐⭐⭐⭐</p>
 <p className="font-['Montserrat',sans-serif] text-[13px] font-extralight text-[#222]/70 sm:text-[16px]">
 Average Rating
 </p>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* ─── Heading Section ─── */}
 <section className="bg-[#f5f5f5] py-12 md:py-16">
 <div className="mx-auto max-w-[1230px] px-4 sm:px-8 lg:px-10">
 <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16">
 <div className="relative h-[240px] w-full max-w-[340px] sm:h-[300px] lg:h-[480px] lg:max-w-[598px] lg:shrink-0">
 <Image
 src="/assets/images/heading-img.png"
 alt="AC units"
 fill
 sizes="(max-width: 1024px) 340px, 598px"
 className="object-contain"
 />
 </div>
 <div className="lg:flex-1">
 <h2 className="font-['Montserrat',sans-serif] text-[28px] font-semibold leading-[1.3] text-[#222] sm:text-[36px] lg:text-[44px]">
 Our Commitment to Quality
 </h2>
 <p className="mt-4 text-[15px] leading-[26px] text-[#222]/72 sm:text-[18px] sm:leading-[30px] lg:text-[20px] lg:leading-[32px]">
 Explore top-quality inverter ACs with energy-saving performance and powerful
 cooling for every season.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* ─── Our Team Section ─── */}
 <section className="bg-white py-12 md:py-16">
 <div className="mx-auto max-w-[1230px] px-4 sm:px-8 lg:px-10">
 <div className="mb-12 text-center">
 <h2 className="font-['Montserrat',sans-serif] text-[28px] font-semibold italic leading-[1.3] text-[#222] sm:text-[36px] lg:text-[50px]">
 Our Team
 </h2>
 </div>
 <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-6">
 {teamMembers.map((member, index) => (
 <div key={index} className="flex flex-col items-center text-center">
 <div className="mx-auto flex h-[140px] w-[140px] items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] sm:h-[170px] sm:w-[170px] lg:h-[250px] lg:w-[250px]">
 <Image src={member.image} alt={member.name} width={250} height={250} className="object-cover" />
 </div>
 <div className="mt-4">
 <p className="font-['Montserrat',sans-serif] text-[15px] font-semibold text-[#222] sm:text-[18px] lg:text-[22px]">
 {member.name}
 </p>
 <p className="mt-1 font-['Montserrat',sans-serif] text-[12px] text-[#222]/60 sm:text-[14px] lg:text-[18px]">
 {member.role}
 </p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ─── Why Choose Us Section ─── */}
 <section className="bg-[#f5f5f5] py-12 md:py-16">
 <div className="mx-auto max-w-[1230px] px-4 sm:px-8 lg:px-10">
 <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
 <div className="relative h-[260px] w-full max-w-[360px] self-center sm:h-[360px] lg:h-[528px] lg:max-w-[644px] lg:shrink-0">
 <Image
 src="/assets/images/why-choose-us-img.png"
 alt="Why choose us AC unit"
 fill
 sizes="(max-width: 1024px) 360px, 644px"
 className="object-contain"
 />
 </div>
 <div className="lg:flex-1">
 <h2 className="font-['Montserrat',sans-serif] text-[28px] font-semibold leading-[1.3] text-[#222] sm:text-[36px] lg:text-[50px]">
 Why Choose Us
 </h2>
 <p className="mt-4 text-[14px] font-extralight leading-[26px] text-[#222]/72 sm:text-[16px] sm:leading-[28px] lg:text-[22px] lg:leading-[36px]">
 We bring expertise, efficiency, and reliability to every job, ensuring your
 comfort is never compromised. Our dedicated team is here to provide seamless
 solutions tailored to your needs.
 </p>
 <div className="mt-8 flex flex-col gap-5">
 {whyChooseItems.map((item) => (
 <div
 key={item.title}
 className="relative flex items-center gap-5 rounded-[10px] bg-white px-5 py-5 shadow-[0px_0px_14px_0px_rgba(0,0,0,0.15)]"
 >
 <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#222]/20 bg-[rgba(227,30,37,0.2)] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.15)] sm:h-[80px] sm:w-[80px] lg:h-[90px] lg:w-[90px]">
 <Image src={item.icon} alt="" width={36} height={36} className="object-contain sm:h-[44px] sm:w-[44px] lg:h-[56px] lg:w-[56px]" aria-hidden="true" />
 </div>
 <div>
 <h3 className="font-['Montserrat',sans-serif] text-[15px] font-normal leading-[24px] text-[#222] sm:text-[18px] lg:text-[22px] lg:leading-[36px]">
 {item.title}
 </h3>
 <p className="mt-1 font-['Montserrat',sans-serif] text-[12px] font-extralight leading-[20px] text-[#222]/65 sm:text-[14px] lg:text-[16px]">
 {item.description}
 </p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* ─── FAQ Section ─── */}
 <section className="bg-[#f5f5f5] py-12 md:py-16">
 <div className="mx-auto max-w-[920px] px-4 sm:px-8 lg:px-10">
 <div className="mb-10 text-center">
 <h2 className="font-['Montserrat',sans-serif] text-[28px] font-semibold italic leading-[1.3] text-[#222] sm:text-[36px] lg:text-[50px]">
 Frequently Ask Questions
 </h2>
 </div>
 <div className="flex flex-col">
 {faqItems.map((item, index) => (
 <FaqItem key={index} item={item} />
 ))}
 </div>
 </div>
 </section>
 </div>
 );
}