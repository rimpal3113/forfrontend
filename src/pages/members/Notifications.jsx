import React, { useEffect, useState } from "react";
import MemberSidebar from "../../components/member/MemberSidebar";
import MemberTopbar from "../../components/member/MemberTopbar";

export default function MemberNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user info from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://backend-sigma-eight-67.vercel.app/api/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="flex h-screen">
      <MemberSidebar active="Notifications" />
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-20 bg-white shadow">
          <MemberTopbar user={user} />
        </header>
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Notifications</h1>
          {notifications.length === 0 ? (
            <div className="bg-white shadow rounded p-6">
              <p className="text-red-500">No notifications at the moment.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {notifications.map((n) => (
                <li
                  key={n._id}
                  className="bg-white p-4 rounded shadow border-l-4 border-red-500"
                >
                  <div className="flex justify-between items-center mb-1">
                    <h2 className="text-lg font-semibold text-red-700">
                      {n.title}
                    </h2>
                    <span className="text-sm text-red-400">
  {n?.createdAt
    ? new Date(n.createdAt).toLocaleDateString()
    : "No date"}
</span>

                  </div>
                  <p className="text-red-600">{n.message}</p>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}
