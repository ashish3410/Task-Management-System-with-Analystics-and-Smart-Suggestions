import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [token, setToken]=useState(localStorage.getItem("authToken") || null );
  return (
    <div
      className="
        w-full px-6 py-6 
        bg-transparent/50 backdrop-blur-xl 
        border-b border-white/10
        shadow-lg shadow-indigo-900/30
        flex items-center justify-between
        rounded-xl
      "
    >
      {/* Logo / Title */}
      <h3 className="text-2xl font-bold bg-linear-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent tracking-wide">
        AI Powered Task Manager
      </h3>
      {/* Right Section */}
      <div>
        {token ? (<div className="flex items-center gap-4">
        {/* Profile Icon */}
        <div className="w-10 h-10 rounded-full bg-linear-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-900/40 cursor-pointer hover:scale-105 transition-transform duration-300">
          <span className="text-white font-semibold">U</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="
            px-4 py-2 rounded-lg 
            font-medium text-white 
            bg-linear-to-r from-red-500 to-red-600
            shadow-lg shadow-red-900/40
            hover:from-red-600 hover:to-red-700 
            hover:shadow-red-900/60
            transition-all duration-300
          "
        >
          Logout
        </button>
      </div>):(
        <button
          onClick={logout}
          className="
            px-4 py-2 rounded-lg 
            font-medium text-white 
            bg-linear-to-r from-red-500 to-red-600
            shadow-lg shadow-red-900/40
            hover:from-red-600 hover:to-red-700 
            hover:shadow-red-900/60
            transition-all duration-300
          "
        >
          Logout
        </button>
      )}
      </div>
    </div>
  );
};

export default Navbar;
