import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, AlertTriangle } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const OTP_TTL_SECONDS = 10 * 60; // 10 minutes

const formatTime = (secs) => {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = Math.floor(secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const OrderConfirmationPage = () => {
  const { cart, clearCart } = useAppContext();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [orderType, setOrderType] = useState("dine-in"); // ✅ lowercase
  const [includeTax, setIncludeTax] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OTP modal states
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [orderId, setOrderId] = useState(null);

  const otpIntervalRef = useRef(null);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = includeTax ? subtotal * 0.1 : 0;
  const total = subtotal + tax;

  useEffect(() => {
    if (cart.length === 0) {
      toast.error("Your cart is empty. Please add items to order.");
      navigate("/menu");
    }
    document.title = "Confirm Order - Govardhan Thal";
    return () => {
      if (otpIntervalRef.current) clearInterval(otpIntervalRef.current);
    };
  }, [cart, navigate]);

  // OTP timer
  useEffect(() => {
    if (showOTPModal && otpCountdown > 0) {
      if (otpIntervalRef.current) clearInterval(otpIntervalRef.current);
      otpIntervalRef.current = setInterval(() => {
        setOtpCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(otpIntervalRef.current);
            otpIntervalRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (!showOTPModal && otpIntervalRef.current) {
        clearInterval(otpIntervalRef.current);
        otpIntervalRef.current = null;
      }
    };
  }, [showOTPModal, otpCountdown]);

  const getItemName = (item) =>
    typeof item.name === "string" ? item.name : item.name?.english;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return toast.error("Cannot place an empty order");

    if (
      !customerName.trim() ||
      !phoneNumber.trim() ||
      (orderType === "dine-in" && !tableNumber.trim())
    ) {
      return toast.error("Please fill in all required fields");
    }

    const items = cart.map((item) => ({
      name: getItemName(item),
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const payload = {
      name: customerName,
      phone: phoneNumber,
      tableNumber: orderType === "dine-in" ? tableNumber : null,
      orderType, // ✅ lowercase
      items,
      subtotal,
      tax,
      total,
    };

    try {
      setIsSubmitting(true);
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setOrderId(data.data._id);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOTP(otp);
        setShowOTPModal(true);
        setOtpCountdown(OTP_TTL_SECONDS);

        toast.success(`Order placed! OTP: ${otp}`, { autoClose: 5000 });
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while creating order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPVerification = () => {
    if (otp === generatedOTP) {
      toast.success("✅ OTP verified! Order confirmed.");
      if (clearCart) clearCart();
      setShowOTPModal(false);
      navigate("/thankyou");
    } else {
      toast.error("❌ Invalid OTP");
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-orange-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Confirm Your Order</h1>
            <p className="mt-2 opacity-90">
              Please fill in your details to place your order
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your phone number"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Order Type *
                  </label>
                  <select
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                    disabled={isSubmitting}
                  >
                    <option value="dine-in">Dine-in</option>
                    <option value="takeaway">Takeaway</option>
                  </select>
                </div>
                {orderType === "dine-in" && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Table Number *
                    </label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter your table number"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="border-t border-b py-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                {cart.length === 0 ? (
                  <div className="text-center py-6 flex flex-col items-center">
                    <AlertTriangle size={32} className="text-orange-400 mb-2" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item._id || item.id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          {item.image && (
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                              <img
                                src={item.image}
                                alt={getItemName(item)}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{getItemName(item)}</p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold text-orange-600">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-8 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <label className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      checked={includeTax}
                      onChange={(e) => setIncludeTax(e.target.checked)}
                      disabled={isSubmitting}
                    />
                    Include Tax (10%)
                  </label>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-orange-600">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/menu")}
                  className="py-3 px-6 border border-orange-600 text-orange-600 rounded-md hover:bg-orange-50"
                  disabled={isSubmitting}
                >
                  Back to Menu
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className={`py-3 px-6 rounded-md text-white font-semibold flex items-center justify-center gap-2
                  ${
                    isSubmitting || cart.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-600 hover:bg-orange-700"
                  }`}
                >
                  <ShoppingBag size={20} />
                  {isSubmitting ? "Placing Order..." : "Confirm Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">Verify Your Order</h2>
            <p className="text-gray-600 mb-4">Enter the 6-digit OTP below</p>
            {generatedOTP && (
              <div className="bg-blue-50 border p-4 rounded mb-4 text-center">
                <p>
                  <strong>Your OTP:</strong>{" "}
                  <span className="text-xl">{generatedOTP}</span>
                </p>
                <p className="text-xs text-blue-600">(Demo mode)</p>
              </div>
            )}
            <input
              type="text"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              className="w-full border px-3 py-3 rounded text-center text-2xl font-mono tracking-widest"
              placeholder="000000"
              maxLength={6}
            />
            {otpCountdown > 0 ? (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Expires in: <span>{formatTime(otpCountdown)}</span>
              </p>
            ) : (
              <p className="text-sm text-red-500 mt-2 text-center">
                OTP expired. Please request a new one.
              </p>
            )}
            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={handleOTPVerification}
                disabled={otp.length !== 6}
                className="py-3 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:bg-orange-300"
              >
                Confirm Order
              </button>
              <button
                onClick={() => setShowOTPModal(false)}
                className="py-2 text-gray-600 hover:text-gray-800"
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

export default OrderConfirmationPage;
