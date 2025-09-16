  import React, { useState } from "react";
  import { useNavigate, Link } from "react-router-dom";
  import { useAppContext } from "../context/AppContext";
  import { toast } from "react-toastify";

  const Register = () => {
    const { startRegistration, verifyOtp, pendingOtp } = useAppContext();
    const navigate = useNavigate();
    const [step, setStep] = useState("collect");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const onSendOtp = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      try {
        const res = await startRegistration(name, phone, password);
        if (res?.ok) {
          setStep("verify");
          // Show OTP in toast message for testing (in production, SMS કરવામાં આવશે)
          toast.success(`OTP sent to your mobile! Check console for OTP code.`);
        } else {
          toast.error(res?.message || "Registration failed");
        }
      } catch (error) {
        toast.error("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const onVerify = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      try {
        const res = await verifyOtp(otp);
        if (res?.ok) {
          toast.success("Registration successful! Welcome!");
          navigate("/");
        } else {
          toast.error(res?.message || "OTP verification failed");
        }
      } catch (error) {
        toast.error("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
          {step === "collect" ? (
            <>
              <h1 className="text-2xl font-semibold mb-1">Create account</h1>
              <p className="text-gray-600 mb-6">Register to continue.</p>
              <form onSubmit={onSendOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g., Nehal Shah"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="10-digit number"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Minimum 6 characters"
                    required
                    disabled={loading}
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-amber-600 text-white rounded-md py-2 font-medium hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending OTP...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </form>
              <p className="text-sm text-gray-600 mt-4">
                Already have an account? <Link to="/login" className="text-amber-600 hover:underline">Login</Link>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold mb-1">Verify OTP</h1>
              <p className="text-gray-600 mb-6">We sent a 6-digit code to your mobile.</p>
              <form onSubmit={onVerify} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                    className="w-full border rounded-md px-3 py-2 tracking-widest text-center text-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="------"
                    required
                    disabled={loading}
                  />
                </div>
                {pendingOtp?.phone && (
                  <p className="text-sm text-gray-600">OTP sent to +91 {pendingOtp.phone}</p>
                )}
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-md">
                  <p className="text-sm text-blue-700">
                    📱 <strong>For Testing:</strong> Check browser console (F12) for the OTP code
                  </p>
                </div>
                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setStep("collect")} 
                    className="flex-1 border rounded-md py-2 font-medium hover:bg-gray-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-amber-600 text-white rounded-md py-2 font-medium hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      "Verify & Create Account"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    );
  };

  export default Register;