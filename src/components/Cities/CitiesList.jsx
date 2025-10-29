import React, { useState, useEffect } from "react";
import AddCityForm from "./AddCityForm";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { createCity, updateCity, deleteCity } from "../../services/apiService";

export default function CitiesList({ cities }) {
  const [localCities, setLocalCities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // Sync data from Dashboard
  useEffect(() => {
    if (Array.isArray(cities) && cities.length > 0) {
      setLocalCities(cities);
    }
  }, [cities]);

  // Add or update a city
  const handleAddCity = async (city) => {
  if (editingData !== null) {
    try {
      // Delete the old city first
      await deleteCity(editingData._id);

      // Create a new one with updated data
      const newCity = await createCity(city);

      // Replace it locally
      const updated = localCities.map((c, idx) =>
        idx === editingData.index ? newCity : c
      );
      setLocalCities(updated);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update city. Check console for details.");
    }
  } else {
    try {
      const newCity = await createCity(city);
      setLocalCities([...localCities, newCity]);
    } catch (err) {
      console.error("Create failed:", err);
      alert("Failed to create city. Check console for details.");
    }
  }

  setShowForm(false);
  setEditingData(null);
};


  // Delete a city
  const handleDeleteCity = async (index) => {
    const city = localCities[index];
    if (!window.confirm(`Are you sure you want to delete ${city.cityName}?`))
      return;

    try {
      await deleteCity(city._id);
      setLocalCities((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete city. Check console for details.");
    }
  };

  return (
    <div>
      {!showForm ? (
        <>
          {/* Header */}
          <section className="flex items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Cities</h1>
            <button
              className="ml-auto bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-md text-sm font-medium"
              onClick={() => {
                setEditingData(null);
                setShowForm(true);
              }}
            >
              Add City
            </button>
          </section>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-sky-100 text-sky-800 font-semibold tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">City Name</th>
                  {/*  <th className="px-4 py-3 text-left">State / Province</th> */}
                  <th className="px-4 py-3 text-left">Description</th>
                 <th className="px-4 py-3 text-left w-[180px]">Actions</th>
                </tr>
              </thead>

              <tbody>
                {localCities.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No cities added yet
                    </td>
                  </tr>
                ) : (
                  localCities.map((city, idx) => (
                    <tr
                      key={city._id || idx}
                      className="border-b last:border-b-0 hover:bg-gray-50 transition-all"
                    >
                      {/* Image */}
                      <td className="px-4 py-3">
                        {city.image ? (
                          <img
                            src={city.image}
                            alt={city.cityName}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        ) : (
                          <span className="text-gray-400 italic">No image</span>
                        )}
                      </td>

                      {/* City Name */}
                      <td className="px-4 py-3 font-semibold text-gray-800">
                        {city.cityName}
                      </td>

                      {/* State / Province */}
                      {/*} <td className="px-4 py-3 text-gray-700">
                        {city.state || city.province || "—"}
                      </td> */}

                      {/* Description */}
                      <td className="px-4 py-3 text-gray-600 max-w-[500px] whitespace-normal break-words">
                        {city.description}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right w-[180px] align-middle">
                        <div className="flex flex-col md:flex-row justify-end items-center sm:gap-4 gap-2">
                          <button
                            onClick={() => {
                              setEditingData({ ...city, index: idx });
                              
                              setShowForm(true);
                            }}
                            className="bg-sky-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center gap-1 hover:bg-sky-600 transition w-full sm:w-auto"
                          >
                            <FiEdit /> Edit
                          </button>

                          <button
                            onClick={() => handleDeleteCity(idx)}
                            className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center justify-center gap-1 hover:bg-sky-600 transition w-full sm:w-auto"
                          >
                            <FiTrash2 /> Delete
                          </button>
                        </div>
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
