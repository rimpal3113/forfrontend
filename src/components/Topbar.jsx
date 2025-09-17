import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function MemberTopbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-[#111827]">
      <h2 className="text-xl font-semibold text-red-600">
        Welcome, {user?.name} ({user?.role})
      </h2>

      <button
        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  )
}
