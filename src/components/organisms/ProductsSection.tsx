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

  const fallbackProducts: ApiProduct[] = Array.from({ length: 4 }, (_, i) => ({
    _id: `fallback-${i}`,
    name: "HITACHI IZEN 3500STXL Convertible 1.5 Ton 3 Star Inverter Split AC with Octa Sensor",
    image: "/assets/images/ac_outdoor.png",
    mrp: 24000,
    customerPrice: 21000,
  }));

  const visibleProducts = products.length > 0 ? products : fallbackProducts;

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
      className="overflow-hidden bg-[#f5f5f5] py-[28px] md:py-[80px] dark:bg-[#111]"
    >
      <div className="mx-auto flex max-w-[1362px] flex-col gap-[16px] px-5 sm:px-8 md:px-0 md:gap-0">
        <div
          className={[
            "flex items-center justify-between gap-4 transition-all duration-700 md:mx-auto md:w-[655px] md:flex-col md:justify-start md:text-center",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <h2 className="font-semibold text-[30px] leading-[38px] text-[#222] md:w-full md:text-[44px] md:leading-[66px] dark:text-[#f5f5f5]">
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
            "relative flex items-center transition-all delay-200 duration-700 md:mt-[88px] md:h-[383px]",
            isInView ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <button
            type="button"
            onClick={() => moveProducts("left")}
            aria-label="Previous products"
            className="absolute left-0 top-1/2 z-10 hidden h-[50px] w-[50px] -translate-y-1/2 items-center justify-center transition-opacity hover:opacity-75 md:flex"
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

          <div className="flex w-full justify-center md:px-[69px]">
            <div
              ref={carouselRef}
              className={[
                "w-full pb-1 md:h-[383px] md:max-w-[1221px] md:pb-0",
                visibleProducts.length <= 4
                  ? "grid grid-cols-3 gap-[14px] overflow-hidden max-md:[&>*:nth-child(n+4)]:hidden md:flex md:flex-nowrap md:justify-start md:gap-[34px]"
                  : "flex gap-[14px] overflow-x-auto snap-x snap-mandatory max-md:[&>*:nth-child(n+4)]:hidden md:gap-[34px]",
              ].join(" ")}
              style={{ scrollbarWidth: "none" }}
            >
              {loading ? (
                <p className="col-span-3 px-4 text-sm text-[#222]/70 dark:text-[#f5f5f5]/70">
                  Loading...
                </p>
              ) : (
                visibleProducts.map((product) => (
                  <article
                    key={product._id}
                    className="flex w-full flex-none flex-col overflow-hidden rounded-[5px] bg-white shadow-sm md:h-[383px] md:w-[282px] md:rounded-[10px] md:shadow-[0px_0px_14px_0px_rgba(0,0,0,0.15)] dark:bg-[#1a1a1a]"
                  >
                    <div className="relative mx-[7px] mt-[17px] aspect-[116/64] md:mx-auto md:mt-[35px] md:h-[93px] md:w-[254px] md:aspect-auto">
                      <Image
                        src={product.image || "/fallback.png"}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 30vw, 282px"
                      />
                    </div>

                    <div className="px-[7px] pb-[12px] pt-[12px] md:flex md:flex-1 md:flex-col md:px-[14px] md:pb-[27px] md:pt-[41px]">
                      <p className="mb-[8px] line-clamp-4 font-semibold text-[10px] leading-[12px] text-[#222] md:mb-0 md:min-h-[88px] md:text-[18px] md:leading-[22px] dark:text-[#f5f5f5]">
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

                      <button
                        type="button"
                        onClick={() =>
                          document
                            .getElementById("book")
                            ?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="inline-flex w-fit items-center gap-[5px] border-b border-[#e31e25] text-[8px] font-semibold leading-[12px] text-[#e31e25] md:mt-auto md:gap-[10px] md:pb-[2px] md:text-[16px] md:leading-[22px]"
                      >
                        Book Now
                        <span aria-hidden="true">&rarr;</span>
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => moveProducts("right")}
            aria-label="Next products"
            className="absolute right-0 top-1/2 z-10 hidden h-[50px] w-[50px] -translate-y-1/2 items-center justify-center transition-opacity hover:opacity-75 md:flex"
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
