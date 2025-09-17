import { useEffect, useState } from "react";
import MemberSidebar from "../../components/member/MemberSidebar";
import MemberTopbar from "../../components/member/MemberTopbar";

export default function Dashboard() {
  const [recentBills, setRecentBills] = useState([]);
  const [currentUser, setCurrentUser] = useState({ name: "", role: "member" });

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);

        // Fetch recent bills only
        fetch(`https://backend-sigma-eight-67.vercel.app/api/bills/member/${parsedUser._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((bills) => {
            // Optional: Sort by date descending
            const sortedBills = bills.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setRecentBills(sortedBills.slice(0, 5)); // last 5 bills
          });
      } catch (e) {
        console.error("Error loading dashboard data:", e);
      }
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <MemberSidebar active="Dashboard" />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <MemberTopbar user={currentUser} />

        <main className="flex-1 p-6 overflow-y-auto">
          {/* Recent Bills Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Recent Bills
            </h2>
            <div className="bg-white p-4 rounded-lg shadow">
              {recentBills.length === 0 ? (
                <p className="text-sm text-gray-600">No recent bills found.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="py-2">Date</th>
                      <th className="py-2">Amount</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBills.map((bill, index) => (
                      <tr key={index} className="border-b last:border-none">
                        <td>{new Date(bill.date).toLocaleDateString()}</td>
                        <td className="py-2 text-red-600 font-semibold">
                          ₹{bill.amount}
                        </td>
                        <td className="py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              bill.status === "paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {bill.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
