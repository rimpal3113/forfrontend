// components/member/MemberSidebar.jsx
import { Home, FileText, BellRing, ClipboardList } from "lucide-react"
import { Link } from "react-router-dom"

export default function MemberSidebar({ active = "Dashboard" }) {
  const menu = [
    { icon: <Home />, label: "Dashboard", to: "/member/dashboard" },
    { icon: <FileText />, label: "My Bills", to: "/member/mybills" },
    { icon: <BellRing />, label: "Notifications", to: "/member/notifications" },
  
  ]

  return (
    <aside className="w-64 bg-[#1F2937] text-gray-300 h-screen shadow-lg p-5">
      <h2 className="text-2xl font-bold mb-6 text-red-500 tracking-wide">
        FitGym<span className="text-white"> Pro</span>
      </h2>
      <nav className="px-4 py-2 space-y-2">
        {menu.map(({ icon, label, to }) => {
          const isActive = active === label
          return (
            <Link
              key={label}
              to={to}      
              className={`flex items-center gap-3 px-3 py-2 rounded-md  ${
                isActive
                  ? "bg-red-600 text-white font-semibold"
                : "hover:bg-gray-700 hover:text-white text-gray-300"
              }`}
            >
              <span className="w-5 h-5">{icon}</span>
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
