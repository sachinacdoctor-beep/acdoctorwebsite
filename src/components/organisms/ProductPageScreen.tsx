"use client";

import { useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";

export interface ProductPageProduct {
  _id: string;
  brand?: string;
  model?: string;
  name: string;
  description?: string;
  image: string;
  images?: string[];
  mrp: number;
  customerPrice: number;
  acType?: string;
  tonnage?: string;
  starRating?: number;
  compressorType?: string;
  refrigerant?: string;
  noiseLevel?: string;
  inverter?: boolean;
}

interface ProductPageScreenProps {
  product?: ProductPageProduct;
  similarProducts?: ProductPageProduct[];
}

const FALLBACK_PRODUCT: ProductPageProduct = {
  _id: "fallback-detail",
  brand: "Daikin",
  model: "2026 Model",
  name: "LG 3 Star (1.5) Split AC, AI Convertible, Auto Clean, Gold Fin+, Diet Mode+, Viraat Mode, 4.4 kW, 2026 Model",
  description:
    "Selected for efficient cooling, dependable performance, and AC Doctor installation support.",
  image: "/assets/images/hero_image.png",
  images: ["/assets/images/hero_image.png"],
  mrp: 42490,
  customerPrice: 32290,
  acType: "Split AC",
  tonnage: "1.5",
  starRating: 4,
  compressorType: "Inverter",
  refrigerant: "R32",
  noiseLevel: "Low noise",
  inverter: true,
};

const FALLBACK_SIMILAR: ProductPageProduct[] = Array.from(
  { length: 4 },
  (_, index) => ({
    ...FALLBACK_PRODUCT,
    _id: `fallback-similar-${index}`,
    name: "HITACHI IZEN 3500STXL Convertible 1.5 Ton 3 Star Inverter Split AC with Octa Sensor",
    mrp: 24000,
    customerPrice: 21000,
  }),
);

const TONNAGE_OPTIONS = ["1.5", "1.5", "1.5", "1.5", "1.5"];

function toPriceNumber(value: number | string | undefined) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatPrice(value: number | string | undefined, decimals = false) {
  const price = toPriceNumber(value);
  return `\u20B9${price.toLocaleString("en-IN", {
    minimumFractionDigits: decimals ? 2 : 0,
    maximumFractionDigits: decimals ? 2 : 0,
  })}`;
}

function getProductImages(product: ProductPageProduct) {
  const images = Array.isArray(product.images)
    ? product.images.filter(
        (image): image is string =>
          typeof image === "string" && image.trim().length > 0,
      )
    : [];

  if (product.image?.trim()) {
    images.unshift(product.image);
  }

  const uniqueImages = Array.from(new Set(images));
  return uniqueImages.length > 0 ? uniqueImages : ["/assets/images/hero_image.png"];
}

function firstProductImage(product: ProductPageProduct) {
  return getProductImages(product)[0];
}

function ProductImage({
  src,
  alt,
  className = "",
}: {
  src: string | undefined;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src && src.trim().length > 0 ? src : "/assets/images/hero_image.png"}
      alt={alt}
      className={["h-full w-full object-contain", className].join(" ")}
      loading="lazy"
    />
  );
}

function Rating({ value = 4 }: { value?: number }) {
  const rounded = Math.max(0, Math.min(5, Math.round(value)));

  return (
    <div className="flex items-center gap-3 md:gap-5">
      <div className="flex items-center gap-0.5 text-[20px] leading-none text-[#ffc441] md:gap-1 md:text-[24px]">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={index < rounded ? "text-[#ffc441]" : "text-[#e2e2e2]"}
            aria-hidden="true"
          >
            &#9733;
          </span>
        ))}
      </div>
      <span className="text-[14px] font-medium text-[#333]/75 md:text-[16px]">
        (4.00)
      </span>
    </div>
  );
}

function AccordionRow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#d4d4d4]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-6 py-[16px] text-left text-[18px] font-bold leading-[26px] text-[#111] md:py-[18px] md:text-[23px] md:leading-[31px]"
        aria-expanded={open}
      >
        {title}
        <span className="text-[28px] font-medium leading-none">
          {open ? "-" : "+"}
        </span>
      </button>
      {open && (
        <p className="pb-5 text-[14px] font-medium leading-[24px] text-[#555] md:text-[15px] md:leading-[26px]">
          {children}
        </p>
      )}
    </div>
  );
}

function SimilarCard({ product }: { product: ProductPageProduct }) {
  const hasProduct = !product._id.startsWith("fallback-");
  const image = firstProductImage(product);

  const card = (
    <article className="h-full min-h-[164px] w-[122px] overflow-hidden rounded-[5px] bg-white shadow-sm md:min-h-[420px] md:w-[332px] md:rounded-[8px] md:shadow-[0_2px_15px_rgba(0,0,0,0.16)]">
      <div className="flex h-[74px] items-center justify-center bg-white px-2 pt-3 md:h-[206px] md:p-6">
        <ProductImage src={image} alt={product.name} />
      </div>
      <div className="px-[7px] pb-3 pt-2 md:px-[15px] md:pb-6 md:pt-5">
        <h3 className="line-clamp-4 text-[8px] font-bold leading-[10px] text-[#333] md:line-clamp-3 md:text-[21px] md:leading-[30px]">
          {product.name}
        </h3>
        <div className="mt-1 flex flex-wrap items-center gap-1 md:mt-2 md:block">
          <p className="text-[12px] font-bold leading-[16px] text-[#333] md:text-[27px] md:leading-[34px]">
            {formatPrice(product.customerPrice)}
          </p>
          <p className="text-[6px] font-bold tracking-[0.02em] text-[#777] md:mt-1 md:text-[13px] md:tracking-[0.04em]">
            <span className="hidden md:inline">M.R.P : </span>
            <span className="line-through">{formatPrice(product.mrp)}</span>
          </p>
        </div>
        <span className="mt-2 inline-flex items-center gap-1 text-[7px] font-bold text-[#e31e25] md:mt-5 md:border-b md:border-[#e31e25] md:pb-[2px] md:text-[13px]">
          <span className="md:hidden">Book Now</span>
          <span className="hidden md:inline">View Details</span>
          <span className="md:hidden" aria-hidden="true">
            -&gt;
          </span>
        </span>
      </div>
    </article>
  );

  return hasProduct ? (
    <Link href={`/products/${product._id}`} className="block h-full">
      {card}
    </Link>
  ) : (
    card
  );
}

function TonnageButtons({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-[repeat(5,44px)] gap-[8px] md:grid-cols-5 md:gap-[11px]">
      {TONNAGE_OPTIONS.map((option, index) => (
        <button
          key={`${option}-${index}`}
          type="button"
          onClick={() => onSelect(index)}
          className={[
            "min-h-[34px] min-w-0 rounded-[5px] border text-[12px] font-bold transition md:min-h-[39px] md:rounded-[8px] md:text-[14px]",
            selected === index
              ? "border-[#ffc6c6] bg-[#ffc6c6] text-[#e31e25]"
              : "border-[#e31e25] bg-white text-[#e31e25] hover:border-[#e31e25]/70 md:border-[#f0cfcf] md:text-[#777]",
          ].join(" ")}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function ProductPageScreen({
  product = FALLBACK_PRODUCT,
  similarProducts = FALLBACK_SIMILAR,
}: ProductPageScreenProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedTonnage, setSelectedTonnage] = useState(0);
  const similarRef = useRef<HTMLDivElement>(null);

  const galleryImages = useMemo(() => getProductImages(product), [product]);
  const activeImageSrc = galleryImages[activeImage] ?? galleryImages[0];
  const price = toPriceNumber(product.customerPrice);
  const mrp = toPriceNumber(product.mrp);
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const visibleSimilar =
    similarProducts.length > 0 ? similarProducts : FALLBACK_SIMILAR;
  const mobileTitle =
    product.name.length > 42 ? `${product.name.slice(0, 42)}...` : product.name;

  const scrollSimilar = (direction: "left" | "right") => {
    similarRef.current?.scrollBy({
      left: direction === "right" ? 260 : -260,
      behavior: "smooth",
    });
  };

  return (
    <div className="overflow-hidden bg-[#f5f5f5] pt-0 text-[#222] dark:bg-[#111] lg:pt-[126px]">
      <section className="mx-auto max-w-[1280px] pb-[46px] lg:px-10 lg:pb-[78px]">
        <div className="grid min-w-0 grid-cols-1 gap-0 lg:grid-cols-[minmax(0,576px)_minmax(0,1fr)] lg:gap-[30px]">
          <div className="min-w-0">
            <div className="bg-white lg:bg-transparent">
              <button
                type="button"
                className="flex h-[480px] w-full items-center justify-center rounded-none bg-white px-0 pt-12 shadow-none lg:h-[526px] lg:rounded-[8px] lg:p-10 lg:shadow-[0_0_15px_rgba(0,0,0,0.15)]"
                onClick={() =>
                  setActiveImage((current) =>
                    current >= galleryImages.length - 1 ? 0 : current + 1,
                  )
                }
                aria-label="Next product image"
              >
                <ProductImage
                  src={activeImageSrc}
                  alt={product.name}
                  className="max-h-[245px] lg:max-h-[82%]"
                />
              </button>

              <div className="flex justify-center gap-[8px] bg-white pb-3 lg:hidden">
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show product image ${index + 1}`}
                    className={[
                      "h-[13px] w-[13px] rounded-full transition",
                      activeImage === index ? "bg-[#e31e25]" : "bg-[#c7c2c2]",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>

            {galleryImages.length > 1 && (
              <div className="hidden grid-cols-2 gap-5 pt-5 lg:grid">
                {galleryImages.slice(1).map((image, index) => {
                  const galleryIndex = index + 1;
                  return (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(galleryIndex)}
                      className={[
                        "flex h-[286px] flex-col items-center justify-center rounded-[8px] bg-white p-5 shadow-[0_0_15px_rgba(0,0,0,0.15)] transition",
                        activeImage === galleryIndex
                          ? "ring-2 ring-[#e31e25]"
                          : "ring-0",
                      ].join(" ")}
                    >
                      <ProductImage
                        src={image}
                        alt={`${product.name} view ${galleryIndex + 1}`}
                        className="max-h-[82%]"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <article className="w-full min-w-0 max-w-full overflow-hidden px-4 pt-[18px] lg:px-0 lg:pt-0 lg:pl-[2px]">
            <h1 className="max-w-full break-words text-[24px] font-bold italic leading-[34px] text-[#2c2c2c] [overflow-wrap:anywhere] lg:max-w-[650px] lg:text-[31px] lg:leading-[47px]">
              <span className="lg:hidden">{mobileTitle} </span>
              <span className="hidden lg:inline">
                {product.name}
              </span>
              <button
                type="button"
                className="text-[18px] font-bold italic text-[#168fc9] lg:hidden"
              >
                more
              </button>
            </h1>

            <div className="mt-4 lg:mt-7">
              <Rating value={product.starRating ?? 4} />
            </div>

            <div className="mt-5 lg:hidden">
              <TonnageButtons
                selected={selectedTonnage}
                onSelect={setSelectedTonnage}
              />
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-2 lg:mt-7">
              <p className="text-[32px] font-bold leading-none text-[#111] lg:text-[36px]">
                {formatPrice(product.customerPrice, true)}
              </p>
              {discount > 0 && (
                <span className="pb-1 text-[15px] font-bold text-[#2f9b32]">
                  -{discount}% off
                </span>
              )}
            </div>

            <div className="mt-11 hidden lg:block">
              <p className="text-[18px] font-medium leading-[28px] text-[#8a8a8a]">
                Select Tongue
              </p>
              <div className="mt-6">
                <TonnageButtons
                  selected={selectedTonnage}
                  onSelect={setSelectedTonnage}
                />
              </div>
            </div>

            <div className="mt-[56px] lg:mt-9">
              <AccordionRow title="Description">
                {product.description ??
                  `${product.name} is selected for efficient cooling, dependable performance, and AC Doctor installation support.`}
              </AccordionRow>
              <AccordionRow title="AC Specification">
                {product.tonnage ?? "1.5"} Ton, {product.starRating ?? 4} Star,{" "}
                {product.compressorType ?? "inverter compressor"},{" "}
                {product.refrigerant ?? "R32 refrigerant"}.
              </AccordionRow>
            </div>

            <Link
              href="/#contact"
              className="mt-9 hidden min-h-[72px] w-full items-center justify-center rounded-full bg-[#df1828] px-10 text-[24px] font-bold text-white transition hover:bg-[#c8181e] lg:inline-flex"
            >
              Buy Now
            </Link>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-[48px] lg:px-10 lg:pb-[100px]">
        <div className="relative mb-4 w-full max-w-full overflow-hidden pr-16 lg:mb-11 lg:pr-0">
          <h2 className="min-w-0 text-[26px] font-bold leading-[34px] text-[#2d2d2d] lg:text-[41px] lg:leading-[52px]">
            <span className="lg:hidden">Suggested For You</span>
            <span className="hidden lg:inline">Similar Product</span>
          </h2>
          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => scrollSimilar("left")}
              aria-label="Previous suggested products"
              className="text-[24px] font-medium leading-none text-[#e31e25]"
            >
              &lt;-
            </button>
            <button
              type="button"
              onClick={() => scrollSimilar("right")}
              aria-label="Next suggested products"
              className="text-[24px] font-medium leading-none text-[#e31e25]"
            >
              -&gt;
            </button>
          </div>
        </div>

        <div
          ref={similarRef}
          className="flex gap-[10px] overflow-x-auto pb-3 lg:gap-[38px]"
          style={{ scrollbarWidth: "none" }}
        >
          {visibleSimilar.slice(0, 8).map((item) => (
            <SimilarCard key={item._id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
