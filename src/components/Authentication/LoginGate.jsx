import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";

export default function LoginGate({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Always require login when browser opens
    localStorage.removeItem("isLoggedIn");
    setAuthorized(false);
  }, []);

  // Handle admin login process
  // Step 1: Validate that both username and password are entered.
  // Step 2: Show loading state and clear any previous error.
  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);
    setError("");

    // Step 3: Send API request using Basic Auth header
    // The btoa() function encodes username and password into Base64 for HTTP header.
    try {
      const res = await fetch(`${BASE_URL}/api/protected`, {
        headers: {
          Authorization: "Basic " + btoa(`${username}:${password}`),
        },
      });

      // Step 4: Handle the backend response
      // If successful, store login status in localStorage and show dashboard.
      // Otherwise, display an invalid login message.
      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username); // Store name of the loged in person
        setAuthorized(true);
      } else {
        setError("Invalid username or password.");
      }

      // Step 5: Handle any network or server errors
      // If request fails (e.g. no internet), show a friendly error.
    } catch {
      setError("Server error. Please try again later.");

      // Step 6: Stop the loading spinner no matter success or error.
    } finally {
      setLoading(false);
    }
  };

  // If user is already authorized, show the protected dashboard content (children)
  if (!authorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Admin Login
          </h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-2 mb-4 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-2 mb-4 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />

          {error && (
            <p className="text-red-600 font-medium text-sm text-center mb-4">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-2.5 text-sm font-semibold rounded-md transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-gray-500 text-xs text-center mt-6">
            © {new Date().getFullYear()} Travel Admin Dashboard
          </p>
        </div>
      </div>
    );
  }
  // If authorized -> render the Dashboard
  return children;
}
