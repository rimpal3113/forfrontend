import React, { useEffect, useState } from "react";
import MemberSidebar from "../../components/member/MemberSidebar";
import MemberTopbar from "../../components/member/MemberTopbar";

export default function MyBills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get user and token from localStorage
  const userString = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id; // Safely access userId

  useEffect(() => {
    const fetchBills = async () => {
      if (!userId || !token) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("https://backend-sigma-eight-67.vercel.app/api/bills/member/" + userId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load bills");

        setBills(data);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBills();
  }, [userId, token]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <MemberSidebar active="My Bills" />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <MemberTopbar user={user} />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">My Bills</h2>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : bills.length === 0 ? (
            <p>No bills found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {bills.map((bill) => (
                <div key={bill._id} className="border p-4 rounded shadow bg-white">
                  <p><strong>Date:</strong> {new Date(bill.date).toLocaleDateString()}</p>
                  <p><strong>Amount:</strong> ₹{bill.amount}</p>
                  <p><strong>Status:</strong> {bill.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
