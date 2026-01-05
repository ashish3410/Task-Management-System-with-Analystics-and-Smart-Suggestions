import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      await API.post("register/", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-black via-indigo-900 to-purple-900 animate-pulse-slow relative overflow-hidden">

      {/* Animated floating lights */}
      <div className="absolute inset-0">
        <div className="w-72 h-72 bg-purple-700 opacity-20 blur-3xl rounded-full absolute top-16 left-16 animate-float"></div>
        <div className="w-72 h-72 bg-indigo-700 opacity-20 blur-3xl rounded-full absolute bottom-16 right-16 animate-float-delay"></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-10 rounded-3xl space-y-7 animate-fade-in">

          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white tracking-wide animate-text-glow">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Join the futuristic experience
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

            {/* Username */}
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                placeholder="Your unique name"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 placeholder-gray-400 hover:border-purple-400"
              />
            </div>

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
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 placeholder-gray-400 hover:border-indigo-400"
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
                placeholder="Create a strong password"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 placeholder-gray-400 hover:border-indigo-400"
              />
            </div>

            {/* Confirm */}
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 placeholder-gray-400 hover:border-purple-400"
              />
            </div>

            {/* Signup Button */}
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
                  Creating...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center text-gray-300 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-purple-400 hover:underline">
              Sign in
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;
