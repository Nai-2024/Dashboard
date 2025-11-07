// General data layer for backend communication
// Handles activity logs using localStorage for now
// Later you'll replace these with real backend API calls
// Handles API logic between UI and backend

const STORAGE_KEY = "recentActivities";

// Fetch all activities
export function fetchActivities() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Add a new activity (e.g., Added City)
export function logActivity(action, type, name) {
  const activities = fetchActivities();
  const newActivity = {
    id: Date.now(),
    action,
    type,
    name,
    time: new Date().toISOString(),
  };

  // Add new on top, keep only last 10
  const updated = [newActivity, ...activities].slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  // Notify dashboard to refresh immediately
  window.dispatchEvent(new Event("activityUpdated"));
}

// Clear all activities
export function clearActivities() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("activityUpdated"));
}
