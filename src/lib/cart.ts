import { AC_BOOKING_ITEMS, BOOKING_CATEGORIES } from "@/lib/data";
import type { AcDoctorUserSession, UserAddress } from "@/lib/auth";
import type { BookingCategory } from "@/types";

export const BOOKING_CART_STORAGE_KEY = "AC_DOCTOR_BOOKING_CART";
export const BOOKING_CART_EVENT = "acd-booking-cart-updated";

export interface BookingCartItem {
 key: string;
 isEnquiry?: boolean;
 serviceId: string;
 serviceTitle: string;
 // App-style fields: booking create API reads these directly.
 service_id?: string;
 serviceType?: string;
 acType?: string;
 place?: string;
 otherService?: string;
 comment?: string;
 services?: unknown[];
 service_data?: {
  _id?: string;
  key?: string;
  name?: string;
  category?: string;
 };
 backendServiceId?: string;
 backendServiceKey?: string;
 backendServiceName?: string;
 backendServiceCategory?: string;
 backendServiceIcon?: string;
 itemId: string;
 name: string;
 description: string;
 image?: string;
 icon: string;
 quantity: number;
}

export type BookingCart = Record<string, BookingCartItem>;

export const OTHER_PROBLEM_OPTIONS = [
 { id: "water-leakage", label: "Water Leakage" },
 { id: "noise-problem", label: "Noise Problem" },
 { id: "gas-topup", label: "Gas Topup" },
 { id: "pcb-fault", label: "PCB Fault" },
 { id: "remote-fault", label: "Remote Fault" },
 { id: "fan-blower-fault", label: "Fan / Blower Fault" },
 { id: "fan-motor", label: "Fan Motor" },
 { id: "outdoor-fan-fault", label: "Outdoor Fan Fault" },
 { id: "outdoor-fan-blade-fault", label: "Outdoor Fan Blade Fault" },
 { id: "outdoor-fan-motor-fault", label: "Outdoor Fan Motor Fault" },
 { id: "other", label: "Other" },
];

export const OTHER_AC_TYPE_OPTIONS = [
 { id: "split-ac", label: "Split AC" },
 { id: "window-ac", label: "Window AC" },
 { id: "cassette-ac", label: "Cassette AC" },
 { id: "vrv-vrf-ac", label: "VRV/VRF AC" },
 { id: "tower-ac", label: "Tower AC" },
 { id: "ducted-ac", label: "Ducted AC" },
 { id: "chiller-ac", label: "Chiller AC" },
];

export function isOtherCartItem(item: BookingCartItem) {
 return String(item.serviceType || item.backendServiceKey || item.serviceId || "")
 .toUpperCase()
 .replace(/-/g, "_") === "OTHER" || item.isEnquiry === true;
}

export function createCartKey(serviceId: string, itemId: string) {
 return `${serviceId}__${itemId}`;
}

export function getStoredCart(): BookingCart {
 if (typeof window === "undefined") return {};

 try {
 const rawCart = window.localStorage.getItem(BOOKING_CART_STORAGE_KEY);
 if (!rawCart) return {};

 const parsedCart = JSON.parse(rawCart) as BookingCart;
 if (!parsedCart || typeof parsedCart !== "object") return {};

 return parsedCart;
 } catch (error) {
 console.error("Failed to read AC Doctor booking cart", error);
 return {};
 }
}

export function saveStoredCart(cart: BookingCart) {
 if (typeof window === "undefined") return;

 window.localStorage.setItem(BOOKING_CART_STORAGE_KEY, JSON.stringify(cart));
 window.dispatchEvent(new Event(BOOKING_CART_EVENT));
}

export function getCartUniqueCount(cart: BookingCart) {
 return Object.keys(cart).length;
}

export function getCartTotalQuantity(cart: BookingCart) {
 return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
}

export function addBookingItemToCart({
 serviceId,
 itemId,
 quantity,
 serviceCategory,
}: {
 serviceId: string;
 itemId: string;
 quantity: number;
 serviceCategory?: BookingCategory;
}) {
 const activeCategory =
 serviceCategory ??
 BOOKING_CATEGORIES.find((category) => category.id === serviceId) ??
 BOOKING_CATEGORIES[0];
 const bookingItem = AC_BOOKING_ITEMS.find((item) => item.id === itemId);

 if (!bookingItem) return getStoredCart();

 const safeQuantity = Math.max(1, quantity);
 const key = createCartKey(activeCategory.id, bookingItem.id);
 const currentCart = getStoredCart();

 const updatedCart: BookingCart = {
 ...currentCart,
 [key]: {
 key,
 serviceId: activeCategory.id,
 serviceTitle: activeCategory.title,
 // Same as React Native app cart item: keep backend service id/type inside cart.
 service_id: activeCategory.backendId,
 serviceType: activeCategory.backendKey,
 acType: bookingItem.name,
 backendServiceId: activeCategory.backendId,
 backendServiceKey: activeCategory.backendKey,
 backendServiceName: activeCategory.backendName,
 backendServiceCategory: activeCategory.backendCategory,
 backendServiceIcon: activeCategory.backendIcon,
 itemId: bookingItem.id,
 name: bookingItem.name,
 description: bookingItem.description,
 image: bookingItem.image,
 icon: bookingItem.icon,
 quantity: (currentCart[key]?.quantity ?? 0) + safeQuantity,
 },
 };

 saveStoredCart(updatedCart);
 return updatedCart;
}


export function addOtherProblemToCart({
 serviceCategory,
 acTypeId,
 acTypeLabel,
 problemId,
 problemLabel,
 description,
}: {
 serviceCategory: BookingCategory;
 acTypeId: string;
 acTypeLabel: string;
 problemId: string;
 problemLabel: string;
 description: string;
}) {
 const cleanedAcTypeId = String(acTypeId || "split-ac").trim() || "split-ac";
 const cleanedAcTypeLabel = String(acTypeLabel || "Split AC").trim() || "Split AC";
 const cleanedProblemId = String(problemId || "other").trim() || "other";
 const cleanedProblemLabel = String(problemLabel || "Other").trim() || "Other";
 const cleanedDescription = String(description || "").trim();
 const key = createCartKey(serviceCategory.id || "other", `${cleanedAcTypeId}__${cleanedProblemId}`);
 const currentCart = getStoredCart();

 const updatedCart: BookingCart = {
 ...currentCart,
 [key]: {
 key,
 isEnquiry: true,
 serviceId: serviceCategory.id || "other",
 serviceTitle: serviceCategory.title || "Other",
 service_id: serviceCategory.backendId,
 serviceType: serviceCategory.backendKey || "OTHER",
 acType: cleanedAcTypeLabel,
 place: "",
 otherService: cleanedProblemLabel,
 comment: cleanedDescription,
 services: [],
 service_data: {
  _id: serviceCategory.backendId,
  key: serviceCategory.backendKey || "OTHER",
  name: serviceCategory.backendName || serviceCategory.title || "Other",
  category: serviceCategory.backendCategory || "OTHER",
 },
 backendServiceId: serviceCategory.backendId,
 backendServiceKey: serviceCategory.backendKey || "OTHER",
 backendServiceName: serviceCategory.backendName || serviceCategory.title || "Other",
 backendServiceCategory: serviceCategory.backendCategory || "OTHER",
 backendServiceIcon: serviceCategory.backendIcon,
 itemId: `${cleanedAcTypeId}__${cleanedProblemId}`,
 name: `${cleanedAcTypeLabel} - ${cleanedProblemLabel}`,
 description: cleanedDescription || "Problem description will be shared with AC Doctor support.",
 icon: "🛠️",
 quantity: 1,
 },
 };

 saveStoredCart(updatedCart);
 return updatedCart;
}

export function updateStoredCartItemQuantity(key: string, quantity: number) {
 const currentCart = getStoredCart();

 if (!currentCart[key]) return currentCart;

 if (quantity <= 0) {
 const { [key]: _removedItem, ...remainingCart } = currentCart;
 saveStoredCart(remainingCart);
 return remainingCart;
 }

 const updatedCart: BookingCart = {
 ...currentCart,
 [key]: {
 ...currentCart[key],
 quantity,
 },
 };

 saveStoredCart(updatedCart);
 return updatedCart;
}

export function removeStoredCartItem(key: string) {
 const currentCart = getStoredCart();
 const { [key]: _removedItem, ...remainingCart } = currentCart;
 saveStoredCart(remainingCart);
 return remainingCart;
}

export function clearStoredCart() {
 saveStoredCart({});
}

export function normalizeBookingSlot(slot: string) {
 const cleaned = slot.replace(/_/g, " ").trim().toLowerCase();

 if (cleaned === "second half" || cleaned === "secondhalf") {
 return "SECOND_HALF";
 }

 return "FIRST_HALF";
}

function getCartItemWithFallback(item: BookingCartItem) {
 const activeCategory =
 BOOKING_CATEGORIES.find((category) => category.id === item.serviceId) ??
 BOOKING_CATEGORIES[0];

 return {
 // acType same as app cart item.
 acType: item.acType || item.name || "",
 quantity: Math.max(1, Number(item.quantity) || 1),
 // service_id wahi jayegi jo cart me add hote time service/category se save hui hai.
 serviceId: item.service_id || item.backendServiceId || activeCategory?.backendId || "",
 serviceType:
 item.serviceType ||
 item.backendServiceKey ||
 activeCategory?.backendKey ||
 item.serviceTitle ||
 "",
 };
}

function toAppBookingServiceDetail(item: BookingCartItem) {
 const service = getCartItemWithFallback(item);
 const normalizedServiceType = String(service.serviceType || "").toUpperCase();

 // Other booking payload must match the React Native app format.
 // Do not send quantity/serviceType/place/services for OTHER because backend expects
 // comment, otherService, and service_data for this flow.
 if (isOtherCartItem(item)) {
 const serviceData = item.service_data || {
  _id: service.serviceId,
  key: normalizedServiceType || "OTHER",
  name: item.backendServiceName || item.serviceTitle || "Other",
  category: item.backendServiceCategory || "OTHER",
 };

 return {
  service_id: service.serviceId,
  acType: service.acType,
  comment: item.comment || "",
  otherService: item.otherService || item.name || "Other",
  service_data: {
   _id: serviceData._id || service.serviceId,
   key: serviceData.key || normalizedServiceType || "OTHER",
   name: serviceData.name || item.backendServiceName || item.serviceTitle || "Other",
   category: serviceData.category || item.backendServiceCategory || "OTHER",
  },
 };
 }

 return {
 service_id: service.serviceId,
 quantity: String(service.quantity || 1),
 acType: service.acType,
 serviceType: normalizedServiceType,
 place: item.place || "",
 otherService: item.otherService || "",
 comment: item.comment || "",
 services: Array.isArray(item.services) ? item.services : [],
 };
}

function createWebsiteOrderId() {
 return `ORDER_${Date.now()}`;
}

export function createBookingPayload(cart: BookingCart) {
 return {
 bookingSource: "website",
 brand: "AC Doctor",
 totalUniqueItems: getCartUniqueCount(cart),
 totalQuantity: getCartTotalQuantity(cart),
 serviceDetails: Object.values(cart)
 .filter((item) => Number(item.quantity) > 0)
 .map(toAppBookingServiceDetail),
 };
}


function getProblemSummary(items: BookingCartItem[]) {
 return items
 .map((item) => {
 const problem = item.otherService || item.acType || item.name;
 const comment = item.comment ? ` - ${item.comment}` : "";
 return `${problem}${comment}`;
 })
 .filter(Boolean)
 .join(", ");
}

export function createFinalOtherEnquiryPayload({
 items,
 user,
 address,
 name,
 date,
 slot,
}: {
 items: BookingCartItem[];
 user: AcDoctorUserSession & { _id?: string; id?: string };
 address: UserAddress & { id?: string };
 name: string;
 date: string;
 slot: string;
}) {
 const serviceDetails = items
 .filter((item) => Number(item.quantity) > 0)
 .map(toAppBookingServiceDetail);
 return {
 user_id: user._id || user.userId || user.id,
 addressId: address._id || address.addressId || address.id,
 name: name || user.name || "AC Doctor User",
 date,
 slot: normalizeBookingSlot(slot),
 amount: 0,
 serviceDetails,
 };
}

export function createFinalBookingPayload({
 cart,
 user,
 address,
 name,
 date,
 slot,
}: {
 cart: BookingCart;
 user: AcDoctorUserSession & { _id?: string; id?: string };
 address: UserAddress & { id?: string };
 name: string;
 date: string;
 slot: string;
}) {
 const serviceDetails = Object.values(cart)
 .filter((item) => Number(item.quantity) > 0)
 .map(toAppBookingServiceDetail);

 const cartItems = Object.values(cart).filter((item) => Number(item.quantity) > 0);
 const isOnlyOtherBooking = cartItems.length > 0 && cartItems.every(isOtherCartItem);

 // Final booking create payload required by backend.
 // For ONLY Other flow, keep payload same as React Native app sample.
 if (isOnlyOtherBooking) {
 return {
  user_id: user._id || user.userId || user.id,
  addressId: address._id || address.addressId || address.id,
  name: name || user.name || "AC Doctor User",
  date,
  slot: normalizeBookingSlot(slot),
  amount: 0,
  serviceDetails,
 };
 }

 return {
 user_id: user._id || user.userId || user.id,
 name: name || user.name || "AC Doctor User",
 addressId: address._id || address.addressId || address.id,
 slot: normalizeBookingSlot(slot),
 date,
 amount: 2500,
 order_id: createWebsiteOrderId(),
 type: "BOOKING",
 serviceDetails,
 };
}
