import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddPlace from "./components/Places/AddPlaceForm";
import AddCity from "./components/Cities/AddCityForm";
import LoginGate from "./components/Authentication/LoginGate";

export default function App() {
  return (
    <LoginGate>
      <Routes>
        {/* Dashboard page */}
        <Route path="/" element={<Dashboard />} />

        {/* Add Place page */}
        <Route path="/add-place" element={<AddPlace />} />
        <Route path="/add-city" element={<AddCity />} />
        <Route path="/notifications" element={<AddCity />} />
      </Routes>
    </LoginGate>
  );
}
