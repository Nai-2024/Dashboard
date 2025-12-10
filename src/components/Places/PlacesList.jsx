import React, { useState, useEffect } from "react";
import AddPlaceForm from "./AddPlaceForm";
import DesktopView from "./DesktopView";
import TabletView from "./TabletView";
import MobileView from "./MobileView";
import { deletePlace, updatePlace } from "../../services/api/placesService";
import { handleCreatePlace } from "../../services/dataHandlers";
import PlaceDetailsModel from "./PlaceDetailsView";
import {placesSearchAndSort} from "../../services/searchSort";
placesSearchAndSort
export default function PlacesList({ places }) {
  const [localPlaces, setLocalPlaces] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [screenWidth, setWidth] = useState(window.innerWidth);
  const [selectedPlace, setSelectedPlace] = useState(null);
  // Search bar and sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const filteredPlaces = placesSearchAndSort(
    localPlaces,
    searchQuery,
    sortOption
  );

  // Track screen size
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setLocalPlaces(places || []);
  }, [places]);

  // ADD (NEW) or UPDATE (EDIT)
  const handleAddPlace = async (place) => {
    try {
      if (editingData) {
        // Editing
        const placeId = editingData._id;
        if (!placeId) {
          alert("Cannot update — missing place ID.");
          return;
        }

        const updated = await updatePlace(placeId, place);

        setLocalPlaces((prev) =>
          prev.map((p) => (p._id === placeId ? updated : p))
        );

        alert("Place updated successfully!");
      } else {
        // Creating new
        await handleCreatePlace(place, { setLocalPlaces });
        alert("Place added successfully!");
      }

      setShowForm(false);
      setEditingData(null);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save changes. Check console for details.");
    }
  };

  // Delete place function
  const handleDeletePlace = async (place) => {
    if (!window.confirm("Are you sure you want to delete this place?")) return;

    try {
      setLoading(true);

      await deletePlace(place._id, place);

      // Remove deleted place from list
      setLocalPlaces((prev) => prev.filter((p) => p._id !== place._id));

      // If modal is open, close it
      setSelectedPlace(null);

      alert("Place deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete place. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Edit handler
  const handleEditPlace = (place) => {
    if (!place._id) {
      alert("Cannot edit — missing ID");
      return;
    }
    setEditingData(place);
    setShowForm(true);
  };

  const renderLayout = () => {
    if (screenWidth >= 1024) {
      return (
        <DesktopView
          places={filteredPlaces}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          setSortOption={setSortOption}
          onEdit={handleEditPlace}
          onDelete={handleDeletePlace}
          setSelectedPlace={setSelectedPlace}
        />
      );
    } else if (screenWidth >= 640 && screenWidth < 1024) {
      return (
        <TabletView
          places={filteredPlaces}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          setSortOption={setSortOption}
          onEdit={handleEditPlace}
          onDelete={handleDeletePlace}
          setSelectedPlace={setSelectedPlace}
        />
      );
    } else {
      return (
        <MobileView
          places={filteredPlaces}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          setSortOption={setSortOption}
          onEdit={handleEditPlace}
          onDelete={handleDeletePlace}
          setSelectedPlace={setSelectedPlace}
        />
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
      {selectedPlace && (
        <PlaceDetailsModel
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onEdit={handleEditPlace}
          onDelete={handleDeletePlace}
        />
      )}
    </div>
  );
}
