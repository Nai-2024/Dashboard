import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap({ cities = [] }) {
  console.log("Cities received by WorldMap:", cities);

  return (
      <div className="w-full h-[400px] md:h-[450px] lg:h-[500px]">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">City Locations</h3>

      <ComposableMap
        projectionConfig={{ scale: 200 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#E5E7EB"
                stroke="#D1D5DB"
              />
            ))
          }
        </Geographies>

        {cities.map(
          (city) =>
            city.latitude &&
            city.longitude && (
              <Marker key={city.id} coordinates={[city.longitude, city.latitude]}>
                <circle r={5} fill="#0284C7" stroke="#fff" strokeWidth={1} />
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{
                    fontFamily: "system-ui",
                    fill: "#334155",
                    fontSize: "10px",
                  }}
                >
                  {city.name}
                </text>
              </Marker>
            )
        )}
      </ComposableMap>
    </div>
  );
}
