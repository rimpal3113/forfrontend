// src/pages/admin/FeePackages.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function FeePackages() {
  const [members, setMembers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch members list
  useEffect(() => {
    fetch("https://backend-sigma-eight-67.vercel.app/api/members", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error(err));
  }, [token]);

  // Fetch fee packages
  const fetchPackages = () => {
    setLoading(true);
    fetch("https://backend-sigma-eight-67.vercel.app/api/feepackages", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // Assign package to member
  const assignPackage = (packageId) => {
    if (!selectedMember) return;

    fetch(`https://backend-sigma-eight-67.vercel.app/api/members/${selectedMember._id}/assign-package`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ packageId }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Package assigned successfully!");
        setSelectedMember(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar title="Assign Fee Packages" />

        {/* Members Table */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">Members</h2>
          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member._id} className="border-b">
                  <td className="p-2 border">{member.name}</td>
                  <td className="p-2 border">{member.email}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => {
                        setSelectedMember(member);
                        fetchPackages();
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Choose Package
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Packages List */}
        {selectedMember && (
          <div className="p-4 bg-gray-50 mt-4 rounded border">
            <h2 className="text-lg font-semibold mb-2">
              Assign Package to {selectedMember.name}
            </h2>

            {loading ? (
              <p>Loading packages...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <div
                    key={pkg._id}
                    className="border rounded p-4 bg-white shadow"
                  >
                    <h3 className="font-bold text-lg">{pkg.name}</h3>
                    <p className="text-gray-600">Price: ₹{pkg.price}</p>
                    <p className="text-gray-600">
                      Duration: {pkg.duration} days
                    </p>
                    {pkg.description && (
                      <p className="text-gray-500 mt-1">{pkg.description}</p>
                    )}
                    <button
                      onClick={() => assignPackage(pkg._id)}
                      className="mt-3 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Assign
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
