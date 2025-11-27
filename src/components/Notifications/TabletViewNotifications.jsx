// TabletViewNotifications.jsx
import React from "react";
import { FiTrash2 } from "react-icons/fi";

export default function TabletViewNotifications({ notifications, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden divide-y">
      {notifications.map((note) => (
        <div key={note._id} className="p-4 flex gap-4 items-start">
          {/* Image */}
          {note.profile && (
            <img
              src={note.profile}
              alt="notification"
              className="w-[120px] h-[120px] rounded-lg object-cover"
            />
          )}

          {/* Info */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{note.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{note.description}</p>
          </div>

          {/* Actions */}
          <button
            onClick={() => onDelete(note._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-full text-sm flex items-center gap-1 hover:bg-red-600"
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      ))}
    </div>
  );
}
