// LockWorldAndMinZoom.jsx
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function LockWorldAndMinZoom() {
  const map = useMap();

  useEffect(() => {
    const world = L.latLngBounds([[-85, -180], [85, 180]]);

    // Compute the minimum zoom where the whole world fits INSIDE the container
    const setMinZoomToFitWorld = () => {
      const z = map.getBoundsZoom(world, true); // "true" = fit inside
      map.setMinZoom(z);
    };

    setMinZoomToFitWorld();
    map.setMaxBounds(world.pad(-0.01));  // lock slightly inside edges
    map.fitBounds(world);                 // start with a full-world view

    // Recompute if the container size changes
    map.on("resize", setMinZoomToFitWorld);
    return () => map.off("resize", setMinZoomToFitWorld);
  }, [map]);

  return null;
}
