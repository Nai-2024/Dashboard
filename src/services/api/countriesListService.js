


// src/services/api/countriesService.js

export async function fetchAllCountries() {
  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch country list");
    }

    const data = await response.json();

    return data.data; // returns [{ country: "Canada", cities: ["Toronto", "Ottawa", ...] }, ... ]
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
}
