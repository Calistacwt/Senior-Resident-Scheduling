import { useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { srSchedule } from "@/types/dashboard";

interface CalendarProps {
  scheduleData: srSchedule[];
  callDates: string[];
  leaveDates: string[];
}

const Calendar: React.FC<CalendarProps> = ({
  scheduleData,
  callDates,
  leaveDates,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<string>("month");
  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const isPostCall = (date: Date): boolean => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() - 1); // Add one day

    const formattedNextDay = format(nextDay, "dd MMMM yyyy");
    return callDates.includes(formattedNextDay);
  };

  const isLeaveDay = (date: Date, session: string): boolean => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const formattedLeaveDate = `${formattedDate} ${session}`;
    return leaveDates.includes(formattedLeaveDate);
  };

  const prevMonth = () => {
    if (viewMode === "month") {
      const newDate = subMonths(currentDate, 1);
      setCurrentDate(newDate);
    } else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7))); // Navigate by week
    }
  };

  const nextMonth = () => {
    if (viewMode === "month") {
      const newDate = addMonths(currentDate, 1);
      setCurrentDate(newDate);
    } else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7))); // Navigate by week
    }
  };

  // Set the currentDate back to today's date
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Render Days
  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day) => (
      <div key={day} className="border p-2 text-center bg-white">
        <div className="w-42 h-8 font-semibold text-sm flex justify-center items-center ">
          {day}
        </div>
      </div>
    ));
  };

  const dateFormatted = format(currentDate, "dd-MM-yyyy");

  // Render Dates
  const renderDates = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate =
      viewMode === "month" ? startOfWeek(monthStart) : startOfWeek(currentDate);
    const endDate =
      viewMode === "month" ? endOfWeek(monthEnd) : endOfWeek(currentDate);

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return days.map((day, index) => {
      const isCurrentDay = isToday(day);
      const dateFormatted = format(day, "dd-MM-yyyy");

      // Find matching schedules for the current day
      const scheduleForDay = scheduleData.filter(
        (schedule) => schedule.date === dateFormatted,
      );

      const isPostCallDate = isPostCall(day);
      const leaveSessions = ["AM", "PM", "FULLDAY"].filter((session) =>
        isLeaveDay(day, session),
      );

      return (
        <div
          key={index}
          onClick={() => setCurrentDate(day)}
          className={`cursor-pointer border text-left text-xs ${
            !isSameMonth(day, monthStart) && viewMode === "month"
              ? "bg-neutral-50"
              : "bg-white"
          } h-40 ${
            !isSameMonth(day, monthStart) && viewMode === "month"
              ? "text-dashboard-text"
              : ""
          }`}
        >
          <div className="p-1">
            <div
              className={`flex items-center justify-center rounded-full ${isCurrentDay ? "text-white" : ""} h-8 w-8 ${
                isCurrentDay ? "bg-dashboard-active" : ""
              }`}
            >
              {format(day, "d")}
            </div>
          </div>

          {/* Display schedule details if available */}
          <div className="relative group">
            <div>
              {scheduleForDay.length > 0 && (
                <div className="space-y-2">
                  {scheduleForDay
                    .sort((am, pm) =>
                      am.session === "AM" && pm.session !== "AM" ? -1 : 1,
                    )
                    .map((sessionData, index) => (
                      <div
                        key={index}
                        className={`text-dashboard-text-text rounded-md flex flex-col lg:flex-row justify-between ml-2 mr-2 ${
                          sessionData.session === "AM"
                            ? "bg-dashboard-AM"
                            : "bg-dashboard-PM"
                        }`}
                      >
                        <div className="m-2 flex flex-col space-y-1">
                          <p className="font-medium text-2xs xl:text-xs">
                            {sessionData.dcdScreener}
                          </p>

                          <p className="text-xs font-light hidden xl:flex">
                            {sessionData.activity}
                          </p>
                        </div>

                        <div className="lg:flex-col lg:space-y-1 lg:m-1 hidden xl:flex ">
                          <div className="bg-dashboard-room text-2xs rounded-sm font-normal text-white flex items-center justify-center self-start lg:self-center p-0.5 lg:mr-4 lg:mb-0">
                            {sessionData.room}
                          </div>

                          <div className="bg-dashboard-active rounded-sm text-2xs font-normal text-white flex items-center justify-center self-start lg:self-center p-0.5 lg:mr-4 lg:mb-0">
                            {sessionData.srRoom}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Post Call or Leave Info */}
            <div className="ml-4 text-xs">
              {leaveSessions.length > 0 ? (
                leaveSessions.map((session) => (
                  <p key={session} className="text-blue-500 font-semibold">
                    On-Leave ({session})
                  </p>
                ))
              ) : isPostCallDate ? (
                <p className="text-red-500 font-semibold">Post Call</p>
              ) : null}
            </div>

          </div>
        </div>
      );
    });
  };

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
          <button onClick={prevMonth}>
            <img
              src="/assets/images/backArrow.png"
              alt="Next Logo"
              className="w-5 cursor-pointer flex items-center justify-center border border-dashboard-border rounded"
            />
          </button>

          <h1 className="font-semibold text-xs">
            {format(currentDate, "MMMM yyyy")}
          </h1>

          <button onClick={nextMonth}>
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
              onClick={() => setViewMode("month")}
              className={`text-xs p-1.5 px-3 font-medium ${
                viewMode === "month" ? "bg-sidebar-active text-white" : ""
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`text-xs p-1.5 px-3 font-medium ${
                viewMode === "week" ? "bg-sidebar-active text-white" : ""
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </header>
      {/* End of Header */}

      <div className="grid grid-cols-7">
        {renderDaysOfWeek()}
        {renderDates()}
      </div>

      {/* Card Detail  */}
      {viewMode === "week" && currentDate && (
        <div className="flex flex-col xl:flex-row justify-evenly items-center p-2 space-y-8 xl:space-y-0 mt-20">
          {["AM", "PM"].map((session) => {
            // Filter schedule data for the current date and session
            const filteredData = scheduleData.filter(
              (schedule) =>
                schedule.date === dateFormatted && schedule.session === session,
            );

            return (
              <div
                key={session}
                className="bg-white p-8 pt-4 rounded-md w-auto"
              >
                <div className="flex justify-between items-center space-x-32">
                  <div>
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
                      {session} Session
                    </h5>
                  </div>
                </div>

                <hr
                  className={`border ${session === "AM" ? "border-dashboard-active" : "border-dashboard-room"}`}
                />

                {filteredData.length > 0 ? (
                  filteredData.map((sessionData, index) => (
                    <div key={index}>
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
                          <p className="font-semibold text-xs">
                            {sessionData.dcdScreener || "-"}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <label className="text-card-text font-semibold text-xs">
                            Room
                          </label>
                          <p className="font-semibold text-xs">
                            {sessionData.room || "-"}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <label className="text-card-text font-semibold text-xs">
                            SR Room
                          </label>
                          <p className="font-semibold text-xs">
                            {sessionData.srRoom || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="m-3">
                        <div className="space-y-1">
                          <label className="text-card-text font-semibold text-xs">
                            Activity
                          </label>
                          <p className="font-semibold text-xs">
                            {sessionData.activity || "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-xs text-gray-500 m-3">
                    No data available for this session
                  </p>
                )}
              </div>
            );
          })}
          {/* End of Card Detail  */}
        </div>
      )}
    </div>
  );
};

export default Calendar;
