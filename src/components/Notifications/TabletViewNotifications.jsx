import React from "react";
import { FiTrash2 } from "react-icons/fi";

export default function TabletViewNotifications({ notifications, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">

      {/* Header */}
      <div className="bg-sky-100 text-sky-800 font-semibold tracking-wide 
                      grid grid-cols-[1fr_90px] items-center 
                      px-4 py-3 border-b border-sky-200">
        <span>Notification Info</span>
        <span className="justify-self-start">Actions</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-300">
        {notifications.map((note) => (
          <div
            key={note._id}
            className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-all"
          >
            {/* Image */}
            {note.profile && (
              <img
                src={note.profile}
                alt="notification"
                className="w-[120px] h-[120px] object-cover rounded-lg flex-shrink-0"
              />
            )}

            {/* Notification Info */}
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900">
                {note.title}
              </h3>

              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {note.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center justify-center min-w-[90px]">
              <button
                onClick={() => onDelete(note._id)}
                className="flex items-center justify-center gap-1
                           bg-red-500 hover:bg-red-600 
                           text-white w-[90px] py-1.5 
                           rounded-full text-sm font-medium transition"
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
