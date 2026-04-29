import Link from "next/link";
import { FOOTER_COLUMNS } from "@/lib/data";

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: "📘" },
  { label: "Instagram", href: "#", icon: "📸" },
  { label: "Twitter", href: "#", icon: "🐦" },
  { label: "YouTube", href: "#", icon: "▶️" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="bg-brand-black text-text-secondary rounded-tl-[40px] rounded-tr-[40px] overflow-hidden"
    >
      <div className="section-padding py-16 max-w-[1680px] mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <p className="font-montserrat font-bold text-3xl text-brand-white tracking-tight">
              AC DOCTOR
            </p>
            <p className="font-poppins text-base leading-relaxed text-text-secondary/80">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-2">
              {SOCIAL_LINKS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-primary flex items-center justify-center transition-colors duration-200 text-lg"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Dynamic link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-5">
              <h4 className="font-poppins font-medium text-lg text-brand-white">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-4" role="list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-poppins text-base text-text-secondary hover:text-brand-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="flex flex-col gap-5">
            <h4 className="font-poppins font-medium text-lg text-brand-white">
              Global HQ
            </h4>
            <address className="not-italic flex flex-col gap-4">
              <p className="font-poppins text-base text-text-secondary">
                AC DOCTOR Private Ltd.
              </p>
              <a
                href="mailto:info@acdoctor.in"
                className="font-montserrat font-medium text-base text-text-secondary underline hover:text-brand-primary transition-colors"
              >
                info@acdoctor.in
              </a>
              <div className="flex gap-2 items-start">
                <span aria-hidden="true" className="text-brand-primary mt-0.5">📍</span>
                <p className="font-poppins text-base text-text-secondary">
                  01 - Joy Colony, Patrakar Square Palasia, Indore
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <span aria-hidden="true" className="text-brand-primary">📞</span>
                <a
                  href="tel:+918959898989"
                  className="font-poppins text-base text-text-secondary hover:text-brand-primary transition-colors"
                >
                  +91 89598 98989
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-10 border-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-montserrat font-extralight text-sm text-text-secondary/70 text-center sm:text-left">
            © {year} AC DOCTOR Private LTD. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-sm font-montserrat font-extralight text-text-secondary/70">
            <Link href="#" className="hover:text-brand-primary transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="opacity-40">|</span>
            <Link href="#" className="hover:text-brand-primary transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
