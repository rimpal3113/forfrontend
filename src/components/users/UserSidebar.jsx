// src/user/UserSidebar.jsx
"use client"

import { Home, Search } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

export default function UserSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <aside className="w-64 bg-[#1F2937] text-gray-300 h-screen shadow-lg p-5">
     <h2 className="text-2xl font-bold mb-6 text-red-500 tracking-wide">
        FitGym<span className="text-white"> Pro</span>
      </h2>
      <nav className="mt-6">
        <ul className="space-y-2">
          <li
            onClick={() => navigate("/user/dashboard")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
              currentPath === "/user/dashboard"
                   ? "bg-red-600 text-white font-semibold"
                : "hover:bg-gray-700 hover:text-white text-gray-300"
            }`}
          >
            <Home className="w-5 h-5 mr-2" />
            Dashboard
          </li>
          <li
            onClick={() => navigate("/user/searchrecords")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
              currentPath === "/user/searchrecords"
                  ? "bg-red-600 text-white font-semibold"
                : "hover:bg-gray-700 hover:text-white text-gray-300"
            }`}
          >
            <Search className="w-5 h-5 mr-2" />
            Search Records
          </li>
        </ul>
      </nav>
    </aside>
  )
}
