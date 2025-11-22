import React, { useEffect, useState } from "react";
import { fetchAllCountries } from "../../services/api/countriesListService";

export default function AddCityForm({ onAddCity, onCancel }) {
  // This stores the user’s input (form data).
  // form holds all values: city name, country, description, and image.
  // setForm updates those values whenever the user types or uploads an image.
  const [form, setForm] = useState({
    cityName: "",
    country: "",
    description: "",
    image: null,
  });

  // This keeps track of error messages when the user types something wrong.
  // Example: if city name is invalid → errors.cityName = "Invalid name".
  const [errors, setErrors] = useState({});

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    async function loadCountries() {
      const result = await fetchAllCountries();
      setCountries(result);
    }
    loadCountries();
  }, []);

  // Load cities when the country changes
  useEffect(() => {
    if (form.country) {
      const selected = countries.find((c) => c.country === form.country);
      setCities(selected ? selected.cities : []);
    }
  }, [form.country, countries]);

  // Image handler - This function takes the image file that the user picks and saves it into your form state (form.image),
  // so it can later be sent to your backend or Firestore when the user clicks Add City.
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
    }
  };

  // Updates your form every time the user types something.
  // It automatically formats the city name with a capital letter and keeps the form state in sync with what’s shown on the screen.
  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    // Capitalize first letter for cityName and country
    if (name === "cityName" || name === "country") {
      newValue = value.charAt(0).toUpperCase() + value.slice(1);
    }

    setForm({ ...form, [name]: newValue });
  };

  // Regex patterns
  const cityNamePattern = /^[\p{L}\s-]+$/u;
  const countryNamePattern = /^[\p{L}\s]+$/u;

  const validate = () => {
    const newErrors = {};

    // --- City Name validation ---
    if (!cityNamePattern.test(form.cityName)) {
      newErrors.cityName =
        "City name should contain only letters, spaces, or hyphens.";
    }

    // --- Country ---
    if (!countryNamePattern.test(form.country)) {
      newErrors.country = "Country should contain only letters and spaces.";
    }

    // --- Description ---
    if (form.description.trim().length < 40) {
      newErrors.description =
        "Description must be at least 40 characters long.";
    }

    // --- Image ---
    if (!form.image) {
      newErrors.image = "Please upload an image.";
    } else if (form.image) {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!validTypes.includes(form.image.type)) {
        newErrors.image = "Only JPG, PNG, or WEBP formats are allowed.";
      } else if (form.image.size > maxSize) {
        newErrors.image = "Image must be smaller than 2MB.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // When the user clicks the submit button:
  const handleSubmit = (e) => {
    e.preventDefault(); // Don’t reload the page.
    if (validate()) {
      // Check all the inputs (with validate()).
      onAddCity(form); // If everything looks good, send the form data to the parent component (with onAddCity(form)).
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md max-w-xl bg-gray-200 p-7 pt-0 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold text-center m-4">
          Add a New City
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Country */}
          <div>
            <label className="block font-medium text-gray-700 mb-1 label-required">
              Country
            </label>

            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.country} value={c.country}>
                  {c.country}
                </option>
              ))}
            </select>

            {errors.country && (
              <p className="text-red-600 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          {/* City Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1 label-required">
              City Name
            </label>

            <select
              name="cityName"
              value={form.cityName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
              disabled={!form.country} // disable until a country is selected
            >
              <option value="">Select City</option>

              {/* Only show cities for the selected country */}
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {errors.cityName && (
              <p className="text-red-600 text-sm mt-1">{errors.cityName}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-1 label-required">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description (min 40 characters)"
              rows="8"
              className="w-full border rounded-lg px-4 py-2 min-h-[300px] focus:outline-none focus:ring-2 focus:ring-black"
              required
            ></textarea>
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-1 label-required">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
              required
            />
            {errors.image && (
              <p className="text-red-600 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-md text-sm font-medium"
            >
              Add City
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2.5 rounded-md text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
