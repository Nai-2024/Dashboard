import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import SearchSortBar from "./SearchSortBar";
export default function MobilePlaceView({
  places,
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  setSelectedPlace,
}) {
  return (
    <div>
      <SearchSortBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-sky-100 text-sky-800 font-semibold tracking-wide grid grid-cols-[1fr_90px] items-center px-4 py-3 border-b border-sky-200">
          <span>Place Info</span>
        </div>

        {/* Place Cards */}
        <div className="divide-y divide-gray-400">
          {places.length === 0 ? (
            <p className="text-center text-gray-500 py-6">
              No places added yet
            </p>
          ) : (
            places.map((place, idx) => (
              <div
                key={place._id || idx}
                className="p-4 flex flex-col gap-3 hover:bg-gray-50 transition-all"
              >
                {/* Image */}
                {place.profile || place.image ? (
                  <img
                    src={place.profile || place.image}
                    alt={place.name}
                    className="w-full h-[180px] object-cover rounded-md"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-[180px] bg-gray-200 rounded-md" />
                )}

                {/* Info Row */}
                <div className="grid grid-cols-3 items-center text-center gap-2 mt-3">
                  {/* Place Name */}
                  <h3 className="text-left mt-2 text-lg font-semibold text-gray-900">
                    {place.name}
                  </h3>

                  {/* City */}
                  {place.city ? (
                    <span className="mx-auto px-2 py-1 bg-sky-100 text-balckorder border-sky-200 rounded-full text-[12px] font-medium w-[90px] truncate">
                      {place.city}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">—</span>
                  )}
                  {/* Category */}
                  {place.category ? (
                    <span className="ml-auto px-3 py-1 bg-pink-100 text-black border border-pink-200 rounded-full text-[12px] font-medium w-[100px] text-center truncate">
                      {place.category}
                    </span>
                  ) : (
                    <span className="ml-auto text-gray-400 text-xs">—</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-2 leading-relaxed text-justify">
                  {place.description || "No description available."}
                </p>

                {/* Actions */}
                <div className="flex w-full mt-3">
                  <button
                    onClick={() => setSelectedPlace(place)}
                    className="w-full bg-blue-500 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition flex items-center justify-center gap-2"
                  >
                    <span>View</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
