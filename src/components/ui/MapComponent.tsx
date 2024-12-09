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

      <div>
        <div className="absolute z-9999 top-24 left-4 ">
          <div className="flex flex-col p-2 bg-white rounded-lg border-2 border-teal-500 gap-4 p-4 text-teal-700 font-bold">
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 rounded-full bg-yellow-300"></span>
              <span className="ml-2">Unripe</span>
            </div>
            <div className="bg-teal-500 w-full h-0.5 rounded-full"></div>
            <div>
              <span className="inline-block w-4 h-4 rounded-full bg-blue-400"></span>
              <span className="ml-2">Ready to be harvested</span>
            </div>
            <div className="bg-teal-500 w-full h-0.5 rounded-full"></div>

            <div>
              <span className="inline-block w-4 h-4 rounded-full bg-red-500"></span>
              <span className="ml-2">Not Checked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralMap;
