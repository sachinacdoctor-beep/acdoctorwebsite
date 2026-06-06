# AC Doctor Website

Production-ready Next.js website for AC Doctor — built from the Figma design using Atomic Design principles.

## Tech Stack

| Layer        | Technology                                            |
| ------------ | ----------------------------------------------------- |
| Framework    | Next.js 15 (App Router)                               |
| Language     | TypeScript (strict)                                   |
| Styling      | Tailwind CSS v3                                       |
| Animation    | CSS keyframes + `useInView` hook                      |
| Dark Mode    | Class-based (`dark:`) with `localStorage` persistence |
| Architecture | Atomic Design                                         |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open browser
open http://localhost:1010
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        ← Root layout (metadata, global styles, Navbar+Footer)
│   └── page.tsx          ← Home page (composes all organisms)
│
├── components/
│   ├── atoms/            ← Primitive UI: Button, Input, Badge
│   ├── molecules/        ← Grouped UI: SectionHeader, ServiceCard, QuoteCard, AppStep
│   ├── organisms/        ← Page sections: Navbar, HeroSection, ServicesSection, …
│   ├── templates/        ← Page shells: RootLayoutTemplate
│   └── index.ts          ← Barrel exports
│
├── hooks/
│   ├── useInView.ts      ← IntersectionObserver for scroll animations
│   └── useContactForm.ts ← Form state + validation
│
├── lib/
│   └── data.ts           ← Content, nav items, Figma asset URLs
│
├── styles/
│   └── globals.css       ← Tailwind directives, CSS vars, base styles
│
└── types/
    └── index.ts          ← Shared TypeScript interfaces
```

---

## Design Tokens (from Figma)

```css
--color-primary: #e31e25 /* Brand red */ --color-white-bg: #f5f5f5
  /* Light background */ --color-black-bg: #161616 /* Dark background */
  --color-text: #222222 /* Primary text */ --color-secondary: #d9d9d9
  /* Muted text */;
```

---

## Atomic Design Hierarchy

```
Atoms        →  Button, Input, Badge
Molecules    →  SectionHeader, ServiceCard, QuoteCard, AppStep
Organisms    →  Navbar, HeroSection, ServicesSection, ProductsSection,
                QuoteSection, OEMTicker, AppSection, CTASection, Footer
Templates    →  RootLayoutTemplate
Pages        →  app/page.tsx (HomePage)
```

---

## Responsiveness

| Breakpoint        | Layout                                                   |
| ----------------- | -------------------------------------------------------- |
| Mobile (375px+)   | Single column, stacked sections                          |
| Tablet (640px+)   | 2-column grids, side-by-side CTAs                        |
| Desktop (1024px+) | 3+ column grids, full nav pill, side-by-side app section |
| Wide (1280px+)    | Max-width containers, full carousel                      |

**Mobile-first approach** — all base styles target 375px, with `sm:`, `md:`, `lg:`, `xl:` utilities layered on top.

---

## Animations

- **Hero** — fade-up entrance (CSS keyframes, staggered delays)
- **Scroll-triggered** — `useInView` hook + inline `transition` styles per card
- **Navbar** — background + shadow appear on scroll
- **OEM Ticker** — infinite CSS `animate-scroll` marquee
- **Product carousel** — smooth horizontal scroll via JS

---

## Dark Mode

Toggle via the moon/sun button in the Navbar. Preference is saved to `localStorage`. A flash-prevention inline script in `<head>` reads the saved theme before first paint.

---

## Adding New Pages

```bash
# Create a new route
mkdir src/app/services
touch src/app/services/page.tsx
```

```tsx
// src/app/services/page.tsx
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Services' };
export default function ServicesPage() { ... }
```

The layout (Navbar + Footer) is inherited automatically.

---

## Replacing Figma Asset URLs

The Figma MCP asset URLs expire after **7 days**. Replace them in `src/lib/data.ts` under the `ASSETS` object with your production CDN or `/public` folder paths.

```ts
export const ASSETS = {
  heroBg: '/images/hero-bg.jpg',   // ← replace with permanent URL
  ctaBg:  '/images/cta-bg.jpg',
  ...
};
```
