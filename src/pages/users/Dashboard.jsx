// src/user/UserDashboard.jsx
"use client"

import UserSidebar from "../../components/users/UserSidebar"
import UserTopbar from "../../components/users/UserTopbar"
import { useNavigate } from "react-router-dom"

export default function UserDashboard() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-gray-100">
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <UserTopbar />

        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">User Dashboard</h2>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-red-700 mb-2">
              Welcome, Regular User!
            </h3>
            <p className="text-gray-600 mb-4">
              You have limited access to view gym records and search functionality.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 hover:shadow-md transition">
                <h4 className="text-lg font-semibold text-red-700 mb-1">Search Records</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Search through gym member records and information.
                </p>
                <button
                  onClick={() => navigate("/user/searchrecords")}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Go to Search
                </button>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition">
                <h4 className="text-lg font-semibold text-red-700 mb-1">View Details</h4>
                <p className="text-sm text-gray-600 mb-3">
                  View your account details and information.
                </p>
                <button
                  onClick={() => navigate("/user/profile")}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
