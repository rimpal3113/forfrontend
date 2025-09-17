// src/pages/admin/AddMember.jsx
import { useState } from "react"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"

export default function AddMember() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    membershipType: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("https://backend-sigma-eight-67.vercel.app/api/members/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      if (response.ok) {
        alert("✅ Member added successfully!")
        setFormData({
          name: "",
          age: "",
          gender: "",
          email: "",
          phone: "",
          membershipType: "",
          password: "",
        })
      } else {
        alert(`❌ Error: ${data.message}`)
      }
    } catch (error) {
      console.error("Add member error:", error)
      alert("❌ Something went wrong. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar title="Add Member" />
        <main className="p-6 bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Add New Member</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
              <Input label="Age" type="number" name="age" value={formData.age} onChange={handleChange} />
              <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
              <Input label="Phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
              <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
              <Select label="Membership Type" name="membershipType" value={formData.membershipType} onChange={handleChange} options={["Basic", "Standard", "Premium"]} />
              <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />

              <div className="md:col-span-2 text-center mt-6">
                <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition">
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        required
      />
    </div>
  )
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        required
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt.toLowerCase()} value={opt.toLowerCase()}>{opt}</option>
        ))}
      </select>
    </div>
  )
}
