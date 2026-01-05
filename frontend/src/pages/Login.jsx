import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await API.post("login/", {
        email: form.email,
        password: form.password,
      });
      login(response.data.token.access);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-indigo-900 via-purple-900 to-black animate-pulse-slow relative overflow-hidden">

      {/* Floating Lights */}
      <div className="absolute inset-0">
        <div className="w-72 h-72 bg-purple-600 opacity-20 blur-3xl rounded-full absolute top-10 left-10 animate-float"></div>
        <div className="w-72 h-72 bg-indigo-600 opacity-20 blur-3xl rounded-full absolute bottom-10 right-10 animate-float-delay"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-8 rounded-3xl space-y-6 
                        animate-fade-in">

          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white tracking-wide animate-text-glow">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Access your futuristic dashboard
            </p>
          </div>

          {/* Error Box */}
          {error && (
            <div className="bg-red-800/40 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm animate-shake">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 
                           focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                           transition-all duration-300 placeholder-gray-400
                           hover:border-purple-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Your secure password"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20
                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                           transition-all duration-300 placeholder-gray-400
                           hover:border-indigo-400"
              />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-gray-300 text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-500 rounded bg-white/20 border-white/30"
                />
                <span className="ml-2">Remember me</span>
              </label>

              <a href="/forgot-password" className="hover:text-purple-400 transition">
                Forgot?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-linear-to-r from-purple-600 to-indigo-600 
                         text-white font-semibold shadow-lg shadow-purple-800/40
                         hover:shadow-purple-500/60 hover:scale-[1.02]
                         transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                "Access Portal"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center text-gray-300 text-sm">
            New here?{" "}
            <a href="/register" className="text-purple-400 hover:underline">
              Create Account
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
