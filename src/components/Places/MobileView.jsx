import React from "react";

export default function MobileView({ places, onEdit, onDelete }) {
  return (
    <div className="space-y-[1px]">
      {places.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No places added yet</p>
      ) : (
        <>
          {/* Header */}
          <div className="grid grid-cols-2 bg-sky-100 text-sky-800 font-semibold text-sm rounded-t-md">
            <div className="px-4 py-2 text-left">Info</div>
            <div className="px-14 py-2 text-right">Action</div>
          </div>

          {/* Cards */}
          {places.map((place, idx) => (
            <div
              key={place._id || idx}
              className={`bg-white border border-gray-100 shadow-sm p-4 flex flex-col gap-3 transition-colors duration-200 
              hover:bg-gray-50 transition-all
                ${idx === 0 ? "rounded-t-none" : ""} 
                ${idx === places.length - 1 ? "rounded-b-md" : "rounded-none"}`}
            >
              <div className="flex justify-between items-start gap-3 w-full">
                {/* Left: Image + Info */}
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-900 text-base leading-tight">
                      {place.name}
                    </h3>

                    {/* City */}
                    {place.city && (
                      <p className="border border-sky-300 text-xs font-medium px-3 py-1 rounded-full bg-sky-50/40 backdrop-blur-sm w-[100px] text-center">
                        {place.city}
                      </p>
                    )}

                    {/* Category */}
                    {place.category && (
                      <p className="border border-pink-300 text-xs font-medium px-3 py-1 rounded-full bg-pink-50/40 backdrop-blur-sm w-[100px] text-center">
                        {place.category}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col justify-start items-end gap-2 flex-shrink-0">
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
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm leading-snug">
                {place.description || "No description available"}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
