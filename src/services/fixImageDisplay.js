
// Fixing image render issue for notificaiton page

import { BASE_URL } from "../config";

export const fixImageUrl = (url) => {
  if (!url) return "";

  // Already full URL → return as is
  if (url.startsWith("http")) return url;

  // Otherwise build full URL using the SAME BASE_URL
  return `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};
