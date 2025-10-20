import React, { useState, useEffect } from "react";
import AddPlaceForm from "./AddPlaceForm";
import { FiTrash2, FiEdit } from "react-icons/fi";

export default function PlacesList({ places }) {
  // ✅ Initialize from localStorage (runs only once)
  const [localPlaces, setLocalPlaces] = useState(() => {
    const saved = localStorage.getItem("placesData");
    return saved ? JSON.parse(saved) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // ✅ Sync parent-provided places if they exist (optional)
  useEffect(() => {
    if (Array.isArray(places) && places.length > 0) {
      setLocalPlaces(places);
    }
  }, [places]);

  // ✅ Save to localStorage every time data changes
  useEffect(() => {
    localStorage.setItem("placesData", JSON.stringify(localPlaces));
  }, [localPlaces]);

  // ✅ Add or update a place
  const handleAddPlace = (place) => {
    if (editingData !== null) {
      const updated = localPlaces.map((p, idx) =>
        idx === editingData.index ? place : p
      );
      setLocalPlaces(updated);
    } else {
      setLocalPlaces([...localPlaces, place]);
    }
    setShowForm(false);
    setEditingData(null);
  };

  // ✅ Delete a place
  const handleDeletePlace = (index) => {
    const updated = localPlaces.filter((_, i) => i !== index);
    setLocalPlaces(updated);
  };

  return (
    <div>
      {!showForm ? (
        <>
          <section className="flex items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Places</h1>
            <button
              className="ml-auto bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-md text-sm font-medium"
              onClick={() => setShowForm(true)}
            >
              Add Place
            </button>
          </section>

          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-sky-100 text-sky-800 font-semibold tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">City</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {localPlaces.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No places added yet
                    </td>
                  </tr>
                ) : (
                  localPlaces.map((place, idx) => (
                    <tr
                      key={idx}
                      className="border-b last:border-b-0 hover:bg-gray-50 transition-all"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {place.name}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{place.city}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {place.description}
                      </td>
                      <td className="px-4 py-3 flex justify-between gap-6">
                        <button
                          onClick={() => {
                            setEditingData({ ...place, index: idx });
                            setShowForm(true);
                          }}
                          className="bg-sky-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-sky-600 transition"
>
                          <FiEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDeletePlace(idx)}
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
        <AddPlaceForm
          onAddPlace={handleAddPlace}
          onCancel={() => setShowForm(false)}
          editingData={editingData}
        />
      )}
    </div>
  );
}
