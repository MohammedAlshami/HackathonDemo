import React from "react";

const DayItem = ({ day, isCurrentMonth }: { day: number; isCurrentMonth: boolean }) => (
  <div
    className={`flex xl:aspect-square max-xl:min-h-[60px] p-3.5 ${
      isCurrentMonth ? "bg-white cursor-pointer hover:bg-indigo-50" : "bg-gray-50"
    } border-r border-b border-indigo-200 transition-all duration-300`}
  >
    <span className={`text-xs font-semibold ${isCurrentMonth ? "text-gray-900" : "text-gray-400"}`}>
      {day}
    </span>
  </div>
);

const EventCard = ({ event }: { event: Event }) => (
  <div className="p-6 rounded-xl bg-white">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2.5">
        <span className={`w-2.5 h-2.5 rounded-full ${event.color}`}></span>
        <p className="text-base font-medium text-gray-900">{event.date}</p>
      </div>
      <div className="dropdown relative inline-flex">
        <button
          type="button"
          data-target={`dropdown-${event.id}`}
          className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-purple-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="4"
            viewBox="0 0 12 4"
            fill="none"
          >
            <path
              d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707"
              stroke="currentcolor"
              strokeWidth="2.5"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
        <div
          id={`dropdown-${event.id}`}
          className="dropdown-menu rounded-xl shadow-lg bg-white absolute top-full -left-10 w-max mt-2 hidden"
        >
          <ul className="py-2">
            <li>
              <a
                className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium"
                href="#"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium"
                href="#"
              >
                Remove
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <h6 className="text-xl leading-8 font-semibold text-black mb-1">{event.title}</h6>
    <p className="text-base font-normal text-gray-600">{event.description}</p>
  </div>
);

const CalendarUI = () => {
  const days = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: i >= 5 && i < 27,
  }));

  const events: Event[] = [
    {
      id: 1,
      date: "Jan 10, 2020 - 10:00 - 11:00",
      title: "Meeting with friends",
      description: "Meet-Up for Travel Destination Discussion",
      color: "bg-purple-600",
      time: "10:00 - 11:00",
    },
    {
      id: 2,
      date: "Jan 10, 2020 - 05:40 - 13:00",
      title: "Visiting online course",
      description: "Check updates for design course",
      color: "bg-sky-400",
      time: "05:40 - 13:00",
    },
    {
      id: 3,
      date: "Jan 14, 2020 - 10:00 - 11:00",
      title: "Development meet",
      description: "Discussion with developers for upcoming project",
      color: "bg-emerald-600",
      time: "10:00 - 11:00",
    },
  ];

  return (
    <section className="relative bg-stone-50">
      <div className="w-full py-24 relative z-10 backdrop-blur-3xl">
        <div className="w-full max-w-7xl mx-auto px-2 lg:px-8">
          <div className="grid grid-cols-12 gap-8 max-w-4xl mx-auto xl:max-w-full">
            {/* Left Section: Upcoming Events */}
            <div className="col-span-12 xl:col-span-5">
              <h2 className="font-manrope text-3xl leading-tight text-gray-900 mb-1.5">
                Upcoming Events
              </h2>
              <p className="text-lg font-normal text-gray-600 mb-8">Don’t miss schedule</p>
              <div className="flex gap-5 flex-col">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
            {/* Right Section: Calendar */}
            <div className="col-span-12 xl:col-span-7 px-2.5 py-5 sm:p-8 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-5">
                  <button
                    className="flex items-center justify-center bg-white w-10 h-10 rounded-full border border-indigo-200"
                    aria-label="Previous Month"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      className="w-5 h-5 text-black"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.25 19.25L8.75 12l6.5-7.25" />
                    </svg>
                  </button>
                  <div>
                    <h6 className="text-xl font-medium text-black mb-0.5">January 2020</h6>
                    <p className="text-sm font-normal text-gray-600">Tuesday, Jan 10</p>
                  </div>
                  <button
                    className="flex items-center justify-center bg-white w-10 h-10 rounded-full border border-indigo-200"
                    aria-label="Next Month"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      className="w-5 h-5 text-black"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.75 4.75l6.5 7.25-6.5 7.25" />
                    </svg>
                  </button>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  {["Days", "Months", "Weeks"].map((label) => (
                    <button
                      key={label}
                      className={`py-2.5 px-4 rounded-lg text-sm font-medium ${
                        label === "Days" ? "bg-indigo-600 text-white" : "text-gray-600"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-7 gap-0">
                {days.map(({ day, isCurrentMonth }) => (
                  <DayItem key={day} day={day} isCurrentMonth={isCurrentMonth} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarUI;
