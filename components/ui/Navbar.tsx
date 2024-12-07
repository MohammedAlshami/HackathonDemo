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
    { href: "/detect", icon: Brain },
    { href: "/map", icon: MapIcon },
    { href: "/dashboard", icon: LayoutDashboard },
    { href: "/schedule", icon: Calendar },
    { href: "/connect", icon: TabletIcon },

  ];

  return (
    <div className={`${className}`}>
      <div className="mb-6 border-2 border-teal-500 bg-white py-4 px-8 rounded-full flex items-center justify-between w-full gap-8 sm:w-96">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = router.pathname === item.href;
          return (
            <a
              className={` rounded-full cursor-pointer ${
                isActive
                  ? "bg-teal-500 text-white"
                  : "hover:bg-teal-500 hover:text-white text-teal-500"
              }`}
              key={index}
              href={item.href}
            >
              <Icon className="w-6 h-6" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
