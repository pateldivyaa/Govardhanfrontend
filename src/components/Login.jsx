import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const { loginUser, user } = useAppContext();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { phone, password: '***' });
    const res = await loginUser(phone, password);
    console.log('Login result:', res);
    if (res?.ok) {
      console.log('Login successful, navigating to home');
      navigate("/");
    } else {
      console.log('Login failed:', res?.message);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-1">Login</h1>
        <p className="text-gray-600 mb-6">Welcome back! Please sign in.</p>
        <form onSubmit={onSubmit} className="space-y-4">
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-amber-600 text-white rounded-md py-2 font-medium hover:bg-amber-700">
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          New here? <Link to="/register" className="text-amber-600 hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;



