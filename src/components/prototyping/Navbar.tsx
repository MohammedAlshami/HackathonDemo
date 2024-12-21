"use client";
import { RiNotification2Fill } from "@remixicon/react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname(); // Get the current pathname
  return (
    <div className="fixed top-0 w-full bg-white z-10">
      <div className="px-12 pt-4 flex flex-col gap-8 border-b-2 border-black/10">
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-5">
            <img
              src="/sampleImage.png"
              alt=""
              className="w-8 h-8 rounded-full"
            />
            <h1>Meschah Irung</h1>
          </div>
          <div className="flex items-center gap-4">
            <h2>Help</h2>
            <RiNotification2Fill />
            <img
              src="/sampleImage.png"
              alt=""
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>

        <div className="flex gap-4 text-md">
          <a
            href="/crop/home"
            className={`pb-2 ${
              pathname === "/crop/home" ? "border-b-4 border-blue-300" : ""
            }`}
          >
            Home
          </a>
          <a
            href="/crop/farms"
            className={`pb-2 ${
              pathname === "/crop/farms" ? "border-b-4 border-blue-300" : ""
            }`}
          >
            Farms
          </a>
          <a
            href="/map"
            className={`pb-2 ${
              pathname === "/map" ? "border-b-4 border-blue-300" : ""
            }`}
          >
            Map
          </a>
          <a
            href="/crop/dashboard"
            className={`pb-2 ${
              pathname === "/crop/dashboard" ? "border-b-4 border-blue-300" : ""
            }`}
          >
            Dashboard
          </a>
          <a
            href="/crop/employees"
            className={`pb-2 ${
              pathname === "/crop/employees" ? "border-b-4 border-blue-300" : ""
            }`}
          >
            Employees
          </a>
          <a
            href="/crop/tasks"
            className={`pb-2 ${
              pathname === "/crop/tasks" ? "border-b-4 border-blue-300" : ""
            }`}
          >
            tasks
          </a>
          <a
            href="/crop/schedule"
            className={`pb-2 ${
              pathname === "/crop/schedule" ? "border-b-4 border-blue-300" : ""
            }`}
          >
            Schedule
          </a>
        </div>
      </div>
    </div>
  );
};
