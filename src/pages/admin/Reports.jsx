import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function Reports() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch reports from backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("https://backend-sigma-eight-67.vercel.app/api/reports");
        const data = await res.json();
        setReportData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch reports", error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // ✅ Handle Export (CSV download)
  const handleExport = async () => {
    try {
      const res = await fetch("https://backend-sigma-eight-67.vercel.app/api/reports/export");
      if (!res.ok) throw new Error("Failed to export report");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a download link
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reports.csv");
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-red-600">Reports</h1>

            {/* ✅ Global Export Button (all reports) */}
            {reportData.length > 0 && (
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Export All Reports
              </button>
            )}
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : reportData.length === 0 ? (
            <p className="text-red-600">No reports available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportData.map((report) => (
                <div
                  key={report._id}
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition border border-red-100"
                >
                  <h2 className="text-lg font-semibold text-red-600">
                    {report.title}
                  </h2>
                  <p className="text-gray-700 mt-2 text-xl">{report.amount}</p>
                  <p className="text-gray-500 mt-1 text-sm">
                    {new Date(report.date).toLocaleDateString()}
                  </p>

                  {/* ✅ Export single report */}
                  <button
                    onClick={handleExport}
                    className="mt-4 text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Export Report
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
