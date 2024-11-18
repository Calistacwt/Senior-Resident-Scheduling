import DateModal from "@/component/DateModal";
import { formatDate } from "@/utils/formatter";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "/src/styles/custom-calendar.css";

const RegisterForm = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedLeaveDate, setSelectedLeaveDate] = useState<Date[]>([]);
  const [isCallDateOpen, setIsCallDateOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);

  const handleCallDateChange = (dates: Date[]) => {
    setSelectedDates(dates);
    setIsCallDateOpen(false);
  };

  const handleLeaveChange = (dates: Date[]) => {
    setIsLeaveOpen(false);
    setSelectedLeaveDate(dates);
  };

  return (
    <div className="w-full">
      <form className="space-y-4">
        <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label">
            Posting Period
          </label>

          <select
            className="text-black text-2xs xl:text-xs border rounded-md w-full border-form-label focus:border-indigo-500 p-2.5"
            defaultValue=""
          >
            <option disabled value="" hidden className="text-form-placeholder">
              Select Date
            </option>
            <option className="text-black">01 July 2024 - 31 July 2024</option>
          </select>

          {/* <DatePicker inline calendarClassName="custom-calendar" />  */}
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

            <select
              className="text-black text-2xs xl:text-xs border rounded-md w-full border-form-label focus:border-indigo-500 p-2.5"
              defaultValue=""
            >
              <option
                disabled
                value=""
                hidden
                className="text-form-placeholder"
              >
                Select Senior Resident
              </option>
              <option className="text-black">Senior 2</option>
            </select>
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
          <div className="flex flex-col flex-1 mr-3  ">
            <label className="text-xs font-medium text-form-label mb-2">
              Call Dates
            </label>
            <button
              type="button"
              onClick={() => setIsCallDateOpen(true)}
              className="text-left w-full text-black text-xs border rounded-md border-form-label p-2"
            >
              {selectedDates.length > 0 ? (
                selectedDates.map((date) => formatDate(date)).join(", ")
              ) : (
                <span className="text-form-placeholder text-2xs xl:text-xs">
                  Select Date
                </span>
              )}
            </button>

            <div>
              <DateModal
                isOpen={isCallDateOpen}
                onClose={() => setIsCallDateOpen(false)}
                selectedDate={selectedDates}
                onDateChange={handleCallDateChange}
                title="Call Dates"
              />
            </div>
          </div>

          <div className="flex flex-col flex-1   ">
            <label className="text-xs font-medium text-form-label mb-2">
              Leave
            </label>
            <button
              type="button"
              onClick={() => setIsLeaveOpen(true)}
              className="text-left w-full text-black text-xs border rounded-md border-form-label p-2"
            >
              {selectedLeaveDate.length > 0 ? (
                selectedLeaveDate.map((date) => formatDate(date)).join(", ")
              ) : (
                <span className="text-form-placeholder text-2xs xl:text-xs">
                  Select Date
                </span>
              )}
            </button>

            <div>
              <DateModal
                isOpen={isLeaveOpen}
                onClose={() => setIsLeaveOpen(false)}
                selectedDate={selectedLeaveDate}
                onDateChange={handleLeaveChange}
                title="Leave"
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
