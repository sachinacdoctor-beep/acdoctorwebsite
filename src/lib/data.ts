import type {
  NavItem,
  ServiceCard,
  QuoteCard,
  AppStep,
  FooterColumn,
} from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Service", href: "#services" },
  { label: "Product", href: "#products" },
  { label: "About", href: "#about" },
];

export const SERVICES: ServiceCard[] = [
  {
    id: "service",
    title: "Service",
    description:
      "Deep cleaning and sanitization to remove dust, bacteria, and bad odor for fresh cooling.",
    icon: "🧼",
    iconImage: "/assets/icons/service.png",
  },
  {
    id: "repair",
    title: "Repair",
    description:
      "Quick diagnosis and expert repair for cooling issues, gas leakage, and breakdowns.",
    icon: "🔧",
    iconImage: "/assets/icons/repair.png",
  },
  {
    id: "installation",
    title: "Installation",
    description:
      "Safe and professional AC installation with proper fitting and performance testing.",
    icon: "⚙️",
    iconImage: "/assets/icons/installation.png",
  },
  {
    id: "compressor",
    title: "Compressor",
    description:
      "Compressor checkup, repair, and replacement by trained technicians.",
    icon: "🧯",
    iconImage: "/assets/icons/compressor.png",
  },
  {
    id: "gas-charging",
    title: "Gas Charging",
    description:
      "AC gas refill service for better cooling and improved energy efficiency.",
    icon: "🛢️",
    iconImage: "/assets/icons/gas.png",
  },
  {
    id: "other",
    title: "Other",
    description:
      "PCB repair, water leakage, wiring issues, remote setup, and more.",
    icon: "➡️",
    iconImage: "/assets/icons/other.png",
  },
];

export const QUOTE_CARDS: QuoteCard[] = [
  {
    id: "sell-old-ac",
    icon: "📦",
    title: "Sell Old AC",
    description: "Get the best price for your old AC unit. Quick evaluation and instant quote.",
  },
  {
    id: "amc",
    icon: "🛡️",
    title: "AMC",
    description: "Annual Maintenance Contract for worry-free AC performance all year long.",
  },
  {
    id: "free-consultancy",
    icon: "💬",
    title: "Free Consultancy",
    description: "Expert advice on the best AC solution tailored to your space and budget.",
  },
  {
    id: "copper-pipe",
    icon: "🔩",
    title: "Copper Pipe",
    description: "High-quality copper piping supply and installation for durable AC systems.",
  },
];

export const APP_STEPS: AppStep[] = [
  {
    id: "download",
    number: "01",
    title: "Download it for free",
    description:
      "Available on both iOS and Android. Download the AC Doctor app in seconds — no subscription needed.",
  },
  {
    id: "profile",
    number: "02",
    title: "Create Your Profile",
    description:
      "Enter your location, AC brand, and model. We match you with the right certified technician in your area instantly.",
  },
  {
    id: "book",
    number: "03",
    title: "Book a Service",
    description:
      "Choose your service, pick a date & time slot, and confirm your booking — no calls, no waiting.",
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Our Links",
    links: [
      { label: "Home", href: "#" },
      { label: "About Us", href: "#about" },
      { label: "Products", href: "#products" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
  {
    heading: "Other Pages",
    links: [
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policies", href: "#" },
      { label: "User Manual", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blogs", href: "#" },
    ],
  },
];

export const OEM_BRANDS = [
  "Daikin",
  "LG",
  "Samsung",
  "Voltas",
  "Blue Star",
  "Carrier",
  "Hitachi",
  "Panasonic",
];

// Asset URLs from Figma (valid for 7 days)
export const ASSETS = {
  heroBg:
    "https://www.figma.com/api/mcp/asset/c6b16f2b-8a9a-4223-9ced-a1d03d7d06ce",
  ctaBg:
    "https://www.figma.com/api/mcp/asset/1352ddbd-6f20-4d82-9467-18c496b9948a",
  appMockup:
    "https://www.figma.com/api/mcp/asset/7933b399-109e-4fdc-87c6-9ff1895c1f2f",
  productImage:
    "https://www.figma.com/api/mcp/asset/4f54c9bc-ff55-4f3f-8d43-2e58a494b49e",
  oemBrand:
    "https://www.figma.com/api/mcp/asset/6c6c2fcd-6c08-4a11-ada6-87233dfcf226",
};
