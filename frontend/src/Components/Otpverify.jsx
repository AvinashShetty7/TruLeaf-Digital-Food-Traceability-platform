
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OtpVerify() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { state } = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [message, setMessage] = useState("");

  // -------------------------
  // ⏱️ Countdown Timer Logic
  // -------------------------
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // -------------------------
  // VERIFY OTP
  // -------------------------
  const handleVerify = async () => {
    if (!otp) {
      setMessage("Please enter OTP");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/user/verify-otp`, {
        otp,
        email: state.email,
        formData: state
      },{withCredentials:true});

      if (res.status == 200) {
        navigate("/login");
      } else {
        setMessage(res.data.message || "Invalid OTP");
        setOtp("");
      }
    } catch (err) {
      setMessage("Verification failed");
    }
  };

  // -------------------------
  // RESEND OTP
  // -------------------------
  const handleResend = async () => {
    if (!canResend) return;

    try {
      const res = await axios.post(`${API_URL}/api/user/resend-otp`, {
        email: state.email
      },{withCredentials:true});

      if (res.data.success) {
        setMessage("OTP has been resent!");
        setTimeLeft(60);
        setCanResend(false);
      } else {
        setMessage("Failed to resend OTP");
      }
    } catch (err) {
      setMessage("Something went wrong while resending OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-md lg:max-w-lg transform transition-all duration-300 hover:shadow-3xl">
        
        {/* Header with Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg animate-pulse">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Verify Your Email
          </h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4 mb-2">
            <p className="text-sm text-gray-600">
              We've sent a verification code to
            </p>
            <p className="text-base sm:text-lg font-semibold text-blue-700 mt-1 break-all">
              {state?.email}
            </p>
          </div>
          
          <p className="text-xs sm:text-sm text-gray-500">
            Enter the 6-digit code to continue
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl border-l-4 animate-pulse ${
            message.includes("resent") || message.includes("success")
              ? "bg-green-50 border-green-500"
              : "bg-red-50 border-red-500"
          }`}>
            <p className={`text-sm font-medium flex items-center ${
              message.includes("resent") || message.includes("success")
                ? "text-green-700"
                : "text-red-700"
            }`}>
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                {message.includes("resent") || message.includes("success") ? (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                )}
              </svg>
              {message}
            </p>
          </div>
        )}

        {/* OTP Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-3 text-sm font-semibold">
            Verification Code
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              className="w-full p-4 text-center text-2xl font-bold tracking-widest border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:border-blue-300 placeholder:text-base placeholder:tracking-normal"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {otp.length === 6 && (
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {otp.length}/6 digits entered
          </p>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Verify & Continue
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
        </div>

        {/* Timer & Resend Section */}
        <div className="text-center">
          {!canResend ? (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-700 font-medium">
                  Didn't receive the code?
                </p>
              </div>
              <p className="text-lg font-bold text-blue-600">
                Resend in {timeLeft}s
              </p>
              <div className="w-full bg-blue-200 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-1000 ease-linear"
                  style={{ width: `${(timeLeft / 60) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleResend}
              className="w-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 p-4 rounded-xl font-semibold hover:from-blue-200 hover:to-indigo-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 border-2 border-blue-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Resend Verification Code
            </button>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-1">
                Having trouble?
              </p>
              <p className="text-xs text-gray-600">
                Check your spam folder or contact support if you don't receive the code within 5 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}