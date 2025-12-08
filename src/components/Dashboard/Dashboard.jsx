import { FiGrid, FiMapPin, FiBell, FiLogOut, FiMenu } from "react-icons/fi";
import { FaCity } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchCities } from "../../services/api/citiesService";
import { fetchPlaces } from "../../services/api/placesService";
import PlacesList from "../Places/PlacesList";
import CitiesList from "../Cities/CitiesList";
import AddCityForm from "../Cities/AddCityForm";
import NotificationsList from "../Notifications/NotificationsList";
import DashboardOverview from "./DashboardOverview";
import Logo from "../../assets/DestigationsLogo.png";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [showCityForm, setShowCityForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  // User
  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      setUser({
        name: username.charAt(0).toUpperCase() + username.slice(1),
        role: "Administrator",
        avatar: "/default-avatar.png",
      });
    }
  }, []);

  // Fetch from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesData, placesData] = await Promise.all([
          fetchCities(),
          fetchPlaces(),
        ]);
        setCities(citiesData);
        setPlaces(placesData);
      } catch (err) {
        setError("Could not load data from the server.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-gray-500">Loading data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleAddPlace = (newPlace) => setPlaces((prev) => [...prev, newPlace]);
  const handleAddCity = (newCity) => setCities((prev) => [...prev, newCity]);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* BACKDROP OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 w-64 md:w-1/5 bg-white shadow-md flex flex-col min-h-screen transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col flex-grow">
          {/* Header with logo on left */}
          <div className="flex flex-col">
            <div className="w-full flex px-6 bg-white py-3 my-3 border-b shadow-sm">
              <img
                src={Logo}
                alt="Logo"
                className="object-contain  w-[180px]"
              />
            </div>

            <h1 className="text-lg px-6 my-2 font-semibold text-gray-900 ">
              Travel App Admin
            </h1>
          </div>

          <nav className="flex flex-col flex-grow font-medium">
            <button
              onClick={() => {
                setActiveSection("dashboard");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center px-6 gap-2 py-3 text-gray-700 hover:text-sky-600 ${
                activeSection === "dashboard" ? "bg-sky-100 text-sky-600" : ""
              }`}
            >
              <FiGrid /> Dashboard
            </button>

            <button
              onClick={() => {
                setActiveSection("places");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center px-6 gap-2 py-3 text-gray-700 hover:text-sky-600 ${
                activeSection === "places" ? "bg-sky-100 text-sky-600" : ""
              }`}
            >
              <FiMapPin /> Places
            </button>

            <button
              onClick={() => {
                setActiveSection("cities");
                setShowCityForm(false);
                setIsSidebarOpen(false);
              }}
              className={`flex items-center px-6 gap-2 py-3 text-gray-700 hover:text-sky-600 ${
                activeSection === "cities" ? "bg-sky-100 text-sky-600" : ""
              }`}
            >
              <FaCity /> Cities
            </button>

            <button
              onClick={() => {
                setActiveSection("notifications");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center px-6 gap-2 py-3 text-gray-700 hover:text-sky-600 ${
                activeSection === "notifications"
                  ? "bg-sky-100 text-sky-600"
                  : ""
              }`}
            >
              <FiBell /> Notifications
            </button>

            {/* Logout */}
            <button
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                window.location.reload();
              }}
              className="flex items-center px-6 gap-2 mt-2 text-gray-700 hover:text-red-600 font-medium border-t-2 border-gray-100 pt-4"
            >
              <FiLogOut /> Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 bg-gray-100 p-6 md:ml-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-6">
          {/* Left side: Hamburger + Profile */}
          <div className="flex items-center gap-4">
            {/* Hamburger (mobile only) */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full 
             bg-gradient-to-br from-pink-400 via-purple-500 to-sky-400 
             shadow-md hover:shadow-lg hover:from-pink-500 hover:to-sky-500 
             transition-all duration-200"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FiMenu className="text-white text-xl" />
            </button>

            {/* Profile */}
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {user?.name || "Admin User"}
              </h2>
              <p className="text-sm text-gray-500">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Conditional Content */}
        <div className="flex-1 overflow-visible pr-1">
          {activeSection === "places" && (
            <PlacesList places={places} onAdd={handleAddPlace} />
          )}

          {activeSection === "cities" && (
            <>
              {!showCityForm ? (
                <CitiesList
                  cities={cities}
                  onAddNew={() => setShowCityForm(true)}
                />
              ) : (
                <AddCityForm
                  onAddCity={(newCity) => {
                    handleAddCity(newCity);
                    setShowCityForm(false);
                  }}
                  onCancel={() => setShowCityForm(false)}
                />
              )}
            </>
          )}

          {activeSection === "notifications" && <NotificationsList />}
          {activeSection === "dashboard" && <DashboardOverview user={user} />}
        </div>
      </main>
    </div>
  );
}
