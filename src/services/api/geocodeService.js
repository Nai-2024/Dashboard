// Purpose: Get latitude and longitude for a given city + country name
// This version handles cases like "United States" vs "United States of America"
// by performing a flexible, two-way country name match.

export async function geocodeCity(cityName, country) {
  try {
    // Build the API URL with encoded city name
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cityName
    )}&count=10&language=en&format=json`;

    // Fetch data from Open-Meteo geocoding API
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch coordinates");

    // Convert API response into usable JSON format
    const data = await response.json();
    // If results are available, we’ll try to find the one that matches the country
    if (data?.results?.length > 0) {
      // Try to find a city result whose country matches our input. Bi-directional country name match for flexibility
      const matchedResult = data.results.find(
        (resultItem) =>
          resultItem.country &&
          (resultItem.country.toLowerCase().includes(country?.toLowerCase()) ||
            country?.toLowerCase().includes(resultItem.country.toLowerCase()))
      );

      // If no exact match, just take the first result as a fallback
      const finalResult = matchedResult || data.results[0];

      // Return only what we need for the map
      return {
        latitude: finalResult.latitude,
        longitude: finalResult.longitude,
        country: finalResult.country,
      };
    } else {
      // If API doesn’t return any results, log a warning
      console.warn("No coordinates found for:", cityName, country);
    }
  } catch (error) {
    // If anything goes wrong (network issue, API error, etc.)
    console.error("Geocoding failed:", error);
  }
  // Return null if coordinates cannot be determined
  return null;
}
