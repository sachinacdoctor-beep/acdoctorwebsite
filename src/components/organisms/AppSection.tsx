"use client";

import Image from "next/image";
import { ASSETS } from "@/lib/data";
import { useInView } from "@/hooks/useInView";

/* ── Figma store badge assets (valid 7 days) — replace with /public paths ── */
const GOOGLE_PLAY_BADGE =
  "https://www.figma.com/api/mcp/asset/ea024a23-85b1-4da0-ac00-743094f90f42";
const APP_STORE_BADGE =
  "https://www.figma.com/api/mcp/asset/1b50d061-4372-41c1-a3f2-d39e231643d5";

export function AppSection() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="app"
      ref={ref}
      aria-label="Download AC Doctor App"
      className="py-16 md:py-20 bg-white dark:bg-[#111] overflow-hidden"
    >
      <div className="max-w-[1362px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
          {/* ══════════════════════════════════════════
              LEFT — Phone mockups + blob + mascot
          ══════════════════════════════════════════ */}
          <div
            className={[
              "relative w-full lg:w-[53%] shrink-0",
              "h-[420px] sm:h-[520px] md:h-[580px] lg:h-[620px]",
              "transition-all duration-700",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12",
            ].join(" ")}
          >
            {/* ── Decorative background blob ── */}
            {/* <div
              className="absolute inset-8 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-[#e31e25]/5 dark:bg-[#e31e25]/8"
              aria-hidden="true"
            /> */}

            {/* ── Back phone (slightly offset left + rotated) ── */}
            {/* <div
              className="absolute z-10"
              style={{
                left: "4%",
                top: "3%",
                width: "42%",
                height: "88%",
              }}
              aria-hidden="true"
            >
              <Image
                src={ASSETS.appMockup}
                alt=""
                fill
                sizes="(max-width: 1024px) 42vw, 22vw"
                className="object-contain drop-shadow-2xl"
              />
            </div> */}

            {/* ── Front phone (overlapping, on top) ── */}
            {/* <div
              className="absolute z-20"
              style={{
                left: "30%",
                top: "0%",
                width: "46%",
                height: "92%",
              }}
            >
              <Image
                // src={ASSETS.appMockup2 ?? ASSETS.appMockup}
                src={ASSETS.appMockup}
                alt="AC Doctor app screens"
                fill
                sizes="(max-width: 1024px) 46vw, 25vw"
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div> */}

            {/* ── Front phone (overlapping, on top) ── */}
            <div
              className="absolute z-20"
              style={{
                left: "15%",
                top: "0%",
                width: "72%",
                height: "94%",
              }}
            >
              <Image
                // src={ASSETS.appMockup2 ?? ASSETS.appMockup}
                src={ASSETS.appMockup}
                alt="AC Doctor app screens"
                fill
                sizes="(max-width: 1024px) 72vw, 38vw"
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* ── Mascot — closer to phone, bottom-anchored ── */}
            {ASSETS.mascot && (
              <div
                className="absolute z-30 bottom-0 left-[12%] w-[22%] sm:w-[18%]"
                aria-hidden="true"
              >
                <Image
                  src={ASSETS.mascot}
                  alt=""
                  width={160}
                  height={200}
                  className="object-contain w-full h-auto"
                />
              </div>
            )}

            {/* ── Mascot — bottom-left corner ── */}
            {/* {ASSETS.mascot && (
              <div
                className="absolute z-30 bottom-0 left-0 w-[22%] sm:w-[18%]"
                aria-hidden="true"
              >
                <Image
                  src={ASSETS.mascot}
                  alt=""
                  width={160}
                  height={200}
                  className="object-contain w-full h-auto"
                />
              </div>
            )} */}
          </div>

          {/* ══════════════════════════════════════════
              RIGHT — Heading + subtitle + store buttons
          ══════════════════════════════════════════ */}
          <div
            className={[
              "flex flex-col items-center text-center lg:items-start lg:text-left",
              "gap-10 lg:gap-[44px]",
              "w-full lg:w-[47%]",
              "transition-all duration-700 delay-150",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12",
            ].join(" ")}
          >
            {/* Text block */}
            <div className="flex flex-col gap-[24px] lg:gap-[44px]">
              {/* Heading — "Download your AC DOCTOR App" */}
              <h2
                className="font-['Montserrat',sans-serif] font-semibold text-[#222] dark:text-[#f5f5f5] leading-[1.32]"
                style={{ fontSize: "clamp(32px, 5vw, 68px)" }}
              >
                Download your <span className="text-[#e31e25]">AC DOCTOR</span>{" "}
                App
              </h2>

              {/* Subtitle */}
              <p
                className="font-['Montserrat',sans-serif] font-medium text-[#222]/80 dark:text-[#f5f5f5]/70 leading-[1.46]"
                style={{ fontSize: "clamp(16px, 1.8vw, 26px)" }}
              >
                Comfort starts with one click,
                <br />
                We handle your stress.
              </p>
            </div>

            {/* ── Store buttons — black pill-ish cards, matching Figma ── */}
            <div className="flex flex-row gap-5 sm:gap-6">
              {/* Google Play */}
              <a
                href="#"
                aria-label="Get it on Google Play"
                className="
                  flex items-center justify-center
                  bg-black hover:bg-[#1a1a1a] active:bg-[#111]
                  rounded-[14px]
                  w-[160px] sm:w-[180px] lg:w-[200px] h-[60px] sm:h-[65px] lg:h-[70px]
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]
                  overflow-hidden shrink-0
                "
              >
                <Image
                  src={GOOGLE_PLAY_BADGE}
                  alt="Get it on Google Play"
                  width={168}
                  height={46}
                  className="object-contain w-[84%] h-auto"
                />
              </a>

              {/* App Store */}
              <a
                href="#"
                aria-label="Download on the App Store"
                className="
                  flex items-center justify-center
                  bg-black hover:bg-[#1a1a1a] active:bg-[#111]
                  rounded-[14px]
                  w-[160px] sm:w-[180px] lg:w-[200px] h-[60px] sm:h-[65px] lg:h-[70px]
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]
                  overflow-hidden shrink-0
                "
              >
                <Image
                  src={APP_STORE_BADGE}
                  alt="Download on the App Store"
                  width={165}
                  height={50}
                  className="object-contain w-[82%] h-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
