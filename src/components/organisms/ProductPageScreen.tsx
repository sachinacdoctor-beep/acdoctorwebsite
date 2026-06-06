"use client";

import { useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { productDetailHref } from "@/lib/productLinks";
import { submitFeaturedProductInterest } from "@/lib/auth";

type ProductSpecificationValue =
 | string
 | number
 | boolean
 | string[]
 | number[]
 | Record<string, string | number | boolean | null | undefined>
 | null
 | undefined;

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
 specifications?: Record<string, ProductSpecificationValue>;
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



const SPECIFICATION_LABELS: Record<string, string> = {
 acType: "AC Type",
 tonnage: "Tonnage",
 inverter: "Inverter",
 starRating: "Star Rating",
 compressorType: "Compressor Type",
 iseer: "ISEER",
 powerConsumption: "Power Consumption",
 powerRequirement: "Power Requirement",
 powerSupply: "Power Supply",
 ratedCurrent: "Rated Current",
 coolingCapacity: "Cooling Capacity",
 refrigerant: "Refrigerant",
 ambientTemperature: "Ambient Temperature",
 convertibleMode: "Convertible Mode",
 condenserCoil: "Condenser Coil",
 coverageArea: "Coverage Area",
 airFlowDirection: "Air Flow Direction",
 airFlowVolume: "Air Flow Volume",
 dustFilter: "Dust Filter",
 antiBacteria: "Anti Bacteria",
 indoorUnitDimensions: "Indoor Unit Dimensions",
 outdoorUnitDimensions: "Outdoor Unit Dimensions",
 indoorUnitWeight: "Indoor Unit Weight",
 outdoorUnitWeight: "Outdoor Unit Weight",
 bodyMaterial: "Body Material",
 color: "Color",
 communicationCableSize: "Communication Cable Size",
 connectingPipeLength: "Connecting Pipe Length",
 copperPipeSize: "Copper Pipe Size",
 copperKit: "Copper Kit",
 remoteControl: "Remote Control",
 sleepMode: "Sleep Mode",
 autoRestart: "Auto Restart",
 selfDiagnosis: "Self Diagnosis",
 timer: "Timer",
 display: "Display",
 wifiConnectivity: "Wi-Fi Connectivity",
 noiseLevel: "Noise Level",
 quietMode: "Quiet Mode",
 specialFeatures: "Special Features",
 warranty: "Warranty",
 compressor: "Compressor",
 product: "Product",
};

const SPECIFICATION_ORDER = [
 "acType",
 "tonnage",
 "inverter",
 "starRating",
 "compressorType",
 "iseer",
 "coolingCapacity",
 "powerConsumption",
 "powerRequirement",
 "powerSupply",
 "ratedCurrent",
 "refrigerant",
 "ambientTemperature",
 "convertibleMode",
 "condenserCoil",
 "coverageArea",
 "airFlowDirection",
 "airFlowVolume",
 "dustFilter",
 "antiBacteria",
 "indoorUnitDimensions",
 "outdoorUnitDimensions",
 "indoorUnitWeight",
 "outdoorUnitWeight",
 "bodyMaterial",
 "color",
 "communicationCableSize",
 "connectingPipeLength",
 "copperPipeSize",
 "copperKit",
 "remoteControl",
 "sleepMode",
 "autoRestart",
 "selfDiagnosis",
 "timer",
 "display",
 "wifiConnectivity",
 "noiseLevel",
 "quietMode",
 "specialFeatures",
 "warranty",
];

function formatSpecificationLabel(key: string) {
 return (
 SPECIFICATION_LABELS[key] ??
 key
 .replace(/([A-Z])/g, " $1")
 .replace(/[_-]+/g, " ")
 .replace(/^./, (char) => char.toUpperCase())
 .trim()
 );
}

function hasSpecificationValue(value: ProductSpecificationValue): boolean {
 if (value === null || value === undefined || value === false) return false;
 if (typeof value === "string") return value.trim().length > 0;
 if (typeof value === "number") return Number.isFinite(value);
 if (typeof value === "boolean") return value === true;
 if (Array.isArray(value)) {
 return value.some((item) => String(item ?? "").trim().length > 0);
 }
 if (typeof value === "object") {
 return Object.values(value).some((item) => hasSpecificationValue(item as ProductSpecificationValue));
 }
 return false;
}

function formatSpecificationValue(value: ProductSpecificationValue): ReactNode {
 if (typeof value === "boolean") return value ? "Yes" : null;
 if (typeof value === "number") return value;
 if (typeof value === "string") return value.trim();

 if (Array.isArray(value)) {
 const items = value
 .map((item) => String(item ?? "").trim())
 .filter(Boolean);

 return (
 <div className="flex flex-wrap gap-2">
 {items.map((item) => (
 <span
 key={item}
 className="rounded-full bg-[#f6f6f6] px-3 py-1 text-[12px] font-semibold text-[#333]"
 >
 {item}
 </span>
 ))}
 </div>
 );
 }

 if (value && typeof value === "object") {
 const rows = Object.entries(value).filter(([, item]) =>
 hasSpecificationValue(item as ProductSpecificationValue),
 );

 return (
 <div className="space-y-1">
 {rows.map(([key, item]) => (
 <div key={key} className="flex flex-wrap gap-1">
 <span className="font-bold text-[#333]">{formatSpecificationLabel(key)}:</span>
 <span>{formatSpecificationValue(item as ProductSpecificationValue)}</span>
 </div>
 ))}
 </div>
 );
 }

 return null;
}

function buildSpecifications(product: ProductPageProduct) {
 const apiSpecifications = product.specifications ?? {};
 const fallbackSpecifications: Record<string, ProductSpecificationValue> = {
 acType: product.acType,
 tonnage: product.tonnage,
 starRating: product.starRating,
 compressorType: product.compressorType,
 refrigerant: product.refrigerant,
 noiseLevel: product.noiseLevel,
 inverter: product.inverter,
 };

 const mergedSpecifications = {
 ...fallbackSpecifications,
 ...apiSpecifications,
 };

 const orderedKeys = [
 ...SPECIFICATION_ORDER,
 ...Object.keys(mergedSpecifications).filter(
 (key) => !SPECIFICATION_ORDER.includes(key),
 ),
 ];

 return orderedKeys
 .filter((key, index, self) => self.indexOf(key) === index)
 .map((key) => ({
 key,
 label: formatSpecificationLabel(key),
 value: mergedSpecifications[key],
 }))
 .filter((item) => hasSpecificationValue(item.value));
}

function SpecificationsGrid({ product }: { product: ProductPageProduct }) {
 const specifications = buildSpecifications(product);

 if (specifications.length === 0) {
 return (
 <p>
 No specifications available right now.
 </p>
 );
 }

 return (
 <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
 {specifications.map((item) => (
 <div
 key={item.key}
 className="rounded-[12px] border border-[#ececec] bg-white px-4 py-3 shadow-sm"
 >
 <p className="text-[12px] font-bold uppercase tracking-[0.04em] text-[#777]">
 {item.label}
 </p>
 <div className="mt-1 text-[14px] font-semibold leading-[22px] text-[#222]">
 {formatSpecificationValue(item.value)}
 </div>
 </div>
 ))}
 </div>
 );
}

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
 defaultOpen = false,
}: {
 title: string;
 children: ReactNode;
 defaultOpen?: boolean;
}) {
 const [open, setOpen] = useState(defaultOpen);

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
 <div className="whitespace-pre-line break-words pb-5 text-[14px] font-medium leading-[24px] text-[#555] md:text-[15px] md:leading-[26px]">
 {children}
 </div>
 )}
 </div>
 );
}

function SimilarCard({ product }: { product: ProductPageProduct }) {
 const hasProduct = !product._id.startsWith("fallback-");
 const image = firstProductImage(product);

 const card = (
 <article className="h-full min-h-[164px] w-full overflow-hidden rounded-[5px] bg-white shadow-sm md:min-h-[420px] md:rounded-[8px] md:shadow-[0_2px_15px_rgba(0,0,0,0.16)]">
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
 <Link href={productDetailHref(product._id)} className="block h-full">
 {card}
 </Link>
 ) : (
 card
 );
}

export function ProductPageScreen({
 product = FALLBACK_PRODUCT,
 similarProducts = FALLBACK_SIMILAR,
}: ProductPageScreenProps) {
 const [activeImage, setActiveImage] = useState(0);
 const [similarPage, setSimilarPage] = useState(0);
 const SIMILAR_PAGE_SIZE = 8;
 const [isSubmittingInterest, setIsSubmittingInterest] = useState(false);
 const [interestModalOpen, setInterestModalOpen] = useState(false);
 const [interestError, setInterestError] = useState("");

 const galleryImages = useMemo(() => getProductImages(product), [product]);
 const activeImageSrc = galleryImages[activeImage] ?? galleryImages[0];
 const price = toPriceNumber(product.customerPrice);
 const mrp = toPriceNumber(product.mrp);
 const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
 const similarProductPool =
 similarProducts.length > 0 ? similarProducts : FALLBACK_SIMILAR;
 const similarPageCount = Math.max(
 1,
 Math.ceil(similarProductPool.length / SIMILAR_PAGE_SIZE),
 );
 const safeSimilarPage = Math.min(similarPage, similarPageCount - 1);
 const visibleSimilar = similarProductPool.slice(
 safeSimilarPage * SIMILAR_PAGE_SIZE,
 safeSimilarPage * SIMILAR_PAGE_SIZE + SIMILAR_PAGE_SIZE,
 );
 const mobileTitle =
 product.name.length > 42 ? `${product.name.slice(0, 42)}...` : product.name;

 const scrollSimilar = (direction: "left" | "right") => {
 setSimilarPage((currentPage) => {
 const nextPage = direction === "right" ? currentPage + 1 : currentPage - 1;
 return Math.max(0, Math.min(nextPage, similarPageCount - 1));
 });
 };


 const handleBuyNow = async () => {
 if (isSubmittingInterest) return;

 setIsSubmittingInterest(true);
 setInterestError("");

 try {
 await submitFeaturedProductInterest(product._id);
 setInterestModalOpen(true);
 } catch (error) {
 setInterestError(
 error instanceof Error
 ? error.message
 : "Unable to submit your request. Please try again.",
 );
 } finally {
 setIsSubmittingInterest(false);
 }
 };

 return (
 <div className="overflow-hidden bg-[#f5f5f5] pt-0 text-[#222] lg:pt-[126px]">
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
 "h-[13px] w-[13px] rounded-full ",
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
 "flex h-[286px] flex-col items-center justify-center rounded-[8px] bg-white p-5 shadow-[0_0_15px_rgba(0,0,0,0.15)] ",
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


 <div className="mt-6 flex flex-wrap items-end gap-2 lg:mt-7">
 <p className="text-[32px] font-bold leading-none text-[#111] lg:text-[36px]">
 {formatPrice(product.customerPrice, true)}
 </p>
 {mrp > 0 && mrp > price && (
 <p className="pb-1 text-[14px] font-semibold leading-none text-[#777] lg:text-[16px]">
 <span className="mr-1">M.R.P:</span>
 <span className="line-through">{formatPrice(mrp)}</span>
 </p>
 )}
 {discount > 0 && (
 <span className="pb-1 text-[15px] font-bold text-[#2f9b32]">
 -{discount}% off
 </span>
 )}
 </div>


 <div className="mt-[56px] lg:mt-9">
 <AccordionRow title="Description" defaultOpen>
 {product.description?.trim() ||
 `${product.name} is selected for efficient cooling, dependable performance, and AC Doctor installation support.`}
 </AccordionRow>
 <AccordionRow title="AC Specification" defaultOpen>
 <SpecificationsGrid product={product} />
 </AccordionRow>
 </div>

 <button
 type="button"
 onClick={handleBuyNow}
 disabled={isSubmittingInterest}
 className="mt-9 inline-flex min-h-[56px] w-full items-center justify-center rounded-full bg-[#df1828] px-8 text-[18px] font-bold text-white hover:bg-[#c8181e] disabled:cursor-not-allowed disabled:opacity-70 lg:min-h-[72px] lg:px-10 lg:text-[24px]"
 >
 {isSubmittingInterest ? "Submitting..." : "Buy Now"}
 </button>
 {interestError && (
 <p className="mt-3 text-center text-[14px] font-semibold text-[#df1828]">
 {interestError}
 </p>
 )}
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

 <div className="grid grid-cols-2 gap-[10px] pb-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-[38px]">
 {visibleSimilar.map((item) => (
 <SimilarCard key={item._id} product={item} />
 ))}
 </div>
 </section>

 {interestModalOpen && (
 <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
 <div className="w-full max-w-[420px] rounded-[24px] bg-white px-6 py-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
 <div className="mx-auto flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[#ffe7e9] text-[34px] font-bold text-[#df1828]">
 ✓
 </div>
 <h3 className="mt-5 text-[24px] font-bold text-[#222]">
 Thank You!
 </h3>
 <p className="mt-3 text-[16px] font-medium leading-[24px] text-[#555]">
 Thank you for showing interest. Our team will contact you soon.
 </p>
 <button
 type="button"
 onClick={() => setInterestModalOpen(false)}
 className="mt-7 min-h-[48px] w-full rounded-full bg-[#df1828] px-6 text-[16px] font-bold text-white hover:bg-[#c8181e]"
 >
 Close
 </button>
 </div>
 </div>
 )}
 </div>
 );
}
