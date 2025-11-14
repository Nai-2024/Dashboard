import React, { useState, useEffect } from "react";
import AddCityForm from "./AddCityForm";
import { createCity, deleteCity } from "../../services/api/citiesService";
import DesktopView from "./DesktopViewCity";
import TabletView from "./TabletViewCity";
import MobileView from "./MobileViewCity";

export default function CitiesList({ cities }) {
  const [localCities, setLocalCities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Sync props → local state
  useEffect(() => {
    if (Array.isArray(cities)) {
      setLocalCities(cities);
    }
  }, [cities]);

  // Handle window resize for responsive rendering
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add city 
  const handleAddCity = async (city) => {
    try {
      const newCity = await createCity(city);
      setLocalCities((prev) => [...prev, newCity]);

      setShowForm(false);
    } catch (error) {
      console.error("Error saving city:", error);
      alert("Failed to save city. Please check your connection.");
    }
  };

  // Delete city
  const handleDeleteCity = async (index) => {
    const city = localCities[index];
    if (!window.confirm(`Are you sure you want to delete "${city.cityName}"?`))
      return;

    try {
      await deleteCity(city._id, city);
      setLocalCities((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting city:", error);
      alert("Failed to delete city. Please try again.");
    }
  };

  // Choose layout based on screen width
  const renderResponsiveView = () => {
    if (screenWidth >= 1024)
      return <DesktopView cities={localCities} onDelete={handleDeleteCity} />;

    if (screenWidth >= 640)
      return <TabletView cities={localCities} onDelete={handleDeleteCity} />;

    return <MobileView cities={localCities} onDelete={handleDeleteCity} />;
  };

  return (
    <div>
      {/* Header */}
      <section className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cities</h1>
        <button
          onClick={() => {
            setShowForm(true);
          }}
          className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-md text-sm font-medium"
        >
          Add City
        </button>
      </section>

      {/* Content */}
      {!showForm ? (
        renderResponsiveView()
      ) : (
        <AddCityForm
          onAddCity={handleAddCity}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
