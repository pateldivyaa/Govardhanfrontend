import React, { useState, useEffect, useContext } from "react";
import { Calendar, Clock, Users, PenLine } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

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

const BookTable = () => {
    const { createReservation, verifyReservationOtp, resendReservationOtp } = useAppContext();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState(2);
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [otp, setOtp] = useState("");
    const [reservationId, setReservationId] = useState("");
    const [otpCountdown, setOtpCountdown] = useState(0);
    const [isVerifying, setIsVerifying] = useState(false);

    const today = new Date().toISOString().split("T")[0];
    const timeSlots = Array.from({ length: 14 }, (_, i) => `${8 + i}:00`);

    useEffect(() => {
        document.title = "Table Reservation — Govardhan Thal";
    }, []);

    useEffect(() => {
        let timer;
        if (otpCountdown > 0) {
            timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
        }
        console.log("Countdown updated:", otpCountdown, "Button disabled:", isVerifying || otp.length !== 6 || otpCountdown <= 0);
        return () => clearTimeout(timer);
    }, [otpCountdown, isVerifying, otp.length]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60),
            s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !phone.trim() || !date || !time) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsSubmitting(true);
        try {
            const reservationData = {
                name: name.trim(),
                phone: phone.trim(),
                date,
                time,
                partySize: guests,
                notes: notes.trim()
            };

            const result = await createReservation(reservationData);
            if (result?.ok && result?.data?.reservationId) {
                setReservationId(result.data.reservationId);
                setShowOTPModal(true);
                setOtpCountdown(600); // 10 minutes
                toast.success(result.message);
            } else {
                toast.error(result?.message || 'Failed to create reservation');
            }
        } catch (error) {
            toast.error('Network error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOTPVerification = async () => {
        console.log("OTP Verification clicked");
        console.log("OTP length:", otp.length);
        console.log("OTP value:", otp);
        console.log("Reservation ID:", reservationId);
        console.log("Countdown:", otpCountdown);
        console.log("Is verifying:", isVerifying);

        if (otp.length !== 6) {
            toast.error("Please enter a 6-digit OTP");
            return;
        }

        setIsVerifying(true);
        try {
            const result = await verifyReservationOtp(reservationId, otp);
            if (result?.ok) {
                toast.success(result.message);

                // Reset form and close modal
                setName("");
                setPhone("");
                setDate("");
                setTime("");
                setGuests(2);
                setNotes("");
                setOtp("");
                setShowOTPModal(false);
                setOtpCountdown(0);

                // Redirect to home after success
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                toast.error(result?.message || 'OTP verification failed');
            }
        } catch (error) {
            toast.error('Network error occurred');
        } finally {
            setIsVerifying(false);
        }
    };

    const resendOTP = async () => {
        setIsResending(true);
        try {
            const result = await resendReservationOtp(reservationId);
            if (result?.ok) {
                toast.success(result.message);
                setOtpCountdown(600); // Reset countdown
            } else {
                toast.error(result?.message || 'Failed to resend OTP');
            }
        } catch (error) {
            toast.error('Network error occurred');
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="bg-orange-50 min-h-screen">
            {/* Hero Banner */}
            <div className="relative h-64 bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="text-white text-center z-10">
                    <h1 className="text-4xl font-bold">Table Reservation</h1>
                    <p>Book your table for an authentic Gujarati dining experience</p>
                </div>
            </div>

            {/* Reservation Form */}
            <div className="container-custom py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="md:flex">
                            <div className="md:w-3/5 p-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Reserve Your Table</h2>

                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                                Your Name <span className="text-orange-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                                                Phone Number <span className="text-orange-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                                placeholder="Enter your phone number"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                                                    Date <span className="text-orange-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="date"
                                                        id="date"
                                                        min={today}
                                                        value={date}
                                                        onChange={(e) => setDate(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                                        required
                                                    />
                                                    <Calendar size={18} className="absolute left-3 top-3 text-gray-500" />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
                                                    Time <span className="text-orange-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        id="time"
                                                        value={time}
                                                        onChange={(e) => setTime(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none appearance-none"
                                                        required
                                                    >
                                                        <option value="">Select time</option>
                                                        {timeSlots.map((slot) => (
                                                            <option key={slot} value={slot}>
                                                                {slot}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <Clock size={18} className="absolute left-3 top-3 text-gray-500" />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="guests" className="block text-gray-700 font-medium mb-2">
                                                Number of Guests <span className="text-orange-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <select
                                                    id="guests"
                                                    value={guests}
                                                    onChange={(e) => setGuests(Number(e.target.value))}
                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none appearance-none"
                                                    required
                                                >
                                                    {[...Array(10)].map((_, i) => (
                                                        <option key={i + 1} value={i + 1}>
                                                            {i + 1} {i === 0 ? "guest" : "guests"}
                                                        </option>
                                                    ))}
                                                </select>
                                                <Users size={18} className="absolute left-3 top-3 text-gray-500" />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
                                                Special Requests <span className="text-gray-400">(optional)</span>
                                            </label>
                                            <div className="relative">
                                                <textarea
                                                    id="notes"
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none min-h-[100px]"
                                                    placeholder="Any special requests or dietary requirements?"
                                                ></textarea>
                                                <PenLine size={18} className="absolute left-3 top-3 text-gray-500" />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`
                                            w-full mt-6 py-3 rounded-md text-white font-semibold flex items-center justify-center gap-2
                                            ${isSubmitting ? "bg-orange-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"}
                                            transition-colors
                                        `}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Spinner /> Processing...
                                            </>
                                        ) : (
                                            "Confirm Reservation"
                                        )}
                                    </button>
                                </form>
                            </div>

                            <div className="md:w-2/5 bg-orange-600 text-white p-8">
                                <h3 className="text-xl font-bold mb-6">Restaurant Information</h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold mb-2">Address</h4>
                                        <p>470 Serangoon Road, Singapore 218143</p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">Opening Hours</h4>
                                        <p>Every Day: 8 AM to 11 PM</p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">Reservation Policy</h4>
                                        <ul className="list-disc pl-5 space-y-1 text-orange-100">
                                            <li>Reservations can be made up to 30 days in advance</li>
                                            <li>Please arrive within 15 minutes of your reservation time</li>
                                            <li>For parties of more than 10, please call us directly</li>
                                            <li>We hold reservations for 15 minutes after the reserved time</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">Contact</h4>
                                        <p>Phone: +1 (555) 123-4567</p>
                                        <p>Email: reservations@govardhanthal.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* OTP Modal */}
            {showOTPModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
                        <p className="text-gray-600 mb-6">
                            Please enter the 6-digit OTP sent to your mobile number ending with {phone.slice(-4)}
                        </p>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                            className="w-full text-center text-xl tracking-widest border border-gray-300 rounded-lg p-4 mb-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            placeholder="000000"
                            maxLength={6}
                        />
                        {otpCountdown > 0 ? (
                            <p className="text-center text-gray-600 mb-4">OTP expires in: {formatTime(otpCountdown)}</p>
                        ) : (
                            <p className="text-center text-red-500 mb-4">OTP expired. Please resend.</p>
                        )}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleOTPVerification}
                                disabled={isVerifying || otp.length !== 6 || otpCountdown <= 0}
                                title={`Debug: isVerifying=${isVerifying}, otpLength=${otp.length}, countdown=${otpCountdown}`}
                                className={`
                                    w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2
                                    ${(isVerifying || otp.length !== 6 || otpCountdown <= 0)
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-orange-600 hover:bg-orange-700"
                                    }
                                    transition-colors
                                `}
                            >
                                {isVerifying ? (
                                    <>
                                        <Spinner /> Verifying...
                                    </>
                                ) : (
                                    "Verify"
                                )}
                            </button>
                            <button
                                onClick={resendOTP}
                                disabled={otpCountdown > 540 || isResending}
                                className={`
                                    w-full py-3 rounded-lg border-2 font-semibold flex items-center justify-center gap-2
                                    ${(otpCountdown > 540 || isResending)
                                        ? "border-gray-300 text-gray-400 cursor-not-allowed"
                                        : "border-orange-600 text-orange-600 hover:bg-orange-50"
                                    }
                                    transition-colors
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
                            <button
                                onClick={() => setShowOTPModal(false)}
                                className="w-full py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookTable;