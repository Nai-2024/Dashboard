
import React from "react";

export default function DesktopView({ places, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      {/* Scrollable section for table body */}
      <div className="max-h-[70vh] overflow-y-auto">
        <table className="w-full border-collapse text-sm">
          {/* Sticky table header */}
          <thead className="bg-sky-100 text-sky-800 font-semibold tracking-wide sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">City</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left w-[120px]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {places.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No places added yet
                </td>
              </tr>
            ) : (
              places.map((place, idx) => (
                <tr
                  key={place._id || idx}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-all"
                >
                  <td className="px-4 py-3">
                    {place.profile ? (
                      <img
                        src={place.profile}
                        alt={place.name}
                        className="w-24 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">{place.name}</td>
                  <td className="px-4 py-3 text-gray-700">{place.city}</td>
                  <td className="px-4 py-3 text-gray-700">{place.category}</td>
                  <td className="px-4 py-3 text-gray-600">{place.description}</td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-col justify-start items-start gap-2">
                      <button
                        onClick={() => onEdit({ ...place, index: idx })}
                        className="bg-sky-500 text-white px-4 py-1.5 rounded-[10px] text-sm font-medium text-center hover:bg-sky-600 transition w-[90px]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(idx, place._id)}
                        className="bg-red-500 text-white px-4 py-1.5 rounded-[10px] text-sm font-medium text-center hover:bg-red-600 transition w-[90px]"
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
