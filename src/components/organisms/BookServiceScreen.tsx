"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BOOKING_CATEGORIES, AC_BOOKING_ITEMS } from "@/lib/data";
import { fetchServiceList, isHiddenFrontendService, mapApiServiceToBookingCategory } from "@/lib/services";
import type { BookingCategory } from "@/types";
import {
 addBookingItemToCart,
 BOOKING_CART_EVENT,
 BookingCart,
 createCartKey,
 getCartUniqueCount,
 getStoredCart,
 updateStoredCartItemQuantity,
} from "@/lib/cart";

interface BookServiceScreenProps {
 serviceId: string;
}

function CartIcon({ count }: { count: number }) {
 return (
 <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#e31e25] text-white shadow-[0_10px_28px_rgba(227,30,37,0.28)] md:h-12 md:w-12">
 <svg
 width="22"
 height="22"
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
 {count > 0 ? (
 <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#222] px-1 text-[11px] font-bold leading-none text-white">
 {count}
 </span>
 ) : null}
 </div>
 );
}

export function BookServiceScreen({ serviceId }: BookServiceScreenProps) {
 const [bookingCategories, setBookingCategories] =
 useState<BookingCategory[]>(
 BOOKING_CATEGORIES.filter((category) => !isHiddenFrontendService(category))
 );

 const activeCategory =
 bookingCategories.find((category) => category.id === serviceId) ??
 bookingCategories[0] ??
 BOOKING_CATEGORIES[0];

 const [cart, setCart] = useState<BookingCart>({});

 useEffect(() => {
 let isMounted = true;

 const loadServices = async () => {
 try {
 const apiServices = await fetchServiceList();
 const dynamicCategories = apiServices
 .map(mapApiServiceToBookingCategory)
 .filter((category) => !isHiddenFrontendService(category));

 if (isMounted && dynamicCategories.length) {
 setBookingCategories(dynamicCategories);
 console.log("AC Doctor booking categories ===>", dynamicCategories);
 }
 } catch (error) {
 console.error("Failed to load booking services", error);
 }
 };

 loadServices();

 return () => {
 isMounted = false;
 };
 }, []);

 useEffect(() => {
 const syncCart = () => setCart(getStoredCart());

 syncCart();
 window.addEventListener(BOOKING_CART_EVENT, syncCart);
 window.addEventListener("storage", syncCart);

 return () => {
 window.removeEventListener(BOOKING_CART_EVENT, syncCart);
 window.removeEventListener("storage", syncCart);
 };
 }, []);

 const cartCount = useMemo(() => getCartUniqueCount(cart), [cart]);

 const addToCart = (itemId: string) => {
 const updatedCart = addBookingItemToCart({
 serviceId: activeCategory.id,
 itemId,
 quantity: 1,
 serviceCategory: activeCategory,
 });

 console.log("AC Doctor cart item service data ===>", {
 service_id: activeCategory.backendId,
 serviceType: activeCategory.backendKey,
 acType: AC_BOOKING_ITEMS.find((item) => item.id === itemId)?.name,
 quantity: 1,
 });

 setCart(updatedCart);
 };

 const updateCartQuantity = (
 cartKey: string,
 currentQuantity: number,
 type: "minus" | "plus"
 ) => {
 const nextQuantity =
 type === "minus" ? currentQuantity - 1 : currentQuantity + 1;
 setCart(updateStoredCartItemQuantity(cartKey, nextQuantity));
 };

 return (
 <section className="min-h-screen bg-[#f5f5f5] pt-[92px] md:pt-[118px]">
 <div className="mx-auto flex max-w-[1362px] flex-col gap-6 px-4 pb-14 sm:px-8 lg:px-10">
 <div className="relative overflow-hidden rounded-[24px] bg-white border border-[#222]/10 px-5 py-7 shadow-[0_20px_70px_rgba(0,0,0,0.18)] md:rounded-[34px] md:px-10 md:py-11">
 <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#e31e25]/35 blur-3xl" />
 <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#f5f5f5] blur-3xl" />

 <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
 <div className="max-w-[780px]">
 <Link
 href="/#services"
 className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#222]/10 bg-[#f5f5f5] px-4 py-2 font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#222]/90 backdrop-blur-sm hover:bg-[#f5f5f5]"
 >
 <span aria-hidden="true">←</span> Back to services
 </Link>
 <p className="font-['Montserrat',sans-serif] text-[13px] font-semibold uppercase tracking-[0.18em] text-[#e31e25] md:text-[14px]">
 Book AC Service
 </p>
 <h1 className="mt-2 font-['Montserrat',sans-serif] text-[30px] font-bold leading-[38px] text-[#222] md:text-[clamp(42px,4.2vw,68px)] md:leading-[1.08]">
 {activeCategory.title} Booking
 </h1>
 <p className="mt-4 max-w-[690px] font-['Montserrat',sans-serif] text-[14px] leading-[24px] text-[#222]/70 md:text-[18px] md:leading-[30px]">
 Select your AC type and add it to cart. Quantity controls will appear after the item is added.
 </p>
 </div>

 {cartCount > 0 ? (
 <Link
 href="/cart"
 className="flex items-center justify-between gap-4 rounded-[22px] border border-[#222]/10 bg-[#f5f5f5] p-4 backdrop-blur-md hover:bg-[#f5f5f5] md:min-w-[260px] md:p-5"
 >
 <div className="flex items-center gap-3">
 <CartIcon count={cartCount} />
 <div>
 <p className="font-['Montserrat',sans-serif] text-[13px] font-medium text-[#222]/60">
 Cart Items
 </p>
 <p className="font-['Montserrat',sans-serif] text-[24px] font-bold leading-none text-[#222]">
 {cartCount}
 </p>
 </div>
 </div>
 <span className="rounded-full bg-white px-4 py-2 font-['Montserrat',sans-serif] text-[12px] font-bold text-[#e31e25]">
 View Cart
 </span>
 </Link>
 ) : null}
 </div>
 </div>

 <div className="sticky top-[68px] z-30 -mx-4 overflow-x-auto bg-[#f5f5f5]/92 px-4 py-3 backdrop-blur-md md:top-[96px] sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
 <div className="flex min-w-max gap-3">
 {bookingCategories.map((category) => {
 const active = category.id === activeCategory.id;
 return (
 <Link
 key={category.id}
 href={`/book-service/${category.id}`}
 className={[
 "rounded-full border px-5 py-3 font-['Montserrat',sans-serif] text-[13px] font-semibold md:text-[15px]",
 active
 ? "border-[#e31e25] bg-[#e31e25] text-white shadow-[0_10px_24px_rgba(227,30,37,0.25)]"
 : "border-[#222]/10 bg-white text-[#222] hover:border-[#e31e25]/50 hover:text-[#e31e25]",
 ].join(" ")}
 >
 {category.title}
 </Link>
 );
 })}
 </div>
 </div>

 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
 {AC_BOOKING_ITEMS.map((item) => {
 const cartKey = createCartKey(activeCategory.id, item.id);
 const cartQty = cart[cartKey]?.quantity ?? 0;

 return (
 <article
 key={item.id}
 className="group flex min-h-[360px] flex-col overflow-hidden rounded-[20px] bg-[#fdfdfd] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.15)] hover:shadow-[0px_0px_24px_0px_rgba(227,30,37,0.18)] md:rounded-[24px]"
 >
 <div className="relative flex h-[154px] items-center justify-center bg-[#e31e25]/8 p-5 md:h-[176px]">
 {item.image ? (
 <Image
 src={item.image}
 alt={item.name}
 width={210}
 height={140}
 className="max-h-[130px] w-auto object-contain"
 />
 ) : (
 <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#e31e25]/10 text-[42px]">
 {item.icon}
 </div>
 )}
 {cartQty > 0 ? (
 <span className="absolute right-4 top-4 rounded-full bg-[#222] px-3 py-1 font-['Montserrat',sans-serif] text-[11px] font-bold text-white">
 Qty {cartQty}
 </span>
 ) : null}
 </div>

 <div className="flex flex-1 flex-col p-4 md:p-5">
 <div className="flex-1">
 <p className="font-['Montserrat',sans-serif] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e31e25]">
 {activeCategory.title}
 </p>
 <h2 className="mt-2 font-['Montserrat',sans-serif] text-[20px] font-semibold leading-[27px] text-[#222] md:text-[24px] md:leading-[32px]">
 {item.name}
 </h2>
 <p className="mt-2 font-['Montserrat',sans-serif] text-[13px] leading-[22px] text-[#222]/65 md:text-[14px]">
 {item.description}
 </p>
 </div>

 <div className="mt-5 flex items-center gap-2">
 {cartQty > 0 ? (
 <Link
 href="/cart"
 className="flex h-11 w-[118px] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#e31e25] px-3 font-['Montserrat',sans-serif] text-[12px] font-semibold text-white hover:bg-[#c8181e] hover:shadow-[0_12px_28px_rgba(227,30,37,0.22)] sm:w-[126px] md:text-[13px]"
 >
 Go to Cart
 <svg
 width="18"
 height="18"
 viewBox="0 0 20 20"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 aria-hidden="true"
 >
 <path
 d="M4.167 10h11.666M10.833 5l5 5-5 5"
 stroke="currentColor"
 strokeWidth="1.5"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 </svg>
 </Link>
 ) : (
 <button
 type="button"
 onClick={() => addToCart(item.id)}
 className="flex h-11 min-w-0 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#e31e25] px-4 font-['Montserrat',sans-serif] text-[13px] font-semibold text-white hover:bg-[#c8181e] hover:shadow-[0_12px_28px_rgba(227,30,37,0.22)] md:text-[15px]"
 >
 Add to Cart
 <svg
 width="18"
 height="18"
 viewBox="0 0 20 20"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 aria-hidden="true"
 >
 <path
 d="M4.167 10h11.666M10.833 5l5 5-5 5"
 stroke="currentColor"
 strokeWidth="1.5"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 </svg>
 </button>
 )}

 {cartQty > 0 ? (
 <div className="flex h-11 shrink-0 items-center overflow-hidden rounded-full border border-[#222]/10 bg-[#f5f5f5]">
 <button
 type="button"
 onClick={() => updateCartQuantity(cartKey, cartQty, "minus")}
 className="flex h-11 w-8 items-center justify-center text-[18px] font-semibold text-[#e31e25] hover:bg-[#e31e25]/10 sm:w-9 md:w-10"
 aria-label={`Decrease ${item.name} quantity`}
 >
 −
 </button>
 <span className="min-w-[26px] text-center font-['Montserrat',sans-serif] text-[14px] font-bold text-[#222] sm:min-w-[30px] md:min-w-[32px]">
 {cartQty}
 </span>
 <button
 type="button"
 onClick={() => updateCartQuantity(cartKey, cartQty, "plus")}
 className="flex h-11 w-8 items-center justify-center text-[18px] font-semibold text-[#e31e25] hover:bg-[#e31e25]/10 sm:w-9 md:w-10"
 aria-label={`Increase ${item.name} quantity`}
 >
 +
 </button>
 </div>
 ) : null}
 </div> </div>
 </article>
 );
 })}
 </div>
 </div>
 </section>
 );
}
