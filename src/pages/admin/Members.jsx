import React, { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"

export default function Members() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://backend-sigma-eight-67.vercel.app/api/members", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setMembers(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch members:", err)
        setLoading(false)
      })
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return

    try {
      const res = await fetch(`https://backend-sigma-eight-67.vercel.app/api/members/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m._id !== id))
      } else {
        const err = await res.json()
        alert(err.message || "Delete failed")
      }
    } catch (err) {
      console.error("Delete error:", err)
      alert("An error occurred")
    }
  }

  const handleEdit = (member) => {
    const name = prompt("Edit name:", member.name)
    if (!name) return

    fetch(`https://backend-sigma-eight-67.vercel.app/api/members/${member._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...member, name }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setMembers((prev) =>
          prev.map((m) => (m._id === updated._id ? updated : m))
        )
      })
      .catch((err) => {
        console.error("Update error:", err)
        alert("Edit failed")
      })
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar theme="red" />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Topbar theme="red" />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-4 text-red-600">All Members</h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {members.map((member) => (
                    <tr key={member._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{member.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{member.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{member.gender}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(member)}
                          className="text-blue-600 hover:underline mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {members.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-gray-500">
                        No members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
