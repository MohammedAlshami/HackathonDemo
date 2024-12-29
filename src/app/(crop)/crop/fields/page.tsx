"use client";
import { RiAddFill } from "@remixicon/react";
import React, { useState } from "react";
import { Navbar } from "@/components/prototyping/Navbar";

import { CardComponent } from "@/components/prototyping/CardComponent";
import Link from "next/link";
import {
  BadgeRussianRuble,
  Calculator,
  Calendar,
  Calendar1,
  CalendarCheck2,
  LocateIcon,
  Palmtree,
} from "lucide-react";

const DetailItem = ({ icon, content }) => {
  return (
    <div className="flex gap-2 items-center text-sm">
      {icon}
      {content}
    </div>
  );
};
const TopPart = () => {
  return (
    <div className="w-full flex flex-row gap-4">
      <div className="w-full flex justify-between items-center ">
        <div className="w-full flex flex-row justify-between gap-6">
          <DetailItem
            icon={<LocateIcon className="text-teal-500 fill-teal-500" />}
            content={<p>2.946121, 101.559075</p>}
          />
          <DetailItem
            icon={<Calendar className="text-teal-500" />}
            content={
              <p className="font-thin text-gray-600 ">
                {" "}
                <span className="font-bold whitespace-nowrap">
                  Aug 15, 2019
                </span>
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
};
const Fields = () => {
  const [isFlex, setIsFlex] = useState(false);

  return (
    <div>
      <div className="px-6 lg:px-12 flex flex-col gap-12">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-medium ">Fields</h1>
          <div className="flex items-center gap-6">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsFlex(!isFlex)}
            >
              <h1 className="font-medium">
                {isFlex ? "Switch to Cards" : "Switch to Flex"}
              </h1>
              <div
                className={`w-10 h-6 ${
                  isFlex ? "bg-teal-300" : "bg-gray-300"
                } rounded-full flex items-center p-1`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-300 ${
                    isFlex ? "translate-x-4" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
            <Link href="/create">
              <div className="flex items-center gap-2">
                <h1 className="font-medium">Add Field</h1>
                <RiAddFill size={24} />
              </div>
            </Link>
          </div>
        </div>
        <div
          className={`${
            isFlex
              ? "flex flex-col gap-2"
              : "grid grid-cols-1 lg:grid-cols-3 gap-12"
          } transition-all duration-300 ease-in-out`}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              className={`w-full h-fit bg-white border-4 border-teal-600/10 pl-2 sm:pl-0 transform transition-transform duration-500 hover:-translate-y-2 cursor-pointer ${
                isFlex ? "flex items-center justify-center" : "f"
              } rounded-lg space-y-4 shadow-md transition-all duration-300 ease-in-out`}
              key={index}
            >
              <img
                src={`/fields/${(index % 3) + 1}.png`}
                alt={`Field ${index + 1}`}
                className={`${
                  isFlex ? "h-12 w-12" : "h-64 w-full"
                } rounded-lg object-cover transition-all duration-300 ease-in-out`}
              />
              <div
                className={`flex ${
                  isFlex ? "w-full flex-row justify-between" : "w-full flex-col"
                } gap-3 px-4 pb-4 transition-all duration-300 ease-in-out`}
              >
                <h2 className="text-black font-bold text-xl w-full">
                  Farm {index + 1}
                </h2>
                <TopPart />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return <Fields />;
};

export default page;
