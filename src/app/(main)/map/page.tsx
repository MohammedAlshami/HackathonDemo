// pages/map.tsx
"use client";
import dynamic from "next/dynamic";
import React from "react";
const geoJsonData = {
  type: "FeatureCollection",
  crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  features: [
    {
      type: "Feature",
      properties: { shapeStatus: "ripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417526595713838, 3.413835858323683],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "unripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417658395488189, 3.413906934978411],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "ripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417458139954888, 3.413874622926508],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "unripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417527583764112, 3.413989166929305],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "ripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417530751964705, 3.414062156326553],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "unripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417661692852519, 3.413986395559078],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "ripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417594128285117, 3.41394261723627],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "unripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417467015802984, 3.414090976606999],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "ripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417509609729152, 3.413570889200721],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "unripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417683330904509, 3.413608348734408],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "ripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417645485129498, 3.413572838701073],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "unripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417678947266637, 3.413686141005682],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "ripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417630852067461, 3.413650073815854],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "unripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417575201716758, 3.413558921537502],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "ripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417571580381832, 3.41361458678341],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "unripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417454411297058, 3.413551613281246],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "ripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417674524096867, 3.413506833948536],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "unripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417457657003169, 3.41351413705555],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "ripe" },
      geometry: {
        type: "Point",
        coordinates: [113.417453136312062, 3.413453150681298],
      },
    },
    {
      type: "Feature",
      properties: { shapeStatus: "unripe" },
      geometry: {
        type: "Point",
        coordinates: [113.4176808421022, 3.413434081431252],
      },
    },
  ],
};

const layers = {
  Imagery:
    "https://zappa-drangue-deployments-test.s3.ap-southeast-1.amazonaws.com/MyHackathonMaps/MyHackathonMap/{z}/{x}/{y}.png",
};
const DynamicMap = dynamic(
  () => import("../../../components/ui/MapComponent"),
  {
    ssr: false, // Disable SSR for this component
  }
);

const MapPage = () => {
  return (
    <div className="h-screen w-full z-0">
      <DynamicMap
        center={[3.413835858323683, 113.417526595713838]}
        geoJsonData={geoJsonData}
        layers={layers}
      />
    </div>
  );
};

export default MapPage;
