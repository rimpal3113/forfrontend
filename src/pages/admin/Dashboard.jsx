import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import DashboardCards from "../../components/DashboardCards"

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar theme="red" />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Topbar theme="red" />

        <main className="p-8 space-y-6">
          <h1 className="text-2xl font-bold text-red-600">Admin Dashboard</h1>

          {/* Dashboard summary cards */}
          <DashboardCards theme="red" />

          {/* Future sections: Recent Members, Pending Bills, etc. */}
        </main>
      </div>
    </div>
  )
}
