import { useEffect, useState } from "react";

export default function DashboardCards() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeSubscriptions: 0,
    newSignups: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://backend-sigma-eight-67.vercel.app/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-lg font-semibold">Total Members</h2>
        <p className="text-2xl text-red-600">{stats.totalMembers}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-lg font-semibold">Active Subscriptions</h2>
        <p className="text-2xl text-red-600">{stats.activeSubscriptions}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-lg font-semibold">New Signups (7d)</h2>
        <p className="text-2xl text-red-600">{stats.newSignups}</p>
      </div>
    </div>
  );
}
