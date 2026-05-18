import type { Metadata } from "next";
import { ProductsListScreen } from "@/components/organisms/ProductsListScreen";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore AC Doctor products and book expert AC installation and support.",
};

export default function ProductsPage() {
  return <ProductsListScreen />;
}
