import { RiAddFill, RiNotification2Fill } from "@remixicon/react";
import React from "react";
import { Navbar } from "@/components/prototyping/Navbar";

import { CardComponent } from "@/components/prototyping/CardComponent";
import Page from "@/app/[lang]/(main)/schedule/page";

import CalendarUI from "@/components/ui/schedule/CalendarUI";
const Schedule = ({}) => {
  return (
    <div>
      <div className="px-6 lg:px-12 flex flex-col  gap-12 ">
        <CardComponent classname="h-[40rem] bg-white transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
          {/* <Page /> */}
          <CalendarUI />
        </CardComponent>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="relative pt-36 bg-[#FAFAFA]">
      <Navbar />

      <Schedule />
    </div>
  );
};

export default page;
