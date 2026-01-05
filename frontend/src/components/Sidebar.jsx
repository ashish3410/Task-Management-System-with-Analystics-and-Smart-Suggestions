import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ListTodo, Sparkles, Settings } from "lucide-react";

export default function SideBar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Project", path: "/projects", icon: <ListTodo size={20} /> },
    { name: "AI Suggestions", path: "/ai", icon: <Sparkles size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div
      className="
        w-64 min-h-screen 
        bg-gray-900 backdrop-blur-2xl 
        border-r border-white/10
        shadow-xl shadow-indigo-900/30
        p-6
        text-white
      "
    >
      {/* Brand */}
      <h2 className="text-2xl font-bold bg-linear-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent mb-10">
        AI Task Manager
      </h2>

      {/* Menu */}
      <ul className="space-y-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl 
                  transition-all duration-300 cursor-pointer 
                  group

                  ${
                    isActive
                      ? "bg-linear-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-900/40"
                      : "bg-white/5 hover:bg-white/10 border border-white/5"
                  }
                `}
              >
                <span
                  className={`group-hover:scale-110 transition-transform duration-300 ${
                    isActive ? "text-white" : "text-indigo-300"
                  }`}
                >
                  {item.icon}
                </span>

                <span className="font-medium tracking-wide">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
