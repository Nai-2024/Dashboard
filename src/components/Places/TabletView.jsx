import React from "react";

export default function TabletView({ places, onEdit, onDelete }) {
  // one class so both badges stay identical
  const BADGE_BASE =
    "inline-flex items-center justify-center h-6 px-3 rounded-full text-xs font-medium whitespace-nowrap " +
    "w-[96px]"; 
  return (
   <div className="bg-white rounded-lg shadow-md overflow-x-auto">
  <div className="max-h-[70vh] overflow-y-auto">
    <table className="w-full border-collapse text-sm">
      <thead className="bg-sky-100 text-sky-800 font-semibold tracking-wide sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-left w-[35%]">Place Info</th>
            <th className="py-3 text-left w-[55%]">Description</th>
            <th className="px-4 py-3 text-left w-[10%]">Action</th>
          </tr>
        </thead>

        <tbody>
          {places.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                No places added yet
              </td>
            </tr>
          ) : (
            places.map((place, idx) => (
              <tr
                key={place._id || idx}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-all"
              >
                {/* -------- PLACE INFO -------- */}
                <td className="px-4 py-4 align-top">
                  <div className="flex items-start gap-4">
                    {/* Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      {place.profile ? (
                        <img
                          src={place.profile}
                          alt={place.name}
                          className="w-full h-full object-cover rounded-md shadow-sm"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-md" />
                      )}
                    </div>

                    {/* Right side: name + badges stacked vertically */}
                    <div className="flex flex-col gap-2">
                      {/* Name */}
                      <h3 className="font-semibold text-gray-900 text-base ">
                        {place.name}
                      </h3>
                      {place.city && (
                        <span
                          className="border border-sky-300 text-xs font-medium px-3 py-1 rounded-full bg-sky-50/40 backdrop-blur-sm inline-flex items-center justify-center w-[100px] truncate"
                          title={place.city}
                        >
                          {place.city}
                        </span>
                      )}

                      {/* Category badge (same width as City) */}
                      {place.category && (
                        <span
                          className="border border-pink-300 text-xs font-medium px-3 py-1 rounded-full bg-pink-50/40 backdrop-blur-sm inline-flex items-center justify-center w-[100px] truncate"
                          title={place.category}
                        >
                          {place.category}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* -------- DESCRIPTION -------- */}
                <td className="py-4 text-gray-600 align-top">
                  {place.description}
                </td>

                {/* -------- ACTIONS -------- */}
                <td className="px-4 py-4 align-top">
                  <div className="flex flex-col justify-start items-start gap-2">
                    <button
                      onClick={() => onEdit({ ...place, index: idx })}
                      className="bg-sky-500 text-white px-4 py-1.5 rounded-[10px] text-sm font-medium text-center hover:bg-sky-600 transition w-[80px]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(idx, place._id)}
                      className="bg-red-500 text-white px-4 py-1.5 rounded-[10px] text-sm font-medium text-center hover:bg-red-600 transition w-[80px]"
                    >
                      Delete
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
  );
}
