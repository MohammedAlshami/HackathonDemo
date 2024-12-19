import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Mock GeoJSON data for zones
const mockZonesData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Zone A",
        markers: [
          { lat: 40.7128, lng: -74.006, title: "Marker A1" },
          { lat: 40.7138, lng: -74.007, title: "Marker A2" },
        ],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-74.0, 40.7],
            [-73.9, 40.7],
            [-73.9, 40.8],
            [-74.0, 40.8],
            [-74.0, 40.7],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Zone B",
        markers: [
          { lat: 40.7228, lng: -73.996, title: "Marker B1" },
          { lat: 40.7238, lng: -73.997, title: "Marker B2" },
        ],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-73.9, 40.7],
            [-73.8, 40.7],
            [-73.8, 40.8],
            [-73.9, 40.8],
            [-73.9, 40.7],
          ],
        ],
      },
    },
  ],
};

// Custom Marker Icon
const markerIcon = new L    .Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// ZoomControl Component to handle zooming to zones
const ZoomControl = ({ zone, onZoomComplete }) => {
  const map = useMap();

  useEffect(() => {
    if (zone) {
      const bounds = L.geoJSON(zone).getBounds();
      map.fitBounds(bounds, {
        padding: [50, 50],
        duration: 1,
        animate: true,
      });

      // Optional callback when zoom is complete
      if (onZoomComplete) {
        onZoomComplete();
      }
    }
  }, [zone, map]);

  return null;
};

export default function ZonesMap() {
  const [selectedZone, setSelectedZone] = useState(null);
  const [hoveredZone, setHoveredZone] = useState(null);

  // Style for GeoJSON zones
  const zoneStyle = (feature) => {
    const baseStyle = {
      fillColor: "#3388ff",
      color: "#3388ff",
      weight: 2,
      opacity: 0.7,
      fillOpacity: 0.2,
    };

    if (hoveredZone === feature) {
      return {
        ...baseStyle,
        fillOpacity: 0.5,
        weight: 3,
      };
    }

    return baseStyle;
  };

  // Event handlers for zone interactions
  const handleZoneMouseOver = (feature) => {
    setHoveredZone(feature);
  };

  const handleZoneMouseOut = () => {
    setHoveredZone(null);
  };

  const handleZoneClick = (feature) => {
    setSelectedZone(feature);
  };

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <MapContainer
        center={[40.7, -74.0]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Render GeoJSON Zones */}
        <GeoJSON
          data={mockZonesData}
          style={zoneStyle}
          onEachFeature={(feature, layer) => {
            layer.on({
              mouseover: () => handleZoneMouseOver(feature),
              mouseout: handleZoneMouseOut,
              click: () => handleZoneClick(feature),
            });

            // Add Zone Name Label
            const label = L.tooltip({
              permanent: true,
              direction: "top",
              className: "zone-label",
            }).setContent(feature.properties.name);

            layer.bindTooltip(label);
          }}
        />

        {/* Zoom Control when a zone is selected */}
        {selectedZone && (
          <ZoomControl
            zone={selectedZone}
            onZoomComplete={() => {
              // Optional: You can add additional logic here when zoom is complete
            }}
          />
        )}

        {/* Markers for selected zone */}
        {selectedZone &&
          selectedZone.properties.markers.map((marker, index) => (
            <Marker
              key={index}
              position={[marker.lat, marker.lng]}
              icon={markerIcon}
            >
              <Popup>{marker.title}</Popup>
            </Marker>
          ))}
      </MapContainer>

      <style jsx global>{`
        .zone-label {
          background: none;
          border: none;
          color: #333;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
