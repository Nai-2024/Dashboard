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
