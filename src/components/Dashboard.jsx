import { Link } from "react-router-dom";
import { FiGrid, FiMapPin, FiBell, FiLogOut } from "react-icons/fi";
import { FaCity } from "react-icons/fa";
import { useEffect, useState } from "react";
//import { BASE_URL } from "../config";
import PlacesList from "./Places/PlacesList";
import CitiesList from "./Cities/CitiesList";
import NotificationsList from "./Notifications/NotificationsList";

import DashboardOverview from "./Dashboard/DashboardOverview";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("places"); // controls what to show
  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);
//  const [loading, setLoading] = useState(true);
 // const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Retrieves curret user saved in local storage and parse it to Json (JS) Object.  If not than it will use demo user
  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!existingUser) {
      const demoUser = {
        name: "Laura Williams",
        role: "Administrator",
        email: "laura@traveladmin.com",
        avatar: "https://i.pravatar.cc/150?img=12",
        lastUpdated: "2 hours ago",
      };
      localStorage.setItem("currentUser", JSON.stringify(demoUser));
      setUser(demoUser);
    } else {
      setUser(existingUser);
    }
  }, []);

  // These functions handle add / edit / delete places
  const handleAddPlace = (newPlace) => setPlaces([...places, newPlace]); // This function is called when you want to add a new place.
  const handleEditPlace = (updated, index) =>
    setPlaces((prev) => prev.map((p, i) => (i === index ? updated : p))); // This function is called when you want to edit the current place.
  const handleDeletePlace = (index) =>
    setPlaces((prev) => prev.filter((_, i) => i !== index)); // This function is called when you want to delete the current place.

  // These functions handle add / edit / delete cities
  const handleAddCity = (newCity) => setCities([...cities, newCity]);
  const handleEditCity = (updated, index) =>
    setCities((prev) => prev.map((c, i) => (i === index ? updated : c)));
  const handleDeleteCity = (index) =>
    setCities((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white shadow-md flex flex-col justify-between">
        <div>
          <h1 className="p-6 text-lg font-bold text-gray-900">
            Travel App Admin
          </h1>
          <nav className="flex flex-col">
            <button
              onClick={() => setActiveSection("dashboard")}
              className={`flex items-center gap-2 px-6 py-2 text-gray-700 font-medium hover:text-sky-600 hover:font-semibold transition-colors text-left ${
                activeSection === "dashboard"
                  ? "bg-sky-100 font-semibold text-sky-600"
                  : ""
              }`}
            >
              <FiGrid strokeWidth={3} /> Dashboard
            </button>
            {/* laces navigation */}
            <button
              onClick={() => setActiveSection("places")}
              className={`flex items-center gap-2 px-6 py-2 text-gray-700  hover:text-sky-600 hover:font-semibold transition-colors text-left ${
                activeSection === "places"
                  ? "bg-sky-100 font-semibold text-sky-600"
                  : ""
              }`}
            >
              <FiMapPin strokeWidth={3} /> Places
            </button>
            {/* Cities navigation */}
            <button
              onClick={() => setActiveSection("cities")}
              className={`flex items-center gap-2 px-6 py-2 text-gray-700  hover:text-sky-600 hover:font-semibold transition-colors text-left ${
                activeSection === "cities"
                  ? "bg-sky-100 font-semibold text-sky-600"
                  : ""
              }`}
            >
              <FaCity strokeWidth={3} /> Cities
            </button>
            <button
              onClick={() => setActiveSection("notifications")}
              className={`flex items-center gap-2 px-6 py-2 text-gray-700 hover:text-sky-600 hover:font-semibold transition-colors text-left ${
                activeSection === "notifications"
                  ? "bg-sky-100 font-semibold text-sky-600"
                  : ""
              }`}
            >
              <FiBell strokeWidth={3} /> Notifications
            </button>
          </nav>
        </div>

        <div className="p-6">
          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              window.location.reload(); // reloads the app, returning to LoginGate
            }}
            className="flex items-center gap-2 w-full text-left text-gray-700 font-semibold hover:text-red-600 transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        {/* Dynamic admin header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || "https://i.pravatar.cc/50"}
              alt="Profile"
              className="w-12 h-12 rounded-full border border-gray-200"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {user?.name || "Guest User"}
              </h2>
              <p className="text-sm text-gray-500">
                {user?.role || "User"} · Last updated{" "}
                {user?.lastUpdated || "just now"}
              </p>
            </div>
          </div>
        </div>

        {/* Render components conditionally */}
        {activeSection === "places" && (
          <PlacesList
            places={places || []}
            onAdd={handleAddPlace}
            onEdit={handleEditPlace}
            onDelete={handleDeletePlace}
          />
        )}
        {activeSection === "cities" && (
          <CitiesList
            cities={cities || []}
            onAdd={handleAddCity}
            onEdit={handleEditCity}
            onDelete={handleDeleteCity}
          />
        )}
        {activeSection === "notifications" && <NotificationsList />}
        {activeSection === "dashboard" && <DashboardOverview />}
      </main>
    </div>
  );
}
