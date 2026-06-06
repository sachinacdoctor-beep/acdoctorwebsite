export const AC_DOCTOR_API_BASE_URL =
  process.env.NEXT_PUBLIC_ACDOCTOR_API_BASE_URL ?? "https://api.acdoctor.in";

export const AC_DOCTOR_USER_STORAGE_KEY = "AC_DOCTOR_USER_SESSION";
export const AC_DOCTOR_USER_EVENT = "AC_DOCTOR_USER_SESSION_CHANGED";
export const AC_DOCTOR_LOGIN_MODAL_EVENT = "AC_DOCTOR_LOGIN_MODAL_OPEN";

export const endPoint = {
  LOGIN: "user/login",
  VERIFY_OTP: "user/verify-otp",
  RESET_OTP: "user/resend-otp/",
  REFRESH_TOKEN:
    process.env.NEXT_PUBLIC_ACDOCTOR_REFRESH_TOKEN_ENDPOINT ??
    "technician/refresh-token",
  USER_PROFILE: "user/get-profile/",
  PRE_ASSIGNURL: "user/profile-update/image-url",
  UPDATE_PROFILE: "user/profile-update",
  UPDATE_USERDETAIL: "user/get-profile/",
  NOTIFICATION: "user/notification-list",
  NOTIFY_DETAILS: "user/notification/",
  DELETE_NOTIFICATION: "user/notification/delete/",
  DELETE_ALL_NOTIFICATION: "user/notification/delete-all",
  LOG_OUT: "user/logout/",
  ADD_EDIT_ADDRESS: "user/address-add-edit",
  ADDRESS_GET: "user/address-list/",
  ADDRESS_DELETE: "user/address-delete/",
  DEFAULT_ADDRESS: "user/address/set-default/",
  AUTH_PATNER: "user/partner-list",
  SERVICE_CATEGORIES: "user/service-list",
  BANNER_HOME: "user/home-banners?appType=USER&destination=",
  BRAND_LIST: "user/brand/list",
  BOOKING_LIST: "user/booking-list/",
  BOOKING_DETAIL: "user/booking-details/",
  BOOKING_REQUEST: "user/booking/create",
  BOOKING_RESCHEDULE: "user/booking-reschedule",
  BOOKING_REINITIATE: "user/enquiry/revisit",
  CREATE_CONSULT: "user/consultancy/create",
  GET_ALLCONSULT: "user/consultancy-list/",
  GET_AMC: "user/lead/list/",
  POST_INTEREST: "user/featured/product/interested",
  FEATURED_PRODUCTS: "user/featured/product-list",
  FEATURED_PRODUCT_DETAILS: "user/featured/product",
  ERROR_POST: "user/error-code/list",
  ERROR_CODES: "user/error-code/list",
  AMC_REQUEST: "user/lead/create",
  OLD_AC_REQUEST: "user/enquiry/create",
  OLD_AC_ID_REQUEST: "user/equiry/data/",
  CANCEL_RESHEDUL: "user/enquiry/cancel",
  RE_SCHEDUL_REQUEST: "user/enquiry/reschedule",
  ALL_OLD_REQUEST: "user/myenquiry/list",
  COPPER_REQUEST: "user/enquiry/create",
  GET_MY_REQUEST: "user/myenquiry/list",
  REQUEST_DETAIL: "user/equiry/data/",
  RATE_US: "user/app/review",
  COUPON_GET: "user/coupon/list",
  CUSTOMER_REVIEWS: "user/app/active-reviews",
  REFER_CODE_POST: "user/referral/apply",
  COMPARE_PRODUCT: "user/products",
};

export interface AcDoctorUserSession {
  userId: string;
  phoneNumber: string;
  countryCode: string;
  name?: string;
  email?: string;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  raw?: unknown;
}

export interface UserAddress {
  _id: string;
  addressId?: string;
  userId?: string;
  houseNumber: string;
  street: string;
  state: string;
  city: string;
  zipCode: string;
  isDefault?: boolean | string;
}

export interface UserProfile {
  _id?: string;
  id?: string;
  name?: string;
  fullName?: string;
  userName?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  countryCode?: string;
  email?: string;
  profileImage?: string;
  image?: string;
  raw?: unknown;
}

export type ApiListItem = Record<string, unknown>;

function endpointPath(endpoint: string) {
  return endpoint.startsWith("/") ? endpoint : `/api/v1/${endpoint}`;
}

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function getStoredUserSession(): AcDoctorUserSession | null {
  if (typeof window === "undefined") return null;
  return safeJsonParse<AcDoctorUserSession>(
    window.localStorage.getItem(AC_DOCTOR_USER_STORAGE_KEY),
  );
}

export function saveStoredUserSession(
  user: AcDoctorUserSession,
  emitEvent = true,
) {
  if (typeof window === "undefined") return;
  const nextValue = JSON.stringify(user);
  const currentValue = window.localStorage.getItem(AC_DOCTOR_USER_STORAGE_KEY);

  window.localStorage.setItem(AC_DOCTOR_USER_STORAGE_KEY, nextValue);

  if (emitEvent && currentValue !== nextValue) {
    window.dispatchEvent(new Event(AC_DOCTOR_USER_EVENT));
  }
}

export function updateStoredUserSession(
  partial: Partial<AcDoctorUserSession>,
  emitEvent = true,
) {
  const current = getStoredUserSession();
  if (!current) return;
  saveStoredUserSession({ ...current, ...partial }, emitEvent);
}

export function clearStoredUserSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AC_DOCTOR_USER_STORAGE_KEY);
  window.dispatchEvent(new Event(AC_DOCTOR_USER_EVENT));
}

export function getStoredUserToken() {
  const session = getStoredUserSession();
  return session?.accessToken ?? session?.token ?? "";
}

export function openLoginModal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AC_DOCTOR_LOGIN_MODAL_EVENT));
}

function isExpiredTokenMessage(message: string) {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("invalid or expired token") ||
    normalized.includes("token expired") ||
    normalized.includes("expired token") ||
    normalized.includes("jwt expired") ||
    normalized.includes("invalid token") ||
    normalized.includes("unauthorized")
  );
}

function getResponseMessage(data: unknown) {
  if (!data || typeof data !== "object") return "";
  const record = data as Record<string, unknown>;
  const message = record.message ?? record.error ?? record.msg;
  return typeof message === "string" ? message : "";
}

function forceLoginForExpiredSession() {
  clearStoredUserSession();

  if (typeof window === "undefined") return;

  window.setTimeout(() => {
    openLoginModal();
  }, 0);
}

function createAuthHeader(token?: string): Record<string, string> {
  if (!token) return {};
  return {
    Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
  };
}

function getAuthHeader(): Record<string, string> {
  return createAuthHeader(getStoredUserToken());
}

function normalizeRequestHeaders(
  headers?: RequestInit["headers"],
): Record<string, string> {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  if (Array.isArray(headers)) return Object.fromEntries(headers);
  return headers as Record<string, string>;
}

async function parseResponse(response: Response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getApiErrorMessage(data: unknown, status: number) {
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    const message = record.message ?? record.error ?? record.msg;
    if (typeof message === "string") return message;
  }
  return `Request failed with status ${status}`;
}

function mergeUrl(path: string) {
  return `${AC_DOCTOR_API_BASE_URL}${path}`;
}

async function refreshStoredAccessToken() {
  const session = getStoredUserSession();
  if (!session?.refreshToken) return null;

  const response = await fetch(mergeUrl(endpointPath(endPoint.REFRESH_TOKEN)), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...createAuthHeader(session.refreshToken),
    },
    body: JSON.stringify({
      userId: session.userId,
      refreshToken: session.refreshToken,
    }),
  });

  const data = await parseResponse(response);
  if (!response.ok) return null;

  const accessToken = findValueByKeys(data, [
    "accessToken",
    "access_token",
    "token",
  ]);
  const refreshToken = findValueByKeys(data, ["refreshToken", "refresh_token"]);
  if (!accessToken) return null;

  const updatedSession = {
    ...session,
    accessToken,
    token: accessToken,
    refreshToken: refreshToken ?? session.refreshToken,
  };
  saveStoredUserSession(updatedSession);
  return updatedSession;
}

async function requestJson<T>(
  path: string,
  options?: RequestInit,
  useAuthToken = true,
  retryOnUnauthorized = true,
): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    ...(useAuthToken ? getAuthHeader() : {}),
    ...normalizeRequestHeaders(options?.headers),
  };

  const response = await fetch(mergeUrl(path), { ...options, headers });
  const data = await parseResponse(response);

  const responseMessage = getResponseMessage(data);
  const isAuthExpired =
    useAuthToken &&
    (response.status === 401 ||
      response.status === 403 ||
      isExpiredTokenMessage(responseMessage));

  if (isAuthExpired && retryOnUnauthorized) {
    const refreshedSession = await refreshStoredAccessToken();
    if (refreshedSession?.accessToken) {
      return requestJson<T>(path, options, useAuthToken, false);
    }
  }

  if (isAuthExpired) {
    forceLoginForExpiredSession();
    throw new Error("Your session has expired. Please login again.");
  }

  if (!response.ok) {
    throw new Error(getApiErrorMessage(data, response.status));
  }

  return data as T;
}

function findValueByKeys(source: unknown, keys: string[]): string | undefined {
  if (!source || typeof source !== "object") return undefined;
  const record = source as Record<string, unknown>;
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value;
    if (typeof value === "number") return String(value);
  }
  for (const value of Object.values(record)) {
    const nestedValue = findValueByKeys(value, keys);
    if (nestedValue) return nestedValue;
  }
  return undefined;
}

function getNestedObject(data: unknown): Record<string, unknown> {
  if (!data || typeof data !== "object") return {};
  const record = data as Record<string, unknown>;
  const nested = record.data ?? record.user ?? record.profile ?? record.result;
  if (nested && typeof nested === "object" && !Array.isArray(nested)) {
    return nested as Record<string, unknown>;
  }
  return record;
}

function findArray(data: unknown): ApiListItem[] {
  if (Array.isArray(data)) return data as ApiListItem[];
  if (!data || typeof data !== "object") return [];
  const record = data as Record<string, unknown>;
  const possibleArrays = [
    record.data,
    record.list,
    record.docs,
    record.results,
    record.result,
    record.bookings,
    record.enquiries,
    record.orders,
  ];
  for (const value of possibleArrays) {
    if (Array.isArray(value)) return value as ApiListItem[];
    if (value && typeof value === "object") {
      const nested = findArray(value);
      if (nested.length) return nested;
    }
  }
  return [];
}

export async function loginUser(phoneNumber: string, countryCode = "+91") {
  const data = await requestJson<unknown>(
    endpointPath(endPoint.LOGIN),
    {
      method: "POST",
      body: JSON.stringify({ countryCode, phoneNumber }),
    },
    false,
  );

  const userId = findValueByKeys(data, ["userId", "_id", "id"]);
  const accessToken = findValueByKeys(data, [
    "accessToken",
    "access_token",
    "token",
  ]);
  const refreshToken = findValueByKeys(data, ["refreshToken", "refresh_token"]);

  return { userId, accessToken, refreshToken, raw: data };
}

export async function verifyUserOtp({
  userId,
  otp,
  phoneNumber,
  countryCode,
  accessToken,
  refreshToken,
}: {
  userId: string;
  otp: string;
  phoneNumber: string;
  countryCode: string;
  accessToken?: string;
  refreshToken?: string;
}) {
  const data = await requestJson<unknown>(
    endpointPath(endPoint.VERIFY_OTP),
    {
      method: "POST",
      headers: createAuthHeader(accessToken),
      body: JSON.stringify({ userId, otp: Number(otp) }),
    },
    false,
  );

  const verifiedUserId =
    findValueByKeys(data, ["userId", "_id", "id"]) ?? userId;
  const verifiedAccessToken =
    findValueByKeys(data, ["accessToken", "access_token", "token"]) ??
    accessToken;
  const verifiedRefreshToken =
    findValueByKeys(data, ["refreshToken", "refresh_token"]) ?? refreshToken;
  const name = findValueByKeys(data, ["name", "fullName", "userName"]);
  const email = findValueByKeys(data, ["email"]);

  const session: AcDoctorUserSession = {
    userId: verifiedUserId,
    phoneNumber,
    countryCode,
    name,
    email,
    token: verifiedAccessToken,
    accessToken: verifiedAccessToken,
    refreshToken: verifiedRefreshToken,
    raw: data,
  };

  saveStoredUserSession(session);
  return session;
}

function normalizeAddress(rawAddress: Record<string, unknown>): UserAddress {
  const addressId = String(
    rawAddress._id ?? rawAddress.addressId ?? rawAddress.id ?? "",
  ).trim();
  return {
    _id: addressId,
    addressId:
      typeof rawAddress.addressId === "string"
        ? rawAddress.addressId
        : undefined,
    userId:
      typeof rawAddress.userId === "string" ? rawAddress.userId : undefined,
    houseNumber: String(
      rawAddress.houseNumber ?? rawAddress.houseNo ?? rawAddress.flatNo ?? "",
    ),
    street: String(
      rawAddress.street ??
        rawAddress.address ??
        rawAddress.area ??
        rawAddress.addressLine ??
        "",
    ),
    state: String(rawAddress.state ?? ""),
    city: String(rawAddress.city ?? ""),
    zipCode: String(
      rawAddress.zipCode ?? rawAddress.pincode ?? rawAddress.pinCode ?? "",
    ),
    isDefault: rawAddress.isDefault as boolean | string | undefined,
  };
}

function findAddressArray(data: unknown): Record<string, unknown>[] {
  if (Array.isArray(data)) return data as Record<string, unknown>[];
  if (!data || typeof data !== "object") return [];
  const record = data as Record<string, unknown>;
  const possibleArrays = [
    record.data,
    record.addresses,
    record.addressList,
    record.result,
    record.results,
    record.docs,
  ];
  for (const value of possibleArrays) {
    if (Array.isArray(value)) return value as Record<string, unknown>[];
    if (value && typeof value === "object") {
      const nested = findAddressArray(value);
      if (nested.length) return nested;
    }
  }
  return [];
}

export async function updateUserProfileName({
  userId,
  userName,
}: {
  userId: string;
  userName: string;
}) {
  const cleanedName = userName.trim();
  if (!cleanedName) {
    throw new Error("Customer name is required.");
  }

  const data = await requestJson<unknown>(
    endpointPath(endPoint.UPDATE_PROFILE),
    {
      method: "POST",
      body: JSON.stringify({
        userId,
        userName: cleanedName,
      }),
    },
  );

  updateStoredUserSession({ name: cleanedName });
  return data;
}

export async function getUserProfile(userId: string) {
  const data = await requestJson<unknown>(
    endpointPath(`${endPoint.USER_PROFILE}${userId}`),
  );
  const record = getNestedObject(data);
  const profile: UserProfile = {
    _id: findValueByKeys(record, ["_id"]),
    id: findValueByKeys(record, ["id"]),
    name: findValueByKeys(record, ["name"]),
    fullName: findValueByKeys(record, ["fullName"]),
    userName: findValueByKeys(record, ["userName"]),
    phoneNumber: findValueByKeys(record, ["phoneNumber", "mobileNumber"]),
    mobileNumber: findValueByKeys(record, ["mobileNumber"]),
    countryCode: findValueByKeys(record, ["countryCode"]),
    email: findValueByKeys(record, ["email"]),
    profileImage: findValueByKeys(record, [
      "profileImage",
      "profilePic",
      "image",
    ]),
    image: findValueByKeys(record, ["image"]),
    raw: data,
  };

  updateStoredUserSession(
    {
      name: profile.name ?? profile.fullName ?? profile.userName,
      phoneNumber: profile.phoneNumber ?? profile.mobileNumber,
      countryCode: profile.countryCode,
      email: profile.email,
    },
    false,
  );

  return profile;
}

export async function getUserAddresses(userId: string) {
  const data = await requestJson<unknown>(
    endpointPath(`${endPoint.ADDRESS_GET}${userId}`),
  );
  return findAddressArray(data)
    .map(normalizeAddress)
    .filter((address) => Boolean(address._id));
}

export async function addOrEditUserAddress(
  address: Omit<UserAddress, "_id"> & { addressId?: string },
) {
  const addressId = String(address.addressId ?? "").trim();
  const payload: Record<string, unknown> = {
    userId: address.userId,
    houseNumber: address.houseNumber,
    street: address.street,
    state: address.state,
    city: address.city,
    zipCode: address.zipCode,
  };

  // Backend rule: add address = no addressId; edit address = send addressId.
  if (addressId) {
    payload.addressId = addressId;
  }

  // Optional only when backend/UI explicitly provides it.
  if (address.isDefault !== undefined) {
    payload.isDefault = String(address.isDefault);
  }

  return requestJson<unknown>(endpointPath(endPoint.ADD_EDIT_ADDRESS), {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function setDefaultUserAddress(addressId: string) {
  const cleanedAddressId = String(addressId || "").trim();
  if (!cleanedAddressId) {
    throw new Error("Address ID is required to set default address.");
  }

  return requestJson<unknown>(
    endpointPath(`${endPoint.DEFAULT_ADDRESS}${cleanedAddressId}`),
    {
      method: "POST",
      body: JSON.stringify({ addressId: cleanedAddressId }),
    },
  );
}


export async function submitFeaturedProductInterest(productId: string) {
  const cleanedProductId = String(productId || "").trim();

  if (!cleanedProductId) {
    throw new Error("Product ID is required.");
  }

  return requestJson<unknown>(endpointPath(endPoint.POST_INTEREST), {
    method: "POST",
    body: JSON.stringify({
      productId: cleanedProductId,
    }),
  });
}

export async function createUserBooking(payload: unknown) {
  return requestJson<unknown>(endpointPath(endPoint.BOOKING_REQUEST), {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createUserEnquiry(payload: unknown) {
  return requestJson<unknown>(endpointPath(endPoint.OLD_AC_REQUEST), {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getUserBookings(userId: string) {
  const data = await requestJson<unknown>(
    endpointPath(`${endPoint.BOOKING_LIST}${userId}`),
  );
  return findArray(data);
}

export async function getUserBookingDetail(bookingId: string) {
  const cleanedBookingId = String(bookingId || "").trim();
  if (!cleanedBookingId) {
    throw new Error("Booking ID is required.");
  }

  const data = await requestJson<unknown>(
    endpointPath(`${endPoint.BOOKING_DETAIL}${cleanedBookingId}`),
  );
  return getNestedObject(data);
}

export async function getUserRequests(userId: string) {
  const data = await requestJson<unknown>(
    endpointPath(`${endPoint.GET_MY_REQUEST}${userId}`),
  );
  return findArray(data);
}

export async function getUserConsultancies(userId: string) {
  const data = await requestJson<unknown>(
    endpointPath(`${endPoint.GET_ALLCONSULT}${userId}`),
  );
  return findArray(data);
}

export async function getUserOrders(userId: string) {
  // No dedicated My Orders endpoint was provided in the shared endpoint list.
  // This candidate keeps the UI ready if your backend exposes the common order-list path.
  const data = await requestJson<unknown>(
    endpointPath(`user/order-list/${userId}`),
  );
  return findArray(data);
}

export async function logoutUser(userId: string) {
  try {
    await requestJson<unknown>(endpointPath(`${endPoint.LOG_OUT}${userId}`), {
      method: "POST",
    });
  } finally {
    clearStoredUserSession();
  }
}
