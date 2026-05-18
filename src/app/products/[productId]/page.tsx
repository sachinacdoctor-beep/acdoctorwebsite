import { notFound } from "next/navigation";
import {
  ProductPageScreen,
  type ProductPageProduct,
} from "@/components/organisms/ProductPageScreen";

type ApiProduct = Partial<ProductPageProduct> & {
  productId?: string;
  pricing?: {
    mrp?: number;
    customerPrice?: number;
  };
  specifications?: Partial<ProductPageProduct> & {
    iseer?: string;
    warranty?: {
      compressor?: string;
      product?: string;
    };
  };
};

async function fetchProductList(): Promise<ProductPageProduct[]> {
  try {
    const response = await fetch(
      "https://api.acdoctor.in/api/v1/admin/shop/product-list?page=1&limit=100",
    );
    const data = await response.json();

    if (!data?.status || !Array.isArray(data.data)) {
      return [] as ProductPageProduct[];
    }

    return (data.data as ApiProduct[]).map((product: ApiProduct) =>
      normalizeProduct(product),
    );
  } catch (error) {
    console.error("Error fetching products", error);
    return [] as ProductPageProduct[];
  }
}

async function fetchProductDetail(
  productId: string,
): Promise<ProductPageProduct | null> {
  try {
    const response = await fetch(
      `https://api.acdoctor.in/api/v1/admin/shop/product/${productId}`,
    );
    const data = await response.json();

    if (!data?.status || !data.data) {
      return null;
    }

    return normalizeProduct(data.data);
  } catch (error) {
    console.error("Error fetching product detail", error);
    return null;
  }
}

function getImageList(product: ApiProduct) {
  const rawImages = Array.isArray(product.images) ? product.images : [];
  const images = rawImages.filter(
    (image): image is string =>
      typeof image === "string" && image.trim().length > 0,
  );

  if (typeof product.image === "string" && product.image.trim().length > 0) {
    images.unshift(product.image);
  }

  return Array.from(new Set(images));
}

function normalizeProduct(product: ApiProduct): ProductPageProduct {
  const specifications = product.specifications ?? {};
  const images = getImageList(product);
  const image = images[0] ?? "/assets/images/hero_image.png";

  return {
    _id: product._id ?? product.productId ?? "product",
    brand: product.brand,
    model: product.model,
    name: product.name ?? "AC Doctor Product",
    description: product.description,
    image,
    images,
    mrp: product.pricing?.mrp ?? product.mrp ?? 0,
    customerPrice:
      product.pricing?.customerPrice ?? product.customerPrice ?? 0,
    acType: specifications.acType ?? product.acType,
    tonnage: specifications.tonnage ?? product.tonnage,
    starRating: specifications.starRating ?? product.starRating,
    compressorType:
      specifications.compressorType ?? product.compressorType,
    refrigerant: specifications.refrigerant ?? product.refrigerant,
    noiseLevel: specifications.noiseLevel ?? product.noiseLevel,
    inverter: specifications.inverter ?? product.inverter,
  };
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
