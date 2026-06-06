import { BookServiceScreen } from "@/components/organisms/BookServiceScreen";
import { OtherServiceScreen } from "@/components/organisms/OtherServiceScreen";
import { BOOKING_CATEGORIES } from "@/lib/data";
import type { Metadata } from "next";

interface PageProps {
 params: Promise<{ serviceId: string }>;
}

export function generateStaticParams() {
 return BOOKING_CATEGORIES.map((category) => ({ serviceId: category.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
 const { serviceId } = await params;
 const category = BOOKING_CATEGORIES.find((item) => item.id === serviceId);

 return {
 title: category ? `Book ${category.title}` : "Book AC Service",
 };
}

export default async function BookServicePage({ params }: PageProps) {
 const { serviceId } = await params;
 if (serviceId === "other") {
 return <OtherServiceScreen serviceId={serviceId} />;
 }

 return <BookServiceScreen serviceId={serviceId} />;
}
