
import { BASE_URL } from "../../config";

// Fetch all notifications
export async function fetchNotifications() {
  const res = await fetch(`${BASE_URL}/api/titles`);
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}

// Add new notification
export async function createNotification(data) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);

  if (data.profile instanceof File) {
    formData.append("profile", data.profile);   // FIXED
  }

  const res = await fetch(`${BASE_URL}/api/titles`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to create notification");
  return res.json();
}



// Delete a notification
export async function deleteNotification(id) {
  const res = await fetch(`${BASE_URL}/api/titles/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete notification");
  return res.json();
}
