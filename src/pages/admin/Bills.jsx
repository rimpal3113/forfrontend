import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"

export default function Bill() {
  const [bills, setBills] = useState([])
  const [members, setMembers] = useState([])
  const [newBill, setNewBill] = useState({
    memberName: "",
    amount: "",
    status: "unpaid",
  })

  // Fetch all bills
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await fetch("https://backend-sigma-eight-67.vercel.app/api/bills")
        const data = await res.json()
        setBills(data)
      } catch (error) {
        console.error("Failed to fetch bills:", error)
      }
    }

    const fetchMembers = async () => {
      try {
        const res = await fetch("https://backend-sigma-eight-67.vercel.app/api/members")
        const data = await res.json()
        setMembers(data)
      } catch (error) {
        console.error("Failed to fetch members:", error)
      }
    }

    fetchBills()
    fetchMembers()
  }, [])

  // Create new bill
  const handleCreateBill = async (e) => {
    e.preventDefault()

    const selectedMember = members.find(
      (m) => m.email === newBill.memberName || m.name === newBill.memberName
    )

    if (!selectedMember) {
      alert("Member not found")
      return
    }

    const payload = {
      memberName: selectedMember.email,
      memberId: selectedMember._id,
      amount: Number(newBill.amount),
      status: newBill.status,
      date: new Date().toISOString(),
    }

    try {
      const res = await fetch("https://backend-sigma-eight-67.vercel.app/api/bills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      const result = await res.json()
      setBills((prev) => [...prev, result.bill])
      setNewBill({ memberName: "", amount: "", status: "unpaid" })
    } catch (error) {
      console.error("Failed to create bill:", error)
    }
  }

  // Delete bill
  const handleDelete = async (id) => {
    try {
      await fetch(`https://backend-sigma-eight-67.vercel.app/api/bills/${id}`, {
        method: "DELETE",
      })
      setBills(bills.filter((b) => b._id !== id))
    } catch (error) {
      console.error("Failed to delete bill:", error)
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Topbar />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Manage Bills</h2>

          {/* Create Bill Form */}
          <form
            onSubmit={handleCreateBill}
            className="mb-6 bg-white p-4 rounded shadow space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-700">Create New Bill</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                required
                placeholder="Member Email"
                className="p-2 border rounded"
                value={newBill.memberName}
                onChange={(e) =>
                  setNewBill({ ...newBill, memberName: e.target.value })
                }
              />
              <input
                type="number"
                required
                placeholder="Amount"
                className="p-2 border rounded"
                value={newBill.amount}
                onChange={(e) =>
                  setNewBill({ ...newBill, amount: e.target.value })
                }
              />
              <select
                className="p-2 border rounded"
                value={newBill.status}
                onChange={(e) =>
                  setNewBill({ ...newBill, status: e.target.value })
                }
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Create Bill
            </button>
          </form>

          {/* Bills Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Bill No</th>
                  <th className="py-3 px-4 text-left">Member</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No bills available.
                    </td>
                  </tr>
                ) : (
                  bills.map((bill, index) => (
                    <tr
                      key={bill._id}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{bill.memberName}</td>
                      <td className="py-3 px-4">₹{bill.amount}</td>
                      <td className="py-3 px-4">
                        {new Date(bill.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            bill.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {bill.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDelete(bill._id)}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
