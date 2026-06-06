"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ServiceCard as ServiceBookingCard } from "@/components/molecules/ServiceCard";
import { useEffect, useMemo, useState } from "react";
import {
  BOOKING_CART_EVENT,
  BookingCart,
  clearStoredCart,
  createFinalBookingPayload,
  getCartTotalQuantity,
  getCartUniqueCount,
  getStoredCart,
  isOtherCartItem,
  removeStoredCartItem,
  updateStoredCartItemQuantity,
} from "@/lib/cart";
import {
  AcDoctorUserSession,
  UserAddress,
  addOrEditUserAddress,
  createUserBooking,
  getStoredUserSession,
  getUserAddresses,
  getUserProfile,
  loginUser,
  setDefaultUserAddress,
  updateUserProfileName,
  verifyUserOtp,
} from "@/lib/auth";
import { SERVICES } from "@/lib/data";
import {
  fetchServiceList,
  isHiddenFrontendService,
  mapApiServiceToServiceCard,
} from "@/lib/services";
import type { ServiceCard as ServiceCardType } from "@/types";

type CheckoutStep = "phone" | "otp" | "address";

function getTodayInputValue() {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 10);
}

function addDaysInputValue(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 10);
}

function getAllowedMinimumBookingDate() {
  const now = new Date();
  return addDaysInputValue(now.getHours() >= 17 ? 1 : 0);
}

function isSameInputDateAsToday(value: string) {
  return value === getTodayInputValue();
}

function isFirstHalfBlockedForDate(value: string) {
  const now = new Date();
  return isSameInputDateAsToday(value) && now.getHours() >= 13;
}

function getInitialBookingSlot(dateValue: string) {
  return isFirstHalfBlockedForDate(dateValue) ? "SECOND_HALF" : "FIRST_HALF";
}

function formatAddress(address: UserAddress) {
  return [
    address.houseNumber,
    address.street,
    address.city,
    address.state,
    address.zipCode,
  ]
    .filter(Boolean)
    .join(", ");
}

function isDefaultAddress(address: UserAddress) {
  return (
    address.isDefault === true ||
    String(address.isDefault).toLowerCase() === "true"
  );
}

const INDIA_LOCATION_OPTIONS = [
  {
    state: "Andhra Pradesh",
    cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
  },
  { state: "Bihar", cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"] },
  { state: "Delhi", cities: ["New Delhi", "Delhi"] },
  { state: "Gujarat", cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"] },
  { state: "Haryana", cities: ["Gurugram", "Faridabad", "Panipat", "Ambala"] },
  {
    state: "Karnataka",
    cities: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
  },
  {
    state: "Madhya Pradesh",
    cities: ["Indore", "Bhopal", "Ujjain", "Jabalpur", "Gwalior"],
  },
  { state: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur", "Nashik"] },
  { state: "Punjab", cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"] },
  { state: "Rajasthan", cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota"] },
  {
    state: "Tamil Nadu",
    cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  },
  {
    state: "Telangana",
    cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  },
  {
    state: "Uttar Pradesh",
    cities: ["Lucknow", "Kanpur", "Noida", "Ghaziabad", "Varanasi"],
  },
  {
    state: "West Bengal",
    cities: ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
  },
];

function getCitiesByState(state: string) {
  return (
    INDIA_LOCATION_OPTIONS.find((item) => item.state === state)?.cities ?? []
  );
}

function CheckoutDrawer({
  open,
  cart,
  onClose,
  onBooked,
}: {
  open: boolean;
  cart: BookingCart;
  onClose: () => void;
  onBooked: (successMessage?: string) => void;
}) {
  const [user, setUser] = useState<AcDoctorUserSession | null>(null);
  const [step, setStep] = useState<CheckoutStep>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loginUserId, setLoginUserId] = useState("");
  const [loginAccessToken, setLoginAccessToken] = useState("");
  const [loginRefreshToken, setLoginRefreshToken] = useState("");
  const [otp, setOtp] = useState("");
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [bookingDate, setBookingDate] = useState(
    getAllowedMinimumBookingDate(),
  );
  const [slot, setSlot] = useState(() =>
    getInitialBookingSlot(getAllowedMinimumBookingDate()),
  );
  const [addressForm, setAddressForm] = useState<
    Record<"houseNumber" | "street" | "city" | "state" | "zipCode", string>
  >({
    houseNumber: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectedAddress = useMemo(
    () =>
      addresses.find((address) => address._id === selectedAddressId) ?? null,
    [addresses, selectedAddressId],
  );

  const cityOptions = useMemo(
    () => getCitiesByState(addressForm.state),
    [addressForm.state],
  );

  const minimumBookingDate = getAllowedMinimumBookingDate();
  const firstHalfBlocked = isFirstHalfBlockedForDate(bookingDate);

  useEffect(() => {
    const minimumDate = getAllowedMinimumBookingDate();

    if (!bookingDate || bookingDate < minimumDate) {
      setBookingDate(minimumDate);
      setSlot(getInitialBookingSlot(minimumDate));
      return;
    }

    if (isFirstHalfBlockedForDate(bookingDate) && slot === "FIRST_HALF") {
      setSlot("SECOND_HALF");
    }
  }, [bookingDate, slot]);

  const updateAddressField = (
    field: keyof typeof addressForm,
    value: string,
  ) => {
    setAddressForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "state" ? { city: "" } : {}),
    }));
  };

  const loadAddresses = async (userId: string) => {
    try {
      setLoading(true);
      setError("");
      const addressList = await getUserAddresses(userId);
      setAddresses(addressList);

      const defaultAddress =
        addressList.find((address) => isDefaultAddress(address)) ??
        addressList[0];
      setSelectedAddressId(defaultAddress?._id ?? "");
      setShowAddressForm(addressList.length === 0);
    } catch (apiError) {
      setError(
        apiError instanceof Error
          ? apiError.message
          : "Unable to load your saved addresses.",
      );
      setShowAddressForm(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    const storedUser = getStoredUserSession();
    setUser(storedUser);
    setMessage("");
    setError("");
    setEditingAddressId("");
    const nextBookingDate = getAllowedMinimumBookingDate();
    setBookingDate(nextBookingDate);
    setSlot(getInitialBookingSlot(nextBookingDate));

    if (storedUser?.userId) {
      setStep("address");
      setCustomerName(storedUser.name ?? "");
      void getUserProfile(storedUser.userId)
        .then((profile) => {
          const profileName =
            profile.name ??
            profile.fullName ??
            profile.userName ??
            storedUser.name ??
            "";
          setCustomerName(profileName);
          setUser((prev) =>
            prev ? { ...prev, name: profileName, email: profile.email } : prev,
          );
        })
        .catch(() => undefined);
      void loadAddresses(storedUser.userId);
    } else {
      setStep("phone");
      setPhoneNumber("");
      setOtp("");
      setLoginUserId("");
      setLoginAccessToken("");
      setLoginRefreshToken("");
      setAddresses([]);
      setSelectedAddressId("");
      setShowAddressForm(false);
      setEditingAddressId("");
    }
  }, [open]);

  if (!open) return null;

  const handleLogin = async () => {
    const sanitizedPhone = phoneNumber.replace(/\D/g, "");

    if (sanitizedPhone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");
      const response = await loginUser(sanitizedPhone, "+91");

      if (!response.userId) {
        throw new Error(
          "Login response did not include a user ID. Please check the API response.",
        );
      }

      if (!response.accessToken) {
        throw new Error(
          "Login response did not include an access token. OTP verification requires the login token.",
        );
      }

      setLoginUserId(response.userId);
      setLoginAccessToken(response.accessToken);
      setLoginRefreshToken(response.refreshToken ?? "");
      setStep("otp");
      setMessage(
        "OTP has been sent. Please enter the OTP to verify your account.",
      );
    } catch (apiError) {
      setError(apiError instanceof Error ? apiError.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!loginUserId) {
      setError(
        "User ID is missing. Please log in again with your mobile number.",
      );
      setStep("phone");
      return;
    }

    if (otp.replace(/\D/g, "").length !== 4) {
      setError("Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");
      const session = await verifyUserOtp({
        userId: loginUserId,
        otp: otp.replace(/\D/g, "").slice(0, 4),
        phoneNumber: phoneNumber.replace(/\D/g, ""),
        countryCode: "+91",
        accessToken: loginAccessToken,
        refreshToken: loginRefreshToken,
      });

      setUser(session);
      setCustomerName(session.name ?? "");
      setStep("address");
      const profile = await getUserProfile(session.userId).catch(() => null);
      const profileName =
        profile?.name ??
        profile?.fullName ??
        profile?.userName ??
        session.name ??
        "";
      setCustomerName(profileName);
      setUser({ ...session, name: profileName, email: profile?.email });
      setMessage(
        "Login successful. Saved profile and address will be used automatically.",
      );
      await loadAddresses(session.userId);
    } catch (apiError) {
      setError(
        apiError instanceof Error
          ? apiError.message
          : "OTP verification failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAddress = async () => {
    if (!user?.userId) {
      setError("Login is required.");
      return;
    }

    if (!customerName.trim()) {
      setError("Please enter customer name.");
      return;
    }

    const requiredAddressFields: Array<keyof typeof addressForm> = [
      "street",
      "state",
      "city",
    ];
    const missingField = requiredAddressFields.find(
      (field) => !String(addressForm[field]).trim(),
    );
    if (missingField) {
      setError("Please complete required address fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await updateUserProfileName({
        userId: user.userId,
        userName: customerName,
      });
      setUser((prev) => (prev ? { ...prev, name: customerName.trim() } : prev));
      await addOrEditUserAddress({
        ...(editingAddressId ? { addressId: editingAddressId } : {}),
        userId: user.userId,
        houseNumber: addressForm.houseNumber,
        street: addressForm.street,
        city: addressForm.city,
        state: addressForm.state,
        zipCode: addressForm.zipCode,
      });
      setMessage(
        editingAddressId
          ? "Name and address updated successfully."
          : "Name and address saved successfully.",
      );
      setShowAddressForm(false);
      setEditingAddressId("");
      setAddressForm({
        houseNumber: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
      });
      await loadAddresses(user.userId);
    } catch (apiError) {
      setError(
        apiError instanceof Error ? apiError.message : "Address save failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditAddress = (address: UserAddress) => {
    setEditingAddressId(address.addressId ?? address._id);
    setSelectedAddressId(address._id);
    setAddressForm({
      houseNumber: address.houseNumber ?? "",
      street: address.street ?? "",
      city: address.city ?? "",
      state: address.state ?? "",
      zipCode: address.zipCode ?? "",
    });
    setShowAddressForm(true);
  };

  const handleSetDefaultAddress = async (address: UserAddress) => {
    const addressId = address._id || address.addressId || "";
    if (!addressId || !user?.userId) return;

    setSelectedAddressId(addressId);

    if (isDefaultAddress(address)) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");
      await setDefaultUserAddress(addressId);
      setMessage("Default address updated successfully.");
      await loadAddresses(user.userId);
    } catch (apiError) {
      setError(
        apiError instanceof Error
          ? apiError.message
          : "Default address update failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewAddress = () => {
    setEditingAddressId("");
    setAddressForm({
      houseNumber: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
    });
    setShowAddressForm((value) => !value);
  };

  const handleCreateBooking = async () => {
    if (!user?.userId) {
      setStep("phone");
      setError("Please log in before proceeding.");
      return;
    }

    const minimumDate = getAllowedMinimumBookingDate();
    if (!bookingDate || bookingDate < minimumDate) {
      setBookingDate(minimumDate);
      setSlot(getInitialBookingSlot(minimumDate));
      setError("Please select today or a future available booking date.");
      return;
    }

    if (isFirstHalfBlockedForDate(bookingDate) && slot === "FIRST_HALF") {
      setSlot("SECOND_HALF");
      setError(
        "First Half slot is not available after 1 PM. Please select Second Half.",
      );
      return;
    }

    if (!customerName.trim() && !user.name?.trim()) {
      setError("Please enter customer name once to continue.");
      setShowAddressForm(true);
      return;
    }

    if (!selectedAddress) {
      setError("Please select an address or add a new one.");
      setShowAddressForm(true);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const cartItems = Object.values(cart).filter(
        (item) => Number(item.quantity) > 0,
      );

      if (!cartItems.length) {
        setError("Your cart is empty.");
        return;
      }

      const bookingPayload = createFinalBookingPayload({
        cart,
        user,
        address: selectedAddress,
        name: customerName,
        date: bookingDate,
        slot,
      });

      console.log(
        "AC Doctor final booking payload:",
        JSON.stringify(bookingPayload, null, 2),
      );
      const bookingResponse = await createUserBooking(bookingPayload);
      console.log("AC Doctor booking API response:", bookingResponse);

      const successMessage = "Booking created successfully.";
      setMessage(successMessage);
      onBooked(successMessage);
      onClose();
    } catch (apiError) {
      setError(
        apiError instanceof Error ? apiError.message : "Booking create failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex justify-end bg-black/45 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close checkout"
        className="hidden flex-1 cursor-default md:block"
        onClick={onClose}
      />

      <aside className="h-full w-full overflow-y-auto bg-white shadow-[-18px_0_60px_rgba(0,0,0,0.22)] md:max-w-[500px]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#222]/10 bg-white/95 px-5 py-4 backdrop-blur-md">
          <div>
            <p className="font-['Montserrat',sans-serif] text-[12px] font-semibold uppercase tracking-[0.18em] text-[#e31e25]">
              Checkout
            </p>
            <h2 className="font-['Montserrat',sans-serif] text-[22px] font-bold text-[#222]">
              {step === "phone"
                ? "Login"
                : step === "otp"
                  ? "Verify OTP"
                  : "Address"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f5] text-[24px] text-[#222] hover:bg-[#e31e25] hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="space-y-5 px-5 py-5">
          <div className="rounded-[18px] bg-[#f5f5f5] p-4">
            <p className="font-['Montserrat',sans-serif] text-[13px] text-[#222]/60">
              Cart Summary
            </p>
            <p className="mt-1 font-['Montserrat',sans-serif] text-[18px] font-bold text-[#222]">
              {getCartUniqueCount(cart)} items · {getCartTotalQuantity(cart)}{" "}
              total quantity
            </p>
          </div>

          {message ? (
            <div className="rounded-[14px] border border-green-500/25 bg-green-50 px-4 py-3 font-['Montserrat',sans-serif] text-[13px] font-semibold text-green-700">
              {message}
            </div>
          ) : null}

          {error ? (
            <div className="rounded-[14px] border border-[#e31e25]/25 bg-[#e31e25]/8 px-4 py-3 font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#c8181e]">
              {error}
            </div>
          ) : null}

          {step === "phone" ? (
            <div className="space-y-4">
              <div>
                <label className="font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#222]">
                  Mobile Number
                </label>
                <div className="mt-2 flex overflow-hidden rounded-[16px] border border-[#222]/10 bg-[#f5f5f5]">
                  <span className="flex items-center border-r border-[#222]/10 px-4 font-['Montserrat',sans-serif] text-[15px] font-bold text-[#222]">
                    +91
                  </span>
                  <input
                    value={phoneNumber}
                    onChange={(event) =>
                      setPhoneNumber(
                        event.target.value.replace(/\D/g, "").slice(0, 10),
                      )
                    }
                    maxLength={10}
                    inputMode="numeric"
                    placeholder="Enter mobile number"
                    className="min-h-[52px] flex-1 bg-transparent px-4 font-['Montserrat',sans-serif] text-[15px] font-semibold text-[#222] outline-none placeholder:text-[#222]/40"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="flex w-full items-center justify-center rounded-full bg-[#e31e25] px-5 py-3.5 font-['Montserrat',sans-serif] text-[15px] font-bold text-white hover:bg-[#c8181e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Please wait..." : "Continue"}
              </button>
            </div>
          ) : null}

          {step === "otp" ? (
            <div className="space-y-4">
              <div>
                <label className="font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#222]">
                  OTP
                </label>
                <input
                  value={otp}
                  onChange={(event) =>
                    setOtp(event.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  maxLength={4}
                  inputMode="numeric"
                  placeholder="Enter OTP"
                  className="mt-2 min-h-[52px] w-full rounded-[16px] border border-[#222]/10 bg-[#f5f5f5] px-4 font-['Montserrat',sans-serif] text-[15px] font-semibold text-[#222] outline-none placeholder:text-[#222]/40"
                />
              </div>
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={loading}
                className="flex w-full items-center justify-center rounded-full bg-[#e31e25] px-5 py-3.5 font-['Montserrat',sans-serif] text-[15px] font-bold text-white hover:bg-[#c8181e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              <button
                type="button"
                onClick={() => setStep("phone")}
                className="w-full font-['Montserrat',sans-serif] text-[13px] font-bold text-[#e31e25]"
              >
                Change mobile number
              </button>
            </div>
          ) : null}

          {step === "address" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#222]">
                    Booking Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    min={minimumBookingDate}
                    onChange={(event) => {
                      const value = event.target.value;
                      const safeDate =
                        value && value >= minimumBookingDate
                          ? value
                          : minimumBookingDate;
                      setBookingDate(safeDate);
                      if (isFirstHalfBlockedForDate(safeDate)) {
                        setSlot("SECOND_HALF");
                      }
                    }}
                    className="mt-2 min-h-[50px] w-full rounded-[16px] border border-[#222]/10 bg-[#f5f5f5] px-4 font-['Montserrat',sans-serif] text-[14px] font-semibold text-[#222] outline-none"
                  />
                </div>
                <div>
                  <label className="font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#222]">
                    Slot
                  </label>
                  <select
                    value={slot}
                    onChange={(event) => setSlot(event.target.value)}
                    className="mt-2 min-h-[50px] w-full rounded-[16px] border border-[#222]/10 bg-[#f5f5f5] px-4 font-['Montserrat',sans-serif] text-[14px] font-semibold text-[#222] outline-none"
                  >
                    {!firstHalfBlocked ? (
                      <option value="FIRST_HALF">First Half</option>
                    ) : null}
                    <option value="SECOND_HALF">Second Half</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <h3 className="font-['Montserrat',sans-serif] text-[16px] font-bold text-[#222]">
                  Service Address
                </h3>
                <button
                  type="button"
                  onClick={handleAddNewAddress}
                  className="rounded-full border border-[#e31e25]/25 px-4 py-2 font-['Montserrat',sans-serif] text-[12px] font-bold text-[#e31e25] hover:bg-[#e31e25] hover:text-white"
                >
                  {showAddressForm
                    ? "Hide"
                    : addresses.length
                      ? "Add New Address"
                      : "Add Address"}
                </button>
              </div>

              {loading && addresses.length === 0 ? (
                <p className="font-['Montserrat',sans-serif] text-[13px] text-[#222]/60">
                  Address loading...
                </p>
              ) : null}

              {showAddressForm ? (
                <div className="space-y-3 rounded-[18px] border border-[#222]/10 bg-[#f5f5f5] p-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      placeholder="Customer Name"
                      className="min-h-[46px] rounded-[14px] border border-[#222]/10 bg-white px-4 font-['Montserrat',sans-serif] text-[14px] font-semibold outline-none sm:col-span-2"
                    />
                    <input
                      value={addressForm.houseNumber}
                      onChange={(event) =>
                        updateAddressField("houseNumber", event.target.value)
                      }
                      placeholder="House No. (Optional)"
                      className="min-h-[46px] rounded-[14px] border border-[#222]/10 bg-white px-4 font-['Montserrat',sans-serif] text-[14px] font-semibold outline-none"
                    />
                    <input
                      value={addressForm.street}
                      onChange={(event) =>
                        updateAddressField("street", event.target.value)
                      }
                      placeholder="Street / Colony"
                      className="min-h-[46px] rounded-[14px] border border-[#222]/10 bg-white px-4 font-['Montserrat',sans-serif] text-[14px] font-semibold outline-none"
                    />
                    <select
                      value={addressForm.state}
                      onChange={(event) =>
                        updateAddressField("state", event.target.value)
                      }
                      className="min-h-[46px] rounded-[14px] border border-[#222]/10 bg-white px-4 font-['Montserrat',sans-serif] text-[14px] font-semibold outline-none"
                    >
                      <option value="">Select State</option>
                      {INDIA_LOCATION_OPTIONS.map((location) => (
                        <option key={location.state} value={location.state}>
                          {location.state}
                        </option>
                      ))}
                    </select>
                    <select
                      value={addressForm.city}
                      onChange={(event) =>
                        updateAddressField("city", event.target.value)
                      }
                      disabled={!addressForm.state}
                      className="min-h-[46px] rounded-[14px] border border-[#222]/10 bg-white px-4 font-['Montserrat',sans-serif] text-[14px] font-semibold outline-none disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <option value="">Select City</option>
                      {cityOptions.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <input
                      value={addressForm.zipCode}
                      onChange={(event) =>
                        updateAddressField(
                          "zipCode",
                          event.target.value.replace(/\D/g, "").slice(0, 6),
                        )
                      }
                      placeholder="Pin Code (Optional)"
                      inputMode="numeric"
                      maxLength={6}
                      className="min-h-[46px] rounded-[14px] border border-[#222]/10 bg-white px-4 font-['Montserrat',sans-serif] text-[14px] font-semibold outline-none sm:col-span-2"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveAddress}
                    disabled={loading}
                    className="flex w-full items-center justify-center rounded-full bg-[#222] px-5 py-3 font-['Montserrat',sans-serif] text-[14px] font-bold text-white hover:bg-[#e31e25] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? "Saving..."
                      : editingAddressId
                        ? "Update Address"
                        : "Save Address"}
                  </button>
                </div>
              ) : null}

              {addresses.length > 0 ? (
                <div className="space-y-3">
                  {addresses.map((address) => {
                    const active = address._id === selectedAddressId;
                    return (
                      <button
                        key={address._id}
                        type="button"
                        onClick={() => handleSetDefaultAddress(address)}
                        className={[
                          "w-full rounded-[18px] border p-4 text-left ",
                          active
                            ? "border-[#e31e25] bg-[#e31e25]/8"
                            : "border-[#222]/10 bg-[#f5f5f5] hover:border-[#e31e25]/35",
                        ].join(" ")}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-['Montserrat',sans-serif] text-[14px] font-bold text-[#222]">
                            {isDefaultAddress(address)
                              ? "Default Address"
                              : "Saved Address"}
                          </span>
                          <span className="flex items-center gap-3">
                            <span
                              role="button"
                              tabIndex={0}
                              onClick={(event) => {
                                event.stopPropagation();
                                handleEditAddress(address);
                              }}
                              onKeyDown={(event) => {
                                if (
                                  event.key === "Enter" ||
                                  event.key === " "
                                ) {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  handleEditAddress(address);
                                }
                              }}
                              className="rounded-full border border-[#e31e25]/25 px-3 py-1 font-['Montserrat',sans-serif] text-[11px] font-bold text-[#e31e25]"
                            >
                              Edit
                            </span>
                            <span
                              className={[
                                "h-4 w-4 rounded-full border",
                                active
                                  ? "border-[#e31e25] bg-[#e31e25]"
                                  : "border-[#222]/30",
                              ].join(" ")}
                            />
                          </span>
                        </div>
                        <p className="mt-2 font-['Montserrat',sans-serif] text-[13px] leading-[22px] text-[#222]/65">
                          {formatAddress(address)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              ) : null}

              <button
                type="button"
                onClick={handleCreateBooking}
                disabled={loading}
                className="flex w-full items-center justify-center rounded-full bg-[#e31e25] px-5 py-3.5 font-['Montserrat',sans-serif] text-[15px] font-bold text-white hover:bg-[#c8181e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Processing..." : "Book a service"}
              </button>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function CartServiceSuggestions() {
  const [services, setServices] = useState<ServiceCardType[]>(
    SERVICES.filter((service) => !isHiddenFrontendService(service)),
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        setLoading(true);
        const apiServices = await fetchServiceList();
        const dynamicServices = apiServices
          .map(mapApiServiceToServiceCard)
          .filter((service) => !isHiddenFrontendService(service));

        if (isMounted && dynamicServices.length) {
          setServices(dynamicServices);
        }
      } catch (error) {
        console.error("Failed to load cart suggested services", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mt-3 overflow-hidden rounded-[28px] border border-[#222]/10 bg-white p-5 shadow-[0_20px_70px_rgba(0,0,0,0.10)] md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-['Montserrat',sans-serif] text-[12px] font-bold uppercase tracking-[0.18em] text-[#e31e25]">
            Add More Services
          </p>
          <h2 className="mt-2 font-['Montserrat',sans-serif] text-[24px] font-bold text-[#222] md:text-[34px]">
            Need anything else for your AC?
          </h2>
          <p className="mt-2 max-w-[680px] font-['Montserrat',sans-serif] text-[14px] leading-[24px] text-[#222]/65 md:text-[16px] md:leading-[28px]">
            Select more services from here and add them to your cart before
            checkout.
          </p>
        </div>
      </div>

      {loading ? (
        <p className="mt-6 font-['Montserrat',sans-serif] text-[14px] font-semibold text-[#222]/60">
          Loading services...
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceBookingCard
              key={service.backendId || service.id}
              service={service}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BookingSuccessModal({
  open,
  message,
}: {
  open: boolean;
  message: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[420px] overflow-hidden rounded-[30px] bg-white p-7 text-center shadow-[0_30px_100px_rgba(0,0,0,0.3)]">
        <div className="absolute left-1/2 top-8 h-28 w-28 -translate-x-1/2 rounded-full bg-green-500/20 animate-ping" />
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500 text-[44px] text-white shadow-[0_18px_40px_rgba(34,197,94,0.35)] animate-bounce">
          ✓
        </div>
        <p className="mt-7 font-['Montserrat',sans-serif] text-[13px] font-bold uppercase tracking-[0.18em] text-[#e31e25]">
          Success
        </p>
        <h2 className="mt-2 font-['Montserrat',sans-serif] text-[28px] font-bold text-[#222]">
          {message || "Booking created successfully."}
        </h2>
        <p className="mt-3 font-['Montserrat',sans-serif] text-[14px] leading-[24px] text-[#222]/65">
          Your request has been submitted. Redirecting to home screen.
        </p>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#f1f1f1]">
          <div className="h-full w-full origin-left animate-pulse rounded-full bg-[#e31e25]" />
        </div>
      </div>
    </div>
  );
}

export function CartScreen() {
  const router = useRouter();
  const [cart, setCart] = useState<BookingCart>({});
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Booking created successfully.",
  );

  useEffect(() => {
    const syncCart = () => setCart(getStoredCart());

    syncCart();
    window.addEventListener(BOOKING_CART_EVENT, syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener(BOOKING_CART_EVENT, syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  const cartItems = useMemo(() => Object.values(cart), [cart]);
  const uniqueItems = useMemo(() => getCartUniqueCount(cart), [cart]);
  const totalQuantity = useMemo(() => getCartTotalQuantity(cart), [cart]);

  const handleQuantityChange = (key: string, type: "minus" | "plus") => {
    const currentQuantity = cart[key]?.quantity ?? 1;
    const nextQuantity =
      type === "minus" ? currentQuantity - 1 : currentQuantity + 1;
    setCart(updateStoredCartItemQuantity(key, nextQuantity));
  };

  const handleRemove = (key: string) => {
    setCart(removeStoredCartItem(key));
  };

  const handleClearCart = () => {
    clearStoredCart();
    setCart({});
  };

  const handleProceedToBuy = () => {
    if (cartItems.length === 0) return;
    setCheckoutOpen(true);
  };

  const handleBookingSuccess = (message?: string) => {
    clearStoredCart();
    setCart({});
    setSuccessMessage(message || "Booking created successfully.");
    setSuccessModalOpen(true);
    window.setTimeout(() => {
      setSuccessModalOpen(false);
      router.push("/");
    }, 1800);
  };

  return (
    <section className="min-h-screen bg-[#f5f5f5] pt-[92px] md:pt-[118px]">
      <BookingSuccessModal open={successModalOpen} message={successMessage} />

      <CheckoutDrawer
        open={checkoutOpen}
        cart={cart}
        onClose={() => setCheckoutOpen(false)}
        onBooked={handleBookingSuccess}
      />

      <div className="mx-auto flex max-w-[1362px] flex-col gap-6 px-4 pb-14 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-[24px] bg-white border border-[#222]/10 px-5 py-7 shadow-[0_20px_70px_rgba(0,0,0,0.18)] md:rounded-[34px] md:px-10 md:py-11">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#e31e25]/35 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#f5f5f5] blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-[780px]">
              <Link
                href="/book-service/service"
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#222]/10 bg-[#f5f5f5] px-4 py-2 font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#222]/90 backdrop-blur-sm hover:bg-[#f5f5f5]"
              >
                <span aria-hidden="true">←</span> Continue Booking
              </Link>
              <p className="font-['Montserrat',sans-serif] text-[13px] font-semibold uppercase tracking-[0.18em] text-[#e31e25] md:text-[14px]">
                AC Doctor Cart
              </p>
              <h1 className="mt-2 font-['Montserrat',sans-serif] text-[30px] font-bold leading-[38px] text-[#222] md:text-[clamp(42px,4.2vw,68px)] md:leading-[1.08]">
                View Cart Details
              </h1>
              <p className="mt-4 max-w-[690px] font-['Montserrat',sans-serif] text-[14px] leading-[24px] text-[#222]/70 md:text-[18px] md:leading-[30px]">
                Review selected service type, AC type, and quantity. Proceed to
                buy will check login, address, and then create booking.
              </p>
            </div>

            {uniqueItems > 0 ? (
              <div className="grid grid-cols-2 gap-3 rounded-[22px] border border-[#222]/10 bg-[#f5f5f5] p-4 backdrop-blur-md md:min-w-[300px] md:p-5">
                <div>
                  <p className="font-['Montserrat',sans-serif] text-[13px] font-medium text-[#222]/60">
                    Cart Items
                  </p>
                  <p className="font-['Montserrat',sans-serif] text-[28px] font-bold leading-none text-[#222]">
                    {uniqueItems}
                  </p>
                </div>
                <div>
                  <p className="font-['Montserrat',sans-serif] text-[13px] font-medium text-[#222]/60">
                    Total Quantity
                  </p>
                  <p className="font-['Montserrat',sans-serif] text-[28px] font-bold leading-none text-[#222]">
                    {totalQuantity}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <article
                  key={item.key}
                  className="flex flex-col gap-4 rounded-[22px] bg-white p-4 shadow-[0px_0px_14px_0px_rgba(0,0,0,0.12)] sm:flex-row sm:items-center md:p-5"
                >
                  <div className="flex h-[110px] w-full shrink-0 items-center justify-center rounded-[18px] bg-[#e31e25]/8 p-4 sm:w-[150px]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={135}
                        height={90}
                        className="max-h-[88px] w-auto object-contain"
                      />
                    ) : (
                      <span className="text-[44px]" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-['Montserrat',sans-serif] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e31e25]">
                      {item.serviceTitle}
                    </p>
                    <h2 className="mt-2 font-['Montserrat',sans-serif] text-[22px] font-bold leading-[30px] text-[#222]">
                      {item.name}
                    </h2>
                    <p className="mt-2 font-['Montserrat',sans-serif] text-[13px] leading-[22px] text-[#222]/65">
                      {item.description}
                    </p>
                    {isOtherCartItem(item) ? (
                      <div className="mt-3 rounded-[14px] border border-[#e31e25]/15 bg-[#e31e25]/8 px-3 py-2">
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-white px-3 py-1 font-['Montserrat',sans-serif] text-[12px] font-bold text-[#222]">
                            AC Type: {item.acType || "AC"}
                          </span>
                          <span className="rounded-full bg-[#e31e25] px-3 py-1 font-['Montserrat',sans-serif] text-[12px] font-bold text-white">
                            Problem: {item.otherService || item.name}
                          </span>
                        </div>
                        {item.comment ? (
                          <p className="mt-2 font-['Montserrat',sans-serif] text-[12px] leading-[20px] text-[#222]/65">
                            {item.comment}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <div className="flex items-center overflow-hidden rounded-full border border-[#222]/10 bg-[#f5f5f5]">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.key, "minus")}
                        className="flex h-9 w-9 items-center justify-center text-[20px] font-semibold text-[#e31e25] hover:bg-[#e31e25]/10"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>
                      <span className="min-w-[38px] text-center font-['Montserrat',sans-serif] text-[15px] font-bold text-[#222]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.key, "plus")}
                        className="flex h-9 w-9 items-center justify-center text-[20px] font-semibold text-[#e31e25] hover:bg-[#e31e25]/10"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.key)}
                      className="rounded-full border border-[#e31e25]/25 px-4 py-2 font-['Montserrat',sans-serif] text-[12px] font-bold text-[#e31e25] hover:bg-[#e31e25] hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-[24px] bg-white border border-[#222]/10 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.16)] md:p-6 lg:sticky lg:top-[120px]">
              <p className="font-['Montserrat',sans-serif] text-[13px] font-semibold uppercase tracking-[0.18em] text-[#e31e25]">
                Cart Summary
              </p>
              <h2 className="mt-2 font-['Montserrat',sans-serif] text-[26px] font-bold text-[#222]">
                Ready to book?
              </h2>

              <div className="mt-5 space-y-3 rounded-[18px] border border-[#222]/10 bg-[#f5f5f5] p-4">
                <div className="flex items-center justify-between font-['Montserrat',sans-serif] text-[14px] text-[#222]/70">
                  <span>Unique Items</span>
                  <strong className="text-[#222]">{uniqueItems}</strong>
                </div>
                <div className="flex items-center justify-between font-['Montserrat',sans-serif] text-[14px] text-[#222]/70">
                  <span>Total Quantity</span>
                  <strong className="text-[#222]">{totalQuantity}</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceedToBuy}
                className="mt-5 flex w-full items-center justify-center rounded-full bg-[#e31e25] px-5 py-3.5 font-['Montserrat',sans-serif] text-[15px] font-bold text-white hover:bg-[#c8181e]"
              >
                Book a service
              </button>

              <button
                type="button"
                onClick={handleClearCart}
                className="mt-3 flex w-full items-center justify-center rounded-full border border-[#222]/10 px-5 py-3 font-['Montserrat',sans-serif] text-[14px] font-semibold text-[#222]/80 hover:border-[#e31e25]/30 hover:text-[#e31e25]"
              >
                Clear Cart
              </button>
            </aside>
          </div>
        ) : (
          <div className="rounded-[24px] bg-white p-8 text-center shadow-[0px_0px_14px_0px_rgba(0,0,0,0.12)] md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e31e25]/10 text-[34px]">
              🛒
            </div>
            <h2 className="mt-5 font-['Montserrat',sans-serif] text-[28px] font-bold text-[#222]">
              Your cart is empty
            </h2>
            <p className="mx-auto mt-2 max-w-[520px] font-['Montserrat',sans-serif] text-[14px] leading-[24px] text-[#222]/65">
              Add AC service, repair, installation, compressor, or gas charging
              items to continue booking.
            </p>
            <Link
              href="/book-service/service"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#e31e25] px-6 py-3 font-['Montserrat',sans-serif] text-[14px] font-bold text-white hover:bg-[#c8181e]"
            >
              Start Booking
            </Link>
          </div>
        )}

        <CartServiceSuggestions />
      </div>
    </section>
  );
}
