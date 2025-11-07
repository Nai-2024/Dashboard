
import { BASE_URL } from "../../config";

// Fetch categories
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