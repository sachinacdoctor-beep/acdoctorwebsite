import type { BookingCategory, ServiceCard } from "@/types";

export const SERVICE_LIST_API =
  "https://api.acdoctor.in/api/v1/user/service-list";

export interface ApiServiceItem {
  _id: string;
  name: string;
  key?: string;
  category?: string;
  icon?: string;
  isActive?: number | boolean;
  orderBy?: string | number;
  description?: string[];
}


export function isHiddenFrontendService(
  service: Pick<ApiServiceItem, "name" | "key" | "category"> | {
    title?: string;
    id?: string;
    backendName?: string;
    backendKey?: string;
    backendCategory?: string;
  },
) {
  const rawValue = [
    "name" in service ? service.name : undefined,
    "title" in service ? service.title : undefined,
    "key" in service ? service.key : undefined,
    "backendName" in service ? service.backendName : undefined,
    "backendKey" in service ? service.backendKey : undefined,
    "id" in service ? service.id : undefined,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const normalized = rawValue.replace(/[^a-z0-9]+/g, " ").trim();

  return (
    normalized === "amc" ||
    normalized.split(" ").includes("amc") ||
    /\bcopper\s*(pipe|piping)\b/.test(normalized) ||
    normalized === "copper pipe" ||
    normalized === "copper piping"
  );
}

const FALLBACK_SERVICE_ICON: Record<string, string> = {
  SERVICE: "/assets/icons/service.png",
  REPAIR: "/assets/icons/repair.png",
  INSTALLATION: "/assets/icons/installation.png",
  COMPRESSOR: "/assets/icons/compressor.png",
  GAS_CHARGING: "/assets/icons/gas.png",
  OTHER: "/assets/icons/other.png",
};

export function serviceKeyToRouteId(
  service: Pick<ApiServiceItem, "key" | "name">,
) {
  const key = String(service.key || service.name || "service")
    .trim()
    .toUpperCase();

  if (key === "GAS_CHARGING") return "gas-charging";

  return (
    key
      .toLowerCase()
      .replace(/_/g, "-")
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "service"
  );
}

function getDescription(service: ApiServiceItem) {
  if (Array.isArray(service.description) && service.description.length) {
    return service.description.filter(Boolean).join(" ");
  }

  return `${service.name} booking support with AC Doctor expert technicians.`;
}

export function mapApiServiceToBookingCategory(
  service: ApiServiceItem,
): BookingCategory {
  const backendKey = String(service.key || service.name || "").toUpperCase();

  return {
    id: serviceKeyToRouteId(service),
    title: service.name,
    backendId: service._id,
    backendKey,
    backendName: service.name,
    backendCategory: service.category,
    backendIcon: service.icon || FALLBACK_SERVICE_ICON[backendKey],
    description: getDescription(service),
  };
}

export function mapApiServiceToServiceCard(
  service: ApiServiceItem,
): ServiceCard {
  const category = mapApiServiceToBookingCategory(service);

  return {
    id: category.id,
    title: category.title,
    description: category.description || "",
    icon: "🛠️",
    iconImage: category.backendIcon,
    backendId: category.backendId,
    backendKey: category.backendKey,
    backendName: category.backendName,
    backendCategory: category.backendCategory,
  };
}

export async function fetchServiceList() {
  const response = await fetch(SERVICE_LIST_API, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch service list");
  }

  const json = await response.json();
  const list: ApiServiceItem[] = Array.isArray(json?.data) ? json.data : [];

  return list
    .filter(
      (service) =>
        service &&
        service._id &&
        service.name &&
        service.isActive !== 0 &&
        !isHiddenFrontendService(service),
    )
    .sort((a, b) => Number(a.orderBy || 999) - Number(b.orderBy || 999));
}
