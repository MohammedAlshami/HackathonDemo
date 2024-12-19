import {
  ArrowDown,
  BellDot,
  Calendar,
  Filter,
  Rows,
  Rows3,
} from "lucide-react";
import React from "react";

const BreadCrumb = () => {
  return (
    <>
      <div className="flex items-center justify-between bg-teal-500/10 p-2 rounded-xl m-2">
        <div>
          <h2 className="font-bold text-teal-800">Home</h2>
        </div>
        <div className="flex gap-4">
          <div className="bg-white flex items-center  p-2 px-3 border-2 border-black/08 w-fit rounded-full">
            <BellDot className="fill-gray-500 text-gray-500" />
          </div>
          <div className="bg-white flex items-center gap-4 p-2 border-2 border-black/08 w-fit rounded-full">
            <img
              src="/bg.png"
              alt=""
              className="w-8 h-8 object-cover rounded-full"
            />
            <h2 className="text-gray-500 text-sm">John Doe</h2>
          </div>
        </div>
      </div>
    </>
  );
};

const ScheduleTop = () => {
  return (
    <div className="flex items-center justify-between px-2 text-teal-500 w-full pb-4">
      <div className="flex gap-2">
        <Calendar />
        <h2>Schedule</h2>
      </div>

      <div className="flex bg-teal-500/20 w-fit rounded-xl px-1 ">
        <h2 className=" text-gray-500 py-1 m-1 rounded-md px-2 sm:px-8">Day</h2>
        <h2 className="bg-white py-1 m-1 rounded-md px-2 sm:px-8 border-2 border-black/10">
          Week
        </h2>
        <h2 className="text-gray-500 py-1 m-1 rounded-md px-2 sm:px-8">
          Month
        </h2>
      </div>
    </div>
  );
};

const RowItem = ({ rowName, date, imageUrl }) => {
  return (
    <div className="bg-gradient-to-r from-white to-teal-500/20 flex  items-center justify-between w-fit gap-2 sm:w-[20rem] p-4 rounded-lg border-2 border-black/10">
      <div className="flex gap-2 items-center ">
        <img
          src={imageUrl}
          alt=""
          className="w-8 h-8 object-cover rounded-full"
        />
        <h2>{rowName}</h2>
      </div>
      <h2 className="text-gray-500">{date}</h2>
    </div>
  );
};
const ScheduleRow = ({ section, rowName, date, classname, gap, imageUrl }) => {
  return (
    <div
      className={`border border-black/10 flex flex-col justify-center h-28 sm:h-24 text-xs w-[80rem] lg:w-full sm:text-normal ${classname}`}
    >
      <div className={`flex ${gap}`}>
        <div className="flex items-center gap-4 border-r-2 border-black/10 w-32 sm:w-64 h-full">
          <Rows3 className="fill-teal-500 text-white" />
          <h2 className="text-xs sm:text-sm font-bold text-gray-600">
            Section {section}
          </h2>
        </div>
        <RowItem rowName={rowName} date={date} imageUrl={imageUrl} />
      </div>
    </div>
  );
};
const DateItem = ({ date, start, end }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-fit py-2 text-xs sm:text-normal">
      <h2 className="font-thin">{date}</h2>
      <div className="flex gap-4 text-sm text-gray-600">
        {Array.from({ length: end - start + 1 }, (_, i) => (
          <h1 key={i}>{start + i}</h1>
        ))}
      </div>
    </div>
  );
};
const ScheduleSideBar = () => {
  return (
    <div className="flex gap-4 items-center ">
      <div className="h-full  flex items-center gap-2  border-r-2 pr-2 shadow-r-xl pb-2">
        <div className="border-2 border-black/10 w-fit rounded-xl  p-1 px-2 flex items-center text-gray-600">
          <h2 className="text-sm">Sort By</h2>
          <ArrowDown className="w-4 h-4" />
        </div>
        <div className="border-2 border-black/10 w-fit rounded-xl  p-1 px-2 flex items-center text-gray-600">
          <Filter className="w-4 h-4" />
        </div>
      </div>
      <div className="flex gap-8">
        <DateItem date="1 Jun - 7 Jun" start={1} end={6} />

        <div className=" flex gap-8">
          <DateItem date="1 Jun - 7 Jun" start={8} end={13} />

          <DateItem date="1 Jun - 7 Jun" start={16} end={21} />

          <DateItem date="1 Jun - 7 Jun" start={1} end={7} />
          <DateItem date="1 Jun - 7 Jun" start={1} end={7} />
          <DateItem date="1 Jun - 7 Jun" start={1} end={7} />
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="pt-4 w-full p-2 sm:p-4">
      <div className="h-full w-full">
        <ScheduleTop />
        <div className=" overflow-x-scroll">
          <ScheduleSideBar />
          <ScheduleRow
            section="A"
            rowName="Ahmad Bin Abdullah"
            date="15 Jul 2024"
            gap="gap-4"
            classname=""
            imageUrl="https://thumbs.dreamstime.com/b/happy-handsome-young-hispanic-model-guy-looking-camera-toothy-smile-cheerful-positive-attractive-black-haired-latin-man-333341880.jpg"
          />
          <ScheduleRow
            section="B"
            rowName="Hafiz Bin Harun"
            date="18 Jul 2024"
            gap="gap-12"
            classname=""
            imageUrl="https://thumbs.dreamstime.com/b/young-latin-american-man-portrait-close-up-69958693.jpg"
          />
          <ScheduleRow
            section="C"
            rowName="Syafiq Bin Osman"
            date="20 Jul 2024"
            gap="gap-20"
            classname=""
            imageUrl="https://thumbs.dreamstime.com/b/close-up-portrait-young-hispanic-teenager-man-looking-camera-joyful-smiling-expression-against-urban-background-being-105075919.jpg"
          />
          <ScheduleRow
            section="D"
            rowName="Azlan Bin Rahman"
            date="22 Jul 2024"
            gap="gap-64"
            classname=""
            imageUrl="https://thumbs.dreamstime.com/b/serious-teenage-boy-portrait-74990789.jpg"
          />
          <ScheduleRow
            section="E"
            rowName="Farhan Bin Malik"
            date="25 Jul 2024"
            gap="gap-96"
            classname=""
            imageUrl="https://thumbs.dreamstime.com/b/man-close-to-window-looking-sad-131607913.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
