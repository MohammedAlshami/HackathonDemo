import React, { useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  GeoJSON,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MapPopup from "./MapPopup";

const DEFAULT_BASEMAP = "http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";

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

const GeneralMap = ({ basemap = DEFAULT_BASEMAP, layers, center, zones }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [showMarkers, setShowMarkers] = useState(false); // State to control markers visibility
  const mapRef = useRef(null);
  const showZoomlevel = 16;
  const [showZones, setShowZones] = useState(true); // State to control zones visibility
  const [showLegend, setShowLegend] = useState(false); // State to control zones visibility

  const MAXZOOM = 22;

  const handleMarkerClick = (coordinates, shapeStatus) => {
    setSelectedMarker({ coordinates, shapeStatus });
  };

  const closePopup = () => {
    setSelectedMarker(null);
  };

  const handleZoneClick = (layer, feature) => {
    const map = mapRef.current;
    if (map) {
      const bounds = layer.getBounds();
      map.fitBounds(bounds);
      setSelectedZone(feature);
    }
  };

  const addZoneTitle = (map, layer, feature) => {
    if (!map) return;

    const center = layer.getBounds().getCenter();
    const zoneName = feature.properties.title || "Field";
    const marker = L.marker(center, {
      icon: L.divIcon({
        className: "zone-title",
        html: `<div style="color: black; font-weight: bold; ">${zoneName}</div>`,
      }),
    });

    map.addLayer(marker);

    map.on("zoomend", () => {
      const currentZoom = map.getZoom();
      if (currentZoom >= 18) {
        map.removeLayer(marker);
      } else {
        map.addLayer(marker);
      }
    });

    marker.addTo(map);
  };

  const ZoomHandler = () => {
    const map = useMap();
    map.on("zoomend", () => {
      const currentZoom = map.getZoom();

      // Show zones at zoom level 14 and higher
      setShowMarkers(currentZoom >= 18);
      setShowZones(currentZoom < 18);
      setSelectedZone(currentZoom < 18 ? null : selectedZone);
      setShowLegend(currentZoom >= 18);
    });
    return null;
  };

  const filterMarkersByZone = (feature, marker) => {
    if (!selectedZone) return true; // Show all markers if no zone is selected
    const zoneBounds = L.geoJSON(selectedZone).getBounds();
    return zoneBounds.contains(marker); // Only show markers inside the selected zone
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <MapContainer
        center={center}
        zoom={17}
        scrollWheelZoom={true}
        className="h-[100%] w-[100%] z-0 rounded-lg"
        maxZoom={MAXZOOM}
        ref={mapRef}
      >
        <ZoomHandler />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={basemap}
          maxZoom={MAXZOOM}
        />
        <TileLayer url={layers.Imagery} maxZoom={MAXZOOM} />

        {/* Render zones */}
        {showZones &&
          zones?.map((geoJson, index) => (
            <React.Fragment key={index}>
              {geoJson.features
                .filter((feature) =>
                  ["Polygon", "MultiPolygon"].includes(feature.geometry.type)
                )
                .map((filteredFeature, index) => (
                  <GeoJSON
                    key={index}
                    data={filteredFeature}
                    style={(feature) => {
                      if (selectedZone && feature !== selectedZone) {
                        return { fillOpacity: 0, color: "transparent" };
                      }
                      return {
                        color: "yellow",
                        weight: 2,
                        fillColor: "yellow",
                        fillOpacity: 0.5,
                      };
                    }}
                    onEachFeature={(feature, layer) => {
                      layer.on({
                        mouseover: (e) => {
                          if (!selectedZone) {
                            const zone = e.target;
                            zone.setStyle({
                              fillColor: "red",
                              fillOpacity: 0.7,
                            });
                          }
                        },
                        mouseout: (e) => {
                          if (!selectedZone) {
                            const zone = e.target;
                            zone.setStyle({
                              fillColor: "yellow",
                              fillOpacity: 0.5,
                            });
                          }
                        },
                        click: () => handleZoneClick(layer, feature),
                      });

                      // Add zone title dynamically
                      addZoneTitle(mapRef.current, layer, feature);
                    }}
                  />
                ))}
            </React.Fragment>
          ))}

        {/* Render markers based on zone selection */}
        {showMarkers &&
          zones?.map((geoJson, index) =>
            geoJson.features
              .filter((feature) => feature.geometry.type === "Point")
              .map((feature, idx) => {
                const { coordinates } = feature.geometry;
                const { shapeStatus } = feature.properties;

                const markerPosition = [coordinates[1], coordinates[0]];
                const marker = L.latLng(markerPosition);

                if (!filterMarkersByZone(feature, marker)) {
                  return null; // Skip this marker if it’s outside the selected zone
                }

                return (
                  <CircleMarker
                    key={idx}
                    center={markerPosition}
                    radius={8}
                    color={getColorByRipeness(shapeStatus)}
                    fillColor={getColorByRipeness(shapeStatus)}
                    fillOpacity={0.6}
                    eventHandlers={{
                      click: () => handleMarkerClick(coordinates, shapeStatus),
                    }}
                  />
                );
              })
          )}
      </MapContainer>

      {/* MapPopup */}
      {selectedMarker && (
        <div className="absolute z-9999 top-4 right-4">
          <MapPopup
            ripeness_level={selectedMarker.shapeStatus || "ripe"}
            closePopup={closePopup}
          />
        </div>
      )}

      {/* Legend */}
      {showLegend && (
        <div className="absolute z-9999 bottom-6 sm:top-24 left-4">
          <div className="flex flex-col p-2 bg-white rounded-lg border-2 border-teal-500 gap-4 text-teal-700 font-bold">
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 rounded-full bg-yellow-300"></span>
              <span className="ml-2">Unripe</span>
            </div>
            <div className="bg-teal-500 w-full h-0.5 rounded-full"></div>
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 rounded-full bg-blue-400"></span>
              <span className="ml-2">Ready to be harvested</span>
            </div>
            <div className="bg-teal-500 w-full h-0.5 rounded-full"></div>
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 rounded-full bg-red-500"></span>
              <span className="ml-2">Not Checked</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralMap;
