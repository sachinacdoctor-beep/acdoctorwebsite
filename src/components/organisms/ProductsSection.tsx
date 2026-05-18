"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

  const fallbackProducts: ApiProduct[] = Array.from({ length: 4 }, (_, i) => ({
    _id: `fallback-${i}`,
    name: "HITACHI IZEN 3500STXL Convertible 1.5 Ton 3 Star Inverter Split AC with Octa Sensor",
    image: "/assets/images/ac_outdoor.png",
    mrp: 24000,
    customerPrice: 21000,
  }));

  const visibleProducts = products.length > 0 ? products : fallbackProducts;
  const isScrollable = visibleProducts.length > 4;

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

  const scroll = useCallback((dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 316 : -316, behavior: "smooth" });
  }, []);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const moveProducts = (dir: "left" | "right") => {
    scroll(dir);
    if (dir === "right") {
      handleNext();
    } else {
      handlePrev();
    }
  };

  return (
    <section
      id="products"
      ref={ref}
      aria-label="New Products"
      className="overflow-hidden bg-[#f5f5f5] py-[28px] md:py-16 xl:py-[80px] dark:bg-[#111]"
    >
      <div className="mx-auto flex max-w-[1362px] flex-col gap-[16px] px-5 sm:px-8 md:gap-8 lg:px-10 xl:gap-0">
        <div
          className={[
            "flex items-center justify-between gap-4 transition-all duration-700 md:mx-auto md:w-full md:max-w-[655px] md:flex-col md:justify-start md:text-center",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <h2 className="font-semibold text-[30px] leading-[38px] text-[#222] md:w-full md:text-[40px] md:leading-[56px] xl:text-[44px] xl:leading-[66px] dark:text-[#f5f5f5]">
            New Product
          </h2>

          <p className="hidden w-full text-center text-[20px] font-normal leading-[32px] text-[#222] md:block dark:text-[#f5f5f5]/70">
            Explore top-quality inverter ACs with energy-saving performance and
            powerful cooling for every season.
          </p>

          <div className="flex items-center gap-[10px] md:hidden">
            <button
              type="button"
              onClick={() => moveProducts("left")}
              aria-label="Previous products"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#e31e25]/10"
            >
              <Image
                src="/assets/icons/left_arrow.png"
                alt=""
                width={18}
                height={18}
                className="object-contain"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              onClick={() => moveProducts("right")}
              aria-label="Next products"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#e31e25]/10"
            >
              <Image
                src="/assets/icons/right_arrow.png"
                alt=""
                width={18}
                height={18}
                className="object-contain"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div
          className={[
            "relative flex items-center transition-all delay-200 duration-700 md:mt-2 xl:mt-[88px]",
            isInView ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <button
            type="button"
            onClick={() => moveProducts("left")}
            aria-label="Previous products"
            className="absolute left-0 top-1/2 z-10 hidden h-[50px] w-[50px] -translate-y-1/2 items-center justify-center transition-opacity hover:opacity-75 xl:flex"
          >
            <Image
              src="/assets/icons/left_arrow.png"
              alt=""
              width={50}
              height={50}
              className="object-contain"
              aria-hidden="true"
            />
          </button>

          <div className="flex w-full justify-center xl:px-[69px]">
            <div
              ref={carouselRef}
              className={[
                "w-full pb-1 md:pb-0",
                isScrollable
                  ? "flex gap-[14px] overflow-x-auto snap-x snap-mandatory max-md:[&>*:nth-child(n+4)]:hidden md:gap-6 xl:gap-[34px]"
                  : "grid grid-cols-3 gap-[14px] overflow-visible max-md:[&>*:nth-child(n+4)]:hidden md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:max-w-[1221px] xl:grid-cols-4 xl:gap-[34px]",
              ].join(" ")}
              style={{ scrollbarWidth: "none" }}
            >
              {loading ? (
                <p className="col-span-3 px-4 text-sm text-[#222]/70 dark:text-[#f5f5f5]/70">
                  Loading...
                </p>
              ) : (
                visibleProducts.map((product) => {
                  const hasProduct = !product._id.startsWith("fallback-");
                  const cardContent = (
                    <>
                      <div className="relative mx-[7px] mt-[17px] aspect-[116/64] md:mx-auto md:mt-[35px] md:h-[93px] md:w-[80%] md:aspect-auto xl:w-[254px]">
                        <Image
                          src={product.image || "/fallback.png"}
                          alt={product.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 30vw, 282px"
                        />
                      </div>

                      <div className="px-[7px] pb-[12px] pt-[12px] md:flex md:flex-1 md:flex-col md:px-[14px] md:pb-[27px] md:pt-[41px]">
                        <p className="mb-[8px] line-clamp-2 font-semibold text-[10px] leading-[12px] text-[#222] md:mb-0 md:min-h-[48px] md:text-[18px] md:leading-[22px] dark:text-[#f5f5f5]">
                          {product.name}
                        </p>

                        <div className="mb-[10px] flex items-center gap-[5px] md:mb-0 md:mt-[14px] md:gap-[6px]">
                          <span className="text-[14px] font-semibold leading-[18px] text-[#222] md:text-[26px] md:leading-[38px] dark:text-[#f5f5f5]">
                            &#8377;{product.customerPrice.toLocaleString()}
                          </span>
                          <span className="text-[7px] text-[#222]/60 line-through md:text-[16px] md:leading-[22px] dark:text-[#f5f5f5]/60">
                            &#8377;{product.mrp.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </>
                  );

                  return (
                    <article key={product._id} className={isScrollable ? "group h-full w-[calc(33.333vw_-_23px)] flex-none sm:w-[180px] md:w-[282px]" : "group h-full w-full"}>
                      <div className="flex h-full flex-col overflow-hidden rounded-[5px] bg-white shadow-sm transition hover:shadow-[0px_10px_20px_rgba(0,0,0,0.12)] md:min-h-[383px] md:rounded-[10px] md:shadow-[0px_0px_14px_0px_rgba(0,0,0,0.15)] xl:h-[383px] dark:bg-[#1a1a1a]">
                        {hasProduct ? (
                          <Link
                            href={`/products/${product._id}`}
                            className="block flex-1"
                          >
                            {cardContent}
                          </Link>
                        ) : (
                          <div className="flex-1">{cardContent}</div>
                        )}

                        <div className="px-[7px] pb-[12px] pt-[12px] md:px-[14px] md:pb-[27px] md:pt-[18px]">
                          <button
                            type="button"
                            onClick={() =>
                              document
                                .getElementById("book")
                                ?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="inline-flex w-full items-center justify-center gap-[5px] rounded-full border border-[#e31e25] bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#e31e25] transition hover:bg-[#ffe5e5] md:px-5 md:py-3 md:text-[14px] md:leading-[20px]"
                          >
                            Book Now
                            <span aria-hidden="true">&rarr;</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => moveProducts("right")}
            aria-label="Next products"
            className="absolute right-0 top-1/2 z-10 hidden h-[50px] w-[50px] -translate-y-1/2 items-center justify-center transition-opacity hover:opacity-75 xl:flex"
          >
            <Image
              src="/assets/icons/right_arrow.png"
              alt=""
              width={50}
              height={50}
              className="object-contain"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="hidden text-center text-sm text-gray-500 md:block">
          Page {page} of {totalPages}
        </div>
      </div>
    </section>
  );
}
