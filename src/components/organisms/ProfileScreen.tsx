"use client";

import { useEffect, useRef, useState } from "react";
import {
  AC_DOCTOR_USER_EVENT,
  ApiListItem,
  UserProfile,
  clearStoredUserSession,
  getStoredUserSession,
  getUserBookingDetail,
  getUserBookings,
  getUserProfile,
  openLoginModal,
} from "@/lib/auth";

type DetailValue = unknown;

function getText(item: ApiListItem, keys: string[], fallback = "-") {
  for (const key of keys) {
    const value = item[key];
    if (typeof value === "string" && value.trim()) return value;
    if (typeof value === "number") return String(value);
  }
  return fallback;
}

function getBookingId(item: ApiListItem) {
  return getText(
    item,
    ["bookingId", "booking_id", "bookingNo", "bookingNumber", "_id", "id"],
    "",
  );
}

function getDisplayBookingId(item: ApiListItem) {
  return getText(
    item,
    ["bookingId", "booking_id", "bookingNo", "bookingNumber"],
    "Booking",
  );
}

function formatDate(value: unknown) {
  if (typeof value !== "string" || !value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const day = date.toLocaleDateString("en-IN", { day: "2-digit" });
  const month = date.toLocaleDateString("en-IN", { month: "long" });
  const year = date.toLocaleDateString("en-IN", { year: "numeric" });

  return `${day}-${month}-${year}`;
}

function isDateKey(key: string) {
  const normalized = key.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return normalized.includes("date") || normalized.endsWith("at");
}

function isHiddenBookingDetailKey(key: string) {
  const normalized = key.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  return (
    normalized === "email" ||
    normalized === "useremail" ||
    normalized === "customeremail" ||
    normalized === "createdat" ||
    normalized === "amount" ||
    normalized === "totalamount" ||
    normalized === "payableamount" ||
    normalized === "paidamount" ||
    normalized === "paymentamount"
  );
}

function formatLabel(key: string) {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function isEmptyValue(value: DetailValue) {
  if (value === null || value === undefined || value === false) return true;
  if (typeof value === "string" && !value.trim()) return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value as Record<string, unknown>).length === 0
  ) {
    return true;
  }
  return false;
}

function isInternalIdKey(key: string) {
  const normalized = key.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  if (["bookingid", "bookingno", "bookingnumber"].includes(normalized)) {
    return false;
  }

  return (
    normalized === "id" ||
    normalized === "userid" ||
    normalized === "customerid" ||
    normalized === "addressid" ||
    normalized === "serviceid" ||
    normalized === "productid" ||
    normalized === "cartid" ||
    normalized === "orderid" ||
    normalized === "createdby" ||
    normalized === "updatedby" ||
    normalized.endsWith("userid") ||
    (normalized.endsWith("id") && !normalized.endsWith("paid")) ||
    key === "_id"
  );
}

function formatValue(value: DetailValue, key = ""): string {
  if (value === true) return "Yes";
  if (typeof value === "string")
    return isDateKey(key) ? formatDate(value) : value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    return value
      .filter((item) => !isEmptyValue(item))
      .map((item) => formatValue(item, key))
      .join(", ");
  }
  return "";
}

function visibleEntries(source: DetailValue): [string, DetailValue][] {
  if (!source || typeof source !== "object" || Array.isArray(source)) return [];
  return Object.entries(source as Record<string, unknown>).filter(
    ([key, value]) =>
      !["__v", "raw"].includes(key) &&
      !isHiddenBookingDetailKey(key) &&
      !isInternalIdKey(key) &&
      !isEmptyValue(value),
  );
}

function DetailRows({
  data,
  level = 0,
}: {
  data: DetailValue;
  level?: number;
}) {
  const entries = visibleEntries(data);
  if (!entries.length) return null;

  return (
    <div className={level === 0 ? "space-y-3" : "mt-3 space-y-2"}>
      {entries.map(([key, value]) => {
        if (
          Array.isArray(value) &&
          value.some((item) => typeof item === "object" && item !== null)
        ) {
          return (
            <div
              key={key}
              className="rounded-[16px] border border-[#222]/10 bg-[#f8f8f8] p-3"
            >
              <p className="font-['Montserrat',sans-serif] text-[13px] font-bold text-[#222]">
                {formatLabel(key)}
              </p>
              <div className="mt-3 space-y-3">
                {value.map((item, index) => (
                  <div
                    key={`${key}-${index}`}
                    className="rounded-[14px] border border-[#222]/10 bg-white p-3"
                  >
                    {typeof item === "object" && item !== null ? (
                      <DetailRows data={item} level={level + 1} />
                    ) : (
                      <p className="font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#222]">
                        {formatValue(item, key)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          return (
            <div
              key={key}
              className="rounded-[16px] border border-[#222]/10 bg-[#f8f8f8] p-3"
            >
              <p className="font-['Montserrat',sans-serif] text-[13px] font-bold text-[#222]">
                {formatLabel(key)}
              </p>
              <DetailRows data={value} level={level + 1} />
            </div>
          );
        }

        return (
          <div
            key={key}
            className="grid grid-cols-1 gap-1 rounded-[14px] border border-[#222]/10 bg-white px-3 py-2 sm:grid-cols-[160px_1fr]"
          >
            <p className="font-['Montserrat',sans-serif] text-[12px] font-bold text-[#222]/55">
              {formatLabel(key)}
            </p>
            <p className="break-words font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#222]">
              {formatValue(value, key)}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function ListCard({ item, onOpen }: { item: ApiListItem; onOpen: () => void }) {
  const title = getDisplayBookingId(item);
  const status = getText(
    item,
    ["status", "bookingStatus", "paymentStatus"],
    "Pending",
  );
  const service = getText(
    item,
    ["serviceName", "serviceType", "category", "type", "acType"],
    "AC Service",
  );
  const bookingDate =
    item.bookingDate ?? item.date ?? item.createdAt ?? item.updatedAt;
  const slot = getText(item, ["slot", "timeSlot", "bookingSlot"], "-");
  const address = getText(
    item,
    ["address", "fullAddress", "serviceAddress"],
    "",
  );

  return (
    <button
      type="button"
      onClick={onOpen}
      className="rounded-[20px] border border-[#222]/10 bg-white p-4 text-left shadow-[0_10px_28px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:border-[#e31e25]/35 hover:shadow-[0_14px_34px_rgba(227,30,37,0.12)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="break-words font-['Montserrat',sans-serif] text-[16px] font-bold text-[#222]">
            {title}
          </h3>
          <p className="mt-1 font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#222]/65">
            {service}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-[#e31e25]/10 px-3 py-1 font-['Montserrat',sans-serif] text-[12px] font-bold text-[#e31e25]">
          {status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <p className="rounded-[12px] bg-[#f6f6f6] px-3 py-2 font-['Montserrat',sans-serif] text-[12px] font-semibold text-[#222]/70">
          Date: {formatDate(bookingDate)}
        </p>
        <p className="rounded-[12px] bg-[#f6f6f6] px-3 py-2 font-['Montserrat',sans-serif] text-[12px] font-semibold text-[#222]/70">
          Slot: {slot}
        </p>
      </div>
      {address ? (
        <p className="mt-3 line-clamp-2 font-['Montserrat',sans-serif] text-[12px] leading-[20px] text-[#222]/55">
          {address}
        </p>
      ) : null}
      <p className="mt-4 font-['Montserrat',sans-serif] text-[12px] font-bold text-[#e31e25]">
        View full details
      </p>
    </button>
  );
}

export function ProfileScreen() {
  const [session, setSession] = useState(getStoredUserSession());
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<ApiListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<ApiListItem | null>(
    null,
  );
  const [bookingDetail, setBookingDetail] = useState<Record<
    string,
    unknown
  > | null>(null);
  const loadedUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const loadProfileData = async (force = false) => {
      const storedSession = getStoredUserSession();
      setSession(storedSession);

      if (!storedSession?.userId) {
        loadedUserIdRef.current = null;
        setProfile(null);
        setBookings([]);
        setLoading(false);
        return;
      }

      if (!force && loadedUserIdRef.current === storedSession.userId) {
        setSession(storedSession);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const [profileData, bookingData] = await Promise.all([
          getUserProfile(storedSession.userId),
          getUserBookings(storedSession.userId).catch(() => []),
        ]);
        loadedUserIdRef.current = storedSession.userId;
        setProfile(profileData);
        setBookings(bookingData);
      } catch (apiError) {
        setError(
          apiError instanceof Error
            ? apiError.message
            : "Unable to load bookings.",
        );
      } finally {
        setLoading(false);
      }
    };

    void loadProfileData(true);
    const handleSessionChanged = () => {
      void loadProfileData(true);
    };
    window.addEventListener(AC_DOCTOR_USER_EVENT, handleSessionChanged);
    window.addEventListener("storage", handleSessionChanged);

    return () => {
      window.removeEventListener(AC_DOCTOR_USER_EVENT, handleSessionChanged);
      window.removeEventListener("storage", handleSessionChanged);
    };
  }, []);

  const displayName =
    profile?.name ??
    profile?.fullName ??
    profile?.userName ??
    session?.name ??
    "AC Doctor User";
  const phoneNumber =
    profile?.phoneNumber ?? profile?.mobileNumber ?? session?.phoneNumber ?? "";

  const handleOpenBooking = async (booking: ApiListItem) => {
    setSelectedBooking(booking);
    setBookingDetail(null);
    const bookingId = getBookingId(booking);

    if (!bookingId) {
      setBookingDetail(booking);
      return;
    }

    try {
      setDetailLoading(true);
      const detail = await getUserBookingDetail(bookingId);
      setBookingDetail(Object.keys(detail).length ? detail : booking);
    } catch {
      setBookingDetail(booking);
    } finally {
      setDetailLoading(false);
    }
  };

  if (!session?.userId) {
    return (
      <section className="min-h-screen bg-[#f5f5f5] pt-[92px] md:pt-[118px]">
        <div className="mx-auto max-w-[720px] px-4 py-16 text-center sm:px-8">
          <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_70px_rgba(0,0,0,0.10)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e31e25]/10 text-[34px]">
              👤
            </div>
            <h1 className="mt-5 font-['Montserrat',sans-serif] text-[28px] font-bold text-[#222]">
              Login required
            </h1>
            <p className="mx-auto mt-2 max-w-[420px] font-['Montserrat',sans-serif] text-[14px] leading-[24px] text-[#222]/65">
              Login with OTP once. After login, your booking details will show
              here.
            </p>
            <button
              type="button"
              onClick={openLoginModal}
              className="mt-6 inline-flex rounded-full bg-[#e31e25] px-6 py-3 font-['Montserrat',sans-serif] text-[14px] font-bold text-white"
            >
              Login Now
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f5f5f5] pt-[92px] md:pt-[118px]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-4 pb-14 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-[24px] bg-white border border-[#222]/10 px-5 py-7 shadow-[0_20px_70px_rgba(0,0,0,0.18)] md:rounded-[34px] md:px-10 md:py-10">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#e31e25]/35 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-['Montserrat',sans-serif] text-[13px] font-semibold uppercase tracking-[0.18em] text-[#e31e25]">
                Profile
              </p>
              <h1 className="mt-2 font-['Montserrat',sans-serif] text-[32px] font-bold text-[#222] md:text-[46px]">
                {displayName}
              </h1>
              <p className="mt-2 font-['Montserrat',sans-serif] text-[14px] text-[#222]/65">
                {profile?.countryCode ?? session.countryCode ?? "+91"}{" "}
                {phoneNumber}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                clearStoredUserSession();
                window.location.href = "/";
              }}
              className="w-fit rounded-full border border-[#222]/10 px-5 py-3 font-['Montserrat',sans-serif] text-[13px] font-bold text-[#222] hover:bg-[#f5f5f5] hover:text-[#e31e25]"
            >
              Logout
            </button>
          </div>
        </div>

        {error ? (
          <div className="rounded-[14px] border border-[#e31e25]/25 bg-[#e31e25]/8 px-4 py-3 font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#c8181e]">
            {error}
          </div>
        ) : null}

        <div className="rounded-[24px] bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.07)] md:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-['Montserrat',sans-serif] text-[22px] font-bold text-[#222]">
                My Bookings
              </h2>
              <p className="mt-1 font-['Montserrat',sans-serif] text-[13px] text-[#222]/55">
                {bookings.length} booking{bookings.length === 1 ? "" : "s"}{" "}
                found
              </p>
            </div>
            {loading ? (
              <span className="font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#e31e25]">
                Loading...
              </span>
            ) : null}
          </div>

          {!loading && bookings.length === 0 ? (
            <div className="rounded-[20px] border border-dashed border-[#222]/15 p-8 text-center">
              <p className="font-['Montserrat',sans-serif] text-[15px] font-semibold text-[#222]/65">
                No booking found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {bookings.map((item, index) => (
                <ListCard
                  key={String(item._id ?? item.id ?? item.bookingId ?? index)}
                  item={item}
                  onOpen={() => void handleOpenBooking(item)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedBooking ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[88vh] w-full max-w-[760px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.30)]">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#222]/10 bg-white px-5 py-4">
              <div>
                <p className="font-['Montserrat',sans-serif] text-[12px] font-semibold uppercase tracking-[0.16em] text-[#e31e25]">
                  Booking Details
                </p>
                <h3 className="mt-1 font-['Montserrat',sans-serif] text-[20px] font-bold text-[#222]">
                  {getDisplayBookingId(selectedBooking)}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedBooking(null);
                  setBookingDetail(null);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f5] font-['Montserrat',sans-serif] text-[18px] font-bold text-[#222] hover:bg-[#e31e25] hover:text-white"
                aria-label="Close booking details"
              >
                ×
              </button>
            </div>
            <div className="max-h-[calc(88vh-84px)] overflow-y-auto p-5">
              {detailLoading ? (
                <p className="font-['Montserrat',sans-serif] text-[14px] font-semibold text-[#e31e25]">
                  Loading booking details...
                </p>
              ) : (
                <DetailRows data={bookingDetail ?? selectedBooking} />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
