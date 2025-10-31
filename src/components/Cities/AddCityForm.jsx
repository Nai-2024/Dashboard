import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AddCityForm({ onAddCity, onCancel, editingData }) {
  const [form, setForm] = useState({
    cityName: "",
    country: "",
    description: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
    }
  };

  // Prefill form when editing
  useEffect(() => {
    if (editingData) {
      setForm(editingData);
    }
  }, [editingData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCity(form); // send data to Dashboard
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-gray-200 p-7 pt-0 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold text-center m-4">
          {editingData ? "Edit City" : "Add a New City"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* City Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              City Name *
            </label>
            <input
              type="text"
              name="cityName"
              value={form.cityName}
              onChange={handleChange}
              placeholder="Enter city name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Country *
            </label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Enter country"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description (at least 40 characters)"
              rows="4"
              className="w-full border rounded-lg px-4 py-2 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-black"
              required
            ></textarea>
          </div>

          {/* Upload Image */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Upload Image *
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required={!editingData} // only required when adding
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-md text-sm font-medium"
            >
              {editingData ? "Save Changes" : "Add City"}
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
