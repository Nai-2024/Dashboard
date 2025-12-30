import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchSortBar({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
}) {
  return (
    <div className="flex flex-col w-full mb-6 gap-3 sm:flex-row sm:items-center sm:gap-4">
      {/* Search Box */}
      <div className="relative flex flex-1">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

        <input
          type="text"
          placeholder="Search places..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Sort Dropdown */}
      <div className="w-full sm:w-auto sm:flex-none">
        <select
          className="w-full sm:w-40 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white 
                     focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="az">Name A → Z</option>
          <option value="za">Name Z → A</option>
          <option value="name">Name</option>
          <option value="city">City</option>
        </select>
      </div>
    </div>
  );
}
