import React from "react";
import { useState } from "react";

const FAQ = () => {
  const [toggle, setToggle] = useState(1);

  function updateToggle(id) {
    setToggle(id);
  }

  return (
    <div
      className="max-w-screen-xl  mx-auto px-4 text-gray-600 gap-16 justify-between md:px-8 lg:flex gap-32"
      id="FAQ"
    >
      <img src="/faq1.svg" alt="" className="w-4/12" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="md:col-span-2">
          <div className="max-w-xs">
            <h2 className="text-3xl font-bold md:leading-tight dark:text-white whitespace-nowrap">
              Frequently asked questions
            </h2>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="hs-accordion-group divide-y divide-gray-200 ">
            <div className="hs-accordion pb-3 active bg-gray-50 relative  border-black/[0.1] w-auto h-auto rounded-xl p-6 border border-b-0">
              <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 ">
                What does Drangue offer?
                <svg
                  className="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 "
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <svg
                  className="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 "
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
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
              <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300">
                <p className="text-gray-600 ">
                  Drangue offers a smart technology system for detecting Fresh
                  Fruit Bunch (FFB) maturity in palm oil plantations. Our
                  solution includes AI-powered image processing, smart poles
                  with telescopic cameras, and comprehensive monitoring systems
                  for efficient plantation management.
                </p>
              </div>
            </div>

            <div className="hs-accordion pt-6 pb-3 bg-gray-50 relative     border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
              <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 ">
                What problems does Drangue address?
                <svg
                  className="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 "
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <svg
                  className="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 "
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
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
              <div className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300">
                <p className="text-gray-600 ">
                  Drangue addresses key challenges in palm oil plantations
                  including inefficient manual FFB detection methods, worker
                  health and safety issues from neck strain and fatigue, and
                  decision conflicts in fruit maturity assessment. Our solutions
                  tackle the difficulties of monitoring vast plantations with
                  high trees where traditional visual inspection is
                  time-consuming and inconsistent.
                </p>
              </div>
            </div>

            <div className="hs-accordion pt-6 pb-3 bg-gray-50 relative     border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
              <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 ">
                How does Drangue improve plantation management?
                <svg
                  className="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 "
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <svg
                  className="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 "
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
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
              <div className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300">
                <p className="text-gray-600 ">
                  Drangue implements advanced technology solutions including
                  telescopic cameras for FFB detection, AI-powered image
                  processing for maturity assessment, drone monitoring, and
                  smart poles with real-time monitoring capabilities. Our
                  management dashboard enables efficient worker tracking and
                  progress monitoring, while our lightweight smart poles
                  maintain worker comfort and safety.
                </p>
              </div>
            </div>

            <div className="hs-accordion pt-6 pb-3 bg-gray-50 relative     border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
              <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 ">
                What unique features does Drangue provide?
                <svg
                  className="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 "
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <svg
                  className="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 "
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
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
              <div className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300">
                <p className="text-gray-600 ">
                  Drangue offers unique features including AI disease detection,
                  fertilizer optimization planning, palm tree counting
                  capabilities, and advanced fruit ripeness detection models.
                  Our solution integrates hardware supplies with sophisticated
                  AI models to provide comprehensive plantation management
                  tools.
                </p>
              </div>
            </div>

            <div className="hs-accordion pt-6 pb-3 bg-gray-50 relative     border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
              <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 ">
                How can I get started with Drangue?
                <svg
                  className="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 "
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <svg
                  className="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 "
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
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
              <div className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300">
                <p className="text-gray-600 ">
                  To get started with Drangue's smart plantation management
                  system, contact us at info@drangue.com. Our team will arrange
                  a demonstration of our system and discuss how our solutions
                  can be customized to meet your plantation's specific needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
