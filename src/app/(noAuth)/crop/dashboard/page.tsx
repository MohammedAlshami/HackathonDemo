import { RiAddFill, RiNotification2Fill } from "@remixicon/react";
import React from "react";
import { Navbar } from "@/components/prototyping/Navbar";

import { CardComponent } from "@/components/prototyping/CardComponent";

const Dashboard = ({}) => {
  return (
    <div>
      <div className="px-12 flex flex-col  gap-12 ">
        <CardComponent classname="h-64  bg-yellow-300" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <CardComponent classname="h-96  bg-red-300" />
          <CardComponent classname="h-96  bg-blue-300" />
        </div>
        <CardComponent classname="h-[40rem]  bg-green-300" />
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="relative pt-36 bg-[#FAFAFA]">
      <Navbar />

      <Dashboard />
    </div>
  );
};

export default page;
