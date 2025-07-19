import React, { useState } from "react";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://lms-14j9.onrender.com/auth/login",
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/home");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Login Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700">
      <div className="bg-white rounded-xl shadow-2xl flex max-w-4xl w-full overflow-hidden">
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="/loginimg-removebg-preview.png"
            alt="Login"
            className="h-full w-full object-cover"
            draggable={false}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 font-poppins">
              Welcome Back
            </h1>
            <p className="text-gray-600 font-medium">
              Please sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <MdEmail
                className="absolute left-3 top-3 text-indigo-400"
                size={24}
              />
              <input
                type="email"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="relative">
              <MdLock
                className="absolute left-3 top-3 text-indigo-400"
                size={24}
              />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-indigo-600 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <MdVisibilityOff size={24} />
                ) : (
                  <MdVisibility size={24} />
                )}
              </button>
            </div>

            {errorMessage && (
              <p className="text-red-600 text-center text-sm animate-pulse">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer w-full py-3 rounded-lg bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500 text-sm">
            © 2025 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
