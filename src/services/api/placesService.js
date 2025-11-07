
import { BASE_URL } from "../../config";
import { logActivity } from "../activityService";

// Fetch all places
export async function fetchPlaces() {
  const res = await fetch(`${BASE_URL}/api/places`);
  if (!res.ok) throw new Error("Failed to fetch places");
  return await res.json();
}

// This function just talks to the server. Sends an HTTP POST request to /api/places.
export async function createPlace(placeData) {
  const formData = new FormData();

  formData.append("name", placeData.name);
  formData.append("category", placeData.category);
  formData.append("address", placeData.address);
  formData.append("city", placeData.city);
  formData.append("state", placeData.state);
  formData.append("country", placeData.country);
  formData.append("postalCode", placeData.postalCode);
  //formData.append("features", placeData.features);
  formData.append("certification", placeData.certification);
  formData.append("description", placeData.description);
  formData.append("phoneNumber", placeData.phoneNumber);
  formData.append("email", placeData.email);
  formData.append("website", placeData.website || "");
  formData.append("reviewLink", placeData.reviewLink || "");

  // Handle both single and multiple features
  if (typeof placeData.features === "string") {
    const featuresArray = placeData.features
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f);
    formData.append("features", JSON.stringify(featuresArray));
  } else {
    formData.append("features", JSON.stringify(placeData.features || []));
  }

  // profile image
  if (placeData.profileImage instanceof File) {
    formData.append("profile", placeData.profileImage);
  }

  const res = await fetch(`${BASE_URL}/api/places`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Server response:", errorText);
    throw new Error("Failed to add place");
  }

  const data = await res.json();
  logActivity("Added", "Place", placeData.placeName || placeData.name);
  return data;
}

// Update existing place
export async function updatePlace(id, placeData) {
  console.log("Updating place with ID:", id);

  const formData = new FormData();

  formData.append("name", placeData.name);
  formData.append("category", placeData.category);
  formData.append("city", placeData.city);
  formData.append("state", placeData.state);
  formData.append("country", placeData.country);
  formData.append("postalCode", placeData.postalCode);
  formData.append("address", placeData.address);
  formData.append("certification", placeData.certification);
  formData.append("description", placeData.description);
  formData.append("phoneNumber", placeData.phoneNumber);
  formData.append("email", placeData.email);
  formData.append("website", placeData.website || "");
  formData.append("reviewLink", placeData.reviewLink || "");

  // Handle both single and multiple features
  if (typeof placeData.features === "string") {
    const featuresArray = placeData.features
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f);
    formData.append("features", JSON.stringify(featuresArray));
  } else {
    formData.append("features", JSON.stringify(placeData.features || []));
  }
  //image update
  if (placeData.profileImage instanceof File) {
    formData.append("profile", placeData.profileImage);
  }

  const res = await fetch(`${BASE_URL}/api/places/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Update failed:", res.status, errorText);
    throw new Error("Failed to update place");
  }

  const data = await res.json();

  logActivity("Updated", "Place", placeData.name || "Unknown");

  // Instantly tell dashboard to refresh
  window.dispatchEvent(new Event("activityUpdated"));

  return data;
}

// Delete a place
export async function deletePlace(id, placeData) {
  const res = await fetch(`${BASE_URL}/api/places/${id}`, {
    method: "DELETE",
  });

  if (res.status === 404) {
    console.warn(`Place not found (ID: ${id})`);
    return null;
  }

  if (!res.ok) {
    const text = await res.text();
    console.error("Delete failed:", res.status, text);
    throw new Error("Failed to delete place");
  }

  const data = await res.json();

  // Log with correct name
  logActivity("Deleted", "Place", placeData.name || "Unknown");

  // Instantly tell Dashboard to refresh
  window.dispatchEvent(new Event("activityUpdated"));

  return data;
}