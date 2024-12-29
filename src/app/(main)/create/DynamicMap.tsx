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
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [center, setCenter] = useState([-21.098761, -175.342867]);
  const [geojsonData, setGeojsonData] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const mapRef = useRef();

  // Modal state
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [polygon, setPolygon] = useState(null);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/v1/field/get-all-field")
      .then((response) => response.json())
      .then((data) => {
        setGeojsonData(data);
      })
      .catch((error) => {
        console.error("Error fetching geojson data:", error);
      });
  }, []);

  useEffect(() => {
    if (loading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100)); // Increment for 60 seconds
      }, 50);
      return () => clearInterval(interval);
    }
  }, [loading]);
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

    setLoading(true);

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

      setLoading(false);

      // Reset form and close modal
      setShowModal(false);
      setStep(1);
      setTitle("");
      setDescription("");
      setPolygon(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating zone. Please try again.");
    }
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {/* Add Zone Button */}

      {/* Modal */}
      {showModal && (
        <div
          className="absolute bottom-4 right-4 z-[1001] bg-white p-6 border-4 border-teal-600 rounded-lg shadow-lg w-64 h-64 sm:w-96 h-96  transition-all duration-300 ease-in-out transform"
          style={{ transform: "none" }}
        >
          {step === 1 && (
            <div>
              <h3 className="mb-4">
                <span className="text-teal-600 font-bold text-xl">Step 1:</span>{" "}
                Enter Zone Details
              </h3>
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
                className="block mb-4 w-full h-32 sm:h-44 p-2 border rounded  transition-all duration-300 ease-in-out transform"
              />
              <button
                onClick={handleNext}
                className="bg-teal-500 text-white px-4 py-2 rounded w-full"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="h-full flex flex-col justify-between">
              <h3 className="mb-4">
                {" "}
                <span className="text-teal-600 font-bold text-xl">
                  Step 2:
                </span>{" "}
                Draw a Polygon
              </h3>
              <div>
                <p>Use the drawing tools on the map to create your zone</p>
                <img
                  src="/draw.png"
                  alt=""
                  className="h-36 w-full object-cover	rounded-lg my-4"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleNext}
                  className="bg-teal-500 text-white px-4 py-2 rounded w-full"
                >
                  Before
                </button>{" "}
                <button
                  onClick={handleNext}
                  className="bg-teal-500 text-white px-4 py-2 rounded w-full"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="h-full flex flex-col justify-between">
              <div>
                <h2 className="mb-4">
                  <span className="text-teal-600 font-bold text-xl">
                    Step 3:
                  </span>{" "}
                  Confirm Details
                </h2>
                <div className="space-y-4">
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
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleNext}
                  className="bg-teal-500 text-white px-4 py-2 rounded w-full"
                >
                  Before
                </button>
                <button
                  onClick={handleConfirm}
                  className="bg-teal-500 text-white px-4 py-2 rounded w-full"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 z-[1002] flex flex-row justify-center items-center text-white text-3xl font-bold gap-6">
          <div className="w-3/12 bg-gray-700 h-12 rounded-lg">
            <div
              className="h-full bg-teal-500 rounded transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p>{Math.round(progress)}%</p>
        </div>
      )}

      <MapContainer
        center={center}
        zoom={19}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer url="https://zappa-drangue-deployments-test.s3.ap-southeast-1.amazonaws.com/MyHackathonMaps/myhackatho/{z}/{x}/{y}.png" />

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
