import Link from "next/link";

/* ── Figma assets — replace with /public paths before go-live ── */
const IMG_LOGO_MASCOT = "/assets/logo/ac_doctor.png";
const ICON_MAIL = "/assets/icons/mail.png";
const ICON_PHONE = "/assets/icons/phone.png";

/* ── Inline social SVGs matching Figma vector icons ── */
function IconFacebook() {
  return (
    <svg
      width="20"
      height="20"
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
      width="20"
      height="20"
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
      width="16"
      height="16"
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
      width="20"
      height="20"
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
      width="24"
      height="24"
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
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact Us", href: "/#contact" },
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
    <footer aria-label="Site footer" className="bg-[#222] relative">
      {/* ── Cyan accent border on desktop ── */}
      {/* <div className="hidden lg:block absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00d4ff] to-transparent opacity-60"></div> */}

      <div className="max-w-[1600px] mx-auto px-4 sm:px-10 xl:pl-[80px] xl:pr-[100px]">
        {/* ══ DESKTOP: 4-column grid layout ══ */}
        <div className="hidden xl:grid xl:grid-cols-[240px_1fr_1fr_1fr] gap-20 py-[44px] relative">
          {/* ── Col 1: Logo + Brand name + Socials ── */}
          <div className="flex flex-col items-center xl:items-start">
            {/* Logo mark — yellow circle background with mascot centered */}
            <div className="w-[118px] h-[118px] mb-4 shrink-0 rounded-full bg-[#FFDF00] flex items-center justify-center overflow-hidden">
              <img
                src={IMG_LOGO_MASCOT}
                alt="AC Doctor mascot"
                className="w-[85%] h-[85%] object-contain"
              />
            </div>

            {/* Brand name — Inter SemiBold 27px */}
            <p className="font-['Inter',sans-serif] font-semibold text-[27px] text-white leading-normal tracking-[1.08px] mb-[30px] text-center xl:text-left">
              AC DOCTOR
            </p>

            {/* Social icons row */}
            <div className="flex items-center gap-[12px]">
              {SOCIAL.map(({ label, Icon }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-[#888] hover:text-[#e31e25] transition-colors duration-200"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Decorative dotted diagonal line ── */}
          {/* <svg
            className="absolute w-full h-full pointer-events-none"
            style={{
              top: 0,
              left: "240px",
              overflow: "visible",
            }}
          >
            <line
              x1="160"
              y1="80"
              x2="320"
              y2="120"
              stroke="#00d4ff"
              strokeWidth="2"
              strokeDasharray="6,4"
              opacity="0.4"
            />
          </svg> */}

          {/* ── Col 2: Our Links ── */}
          <div className="flex flex-col">
            <h4 className="font-['Poppins',sans-serif] font-medium text-[24px] text-[#f5f5f5] leading-normal mb-[44px]">
              Our Links
            </h4>
            <ul className="flex flex-col gap-[28px]" role="list">
              {OUR_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-['Poppins',sans-serif] font-normal text-[18px] text-[#d9d9d9] hover:text-[#e31e25] transition-colors duration-200 leading-normal"
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
            <ul className="flex flex-col gap-[28px]" role="list">
              {OTHER_PAGES.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-['Poppins',sans-serif] font-normal text-[18px] text-[#d9d9d9] hover:text-[#e31e25] transition-colors duration-200 leading-normal"
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

            <div className="flex flex-col gap-[28px]">
              {/* Company name */}
              <p className="font-['Poppins',sans-serif] font-normal text-[18px] text-[#d9d9d9] leading-normal">
                AC <span className="uppercase">Doctor</span> Private Ltd.
              </p>

              {/* Email */}
              <div className="flex items-start gap-[12px]">
                <img
                  src={ICON_MAIL}
                  alt=""
                  aria-hidden="true"
                  className="w-[16px] h-[16px] shrink-0 object-contain opacity-80 mt-1"
                />
                <a
                  href="mailto:info@acdoctor.in"
                  className="font-['Montserrat',sans-serif] font-medium text-[16px] text-[#d9d9d9] underline decoration-solid hover:text-[#e31e25] transition-colors leading-normal"
                >
                  info@acdoctor.in
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-[12px]">
                <img
                  src={ICON_PHONE}
                  alt=""
                  aria-hidden="true"
                  className="w-[16px] h-[16px] shrink-0 object-contain opacity-80 mt-1"
                />
                <a
                  href="tel:+918959898989"
                  className="font-['Poppins',sans-serif] font-normal text-[16px] text-[#d9d9d9] hover:text-[#e31e25] transition-colors leading-normal"
                >
                  +91 89598 98989
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ══ MOBILE & TABLET: Single column layout ══ */}
        <div className="xl:hidden flex flex-col gap-8 sm:gap-12 py-8 sm:py-12">
          {/* Logo + Brand name + Socials */}
          <div className="flex flex-col items-center">
            <div className="w-[105px] h-[105px] sm:w-[118px] sm:h-[118px] mb-3 sm:mb-4 shrink-0 rounded-full bg-[#FFDF00] flex items-center justify-center overflow-hidden">
              <img
                src={IMG_LOGO_MASCOT}
                alt="AC Doctor mascot"
                className="w-[85%] h-[85%] object-contain"
              />
            </div>

            <p className="font-['Inter',sans-serif] font-semibold text-[24px] sm:text-[27px] text-white leading-normal tracking-[0.96px] sm:tracking-[1.08px] mb-[30px]">
              AC DOCTOR
            </p>

            <div className="flex items-center gap-3 sm:gap-4">
              {SOCIAL.map(({ label, Icon }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-[#888] hover:text-[#e31e25] transition-colors duration-200"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>

          {/* Links in two columns */}
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-8">
            <div className="min-w-0">
              <h4 className="hidden font-['Poppins',sans-serif] font-medium text-[18px] sm:mb-[30px] sm:block sm:text-[24px] text-[#f5f5f5] leading-normal">
                Our Links
              </h4>
              <ul className="flex flex-col gap-4 sm:gap-[20px]" role="list">
                {OUR_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="font-['Poppins',sans-serif] font-normal text-[16px] sm:text-[18px] text-[#d9d9d9] hover:text-[#e31e25] transition-colors duration-200 leading-normal"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <h4 className="hidden font-['Poppins',sans-serif] font-medium text-[18px] sm:mb-[30px] sm:block sm:text-[24px] text-[#f5f5f5] leading-normal">
                Other Pages
              </h4>
              <ul className="flex flex-col gap-4 sm:gap-[20px]" role="list">
                {OTHER_PAGES.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="font-['Poppins',sans-serif] font-normal text-[16px] sm:text-[18px] text-[#d9d9d9] hover:text-[#e31e25] transition-colors duration-200 leading-normal"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Company Info */}
          <div className="flex flex-col">
            <p className="font-['Poppins',sans-serif] font-normal text-[18px] sm:text-[20px] text-[#d9d9d9] leading-normal mb-4">
              AC <span className="uppercase">Doctor</span> Private Ltd.
            </p>

            <div className="flex items-start gap-[12px] mb-4">
              <img
                src={ICON_MAIL}
                alt=""
                aria-hidden="true"
                className="w-[16px] h-[16px] shrink-0 object-contain opacity-80 mt-1"
              />
              <a
                href="mailto:info@acdoctor.in"
                className="font-['Montserrat',sans-serif] font-medium text-[16px] text-[#d9d9d9] underline decoration-solid hover:text-[#e31e25] transition-colors leading-normal"
              >
                info@acdoctor.in
              </a>
            </div>

            <div className="flex items-start gap-[12px]">
              <img
                src={ICON_PHONE}
                alt=""
                aria-hidden="true"
                className="w-[16px] h-[16px] shrink-0 object-contain opacity-80 mt-1"
              />
              <a
                href="tel:+918959898989"
                className="font-['Poppins',sans-serif] font-normal text-[16px] text-[#d9d9d9] hover:text-[#e31e25] transition-colors leading-normal"
              >
                +91 89598 98989
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ══ DIVIDER ══ */}
      <hr className="border-white/10" />

      {/* ══ BOTTOM COPYRIGHT BAR ══ */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-10 xl:pl-[80px] xl:pr-[100px] py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-['Montserrat',sans-serif] font-extralight text-xs sm:text-[13px] text-[#d9d9d9]/60">
            © {year} AC DOCTOR Private LTD. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6 font-['Montserrat',sans-serif] font-extralight text-xs sm:text-[13px] text-[#d9d9d9]/60">
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
