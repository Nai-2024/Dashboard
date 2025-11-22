import React from "react";
import { FiTrash2 } from "react-icons/fi";
import SearchSortBarCity from "./SearchSortBarCity";
export default function MobileViewCity({
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

      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-sky-100 text-sky-800 font-semibold tracking-wide grid grid-cols-[1fr_90px] items-center px-4 py-3 border-b border-sky-200">
          <span>City Info</span>
        </div>

        {/* City Cards */}
        <div className="divide-y divide-gray-400">
          {cities.map((city, idx) => (
            <div
              key={idx}
              className="p-4 flex flex-col gap-3 hover:bg-gray-50 transition-all"
            >
              {/* Image */}
              <img
                src={city.image}
                alt={city.cityName}
                className="w-full h-[180px] object-cover rounded-md"
              />

              {/* City Info */}
              <div>
                {/* Name + Country */}
                <div className="grid grid-cols-2 gap-x-3">
                  <span className="pb-1 text-base font-semibold text-gray-900">
                    {city.cityName}
                  </span>

                  <span className="pb-1 text-base font-semibold text-gray-900">
                    {city.country}
                  </span>
                </div>
                {/* Desctiption */}
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  {city.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onDelete(idx)}
                  className="flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
