import { RiAddFill, RiNotification2Fill } from "@remixicon/react";
import React from "react";
import { Navbar } from "@/components/prototyping/Navbar";

import { CardComponent } from "@/components/prototyping/CardComponent";

const Employees = ({}) => {
  return (
    <div>
      <div className="px-6 lg:px-12 flex flex-col  gap-12 ">
        <div className="w-full flex justify-between">
          <h1 className="font-medium text-3xl">Employees</h1>
          <div className="flex gap-4">
            <h1>Add Employee</h1>
            <RiAddFill />
          </div>
        </div>
        <CardComponent classname="h-[40rem] bg-purple-300 transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer" />
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="relative pt-36 bg-[#FAFAFA]">
      <Navbar />

      <Employees />
    </div>
  );
};

export default page;
