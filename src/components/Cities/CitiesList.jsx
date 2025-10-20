import React, { useState, useEffect } from "react";
import AddCityForm from "./AddCityForm";
import { FiTrash2, FiEdit } from "react-icons/fi";

export default function CitiesList({ cities }) {
  // ✅ Local state for cities
  const [localCities, setLocalCities] = useState(() => {
    // Load from localStorage on first render
    const saved = localStorage.getItem("citiesData");
    return saved ? JSON.parse(saved) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // ✅ Sync local state with parent if passed (optional)
  useEffect(() => {
    if (Array.isArray(cities) && cities.length > 0) {
      setLocalCities(cities);
    }
  }, [cities]);

  // ✅ Save to localStorage whenever cities change
  useEffect(() => {
    localStorage.setItem("citiesData", JSON.stringify(localCities));
  }, [localCities]);

  const handleAddCity = (city) => {
    if (editingData !== null) {
      const updated = localCities.map((c, idx) =>
        idx === editingData.index ? city : c
      );
      setLocalCities(updated);
    } else {
      setLocalCities([...localCities, city]);
    }
    setShowForm(false);
    setEditingData(null);
  };

  const handleDeleteCity = (index) => {
    const updated = localCities.filter((_, i) => i !== index);
    setLocalCities(updated);
  };

  return (
    <div>
      {!showForm ? (
        <>
          <section className="flex items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Cities</h1>
            <button
              className="ml-auto bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-md text-sm font-medium"
              onClick={() => setShowForm(true)}
            >
              Add City
            </button>
          </section>

          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-sky-100 text-sky-800 font-semibold tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">City Name</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {localCities.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No cities added yet
                    </td>
                  </tr>
                ) : (
                  localCities.map((city, idx) => (
                    <tr
                      key={idx}
                      className="border-b last:border-b-0 group hover:bg-gray-50 transition-all duration-300"
                    >
                      {/* Image with hover zoom + smooth layout shift */}
                      <td className="px-4 py-3">
                        {city.image && (
                          <img
                            src={city.image} // works for base64 or URL
                            alt={city.cityName}
                            className="w-16 h-16 object-cover rounded-md transition-all duration-500 group-hover:w-48 group-hover:h-48"
                          />
                        )}
                      </td>

                      <td className="px-4 py-3 font-medium text-gray-800">
                        {city.cityName}
                      </td>

                      {/* Description column will shrink gracefully when image grows */}
                      <td className="px-4 py-3 text-gray-700 transition-all duration-300 group-hover:w-1/2">
                        {city.description}
                      </td>

                      <td className="px-4 py-3 flex justify-between gap-6">
                        <button
                          onClick={() => {
                            setEditingData({ ...city, index: idx });
                            setShowForm(true);
                          }}
                          className="bg-sky-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-sky-600 transition"
                        >
                          <FiEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCity(idx)}
                          className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-red-600 transition"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <AddCityForm
          onAddCity={handleAddCity}
          onCancel={() => setShowForm(false)}
          editingData={editingData}
        />
      )}
    </div>
  );
}
