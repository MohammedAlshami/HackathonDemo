"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const Navbar = ({
  navLinks,
}: {
  navLinks: { label: string; href: string }[];
}) => {
  const [isOpen, setIsOpen] = useState(false); // Track if the menu is open

  // Function to toggle the navbar visibility
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the navbar when a link is clicked
  const closeNavbar = () => {
    setIsOpen(false);
  };
  const locale = useLocale();

  return (
    <>
      <header
        className="fixed top-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm bg-transparent"
        style={{ zIndex: 1000000000000000 }}
      >
        <nav
        
          className="mt-6 relative max-w-[55rem] bg-white w-full border border-neutral-600/20 rounded-[36px] mx-2 py-3 px-4 pb-8 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <Link
              className="flex flex-col items-center text-xl font-semibold my-2 gap-0"
              href="/"
            >
              <img
                className="mr-3"
                src="/DRANGUE_Logo.png"
                width="120"
                alt="Drangue Logo"
              />
            </Link>
            <div className="md:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-8 flex justify-center items-center text-sm font-semibold rounded-full  text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700"
                onClick={toggleNavbar} // Toggle the navbar on button click
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className={`hs-collapse-open:hidden flex-shrink-0 size-4 ${
                    isOpen ? "hidden" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className={`hs-collapse-open:block hidden flex-shrink-0 size-4 ${
                    !isOpen ? "hidden" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div
            id="navbar-collapse-with-animation"
            className={`hs-collapse ${
              isOpen ? "block" : "hidden"
            } overflow-hidden transition-all duration-300 basis-full grow md:block`}
          >
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7">
              {/* Dynamically render the links */}
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="font-medium text-gray-500 hover:text-gray-400 md:py-6 dark:text-neutral-400 dark:hover:text-neutral-500"
                  onClick={closeNavbar} // Close the navbar when the link is clicked
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
