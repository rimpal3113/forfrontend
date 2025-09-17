import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await fetch(`https://backend-sigma-eight-67.vercel.app/api/members/search?query=${query}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to search");

      setResults(data);
      setError("");
    } catch (err) {
      setResults([]);
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-red-700 mb-6">Search Members</h1>

          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter member name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-4 py-2 w-full border border-red-300 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Search
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((member) => (
                <div
                  key={member._id}
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition border border-red-200"
                >
                  <h2 className="text-lg font-semibold text-red-700">
                    {member.name}
                  </h2>
                  <p className="text-red-600">
                    <strong>Email:</strong> {member.email}
                  </p>
                  <p className="text-red-600">
                    <strong>Phone:</strong> {member.phone}
                  </p>
                  <p className="text-red-600">
                    <strong>Membership:</strong> {member.membershipType}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            query && !error && (
              <p className="text-red-500 mt-4">No matching members found.</p>
            )
          )}
        </main>
      </div>
    </div>
  );
}
