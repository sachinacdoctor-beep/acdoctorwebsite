"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ApiProduct {
  _id: string;
  name: string;
  brand?: string;
  model?: string;
  image: string;
  mrp: number;
  customerPrice: number;
  acType?: string;
  tonnage?: string;
  starRating?: number;
  inverter?: boolean;
}

const AC_TYPES = [
  { label: "Split AC", image: "/assets/images/split-ac.png" },
  { label: "Window AC", image: "/assets/images/window-ac.png" },
  { label: "Cassette AC", image: "/assets/images/cassette-ac.png" },
  { label: "Ducted AC", image: "/assets/images/ductable-ac.png" },
  { label: "Tower AC", image: "/assets/images/tower-ac.png" },
  { label: "Split AC", image: "/assets/images/split-ac.png" },
];

const FALLBACK_PRODUCTS: ApiProduct[] = [
  {
    _id: "fallback-daikin-virat",
    name: "LG 3 Star (1.5) Split AC, Viraat Mode, 4.4 kW, 2026 Model",
    brand: "LG",
    model: "Viraat Mode",
    image: "/assets/images/hero_image.png",
    mrp: 42490,
    customerPrice: 32290,
    acType: "Split AC",
    tonnage: "1.5",
    starRating: 3,
    inverter: true,
  },
  {
    _id: "fallback-hitachi-izen",
    name: "HITACHI IZEN 3500STXL Convertible 1.5 Ton 3 Star Inverter Split AC",
    brand: "Hitachi",
    model: "IZEN 3500STXL",
    image: "/assets/images/hero_image.png",
    mrp: 24000,
    customerPrice: 21000,
    acType: "Split AC",
    tonnage: "1.5",
    starRating: 3,
    inverter: true,
  },
  {
    _id: "fallback-daikin-inverter",
    name: "Daikin 1.5 Ton 5 Star Inverter Split AC",
    brand: "Daikin",
    model: "5 Star Inverter",
    image: "/assets/images/hero_image.png",
    mrp: 67200,
    customerPrice: 42490,
    acType: "Split AC",
    tonnage: "1.5",
    starRating: 5,
    inverter: true,
  },
  {
    _id: "fallback-voltas-copper",
    name: "Voltas 1.5 Ton 3 Star Inverter Split AC with copper condenser",
    brand: "Voltas",
    model: "Copper Condenser",
    image: "/assets/images/hero_image.png",
    mrp: 38990,
    customerPrice: 28990,
    acType: "Split AC",
    tonnage: "1.5",
    starRating: 3,
    inverter: true,
  },
  {
    _id: "fallback-lg-dual",
    name: "LG Dual Inverter 1.5 Ton 4 Star Split AC for fast cooling",
    brand: "LG",
    model: "Dual Inverter",
    image: "/assets/images/hero_image.png",
    mrp: 39990,
    customerPrice: 35990,
    acType: "Split AC",
    tonnage: "1.5",
    starRating: 4,
    inverter: true,
  },
  {
    _id: "fallback-carrier-smart",
    name: "Carrier 1.5 Ton 3 Star Flexicool Inverter Split AC",
    brand: "Carrier",
    model: "Flexicool",
    image: "/assets/images/hero_image.png",
    mrp: 41990,
    customerPrice: 33768,
    acType: "Split AC",
    tonnage: "1.5",
    starRating: 3,
    inverter: true,
  },
];

function toPriceNumber(value: number | string | undefined) {
  const price = Number(value ?? 0);
  return Number.isFinite(price) && price > 0 ? price : 0;
}

function formatPrice(value: number | string | undefined) {
  return `\u20B9${toPriceNumber(value).toLocaleString("en-IN")}`;
}

function discountFor(product: ApiProduct) {
  const mrp = toPriceNumber(product.mrp);
  const price = toPriceNumber(product.customerPrice);
  return mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
}

function safeImage(src: string | undefined) {
  return src && src.trim().length > 0 ? src : "/assets/images/hero_image.png";
}

function toggleValue(
  value: string,
  current: string[],
  setState: (next: string[]) => void,
) {
  const next = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];
  setState(next);
}

type ProductImageProps = {
  src: string | undefined;
  alt: string;
  className?: string;
};

function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  return (
    <img
      src={safeImage(src)}
      alt={alt}
      className={["h-full w-full object-contain", className].join(" ")}
      loading="lazy"
    />
  );
}

function ProductNavButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Previous products" : "Next products"}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9e9e9] transition hover:bg-[#e31e25]/10 md:h-[50px] md:w-[50px]"
    >
      <Image
        src={`/assets/icons/${direction === "left" ? "left_arrow" : "right_arrow"}.png`}
        alt=""
        width={18}
        height={18}
        aria-hidden="true"
      />
    </button>
  );
}

function NewProductCard({ product }: { product: ApiProduct }) {
  const discount = discountFor(product);
  const hasProduct = !product._id.startsWith("fallback-");

  const card = (
    <article className="h-full min-h-[244px] w-[198px] flex-none overflow-hidden rounded-[8px] bg-white shadow-[0_3px_14px_rgba(0,0,0,0.08)] dark:bg-[#1a1a1a] md:min-h-[505px] md:w-auto">
      <div className="flex h-[140px] items-center justify-center bg-white p-3 dark:bg-[#222] md:h-[288px] md:p-6">
        <ProductImage src={product.image} alt={product.name} />
      </div>
      <div className="px-3 pb-4 pt-3 md:px-5 md:pb-6 md:pt-5">
        <h3 className="line-clamp-3 text-[16px] font-bold leading-[21px] text-[#2a2a2a] dark:text-[#f5f5f5] md:text-[25px] md:leading-[33px]">
          {product.name}
        </h3>
        <div className="mt-3 flex flex-wrap items-end gap-2 md:mt-4">
          <span className="text-[20px] font-bold leading-none text-[#101010] dark:text-white md:text-[34px]">
            {formatPrice(product.customerPrice)}
          </span>
          {discount > 0 && (
            <span className="pb-[2px] text-[9px] font-bold text-[#2f9b32] md:text-[14px]">
              -{discount}% off
            </span>
          )}
        </div>
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

function CatalogProductCard({ product }: { product: ApiProduct }) {
  const hasProduct = !product._id.startsWith("fallback-");

  const card = (
    <article className="h-full min-h-[214px] overflow-hidden rounded-[10px] bg-white p-[10px] shadow-[0_0_13px_rgba(0,0,0,0.15)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(0,0,0,0.14)] dark:bg-[#1a1a1a] md:min-h-[354px] md:p-[13px]">
      <div className="flex h-[120px] items-center justify-center rounded-[8px] bg-white p-3 dark:bg-[#222] md:h-[230px] md:p-5">
        <ProductImage src={product.image} alt={product.name} />
      </div>
      <div className="pt-3 md:pt-4">
        <h3 className="line-clamp-2 text-[12px] font-bold leading-[16px] text-[#242424] dark:text-[#f5f5f5] md:text-[14px] md:leading-[20px]">
          {product.name}
        </h3>
        <p className="mt-2 text-[18px] font-bold leading-none text-[#242424] dark:text-white md:text-[23px]">
          {formatPrice(product.customerPrice)}
        </p>
        <span className="mt-3 inline-flex border-b border-[#e31e25] pb-[1px] text-[10px] font-semibold text-[#e31e25] md:text-[13px]">
          View Details
        </span>
      </div>
    </article>
  );

  return hasProduct ? (
    <Link href={`/products/${product._id}`} className="block h-full flex-none w-[160px] md:w-auto">
      {card}
    </Link>
  ) : (
    <div className="w-[160px] flex-none md:w-auto h-full">{card}</div>
  );
}

function FilterOptionGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <details className="group border-b border-[#dadada] py-[17px] last:border-0 dark:border-[#333]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold text-[#292929] dark:text-[#f5f5f5] [&::-webkit-details-marker]:hidden">
        {label}
        <span className="text-[18px] leading-none transition group-open:rotate-180">
          v
        </span>
      </summary>
      <div className="grid gap-2 pt-4">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 text-[13px] font-medium text-[#555] dark:text-[#ccc]"
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
              className="h-4 w-4 accent-[#e31e25]"
            />
            {option}
          </label>
        ))}
      </div>
    </details>
  );
}

export function ProductsListScreen() {
  const newProductsRef = useRef<HTMLDivElement>(null);
  const suggestedRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);
  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [activeTonnages, setActiveTonnages] = useState<string[]>([]);
  const [activeRatings, setActiveRatings] = useState<string[]>([]);
  const [activeTechniques, setActiveTechniques] = useState<string[]>([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const visibleProducts = products.length > 0 ? products : FALLBACK_PRODUCTS;

  const globalMinPrice = useMemo(
    () =>
      Math.min(
        ...visibleProducts.map((product) => toPriceNumber(product.customerPrice)),
      ),
    [visibleProducts],
  );

  const globalMaxPrice = useMemo(
    () =>
      Math.max(
        ...visibleProducts.map((product) => toPriceNumber(product.customerPrice)),
      ),
    [visibleProducts],
  );

  useEffect(() => {
    if (selectedMaxPrice === 0 && globalMaxPrice > 0) {
      setSelectedMaxPrice(globalMaxPrice);
    }
  }, [globalMaxPrice, selectedMaxPrice]);

  const brandOptions = useMemo(
    () =>
      Array.from(
        new Set(visibleProducts.map((product) => product.brand ?? "AC Doctor")),
      ).sort(),
    [visibleProducts],
  );

  const typeOptions = useMemo(
    () =>
      Array.from(
        new Set(visibleProducts.map((product) => product.acType ?? "Split AC")),
      ).sort(),
    [visibleProducts],
  );

  const tonnageOptions = useMemo(
    () =>
      Array.from(
        new Set(visibleProducts.map((product) => product.tonnage ?? "1.5")),
      ).sort((a, b) => Number(a) - Number(b)),
    [visibleProducts],
  );

  const ratingOptions = useMemo(
    () =>
      Array.from(
        new Set(
          visibleProducts
            .map((product) => product.starRating)
            .filter(Boolean)
            .map(String),
        ),
      ).sort((a, b) => Number(b) - Number(a)),
    [visibleProducts],
  );

  const technologyOptions = useMemo(
    () =>
      Array.from(
        new Set(
          visibleProducts.map((product) =>
            product.inverter === false ? "Non-Inverter" : "Inverter",
          ),
        ),
      ),
    [visibleProducts],
  );

  const filteredProducts = useMemo(() => {
    return visibleProducts.filter((product) => {
      const price = toPriceNumber(product.customerPrice);

      if (selectedMaxPrice > 0 && price > selectedMaxPrice) {
        return false;
      }

      if (
        activeBrands.length > 0 &&
        !activeBrands.includes(product.brand ?? "AC Doctor")
      ) {
        return false;
      }

      if (
        activeTypes.length > 0 &&
        !activeTypes.includes(product.acType ?? "Split AC")
      ) {
        return false;
      }

      if (
        activeTonnages.length > 0 &&
        !activeTonnages.includes(product.tonnage ?? "1.5")
      ) {
        return false;
      }

      if (
        activeRatings.length > 0 &&
        !activeRatings.includes(String(product.starRating ?? ""))
      ) {
        return false;
      }

      const technology = product.inverter === false ? "Non-Inverter" : "Inverter";
      return activeTechniques.length === 0 || activeTechniques.includes(technology);
    });
  }, [
    activeBrands,
    activeRatings,
    activeTechniques,
    activeTonnages,
    activeTypes,
    selectedMaxPrice,
    visibleProducts,
  ]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://api.acdoctor.in/api/v1/admin/shop/product-list?page=1&limit=12",
          { signal: controller.signal },
        );
        const data = await response.json();

        if (data.status && Array.isArray(data.data) && data.data.length > 0) {
          setProducts(data.data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Error fetching products", error);
        }
      }
    }

    fetchProducts();
    return () => controller.abort();
  }, []);

  const scrollProducts = useCallback(
    (target: "new" | "suggested", direction: "left" | "right") => {
      const element =
        target === "new" ? newProductsRef.current : suggestedRef.current;
      if (!element) return;
      element.scrollBy({
        left: direction === "right" ? 320 : -320,
        behavior: "smooth",
      });
    },
    [],
  );

  const newProducts = visibleProducts.slice(0, 3);
  const suggestedProducts = filteredProducts.length > 0 ? filteredProducts : visibleProducts;

  return (
    <div className="overflow-hidden bg-[#f5f5f5] text-[#222] dark:bg-[#111] dark:text-[#f5f5f5]">
      <section className="relative flex h-[503px] items-center justify-center overflow-hidden bg-[#111] text-white md:h-[850px]">
        <Image
          src="/assets/images/product-hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/15 md:bg-black/5" />
        <div className="relative z-10 mx-auto flex max-w-[1000px] flex-col items-center px-5 pt-14 text-center md:pt-28">
          <h1 className="max-w-[960px] text-[30px] font-extrabold leading-[40px] text-white md:text-[72px] md:leading-[92px]">
            Experience Cool Efficiency.
          </h1>
          <p className="mt-3 max-w-[300px] text-[16px] font-medium leading-[24px] text-white md:hidden">
            Fast, reliable, and affordable AC services for homes and offices
            with Expert &amp; Certified technicians.
          </p>
          <Link
            href="#products"
            className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#e31e25] px-9 text-[18px] font-bold text-white shadow-[0_12px_24px_rgba(0,0,0,0.24)] transition hover:bg-[#c8181e] md:mt-9 md:min-h-[72px] md:bg-white/15 md:px-12 md:text-[16px] md:font-semibold md:backdrop-blur-md md:hover:bg-white/25"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-11 md:py-[108px] dark:bg-[#111]">
        <div className="mx-auto max-w-[1362px] px-5 sm:px-8 lg:px-10">
          <h2 className="mb-6 text-center text-[22px] font-bold leading-[28px] md:hidden">
            AC Type
          </h2>
          <div className="grid grid-cols-3 gap-x-7 gap-y-8 md:grid-cols-6 md:gap-8">
            {AC_TYPES.map((type, index) => (
              <button
                key={`${type.label}-${index}`}
                type="button"
                className="group flex min-w-0 flex-col items-center gap-3"
              >
                <span className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#fff1f1] p-3 transition group-hover:bg-[#ffe5e5] md:h-[108px] md:w-[108px] md:p-4">
                  <img
                    src={type.image}
                    alt=""
                    className="h-full w-full object-contain"
                    aria-hidden="true"
                    loading="lazy"
                  />
                </span>
                <span className="text-center text-[13px] font-bold italic leading-[18px] text-[#333] dark:text-[#f5f5f5] md:text-[19px] md:leading-[25px]">
                  {type.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="bg-[#f5f5f5] pb-5 dark:bg-[#111] md:pb-[70px]">
        <div className="mx-auto max-w-[1362px] px-5 sm:px-8 lg:px-10">
          <div className="mb-4 flex items-center justify-between gap-5 md:mb-11">
            <div>
              <h2 className="text-[22px] font-bold leading-[28px] text-[#2b2b2b] dark:text-[#f5f5f5] md:text-[40px] md:leading-[54px]">
                New Product
              </h2>
              <p className="mt-2 hidden max-w-[480px] text-[15px] font-medium leading-[24px] text-[#555] dark:text-[#ccc] md:block">
                Explore top-quality inverter ACs with energy-saving performance
                and powerful cooling for every season.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-[10px]">
              <ProductNavButton
                direction="left"
                onClick={() => scrollProducts("new", "left")}
              />
              <ProductNavButton
                direction="right"
                onClick={() => scrollProducts("new", "right")}
              />
            </div>
          </div>

          <div
            ref={newProductsRef}
            className="flex gap-[18px] overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible"
            style={{ scrollbarWidth: "none" }}
          >
            {newProducts.map((product) => (
              <NewProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] pb-[90px] pt-0 dark:bg-[#111] md:pb-[110px] md:pt-[40px]">
        <div className="mx-auto max-w-[1362px] px-5 sm:px-8 lg:px-10">
          <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
            <h2 className="text-[22px] font-bold leading-[28px] text-[#2b2b2b] dark:text-[#f5f5f5]">
              Suggested For You
            </h2>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => setShowMobileFilter(true)}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-[#2b2b2b] shadow-sm dark:bg-[#1a1a1a] dark:text-[#f5f5f5]"
              >
                <Image
                  src="/assets/icons/Filter.png"
                  alt="Filter"
                  width={18}
                  height={18}
                  className="h-4 w-4"
                />
                Filter
              </button>
              <ProductNavButton
                direction="left"
                onClick={() => scrollProducts("suggested", "left")}
              />
              <ProductNavButton
                direction="right"
                onClick={() => scrollProducts("suggested", "right")}
              />
            </div>
          </div>
          <div className="mb-4 hidden items-center justify-between gap-5 lg:flex">
            <h2 className="text-[40px] font-bold leading-[54px] text-[#2b2b2b] dark:text-[#f5f5f5]">
              Suggested For You
            </h2>
            <div className="flex shrink-0 items-center gap-[10px]">
              <ProductNavButton
                direction="left"
                onClick={() => scrollProducts("suggested", "left")}
              />
              <ProductNavButton
                direction="right"
                onClick={() => scrollProducts("suggested", "right")}
              />
            </div>
          </div>

          <div className="grid gap-9 lg:grid-cols-[344px_minmax(0,1fr)]">
            <aside
              className={`${
                showMobileFilter
                  ? "fixed inset-0 z-50 overflow-y-auto bg-white p-5 dark:bg-[#111]"
                  : "hidden lg:block lg:min-h-[614px] rounded-[7px] bg-white p-5 dark:bg-[#1a1a1a]"
              }`}
            >
              <div className="mb-6 flex items-center justify-between lg:hidden">
                <h2 className="text-[24px] font-bold text-[#333] dark:text-[#f5f5f5]">Filter</h2>
                <button onClick={() => setShowMobileFilter(false)} className="text-[28px] leading-none text-[#333] dark:text-[#f5f5f5]">&times;</button>
              </div>
              <h2 className="mb-3 hidden text-center text-[28px] font-bold italic leading-[36px] text-[#333] dark:text-[#f5f5f5] lg:block">
                Filter
              </h2>

              <div className="border-b border-[#dadada] pb-8 pt-2 dark:border-[#333]">
                <label
                  htmlFor="price-filter"
                  className="mb-5 block text-[16px] font-semibold text-[#292929] dark:text-[#f5f5f5]"
                >
                  Price
                </label>
                <input
                  id="price-filter"
                  type="range"
                  min={globalMinPrice}
                  max={globalMaxPrice}
                  value={selectedMaxPrice || globalMaxPrice}
                  onChange={(event) =>
                    setSelectedMaxPrice(Number(event.target.value))
                  }
                  className="h-[4px] w-full accent-[#111] dark:accent-[#f5f5f5]"
                />
                <div className="mt-2 flex justify-between text-[11px] font-medium text-[#555] dark:text-[#ccc]">
                  <span>{formatPrice(globalMinPrice)}</span>
                  <span>{formatPrice(selectedMaxPrice || globalMaxPrice)}</span>
                </div>
              </div>

              <FilterOptionGroup
                label="Brand"
                options={brandOptions}
                selected={activeBrands}
                onToggle={(value) => toggleValue(value, activeBrands, setActiveBrands)}
              />
              <FilterOptionGroup
                label="AC Type"
                options={typeOptions}
                selected={activeTypes}
                onToggle={(value) => toggleValue(value, activeTypes, setActiveTypes)}
              />
              <FilterOptionGroup
                label="Tonnage"
                options={tonnageOptions}
                selected={activeTonnages}
                onToggle={(value) =>
                  toggleValue(value, activeTonnages, setActiveTonnages)
                }
              />
              <FilterOptionGroup
                label="Energy Rating"
                options={ratingOptions}
                selected={activeRatings}
                onToggle={(value) =>
                  toggleValue(value, activeRatings, setActiveRatings)
                }
              />
              <FilterOptionGroup
                label="AC Technology"
                options={technologyOptions}
                selected={activeTechniques}
                onToggle={(value) =>
                  toggleValue(value, activeTechniques, setActiveTechniques)
                }
              />
              
              <div className="mt-8 lg:hidden">
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="w-full rounded-full bg-[#e31e25] py-3 text-center text-[16px] font-bold text-white transition hover:bg-[#c8181e]"
                >
                  Apply Filters
                </button>
              </div>
            </aside>

            <div
              ref={suggestedRef}
              className="flex gap-[10px] overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-9 md:overflow-visible xl:grid-cols-4"
              style={{ scrollbarWidth: "none" }}
            >
              {suggestedProducts.slice(0, 12).map((product) => (
                <CatalogProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
