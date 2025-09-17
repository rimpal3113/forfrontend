import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videoSources = [
    "/videos/gym1.mp4",
    "/videos/gym2.mp4",
    "/videos/gym3.mp4",
    "/videos/gym4.mp4",
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("ended", handleVideoEnd);
    }
    return () => {
      if (video) {
        video.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [currentVideoIndex]);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("https://backend-sigma-eight-67.vercel.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert(`Login successful as ${role.toUpperCase()} ✅`);

      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "member") navigate("/member/dashboard");
      else if (role === "user") navigate("/user/dashboard");
    } catch (err) {
      alert("Login error: " + err.message);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        key={currentVideoIndex}
        autoPlay
        muted
        loop={false}
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={videoSources[currentVideoIndex]}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* Login Form */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
          <h2 className="text-2xl font-extrabold text-center text-red-600 mb-6 tracking-wide">
            Gym Portal Login
          </h2>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mb-4 border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="admin">Admin</option>
            <option value="member">Member</option>
            <option value="user">User</option>
          </select>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            onClick={handleLogin}
            className="bg-red-600 hover:bg-red-700 transition-all text-white font-bold py-3 rounded-md w-full shadow-md tracking-wide"
          >
            🔐 Login
          </button>
        </div>
      </div>
    </div>
  );
}
