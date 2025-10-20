import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import AddNotificationForm from "./AddNotificationFrom";

export default function NotificationsList() {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notificationsData");
    return saved ? JSON.parse(saved) : [];
  });

  const [showForm, setShowForm] = useState(false);

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem("notificationsData", JSON.stringify(notifications));
  }, [notifications]);

  // Handle delete
  const handleDeleteNotification = (index) => {
    const updated = notifications.filter((_, i) => i !== index);
    setNotifications(updated);
  };

  // Handle add
  const handleAddNotification = (newNotification) => {
    setNotifications((prev) => [...prev, newNotification]);
    setShowForm(false);
  };

  return (
    <div>
      {!showForm ? (
        <>
          {/* Header */}
          <section className="flex items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Notifications
            </h1>
            <button
              className="ml-auto bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-full text-sm font-medium"
              onClick={() => setShowForm(true)}
            >
              Add Notification
            </button>
          </section>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-sky-100 text-sky-800 font-semibold tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left w-16">Image</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="pl-7 py-3 text-left w-32">Action</th>
                </tr>
              </thead>

              <tbody>
                {notifications.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-6 text-center text-gray-500 italic"
                    >
                      No notifications available
                    </td>
                  </tr>
                ) : (
                  notifications.map((note, idx) => (
                    <tr
                      key={idx}
                      className="border-b last:border-b-0 hover:bg-gray-50 transition-all duration-300"
                    >
                      {/* Image */}
                      <td className="px-4 py-3">
                        <img
                          src={note.image}
                          alt="notification"
                          className="w-10 h-10 rounded-md object-cover border border-gray-200"
                        />
                      </td>

                      {/* Title */}
                      <td className="px-4 py-3 font-semibold text-gray-800">
                        {note.title}
                      </td>

                      {/* Description */}
                      <td className="px-4 py-3 text-gray-700">
                        {note.description}
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3 text-gray-600">
                        {note.category}
                      </td>

                      {/* Action */}
                      <td className="pl-7 py-3 text-left">
                        <button
                          onClick={() => handleDeleteNotification(idx)}
                          className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-1 hover:bg-red-600 transition"
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
        </>
      ) : (
        <AddNotificationForm
          onAddNotification={handleAddNotification}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
