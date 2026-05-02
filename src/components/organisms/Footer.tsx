import Link from "next/link";

/* ── Figma assets — replace with /public paths before go-live ── */
const IMG_LOGO_CIRCLE =
  "https://www.figma.com/api/mcp/asset/b4b31db4-268e-49e1-b8a1-57d9e1520632";
const IMG_LOGO_MASCOT =
  "https://www.figma.com/api/mcp/asset/9cc0729b-a0ab-4489-80f2-6785733f00d2";
const ICON_MAIL =
  "https://www.figma.com/api/mcp/asset/053c0411-c3fe-44f5-8531-6a3ca3ff0db2";
const ICON_PHONE =
  "https://www.figma.com/api/mcp/asset/3635e170-737d-4998-a5ca-f23b8341b00a";

/* ── Inline social SVGs matching Figma vector icons ── */
function IconFacebook() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function IconX() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="#222" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

const SOCIAL = [
  { label: "Facebook", Icon: IconFacebook },
  { label: "LinkedIn", Icon: IconLinkedIn },
  { label: "X", Icon: IconX },
  { label: "Instagram", Icon: IconInstagram },
  { label: "YouTube", Icon: IconYouTube },
];

const OUR_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Contact Us", href: "#contact" },
];

const OTHER_PAGES = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Blogs", href: "#" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Site footer" className="bg-[#222] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-[119px] pt-[44px] pb-[52px]">
        {/* ══ Main 4-column grid ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[260px_1fr_1fr_1fr] gap-12 lg:gap-6 xl:gap-10">
          {/* ── Col 1: Logo + Brand name + Socials ── */}
          <div className="flex flex-col items-center">
            {/* Logo mark — yellow circle background with mascot centered */}
            <div className="w-[118px] h-[118px] mb-4 shrink-0 rounded-full bg-[#FFDF00] flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={"./assets/logo/ac_doctor.png"}
                alt="AC Doctor mascot"
                className="w-[85%] h-[85%] object-contain"
              />
            </div>

            {/* Brand name — Inter SemiBold 27px tracking-[1.08px] */}
            <p className="font-['Inter',sans-serif] font-semibold text-[27px] text-white leading-normal tracking-[1.08px] mb-[30px]">
              AC DOCTOR
            </p>

            {/* Social icons row — gap-[16px], icon colour #d9d9d9 → red on hover */}
            <div className="flex items-center gap-[16px]">
              {SOCIAL.map(({ label, Icon }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-[#d9d9d9] hover:text-[#e31e25] transition-colors duration-200"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Col 2: Our Links ── */}
          <div className="flex flex-col">
            <h4 className="font-['Poppins',sans-serif] font-medium text-[24px] text-[#f5f5f5] leading-normal mb-[44px]">
              Our Links
            </h4>
            <ul className="flex flex-col gap-[30px]" role="list">
              {OUR_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-['Poppins',sans-serif] font-normal text-[22px] text-[#d9d9d9] hover:text-[#e31e25] transition-colors duration-200 leading-normal"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Other Pages ── */}
          <div className="flex flex-col">
            <h4 className="font-['Poppins',sans-serif] font-medium text-[24px] text-[#f5f5f5] leading-normal mb-[44px]">
              Other Pages
            </h4>
            <ul className="flex flex-col gap-[30px]" role="list">
              {OTHER_PAGES.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-['Poppins',sans-serif] font-normal text-[22px] text-[#d9d9d9] hover:text-[#e31e25] transition-colors duration-200 leading-normal"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Global HQ ── */}
          <div className="flex flex-col">
            <h4 className="font-['Poppins',sans-serif] font-medium text-[24px] text-[#f5f5f5] leading-normal mb-[44px]">
              Global HQ
            </h4>

            <div className="flex flex-col gap-[30px]">
              {/* Company name — Poppins Regular 25px */}
              <p className="font-['Poppins',sans-serif] font-normal text-[25px] text-[#d9d9d9] leading-normal">
                AC <span className="uppercase">Doctor</span> Private Ltd.
              </p>

              {/* Email */}
              <div className="flex items-center gap-[14px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={"./assets/icons/mail.png"}
                  alt=""
                  aria-hidden="true"
                  className="w-[20px] h-[20px] shrink-0 object-contain opacity-80"
                />
                <a
                  href="mailto:info@acdoctor.in"
                  className="font-['Montserrat',sans-serif] font-medium text-[22px] text-[#d9d9d9] underline decoration-solid hover:text-[#e31e25] transition-colors leading-normal"
                >
                  info@acdoctor.in
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-[14px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={"./assets/icons/phone.png"}
                  alt=""
                  aria-hidden="true"
                  className="w-[20px] h-[20px] shrink-0 object-contain opacity-80"
                />
                <a
                  href="tel:+918959898989"
                  className="font-['Poppins',sans-serif] font-normal text-[22px] text-[#d9d9d9] hover:text-[#e31e25] transition-colors leading-normal"
                >
                  +91&nbsp;&nbsp;89598 98989
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <hr className="mt-14 mb-6 border-white/10" />

        {/* ── Bottom copyright bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-['Montserrat',sans-serif] font-extralight text-sm text-[#d9d9d9]/60 text-center sm:text-left">
            © {year} AC DOCTOR Private LTD. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 font-['Montserrat',sans-serif] font-extralight text-sm text-[#d9d9d9]/60">
            <Link href="#" className="hover:text-[#e31e25] transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="opacity-30">
              |
            </span>
            <Link href="#" className="hover:text-[#e31e25] transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
