import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function TabletView({ cities, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
      {/* Header (simulating thead style) */}
      <div className="bg-sky-100 text-sky-800 font-semibold tracking-wide grid grid-cols-[1fr_90px] items-center px-4 py-3 border-b border-sky-200">
        <span>City Info</span>
        <span className="justify-self-start">Actions</span>
      </div>

      {/* City Cards */}
      <div className="divide-y divide-gray-400">
        {cities.map((city, idx) => (
          <div
            key={idx}
            className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-all"
          >
            {/* Image */}
            <img
              src={city.image}
              alt={city.cityName}
              className="w-[120px] h-[120px] object-cover rounded-lg flex-shrink-0"
            />

            {/* City Info */}
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900">
                {city.cityName}
              </h3>

              <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-4">
                {city.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 ml-2 items-end min-w-[90px]">
              <button
                onClick={() => onEdit(city, idx)}
                className="flex items-center justify-center gap-1 bg-sky-500 hover:bg-sky-600 text-white w-[90px] py-1.5 rounded-md text-sm font-medium transition"
              >
                <FiEdit /> Edit
              </button>
              <button
                onClick={() => onDelete(idx)}
                className="flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white w-[90px] py-1.5 rounded-md text-sm font-medium transition"
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
