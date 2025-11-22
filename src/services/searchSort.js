// Places search & sort
export function placesSearchAndSort(places, searchQuery, sortOption) {
  let result = [...places];

  if (searchQuery.trim() !== "") {
    const querry = searchQuery.toLowerCase();

    result = result.filter(
      (item) =>
        item.name?.toLowerCase().includes(querry) ||
        item.city?.toLowerCase().includes(querry) ||
        item.category?.toLowerCase().includes(querry)
    );
  }

  switch (sortOption) {
    case "az":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "za":
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "city":
      result.sort((a, b) => (a.city || "").localeCompare(b.city || ""));
      break;
    case "category":
      result.sort((a, b) => (a.category || "").localeCompare(b.category || ""));
      break;
  }

  return result;
}

// Cities search & sort
export function citiesSearchAndSort(cities, searchQuery, sortOption) {
  let result = [...cities];

  // --- SEARCH ---
  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();

    result = result.filter(
      (item) =>
        item.cityName?.toLowerCase().includes(query) ||
        item.country?.toLowerCase().includes(query)
    );
  }

  // --- SORT ---
  switch (sortOption) {
    case "az":
      result.sort((a, b) => a.cityName.localeCompare(b.cityName));
      break;

    case "za":
      result.sort((a, b) => b.cityName.localeCompare(a.cityName));
      break;

    case "city":
      result.sort((a, b) => a.cityName.localeCompare(b.cityName));
      break;

    case "country":
      result.sort((a, b) =>
        (a.country || "").localeCompare(b.country || "")
      );
      break;

    default:
      break;
  }

  return result;
}
