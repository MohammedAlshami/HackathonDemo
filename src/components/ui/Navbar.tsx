"use client";
import {
  Brain,
  LayoutDashboard,
  ScanEye,
  User,
  Calendar,
  MapIcon,
  BluetoothConnected,
  TabletIcon,
} from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

interface NavbarProbs {
  className: string;
}

const Navbar = ({ className }: NavbarProbs) => {
  const router = useRouter();

  const navItems = [
    { href: "/detect", icon: Brain, label: "Detect" },
    { href: "/", icon: MapIcon, label: "Map" },
    { href: "/schedule", icon: Calendar, label: "Schedule" },
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  ];

  return (
    <div className={`${className}`}>
      <div className="mb-6 border-2 border-teal-500 bg-white px-8 h-20 rounded-3xl flex items-center justify-between w-fit gap-8 ">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = router.pathname === item.href;
          const label = item.label;
          return (
            <a
              className={`  hover:rounded-lg cursor-pointer flex flex-col items-center gap-2 ${
                isActive
                  ? "bg-teal-500 text-white"
                  : "hover:bg-teal-500 hover:text-white text-teal-500 hover:p-1"
              }`}
              key={index}
              href={item.href}
            >
              <Icon className="w-6 h-6" />
              <h2 className="text-sm lg:text-lg">{label}</h2>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
