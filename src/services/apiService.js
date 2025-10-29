import { BASE_URL } from "../config";

// 🟢 Fetch all cities
export async function fetchCities() {
  const res = await fetch(`${BASE_URL}/api/cities`);
  if (!res.ok) throw new Error("Failed to fetch cities");
  const data = await res.json();

  return data.map((city) => ({
    _id: city._id,
    cityName: city.name || city.city,
    description: city.description || `${city.city}, ${city.country}`,
    image: city.profile, 
  }));
}

// 🟡 Create a new city
export async function createCity(cityData) {
  const formData = new FormData();
  formData.append("name", cityData.cityName); // backend expects "name"
  formData.append("city", cityData.cityName); // also include "city"
  formData.append("country", cityData.country);
  formData.append("description", cityData.description);

  // if uploading actual file
  if (cityData.image instanceof File) {
    formData.append("profile", cityData.image);
  }

  const res = await fetch(`${BASE_URL}/api/cities`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to add city");
  const data = await res.json();
  logActivity("Added", "City", cityData.cityName || cityData.name);
  return data;
}

// 🟡 Update existing city
export async function updateCity(id, cityData) {
  const formData = new FormData();
  formData.append("name", cityData.cityName);
  formData.append("city", cityData.cityName);
  formData.append("country", cityData.country);
  formData.append("description", cityData.description);

  if (cityData.image instanceof File) {
    formData.append("profile", cityData.image);
  }

  const res = await fetch(`${BASE_URL}/api/cities/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to update city");
  const data = await res.json();
  logActivity("Updated", "City", cityData.cityName);
  return data;
}

// 🟡 Delete a city
export async function deleteCity(id, cityDataData) {
  const res = await fetch(`${BASE_URL}/api/places/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete city");

  const data = await res.json();
  logActivity("Deleted", "City", cityDataData.cityName || cityDataData.name);
  return data;
}

// =========== Places ================ //

// Fetch all places
export async function fetchPlaces() {
  const res = await fetch(`${BASE_URL}/api/places`);
  if (!res.ok) throw new Error("Failed to fetch places");
  return await res.json();
}

// Create a new place (with image upload)
export async function createPlace(placeData) {
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

  // ✅ Fix: convert "wifi, pool" -> ["wifi", "pool"]
  if (typeof placeData.features === "string") {
    const featuresArray = placeData.features
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f);
    formData.append("features", JSON.stringify(featuresArray));
  } else {
    formData.append("features", JSON.stringify(placeData.features || []));
  }

  // profile image (backend expects "profile")
  if (placeData.profileImage instanceof File) {
    formData.append("profile", placeData.profileImage);
  }

  // multiple pictures
  if (placeData.pictures && placeData.pictures.length > 0) {
    Array.from(placeData.pictures).forEach((pic) =>
      formData.append("pictures", pic)
    );
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

// Update existing place (with image upload support)
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

  // Convert comma-separated string into JSON array if necessary
  if (typeof placeData.features === "string") {
    const featuresArray = placeData.features
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f);
    formData.append("features", JSON.stringify(featuresArray));
  } else {
    formData.append("features", JSON.stringify(placeData.features || []));
  }

  // If user selected a new profile image
  if (placeData.profileImage instanceof File) {
    formData.append("profile", placeData.profileImage);
  }

  // Multiple pictures (optional)
  if (placeData.pictures && placeData.pictures.length > 0) {
    Array.from(placeData.pictures).forEach((pic) =>
      formData.append("pictures", pic)
    );
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
  logActivity("Updated", "Place", placeData.placeName);
  return data;
}


// Delete a place
export async function deletePlace(id, placeData) {
  const res = await fetch(`${BASE_URL}/api/places/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete place");

  const data = await res.json();
  logActivity("Deleted", "Place", placeData.placeName || placeData.name);
  return data;
}


// ========= Categories ============ //
// Fetch all categories 
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/api/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();

  return data.map((cat) => ({
    _id: cat._id,
    name: cat.name,
    description: cat.description || "",
  }));
}

// ============ Acivity log  =========== //
function logActivity(action, type, name) {
  const activities = JSON.parse(
    localStorage.getItem("recentActivities") || "[]"
  );
  const newActivity = {
    id: Date.now(),
    action,
    type,
    name,
    time: new Date().toISOString(),
  };
  localStorage.setItem(
    "recentActivities",
    JSON.stringify([newActivity, ...activities].slice(0, 10))
  );
}

// ============ Fetching users  =========== //
export async function fetchUsers() {
  try {
    const response = await fetch(`${BASE_URL}/api/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data; // expected array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}