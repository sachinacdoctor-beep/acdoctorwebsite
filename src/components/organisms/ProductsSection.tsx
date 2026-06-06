"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { productDetailHref } from "@/lib/productLinks";

interface RawApiProduct {
  _id?: string;
  id?: string;
  productId?: string;
  product_id?: string;
  name?: string;
  productName?: string;
  title?: string;
  image?: string;
  productImage?: string;
  images?: string[];
  mrp?: number | string;
  customerPrice?: number | string;
  price?: number | string;
  sellingPrice?: number | string;
  pricing?: {
    mrp?: number | string;
    customerPrice?: number | string;
    price?: number | string;
    sellingPrice?: number | string;
  };
}

interface ApiProduct {
  _id: string;
  name: string;
  image: string;
  images: string[];
  mrp: number;
  customerPrice: number;
}

const USER_PRODUCTS_API = "https://api.acdoctor.in/api/v1/user/products";
const PRODUCT_IMAGE_FALLBACK = "/assets/images/ac_outdoor.png";

function toPriceNumber(value: number | string | undefined) {
  const price = Number(value ?? 0);
  return Number.isFinite(price) && price > 0 ? price : 0;
}

function getProductImages(product: RawApiProduct) {
  const images = Array.isArray(product.images)
    ? product.images.filter(
        (image): image is string =>
          typeof image === "string" && image.trim().length > 0,
      )
    : [];

  const primaryImage = product.image ?? product.productImage;
  if (typeof primaryImage === "string" && primaryImage.trim().length > 0) {
    images.unshift(primaryImage);
  }

  return Array.from(new Set(images));
}

function normalizeProduct(product: RawApiProduct): ApiProduct {
  const images = getProductImages(product);
  const image = images[0] ?? PRODUCT_IMAGE_FALLBACK;
  const mrp = product.pricing?.mrp ?? product.mrp;
  const customerPrice =
    product.pricing?.customerPrice ??
    product.customerPrice ??
    product.pricing?.sellingPrice ??
    product.sellingPrice ??
    product.pricing?.price ??
    product.price;

  return {
    _id:
      product._id ??
      product.productId ??
      product.product_id ??
      product.id ??
      `product-${product.name ?? product.productName ?? "ac"}`,
    name:
      product.name ??
      product.productName ??
      product.title ??
      "AC Doctor Product",
    image,
    images,
    mrp: toPriceNumber(mrp),
    customerPrice: toPriceNumber(customerPrice),
  };
}

function getProductsFromResponse(data: unknown): RawApiProduct[] {
  if (
    data &&
    typeof data === "object" &&
    "data" in data &&
    Array.isArray((data as { data?: unknown }).data)
  ) {
    return (data as { data: RawApiProduct[] }).data;
  }

  if (
    data &&
    typeof data === "object" &&
    "data" in data &&
    (data as { data?: unknown }).data &&
    typeof (data as { data?: unknown }).data === "object"
  ) {
    return [(data as { data: RawApiProduct }).data];
  }

  return [];
}

function ProductImage({ src, alt }: { src: string | undefined; alt: string }) {
  return (
    <img
      src={src && src.trim().length > 0 ? src : PRODUCT_IMAGE_FALLBACK}
      alt={alt}
      className="h-full w-full object-contain"
      loading="lazy"
    />
  );
}

export function ProductsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const visibleProducts = products;
  const isScrollable = visibleProducts.length > 4;

  const fetchProducts = async () => {
    const controller = new AbortController();
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${USER_PRODUCTS_API}?page=1&limit=10`, {
        signal: controller.signal,
        cache: "no-store",
      });
      const data = await res.json();
      const apiProducts = getProductsFromResponse(data).map((product) =>
        normalizeProduct(product),
      );
      setProducts(apiProducts);
    } catch (err) {
      console.error("Error fetching products", err);
      setError("Products are not available right now.");
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 316 : -316, behavior: "smooth" });
  }, []);

  return (
    <section
      id="products"
      aria-label="New Products"
      className="overflow-hidden bg-[#f5f5f5] py-[28px] md:py-16 xl:py-[80px]"
    >
      <div className="mx-auto flex max-w-[1362px] flex-col gap-[16px] px-5 sm:px-8 md:gap-8 lg:px-10 xl:gap-0">
        <div className="flex items-center justify-between gap-4 md:mx-auto md:w-full md:max-w-[655px] md:flex-col md:justify-start md:text-center">
          <h2 className="font-semibold text-[30px] leading-[38px] text-[#222] md:w-full md:text-[40px] md:leading-[56px] xl:text-[44px] xl:leading-[66px]">
            New Product
          </h2>

          <p className="hidden w-full text-center text-[20px] font-normal leading-[32px] text-[#222] md:block">
            Explore top-quality inverter ACs with energy-saving performance and
            powerful cooling for every season.
          </p>

          <div className="flex items-center gap-[10px] md:hidden">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous products"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent hover:opacity-75"
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
              onClick={() => scroll("right")}
              aria-label="Next products"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent hover:opacity-75"
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

        <div className="relative flex items-center md:mt-2 xl:mt-[88px]">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous products"
            className="absolute left-0 top-1/2 z-10 hidden h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-full bg-transparent shadow-none hover:opacity-75 xl:flex"
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

          <div className="flex w-full justify-center xl:px-[110px]">
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
                <p className="col-span-3 px-4 text-sm text-[#222]/70">
                  Loading...
                </p>
              ) : error ? (
                <p className="col-span-3 px-4 text-sm text-[#222]/70">
                  {error}
                </p>
              ) : visibleProducts.length === 0 ? (
                <p className="col-span-3 px-4 text-sm text-[#222]/70">
                  No products found.
                </p>
              ) : (
                visibleProducts.map((product) => {
                  const cardContent = (
                    <>
                      <div className="relative mx-[7px] mt-[17px] aspect-[116/64] md:mx-auto md:mt-[35px] md:h-[93px] md:w-[80%] md:aspect-auto xl:w-[254px]">
                        <ProductImage src={product.image} alt={product.name} />
                      </div>

                      <div className="px-[7px] pb-[12px] pt-[12px] md:flex md:flex-1 md:flex-col md:px-[14px] md:pb-[27px] md:pt-[41px]">
                        <p className="mb-[8px] line-clamp-2 font-semibold text-[10px] leading-[12px] text-[#222] md:mb-0 md:min-h-[48px] md:text-[18px] md:leading-[22px]">
                          {product.name}
                        </p>

                        <div className="mb-[10px] flex items-center gap-[5px] md:mb-0 md:mt-[14px] md:gap-[6px]">
                          <span className="text-[14px] font-semibold leading-[18px] text-[#222] md:text-[26px] md:leading-[38px]">
                            &#8377;
                            {product.customerPrice.toLocaleString("en-IN")}
                          </span>
                          {product.mrp > 0 &&
                            product.mrp > product.customerPrice && (
                              <span className="text-[7px] text-[#222]/60 line-through md:text-[16px] md:leading-[22px]">
                                &#8377;{product.mrp.toLocaleString("en-IN")}
                              </span>
                            )}
                        </div>
                      </div>
                    </>
                  );

                  return (
                    <article
                      key={product._id}
                      className={
                        isScrollable
                          ? "group h-full w-[calc(33.333vw_-_23px)] flex-none sm:w-[180px] md:w-[282px]"
                          : "group h-full w-full"
                      }
                    >
                      <div className="flex h-full flex-col overflow-hidden rounded-[5px] bg-white shadow-sm hover:shadow-[0px_10px_20px_rgba(0,0,0,0.12)] md:min-h-[383px] md:rounded-[10px] md:shadow-[0px_0px_14px_0px_rgba(0,0,0,0.15)] xl:h-[383px]">
                        <Link
                          href={productDetailHref(product._id)}
                          className="block flex-1"
                        >
                          {cardContent}
                        </Link>

                        <div className="px-[7px] pb-[12px] pt-[12px] md:px-[14px] md:pb-[27px] md:pt-[18px]">
                          <Link
                            href={productDetailHref(product._id)}
                            className="inline-flex w-full items-center justify-center gap-[5px] rounded-full border border-[#e31e25] bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#e31e25] hover:bg-[#ffe5e5] md:px-5 md:py-3 md:text-[14px] md:leading-[20px]"
                          >
                            View Details
                            <span aria-hidden="true">&rarr;</span>
                          </Link>
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
            onClick={() => scroll("right")}
            aria-label="Next products"
            className="absolute right-0 top-1/2 z-10 hidden h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-full bg-transparent shadow-none hover:opacity-75 xl:flex"
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
      </div>
    </section>
  );
}
