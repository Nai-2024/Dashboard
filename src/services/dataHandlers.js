

// This is a middle-layer helper that sits between the UI and the API.
// Calls createPlace() from apiService.
import { createPlace } from "./api/placesService";

// Create new place and update UI
export async function handleCreatePlace(placeData, { setLocalPlaces }) {
  try {
    console.log("Creating place with:", placeData);

    // Send data to backend
    const newPlace = await createPlace(placeData);

    console.log("Place created successfully:", newPlace);

    // Update frontend UI
    setLocalPlaces((prev) => [newPlace, ...prev]);

    return newPlace;
  } catch (err) {
    console.error("Failed to create place:", err);
    alert("Failed to create place. Check console for details.");
    throw err;
  }
}

// Safe fetch function- The goal of safeFetch() is to prevent your entire dashboard from breaking if one API call fails (e.g., /api/users returns 404).
// Instead of throwing an error, it returns a safe fallback value (like an empty array []),
// so the rest of your UI (cities, places, etc.) still render correctly.

export async function safeFetch(fn, fallback = []) {
  try {
    return await fn(); // Try running the async function (e.g. fetchUsers)
  } catch (err) {
    console.error("Safe fetch failed:", fn.name, err); // Log the failure for debugging
    return fallback; // Return fallback data (default: empty array)
  }
}
