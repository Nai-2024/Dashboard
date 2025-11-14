import { BASE_URL } from "../../config";

// Extract categories from existing places API
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/api/places`);
  if (!res.ok) throw new Error("Failed to fetch places");

  const places = await res.json();

  // Extract unique categories
  const uniqueCategories = [...new Set(places.map((p) => p.category))];

  return uniqueCategories.map((cat) => ({
    name: cat,
  }));
}
