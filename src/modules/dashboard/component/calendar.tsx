// external library
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

// external UI component and icons
import { Dropdown } from "flowbite-react";

// types
import { srSchedule } from "@/types/dashboard";
import { LeaveDate } from "@/types/srList";

// utils
import { isPostCall } from "@/utils/calendar";

// styles
import "/src/styles/custom-calendar.css";

interface CalendarProps {
  scheduleData: srSchedule[];
  callDates: string[];
  leaveDates: LeaveDate[];
}

const Calendar: React.FC<CalendarProps> = ({
  scheduleData,
  callDates,
  leaveDates,
}) => {
  const navigate = useNavigate();

  // Current Date & Year
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  // Current active month
  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(
    new Date().getMonth()
  );

  // Track each month div elements
  const monthRefs = useRef<(HTMLDivElement | null)[]>([]);


    const handleEdit = (srScheduleData: srSchedule) => {
    navigate({
      to: `/scheduleSR/${srScheduleData.id}/edit`,
      params: { id: srScheduleData.id },
    });
  };


  // Navigating between months
  const scrollToMonth = (monthIndex: number) => {
    setActiveMonthIndex(monthIndex);
    if (monthRefs.current[monthIndex]) {
      monthRefs.current[monthIndex]?.scrollIntoView({ behavior: "instant" });
    }
  };

  // Days
  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveMonthIndex(
            monthRefs.current.findIndex((ref) => ref === visibleEntry.target)
          );
        }
      },
      { threshold: 0.5 }
    );

    // Observe all month elements
    monthRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const currentMonthIndex = currentDate.getMonth();
    const startDate = startOfWeek(startOfMonth(currentDate));

    // Find the target element or fallback to the month's container
    const targetElement =
      document.querySelector(
        `[data-date="${format(startDate, "yyyy-MM-dd")}"]`
      ) || monthRefs.current[currentMonthIndex];

    // Scroll if the target exists
    targetElement?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [currentDate]);

  // Renders Day names in a week
  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day) => (
      <div key={day} className="border p-2 text-center bg-white">
        <div className="font-semibold text-xs flex justify-center items-center ">
          {day}
        </div>
      </div>
    ));
  };

  // Renders all months in the current year
  const renderMonths = () => {
    const months = [];
    const startOfYear = new Date(currentYear, 0, 1); // January of the current year
    let monthDate = startOfYear;

    // Set to avoid duplicate Dates
    const seenDates = new Set<string>();

    // Render all 12 months of the year
    for (let i = 0; i < 12; i++) {
      months.push(
        <div key={i} ref={(el) => (monthRefs.current[i] = el)} className="mb-4">
          {renderDates(monthDate, seenDates)}
        </div>
      );
      // Increment month for the next render
      monthDate = addMonths(monthDate, 1);
    }

    return months;
  };

  // Render calendar dates
  const renderDates = (baseDate: Date, seenDates: Set<string>) => {
    // First & Last Day of the month
    const monthStart = startOfMonth(baseDate);
    const monthEnd = endOfMonth(monthStart);

    const startDate = startOfWeek(monthStart); // Start of the week for the first day
    const endDate = endOfWeek(monthEnd); // End of the week for the last day

    const days = eachDayOfInterval({ start: startDate, end: endDate }); // All the days in the interval

    return (
      <div className="mb-4">
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const dateFormatted = format(day, "yyyy-MM-dd");
            // Skip the date if it's already been seen
            if (seenDates.has(dateFormatted)) {
              return null;
            }

            // Add the date to the seen set
            seenDates.add(dateFormatted);

            // Get schedule for the date
            const scheduleForDay = scheduleData.filter(
              (schedule) => schedule.date === dateFormatted
            );

            const isPostCallDate = isPostCall(day, callDates, leaveDates);

            const leaveSessions = leaveDates
              .filter((leave) => leave.date === dateFormatted)
              .map((leave) => leave.session);

            return (
              <div
                key={index}
                className="cursor-pointer border h-[140px] bg-white"
                data-date={format(day, "yyyy-MM-dd")} // Add the data-date attribute
              >
                <div className="flex items-center pl-3 pt-2 rounded-full text-2xs">
                  {format(day, "d")}
                </div>

                {/* Schedule Information */}
                <div className="relative group">
                  <div>
                    {scheduleForDay.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {scheduleForDay
                          .sort((am, pm) =>
                            am.session === "AM" && pm.session !== "AM" ? -1 : 1
                          )
                          .map((sessionData, index) => (
                            <div
                              key={index}
                              className={`m-2 p-1.5 pl-3 mt-0 text-dashboard-text-text rounded-md flex flex-col lg:flex-row justify-between  ${
                                sessionData.session === "AM"
                                  ? "bg-dashboard-AM hover:bg-[#cdf8df]"
                                  : "bg-dashboard-PM hover:bg-[#d4d4f9]"
                              }`}
                              onClick={() => handleEdit(sessionData)}
                            >
                              <div className="flex flex-col ">
                                <p className="font-semibold text-2xs">
                                  {sessionData.dcdScreener}
                                </p>

                                <p className="text-3xs font-light xl:flex hidden">
                                  {sessionData.activity}
                                </p>
                              </div>

                              <div className="hidden xl:flex">

                                {sessionData.room && (
                                <div className="bg-dashboard-room text-3xs rounded-md font-normal text-white flex items-center justify-center self-start lg:self-center p-1 lg:mr-3 lg:mb-0">
                                  {sessionData.room}
                                </div>
                                )}

                                {sessionData.srRoom && (
                                  <div className="bg-dashboard-active rounded-md text-3xs font-normal text-white flex items-center justify-center self-start lg:self-center p-1 lg:mr-4">
                                    {sessionData.srRoom}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Post Call or Leave Info */}
                  <div className="ml-4 text-2xs">
                    {leaveSessions.length > 0 ? (
                      leaveSessions.map((session) => (
                        <p
                          key={session}
                          className="text-blue-500 font-semibold"
                        >
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
          })}
        </div>
      </div>
    );
  };

  // Render navigation buttons for each month
  const renderMonthNavigation = () => {
    const months = Array.from({ length: 12 }, (_, i) =>
      format(new Date(currentDate.getFullYear(), i, 1), "MMMM")
    );

    const handleMonthChange = (selectedMonth: number) => {
      setCurrentDate(new Date(currentDate.getFullYear(), selectedMonth, 1));
      scrollToMonth(selectedMonth);
    };

    return (
      <div className="relative inline-block calendar-dropdown-button ">
        <Dropdown
          label={
            <span className="text-2xs p-1 text-black">
              {months[activeMonthIndex]}
            </span>
          }
          color="gray"
          size="xs"
          className="transition-none "
        >
          <div className="max-h-40 overflow-y-auto">
            {months.map((month, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleMonthChange(index)}
                className="cursor-pointer text-2xs hover:bg-gray-200 p-2 calendar-dropdown-item"
              >
                {month}
              </Dropdown.Item>
            ))}
          </div>
        </Dropdown>
      </div>
    );
  };

  const renderYearNavigation = () => {
    const currentYearRange = Array.from(
      { length: 10 }, // Number of years you want to show before and after current year
      (_, i) => currentYear - 5 + i
    );

    const handleYearChange = (selectedYear: number) => {
      setCurrentYear(selectedYear);
      setCurrentDate(new Date(selectedYear, activeMonthIndex, 1));
      scrollToMonth(activeMonthIndex);
    };

    return (
      <div className="flex items-center calendar-dropdown-button">
        <Dropdown
          label={<span className="text-2xs p-1 text-black">{currentYear}</span>}
          color="gray"
          size="xs"
          className="transition-none"
        >
          <div className="max-h-40 overflow-y-auto">
            {currentYearRange.map((year) => (
              <Dropdown.Item
                key={year}
                onClick={() => handleYearChange(year)}
                className="cursor-pointer text-2xs hover:bg-gray-200 p-2 calendar-dropdown-item"
              >
                {year}
              </Dropdown.Item>
            ))}
          </div>
        </Dropdown>
      </div>
    );
  };

  return (
    <div>
      <header className="flex justify-between  p-3 bg-white mb-3 rounded-xl space-x-2 ">
        <div>
          <button
            onClick={() => {
              const today = new Date();
              setCurrentDate(today);
              setActiveMonthIndex(today.getMonth());
              setCurrentYear(today.getFullYear());
              scrollToMonth(today.getMonth());
            }}
            className="p-1 px-3 text-2xs  text-black rounded transition duration-200 border-sidebar-border border"
          >
            Today
          </button>
        </div>

        <div className="flex space-x-3">
          {renderMonthNavigation()}
          {renderYearNavigation()}
        </div>
      </header>

      <div className="grid grid-cols-7">{renderDaysOfWeek()}</div>
      <div className="overflow-y-auto w-full h-[710px] hide-scrollbar">
        {renderMonths()}
      </div>
    </div>
  );
};

export default Calendar;
