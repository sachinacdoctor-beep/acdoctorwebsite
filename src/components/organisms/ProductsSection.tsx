"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { ASSETS } from "@/lib/data";
import { useInView } from "@/hooks/useInView";

interface Product {
  id: string;
  name: string;
  specs: string;
  price: string;
  originalPrice: string;
}

const PRODUCTS: Product[] = [
  { id: "1", name: "Daikin 1.5 Ton 5 Star Inverter Split AC", specs: "5 Star • 1.5T • Inverter", price: "₹42,490", originalPrice: "₹52,000" },
  { id: "2", name: "Daikin 1.0 Ton 5 Star Inverter Split AC", specs: "5 Star • 1T • Inverter", price: "₹42,490", originalPrice: "₹52,000" },
  { id: "3", name: "Daikin 2.0 Ton 4 Star Inverter Split AC", specs: "4 Star • 2T • Inverter", price: "₹52,490", originalPrice: "₹65,000" },
  { id: "4", name: "Daikin 1.5 Ton 3 Star Split AC", specs: "3 Star • 1.5T • Fixed Speed", price: "₹32,490", originalPrice: "₹42,000" },
];

export function ProductsSection() {
  const { ref, isInView } = useInView<HTMLElement>();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 520 : -520, behavior: "smooth" });
  }, []);

  return (
    <section
      id="products"
      ref={ref}
      aria-label="New Products"
      className="py-section-y bg-brand-white dark:bg-brand-black overflow-hidden"
    >
      <div className="section-padding max-w-[1680px] mx-auto flex flex-col gap-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div
            className={`transition-all duration-700 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <SectionHeader
              title="New Product"
              subtitle="Browse our curated selection of premium AC units from top brands with best-in-class efficiency ratings."
              align="left"
            />
          </div>

          <div
            className={`flex flex-col gap-5 transition-all duration-700 delay-200 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <Button variant="muted" size="md">
              View all Products
            </Button>
            {/* Arrow controls */}
            <div className="flex gap-4">
              <button
                aria-label="Previous products"
                onClick={() => scroll("left")}
                className="w-14 h-14 rounded-pill bg-black/10 dark:bg-white/10 flex items-center justify-center hover:bg-black/20 transition-colors"
              >
                ←
              </button>
              <button
                aria-label="Next products"
                onClick={() => scroll("right")}
                className="w-14 h-14 rounded-pill bg-black/10 dark:bg-white/10 flex items-center justify-center hover:bg-black/20 transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className={`flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide transition-all duration-700 delay-300 ${isInView ? "opacity-100" : "opacity-0"}`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {PRODUCTS.map((product, i) => (
            <article
              key={product.id}
              className="flex-none w-[85vw] sm:w-[360px] lg:w-[420px] snap-start rounded-card overflow-hidden shadow-card dark:shadow-none dark:border dark:border-white/10 group transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              aria-label={product.name}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-white/5">
                <Image
                  src={ASSETS.productImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 85vw, 420px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {i === 0 && (
                  <Badge variant="primary" className="absolute top-4 left-4">
                    Best Seller
                  </Badge>
                )}
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col gap-3 bg-brand-white dark:bg-brand-black">
                <p className="font-montserrat font-extralight text-sm text-text-primary/60 dark:text-brand-white/50 tracking-wide">
                  {product.specs}
                </p>
                <h3 className="font-montserrat font-semibold text-lg text-text-primary dark:text-brand-white leading-snug line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="font-montserrat font-bold text-2xl text-brand-primary">
                    {product.price}
                  </span>
                  <span className="font-montserrat font-extralight text-base text-text-primary/40 dark:text-brand-white/30 line-through">
                    {product.originalPrice}
                  </span>
                </div>
                <Button variant="muted" size="sm" fullWidth className="mt-2">
                  View Details
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
