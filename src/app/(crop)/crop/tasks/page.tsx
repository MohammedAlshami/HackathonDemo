"use client";
import { RiAddFill, RiNotification2Fill } from "@remixicon/react";
import React from "react";
import { Navbar } from "@/components/prototyping/Navbar";

import { CardComponent } from "@/components/prototyping/CardComponent";
import TasksTable from "@/components/ui/tasks/TasksTable";
const Tasks = ({}) => {
  return (
    <div>
      <div className="px-6 lg:px-12 flex flex-col  gap-12 ">
        <TasksTable />
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="relative  bg-[#FAFAFA]">
      <Tasks />
    </div>
  );
};

export default page;
