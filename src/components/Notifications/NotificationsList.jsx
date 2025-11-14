import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import AddNotificationForm from "./AddNotificationFrom";
import {
  fetchNotifications,
  createNotification,
  deleteNotification,
} from "../../services/api/notificationsService";

export default function NotificationsList() {
  const [notifications, setNotifications] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Load from backend
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (err) {
        console.error("Failed to load notifications", err);
      }
    }
    loadData();
  }, []);

  // FIXED: Delete handler
  async function handleDeleteNotification(id) {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  }

  // FIXED: Add handler
  async function handleAddNotification(newNotification) {
    try {
      const res = await createNotification({
        title: newNotification.title,
        description: newNotification.description,
      });

      setNotifications((prev) => [...prev, res.title]); // backend returns `{title: object}`
      setShowForm(false);
    } catch (err) {
      console.error("Failed to add notification", err);
    }
  }

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
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="pl-7 py-3 text-left w-32">Action</th>
                </tr>
              </thead>

              <tbody>
                {notifications.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-4 py-6 text-center text-gray-500 italic"
                    >
                      No notifications available
                    </td>
                  </tr>
                ) : (
                  notifications.map((note) => (
                    <tr
                      key={note._id}
                      className="border-b last:border-b-0 hover:bg-gray-50 transition-all duration-300"
                    >
                      <td className="px-4 py-3 font-semibold text-gray-800">
                        {note.title}
                      </td>

                      <td className="px-4 py-3 text-gray-700">
                        {note.description}
                      </td>

                      <td className="pl-7 py-3 text-left">
                        <button
                          onClick={() => handleDeleteNotification(note._id)}
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
