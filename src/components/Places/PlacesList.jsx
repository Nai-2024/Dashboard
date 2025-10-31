

import React, { useState, useEffect } from "react";
import AddPlaceForm from "./AddPlaceForm";
import PlaceView from "./DesktopView";
import TabletView from "./TabletView";
import MobileView from "./MobileView";
import { createPlace, deletePlace, updatePlace } from "../../services/apiService";

export default function PlacesList({ places }) {
  const [localPlaces, setLocalPlaces] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  // Track screen size
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (Array.isArray(places) && places.length > 0) {
      setLocalPlaces(places);
    }
  }, [places]);

  const handleAddPlace = async (place) => {
    try {
      setLoading(true);
      if (editingData) {
        const updatedPlace = await updatePlace(editingData._id, place);
        setLocalPlaces((prev) =>
          prev.map((p, i) => (i === editingData.index ? updatedPlace : p))
        );
      } else {
        const newPlace = await createPlace(place);
        setLocalPlaces((prev) => [...prev, newPlace]);
      }
      setShowForm(false);
      setEditingData(null);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save place. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlace = async (index, id) => {
    if (!window.confirm("Are you sure you want to delete this place?")) return;
    try {
      setLoading(true);
      await deletePlace(id, localPlaces[index]);
      setLocalPlaces((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete place. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const renderLayout = () => {
    if (width >= 1024) {
      return (
        <PlaceView places={localPlaces} onEdit={setEditingData} onDelete={handleDeletePlace} />
      );
    } else if (width >= 640 && width < 1024) {
      return (
        <TabletView places={localPlaces} onEdit={setEditingData} onDelete={handleDeletePlace} />
      );
    } else {
      return (
        <MobileView places={localPlaces} onEdit={setEditingData} onDelete={handleDeletePlace} />
      );
    }
  };

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
          {renderLayout()}
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
