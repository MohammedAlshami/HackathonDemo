"use client";
import { RiAddFill } from "@remixicon/react";
import React, { useState } from "react";
import { Navbar } from "@/components/prototyping/Navbar";

import { CardComponent } from "@/components/prototyping/CardComponent";
import Link from "next/link";

const Fields = () => {
  const [isFlex, setIsFlex] = useState(false);

  return (
    <div>
      <div className="px-6 lg:px-12 flex flex-col gap-12">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-medium text-3xl">Fields</h1>
          <div className="flex items-center gap-6">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsFlex(!isFlex)}
            >
              <h1 className="font-medium text-lg">
                {isFlex ? "Switch to Cards" : "Switch to Flex"}
              </h1>
              <div className="w-10 h-6 bg-gray-300 rounded-full flex items-center p-1">
                <div
                  className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-300 ${
                    isFlex ? "translate-x-4" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
            <Link href="/crop/farms/create">
              <div className="flex items-center gap-2">
                <h1 className="font-medium">Add Farm</h1>
                <RiAddFill size={24} />
              </div>
            </Link>
          </div>
        </div>
        <div
          className={`${
            isFlex
              ? "flex flex-col gap-6"
              : "grid grid-cols-1 lg:grid-cols-3 gap-12"
          }`}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <CardComponent
              key={index}
              classname={`h-96 transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer border-black/20 border-4 rounded-lg ${
                isFlex ? "w-full" : ""
              }`}
            >
              <div className="relative w-full h-full">
                <div className="bg-gradient-to-t from-purple-600/10 to-transparent w-full h-full absolute rounded-lg p-4 flex items-end">
                  <h2 className="text-white font-bold text-xl w-full mb-4">
                    Farm {index + 1}
                  </h2>
                </div>
                <img
                  src={`/fields/${(index % 3) + 1}.png`}
                  alt={`Farm ${index + 1}`}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
            </CardComponent>
          ))}
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="relative pt-36 bg-[#FAFAFA]">
      <Navbar />
      <Fields />
    </div>
  );
};

export default page;
