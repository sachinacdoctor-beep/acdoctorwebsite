import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { RootLayoutTemplate } from "@/components/templates/RootLayoutTemplate";
import ThemeScript from "@/components/ThemeScript";

export const metadata: Metadata = {
  title: {
    default: "AC Doctor — Professional AC Services in Indore",
    template: "%s | AC Doctor",
  },
  description:
    "Book AC repair, installation, gas charging, sterilisation and more. Certified technicians. Fast turnaround. AC Doctor — Indore's trusted AC service partner.",
  keywords: ["AC repair", "AC service", "AC installation", "Indore", "AC Doctor"],
  authors: [{ name: "AC Doctor" }],
  creator: "AC Doctor",
  metadataBase: new URL("https://acdoctor.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://acdoctor.in",
    siteName: "AC Doctor",
    title: "AC Doctor — Professional AC Services",
    description: "Professional AC services at your doorstep. Book repair, installation & more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AC Doctor — Professional AC Services",
    description: "Professional AC services at your doorstep.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
    { media: "(prefers-color-scheme: dark)", color: "#161616" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <ThemeScript />
      </head>
      <body className="bg-brand-white dark:bg-brand-black transition-colors duration-300">
        {/* Skip to main content for a11y */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] bg-brand-primary text-white px-4 py-2 rounded-md font-semibold text-sm"
        >
          Skip to main content
        </a>
        <RootLayoutTemplate>{children}</RootLayoutTemplate>
      </body>
    </html>
  );
}