import React from "react";
import { FiTrash2 } from "react-icons/fi";

export default function MobileViewNotifications({ notifications, onDelete }) {
  return (
    <div>
      {/* Header */}
      <div className="bg-sky-100 text-sky-800 font-semibold tracking-wide px-4 py-3 border-b border-sky-200">
        <span>Notification Info</span>
      </div>

      {/* Notification Cards */}
      <div className="divide-y divide-gray-300 bg-white">
        {notifications.map((note) => (
          <div
            key={note._id}
            className="p-4 flex flex-col gap-3 hover:bg-gray-50 transition-all"
          >
            {/* IMAGE */}
            {note.profile ? (
              <img
                src={note.profile}
                alt="notification"
                className="w-full h-[180px] object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-[150px] bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                No image
              </div>
            )}

            {/* TITLE */}
            <h2 className="text-base font-semibold text-gray-900">
              {note.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {note.description}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => onDelete(note._id)}
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
