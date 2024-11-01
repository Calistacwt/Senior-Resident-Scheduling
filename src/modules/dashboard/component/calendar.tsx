import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("viewMonth");

  // Date Information
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();

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

  const handlePreviousMonth = () => {
    if (view === "viewMonth") {
      setCurrentDate(new Date(year, month - 1, 1)); // Navigate by month
    } else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7))); // Navigate by week
    }
  };

  const handleNextMonth = () => {
    if (view === "viewMonth") {
      setCurrentDate(new Date(year, month + 1, 1)); // Navigate by month
    } else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7))); // Navigate by week
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date()); // Set the currentDate back to today's date
  };

  // Month layout
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  // Get the starting day (0 = Sunday, 1 = Monday, etc.)
  const startDay = firstDayOfMonth.getDay();

  // Array to represent the days of the month
  const viewMonthDays = [];
  // Empty Slots at the start of the month
  for (let i = 0; i < startDay; i++) {
    viewMonthDays.push(
      <div
        key={`empty-${i}`}
        className=" border border-dashboard-border "
      ></div>,
    );
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday =
      day === today &&
      month === new Date().getMonth() && // Check if the month is the current month
      year === new Date().getFullYear(); // Check if the year is the current year

    viewMonthDays.push(
      <div
        key={day}
        className={`md:h-20 lg:h-32 p-2 cursor-pointer border border-dashboard-border ${
          isToday
            ? "hover:bg-sidebar-hover bg-white "
            : "hover:bg-sidebar-hover bg-white"
        }`}
      >
        <div
          className={`h-6 w-6 flex items-center justify-center rounded-full text-xxs font-medium ${
            isToday ? "bg-[#F485B8] text-white" : "text-dashboard-text"
          }`}
        >
          {day}
        </div>
      </div>,
    );
  }

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  const weeklyDays = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    const isToday = date.toDateString() === new Date().toDateString(); // Check if it's the current date
    const isPreviousMonth =
      date.getMonth() < currentDate.getMonth() ||
      (currentDate.getMonth() === 0 &&
        date.getMonth() === 11 &&
        date.getFullYear() < currentDate.getFullYear());

    weeklyDays.push(
      <div
        key={i}
        className={`md:h-20 lg:h-32 p-2 cursor-pointer border border-dashboard-border ${
          isToday
            ? "hover:bg-sidebar-hover bg-white"
            : "hover:bg-sidebar-hover bg-white"
        } ${isPreviousMonth ? "bg-[#F7F7F7]" : ""}`} // Gray out previous month days
      >
        <div
          className={`h-6 w-6 flex items-center justify-center rounded-full font-medium text-xxs ${
            isToday ? "bg-dashboard-active text-white" : "text-dashboard-text"
          }`}
        >
          {date.getDate()}
        </div>
      </div>,
    );
  }

  return (
    <div>
      <header className="flex items-center justify-between p-3 bg-white mb-3 rounded-xl ">
        <div>
          <button
            onClick={handleToday}
            className="text-xxs border border-borderColor rounded p-1 font-semibold"
          >
            Today
          </button>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <button onClick={handlePreviousMonth} className="text-xs">
            <img
              src="/assets/images/backArrow.png"
              alt="Next Logo"
              className="w-5 cursor-pointer flex items-center justify-center border border-dashboard-border rounded"
            />
          </button>

          <h1 className="font-semibold text-xs">
            {`${currentDate.toLocaleString("default", { month: "long" })} ${year}`}{" "}
          </h1>

          <button onClick={handleNextMonth} className="text-xs">
            <img
              src="/assets/images/nextArrow.png"
              alt="Next Logo"
              className="w-5 cursor-pointer border border-dashboard-border rounded"
            />
          </button>
        </div>

        {/* Change Month or Week View */}
        <div className="flex border-dashboard-border border rounded-md">
          <button
            onClick={() => setView("viewMonth")}
            className={`text-xxs p-1 px-2 font-medium ${view === "viewMonth" ? "bg-sidebar-active text-white rounded-md" : ""}`}
          >
            Month
          </button>
          <button
            onClick={() => setView("weekly")}
            className={`text-xxs  p-1  px-2   font-medium ${view === "weekly" ? "bg-sidebar-active text-white rounded-md" : ""}`}
          >
            Week
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7">
        {/* Render the days of the week */}
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="font-bold text-center text-xs border  border-dashboard-border  bg-white p-3  "
          >
            {day}
          </div>
        ))}

        {view === "viewMonth" ? viewMonthDays : weeklyDays}
      </div>
    </div>
  );
};

export default Calendar;
