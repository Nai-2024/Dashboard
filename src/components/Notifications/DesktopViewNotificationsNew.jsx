import React from "react";
import { FiTrash2 } from "react-icons/fi";

export default function DesktopViewNotificationsNew({ notifications, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="w-full border-collapse text-sm table-auto">
        <thead className="bg-sky-100 text-sky-800 font-semibold tracking-wide">
          <tr>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Test Column</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {notifications.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                No notifications available
              </td>
            </tr>
          ) : (
            notifications.map((note) => (
              <tr
                key={note._id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-all"
              >
                {/* IMAGE */}
                <td className="px-4 py-3 align-top">
                  {note.profile ? (
                    <img
                      src={note.profile}
                      alt="notification"
                      className="w-48 h-28 rounded-md object-cover"
                    />
                  ) : (
                    "No image"
                  )}
                </td>

                {/* TITLE */}
                <td className="px-4 py-3 align-top font-semibold text-gray-800 whitespace-nowrap">
                  {note.title}
                </td>

                {/* TITLE */}
                <td className="px-4 py-3 align-top font-semibold text-gray-800 whitespace-nowrap">
                  {note.title}
                </td>

                {/* DESCRIPTION */}
                <td className="px-4 py-3 align-top text-gray-700 leading-snug">
                  {note.description}
                </td>

                {/* ACTION */}
                <td className="px-4 py-3 align-top">
                  <button
                    onClick={() => onDelete(note._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
