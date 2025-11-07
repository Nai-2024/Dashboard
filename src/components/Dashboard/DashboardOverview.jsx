import React, { useState, useEffect } from "react";
import { FiMapPin, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { FaCity } from "react-icons/fa";
import { HiOutlineViewGrid, HiOutlineUser } from "react-icons/hi";
import AddPlaceForm from "../Places/AddPlaceForm";
import AddCityForm from "../Cities/AddCityForm";
import { fetchCities, createCity } from "../../services/api/citiesService";
import { fetchPlaces } from "../../services/api/placesService";
import { fetchUsers } from "../../services/api/userService";
// import fetchCategories from "../../services/api/catagoriesService";
import WorldMapLeaflet from "../../map/WorldMapLeaflet";
import {fetchActivities, clearActivities} from "../../services/activityService";
import { handleCreatePlace, safeFetch } from "../../services/dataHandlers";

export default function DashboardOverview() {
  const [showPlaceForm, setShowPlaceForm] = useState(false);
  const [showCityForm, setShowCityForm] = useState(false);
  const [cityCount, setCityCount] = useState(0);
  const [placeCount, setPlaceCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [userCount, setUserCount] = useState(0);

  // Fetch and update all counts (cities, places, categories)
  const loadCounts = async () => {
    try {
      setLoading(true);
      const [cities, places, users, categories] = await Promise.all([
        safeFetch(fetchCities),
        safeFetch(fetchPlaces),
        safeFetch(fetchUsers),
        // fetchCategories(),
      ]);
      setCitiesData(cities);
      console.log("Cities fetched:", cities);
      setCityCount(cities.length);
      setPlaceCount(places.length);
      // setCategoryCount(categories.length);
      setUserCount(users.length);
      console.log("Users fetched:", users.length);
      console.log("Cities fetched:", cities.length);
      console.log("Places fetched:", places.length);
      // console.log("Catagories fetched:", categories.length);
    } catch (err) {
      console.error("Failed to load counts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Adds new place
  const handleAddPlace = async (data) => {
    try {
      await handleCreatePlace(data);
      await loadCounts();
      loadActivities();
    } catch (err) {
      console.error("Failed to create place:", err);
    } finally {
      setShowPlaceForm(false);
    }
  };

  // Adds new city
  const handleAddCity = async (data) => {
    try {
      await createCity(data);
      await loadCounts();
      loadActivities();
    } catch (err) {
      console.error("Failed to create city:", err);
      alert("Failed to create city. Check console for details.");
    } finally {
      setShowCityForm(false);
    }
  };

  // Clear acvity
  const handleClearActivities = () => {
    if (
      window.confirm("Are you sure you want to clear all recent activities?")
    ) {
      clearActivities(); // Deletes everything from localStorage
      setActivities([]); // Clears from dashboard state too
    }
  };

  // This function’s purpose is to load (read) the existing activities from localStorage (or later, from the backend).
  const loadActivities = () => {
    const logs = fetchActivities();
    setActivities(logs);
  };

  // Load counts + activities on first render
  useEffect(() => {
    const init = async () => {
      await loadCounts();
      loadActivities();
    };
    init();
  }, []);

  // Update activities in real time when other components trigger "activityUpdated"
  useEffect(() => {
    const updateActivities = () => loadActivities();
    window.addEventListener("activityUpdated", updateActivities);
    return () =>
      window.removeEventListener("activityUpdated", updateActivities);
  }, []);

  return (
    <div className="space-y-6">
      {/* Conditionally show form or main dashboard */}
      {showPlaceForm ? (
        <AddPlaceForm
          onAddPlace={handleAddPlace}
          onCancel={() => setShowPlaceForm(false)}
        />
      ) : showCityForm ? (
        <AddCityForm
          onAddCity={handleAddCity}
          onCancel={() => setShowCityForm(false)}
        />
      ) : (
        <>
          {/* Stats Section */}
          <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Cities */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center transition hover:shadow-md">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-sky-100 mb-2">
                <FaCity className="text-sky-600 text-2xl" />
              </div>
              <p className="text-sm text-gray-500">Total Cities</p>
              <h2 className="text-xl font-semibold text-gray-900 mt-1">
                {loading ? "..." : cityCount}
              </h2>
            </div>

            {/* Places */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center transition hover:shadow-md">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 mb-2">
                <FiMapPin className="text-green-600 text-2xl" />
              </div>
              <p className="text-sm text-gray-500">Total Places</p>
              <h2 className="text-xl font-semibold text-gray-900 mt-1">
                {loading ? "..." : placeCount}
              </h2>
            </div>

            {/* Categories */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center transition hover:shadow-md">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 mb-2">
                <HiOutlineViewGrid className="text-indigo-600 text-2xl" />
              </div>
              <p className="text-sm text-gray-500">Categories</p>
              <h2 className="text-xl font-semibold text-gray-900 mt-1">
                {" "}
                {loading ? "..." : categoryCount}
              </h2>
            </div>

            {/* Users */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center transition hover:shadow-md">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-sky-50 mb-2">
                <HiOutlineUser className="text-sky-600 text-2xl" />
              </div>
              <p className="text-sm text-gray-500">Users</p>
              {/*<h2 className="text-xl font-semibold text-gray-900 mt-1">1</h2> */}
              <h2 className="text-xl font-semibold text-gray-900 mt-1">
                {loading ? "..." : userCount}
              </h2>
            </div>
          </section>

          {/* Recent Activity & Quick Controls */}
          <section className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-6">
            {/* Recent Activity Table */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Recent Activity
              </h3>

              <div className="overflow-x-auto rounded-md">
                <table className="min-w-full text-sm text-gray-700 table-fixed">
                  <thead className="bg-gray-100 text-gray-600 text-sm font-semibold">
                    <tr>
                      <th className="px-4 py-3 w-1/4 text-left">Action</th>
                      <th className="px-4 py-3 w-1/4 text-left">Type</th>
                      <th className="px-4 py-3 w-1/4 text-left">Name</th>
                      <th className="px-4 py-3 w-1/4 text-left">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {activities.length === 0 ? (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center py-6 text-gray-400 italic bg-gray-50 rounded-md"
                        >
                          No recent activity yet
                        </td>
                      </tr>
                    ) : (
                      activities.map((a) => (
                        <tr
                          key={a.id}
                          className="border-t border-b transition-all duration-200"
                        >
                          {/* Action */}
                          <td className="px-4 py-3 font-medium text-center sm:text-left">
                            <span
                              className={`inline-flex items-center justify-center gap-2 ${
                                a.action === "Deleted"
                                  ? "text-red-600"
                                  : a.action === "Updated"
                                  ? "text-blue-600"
                                  : "text-green-600"
                              }`}
                            >
                              <span
                                className={`w-2.5 h-2.5 rounded-full ${
                                  a.action === "Deleted"
                                    ? "bg-red-500"
                                    : a.action === "Updated"
                                    ? "bg-blue-500"
                                    : "bg-green-500"
                                }`}
                              ></span>
                              <span className="capitalize">{a.action}</span>
                            </span>
                          </td>

                          {/* Type */}
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 text-xs text-gray-600">
                              {a.type}
                            </span>
                          </td>

                          {/* Name */}
                          <td className="px-4 py-3 font-semibold text-gray-800 truncate">
                            {a.name || "—"}
                          </td>

                          {/* Date */}
                          <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap">
                            <span className="flex flex-col sm:inline">
                              {new Date(a.time).toLocaleDateString(undefined, {
                                dateStyle: "medium",
                              })}
                              <span className="mx-3 text-gray-300 hidden sm:inline">
                                •
                              </span>
                              <span className="sm:inline">
                                {new Date(a.time).toLocaleTimeString(
                                  undefined,
                                  {
                                    timeStyle: "short",
                                  }
                                )}
                              </span>
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Controls */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-stretch justify-start space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                Quick Controls
              </h3>

              {/* Add City Button */}
              <button
                onClick={() => setShowCityForm(true)}
                className="w-full bg-sky-600 text-white px-4 py-2 rounded-full flex items-center gap-4 justify-center hover:bg-sky-700 transition"
              >
                <FiPlusCircle className="text-lg" />
                <span className="font-medium">Add City</span>
              </button>

              {/* Add Place Button */}
              <button
                onClick={() => setShowPlaceForm(true)}
                className="w-full bg-sky-600 text-white px-4 py-2 rounded-full flex items-center gap-2 justify-center hover:bg-sky-700 transition"
              >
                <FiMapPin className="text-lg" />
                <span className="font-medium">Add Place</span>
              </button>

              {/* Clear Data */}
              <button
                onClick={handleClearActivities}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 justify-center hover:bg-red-600 transition"
              >
                <FiTrash2 /> Clear Data
              </button>
            </div>
          </section>

          {/* Map Placeholder */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <WorldMapLeaflet cities={citiesData} />
          </section>
        </>
      )}
    </div>
  );
}
