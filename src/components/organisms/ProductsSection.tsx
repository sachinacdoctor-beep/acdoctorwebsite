"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

interface ApiProduct {
  _id: string;
  name: string;
  image: string;
  mrp: number;
  customerPrice: number;
}

export function ProductsSection() {
  const { ref, isInView } = useInView<HTMLElement>();
  const carouselRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // 👉 Fetch API
  const fetchProducts = async (pageNumber: number) => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://api.acdoctor.in/api/v1/admin/shop/product-list?page=${pageNumber}&limit=10`,
      );
      const data = await res.json();

      if (data.status) {
        setProducts(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  // 👉 Scroll carousel
  const scroll = useCallback((dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 316 : -316, behavior: "smooth" });
  }, []);

  // 👉 Pagination handlers
  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <section
      id="products"
      ref={ref}
      aria-label="New Products"
      className="py-16 md:py-20 bg-[#f5f5f5] dark:bg-[#111] overflow-hidden"
    >
      <div className="max-w-[1362px] mx-auto px-6 sm:px-8 lg:px-10 flex flex-col gap-12">
        {/* Header */}
        <div
          className={[
            "flex flex-col items-center text-center gap-[10px] transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <h2 className="font-semibold text-[clamp(28px,3vw,44px)] text-[#222] dark:text-[#f5f5f5]">
            New Product
          </h2>
          <p className="text-[clamp(15px,1.4vw,20px)] text-[#222]/70 dark:text-[#f5f5f5]/60 max-w-[655px]">
            Explore top-quality inverter ACs with energy-saving performance and
            powerful cooling for every season.
          </p>
        </div>

        {/* Carousel */}
        <div
          className={[
            "relative flex items-center gap-4 transition-all duration-700 delay-200",
            isInView ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          {/* Left */}
          <button
            onClick={() => {
              scroll("left");
              handlePrev();
            }}
            className="w-[50px] h-[50px] rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            ◀
          </button>

          {/* Products */}
          <div className="w-full flex justify-center">
            <div
              ref={carouselRef}
              className={[
                "flex gap-[34px] pb-1",
                products.length <= 4
                  ? "justify-center flex-wrap overflow-hidden"
                  : "overflow-x-auto snap-x snap-mandatory",
              ].join(" ")}
              style={{ scrollbarWidth: "none" }}
            >
              {loading ? (
                <p className="px-4">Loading...</p>
              ) : (
                products.map((product) => (
                  <article
                    key={product._id}
                    className="flex-none w-[260px] lg:w-[282px] bg-white dark:bg-[#1a1a1a] rounded-[10px] shadow-md flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-[254/93] mt-[9%] px-[5%]">
                      <Image
                        src={product.image || "/fallback.png"}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="px-[14px] pt-[10%] pb-[7%]">
                      <p className="font-semibold text-[16px] mb-3">
                        {product.name}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[20px] font-semibold">
                          ₹{product.customerPrice.toLocaleString()}
                        </span>
                        <span className="line-through text-sm opacity-60">
                          ₹{product.mrp.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          document
                            .getElementById("book")
                            ?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="text-red-600 border-b border-red-600"
                      >
                        Book Now →
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          {/* Right */}
          <button
            onClick={() => {
              scroll("right");
              handleNext();
            }}
            className="w-[50px] h-[50px] rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            ▶
          </button>
        </div>

        {/* Page Indicator */}
        <div className="text-center text-sm text-gray-500">
          Page {page} of {totalPages}
        </div>
      </div>
    </section>
  );
}
