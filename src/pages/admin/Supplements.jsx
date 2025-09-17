import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function Supplements() {
  const [supplements, setSupplements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch supplements from backend
  const fetchSupplements = async () => {
    try {
      const res = await fetch("https://backend-sigma-eight-67.vercel.app/api/supplements");
      if (!res.ok) throw new Error("Failed to fetch supplements");
      const data = await res.json();
      setSupplements(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplements();
  }, []);

  // ✅ Handle supplement purchase (reduce stock)
  const handlePurchase = async (id) => {
    try {
      const res = await fetch(`https://backend-sigma-eight-67.vercel.app/api/supplements/purchase/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Purchase failed");

      await fetchSupplements(); // refresh stock
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-6">Supplements</h1>

          {loading ? (
            <p className="text-gray-600">Loading supplements...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : supplements.length === 0 ? (
            <p className="text-gray-600">No supplements available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {supplements.map((supplement) => (
                <div
                  key={supplement._id}
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-red-500"
                >
                  <h2 className="text-lg font-semibold text-red-600 mb-2">
                    {supplement.name}
                  </h2>
                  <p className="text-gray-700">
                    <strong className="text-red-500">Brand:</strong> {supplement.brand}
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-red-500">Price:</strong> ₹{supplement.price}
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong className="text-red-500">Stock:</strong> {supplement.stock} units
                  </p>

                  {/* ✅ Purchase Button */}
                  {supplement.stock > 0 ? (
                    <button
                      onClick={() => handlePurchase(supplement._id)}
                      className="w-full text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Purchase
                    </button>
                  ) : (
                    <span className="text-gray-500 text-sm">Out of stock</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
