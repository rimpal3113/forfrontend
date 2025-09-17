import { useState } from "react"
import UserSidebar from "../../components/users/UserSidebar"
import UserTopbar from "../../components/users/UserTopbar"

export default function SearchRecords() {
  const [searchQuery, setSearchQuery] = useState("")
  const [records, setRecords] = useState([])

  const handleSearch = () => {
    // Replace with real API logic if needed
    const dummyData = [
      { type: "Fee Payment", date: "2025-07-01", amount: 1200, status: "Paid" },
      { type: "Diet Plan", date: "2025-07-05", description: "Weight Loss Plan" },
    ]

    const filtered = dummyData.filter((record) =>
      record.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setRecords(filtered)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserSidebar />

      <div className="flex flex-col flex-1">
        <UserTopbar />

        <main className="p-6 flex-1">
          <h1 className="text-3xl font-bold text-red-600 mb-6">Search Records</h1>

          {/* Search Box */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Search by record type (e.g. Fee, Diet)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-red-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={handleSearch}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Search
            </button>
          </div>

          {/* Results */}
          {records.length === 0 ? (
            <p className="text-gray-600 italic">No records found. Try another search.</p>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-red-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-red-700">Type</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-red-700">Date</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-red-700">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {records.map((record, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-gray-800">{record.type}</td>
                      <td className="px-6 py-4 text-gray-800">{record.date}</td>
                      <td className="px-6 py-4 text-gray-800">
                        {record.amount
                          ? `₹${record.amount} - ${record.status}`
                          : record.description || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
