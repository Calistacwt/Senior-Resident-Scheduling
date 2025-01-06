import { formatDate } from "@/utils/formatter";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

/*--------- Date Range Picker --------- */
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";

/*--------- Date Picker & Calendar Modal --------- */
import "react-datepicker/dist/react-datepicker.css";
import "/src/styles/custom-calendar.css";

import "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { format } from "date-fns";
import { Dropdown } from "flowbite-react";
import "/src/styles/custom-dropdown.css";

const SeniorResidentForm = ({
  formData,
  setFormData,
  handleSubmit,
  handleUpdate,
  setCallDates,
  setLeaveDates,
  postingPeriod,
  mode,
}: any) => {
  const navigate = useNavigate();

  const [isPostingPeriodOpen, setIsPostingPeriodOpen] = useState(false);

  const [localPostingPeriod, setLocalPostingPeriod] = useState({
    startDate: postingPeriod?.startDate
      ? new Date(postingPeriod.startDate)
      : new Date(),
    endDate: postingPeriod?.endDate
      ? new Date(postingPeriod.endDate)
      : new Date(),
    key: "selection",
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const postingPeriodRef = useRef<HTMLDivElement | null>(null);

  const handleDateRangeChange = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;

    // Format the dates to 'yyyy-MM-dd'
    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");

    setLocalPostingPeriod({ startDate, endDate, key: "selection" });

    setFormData((prevData: any) => ({
      ...prevData,
      postingPeriod: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      },
    }));
  };

  const handleCallDatesChange = (dates: any) => {
    const formattedDates = dates.map((date: Date) =>
      format(date, "yyyy-MM-dd")
    );
    setFormData((prevData: any) => ({
      ...prevData,
      callDates: formattedDates,
    }));
    setCallDates(dates);
  };

  const handleLeaveDatesChange = (dates: any) => {
    // new array of leave dates, preserving the session for exisiting dates
    const updatedDates = dates.map((date: Date) => {
      // Check if the date already exists in the formData.leaveDates
      const existingDate = formData.leaveDates.find(
        (item: any) => item.date === format(date, "yyyy-MM-dd")
      );
      return existingDate
        ? { ...existingDate } // Keep the existing session if the date is already in leaveDates
        : { date: format(date, "yyyy-MM-dd"), session: "FULLDAY" };
    });

    setFormData((prevData: any) => ({
      ...prevData,
      leaveDates: updatedDates,
    }));
    setLeaveDates(updatedDates);
  };

  const handleSessionChange = (date: string, session: string) => {
    const updatedLeaveDates = formData.leaveDates.map((item: any) =>
      item.date === date ? { ...item, session } : item
    );

    setFormData((prevData: any) => ({
      ...prevData,
      leaveDates: updatedLeaveDates,
    }));

    setLeaveDates(updatedLeaveDates);
  };

  const handleBack = async () => {
    navigate({ to: `/srList` });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "edit" && typeof handleUpdate === "function") {
      handleUpdate(formData); // Update the SR data
    } else if (mode === "register" && typeof handleSubmit === "function") {
      handleSubmit(formData); // Register the SR data
    }
  };

  useEffect(() => {
    if (postingPeriod?.startDate && postingPeriod?.endDate) {
      setLocalPostingPeriod({
        startDate: new Date(postingPeriod.startDate),
        endDate: new Date(postingPeriod.endDate),
        key: "selection",
      });
    }
  }, [postingPeriod]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        postingPeriodRef.current &&
        !postingPeriodRef.current.contains(e.target)
      ) {
        setIsPostingPeriodOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const allFieldsFilled =
      formData.name &&
      formData.MCR &&
      formData.mobile &&
      formData.email &&
      formData.noSession &&
      formData.callDates.length > 0 &&
      formData.leaveDates.length > 0 &&
      localPostingPeriod.startDate &&
      localPostingPeriod.endDate;

    setIsSubmitDisabled(!allFieldsFilled);
  }, [formData, localPostingPeriod]);

  return (
    <div className="w-full">
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        {/* Posting Period */}
        <div className="space-y-2 mt-4" ref={postingPeriodRef}>
          <label className="text-xs font-medium text-form-label mb-2">
            Posting Period <span className="text-red-500 text-xs">*</span>
          </label>
          <button
            type="button"
            onClick={() => setIsPostingPeriodOpen(true)}
            className="text-left w-full text-black text-xs border rounded-md border-form-label p-2"
          >
            {localPostingPeriod.startDate && localPostingPeriod.endDate
              ? `${formatDate(localPostingPeriod.startDate)} - ${formatDate(localPostingPeriod.endDate)}`
              : "Select Date Range"}
          </button>

          {isPostingPeriodOpen && (
            <div className="absolute z-10">
              <DateRange
                editableDateInputs={true}
                onChange={handleDateRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={[localPostingPeriod]}
                className="custom-calendar"
              />
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <div>
            <img
              src="/assets/images/avatar.png"
              alt="Senior Resident Icon"
              className="w-11 rounded-full"
            />
          </div>

          <div className="flex flex-col space-y-2 w-full">
            <label className="text-xs font-medium text-form-label">
              Senior Resident <span className="text-red-500 text-xs">*</span>
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Senior Resident Name"
              className="border border-form-label rounded-md w-full text-xs p-2 placeholder:text-2xs placeholder-form-placeholder  "
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col flex-1 mr-3 space-y-2">
            <label className="text-xs font-medium text-form-label">MCR <span className="text-red-500 text-xs">*</span></label>
            <input
              type="text"
              name="MCR"
              required
              value={formData.MCR}
              onChange={handleInputChange}
              placeholder="Enter MCR"
              className="border border-form-label rounded-md w-full text-xs p-2 placeholder-form-placeholder placeholder:text-2xs "
            />
          </div>

          <div className="flex flex-col flex-1 space-y-2 ">
            <label className="text-xs font-medium text-form-label">
              Mobile <span className="text-red-500 text-xs">*</span>
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter Mobile Number"
              className="border border-form-label rounded-md w-full text-xs p-2 placeholder-form-placeholder placeholder:text-2xs"
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label">Email <span className="text-red-500 text-xs">*</span></label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-form-label rounded-md w-full text-xs p-2 placeholder-form-placeholder placeholder:text-2xs "
          />
        </div>

        <div className="flex justify-between items-center space-x-4">
          <div className="flex flex-col flex-1">
            <label className="text-xs font-medium text-form-label mb-2">
              Call Dates <span className="text-red-500 text-xs">*</span>
            </label>

            <DatePicker
              value={formData.callDates}
              onChange={handleCallDatesChange}
              multiple
              sort
              placeholder=" Call Dates"
              inputClass="custom-placeholder"
              plugins={[<DatePanel />]}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col flex-1 ">
            <label className="text-xs font-medium text-form-label mb-2">
              Leaves <span className="text-red-500 text-xs">*</span>
            </label>

            <DatePicker
              value={formData.leaveDates.map((item: any) => item.date)}
              onChange={handleLeaveDatesChange}
              multiple
              sort
              placeholder="Leave Dates"
              inputClass="custom-placeholder"
              plugins={[<DatePanel />]}
            />
          </div>

          <div className="flex space-x-3 mt-1 ">
            {(Array.isArray(formData.leaveDates)
              ? formData.leaveDates
              : []
            ).map((item: any) => (
              <div
                key={item.date}
                className="flex items-center space-x-2 session-dropdown-button"
              >
                <span className="font-semibold text-2xs text-black">
                  {item.date}
                </span>
                <Dropdown
                  label={
                    <span className="text-2xs text-black">
                      {item.session || "Select"}
                    </span>
                  }
                  size="sm"
                  color="gray" // arrow
                  className="ml-2 text-2xs rounded-md border text-black border-form-label transition-none"
                >
                  <Dropdown.Item
                    className="text-2xs p-2 hover:bg-gray-200 custom-dropdown-item"
                    onClick={() => handleSessionChange(item.date, "FULLDAY")}
                  >
                    FULLDAY
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-2xs p-2 hover:bg-gray-200 custom-dropdown-item"
                    onClick={() => handleSessionChange(item.date, "AM")}
                  >
                    AM
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-2xs p-2 hover:bg-gray-200 custom-dropdown-item"
                    onClick={() => handleSessionChange(item.date, "PM")}
                  >
                    PM
                  </Dropdown.Item>
                </Dropdown>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label">
            No. of DCD sessions after deducting leaves and workshop <span className="text-red-500 text-xs">*</span>
          </label>
          <input
            type="text"
            name="noSession"
            value={formData.noSession}
            onChange={handleInputChange}
            placeholder="No. of sessions"
            className="border border-form-label rounded-md w-full text-xs  p-2 placeholder-form-placeholder placeholder:text-2xs  "
          />
        </div>

        <div className="flex flex-col space-y-2 w-full">
          <label className="text-xs font-medium text-form-label">Remarks</label>
          <input
            type="text"
            placeholder=""
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            className="border border-form-label rounded-md w-full p-3 py-5 placeholder:text-2xs text-xs  "
          />
        </div>

        <div className="flex justify-end items-end space-x-4">
          <button
            onClick={handleBack}
            type="button"
            className="bg-white border  text-black font-medium text-xs p-2 rounded-md px-3"
          >
            Back
          </button>

          <button
            type="submit"
            className={`${
              isSubmitDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-sidebar-active"
            } text-white font-medium text-xs p-2 rounded-md`}
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default SeniorResidentForm;
