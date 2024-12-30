import React from "react";
import { motion } from "framer-motion";

const CTA2 = () => {
  return (
    <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
      <a
        href="javascript:void(0)"
        className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"
      >
        Browse courses
      </a>
      <a
        href="javascript:void(0)"
        className="block py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg"
      >
        Get access
      </a>
    </div>
  );
};

const CTA3 = () => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="justify-center items-center gap-x-3 sm:flex"
    >
      <input
        type="text"
        placeholder="Enter your email"
        className="w-full px-3 py-2.5 text-black bg-white focus:bg-blue-50 duration-150 outline-none rounded-lg shadow sm:max-w-sm sm:w-auto"
      />
      <button className="flex items-center justify-center gap-x-2 py-2.5 px-4 mt-3 w-full text-sm text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-lg sm:mt-0 sm:w-auto">
        Get started
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};

interface Hero2Props {
  mainTitle: string;
  mainTitleColored: string;
  subTitle: string;
}

const Hero2: React.FC<Hero2Props> = ({
  mainTitle,
  mainTitleColored,
  subTitle,
}) => {
  return (
    <section className="relative overflow-visible bg-white ">
      {/* SVG Background */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "auto",
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 500 148"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0 0C62.07 99.4 344.8 16.12 500 148H0V0Z"
            fill="currentColor"
            className="stroke-none fill-current text-teal-500"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative max-w-screen-xl mx-auto px-4 gap-12 text-gray-600 md:px-8 overflow-visible pt-12">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          {/* Animated Title */}
          <motion.h2
            className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          >
            {mainTitle} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-teal-500">
              {mainTitleColored}
            </span>
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
          >
            {subTitle}
          </motion.p>
        </div>

        {/* Animated Image */}
        <motion.div
          id="main-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="mt-14 flex flex-col gap-8"
        >
          <CTA3 />

          <div className="mockup-browser bg-white border-base-300/20 border shadow-lg rounded-lg">
            <div className="mockup-browser-toolbar"></div>
            <div className="border-base-300 flex justify-center border-t p-2">
              <img src="/hero.png" className="w-full h-full rounded" alt="" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero2;
