"use client";
import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapPopup from "./MapPopup";

// Define default basemap if none provided
const DEFAULT_BASEMAP = "http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";

// Function to get color based on shapeStatus (ripeness)
const getColorByRipeness = (ripeness: string) => {
  switch (ripeness) {
    case "unripe":
      return "yellow";
    case "ripe":
      return "#35CAF0";
    case "fully ripe":
      return "blue";
    default:
      return "red";
  }
};

const GeneralMap = ({
  basemap = DEFAULT_BASEMAP,
  layers = {},
  center,
  geoJsonData,
}) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const MAXZOOM = 22;

  const handleMarkerClick = (coordinates, shapeStatus) => {
    setSelectedMarker({ coordinates, shapeStatus });
  };

  const closePopup = () => {
    setSelectedMarker(null);
  };
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <MapContainer
        center={center}
        zoom={18}
        scrollWheelZoom={true}
        className="h-[100%] h-[100%] z-0"
        maxZoom={MAXZOOM}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={basemap}
          maxZoom={MAXZOOM}
        />
        <TileLayer url={layers.Imagery} maxZoom={MAXZOOM} />

        {/* Render markers for each GeoJSON feature */}
        {geoJsonData.features.map((feature, index) => {
          const { coordinates } = feature.geometry;
          const { shapeStatus } = feature.properties;
          const color = getColorByRipeness(shapeStatus); // Determine color based on ripeness

          return (
            <CircleMarker
              key={index}
              center={[coordinates[1], coordinates[0]]}
              radius={8} // Adjust the size of the circle
              color={color}
              fillColor={color}
              fillOpacity={0.6}
              eventHandlers={{
                click: () => handleMarkerClick(coordinates, shapeStatus),
              }}
            />
          );
        })}
      </MapContainer>

      {/* Mock-up component to show when a marker is clicked */}
      {selectedMarker && (
        <div className="absolute z-9999 top-4 right-4 ">
          <MapPopup
            ripeness_level={selectedMarker.shapeStatus}
            closePopup={closePopup}
          />

          {/* You can customize this with more details or components */}
        </div>
      )}
    </div>
  );
};

export default GeneralMap;
