import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#E31E25",
          "primary-dark": "#b31219",
          white: "#F5F5F5",
          black: "#161616",
        },
        text: {
          primary: "#222222",
          secondary: "#D9D9D9",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        "hero-xl": ["clamp(2.5rem, 6vw, 5.625rem)", { lineHeight: "1.1" }],
        "hero-sub": ["clamp(1rem, 2vw, 2.125rem)", { lineHeight: "1.4" }],
        "section-title": ["clamp(1.75rem, 3vw, 3.125rem)", { lineHeight: "1.3" }],
        "card-title": ["clamp(1.25rem, 2.5vw, 2.375rem)", { lineHeight: "1.35" }],
        "body-lg": ["clamp(0.875rem, 1.5vw, 1.375rem)", { lineHeight: "1.6" }],
        "nav-item": ["clamp(0.875rem, 1.2vw, 1.25rem)", { lineHeight: "1" }],
      },
      spacing: {
        "section-x": "clamp(1rem, 6.25vw, 7.5rem)",
        "section-y": "clamp(3rem, 6vw, 5rem)",
      },
      borderRadius: {
        pill: "50px",
        card: "20px",
        icon: "60px",
      },
      boxShadow: {
        card: "0px 0px 34px 0px rgba(0,0,0,0.15)",
        "card-hover": "0px 8px 50px 0px rgba(0,0,0,0.25)",
        nav: "0px 4px 30px rgba(0,0,0,0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-overlay":
          "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        scroll: "scroll 30s linear infinite",
        "slide-in-left": "slideInLeft 0.6s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
