import {
  Home, Users, UserPlus, DollarSign, Bell,
  ShoppingCart, FileText, Layout, Search
} from "lucide-react"
import { NavLink } from "react-router-dom"

const menu = [
  { name: "Dashboard", icon: <Home size={18} />, path: "/admin/dashboard" },
  { name: "Members", icon: <Users size={18} />, path: "/members" },
  { name: "Add Member", icon: <UserPlus size={18} />, path: "/addmember" },
  { name: "Bills", icon: <DollarSign size={18} />, path: "/bills" },
  { name: "Fee Packages", icon: <Layout size={18} />, path: "/feepackages" },
  { name: "Notifications", icon: <Bell size={18} />, path: "/notifications" },
  { name: "Reports", icon: <FileText size={18} />, path: "/reports" },
  { name: "Supplements", icon: <ShoppingCart size={18} />, path: "/supplements" },
  { name: "Diet Plans", icon: <Layout size={18} />, path: "/dietplans" },
  { name: "Search", icon: <Search size={18} />, path: "/search" },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#1F2937] text-gray-300 h-screen shadow-lg p-5">
      <h2 className="text-2xl font-bold mb-6 text-red-500 tracking-wide">
        FitGym<span className="text-white"> Pro</span>
      </h2>

      <nav className="space-y-1">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all 
              ${isActive
                ? "bg-red-600 text-white font-semibold"
                : "hover:bg-gray-700 hover:text-white text-gray-300"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
