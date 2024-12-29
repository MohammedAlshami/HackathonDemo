import { RiAddFill, RiNotification2Fill } from "@remixicon/react";
import React from "react";
import { Navbar } from "@/components/prototyping/Navbar";

import { CardComponent } from "@/components/prototyping/CardComponent";
import Sidebar from "@/components/prototyping/Sidebar";

const HomePage = ({}) => {
  return (
    <div>
      <div className="px-6 lg:px-12 flex flex-col  gap-12 ">
        <div>
          <h1 className="font-medium text-3xl">Welcome Back</h1>
        </div>
        <CardComponent classname="h-64  bg-yellow-300 transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer" />
        <div className="space-y-8">
          <h1 className="font-medium text-3xl">Farms</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <CardComponent classname="h-96 bg-red-300 transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer" />
            <CardComponent classname="h-96 bg-blue-300 transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer" />
            <CardComponent classname="h-96 bg-blue-300 transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer" />
          </div>
        </div>
        <div className="space-y-8">
          <h1 className="font-medium text-3xl">Schedule</h1>
          <CardComponent classname="h-[30rem]  bg-green-300 transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default page;
