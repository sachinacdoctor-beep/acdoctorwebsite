import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductDetailClientScreen } from "@/components/organisms/ProductDetailClientScreen";

export const metadata: Metadata = {
 title: "Product Details",
 description: "View AC Doctor product details and similar products.",
};

export default function ProductDetailPage() {
 return (
 <Suspense
 fallback={
 <main className="min-h-screen bg-[#f6f6f6] px-5 py-24 text-center text-[#222]">
 Loading product details...
 </main>
 }
 >
 <ProductDetailClientScreen />
 </Suspense>
 );
}
