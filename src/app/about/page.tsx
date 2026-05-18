import type { Metadata } from "next";
import { AboutPageScreen } from "@/components/organisms/AboutPageScreen";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about AC Doctor, our AC service network, product support, and customer care approach.",
};

export default function AboutPage() {
  return <AboutPageScreen />;
}
