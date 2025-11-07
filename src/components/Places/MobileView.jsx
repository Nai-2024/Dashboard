import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function MobilePlaceView({ places, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-sky-100 text-sky-800 font-semibold tracking-wide grid grid-cols-[1fr_90px] items-center px-4 py-3 border-b border-sky-200">
        <span>Place Info</span>
        <span className="justify-self-start">Actions</span>
      </div>

      {/* Place Cards */}
      <div className="divide-y divide-gray-400">
        {places.length === 0 ? (
          <p className="text-center text-gray-500 py-6">No places added yet</p>
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

              {/* Info Row (Equal Distribution) */}
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
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onEdit({ ...place, index: idx })}
                  className="flex-1 flex items-center justify-center gap-1 bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition"
                >
                  <FiEdit /> Edit
                </button>
                <button
                  onClick={() => onDelete(idx, place._id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
