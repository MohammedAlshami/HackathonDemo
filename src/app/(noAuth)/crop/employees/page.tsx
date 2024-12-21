"use client";
import { RiAddFill, RiNotification2Fill } from "@remixicon/react";
import React from "react";
import { Navbar } from "@/components/prototyping/Navbar";

import { CardComponent } from "@/components/prototyping/CardComponent";
import EmployeesTable from "@/components/ui/employees/EmployeesTable";
import TestTable from "@/components/ui/employees/TestTable";
const Employees = ({}) => {
  return (
    <div>
      <div className="px-6 lg:px-12 flex flex-col  gap-12 ">
        {/* <CardComponent classname="h-fit bg-white transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
          <EmployeesTable />
        </CardComponent> */}
        <TestTable />
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="relative  bg-[#FAFAFA]">
      <Employees />
    </div>
  );
};

export default page;
