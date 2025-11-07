
import { BASE_URL } from "../../config";

// ============ Fetcher user  =========== //
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