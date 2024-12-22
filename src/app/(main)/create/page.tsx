'use client';
import React from "react";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./DynamicMap"), { ssr: false });
const page = () => {
  return <DynamicMap />;
};

export default page;
