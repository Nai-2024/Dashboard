import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function MobileViewCity({ cities, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-sky-100 text-sky-800 font-semibold tracking-wide grid grid-cols-[1fr_90px] items-center px-4 py-3 border-b border-sky-200">
        <span>City Info</span>
        <span className="justify-self-start">Actions</span>
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
              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                {city.cityName}
              </h3>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                {city.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onEdit(city, idx)}
                className="flex-1 flex items-center justify-center gap-1 bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition"
              >
                <FiEdit /> Edit
              </button>
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
  );
}
