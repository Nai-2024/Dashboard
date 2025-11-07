
// =========== Google Map========= //
export async function geocodeCity(cityName, country) {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cityName
    )}&count=1&language=en&format=json`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch coordinates");

    const data = await res.json();

    if (data && data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        latitude: result.latitude,
        longitude: result.longitude,
      };
    } else {
      console.warn("No coordinates found for:", cityName, country);
    }
  } catch (err) {
    console.error("Geocoding failed:", err);
  }

  return null;
}
