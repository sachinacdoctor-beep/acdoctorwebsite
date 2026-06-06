import type {
  NavItem,
  ServiceCard,
  QuoteCard,
  AppStep,
  FooterColumn,
  BookingCategory,
  AcBookingItem,
} from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Service", href: "/#services" },
  { label: "Product", href: "/products" },
  { label: "About", href: "/about" },
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
export const BOOKING_CATEGORIES: BookingCategory[] = [
  {
    id: "service",
    title: "Service",
    backendId: "676ad2f1ce63a8df0ef47e71",
    backendKey: "SERVICE",
    backendName: "Service",
    backendCategory: "AMC",
    backendIcon:
      "https://acdoctor-service-booking-system.s3.ap-south-1.amazonaws.com/prod/service/banner/Strerilization.png",
  },
  {
    id: "repair",
    title: "Repair",
    backendId: "676ad2d5ce63a8df0ef47e6c",
    backendKey: "REPAIR",
    backendName: "Repair",
    backendCategory: "BASIC",
    backendIcon:
      "https://acdoctor-service-booking-system.s3.ap-south-1.amazonaws.com/prod/service/banner/Repair.png",
  },
  {
    id: "installation",
    title: "Installation",
    backendId: "676ad2bece63a8df0ef47e67",
    backendKey: "INSTALLATION",
    backendName: "Installation",
    backendCategory: "BASIC",
    backendIcon:
      "https://acdoctor-service-booking-system.s3.ap-south-1.amazonaws.com/prod/service/banner/InstallationIcon.png",
  },
  {
    id: "compressor",
    title: "Compressor",
    backendId: "676ad296ce63a8df0ef47e62",
    backendKey: "COMPRESSOR",
    backendName: "Compressor",
    backendCategory: "BASIC",
    backendIcon:
      "https://acdoctor-service-booking-system.s3.ap-south-1.amazonaws.com/prod/service/banner/compresserIcon.png",
  },
  {
    id: "gas-charging",
    title: "Gas Charging",
    backendId: "676ad27fce63a8df0ef47e5d",
    backendKey: "GAS_CHARGING",
    backendName: "Gas Charging",
    backendCategory: "GAS_CHG",
    backendIcon:
      "https://acdoctor-service-booking-system.s3.ap-south-1.amazonaws.com/prod/service/banner/gaschargeIcon.png",
  },
  {
    id: "commercial-ac",
    title: "Commercial AC",
    backendId: "676ad267ce63a8df0ef47e58",
    backendKey: "COMMERCIAL_AC",
    backendName: "Commercial AC",
    backendCategory: "COMM_AC",
    backendIcon:
      "https://acdoctor-service-booking-system.s3.ap-south-1.amazonaws.com/prod/service/banner/Group%2046-1.png",
  },
  {
    id: "other",
    title: "Other",
    backendId: "676ad215ce63a8df0ef47e49",
    backendKey: "OTHER",
    backendName: "Other",
    backendCategory: "OTHER",
    backendIcon:
      "https://acdoctor-service-booking-system.s3.ap-south-1.amazonaws.com/prod/service/banner/other.png",
  },
];

export const AC_BOOKING_ITEMS: AcBookingItem[] = [
  {
    id: "split-ac",
    name: "Split AC",
    description:
      "Wall mounted split AC support for homes, rooms, offices, and shops.",
    startingPrice: 499,
    image: "/assets/images/split-ac.png",
    icon: "❄️",
  },
  {
    id: "window-ac",
    name: "Window AC",
    description:
      "Compact window AC service support with quick diagnosis and doorstep visit.",
    startingPrice: 449,
    image: "/assets/images/window-ac.png",
    icon: "🪟",
  },
  {
    id: "cassette-ac",
    name: "Cassette AC",
    description:
      "Ceiling cassette AC support for commercial and premium indoor spaces.",
    startingPrice: 799,
    image: "/assets/images/cassette-ac.png",
    icon: "◻️",
  },
  {
    id: "vrv-vrf-ac",
    name: "VRV/VRF AC",
    description:
      "Centralized VRV/VRF AC support for large homes, offices, and commercial sites.",
    startingPrice: 1499,
    image: "/assets/images/asdsd.png",
    icon: "🏢",
  },
  {
    id: "tower-ac",
    name: "Tower AC",
    description:
      "Floor standing tower AC support for showrooms, halls, and large rooms.",
    image: "/assets/images/tower-ac.png",
    startingPrice: 899,
    icon: "🗼",
  },
  {
    id: "ducted-ac",
    name: "Ducted AC",
    description:
      "Ducted AC support for concealed air-flow systems and commercial cooling.",
    startingPrice: 1299,
    image: "/assets/images/ductable-ac.png",
    icon: "〰️",
  },
  {
    id: "chiller-ac",
    name: "Chiller AC",
    description:
      "Industrial and commercial chiller AC support with expert technician visit.",
    startingPrice: 1999,
    image: "/assets/images/chiller-ac-removebg-preview.png",

    icon: "🧊",
  },
];

export const QUOTE_CARDS: QuoteCard[] = [
  {
    id: "sell-old-ac",
    iconImage: "/assets/icons/old_ac.png",
    icon: "📦",
    title: "Sell Old AC",
    description:
      "Get the best price for your old AC unit. Quick evaluation and instant quote.",
  },
  {
    id: "amc",
    iconImage: "/assets/icons/amc.png",
    icon: "🛡️",
    title: "AMC",
    description:
      "Annual Maintenance Contract for worry-free AC performance all year long.",
  },
  {
    id: "free-consultancy",
    iconImage: "/assets/icons/free_consultancy.png",
    icon: "💬",
    title: "Free Consultancy",
    description:
      "Expert advice on the best AC solution tailored to your space and budget.",
  },
  {
    id: "copper-pipe",
    iconImage: "/assets/icons/copper_pipe.png",
    icon: "🔩",
    title: "Copper Pipe",
    description:
      "High-quality copper piping supply and installation for durable AC systems.",
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
  heroBg: "/assets/images/background.png",
  ctaBg: "/assets/images/contact_us_background.png",
  // appMockup:
  // "https://www.figma.com/api/mcp/asset/7933b399-109e-4fdc-87c6-9ff1895c1f2f",
  appMockup: "/assets/images/app_mockup.png",
  mascot: "/assets/images/mascot.png",
  productImage: "/assets/images/ac_outdoor.png",
  oemBrand: "/assets/logo/ac_doctor.png",
};
