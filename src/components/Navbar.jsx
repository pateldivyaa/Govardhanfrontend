// Navbar.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Menu, X } from "lucide-react"; // hamburger + close icons

const Navbar = () => {
  const { user, startRegistration, verifyOtp, logout } = useAppContext();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("collect"); // collect | verify

  const initials = useMemo(() => {
    if (!user?.name) return "";
    return user.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("");
  }, [user]);

  const openAuth = () => {
    setIsAuthOpen(true);
    setStep("collect");
    setName(user?.name || "");
    setPhone(user?.phone || "");
    setOtp("");
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const res = startRegistration(name, phone);
    if (res?.ok) setStep("verify");
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const res = verifyOtp(otp);
    if (res?.ok) {
      setIsAuthOpen(false);
    }
  };

  return (
    <nav className="bg-white py-4 px-6 md:px-12 flex justify-between items-center shadow-md relative">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-orange-600">
          Govardhan Thal
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8">
        <Link to="/" className="text-gray-700 hover:text-amber-600 font-medium">
          Home
        </Link>
        <Link
          to="/about"
          className="text-gray-700 hover:text-amber-600 font-medium"
        >
          About
        </Link>
        <Link
          to="/menu"
          className="text-gray-700 hover:text-amber-600 font-medium"
        >
          Menu
        </Link>
        <Link
          to="/order"
          className="text-gray-700 hover:text-amber-600 font-medium"
        >
          Order
        </Link>
      </div>

      {/* Right side buttons */}
      <div className="hidden md:flex items-center gap-3">
        <Link to="/booktable">
          <button className="bg-transparent text-black border-2 rounded-full hover:border-orange-500 border-black hover:bg-orange-600 hover:text-white px-4 py-2 font-medium">
            Book A Table
          </button>
        </Link>

        {user ? (
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-semibold">
              {initials}
            </div>
            <button
              onClick={logout}
              className="text-gray-700 hover:text-amber-600 font-medium"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="text-gray-700 hover:text-amber-600 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-amber-600 text-white rounded-full px-4 py-2 font-medium hover:bg-amber-700"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? (
            <X className="h-7 w-7 text-gray-800" />
          ) : (
            <Menu className="h-7 w-7 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 z-20 md:hidden">
          <Link
            to="/"
            className="text-gray-700 hover:text-amber-600 font-medium"
            onClick={() => setIsMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-amber-600 font-medium"
            onClick={() => setIsMobileOpen(false)}
          >
            About
          </Link>
          <Link
            to="/menu"
            className="text-gray-700 hover:text-amber-600 font-medium"
            onClick={() => setIsMobileOpen(false)}
          >
            Menu
          </Link>
          <Link
            to="/order"
            className="text-gray-700 hover:text-amber-600 font-medium"
            onClick={() => setIsMobileOpen(false)}
          >
            Order
          </Link>
          <Link to="/booktable" onClick={() => setIsMobileOpen(false)}>
            <button className="bg-transparent text-black border-2 rounded-full hover:border-orange-500 border-black hover:bg-orange-600 hover:text-white px-4 py-2 font-medium">
              Book A Table
            </button>
          </Link>

          {user ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-semibold">
                {initials}
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsMobileOpen(false);
                }}
                className="text-gray-700 hover:text-amber-600 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="text-gray-700 hover:text-amber-600 font-medium text-center"
                onClick={() => setIsMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-amber-600 text-white rounded-full px-4 py-2 font-medium hover:bg-amber-700 text-center"
                onClick={() => setIsMobileOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
