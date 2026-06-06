import { notFound } from "next/navigation";
import {
  ProductPageScreen,
  type ProductPageProduct,
} from "@/components/organisms/ProductPageScreen";

type ApiProduct = Partial<ProductPageProduct> & {
  id?: string;
  productId?: string;
  product_id?: string;
  productName?: string;
  title?: string;
  productImage?: string;
  images?: string[];
  image?: string;
  description?: string | string[];
  productDescription?: string | string[];
  shortDescription?: string | string[];
  longDescription?: string | string[];
  aboutProduct?: string | string[];
  details?: string | string[];
  mrp?: number | string;
  actualMrp?: number | string;
  originalPrice?: number | string;
  customerPrice?: number | string;
  offerPrice?: number | string;
  discountedPrice?: number | string;
  price?: number | string;
  sellingPrice?: number | string;
  pricing?: {
    mrp?: number | string;
    actualMrp?: number | string;
    originalPrice?: number | string;
    customerPrice?: number | string;
    offerPrice?: number | string;
    discountedPrice?: number | string;
    price?: number | string;
    sellingPrice?: number | string;
  };
  specifications?: Record<string, unknown> & Partial<ProductPageProduct>;
};

const USER_PRODUCTS_API = "https://api.acdoctor.in/api/v1/user/products";

function toPriceNumber(value: number | string | undefined) {
  const price = Number(value ?? 0);
  return Number.isFinite(price) && price > 0 ? price : 0;
}

function toDescriptionText(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item ?? "").trim())
      .filter(Boolean)
      .join("\n\n");
  }

  if (typeof value === "string") {
    return value.trim();
  }

  return "";
}

function getProductDescription(product: ApiProduct) {
  return (
    toDescriptionText(product.longDescription) ||
    toDescriptionText(product.productDescription) ||
    toDescriptionText(product.description) ||
    toDescriptionText(product.aboutProduct) ||
    toDescriptionText(product.details) ||
    toDescriptionText(product.shortDescription)
  );
}

function getImageList(product: ApiProduct) {
  const rawImages = Array.isArray(product.images) ? product.images : [];
  const images = rawImages.filter(
    (image): image is string =>
      typeof image === "string" && image.trim().length > 0,
  );

  const primaryImage = product.image ?? product.productImage;

  if (typeof primaryImage === "string" && primaryImage.trim().length > 0) {
    images.unshift(primaryImage);
  }

  return Array.from(new Set(images));
}

function normalizeProduct(product: ApiProduct): ProductPageProduct {
  const specifications = product.specifications ?? {};
  const images = getImageList(product);
  const image = images[0] ?? "/assets/images/hero_image.png";
  const mrp =
    product.pricing?.mrp ??
    product.mrp ??
    product.pricing?.actualMrp ??
    product.actualMrp ??
    product.pricing?.originalPrice ??
    product.originalPrice;
  const customerPrice =
    product.pricing?.customerPrice ??
    product.customerPrice ??
    product.pricing?.offerPrice ??
    product.offerPrice ??
    product.pricing?.discountedPrice ??
    product.discountedPrice ??
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
      "product",
    brand: product.brand,
    model: product.model,
    name:
      product.name ??
      product.productName ??
      product.title ??
      "AC Doctor Product",
    description: getProductDescription(product),
    image,
    images,
    mrp: toPriceNumber(mrp),
    customerPrice: toPriceNumber(customerPrice),
    acType: specifications.acType ?? product.acType,
    tonnage: specifications.tonnage ?? product.tonnage,
    starRating: specifications.starRating ?? product.starRating,
    compressorType: specifications.compressorType ?? product.compressorType,
    refrigerant: specifications.refrigerant ?? product.refrigerant,
    noiseLevel: specifications.noiseLevel ?? product.noiseLevel,
    inverter: specifications.inverter ?? product.inverter,
    specifications: specifications as ProductPageProduct["specifications"],
  };
}

function getProductsFromResponse(data: unknown): ApiProduct[] {
  if (
    data &&
    typeof data === "object" &&
    "data" in data &&
    Array.isArray((data as { data?: unknown }).data)
  ) {
    return (data as { data: ApiProduct[] }).data;
  }

  if (
    data &&
    typeof data === "object" &&
    "data" in data &&
    (data as { data?: unknown }).data &&
    typeof (data as { data?: unknown }).data === "object"
  ) {
    return [(data as { data: ApiProduct }).data];
  }

  return [];
}

async function fetchProductList(): Promise<ProductPageProduct[]> {
  try {
    const response = await fetch(`${USER_PRODUCTS_API}?page=1&limit=100`, {
      cache: "no-store",
    });
    const data = await response.json();
    return getProductsFromResponse(data).map(normalizeProduct);
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
}

async function fetchProductDetail(
  productId: string,
): Promise<ProductPageProduct | null> {
  try {
    const response = await fetch(
      `${USER_PRODUCTS_API}?productIds=${encodeURIComponent(productId)}`,
      { cache: "no-store" },
    );
    const data = await response.json();
    const products = getProductsFromResponse(data).map(normalizeProduct);

    return (
      products.find((item) => item._id === productId) ?? products[0] ?? null
    );
  } catch (error) {
    console.error("Error fetching product detail", error);
    return null;
  }
}

export async function generateStaticParams() {
  const products = await fetchProductList();
  return products.map((product) => ({
    productId: product._id,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const [products, productDetail] = await Promise.all([
    fetchProductList(),
    fetchProductDetail(productId),
  ]);

  const product =
    productDetail ?? products.find((item) => item._id === productId);

  if (!product) {
    notFound();
  }

  const similarProducts = products
    .filter((item) => item._id !== product._id)
    .slice(0, 8);

  return (
    <ProductPageScreen product={product} similarProducts={similarProducts} />
  );
}
