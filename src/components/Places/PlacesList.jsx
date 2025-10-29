import React, { useState, useEffect } from "react";
import AddPlaceForm from "./AddPlaceForm";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { createPlace, deletePlace,updatePlace } from "../../services/apiService";

export default function PlacesList({ places }) {
  const [localPlaces, setLocalPlaces] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Sync data
  useEffect(() => {
    if (Array.isArray(places) && places.length > 0) {
      setLocalPlaces(places);
    }
  }, [places]);

  // ✅ Add or "update" (create-only safe version)
 const handleAddPlace = async (place) => {
  try {
    setLoading(true);

    if (editingData) {
      // 🟢 Create a new record to simulate an update
      const newPlace = await updatePlace(place);

      // 🟢 Replace the old one in local state
      setLocalPlaces((prev) =>
        prev.map((p, i) => (i === editingData.index ? newPlace : p))
      );
    } else {
      // 🟢 Normal add
      const newPlace = await createPlace(place);
      setLocalPlaces((prev) => [...prev, newPlace]);
    }

    // 🟢 Reset
    setShowForm(false);
    setEditingData(null);
  } catch (err) {
    console.error("Save failed:", err);
    alert("Failed to save place. Please check console for details.");
  } finally {
    setLoading(false);
  }
};


  // ✅ Delete (optional)
  const handleDeletePlace = async (index, id) => {
    if (!window.confirm("Are you sure you want to delete this place?")) return;

    try {
      setLoading(true);
      await deletePlace(id); // keep trying backend delete
      setLocalPlaces((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.warn("Delete failed on backend. Removing locally only.");
      // 🟢 Remove from local state even if backend 404s
      setLocalPlaces((prev) => prev.filter((_, i) => i !== index));
    } finally {
      setLoading(false);
    }
  };

  // ✅ Render UI
  return (
    <div>
      {!showForm ? (
        <>
          <section className="flex items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Places</h1>
            <button
              className="ml-auto bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-md text-sm font-medium"
              onClick={() => {
                setEditingData(null);
                setShowForm(true);
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Add Place"}
            </button>
          </section>

          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-sky-100 text-sky-800 font-semibold tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">City</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {localPlaces.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No places added yet
                    </td>
                  </tr>
                ) : (
                  localPlaces.map((place, idx) => (
                    <tr
                      key={place._id || idx}
                      className="border-b last:border-b-0 hover:bg-gray-50 transition-all"
                    >
                      <td className="px-4 py-3">
                        {place.profile ? (
                          <img
                            src={place.profile}
                            alt={place.name}
                            className="w-24 h-16 object-cover rounded-md"
                          />
                        ) : (
                          <span className="text-gray-400 italic">No image</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800 max-w-[180px] break-words">
                        {place.name}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{place.city}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {place.category}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {place.description}
                      </td>
                      <td className="px-4 py-7 flex flex-col sm:flex-row justify-center items-center gap-3">
                        <button
                          onClick={() => {
                            setEditingData({ ...place, index: idx });
                            setShowForm(true);
                          }}
                          className="bg-sky-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-sky-600 transition w-full sm:w-auto justify-center"
                        >
                          <FiEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDeletePlace(idx, place._id)}
                          className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-red-600 transition w-full sm:w-auto justify-center"
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
