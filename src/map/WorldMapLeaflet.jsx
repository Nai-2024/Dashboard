import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { geocodeCity } from "../services/api/geocodeService";

// Component to auto-fit map view to all markers
function FitBounds({ cities }) {
  const map = useMap();

  useEffect(() => {
    if (!cities || cities.length === 0) return;

    const bounds = L.latLngBounds(
      cities.map((c) => [c.latitude, c.longitude])
    );
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [cities, map]);

  return null;
}

export default function WorldMapLeaflet({ cities = [] }) {
  const [geoCities, setGeoCities] = useState([]);
  const mapRef = useRef(null);

  // Load cities with coordinates
  useEffect(() => {
    (async () => {
      const withCoords = await Promise.all(
        cities.map(async (city) => {
          if (city.latitude && city.longitude) return city;
          const coords = await geocodeCity(city.cityName || city.name, city.country);
          return coords ? { ...city, ...coords } : city;
        })
      );
      setGeoCities(withCoords.filter((c) => c.latitude && c.longitude));
    })();
  }, [cities]);

  return (
    <div className="relative w-full rounded-lg overflow-hidden bg-white shadow-sm">
  <h3 className="text-lg font-semibold text-gray-800 mb-3 px-4 pt-4">
    City Locations
  </h3>

  <div className="w-full h-[500px] md:h-[600px] lg:h-[650px]">
 <MapContainer
  center={[20, 0]}
  zoom={2}
  minZoom={2}
  maxZoom={8}
  zoomControl={false}
  className="w-full h-full rounded-lg"
  scrollWheelZoom
  // lock world edges vertically + horizontally
  maxBounds={[[-85, -179.9], [85, 179.9]]}
  maxBoundsViscosity={1.0}
  worldCopyJump={false}
  dragging={true}
  doubleClickZoom={false}
  ref={mapRef}
  style={{
    backgroundColor: "#aad3df",
    margin: 0,
    padding: 0,
  }}
>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    noWrap={true}        // stops repetition
    bounds={[[-85, -179.9], [85, 179.9]]} // align tile bounds
  />

      {geoCities.map((city) => (
        <Marker
          key={city._id || city.name}
          position={[city.latitude, city.longitude]}
        >
          <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
            {city.cityName || city.name}
          </Tooltip>
        </Marker>
      ))}

      <FitBounds cities={geoCities} />
      <ZoomControl position="topright" />
    </MapContainer>
  </div>
</div>

  );
}
