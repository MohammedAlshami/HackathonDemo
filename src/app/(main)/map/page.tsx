// pages/map.tsx
"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useEffect, useState } from "react";
import MiniSideBar from "@/components/prototyping/MiniSideBar";

const layers = {
  Imagery:
    "https://zappa-drangue-deployments-test.s3.ap-southeast-1.amazonaws.com/MyHackathonMaps/myhackatho/{z}/{x}/{y}.png",
};
const DynamicMap = dynamic(
  () => import("../../../components/ui/MapComponent"),
  {
    ssr: false, // Disable SSR for this component
  }
);

const MapPage = () => {
  // const [geoJsonData, setGeoJsonData] = useState(null);
  const [zonesData, setZonesData] = useState(null);

  // useEffect(() => {
  //   fetch("/data/combined_zones.geojson")
  //     .then((response) => response.json())
  //     .then((data) => setGeoJsonData(data))
  //     .catch((error) => console.error("Error fetching geojson data:", error));
  // }, []);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/v1/field/get-all-field")
      .then((response) => response.json())
      .then((data) => setZonesData(data))
      .catch((error) => console.error("Error fetching geojson data:", error));
    console.log(zonesData);
  }, []);
  return (
    <div className="h-screen w-full z-0">
      <MiniSideBar />

      <div className="lg:pl-20">
        <DynamicMap
          center={[-21.098761, -175.342867]}
          // geoJsonData={geoJsonData}
          layers={layers}
          zones={zonesData}
        />
      </div>
    </div>
  );
};

export default MapPage;
