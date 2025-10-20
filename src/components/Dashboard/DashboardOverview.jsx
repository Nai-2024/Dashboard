import React from "react";
import { FiMapPin, FiPlusCircle, FiTrash2, FiSettings } from "react-icons/fi";
import { FaCity } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cities */}
        <Link
          to="/cities"
          className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center transition hover:shadow-md"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-sky-100 mb-2">
            <FaCity className="text-sky-600 text-2xl" />
          </div>
          <p className="text-sm text-gray-500">Total Cities</p>
          <h2 className="text-xl font-semibold text-gray-900 mt-1">58</h2>
        </Link>

        {/* Places */}
        <Link
          to="/places"
          className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center transition hover:shadow-md"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 mb-2">
            <FiMapPin className="text-green-600 text-2xl" />
          </div>
          <p className="text-sm text-gray-500">Total Places</p>
          <h2 className="text-xl font-semibold text-gray-900 mt-1">1,250</h2>
        </Link>

        {/* Categories */}
        <Link
          to="/"
          className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center transition hover:shadow-md"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 mb-2">
            <HiOutlineViewGrid className="text-indigo-600 text-2xl" />
          </div>
          <p className="text-sm text-gray-500">Categories</p>
          <h2 className="text-xl font-semibold text-gray-900 mt-1">15</h2>
        </Link>

        {/* Users */}
        <Link
          to="/"
          className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center transition hover:shadow-md"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-sky-50 mb-2">
            <HiOutlineUser className="text-sky-600 text-2xl" />
          </div>
          <p className="text-sm text-gray-500">Users</p>
          <h2 className="text-xl font-semibold text-gray-900 mt-1">1,000</h2>
        </Link>
      </section>

      {/* Recent Activity */}
      {/* Recent Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-6">
        {/* Left: Recent Activity Table */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Recent Activity
          </h3>
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-left text-gray-600\">
              <tr>
                <th className="px-4 py-2">Action</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 text-green-600 font-medium">Added</td>
                <td className="px-4 py-2">Place</td>
                <td className="px-4 py-2 font-semibold">Eiffel Tower</td>
                <td className="px-4 py-2 text-gray-500">2 hours ago</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 text-blue-600 font-medium">Edited</td>
                <td className="px-4 py-2">City</td>
                <td className="px-4 py-2 font-semibold">Paris</td>
                <td className="px-4 py-2 text-gray-500">3 hours ago</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 text-red-600 font-medium">Deleted</td>
                <td className="px-4 py-2">Place</td>
                <td className="px-4 py-2 font-semibold">Old Souk</td>
                <td className="px-4 py-2 text-gray-500">5 hours ago</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 text-green-600 font-medium">Added</td>
                <td className="px-4 py-2">City</td>
                <td className="px-4 py-2 font-semibold">Rome</td>
                <td className="px-4 py-2 text-gray-500">1 day ago</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right: Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-stretch justify-start space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
            Quick Controls
          </h3>

          {/* Add City Button */}
          <Link to="/add-city" className="w-full">
            <button className="w-full bg-sky-600 text-white px-4 py-2 rounded-full flex items-center gap-2 justify-center hover:bg-sky-700 cursor-pointer transition">
              <FiPlusCircle /> Add City
            </button>
          </Link>

          {/* Add Place Button */}
          <Link to="/add-place" className="w-full">
            <button className="w-full bg-sky-600 text-white px-4 py-2 rounded-full flex items-center gap-2 justify-center hover:bg-sky-700 cursor-pointer transition">
              <FiMapPin /> Add Place
            </button>
          </Link>

          {/* Clear Data Button */}
          <button
            onClick={() => {
              // Replace with your real clear data logic
              console.log("Data cleared!");
            }}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 justify-center hover:bg-red-600 cursor-pointer transition"
          >
            <FiTrash2 /> Clear Data
          </button>
        </div>
      </section>

      {/* City Locations Map */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          City Locations
        </h3>
        <div className="w-full h-60 bg-gray-100 flex items-center justify-center rounded-md">
          <p className="text-gray-400">🗺️ Map Placeholder</p>
        </div>
      </section>
    </div>
  );
}
