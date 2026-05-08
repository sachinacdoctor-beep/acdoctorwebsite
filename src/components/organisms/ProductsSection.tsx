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
  const fallbackProducts: ApiProduct[] = Array.from({ length: 3 }, (_, i) => ({
    _id: `fallback-${i}`,
    name: "Inverter Split AC",
    image: "/assets/images/ac_outdoor.png",
    mrp: 42990,
    customerPrice: 34990,
  }));
  const visibleProducts = products.length > 0 ? products : fallbackProducts;

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
      className="py-[28px] md:py-20 bg-[#f5f5f5] dark:bg-[#111] overflow-hidden"
    >
      <div className="max-w-[1362px] mx-auto px-4 sm:px-8 lg:px-10 flex flex-col gap-[16px] md:gap-12">
        {/* Header */}
        <div
          className={[
            "flex flex-row md:flex-col items-center justify-between md:justify-start text-left md:text-center gap-[10px] transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <h2 className="font-semibold text-[26px] md:text-[clamp(28px,3vw,44px)] leading-[34px] text-[#222] dark:text-[#f5f5f5]">
            New Product
          </h2>
          <p className="hidden md:block text-[clamp(15px,1.4vw,20px)] text-[#222]/70 dark:text-[#f5f5f5]/60 max-w-[655px]">
            Explore top-quality inverter ACs with energy-saving performance and
            powerful cooling for every season.
          </p>
          <div className="md:hidden flex items-center gap-3 text-[#e31e25]" aria-hidden="true">
            <span className="text-[18px]">‹</span>
            <span className="text-[18px]">›</span>
          </div>
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
            className="hidden md:block w-[50px] h-[50px] rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            ◀
          </button>

          {/* Products */}
          <div className="w-full flex justify-center">
            <div
              ref={carouselRef}
              className={[
                "pb-1",
                visibleProducts.length <= 4
                  ? "grid grid-cols-3 md:flex md:justify-center md:flex-wrap overflow-hidden gap-[14px] md:gap-[34px]"
                  : "flex gap-[34px] overflow-x-auto snap-x snap-mandatory",
              ].join(" ")}
              style={{ scrollbarWidth: "none" }}
            >
              {loading ? (
                <p className="px-4">Loading...</p>
              ) : (
                visibleProducts.map((product) => (
                  <article
                    key={product._id}
                    className="flex-none w-full md:w-[260px] lg:w-[282px] bg-white dark:bg-[#1a1a1a] rounded-[5px] md:rounded-[10px] shadow-md flex flex-col overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-[123/167] md:aspect-[254/93] md:mt-[9%] md:px-[5%]">
                      <Image
                        src={product.image || "/fallback.png"}
                        alt={product.name}
                        fill
                        className="object-cover md:object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="hidden md:block px-[14px] pt-[10%] pb-[7%]">
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
            className="hidden md:block w-[50px] h-[50px] rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            ▶
          </button>
        </div>

        {/* Page Indicator */}
        <div className="hidden md:block text-center text-sm text-gray-500">
          Page {page} of {totalPages}
        </div>
      </div>
    </section>
  );
}
