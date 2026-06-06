"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BOOKING_CART_EVENT,
  BookingCart,
  OTHER_AC_TYPE_OPTIONS,
  OTHER_PROBLEM_OPTIONS,
  addOtherProblemToCart,
  getCartUniqueCount,
  getStoredCart,
} from "@/lib/cart";
import { BOOKING_CATEGORIES } from "@/lib/data";
import {
  fetchServiceList,
  mapApiServiceToBookingCategory,
} from "@/lib/services";
import type { BookingCategory } from "@/types";

interface OtherServiceScreenProps {
  serviceId: string;
}

export function OtherServiceScreen({ serviceId }: OtherServiceScreenProps) {
  const [bookingCategories, setBookingCategories] =
    useState<BookingCategory[]>(BOOKING_CATEGORIES);
  const [selectedAcTypeId, setSelectedAcTypeId] = useState(
    OTHER_AC_TYPE_OPTIONS[0].id,
  );
  const [selectedProblemId, setSelectedProblemId] = useState(
    OTHER_PROBLEM_OPTIONS[0].id,
  );
  const [description, setDescription] = useState("");
  const [cart, setCart] = useState<BookingCart>({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const otherCategory = useMemo(() => {
    return (
      bookingCategories.find((category) => category.id === serviceId) ??
      bookingCategories.find(
        (category) => String(category.backendKey).toUpperCase() === "OTHER",
      ) ??
      BOOKING_CATEGORIES.find((category) => category.id === "other") ??
      BOOKING_CATEGORIES[0]
    );
  }, [bookingCategories, serviceId]);

  const selectedAcType = useMemo(
    () =>
      OTHER_AC_TYPE_OPTIONS.find((item) => item.id === selectedAcTypeId) ??
      OTHER_AC_TYPE_OPTIONS[0],
    [selectedAcTypeId],
  );

  const selectedProblem = useMemo(
    () =>
      OTHER_PROBLEM_OPTIONS.find((item) => item.id === selectedProblemId) ??
      OTHER_PROBLEM_OPTIONS[0],
    [selectedProblemId],
  );

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        const apiServices = await fetchServiceList();
        const dynamicCategories = apiServices.map(
          mapApiServiceToBookingCategory,
        );
        if (isMounted && dynamicCategories.length) {
          setBookingCategories(dynamicCategories);
        }
      } catch (apiError) {
        console.error("Failed to load Other service id", apiError);
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

  const handleAddToCart = () => {
    if (!selectedAcType?.label) {
      setError("Please select which AC has the issue.");
      return;
    }

    if (!selectedProblem?.label) {
      setError("Please select your AC problem.");
      return;
    }

    addOtherProblemToCart({
      serviceCategory: otherCategory,
      acTypeId: selectedAcType.id,
      acTypeLabel: selectedAcType.label,
      problemId: selectedProblem.id,
      problemLabel: selectedProblem.label,
      description,
    });

    setError("");
    setMessage(
      "Problem added to cart. Book a service will create enquiry for this issue.",
    );
  };

  return (
    <section className="min-h-screen bg-[#f5f5f5] pt-[92px] md:pt-[118px]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-4 pb-14 sm:px-8 lg:px-10">
        <div className="rounded-[28px] bg-white border border-[#222]/10 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.18)] md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <Link
                href="/#services"
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#222]/10 bg-[#f5f5f5] px-4 py-2 font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#222]/90 hover:bg-[#f5f5f5]"
              >
                <span aria-hidden="true">←</span> Back to Services
              </Link>
              <p className="font-['Montserrat',sans-serif] text-[13px] font-semibold uppercase tracking-[0.18em] text-[#e31e25]">
                AC Doctor Other Service
              </p>
              <h1 className="mt-2 font-['Montserrat',sans-serif] text-[32px] font-bold leading-[40px] text-[#222] md:text-[56px] md:leading-[64px]">
                Tell us which AC needs help
              </h1>
              <p className="mt-4 max-w-[680px] font-['Montserrat',sans-serif] text-[14px] leading-[24px] text-[#222]/70 md:text-[17px] md:leading-[28px]">
                Select AC type, choose the issue, and add a short description.
                This will be shown in cart and sent through the enquiry flow.
              </p>
            </div>
            <Link
              href="/cart"
              className="inline-flex items-center justify-center rounded-full bg-[#e31e25] px-5 py-3 font-['Montserrat',sans-serif] text-[14px] font-bold text-white hover:bg-[#c8181e]"
            >
              View Cart ({cartCount})
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[24px] bg-white p-5 shadow-[0px_0px_14px_0px_rgba(0,0,0,0.12)] md:p-7">
            <div className="rounded-[22px] border border-[#e31e25]/12 bg-gradient-to-br from-[#fff7f7] to-white p-4 md:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e31e25] text-[22px] text-white">
                  ❄️
                </div>
                <div>
                  <p className="font-['Montserrat',sans-serif] text-[12px] font-semibold uppercase tracking-[0.16em] text-[#e31e25]">
                    Step 1
                  </p>
                  <h2 className="font-['Montserrat',sans-serif] text-[22px] font-bold text-[#222]">
                    Which AC has the issue?
                  </h2>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {OTHER_AC_TYPE_OPTIONS.map((acType) => {
                  const active = acType.id === selectedAcTypeId;
                  return (
                    <button
                      key={acType.id}
                      type="button"
                      onClick={() => setSelectedAcTypeId(acType.id)}
                      className={[
                        "group flex min-h-[84px] flex-col justify-between rounded-[18px] border px-4 py-3 text-left font-['Montserrat',sans-serif] transition",
                        active
                          ? "border-[#e31e25] bg-[#e31e25] text-white shadow-[0_12px_30px_rgba(227,30,37,0.25)]"
                          : "border-[#222]/10 bg-white text-[#222] hover:border-[#e31e25]/35 hover:bg-[#fff7f7]",
                      ].join(" ")}
                    >
                      <span className="text-[23px]" aria-hidden="true">
                        {active ? "✓" : "AC"}
                      </span>
                      <span className="text-[13px] font-bold leading-[18px]">
                        {acType.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 rounded-[22px] border border-[#222]/10 bg-white p-4 md:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#222] text-[20px] text-white">
                  ⚠️
                </div>
                <div>
                  <p className="font-['Montserrat',sans-serif] text-[12px] font-semibold uppercase tracking-[0.16em] text-[#e31e25]">
                    Step 2
                  </p>
                  <h2 className="font-['Montserrat',sans-serif] text-[22px] font-bold text-[#222]">
                    What problem are you facing?
                  </h2>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {OTHER_PROBLEM_OPTIONS.map((problem) => {
                  const active = problem.id === selectedProblemId;
                  return (
                    <button
                      key={problem.id}
                      type="button"
                      onClick={() => setSelectedProblemId(problem.id)}
                      className={[
                        "rounded-[16px] border px-4 py-3 text-left font-['Montserrat',sans-serif] text-[14px] font-bold",
                        active
                          ? "border-[#e31e25] bg-[#e31e25]/10 text-[#e31e25]"
                          : "border-[#222]/10 bg-[#f5f5f5] text-[#222] hover:border-[#e31e25]/35",
                      ].join(" ")}
                    >
                      {problem.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <label className="font-['Montserrat',sans-serif] text-[14px] font-bold text-[#222]">
                Step 3 · Describe your problem
              </label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Example: The AC is leaking water in the bedroom, and the cooling is also low.
"
                rows={5}
                className="mt-2 w-full resize-none rounded-[18px] border border-[#222]/10 bg-[#f5f5f5] p-4 font-['Montserrat',sans-serif] text-[14px] font-semibold leading-[24px] text-[#222] outline-none placeholder:text-[#222]/40 focus:border-[#e31e25]"
              />
            </div>

            {message ? (
              <div className="mt-4 rounded-[14px] border border-green-500/25 bg-green-50 px-4 py-3 font-['Montserrat',sans-serif] text-[13px] font-semibold text-green-700">
                {message}
              </div>
            ) : null}
            {error ? (
              <div className="mt-4 rounded-[14px] border border-[#e31e25]/25 bg-[#e31e25]/8 px-4 py-3 font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#c8181e]">
                {error}
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center rounded-full bg-[#e31e25] px-6 py-3.5 font-['Montserrat',sans-serif] text-[15px] font-bold text-white hover:bg-[#c8181e]"
              >
                Add Problem to Cart
              </button>
              <Link
                href="/cart"
                className="flex flex-1 items-center justify-center rounded-full border border-[#e31e25]/30 px-6 py-3.5 font-['Montserrat',sans-serif] text-[15px] font-bold text-[#e31e25] hover:bg-[#e31e25] hover:text-white"
              >
                Go to Cart
              </Link>
            </div>
          </div>

          <aside className="h-fit rounded-[24px] bg-white border border-[#222]/10 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.16)] md:p-6 lg:sticky lg:top-[120px]">
            <p className="font-['Montserrat',sans-serif] text-[13px] font-semibold uppercase tracking-[0.18em] text-[#e31e25]">
              Selected Issue
            </p>
            <h3 className="mt-2 font-['Montserrat',sans-serif] text-[26px] font-bold text-[#222]">
              {selectedAcType.label}
            </h3>
            <div className="mt-3 rounded-[18px] border border-[#e31e25]/15 bg-[#e31e25]/8 p-4">
              <p className="font-['Montserrat',sans-serif] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e31e25]">
                Problem
              </p>
              <p className="mt-1 font-['Montserrat',sans-serif] text-[18px] font-bold text-[#222]">
                {selectedProblem.label}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
