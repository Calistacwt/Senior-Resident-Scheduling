import { useState } from "react";
import { srSchedule } from "@/types/dashboard";

type CalendarProps = {
  srSchedule: srSchedule[];
};

const Calendar: React.FC<CalendarProps> = ({ srSchedule }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("viewMonth");

  // Date Information
  const todayDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();

  // Get first and last day of the month
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Weekly view calculation
  const currentDayOfWeek = currentDate.getDay(); // Day of the week (0 = Sunday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDayOfWeek);

  // Array for the days of the week
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Handling moving to the previous month or week
  const handlePrevious = () => {
    if (view === "viewMonth") {
      setCurrentDate(new Date(year, month - 1, 1)); // Navigate by month
    } else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7))); // Navigate by week
    }
  };

  // Handling moving to the next month or week
  const handleNext = () => {
    if (view === "viewMonth") {
      setCurrentDate(new Date(year, month + 1, 1)); // Navigate by month
    } else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7))); // Navigate by week
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date()); // Set the currentDate back to today's date
  };

  const viewMonthDays = [];
  const viewWeeklyDays = [];

  // Monthly View
  for (let i = 0; i < startDay + daysInMonth; i++) {
    const day = i - startDay + 1; // Calculate the actual day number
    const isToday =
      day === today &&
      month === todayDate.getMonth() &&
      year === todayDate.getFullYear();

    const dateString = new Date(Date.UTC(year, month, day))
      .toISOString()
      .split("T")[0];

    // Check for SRinfo for that date
    const srData = srSchedule.filter((sr) => sr.date === dateString);

    // Push each day into the viewMonthDays
    viewMonthDays.push(
      <div
        key={i}
        className={`md:h-28 lg:h-40 p-2 cursor-pointer border ${
          isToday ? "border-[#5ca3ff]" : "border-dashboard-border"
        } ${day > 0 ? "hover:bg-sidebar-hover bg-white" : ""}`} // Empty for leading days
      >
        {day > 0 && (
          <div
            className={`h-6 w-6 flex items-center justify-center rounded-full text-xs font-medium ${
              isToday
                ? "bg-dashboard-active text-white "
                : "text-dashboard-text"
            }`}
          >
            {day}
          </div>
        )}

        {/* Display SR Schedule for the day */}
        {srData.length > 0 && day > 0 && (
          <div className="space-y-2 ">
            {/* Sort the data if its AM it will move up -1 */}
            {srData
              .sort((am, pm) =>
                am.session === "AM" && pm.session !== "AM" ? -1 : 1,
              )
              .map((sessionData, index) => (
                <div
                  key={index}
                  className={`text-dashboard-text-text rounded-md flex flex-col lg:flex-row justify-between ${
                    sessionData.session === "AM"
                      ? "bg-dashboard-AM"
                      : "bg-dashboard-PM"
                  }`}
                >
                  <div className="m-2 flex flex-col space-y-1">
                    <p className="font-medium text-2xs">
                      {sessionData.dcdScreener}
                    </p>
                    <p className="text-2xs font-light md:hidden lg:block">
                      {sessionData.activity}
                    </p>
                  </div>

                  <div className="flex lg:flex-col lg:space-y-1 lg:m-1 p-0.5 md:hidden lg:block">
                    <div className="bg-dashboard-room rounded-sm text-3xs font-semibold text-white flex items-center justify-center self-start lg:self-center p-0.5 ml-1 mb-2 lg:mr-4 lg:mb-0">
                      {sessionData.room}
                    </div>

                    <div className="bg-[#EC88B3] rounded-sm text-3xs font-semibold text-white flex items-center justify-center self-start lg:self-center p-0.5 ml-1 mb-2 lg:mr-4 lg:mb-0">
                      {sessionData.srRoom}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>,
    );
  }

  // Weekly View
  for (let i = 0; i < 7; i++) {
    const weekDayDate = new Date(startOfWeek);
    weekDayDate.setDate(startOfWeek.getDate() + i);
    const isToday = weekDayDate.toDateString() === todayDate.toDateString();

    viewWeeklyDays.push(
      <div
        key={i}
        onClick={() => setCurrentDate(weekDayDate)}
        className={`md:h-20 lg:h-32 p-2 cursor-pointer border bg-white hover:bg-sidebar-hover ${
          isToday ? "border-[#5ca3ff]" : "border-dashboard-border"
        }`} // Empty for leading days
      >
        <div
          className={`h-6 w-6 flex items-center justify-center rounded-full text-xs font-medium ${
            isToday ? "bg-[#F485B8] text-white" : "text-dashboard-text"
          }`}
        >
          {weekDayDate.getDate()}
        </div>
      </div>,
    );
  }

  return (
    <div>
      {/* Start of Header */}
      <header className="flex items-center justify-between p-3 bg-white mb-3 rounded-xl mt-5 ">
        <div>
          <button
            onClick={handleToday}
            className="text-xs border border-borderColor rounded p-1.5 font-semibold"
          >
            Today
          </button>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <button onClick={handlePrevious} className="text-xs">
            <img
              src="/assets/images/backArrow.png"
              alt="Next Logo"
              className="w-5 cursor-pointer flex items-center justify-center border border-dashboard-border rounded"
            />
          </button>

          <h1 className="font-semibold text-xs">
            {`${currentDate.toLocaleString("default", { month: "long" })} ${year}`}{" "}
          </h1>

          <button onClick={handleNext} className="text-xs">
            <img
              src="/assets/images/nextArrow.png"
              alt="Next Logo"
              className="w-5 cursor-pointer border border-dashboard-border rounded"
            />
          </button>
        </div>

        {/* Change Month or Week View */}
        <div className="flex">
          <div className="flex border-dashboard-border border rounded-md">
            <button
              onClick={() => setView("viewMonth")}
              className={`text-xs p-1.5  px-3 font-medium ${view === "viewMonth" ? "bg-sidebar-active text-white rounded-md" : ""}`}
            >
              Month
            </button>
            <button
              onClick={() => setView("weekly")}
              className={`text-xs  p-1.5  px-3   font-medium ${view === "weekly" ? "bg-sidebar-active text-white rounded-md" : ""}`}
            >
              Week
            </button>
          </div>
        </div>
      </header>
      {/* End of Header */}

      <div className="flex items-end space-x-2 mb-2">
        <div className="w-20 text-center text-2xs  font-semibold bg-dashboard-AM p-1 rounded-md">
          <p>AM</p>
        </div>

        <div className="w-20 text-center text-2xs font-semibold bg-dashboard-PM p-1 rounded-md">
          <p>PM</p>
        </div>
      </div>

      <div className="grid grid-cols-7">
        {/* Render the days of the week */}
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="font-semibold text-center text-xs border  border-dashboard-border  bg-white p-3  "
          >
            {day}
          </div>
        ))}

        {view === "viewMonth" ? viewMonthDays : viewWeeklyDays}
      </div>

      {/* Card Detail  */}
      {view === "weekly" && currentDate && (
        <div className=" flex flex-col xl:flex-row justify-evenly items-center p-2 space-y-8 xl:space-y-0 mt-20">
          {/* AM Card */}
          <div className="bg-white p-8 pt-4 rounded-md w-auto">
            <div className="flex justify-between items-center space-x-32 ">
              <div className="">
                <img
                  src={"/assets/images/KKHlogo.svg"}
                  alt="KKH Logo"
                  className="rounded-md w-36"
                />
              </div>

              <div className="text-right">
                <h2 className="text-xs font-bold">
                  {currentDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h2>
                <h5 className="font-semibold  text-xs text-card-text">
                  AM Session
                </h5>
              </div>
            </div>

            <hr className="border border-[#F485B8]" />

            <div className="flex space-x-4 m-3">
              <div className="flex items-center">
                <img
                  src={"/assets/images/avatar.png"}
                  alt="Avatar Logo"
                  className="rounded-md w-9"
                />
              </div>
              <div className="space-y-1">
                <label className="text-card-text font-semibold text-xs">
                  Senior Resident
                </label>
                <p className="font-semibold text-xs">Senior 2</p>
              </div>
            </div>

            <div className="m-3 flex justify-between">
              <div className="space-y-1">
                <label className="text-card-text font-semibold text-xs">
                  DCD DR/screener
                </label>
                <p className="font-semibold text-xs">-</p>
              </div>

              <div className="space-y-1">
                <label className="text-card-text font-semibold text-xs">
                  Room
                </label>
                <p className="font-semibold text-xs">-</p>
              </div>

              <div className="space-y-1">
                <label className="text-card-text font-semibold text-xs">
                  SR Room
                </label>
                <p className="font-semibold text-xs">-</p>
              </div>
            </div>

            <div className="m-3">
              <div className="space-y-1">
                <label className="text-card-text font-semibold text-xs">
                  Activity
                </label>
                <p className="font-semibold text-xs">-</p>
              </div>
            </div>
          </div>

          {/* PM Card */}
          <div className="bg-white p-8 pt-4 rounded-md w-auto">
            <div className="flex justify-between items-center space-x-32">
              <div className="">
                <img
                  src={"/assets/images/KKHlogo.svg"}
                  alt="KKH Logo"
                  className="rounded-md w-36"
                />
              </div>

              <div className="text-right">
                <h2 className="text-xs font-bold">
                  {currentDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h2>
                <h5 className="font-semibold text-xs text-card-text">
                  PM Session
                </h5>
              </div>
            </div>

            <hr className="border border-sidebar-active" />

            <div className="flex space-x-4 m-3">
              <div className="flex items-center">
                <img
                  src={"/assets/images/avatar.png"}
                  alt="Avatar Logo"
                  className="rounded-md w-9"
                />
              </div>
              <div className="space-y-1">
                <label className="text-card-text font-semibold text-xs">
                  Senior Resident
                </label>
                <p className="font-semibold text-xs">Senior 2</p>
              </div>
            </div>

            <div className="m-3 flex justify-between">
              <div className="space-y-1">
                <label className="text-card-text font-semibold text-xs">
                  DCD DR/screener
                </label>
                <p className="font-semibold text-xs">-</p>
              </div>

              <div className="space-y-1">
                <label className="text-card-text font-semibold text-xs">
                  Room
                </label>
                <p className="font-semibold text-xs">-</p>
              </div>

              <div className="space-y-1">
                <label className="text-card-text font-semibold text-xs">
                  SR Room
                </label>
                <p className="font-semibold text-xs">-</p>
              </div>
            </div>

            <div className="m-3">
              <div className="space-y-1">
                <label className="text-card-text font-semibold text-xs">
                  Activity
                </label>
                <p className="font-semibold text-xs">-</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End of Card Detail  */}
    </div>
  );
};

export default Calendar;
