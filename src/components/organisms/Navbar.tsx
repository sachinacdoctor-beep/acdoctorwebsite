"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/data";

// Figma asset: right-side CTA pill (Download App + store badges)
const IMG_CTA =
  "https://www.figma.com/api/mcp/asset/426f3a57-d1f7-4083-9b87-a98f72ef2a05";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Persist dark mode preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDark = useCallback(() => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }, [darkMode]);

  // Scroll listener for sticky state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      role="banner"
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/95 dark:bg-[#111]/95 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.10)] py-3"
          : "bg-transparent py-4",
      ].join(" ")}
    >
      {/* ── Desktop layout ── */}
      <div className="hidden md:flex items-center justify-between px-8 lg:px-14 xl:px-20 gap-6 relative h-[70px]">
        {/* Logo */}
        <Link
          href="/"
          className={[
            "font-['Montserrat',sans-serif] font-bold text-[30px] leading-[26px] shrink-0 tracking-tight transition-colors duration-300",
            scrolled ? "text-[#222] dark:text-[#f5f5f5]" : "text-[#f5f5f5]",
          ].join(" ")}
        >
          AC DOCTOR
        </Link>

        {/* Centre nav pill */}
        <nav
          aria-label="Primary navigation"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-[70px] bg-white dark:bg-white/10 px-[80px] py-[10px] rounded-[40px] shadow-sm"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-['Montserrat',sans-serif] font-semibold text-[20px] text-[#e31e25] hover:text-[#b5161c] transition-colors duration-200 whitespace-nowrap relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#e31e25] after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right — Download App CTA (Figma asset) */}
        <div className="shrink-0 flex items-center gap-3">
          {/* Download CTA on mobile */}
          <div className="flex items-center gap-3 border border-[#ffffff]/40 rounded-full px-5 py-3 w-fit">
            <span className="font-['Montserrat',sans-serif] font-semibold text-[14px] text-[#ffffff] whitespace-nowrap tracking-wide">
              Download App
            </span>
            <span className="block w-px h-5 bg-[#ffffff]/30" />
            {/* Apple */}
            <a
              href="#"
              aria-label="Download on the App Store"
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0,0,256,256"
              >
                <g fillRule="nonzero">
                  <g transform="scale(5.12,5.12)">
                    <path
                      fill="#ffffff"
                      d="M44.52734,34.75c-1.07812,2.39453 -1.59766,3.46484 -2.98437,5.57813c-1.94141,2.95313 -4.67969,6.64063 -8.0625,6.66406c-3.01172,0.02734 -3.78906,-1.96484 -7.87891,-1.92969c-4.08594,0.01953 -4.9375,1.96875 -7.95312,1.9375c-3.38672,-0.03125 -5.97656,-3.35156 -7.91797,-6.30078c-5.42969,-8.26953 -6.00391,-17.96484 -2.64844,-23.12109c2.375,-3.65625 6.12891,-5.80469 9.65625,-5.80469c3.59375,0 5.85156,1.97266 8.82031,1.97266c2.88281,0 4.63672,-1.97656 8.79297,-1.97656c3.14063,0 6.46094,1.71094 8.83594,4.66406c-7.76562,4.25781 -6.50391,15.34766 1.33984,18.31641zM31.19531,8.46875c1.51172,-1.94141 2.66016,-4.67969 2.24219,-7.46875c-2.46484,0.16797 -5.34766,1.74219 -7.03125,3.78125c-1.52734,1.85938 -2.79297,4.61719 -2.30078,7.28516c2.69141,0.08594 5.47656,-1.51953 7.08984,-3.59766z"
                    />
                  </g>
                </g>
              </svg>
            </a>
            {/* Google Play */}
            <a
              href="#"
              aria-label="Get it on Google Play"
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0,0,256,256"
              >
                <g fillRule="nonzero">
                  <g transform="scale(5.12,5.12)">
                    <path
                      fill="#ffffff"
                      d="M7.125,2l21.65625,21.5l5.9375,-5.9375l-26.25,-15.15625c-0.4375,-0.25391 -0.90625,-0.39453 -1.34375,-0.40625zM5.3125,3c-0.19531,0.34766 -0.3125,0.75781 -0.3125,1.21875v41.78125c0,0.33594 0.07031,0.63672 0.1875,0.90625l22.15625,-22zM36.53125,18.59375l-6.34375,6.3125l6.34375,6.28125l7.75,-4.4375c1.10156,-0.63672 1.25781,-1.44531 1.25,-1.875c-0.01172,-0.71094 -0.46094,-1.375 -1.21875,-1.78125c-0.66016,-0.35547 -5.5625,-3.21094 -7.78125,-4.5zM28.78125,26.3125l-21.84375,21.65625c0.36328,-0.01953 0.75781,-0.09766 1.125,-0.3125c0.85547,-0.49609 18.15625,-10.5 18.15625,-10.5l8.53125,-4.90625z"
                    />
                  </g>
                </g>
              </svg>
            </a>
          </div>
          {/* Dark mode toggle */}
          <button
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={toggleDark}
            className={[
              "ml-2 p-2 h-11 w-11 border border-[#ffffff]/40 rounded-full transition-colors duration-200",
              scrolled
                ? "bg-gray-100 dark:bg-white/10 text-[#222] dark:text-[#f5f5f5]"
                : "bg-white/10 hover:bg-white/20 text-[#f5f5f5]",
            ].join(" ")}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="md:hidden flex items-center justify-between px-5 h-[60px]">
        {/* Logo */}
        <Link
          href="/"
          className={[
            "font-['Montserrat',sans-serif] font-bold text-[22px] tracking-tight transition-colors duration-300",
            scrolled || menuOpen
              ? "text-[#222] dark:text-[#f5f5f5]"
              : "text-[#f5f5f5]",
          ].join(" ")}
        >
          AC DOCTOR
        </Link>

        <div className="flex items-center gap-2">
          {/* Dark mode */}
          <button
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={toggleDark}
            className={[
              "p-2 rounded-full transition-colors duration-200",
              scrolled || menuOpen
                ? "bg-gray-100 dark:bg-white/10 text-[#222] dark:text-[#f5f5f5]"
                : "bg-white/10 text-[#f5f5f5]",
            ].join(" ")}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Hamburger */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col gap-[5px] p-2"
          >
            <span
              className={[
                "block h-0.5 w-6 rounded transition-all duration-300",
                scrolled || menuOpen
                  ? "bg-[#222] dark:bg-[#f5f5f5]"
                  : "bg-white",
                menuOpen ? "rotate-45 translate-y-[7px]" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-0.5 w-6 rounded transition-all duration-300",
                scrolled || menuOpen
                  ? "bg-[#222] dark:bg-[#f5f5f5]"
                  : "bg-white",
                menuOpen ? "opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-0.5 w-6 rounded transition-all duration-300",
                scrolled || menuOpen
                  ? "bg-[#222] dark:bg-[#f5f5f5]"
                  : "bg-white",
                menuOpen ? "-rotate-45 -translate-y-[7px]" : "",
              ].join(" ")}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={[
          "md:hidden overflow-hidden transition-all duration-300",
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col gap-1 px-5 pb-6 pt-2 bg-white/98 dark:bg-[#111]/98 backdrop-blur-md"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="font-['Montserrat',sans-serif] font-semibold text-[18px] text-[#e31e25] py-3 border-b border-gray-100 dark:border-white/10 last:border-0 transition-colors hover:text-[#b5161c]"
            >
              {item.label}
            </Link>
          ))}
          {/* Download CTA on mobile */}
          {/* Download CTA on mobile */}
          <div className="mt-4 flex items-center gap-3 border border-[#e31e25]/40 rounded-full px-5 py-3 w-fit">
            <span className="font-['Montserrat',sans-serif] font-semibold text-[14px] text-[#e31e25] whitespace-nowrap tracking-wide">
              Download App
            </span>
            <span className="block w-px h-5 bg-[#e31e25]/30" />
            {/* Apple */}
            <a
              href="#"
              aria-label="Download on the App Store"
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0,0,256,256"
              >
                <g fillRule="nonzero">
                  <g transform="scale(5.12,5.12)">
                    <path
                      fill="#e31e25"
                      d="M44.52734,34.75c-1.07812,2.39453 -1.59766,3.46484 -2.98437,5.57813c-1.94141,2.95313 -4.67969,6.64063 -8.0625,6.66406c-3.01172,0.02734 -3.78906,-1.96484 -7.87891,-1.92969c-4.08594,0.01953 -4.9375,1.96875 -7.95312,1.9375c-3.38672,-0.03125 -5.97656,-3.35156 -7.91797,-6.30078c-5.42969,-8.26953 -6.00391,-17.96484 -2.64844,-23.12109c2.375,-3.65625 6.12891,-5.80469 9.65625,-5.80469c3.59375,0 5.85156,1.97266 8.82031,1.97266c2.88281,0 4.63672,-1.97656 8.79297,-1.97656c3.14063,0 6.46094,1.71094 8.83594,4.66406c-7.76562,4.25781 -6.50391,15.34766 1.33984,18.31641zM31.19531,8.46875c1.51172,-1.94141 2.66016,-4.67969 2.24219,-7.46875c-2.46484,0.16797 -5.34766,1.74219 -7.03125,3.78125c-1.52734,1.85938 -2.79297,4.61719 -2.30078,7.28516c2.69141,0.08594 5.47656,-1.51953 7.08984,-3.59766z"
                    />
                  </g>
                </g>
              </svg>
            </a>
            {/* Google Play */}
            <a
              href="#"
              aria-label="Get it on Google Play"
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0,0,256,256"
              >
                <g fillRule="nonzero">
                  <g transform="scale(5.12,5.12)">
                    <path
                      fill="#e31e25"
                      d="M7.125,2l21.65625,21.5l5.9375,-5.9375l-26.25,-15.15625c-0.4375,-0.25391 -0.90625,-0.39453 -1.34375,-0.40625zM5.3125,3c-0.19531,0.34766 -0.3125,0.75781 -0.3125,1.21875v41.78125c0,0.33594 0.07031,0.63672 0.1875,0.90625l22.15625,-22zM36.53125,18.59375l-6.34375,6.3125l6.34375,6.28125l7.75,-4.4375c1.10156,-0.63672 1.25781,-1.44531 1.25,-1.875c-0.01172,-0.71094 -0.46094,-1.375 -1.21875,-1.78125c-0.66016,-0.35547 -5.5625,-3.21094 -7.78125,-4.5zM28.78125,26.3125l-21.84375,21.65625c0.36328,-0.01953 0.75781,-0.09766 1.125,-0.3125c0.85547,-0.49609 18.15625,-10.5 18.15625,-10.5l8.53125,-4.90625z"
                    />
                  </g>
                </g>
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
