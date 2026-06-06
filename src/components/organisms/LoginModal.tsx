"use client";

import { useEffect, useState } from "react";
import {
 AC_DOCTOR_LOGIN_MODAL_EVENT,
 AcDoctorUserSession,
 getUserProfile,
 loginUser,
 verifyUserOtp,
} from "@/lib/auth";

type LoginStep = "phone" | "otp";

export function LoginModal() {
 const [open, setOpen] = useState(false);
 const [step, setStep] = useState<LoginStep>("phone");
 const [phoneNumber, setPhoneNumber] = useState("");
 const [loginUserId, setLoginUserId] = useState("");
 const [loginAccessToken, setLoginAccessToken] = useState("");
 const [loginRefreshToken, setLoginRefreshToken] = useState("");
 const [otp, setOtp] = useState("");
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState("");
 const [error, setError] = useState("");

 useEffect(() => {
 const handleOpen = () => {
 setOpen(true);
 setStep("phone");
 setPhoneNumber("");
 setLoginUserId("");
 setLoginAccessToken("");
 setLoginRefreshToken("");
 setOtp("");
 setMessage("");
 setError("");
 };

 window.addEventListener(AC_DOCTOR_LOGIN_MODAL_EVENT, handleOpen);
 return () => window.removeEventListener(AC_DOCTOR_LOGIN_MODAL_EVENT, handleOpen);
 }, []);

 if (!open) return null;

 const closeModal = () => {
 if (loading) return;
 setOpen(false);
 };

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
 throw new Error("Login response did not include a user ID.");
 }

 if (!response.accessToken) {
 throw new Error("Login response did not include an access token.");
 }

 setLoginUserId(response.userId);
 setLoginAccessToken(response.accessToken);
 setLoginRefreshToken(response.refreshToken ?? "");
 setStep("otp");
 setMessage("OTP has been sent. Please enter OTP to continue.");
 } catch (apiError) {
 setError(apiError instanceof Error ? apiError.message : "Login failed.");
 } finally {
 setLoading(false);
 }
 };

 const handleVerifyOtp = async () => {
 if (!loginUserId) {
 setError("User ID is missing. Please login again.");
 setStep("phone");
 return;
 }

 const sanitizedOtp = otp.replace(/\D/g, "").slice(0, 4);
 if (sanitizedOtp.length !== 4) {
 setError("Please enter a valid 4-digit OTP.");
 return;
 }

 try {
 setLoading(true);
 setError("");
 setMessage("");
 const session: AcDoctorUserSession = await verifyUserOtp({
 userId: loginUserId,
 otp: sanitizedOtp,
 phoneNumber: phoneNumber.replace(/\D/g, ""),
 countryCode: "+91",
 accessToken: loginAccessToken,
 refreshToken: loginRefreshToken,
 });

 await getUserProfile(session.userId).catch(() => null);
 setMessage("Login successful.");
 window.setTimeout(() => setOpen(false), 500);
 } catch (apiError) {
 setError(apiError instanceof Error ? apiError.message : "OTP verification failed.");
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
 <div className="relative w-full max-w-[430px] overflow-hidden rounded-[30px] bg-white p-6 shadow-[0_30px_100px_rgba(0,0,0,0.32)] md:p-7">
 <button
 type="button"
 onClick={closeModal}
 aria-label="Close login modal"
 className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f5] font-['Montserrat',sans-serif] text-[18px] font-bold text-[#222] hover:bg-[#e31e25] hover:text-white"
 >
 ×
 </button>

 <div className="pr-10">
 <p className="font-['Montserrat',sans-serif] text-[12px] font-bold uppercase tracking-[0.18em] text-[#e31e25]">
 AC Doctor Login
 </p>
 <h2 className="mt-2 font-['Montserrat',sans-serif] text-[28px] font-bold text-[#222]">
 {step === "phone" ? "Login with mobile" : "Verify OTP"}
 </h2>
 <p className="mt-2 font-['Montserrat',sans-serif] text-[14px] leading-[23px] text-[#222]/65">
 {step === "phone"
 ? "Login once and use profile, bookings, requests, cart, and address features anywhere on the website."
 : `Enter the OTP sent to +91 ${phoneNumber.replace(/\D/g, "")}.`}
 </p>
 </div>

 {message ? (
 <p className="mt-5 rounded-[16px] bg-green-500/10 px-4 py-3 font-['Montserrat',sans-serif] text-[13px] font-semibold text-green-700">
 {message}
 </p>
 ) : null}

 {error ? (
 <p className="mt-5 rounded-[16px] bg-[#e31e25]/10 px-4 py-3 font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#e31e25]">
 {error}
 </p>
 ) : null}

 {step === "phone" ? (
 <div className="mt-6 space-y-4">
 <div>
 <label className="font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#222]">
 Mobile Number
 </label>
 <div className="mt-2 flex min-h-[52px] overflow-hidden rounded-[16px] border border-[#222]/10 bg-[#f5f5f5]">
 <span className="flex items-center border-r border-[#222]/10 px-4 font-['Montserrat',sans-serif] text-[14px] font-bold text-[#222]">
 +91
 </span>
 <input
 value={phoneNumber}
 onChange={(event) => setPhoneNumber(event.target.value.replace(/\D/g, "").slice(0, 10))}
 inputMode="numeric"
 maxLength={10}
 placeholder="Enter 10-digit number"
 className="w-full bg-transparent px-4 font-['Montserrat',sans-serif] text-[15px] font-semibold text-[#222] outline-none placeholder:text-[#222]/40"
 />
 </div>
 </div>
 <button
 type="button"
 onClick={handleLogin}
 disabled={loading}
 className="min-h-[52px] w-full rounded-[16px] bg-[#e31e25] font-['Montserrat',sans-serif] text-[14px] font-bold text-white hover:bg-[#c8181e] disabled:cursor-not-allowed disabled:opacity-60"
 >
 {loading ? "Sending OTP..." : "Continue"}
 </button>
 </div>
 ) : null}

 {step === "otp" ? (
 <div className="mt-6 space-y-4">
 <div>
 <label className="font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#222]">
 OTP
 </label>
 <input
 value={otp}
 onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 4))}
 inputMode="numeric"
 maxLength={4}
 placeholder="Enter 4-digit OTP"
 className="mt-2 min-h-[52px] w-full rounded-[16px] border border-[#222]/10 bg-[#f5f5f5] px-4 text-center font-['Montserrat',sans-serif] text-[22px] font-bold tracking-[0.35em] text-[#222] outline-none placeholder:text-[14px] placeholder:font-semibold placeholder:tracking-normal placeholder:text-[#222]/40"
 />
 </div>
 <button
 type="button"
 onClick={handleVerifyOtp}
 disabled={loading}
 className="min-h-[52px] w-full rounded-[16px] bg-[#e31e25] font-['Montserrat',sans-serif] text-[14px] font-bold text-white hover:bg-[#c8181e] disabled:cursor-not-allowed disabled:opacity-60"
 >
 {loading ? "Verifying..." : "Verify & Login"}
 </button>
 <button
 type="button"
 onClick={() => {
 setStep("phone");
 setOtp("");
 setError("");
 setMessage("");
 }}
 className="w-full font-['Montserrat',sans-serif] text-[13px] font-bold text-[#e31e25]"
 >
 Change mobile number
 </button>
 </div>
 ) : null}
 </div>
 </div>
 );
}
