"use client";
import {
  BadgeRussianRuble,
  Calculator,
  Calendar,
  LocateIcon,
  Palmtree,
} from "lucide-react";
import React, { useState } from "react";

const DetailItem = ({ icon, content }) => {
  return (
    <div className="flex gap-2 items-center text-sm">
      {icon}
      {content}
    </div>
  );
};
const TreeID = () => {
  return (
    <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-4">
        <div className="bg-teal-500  rounded-full w-fit text-white  p-2 ">
          <Palmtree className="fill-white" />
        </div>
        <h2 className="text-teal-500">
          <span className="font-bold">Tree ID: </span> CP-10-0020
        </h2>
      </div>
      <div className="border-2 border-teal-500 p-2 flex rounded-xl">
        <h2 className="font-thin text-gray-600">
          Numbers Of Fruits: <span className="font-bold text-teal-500">10</span>
        </h2>
      </div>
    </div>
  );
};

const PalmRipeness = ({ ripeness_level }) => {
  return (
    <div className="flex flex-col text-sm justify-center items-center gap-2">
      <Palmtree className="text-teal-500 fill-teal-500" />
      <h2 className="text-teal-500 font-thin text-gray-600">Ripeness Level:</h2>
      <div className="py-1 px-4 rounded-xl border-2 border-teal-500 w-fit">
        <h2 className="text-teal-500 font-bold">{ripeness_level}</h2>
      </div>
    </div>
  );
};

const TopPart = ({ ripeness_level }) => {
  return (
    <div className="flex flex-col gap-4">
      <TreeID />
      <div className="flex justify-between items-center ">
        <div className="flex flex-col justify-between gap-6">
          <DetailItem
            icon={<LocateIcon className="text-teal-500 fill-teal-500" />}
            content={<p>2.946121, 101.559075</p>}
          />
          <DetailItem
            icon={<Calendar className="text-teal-500" />}
            content={
              <p className="font-thin text-gray-600">
                {" "}
                Year Of Plant: <span className="font-bold">Aug 15, 2019</span>
              </p>
            }
          />
        </div>
        <PalmRipeness ripeness_level={ripeness_level} />
      </div>
    </div>
  );
};

const PopupTabs = () => {
  const [activeTab, setActiveTab] = useState("Fertilizers");

  return (
    <div>
      <div className="flex justify-between items-center px-2 lg:px-12">
        <h2
          className={`text-teal-500 font-bold cursor-pointer ${
            activeTab === "Fertilizers" ? "underline" : ""
          }`}
          onClick={() => setActiveTab("Fertilizers")}
        >
          <div className="hidden lg:block"> Fertilizers</div>
          <Calculator className="block lg:hidden" />
        </h2>

        <h2
          className={`text-teal-500 font-bold cursor-pointer ${
            activeTab === "Schedule" ? "underline" : ""
          }`}
          onClick={() => setActiveTab("Schedule")}
        >
          <div className="hidden lg:block"> Schedule</div>

          <Calculator className="block lg:hidden" />
        </h2>
        <h2
          className={`text-teal-500 font-bold cursor-pointer ${
            activeTab === "Images" ? "underline" : ""
          }`}
          onClick={() => setActiveTab("Images")}
        >
          <div className="hidden lg:block"> Images</div>
          <Calculator className="block lg:hidden" />
        </h2>
      </div>
      <div className="mt-4">
        {activeTab === "Fertilizers" && <FertilizersTab />}
        {activeTab === "Schedule" && <ScheduleTab />}
        {activeTab === "Images" && <ImagesTab />}
      </div>
    </div>
  );
};

const FertilizerComponent = ({ icon, content }) => {
  return (
    <div className=" h-full flex  flex-row gap-4 items-center justify-center bg-teal-500 rounded-lg text-white font-bold gap-2 p-4">
      <div className="bg-white text-teal-500 w-fit rounded-full p-2">
        {icon}
      </div>
      <h2> {content}</h2>
    </div>
  );
};
const FertilizersTab = () => {
  return (
    <div className="space-y-4 h-full">
      <h2 className="text-teal-500 font-bold">Last Fertilzers Used</h2>

      <div className="flex gap-4 flex-col lg:flex-row">
        <FertilizerComponent
          icon={<BadgeRussianRuble className="h-1/6 w-full" />}
          content="Nitrogen"
        />
        <FertilizerComponent icon={<BadgeRussianRuble />} content="Pottasium" />
      </div>
    </div>
  );
};

const ScheduleItem = ({ icon, content, date }) => {
  return (
    <div className=" flex  items-center  bg-teal-500 rounded-2xl text-white font-bold gap-4 p-4">
      <div className="bg-white text-teal-500 w-fit rounded-full p-2">
        {icon}
      </div>
      <div>
        <h2> {content}</h2>
        <p className="font-medium text-sm">{date}</p>
      </div>{" "}
    </div>
  );
};
const ScheduleTab = () => {
  return (
    <div className="space-y-4 h-full">
      <h2 className="text-teal-500 font-bold">Dates</h2>

      <div className="flex flex-col gap-4">
        <ScheduleItem
          icon={<BadgeRussianRuble className="h-1/6 w-full" />}
          content="Nitrogen"
          date="14-01-2023"
        />
        <ScheduleItem
          icon={<BadgeRussianRuble />}
          content="Pottasium"
          date="14-01-2023"
        />
      </div>
    </div>
  );
};

const ImagesTab = () => {
  return (
    <div>
      <h2 className="text-teal-500 font-bold">Images Content</h2>
      {/* Add Images content here */}
    </div>
  );
};
const MapPopup = ({ ripeness_level, closePopup }) => {
  return (
    <div>
      <div className="h-full bg-white pb-8 w-[20rem] lg:w-[27rem] border-4 border-teal-500 rounded-xl px-4 py-2 flex flex-col gap-4 relative">
        <button
          onClick={closePopup}
          className="absolute top-4 right-6 bg-teal-500 text-white rounded-lg w-8 h-8 hover:bg-teal-600"
        >
          X
        </button>
        <img
          src="/sampleImage.png"
          className="hidden lg:block w-full h-32 lg:h-52 object-cover rounded-xl"
          alt=""
        />
        <TopPart ripeness_level={ripeness_level} />
        <div className="w-full h-1 bg-teal-500 rounded-full"></div>
        <PopupTabs />
      </div>
    </div>
  );
};

export default MapPopup;
