"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on nav click
  const handleNavClick = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      role="banner"
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/95 dark:bg-brand-black/95 backdrop-blur-md shadow-nav py-3"
          : "bg-transparent py-5",
      ].join(" ")}
    >
      <div className="section-padding flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-montserrat font-bold text-2xl lg:text-[1.875rem] text-brand-white dark:text-brand-white shrink-0 tracking-tight"
          style={{ color: scrolled ? (darkMode ? "#f5f5f5" : "#222") : "#f5f5f5" }}
        >
          AC DOCTOR
        </Link>

        {/* Desktop nav pill */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-10 lg:gap-16 bg-white dark:bg-white/10 px-10 lg:px-20 py-[18px] rounded-pill shadow-sm"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-montserrat font-semibold text-nav-item text-brand-primary hover:text-brand-primary-dark transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-primary after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleDark}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white dark:text-brand-white transition-colors duration-200"
            style={{ color: scrolled ? (darkMode ? "#f5f5f5" : "#222") : "#f5f5f5" }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Hamburger */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${
                scrolled || menuOpen
                  ? "bg-text-primary dark:bg-brand-white"
                  : "bg-white"
              } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${
                scrolled || menuOpen
                  ? "bg-text-primary dark:bg-brand-white"
                  : "bg-white"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 transition-all duration-300 ${
                scrolled || menuOpen
                  ? "bg-text-primary dark:bg-brand-white"
                  : "bg-white"
              } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile navigation"
          className="section-padding pb-6 flex flex-col gap-4 bg-white/95 dark:bg-brand-black/95 backdrop-blur-md"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="font-montserrat font-semibold text-lg text-brand-primary py-2 border-b border-gray-100 dark:border-white/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
