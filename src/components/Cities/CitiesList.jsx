import React, { useState, useEffect } from "react";
import AddCityForm from "./AddCityForm";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { createCity, updateCity, deleteCity } from "../../services/apiService";

export default function CitiesList({ cities }) {
  const [localCities, setLocalCities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // image size
  const IMAGE_CLASS =
    "w-[100px] h-[80px] lg:w-[100px] lg:h-[80px] rounded-md mx-auto";

  // Sync data
  useEffect(() => {
    if (Array.isArray(cities) && cities.length > 0) {
      setLocalCities(cities);
    }
  }, [cities]);

  const handleAddCity = async (city) => {
    try {
      if (editingData) {
        const updatedCity = await updateCity(editingData._id, city);
        setLocalCities((prev) =>
          prev.map((c, idx) => (idx === editingData.index ? updatedCity : c))
        );
      } else {
        const newCity = await createCity(city);
        setLocalCities((prev) => [...prev, newCity]);
      }

      setShowForm(false);
      setEditingData(null);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save city.");
    }
  };

  const handleDeleteCity = async (index) => {
    const city = localCities[index];
    if (!window.confirm(`Are you sure you want to delete ${city.cityName}?`))
      return;

    try {
      await deleteCity(city._id, city);
      setLocalCities((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete city.");
    }
  };

  return (
    <div>
      {!showForm ? (
        <>
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

          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <div className="max-h-[70vh] overflow-y-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-sky-100 text-sky-800 font-semibold tracking-wide sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left">Image</th>
                    {/* Hide this on tablet and below */}
                    <th className="hidden lg:table-cell px-4 py-3 text-left">
                      City Name
                    </th>
                    <th className="px-4 py-3 text-left">Description</th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Actions
                    </th>
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
                        key={city._id || idx}
                        className="border-b last:border-b-0 hover:bg-gray-50 transition-all"
                      >
                        {/* Image + city name under it for mobile + tablet */}
                        <td className="px-4 py-3 text-center align-top">
                          {city.image ? (
                            <img
                              src={city.image}
                              alt={city.cityName}
                              className={`${IMAGE_CLASS} object-cover shadow-sm`}
                            />
                          ) : (
                            <div className={`${IMAGE_CLASS} bg-gray-200`} />
                          )}

                          {/* City name below image */}
                          <div className="mt-2 lg:hidden font-semibold text-gray-800 text-sm">
                            {city.cityName}
                          </div>
                        </td>

                        {/* City name column (desktop only) */}
                        <td className="hidden lg:table-cell px-4 py-3 font-semibold text-gray-800 align-top">
                          {city.cityName}
                        </td>

                        <td className="px-4 py-3 text-gray-600 max-w-[500px] whitespace-normal break-words align-top">
                          {city.description}
                        </td>

                        <td className="px-4 py-3 align-top">
                          <div className="flex flex-col lg:flex-row justify-start items-start gap-2">
                            <button
                              onClick={() => {
                                setEditingData({
                                  ...city,
                                  index: idx,
                                  _id: city._id,
                                });
                                setShowForm(true);
                              }}
                              className="bg-sky-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center justify-center gap-1 hover:bg-sky-600 transition w-[96px]"
                            >
                              <FiEdit /> Edit
                            </button>

                            <button
                              onClick={() => handleDeleteCity(idx)}
                              className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center justify-center gap-1 hover:bg-red-600 transition w-[96px]"
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
