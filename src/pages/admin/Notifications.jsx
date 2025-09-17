import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function AdminCreateNotification() {
  const [members, setMembers] = useState([]);
  const [recipientId, setRecipientId] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("https://backend-sigma-eight-67.vercel.app/api/members");
        const data = await res.json();
        setMembers(data);
      } catch (err) {
        console.error("Failed to load members:", err);
      }
    };
    fetchMembers();
  }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://backend-sigma-eight-67.vercel.app/api/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipient: recipientId, message }), // <-- fixed here
    });

    if (res.ok) {
      setSuccess("Notification sent successfully!");
      setMessage("");
      setRecipientId("");
    } else {
      const errData = await res.json();
      console.error(errData);
      alert("Failed to send notification.");
    }
  } catch (err) {
    console.error("Error submitting:", err);
  }
};


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Send Notification to Member</h2>

            {success && <p className="text-green-600 mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-1 font-medium">Select Member</label>
                <select
                  value={recipientId}
                  onChange={(e) => setRecipientId(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="">-- Choose Member --</option>
                  {members.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.name} ({m.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows="4"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
              >
                Send Notification
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
