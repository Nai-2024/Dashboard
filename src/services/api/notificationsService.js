
import { BASE_URL } from "../../config";

// Fetch all notifications
export async function fetchNotifications() {
  const res = await fetch(`${BASE_URL}/notifications`);
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}

// Add new notification
export async function createNotification(data) {
  const res = await fetch(`${BASE_URL}/notifications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create notification");
  return res.json();
}

// Delete a notification
export async function deleteNotification(id) {
  const res = await fetch(`${BASE_URL}/notifications/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete notification");
  return res.json();
}
