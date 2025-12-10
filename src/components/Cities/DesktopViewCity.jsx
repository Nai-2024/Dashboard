import React from "react";
import SearchSortBarCity from "./SearchSortBarCity";
import { FiTrash2 } from "react-icons/fi";

export default function DesktopView({
  cities,
  onDelete,
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
}) {
  return (
    <div>
      <SearchSortBarCity
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      <div className="w-full bg-transparent px-4 md:px-4 lg:px-0">
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full border-collapse text-sm table-fixed">
            <thead className="bg-sky-100 text-sky-800 font-semibold tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left w-[12%]">Image</th>
                <th className="px-4 py-3 text-left w-[12%]">City Name</th>
                <th className="px-4 py-3 text-left w-[12%]">Country</th>
                <th className="px-4 py-3 text-left w-[66%]">Description</th>
                <th className="px-4 py-3 text-left w-[10%]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {cities.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No cities added yet
                  </td>
                </tr>
              ) : (
                cities.map((city, idx) => (
                  <tr
                    key={city._id || idx}
                    className="border-b border-gray-400 last:border-b-0 hover:bg-gray-50 transition-all"
                  >
                    {/* Image */}
                    <td className="px-2 py-3 text-left align-top">
                      {city.image ? (
                        <img
                          src={city.image}
                          alt={city.cityName}
                          className="w-[120px] h-[90px] object-cover rounded-md shadow-sm ml-2"
                        />
                      ) : (
                        <div className="w-[80px] h-[80px] bg-gray-200 rounded-md ml-2" />
                      )}
                    </td>

                    {/* City Name */}
                    <td className="px-4 py-3 font-semibold text-gray-800 align-top">
                      <div className="flex-1">{city.cityName}</div>
                    </td>

                    {/* Country Name */}
                    <td className="px-4 py-3 font-semibold text-gray-800 align-top">
                      <div className="flex-1">{city.country}</div>
                    </td>

                    {/* Description */}
                    <td className="px-4 py-3 text-gray-600 align-top break-words">
                      {city.description}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-center pr-4">
                      <div className="flex flex-wrap gap-2 justify-start">
                        <button
                          onClick={() => onDelete(idx)}
                          className="bg-red-500 text-white w-[90px] px-3 py-1.5 rounded-[10px] text-sm font-medium flex items-center justify-center gap-1 hover:bg-red-600 transition"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
