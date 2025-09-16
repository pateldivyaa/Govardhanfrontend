import React, { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { toast } from "react-toastify";
import AppContext from "../context/AppContext";

const Spinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
    </svg>
);

const OTPVerificationPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { verifyReservationOtp } = useContext(AppContext);

    const [otp, setOtp] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [otpCountdown, setOtpCountdown] = useState(600); // 10 minutes
    const [isVerified, setIsVerified] = useState(false);
    
    // Get data from URL params
    const reservationId = searchParams.get('reservationId');
    const phone = searchParams.get('phone');
    const name = searchParams.get('name');

    useEffect(() => {
        document.title = "Verify OTP – Govardhan Thal";
        
        if (!reservationId || !phone) {
            toast.error("Invalid verification link");
            navigate('/book-table');
        }
    }, [reservationId, phone, navigate]);

    useEffect(() => {
        let timer;
        if (otpCountdown > 0 && !isVerified) {
            timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [otpCountdown, isVerified]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const handleOtpChange = (value) => {
        const cleanValue = value.replace(/\D/g, "").slice(0, 6);
        setOtp(cleanValue);
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        
        if (otp.length !== 6) {
            toast.error("Please enter a 6-digit OTP");
            return;
        }

        setIsVerifying(true);
        try {
            const result = await verifyReservationOtp(reservationId, otp);
            if (result.success) {
                setIsVerified(true);
                toast.success("Reservation confirmed successfully!");
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            toast.error("Invalid OTP. Please try again.");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResendOtp = async () => {
        setIsResending(true);
        try {
            // You'll need to implement this API call
            // await reservationApi.resendOtp(reservationId);
            toast.info("OTP sent successfully!");
            setOtpCountdown(600);
        } catch (error) {
            toast.error("Failed to resend OTP");
        } finally {
            setIsResending(false);
        }
    };

    if (isVerified) {
        return (
            <div className="bg-green-50 min-h-screen flex items-center justify-center">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Reservation Confirmed!</h2>
                    <p className="text-gray-600 mb-6">
                        Thank you {name}! Your table reservation has been successfully confirmed.
                        You will receive a confirmation message shortly.
                    </p>
                    <p className="text-sm text-gray-500">
                        Redirecting to home page in a few seconds...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-orange-50 min-h-screen">
            {/* Hero Banner */}
            <div className="relative h-64 bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="text-white text-center z-10">
                    <h1 className="text-4xl font-bold">Verify Your Reservation</h1>
                    <p>Enter the OTP sent to your mobile number</p>
                </div>
            </div>

            {/* OTP Verification Form */}
            <div className="container mx-auto py-12 px-4">
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter OTP</h2>
                            <p className="text-gray-600">
                                Please enter the 6-digit OTP sent to your mobile number ending with 
                                <span className="font-semibold"> {phone?.slice(-4)}</span>
                            </p>
                        </div>

                        <form onSubmit={handleVerifyOtp}>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => handleOtpChange(e.target.value)}
                                    className="w-full text-center text-2xl tracking-widest border-2 border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                    placeholder="000000"
                                    maxLength={6}
                                    autoComplete="one-time-code"
                                />
                            </div>

                            {/* Timer */}
                            <div className="text-center mb-6">
                                {otpCountdown > 0 ? (
                                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                                        <Clock className="w-4 h-4" />
                                        <span>OTP expires in: {formatTime(otpCountdown)}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2 text-red-600">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>OTP expired. Please request a new one.</span>
                                    </div>
                                )}
                            </div>

                            {/* Verify Button */}
                            <button
                                type="submit"
                                disabled={isVerifying || otp.length !== 6 || otpCountdown <= 0}
                                className={`
                                    w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2
                                    ${(isVerifying || otp.length !== 6 || otpCountdown <= 0) 
                                        ? "bg-gray-400 cursor-not-allowed" 
                                        : "bg-orange-600 hover:bg-orange-700"
                                    }
                                    transition-colors mb-4
                                `}
                            >
                                {isVerifying ? (
                                    <>
                                        <Spinner /> Verifying...
                                    </>
                                ) : (
                                    "Verify OTP"
                                )}
                            </button>

                            {/* Resend Button */}
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={otpCountdown > 540 || isResending} // Disable for first 1 minute
                                className={`
                                    w-full py-3 rounded-lg border-2 font-semibold flex items-center justify-center gap-2
                                    ${(otpCountdown > 540 || isResending)
                                        ? "border-gray-300 text-gray-400 cursor-not-allowed"
                                        : "border-orange-600 text-orange-600 hover:bg-orange-50"
                                    }
                                    transition-colors mb-4
                                `}
                            >
                                {isResending ? (
                                    <>
                                        <Spinner /> Resending...
                                    </>
                                ) : (
                                    `Resend OTP ${otpCountdown > 540 ? `(${Math.ceil((otpCountdown - 540) / 60)}m)` : ""}`
                                )}
                            </button>

                            {/* Cancel Button */}
                            <button
                                type="button"
                                onClick={() => navigate('/book-table')}
                                className="w-full py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Back to Booking
                            </button>
                        </form>
                    </div>

                    {/* Help Section */}
                    <div className="mt-8 bg-blue-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h3>
                        <ul className="space-y-2 text-blue-800 text-sm">
                            <li>• OTP is valid for 10 minutes</li>
                            <li>• Check your SMS messages for the 6-digit code</li>
                            <li>• If you don't receive the OTP, click "Resend OTP" after 1 minute</li>
                            <li>• For further assistance, call us at +65 1234 5678</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerificationPage;