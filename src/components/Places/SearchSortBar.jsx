import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchSortBar({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
}) {
  return (
<div className="flex w-full items-center mb-6 gap-4 relative">

  {/* Search Box */}
  <div className="relative flex w-full">
    <MagnifyingGlassIcon
      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
    />

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
  <div>
    <select
      className="px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="">Sort by</option>
      <option value="az">Name A → Z</option>
      <option value="za">Name Z → A</option>
      <option value="name">Name</option>
      <option value="city">City</option>
      <option value="category">Category</option>
    </select>
  </div>

</div>


  );
}
