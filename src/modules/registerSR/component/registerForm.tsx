import CalendarModel from "@/component/CalendarModel";
import { formatDate } from "@/utils/formatter";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "/src/styles/custom-calendar.css";

//---------
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";

const RegisterForm = () => {
  const [selectedDates, setSelectedDates] = useState<{
    dates: Date[];
    reasons: string[];
    sessions: string[];
  }>({ dates: [], reasons: [], sessions: [] });
  const [isCallDateOpen, setIsCallDateOpen] = useState(false);

  const handleCallDateChange = (data: {
    dates: Date[];
    reasons: string[];
    sessions: string[];
  }) => {
    setSelectedDates(data);
  };

  const [postingPeriod, setPostingPeriod] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [isPostingPeriodOpen, setIsPostingPeriodOpen] = useState(false);

  const handleDateRangeChange = (ranges: any) => {
    const { startDate, endDate } = ranges.selection; // Extract the selected range
    setPostingPeriod({ ...postingPeriod, startDate, endDate }); // Update state
  };

  return (
    <div className="w-full">
      <form className="space-y-4">
        <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label mb-2">
            Posting Period
          </label>
          <button
            type="button"
            onClick={() => setIsPostingPeriodOpen(true)}
            className="text-left w-full text-black text-xs border rounded-md border-form-label p-2"
          >
            {postingPeriod.startDate && postingPeriod.endDate
              ? `${formatDate(postingPeriod.startDate)} - ${formatDate(postingPeriod.endDate)}`
              : "Select Date Range"}
          </button>

          {isPostingPeriodOpen && (
            <div className="absolute z-10">
              <DateRange
                editableDateInputs={true}
                onChange={handleDateRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={[postingPeriod]}
                className="custom-calendar"
              />

              <button
                type="button"
                className="mt-2 text-xs bg-gray-200 px-3 py-1 rounded-md"
                onClick={() => setIsPostingPeriodOpen(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <div>
            <img
              src="./assets/images/avatar.png"
              alt="Senior Resident Icon"
              className="w-11 rounded-full"
            />
          </div>

          <div className="flex flex-col space-y-2 w-full">
            <label className="text-xs font-medium text-form-label">
              Senior Resident
            </label>

            <input
              type="text"
              placeholder="Enter Senior Resident Name"
              className="border border-form-label rounded-md w-full text-xs p-2 "
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col flex-1 mr-3 space-y-2">
            <label className="text-xs font-medium text-form-label">MCR</label>
            <input
              type="text"
              placeholder="Enter MCR"
              className="border border-form-label rounded-md w-full text-xs p-2 placeholder-form-placeholder placeholder:text-2xs placeholder:xl:text-xs "
            />
          </div>

          <div className="flex flex-col flex-1 space-y-2 ">
            <label className="text-xs font-medium text-form-label">
              Mobile
            </label>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              className="border border-form-label rounded-md w-full text-xs p-2 placeholder-form-placeholder placeholder:text-2xs placeholder:xl:text-xs "
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label">Email</label>
          <input
            type="text"
            placeholder="Enter Email"
            className="border border-form-label rounded-md w-full text-xs p-2 placeholder-form-placeholder placeholder:text-2xs placeholder:xl:text-xs "
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col flex-1">
            <label className="text-xs font-medium text-form-label mb-2">
              Commitment
            </label>
            <button
              type="button"
              onClick={() => setIsCallDateOpen(true)}
              className="text-left w-full text-black text-xs border rounded-md border-form-label p-2"
            >
              {selectedDates.dates.length > 0
                ? selectedDates.dates.map((date, index) => (
                    <div key={index} className="flex space-x-2  items-center">
                      <div className="bg-amber-200 rounded-lg p-2 font-semibold text-form-text flex space-x-3">
                        <p>{formatDate(date)}</p>
                        <p>{selectedDates.reasons[index]}</p>
                        <p>{selectedDates.sessions[index]}</p>
                      </div>
                    </div>
                  ))
                : "Select Date"}
            </button>

            <div>
              <CalendarModel
                isOpen={isCallDateOpen}
                onClose={() => setIsCallDateOpen(false)}
                selectedDate={selectedDates.dates}
                onDateChange={handleCallDateChange}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label">
            No. of DCD sessions after deducting leaves and workshop
          </label>
          <input
            type="text"
            placeholder="No. of sessions"
            className="border border-form-label rounded-md w-full text-xs p-2 placeholder-form-placeholder placeholder:text-2xs placeholder:xl:text-xs "
          />
        </div>

        <div className="flex flex-col space-y-2 w-full">
          <label className="text-xs font-medium text-form-label">Remarks</label>
          <input
            type="text"
            placeholder=""
            className="border border-form-label rounded-md w-full text-xs p-3 py-5  "
          />
        </div>

        <div className="flex justify-end items-end space-x-4">
          <button
            type="button"
            className="bg-white border  text-black font-medium text-xs p-2 rounded-md px-3"
          >
            Back
          </button>

          <button
            type="button"
            className="bg-sidebar-active  text-white font-medium text-xs p-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default RegisterForm;
