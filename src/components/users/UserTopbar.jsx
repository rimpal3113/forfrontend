// src/user/UserTopbar.jsx
"use client"

import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function UserTopbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <header className="flex items-center justify-between bg-[#111827]  p-4 shadow-md">
      <h1 className="text-lg font-semibold text-red-600">Welcome, Regular User</h1>
      <div className="flex items-center space-x-6">
        <span className="text-sm text-red-600 font-medium">Role: User</span>
       <button
               className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow"
               onClick={handleLogout}
             >
               <LogOut size={18} />
               Logout
             </button>
      </div>
    </header>
  )
}
