import React from "react";

import MiniSideBar from "./MiniSideBar";
const Sidebar = ({ children }) => {
  return (
    <div className="bg-gray-50 transition-all duration-300 lg:hs-overlay-layout-open:ps-[260px] dark:bg-neutral-900">
      <div id="content">
        <div className="sticky top-0 inset-x-0 z-20 bg-white border-y  dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center py-2 bg-teal-500 p-2  py-6 ">
            <button
              type="button"
              className="size-8 flex justify-center items-center gap-x-2  border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
              aria-haspopup="dialog"
              aria-expanded="true"
              aria-controls="hs-application-sidebar"
              aria-label="Toggle navigation"
              data-hs-overlay="#hs-application-sidebar"
            >
              <span className="sr-only">Toggle Navigation</span>
              <svg
                className="shrink-0 size-4  text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M15 3v18" />
                <path d="m8 9 3 3-3 3" />
              </svg>
            </button>

            <ol className="ms-3 flex items-center whitespace-nowrap ">
              <li className="flex items-center text-sm text-white dark:text-neutral-400">
                Application Layout
                <svg
                  className="shrink-0 mx-3 overflow-visible size-2.5 text-white"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </li>
              <li
                className="text-sm font-semibold text-white truncate dark:text-neutral-400"
                aria-current="page"
              >
                Dashboard
              </li>
            </ol>
          </div>
        </div>

        <div
          id="hs-application-sidebar"
          className="hs-overlay-open hs-overlay [--body-scroll:true] lg:[--overlay-backdrop:false] [--is-layout-affect:true] [--auto-close:lg]
            hs-overlay-open:translate-x-0
            -translate-x-full transition-all duration-300 transform
            w-[260px] h-full
            hidden
            fixed inset-y-0 start-0 z-[60]
            bg-white border-e border-gray-200
        
            dark:bg-neutral-800 dark:border-neutral-700"
          role="dialog"
          tabIndex={-1}
          aria-label="Sidebar"
        >
          <div className="relative flex flex-col h-full max-h-full">
            <div className="px-6 pt-4">
              <a
                className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
                href="#"
                aria-label="Preline"
              >
                <img src="/DRANGUE_Logo.png" alt="" className="w-28 h-auto" />
              </a>
            </div>

            <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <nav
                className="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
                data-hs-accordion-always-open
              >
                <ul className="flex flex-col space-y-1">
                  <li>
                    <a
                      className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-300"
                      href="/crop/home"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        className="shrink-0 size-4 text-teal-600"
                        viewBox="0 0 24 24"
                      >
                        <defs>
                          <path
                            id="solarHomeBoldDuotone0"
                            d="M10.75 9.5a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0"
                          ></path>
                        </defs>
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="m21.532 11.586l-.782-.626v10.29H22a.75.75 0 0 1 0 1.5H2a.75.75 0 1 1 0-1.5h1.25V10.96l-.781.626a.75.75 0 1 1-.937-1.172l8.125-6.5a3.75 3.75 0 0 1 4.686 0l8.125 6.5a.75.75 0 1 1-.936 1.172M12 6.75a2.75 2.75 0 1 0 0 5.5a2.75 2.75 0 0 0 0-5.5m1.746 6.562c-.459-.062-1.032-.062-1.697-.062h-.098c-.665 0-1.238 0-1.697.062c-.491.066-.963.215-1.345.597s-.531.854-.597 1.345c-.062.459-.062 1.032-.062 1.697v4.299h7.5v-4.423c0-.612-.004-1.143-.062-1.573c-.066-.491-.215-.963-.597-1.345s-.853-.531-1.345-.597"
                          clipRule="evenodd"
                        ></path>
                        <g
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          opacity={0.5}
                        >
                          <use href="#solarHomeBoldDuotone0"></use>
                          <use href="#solarHomeBoldDuotone0"></use>
                        </g>
                        <path
                          fill="currentColor"
                          d="M12.05 13.25c.664 0 1.237 0 1.696.062c.492.066.963.215 1.345.597s.531.853.597 1.345c.058.43.062.96.062 1.573v4.423h-7.5v-4.3c0-.664 0-1.237.062-1.696c.066-.492.215-.963.597-1.345s.854-.531 1.345-.597c.459-.062 1.032-.062 1.697-.062zM16 3h2.5a.5.5 0 0 1 .5.5v4.14l-3.5-2.8V3.5A.5.5 0 0 1 16 3"
                          opacity={0.5}
                        ></path>
                      </svg>
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-300"
                      href="/crop/dashboard"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        className="shrink-0 size-4 text-teal-600"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M14 9q-.425 0-.712-.288T13 8V4q0-.425.288-.712T14 3h6q.425 0 .713.288T21 4v4q0 .425-.288.713T20 9zM4 13q-.425 0-.712-.288T3 12V4q0-.425.288-.712T4 3h6q.425 0 .713.288T11 4v8q0 .425-.288.713T10 13zm10 8q-.425 0-.712-.288T13 20v-8q0-.425.288-.712T14 11h6q.425 0 .713.288T21 12v8q0 .425-.288.713T20 21zM4 21q-.425 0-.712-.288T3 20v-4q0-.425.288-.712T4 15h6q.425 0 .713.288T11 16v4q0 .425-.288.713T10 21z"
                        ></path>
                      </svg>
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-300"
                      href="/map"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        className="shrink-0 size-4 text-teal-600"
                      >
                        <path
                          fill="currentColor"
                          d="M7.5 2.717L2 5.926V21.5l5.5-2.267zm2 16.193l3.245 1.916A6.47 6.47 0 0 1 11.5 17a6.5 6.5 0 0 1 3-5.478V5.09l-5-2.953zM22 2.5v9.376a6.52 6.52 0 0 0-5.5-1.202V4.767z"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M19 16v-4h-2v4h-4v2h4v4h2v-4h4v-2z"
                        ></path>
                      </svg>
                      map
                    </a>
                  </li>

                  <li>
                    <a
                      className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-300"
                      href="/crop/tasks"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        className="shrink-0 size-4 text-teal-600"
                        viewBox="0 0 14 14"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M.658.44A1.5 1.5 0 0 1 1.718 0h5.587a1.5 1.5 0 0 1 1.06.44l3.414 3.414a1.5 1.5 0 0 1 .44 1.06V12.5a1.5 1.5 0 0 1-1.5 1.5h-9a1.5 1.5 0 0 1-1.5-1.5v-11c0-.398.158-.78.44-1.06ZM5.33 4.527a.75.75 0 0 1 .175 1.047L4.108 7.53a.75.75 0 0 1-1.14.094l-.838-.838a.75.75 0 0 1 1.06-1.06l.212.211l.882-1.234a.75.75 0 0 1 1.046-.175Zm.95 1.847a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75m0 3.969a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75m-.775-.738a.75.75 0 1 0-1.22-.872l-.883 1.235l-.212-.212a.75.75 0 0 0-1.06 1.06l.838.838a.75.75 0 0 0 1.14-.094z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      tasks
                    </a>
                  </li>
                  <li>
                    <a
                      className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-300"
                      href="/crop/fields"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        className="shrink-0 size-4 text-teal-600"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M24 7.8C23.6 4.5 20.9 2 17.5 2c-1.7 0-3.4.7-4.6 1.9c-.7.7-1.2 1.4-1.5 2.3L17 9.9v.1h3v2h-3v2h3v2h-3v2h3v2h-3v2h7zM13.3 7c.6-1.8 2.3-3 4.2-3s3.6 1.2 4.2 3zM0 11v11h5v-7h5v7h5V11L7.5 6z"
                        ></path>
                      </svg>
                      Fields
                    </a>
                  </li>

                  <li>
                    <a
                      className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-300"
                      href="/crop/employees"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        className="shrink-0 size-4 text-teal-600"
                        viewBox="0 0 36 36"
                      >
                        <ellipse
                          cx={18}
                          cy={11.28}
                          fill="currentColor"
                          rx={4.76}
                          ry={4.7}
                        ></ellipse>
                        <path
                          fill="currentColor"
                          d="M10.78 11.75h.48v-.43a6.7 6.7 0 0 1 3.75-6a4.62 4.62 0 1 0-4.21 6.46Zm13.98-.47v.43h.48A4.58 4.58 0 1 0 21 5.29a6.7 6.7 0 0 1 3.76 5.99m-2.47 5.17a21.5 21.5 0 0 1 5.71 2a2.7 2.7 0 0 1 .68.53H34v-3.42a.72.72 0 0 0-.38-.64a18 18 0 0 0-8.4-2.05h-.66a6.66 6.66 0 0 1-2.27 3.58M6.53 20.92A2.76 2.76 0 0 1 8 18.47a21.5 21.5 0 0 1 5.71-2a6.66 6.66 0 0 1-2.27-3.55h-.66a18 18 0 0 0-8.4 2.05a.72.72 0 0 0-.38.64V22h4.53Zm14.93 5.77h5.96v1.4h-5.96z"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M32.81 21.26h-6.87v-1a1 1 0 0 0-2 0v1H22v-2.83a20 20 0 0 0-4-.43a19.3 19.3 0 0 0-9.06 2.22a.76.76 0 0 0-.41.68v5.61h7.11v6.09a1 1 0 0 0 1 1h16.17a1 1 0 0 0 1-1V22.26a1 1 0 0 0-1-1m-1 10.36H17.64v-8.36h6.3v.91a1 1 0 0 0 2 0v-.91h5.87Z"
                        ></path>
                      </svg>
                      Employees
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="px-6 py-4 bg-teal-500 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/bg.png"
                  alt=""
                  className="w-10 h-10 object-fit rounded-full"
                />
                <div className="text-white">
                  <h2 className="text-md">Shami</h2>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                className="text-white"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M6 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm10.293 5.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L18.586 13H10a1 1 0 1 1 0-2h8.586l-2.293-2.293a1 1 0 0 1 0-1.414"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* <MiniSideBar /> */}

        <div className="w-full ">
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
