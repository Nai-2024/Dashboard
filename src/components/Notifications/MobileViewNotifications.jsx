import React from "react";
import { FiTrash2 } from "react-icons/fi";

export default function MobileViewNotifications({ notifications, onDelete }) {
  return (
    <div className="space-y-4">
      {notifications.map((note) => (
        <div
          key={note._id}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3"
        >
          {/* IMAGE */}
          {note.profile ? (
            <img
              src={note.profile}
              alt="notification"
              className="w-full h-48 object-cover rounded-md"
            />
          ) : (
            <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
              No image
            </div>
          )}

          {/* TITLE */}
          <h2 className="text-lg font-semibold text-gray-900">
            {note.title}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-700 text-sm">{note.description}</p>

          {/* DELETE BUTTON */}
          <button
            onClick={() => onDelete(note._id)}
            className="bg-red-500 text-white w-full py-2 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-red-600 transition"
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      ))}
    </div>
  );
}
