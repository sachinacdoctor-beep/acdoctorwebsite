"use client";

import Script from "next/script";

export default function ThemeScript() {
  return (
    <Script
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          try {
            var theme = localStorage.getItem('theme');
            if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            }
          } catch(e){}
        `,
      }}
    />
  );
}
