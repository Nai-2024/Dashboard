import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import AddNotificationForm from "./AddNotificationFrom";
import {
  fetchNotifications,
  createNotification,
  deleteNotification,
} from "../../services/api/notificationsService";
import DesktopViewNotificationsNew from "./DesktopViewNotificationsNew";
import TabletViewNotifications from "./TabletViewNotifications";
import MobileViewNotifications from "./MobileViewNotifications";

export default function NotificationsList() {
  const [notifications, setNotifications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Load all notifications from backend
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

    // Track screen width for responsive rendering
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  
  // Handle adding
   async function handleAddNotification(newNotification) {
    try {
      const res = await createNotification(newNotification);

      setNotifications((prev) => [...prev, res.title || res]);
      setShowForm(false);
    } catch (err) {
      console.error("Failed to add notification", err);
    }
  }

  // Handle delete
  async function handleDeleteNotification(id) {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  }

  // Which view to show?
  const renderResponsiveView = () => {
    if (screenWidth >= 1024) {
      return (
        <DesktopViewNotificationsNew
          notifications={notifications}
          onDelete={handleDeleteNotification}
        />
      );
    }

    if (screenWidth >= 640) {
      return (
        <TabletViewNotifications
          notifications={notifications}
          onDelete={handleDeleteNotification}
        />
      );
    }

    return (
      <MobileViewNotifications
        notifications={notifications}
        onDelete={handleDeleteNotification}
      />
    );
  };

  // Render
  return (
    <div className="w-full">
      {/* Header */}
      <section className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-full text-sm font-medium"
        >
          Add Notification
        </button>
      </section>

      {/* Views */}
      {!showForm ? (
        renderResponsiveView()
      ) : (
        <AddNotificationForm
          onAddNotification={handleAddNotification}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}