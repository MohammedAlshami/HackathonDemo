"use client";
import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

// DrawPolygon component for handling drawing functionality
const DrawPolygon = ({ setPolygon }) => {
  const map = useMap();

  React.useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        edit: false,
        remove: false,
      },
      draw: {
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false,
        polygon: {
          allowIntersection: false,
          showArea: true,
        },
      },
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (event) => {
      const { layer } = event;
      drawnItems.clearLayers();
      drawnItems.addLayer(layer);
      setPolygon(layer.toGeoJSON());
    });

    return () => {
      map.removeLayer(drawnItems);
      map.removeControl(drawControl);
    };
  }, [map, setPolygon]);

  return null;
};

const MapWithZones = () => {
  const [center, setCenter] = useState([-21.098761, -175.342867]);
  const [geojsonData, setGeojsonData] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const mapRef = useRef();

  // Modal state
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [polygon, setPolygon] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/v1/field/get-all-field")
      .then((response) => response.json())
      .then((data) => setGeojsonData(data))
      .catch((error) => console.error("Error fetching geojson data:", error));
  }, []);

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
    const zoneName = feature.properties.title || "Zone";
    const marker = L.marker(center, {
      icon: L.divIcon({
        className: "zone-title",
        html: `<div style="color: black; font-weight: bold;">${zoneName}</div>`,
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

  const handleNext = () => {
    if (step === 3 && !polygon) {
      alert("Please draw a polygon before proceeding.");
      return;
    }
    setStep((prev) => prev + 1);
  };
  const handleConfirm = async () => {
    if (!title || !description || !polygon) {
      alert("Please fill in all fields and draw a polygon");
      return;
    }

    // Add title and description to the polygon's properties
    const enhancedGeoJSON = {
      ...polygon,
      properties: {
        ...polygon.properties,
        title: title,
        description: description,
      },
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/v1/field/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features: [enhancedGeoJSON] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);

      // Refresh the zones data
      const updatedZones = await fetch(
        "http://127.0.0.1:5000/v1/field/get-all-field"
      ).then((response) => response.json());
      setGeojsonData(updatedZones);

      // Reset form and close modal
      setShowModal(false);
      setStep(1);
      setTitle("");
      setDescription("");
      setPolygon(null);

      alert("Zone created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating zone. Please try again.");
    }
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {/* Add Zone Button */}
      <button
        onClick={() => setShowModal(true)}
        className="absolute top-4 right-4 z-[1000] bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Zone
      </button>

      {/* Modal */}
      {showModal && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1001] bg-white p-6 rounded-lg shadow-lg">
          {step === 1 && (
            <div>
              <h3>Step 1: Enter Zone Details</h3>
              <input
                type="text"
                placeholder="Zone Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block mb-4 w-full p-2 border rounded"
              />
              <textarea
                placeholder="Zone Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block mb-4 w-full p-2 border rounded"
              />
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3>Step 2: Draw a Polygon</h3>
              <p>Use the drawing tools on the map to create your zone</p>
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3>Step 3: Confirm Details</h3>
              <p>
                <strong>Title:</strong> {title}
              </p>
              <p>
                <strong>Description:</strong> {description}
              </p>
              <p>
                <strong>Polygon:</strong>{" "}
                {polygon ? "Polygon drawn" : "No polygon drawn"}
              </p>
              <button
                onClick={handleConfirm}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      )}

      <MapContainer
        center={center}
        zoom={16}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://zappa-drangue-deployments-test.s3.ap-southeast-1.amazonaws.com/MyHackathonMaps/myhackatho/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {geojsonData?.map((geoJson, index) => (
          <React.Fragment key={index}>
            {geoJson?.features
              ?.filter((feature) =>
                ["Polygon", "MultiPolygon"].includes(feature.geometry.type)
              )
              .map((filteredFeature, featureIndex) => (
                <GeoJSON
                  key={featureIndex}
                  data={filteredFeature}
                  style={(feature) => ({
                    color: "yellow",
                    weight: 2,
                    fillColor: "yellow",
                    fillOpacity:
                      selectedZone && feature !== selectedZone ? 0 : 0.5,
                  })}
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

                    addZoneTitle(mapRef.current, layer, feature);
                  }}
                />
              ))}
          </React.Fragment>
        ))}

        {step === 2 && <DrawPolygon setPolygon={setPolygon} />}
      </MapContainer>
    </div>
  );
};

export default MapWithZones;
