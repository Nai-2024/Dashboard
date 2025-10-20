import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";

export default function LoginGate({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const alreadyLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (alreadyLoggedIn) setAuthorized(true);
  }, []);

  const handleLogin = async () => {
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/api/protected`, {
        headers: {
          Authorization: "Basic " + btoa(`${username}:${password}`),
        },
      });

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        setAuthorized(true);
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  if (authorized) return children;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          🔐 Admin Login
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
        />

        {/* Error message */}
        {error && (
          <p className="text-red-600 font-medium text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-md transition-colors"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-gray-500 text-xs text-center mt-6">
          © {new Date().getFullYear()} Travel Admin Dashboard
        </p>
      </div>
    </div>
  );
}
