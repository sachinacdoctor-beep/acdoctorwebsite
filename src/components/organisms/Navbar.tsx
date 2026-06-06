"use client";

// import { useCallback, useEffect, useState } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/data";
import {
 BOOKING_CART_EVENT,
 getCartUniqueCount,
 getStoredCart,
} from "@/lib/cart";
import {
 AC_DOCTOR_USER_EVENT,
 clearStoredUserSession,
 getStoredUserSession,
 openLoginModal,
} from "@/lib/auth";

function HeaderCartIcon({
 solidHeader,
 onClick,
}: {
 solidHeader: boolean;
 onClick?: () => void;
}) {
 const [cartCount, setCartCount] = useState(0);

 useEffect(() => {
 const syncCart = () => setCartCount(getCartUniqueCount(getStoredCart()));

 syncCart();
 window.addEventListener(BOOKING_CART_EVENT, syncCart);
 window.addEventListener("storage", syncCart);

 return () => {
 window.removeEventListener(BOOKING_CART_EVENT, syncCart);
 window.removeEventListener("storage", syncCart);
 };
 }, []);

 if (cartCount <= 0) return null;

 return (
 <Link
 href="/cart"
 onClick={onClick}
 aria-label={`View cart with ${cartCount} items`}
 className={[
 "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full xl:h-11 xl:w-11",
 solidHeader
 ? "bg-[#e31e25] text-white shadow-[0_8px_22px_rgba(227,30,37,0.22)]"
 : "border border-white/30 bg-white/10 text-white backdrop-blur-sm",
 ].join(" ")}
 >
 <svg
 width="21"
 height="21"
 viewBox="0 0 24 24"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 aria-hidden="true"
 >
 <path
 d="M6.2 6.4h15l-1.7 8.2a2 2 0 0 1-2 1.6H9a2 2 0 0 1-2-1.7L5.4 3.8H2.8"
 stroke="currentColor"
 strokeWidth="1.8"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 <path
 d="M9.2 20.2h.1M17.2 20.2h.1"
 stroke="currentColor"
 strokeWidth="2.8"
 strokeLinecap="round"
 />
 </svg>
 <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#222] px-1 text-[11px] font-bold leading-none text-white">
 {cartCount}
 </span>
 </Link>
 );
}

function getInitials(name?: string, phone?: string) {
 const safeName = name?.trim();
 if (safeName) {
 return safeName
 .split(/\s+/)
 .slice(0, 2)
 .map((part) => part[0]?.toUpperCase())
 .join("");
 }
 return phone?.slice(-2) || "U";
}

function HeaderProfileMenu({
 solidHeader,
 onClick,
}: {
 solidHeader: boolean;
 onClick?: () => void;
}) {
 const [menuOpen, setMenuOpen] = useState(false);
 const [session, setSession] = useState(getStoredUserSession());
 const dropdownRef = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
 const syncUser = () => setSession(getStoredUserSession());

 syncUser();
 window.addEventListener("storage", syncUser);
 window.addEventListener("focus", syncUser);
 window.addEventListener(AC_DOCTOR_USER_EVENT, syncUser);

 return () => {
 window.removeEventListener("storage", syncUser);
 window.removeEventListener("focus", syncUser);
 window.removeEventListener(AC_DOCTOR_USER_EVENT, syncUser);
 };
 }, []);

 useEffect(() => {
 if (!menuOpen) return;

 const handleClickOutside = (event: MouseEvent | TouchEvent) => {
 if (
 dropdownRef.current &&
 !dropdownRef.current.contains(event.target as Node)
 ) {
 setMenuOpen(false);
 }
 };

 const handleEscape = (event: KeyboardEvent) => {
 if (event.key === "Escape") {
 setMenuOpen(false);
 }
 };

 document.addEventListener("mousedown", handleClickOutside);
 document.addEventListener("touchstart", handleClickOutside);
 document.addEventListener("keydown", handleEscape);

 return () => {
 document.removeEventListener("mousedown", handleClickOutside);
 document.removeEventListener("touchstart", handleClickOutside);
 document.removeEventListener("keydown", handleEscape);
 };
 }, [menuOpen]);

 const closeMenu = () => {
 setMenuOpen(false);
 onClick?.();
 };

 const handleLogout = () => {
 clearStoredUserSession();
 setSession(null);
 setMenuOpen(false);
 onClick?.();
 window.location.href = "/";
 };

 return (
 <div ref={dropdownRef} className="relative shrink-0">
 <button
 type="button"
 aria-label="Open profile menu"
 aria-expanded={menuOpen}
 onClick={() => setMenuOpen((value) => !value)}
 className={[
 "flex h-10 w-10 items-center justify-center rounded-full border font-['Montserrat',sans-serif] text-[13px] font-extrabold xl:h-11 xl:w-11",
 solidHeader
 ? "border-[#e31e25]/20 bg-[#fff5f5] text-[#e31e25] shadow-[0_8px_22px_rgba(0,0,0,0.08)]"
 : "border-white/30 bg-white/10 text-white backdrop-blur-sm",
 ].join(" ")}
 >
 {getInitials(session?.name, session?.phoneNumber)}
 </button>

 {menuOpen ? (
 <div className="absolute right-0 mt-3 w-[240px] overflow-hidden rounded-[22px] border border-[#222]/10 bg-white p-2 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
 <div className="px-3 py-3">
 <p className="font-['Montserrat',sans-serif] text-[13px] font-bold text-[#222]">
 {session?.name || "Guest User"}
 </p>

 <p className="mt-1 font-['Montserrat',sans-serif] text-[12px] text-[#222]/55">
 {session?.phoneNumber
 ? `${session.countryCode || "+91"} ${session.phoneNumber}`
 : "Login from cart checkout"}
 </p>
 </div>

 <Link
 href="/profile"
 onClick={closeMenu}
 className="block rounded-[14px] px-3 py-2.5 font-['Montserrat',sans-serif] text-[13px] font-bold text-[#222] hover:bg-[#f5f5f5]"
 >
 Profile
 </Link>
 <div className="my-1 rounded-[16px] bg-[#f7f7f7] p-2">
 <p className="px-2 pb-1 font-['Montserrat',sans-serif] text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#e31e25]">
 My Booking
 </p>

 <Link
 href="/profile"
 onClick={closeMenu}
 className="block rounded-[12px] px-2 py-2 font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#222]/75 hover:bg-white"
 >
 My Booking
 </Link>
 </div>

 {session?.userId ? (
 <button
 type="button"
 onClick={handleLogout}
 className="mt-1 flex w-full items-center justify-between rounded-[14px] px-3 py-2.5 font-['Montserrat',sans-serif] text-[13px] font-bold text-[#e31e25] hover:bg-[#e31e25]/10"
 >
 <span>Logout</span>
 <span aria-hidden="true">→</span>
 </button>
 ) : (
 <button
 type="button"
 onClick={() => {
 closeMenu();
 openLoginModal();
 }}
 className="mt-1 block w-full rounded-[14px] bg-[#e31e25] px-3 py-2.5 text-center font-['Montserrat',sans-serif] text-[13px] font-bold text-white"
 >
 Login
 </button>
 )}
 </div>
 ) : null}
 </div>
 );
}

type DownloadCtaProps = {
 solid?: boolean;
 className?: string;
};

function DownloadCta({ solid = false, className = "" }: DownloadCtaProps) {
 const tone = solid
 ? "border-[#e31e25]/45 text-[#e31e25]"
 : "border-white/45 text-white";
 const divider = solid ? "bg-[#e31e25]/30" : "bg-white/30";

 return (
 <div
 className={[
 "flex items-center gap-2 rounded-full border px-4 py-2.5 xl:gap-3 xl:px-5 xl:py-3",
 tone,
 className,
 ].join(" ")}
 >
 <span className="font-['Montserrat',sans-serif] whitespace-nowrap text-[13px] font-semibold tracking-wide xl:text-[14px]">
 Download App
 </span>
 <span className={["block h-4 w-px xl:h-5", divider].join(" ")} />
 <a
 href="https://apps.apple.com/in/app/ac-doctor/id6757523448"
 aria-label="Download on the App Store"
 className="flex items-center justify-center hover:opacity-70"
 >
 <svg
 xmlns="http://www.w3.org/2000/svg"
 width="20"
 height="20"
 viewBox="0 0 256 256"
 aria-hidden="true"
 >
 <g transform="scale(5.12)">
 <path
 fill="currentColor"
 d="M44.52734,34.75c-1.07812,2.39453 -1.59766,3.46484 -2.98437,5.57813c-1.94141,2.95313 -4.67969,6.64063 -8.0625,6.66406c-3.01172,0.02734 -3.78906,-1.96484 -7.87891,-1.92969c-4.08594,0.01953 -4.9375,1.96875 -7.95312,1.9375c-3.38672,-0.03125 -5.97656,-3.35156 -7.91797,-6.30078c-5.42969,-8.26953 -6.00391,-17.96484 -2.64844,-23.12109c2.375,-3.65625 6.12891,-5.80469 9.65625,-5.80469c3.59375,0 5.85156,1.97266 8.82031,1.97266c2.88281,0 4.63672,-1.97656 8.79297,-1.97656c3.14063,0 6.46094,1.71094 8.83594,4.66406c-7.76562,4.25781 -6.50391,15.34766 1.33984,18.31641zM31.19531,8.46875c1.51172,-1.94141 2.66016,-4.67969 2.24219,-7.46875c-2.46484,0.16797 -5.34766,1.74219 -7.03125,3.78125c-1.52734,1.85938 -2.79297,4.61719 -2.30078,7.28516c2.69141,0.08594 5.47656,-1.51953 7.08984,-3.59766z"
 />
 </g>
 </svg>
 </a>
 <a
 href="https://play.google.com/store/apps/details?id=com.acdoctor&hl=en_IN"
 aria-label="Get it on Google Play"
 className="flex items-center justify-center hover:opacity-70"
 >
 <svg
 xmlns="http://www.w3.org/2000/svg"
 width="18"
 height="18"
 viewBox="0 0 256 256"
 aria-hidden="true"
 >
 <g transform="scale(5.12)">
 <path
 fill="currentColor"
 d="M7.125,2l21.65625,21.5l5.9375,-5.9375l-26.25,-15.15625c-0.4375,-0.25391 -0.90625,-0.39453 -1.34375,-0.40625zM5.3125,3c-0.19531,0.34766 -0.3125,0.75781 -0.3125,1.21875v41.78125c0,0.33594 0.07031,0.63672 0.1875,0.90625l22.15625,-22zM36.53125,18.59375l-6.34375,6.3125l6.34375,6.28125l7.75,-4.4375c1.10156,-0.63672 1.25781,-1.44531 1.25,-1.875c-0.01172,-0.71094 -0.46094,-1.375 -1.21875,-1.78125c-0.66016,-0.35547 -5.5625,-3.21094 -7.78125,-4.5zM28.78125,26.3125l-21.84375,21.65625c0.36328,-0.01953 0.75781,-0.09766 1.125,-0.3125c0.85547,-0.49609 18.15625,-10.5 18.15625,-10.5l8.53125,-4.90625z"
 />
 </g>
 </svg>
 </a>
 </div>
 );
}

export function Navbar() {
 const [scrolled, setScrolled] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);
 const pathname = usePathname();

 useEffect(() => {
 const onScroll = () => setScrolled(window.scrollY > 40);

 onScroll();
 window.addEventListener("scroll", onScroll, { passive: true });
 return () => window.removeEventListener("scroll", onScroll);
 }, []);

 const handleNavClick = useCallback(() => setMenuOpen(false), []);
 const transparentHeroRoute = pathname === "/" || pathname === "/products";
 const productDetailRoute = pathname.startsWith("/products/");
 const solidHeader = !transparentHeroRoute || scrolled || menuOpen;
 const productIndexHero = pathname === "/products" && !scrolled && !menuOpen;
 const navPillSolid = solidHeader || productIndexHero;

 return (
 <header
 role="banner"
 className={[
 "fixed inset-x-0 top-0 z-50 ",
 solidHeader
 ? "bg-white/95 py-0 shadow-[0_2px_24px_rgba(0,0,0,0.10)] backdrop-blur-md lg:py-3"
 : "bg-transparent py-0 lg:py-4",
 ].join(" ")}
 >
 <div className="relative hidden h-[70px] items-center justify-between gap-4 px-6 lg:flex lg:px-8 xl:px-20">
 <Link
 href="/"
 className={[
 "font-['Montserrat',sans-serif] shrink-0 text-[26px] font-bold leading-[26px] tracking-tight xl:text-[30px]",
 solidHeader ? "text-[#222]" : "text-[#f5f5f5]",
 ].join(" ")}
 >
 AC DOCTOR
 </Link>

 <nav
 aria-label="Primary navigation"
 className={[
 "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-6 rounded-[40px] px-8 py-[10px] xl:gap-[70px] xl:px-[80px]",
 navPillSolid
 ? "bg-white shadow-sm"
 : "border border-white/20 bg-white/10 backdrop-blur-sm",
 ].join(" ")}
 >
 {NAV_ITEMS.map((item) => (
 <Link
 key={item.href}
 href={item.href}
 className={[
 "font-['Montserrat',sans-serif] relative whitespace-nowrap text-[16px] font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after: hover:after:w-full xl:text-[20px]",
 navPillSolid
 ? "text-[#e31e25] hover:text-[#b5161c] after:bg-[#e31e25]"
 : "text-white hover:text-white/80 after:bg-white",
 ].join(" ")}
 >
 {item.label}
 </Link>
 ))}
 </nav>

 <div className="flex shrink-0 items-center gap-3">
 <HeaderCartIcon solidHeader={solidHeader} />
 <HeaderProfileMenu solidHeader={solidHeader} />
 <DownloadCta solid={solidHeader} className="w-fit" />
 </div>
 </div>

 <div className="flex h-[60px] items-center justify-between px-4 lg:hidden">
 <Link
 href="/"
 className={[
 "font-['Montserrat',sans-serif] text-[20px] font-bold leading-[26px] tracking-tight ",
 solidHeader ? "text-[#222]" : "text-[#f5f5f5]",
 ].join(" ")}
 >
 AC DOCTOR
 </Link>

 <div className="flex items-center gap-3">
 <HeaderCartIcon solidHeader={solidHeader} onClick={handleNavClick} />
 <HeaderProfileMenu
 solidHeader={solidHeader}
 onClick={handleNavClick}
 />
 <button
 aria-label={menuOpen ? "Close menu" : "Open menu"}
 aria-expanded={menuOpen}
 onClick={() => setMenuOpen((value) => !value)}
 className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-full"
 >
 <span
 className={[
 "block h-0.5 w-[21px] rounded ",
 solidHeader ? "bg-[#222]" : "bg-white",
 menuOpen ? "translate-y-[7px] rotate-45" : "",
 ].join(" ")}
 />
 <span
 className={[
 "block h-0.5 w-[21px] rounded ",
 solidHeader ? "bg-[#222]" : "bg-white",
 menuOpen ? "opacity-0" : "",
 ].join(" ")}
 />
 <span
 className={[
 "block h-0.5 w-[21px] rounded ",
 solidHeader ? "bg-[#222]" : "bg-white",
 menuOpen ? "-translate-y-[7px] -rotate-45" : "",
 ].join(" ")}
 />
 </button>
 </div>
 </div>

 <div
 className={[
 "overflow-hidden lg:hidden",
 menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
 ].join(" ")}
 >
 <nav
 aria-label="Mobile navigation"
 className="flex flex-col gap-1 bg-white/98 px-5 pb-6 pt-2 backdrop-blur-md"
 >
 {NAV_ITEMS.map((item) => (
 <Link
 key={item.href}
 href={item.href}
 onClick={handleNavClick}
 className="font-['Montserrat',sans-serif] border-b border-gray-100 py-3 text-[18px] font-semibold text-[#e31e25] last:border-0 hover:text-[#b5161c]"
 >
 {item.label}
 </Link>
 ))}
 <div className="mt-4 flex items-center gap-3">
 <HeaderCartIcon solidHeader />
 <HeaderProfileMenu solidHeader onClick={handleNavClick} />
 <DownloadCta solid className="w-fit" />
 </div>
 </nav>
 </div>
 </header>
 );
}
