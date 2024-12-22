"use client";
import {
  BadgeRussianRuble,
  Calculator,
  Calendar,
  Calendar1,
  CalendarCheck2,
  LocateIcon,
  Palmtree,
} from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Image } from "antd";

const DetailItem = ({ icon, content }) => {
  return (
    <div className="flex gap-2 items-center text-sm">
      {icon}
      {content}
    </div>
  );
};
const TreeID = ({ closePopup }) => {
  return (
    <div className="flex sm:Flex justify-between items-center text-sm">
      <div>
        <div className="flex items-center gap-4">
          <div className="bg-teal-500  rounded-full w-fit text-white  p-2 ">
            <Palmtree className="fill-white" />
          </div>
          <h2 className="text-teal-500">
            <span className="font-bold">Tree ID: </span> CP-10-0020
          </h2>
        </div>
      </div>
      <div className="border-2 border-teal-500 p-2 flex rounded-xl">
        <h2 className="font-thin text-gray-600  flex flex-col  items-center sm:block">
          <span className="text-gray-600 text-xs">NO Fruits:</span>{" "}
          <span className="font-bold text-teal-500">10</span>
        </h2>
      </div>
    </div>
  );
};

const PalmRipeness = ({ ripeness_level }) => {
  const getColor = (ripeness) => {
    switch (ripeness) {
      case "unripe":
        return "#ED9200FF";
      case "ripe":
        return "#35CAF0";
      case "fully ripe":
        return "blue";
      default:
        return "red";
    }
  };

  const color = getColor(ripeness_level);

  return (
    <div className="flex flex-col text-sm justify-center items-center gap-2">
      <Palmtree className="text-teal-500 fill-teal-500" />
      <div
        className={`py-1 px-4 rounded-xl border-2 w-fit`}
        style={{ borderColor: color }}
      >
        <h2 className="font-bold" style={{ color: color }}>
          {ripeness_level}
        </h2>
      </div>
    </div>
  );
};

const TopPart = ({ ripeness_level, closePopup }) => {
  return (
    <div className="flex flex-col gap-4">
      <TreeID closePopup={closePopup} />
      <div className="flex justify-between items-center ">
        <div className="flex flex-col justify-between gap-6">
          <DetailItem
            icon={<LocateIcon className="text-teal-500 fill-teal-500" />}
            content={<p>2.946121, 101.559075</p>}
          />
          <DetailItem
            icon={<Calendar className="text-teal-500" />}
            content={
              <p className="font-thin text-gray-600 ">
                {" "}
                <span className="font-bold">Aug 15, 2019</span>
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
      <div className="flex justify-between items-center px-2 lg:px-8">
        <h2
          className={`text-teal-500 font-bold cursor-pointer ${
            activeTab === "Fertilizers" ? "underline" : ""
          }`}
          onClick={() => setActiveTab("Fertilizers")}
        >
          <div className="hidden lg:block"> Fertilizers</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="block lg:hidden w-8 h-8"
          >
            <path
              fill="currentColor"
              d="M241.1 21.91c-89.7-.15-172.99 2.47-171.94 8.27l22.08 36.14c59.36-5.1 115.96-6.95 172.66-6.57c53.2.35 106.5 2.67 162.1 6.09l31.2-33.28c-4.5-6.74-114.4-10.48-216.1-10.65m3.8 55.81c-49.1.12-98.3 1.99-149.69 6.32C73.42 207.7 61.35 358.6 89.71 451.7l-26.43 31c128.12 9.6 258.52 12.7 382.62 6.3L416 453.4c19.3-106.2 13.3-251.2.2-370.12c-51.2-3.06-100.3-5.1-149.3-5.49L401.1 201h-71.3c3.8 23.1 20.4 54.3 37.9 83.2c9.9 16.4 20 32.3 27.7 46.3S409 356.2 409 368c0 28-18.9 51-46.7 65.9c-27.8 15-65.1 23.1-106.3 23.1s-78.5-8.1-106.3-23.1C121.9 419 103 396 103 368c0-12 6.2-23.7 14.3-37.9s18.6-30.2 28.8-46.8c18-29.1 34.4-60.5 36.7-82.3H104zm11 14.37L152 183h48.3l.7 8.2c2.7 31.9-18.9 68-39.6 101.6c-10.4 16.8-20.8 32.7-28.4 46.2c-7.7 13.4-12 25-12 29c0 14.6 7 27.5 20.1 38.6c54.2-6.8 82-10.6 106.4-11.4c.6-8.5 1.7-17 3.1-25.2c-36.6 2.3-70.3-7.5-103.5-19.3c14.9-28.8 42.3-48.9 67-48.8c4.6 0 9.1.6 13.4 2.1c11.2 3.6 21.3 23.7 28 40.6c2.2-10.5 4.3-19.5 5.2-26.1v-.1c.9-6.2-1.6-24-4.8-38.7c-2.3-10.6-4.7-19.9-5.9-24.3c-6.3 0-11.9-1.2-15.6-5c-25.4-26.4-8.9-75.2 12.9-102.4c15.5 25.8 35.7 53.6 56 72.8c-4.4 14.8-12.4 26.7-27.9 32c-2.1.2-4.7.5-7.3.9c1.4 5.2 3.4 13 5.4 22.1c1.3 5.7 2.5 11.6 3.5 17.5c5.3-4.9 11.4-9.4 16.4-9.6h1.1c28 2.6 59.7 29.6 67.7 69c-27.5-12.6-59-5.3-83.9-30.2c-2.8 18.6-10.6 46.6-12.7 72.8c24.1.8 51.9 4.6 105.3 11.3c13.1-11.1 20.1-24 20.1-38.6c0-4.2-4.1-15.6-11.4-28.8c-7.3-13.3-17.2-29-27.3-45.7C332.2 260.3 311 224.2 311 192v-9h43.9zm.1 320.81c-22.3 0-45.9 3-90.7 8.7C189 432.5 220.8 439 256 439s67-6.5 90.7-17.4c-44.8-5.7-68.4-8.7-90.7-8.7"
            ></path>
          </svg>
        </h2>

        <h2
          className={`text-teal-500 font-bold cursor-pointer ${
            activeTab === "Schedule" ? "underline" : ""
          }`}
          onClick={() => setActiveTab("Schedule")}
        >
          <div className="hidden lg:block"> Schedule</div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="block lg:hidden w-8 h-8"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7 6a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v2a1 1 0 0 1-.999 1zm10 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v2a1 1 0 0 1-.999 1z"
              opacity={0.5}
            ></path>
            <path
              fill="currentColor"
              d="M19 4h-1v1a1 1 0 0 1-2 0V4H8v1a1 1 0 0 1-2 0V4H5a3 3 0 0 0-3 3v2h20V7a3 3 0 0 0-3-3"
            ></path>
            <circle cx={7} cy={13} r={1} fill="currentColor"></circle>
            <circle cx={7} cy={17} r={1} fill="currentColor"></circle>
            <circle cx={12} cy={13} r={1} fill="currentColor"></circle>
            <circle cx={12} cy={17} r={1} fill="currentColor"></circle>
            <circle cx={17} cy={13} r={1} fill="currentColor"></circle>
            <circle cx={17} cy={17} r={1} fill="currentColor"></circle>
            <path
              fill="currentColor"
              d="M2 9v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9zm5 9a1 1 0 1 1 0-2a1 1 0 0 1 0 2m0-4a1 1 0 1 1 0-2a1 1 0 0 1 0 2m5 4a1 1 0 1 1 0-2a1 1 0 0 1 0 2m0-4a1 1 0 1 1 0-2a1 1 0 0 1 0 2m5 4a1 1 0 1 1 0-2a1 1 0 0 1 0 2m0-4a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
              opacity={0.5}
            ></path>
          </svg>
        </h2>

        <h2
          className={`text-teal-500 font-bold cursor-pointer ${
            activeTab === "About" ? "underline" : ""
          }`}
          onClick={() => setActiveTab("Images")}
        >
          <div className="hidden lg:block"> Images</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="block lg:hidden w-8 h-8"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor">
              <path d="M7.25 8a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0"></path>
              <path d="M9.367 2.25h5.266c1.092 0 1.958 0 2.655.057c.714.058 1.317.18 1.869.46a4.75 4.75 0 0 1 2.075 2.077c.281.55.403 1.154.461 1.868c.057.697.057 1.563.057 2.655v5.266c0 1.092 0 1.958-.057 2.655c-.058.714-.18 1.317-.46 1.869a4.75 4.75 0 0 1-2.076 2.075c-.552.281-1.155.403-1.869.461c-.697.057-1.563.057-2.655.057H9.367c-1.092 0-1.958 0-2.655-.057c-.714-.058-1.317-.18-1.868-.46a4.75 4.75 0 0 1-2.076-2.076c-.281-.552-.403-1.155-.46-1.869c-.058-.697-.058-1.563-.058-2.655V9.367c0-1.092 0-1.958.057-2.655c.058-.714.18-1.317.46-1.868a4.75 4.75 0 0 1 2.077-2.076c.55-.281 1.154-.403 1.868-.461c.697-.057 1.563-.057 2.655-.057M3.75 13.753v.847c0 1.133 0 1.937.052 2.566c.05.62.147 1.005.302 1.31a3.25 3.25 0 0 0 1.42 1.42c.305.155.69.251 1.31.302c.389.032.845.044 1.404.049c-.046-1.392.167-2.71.593-3.92c-1.12-1.606-2.98-2.641-5.08-2.574m16.5-3.084c-5.863-.493-10.727 3.874-10.511 9.581h4.86c1.133 0 1.937 0 2.566-.052c.62-.05 1.005-.147 1.31-.302a3.25 3.25 0 0 0 1.42-1.42c.155-.305.251-.69.302-1.31c.052-.63.052-1.434.052-2.566zM5.75 8a2.75 2.75 0 1 0 5.5 0a2.75 2.75 0 0 0-5.5 0m1.5 0a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0"></path>
            </g>
          </svg>
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
    <div className=" h-full flex  flex-row gap-4 items-center  lg:justify-center bg-teal-500 rounded-lg text-white font-bold gap-2 p-4">
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

      <div className="flex gap-4 flex-col  lg:flex-row">
        <FertilizerComponent
          icon={<BadgeRussianRuble className="h-1/6 w-full" />}
          content="Nitrogen"
        />
        <FertilizerComponent icon={<BadgeRussianRuble />} content="Potasium" />
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
          icon={<Calendar1 className="h-1/6 w-full" />}
          content="Last Checkup time"
          date="14-01-2023"
        />
        <ScheduleItem
          icon={<CalendarCheck2 />}
          content="Last Harvested Time"
          date="14-01-2023"
        />
      </div>
    </div>
  );
};

const ImagesTab = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-teal-500 font-bold">Images Content</h2>
      <div className="w-full h-32 lg:h-44 object-cover rounded-xl">
        <Image
          src="/detection_sample.png"
          alt=""
          width="100%"
          height="100%"
          rootClassName="object-cover"
          style={{ objectFit: "cover", borderRadius: "1rem" }}
        />
      </div>
    </div>
  );
};
const MapPopup = ({ ripeness_level, closePopup }) => {
  const router = useRouter();
  return (
    <div>
      <div className="h-full bg-white pb-8 w-[20rem] lg:w-[27rem] border-4 border-teal-500 rounded-xl px-4 py-2 flex flex-col gap-4 relative">
        <button
          onClick={closePopup}
          className="absolute top-1 right-1 bg-teal-500 text-sm text-white rounded-lg w-6 h-6 hover:bg-teal-600"
        >
          X
        </button>
        <div className="h-2"></div>

        <TopPart ripeness_level={ripeness_level} closePopup={closePopup} />

        <div className="w-full h-1 bg-teal-500 rounded-full"></div>
        <PopupTabs />
      </div>
    </div>
  );
};

export default MapPopup;
