import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function DietPlans() {
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null); // ✅ Track clicked plan

  useEffect(() => {
    const fetchDietPlans = async () => {
      try {
        const res = await fetch("https://backend-sigma-eight-67.vercel.app/api/dietplans");
        const data = await res.json();
        setDietPlans(data);
      } catch (error) {
        console.error("Failed to fetch diet plans", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDietPlans();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-red-600">Diet Plans</h1>

          {loading ? (
            <p>Loading...</p>
          ) : dietPlans.length === 0 ? (
            <p className="text-gray-600">No diet plans available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dietPlans.map((plan, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition duration-300"
                >
                  <h2 className="text-xl font-semibold text-red-600 mb-2">
                    {plan.name}
                  </h2>
                  <p className="text-gray-700 font-medium mb-1">
                    Member:{" "}
                    <span className="text-gray-800">{plan.memberName}</span>
                  </p>
                  <p className="text-gray-600">
                    <strong>Calories:</strong> {plan.calories}
                  </p>
                  <p className="text-gray-600">
                    <strong>Meals:</strong> {plan.meals}
                  </p>
                  <button
                    onClick={() => setSelectedPlan(plan)} // ✅ Open details modal
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ✅ Modal for Details */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              {selectedPlan.name}
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Member:</strong> {selectedPlan.memberName}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Calories:</strong> {selectedPlan.calories}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Meals:</strong> {selectedPlan.meals}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Created At:</strong>{" "}
              {new Date(selectedPlan.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
