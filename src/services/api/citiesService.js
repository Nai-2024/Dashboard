// Core of backend communication

import { BASE_URL } from "../../config";
import { logActivity } from "../../services/activityService";

// Fetch all cities
export async function fetchCities() {
  const response = await fetch(`${BASE_URL}/api/cities`);
  if (!response.ok) throw new Error("Failed to fetch cities");
  const data = await response.json();

  return data.map((city) => ({
    _id: city._id,
    cityName: city.name || city.city,
    country: city.country || "Canada",
    description: city.description || `${city.city}, ${city.country}`,
    image: city.profile,
  }));
}

// Create a new city
export async function createCity(cityData) {
  const formData = new FormData();
  formData.append("name", cityData.cityName); // backend expects "name"
  formData.append("city", cityData.cityName); // also include "city"
  formData.append("country", cityData.country);
  formData.append("description", cityData.description);

  // if uploading actual file in the form of image
  if (cityData.image instanceof File) {
    formData.append("profile", cityData.image);
  }

  const response = await fetch(`${BASE_URL}/api/cities`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to add city");
  const data = await response.json();
  logActivity("Added", "City", cityData.cityName || cityData.name);
  return data;
}

// Update existing city with out having proper api. 
// Note: It should be replaced once we we get the api
export async function updateCity(id, cityData) {
  console.log("No update endpoint found. Recreating city instead…");

  // Step 1 — Delete old city if it exists
  try {
    await deleteCity(id, cityData);
    console.log("Old city deleted:", id);
  } catch (err) {
    console.warn("City delete failed (may not exist):", err.message);
  }

  // Step 2 — Create new city with updated data
  const newCity = await createCity(cityData);

  // Log as "Updated" instead of "Added"
  logActivity("Updated", "City", cityData.cityName || cityData.name);

  console.log("City re-created:", newCity);

  // Refresh dashboard instantly
  window.dispatchEvent(new Event("activityUpdated"));

  return newCity;
}

// This is the alternate for updating city that is applicable after we have correct api for updating city
{/*
export async function updateCity(id, cityData) {
  const formData = new FormData();
  formData.append("name", cityData.cityName);
  formData.append("city", cityData.cityName);
  formData.append("country", cityData.country);
  formData.append("description", cityData.description);

  if (cityData.image instanceof File) {
    formData.append("profile", cityData.image);
  }

  const response = await fetch(`${BASE_URL}/api/cities/${id}`, {
    method: "PUT", // or PATCH, depending on your backend
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to update city");
  const data = await response.json();

  logActivity("Updated", "City", cityData.cityName || cityData.name);
  window.dispatchEvent(new Event("activityUpdated"));

  return data;
}

*/}

// Delete a city
export async function deleteCity(id, cityData = {}) {
  const res = await fetch(`${BASE_URL}/api/cities/${id}`, { method: "DELETE" });

  if (res.status === 404) {
    console.warn(`City not found (ID: ${id})`);
    return null;
  }

  if (!res.ok) {
    const text = await res.text();
    console.error("Delete failed:", res.status, text);
    throw new Error("Failed to delete city");
  }

  const data = await res.json();

  // Determine the name intelligently
  const name =
    cityData?.cityName ||
    cityData?.name ||
    data?.name ||
    data?.city ||
    id ||
    "Unknown";

  logActivity("Deleted", "City", name);

  // Instantly refresh dashboard activities (no manual reload)
  window.dispatchEvent(new Event("activityUpdated"));

  return data;
}
