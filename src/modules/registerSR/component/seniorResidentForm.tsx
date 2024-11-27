import { formatDate } from "@/utils/formatter";
import { useState } from "react";
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

const SeniorResidentForm = ({
  formData,
  setFormData,
  handleSubmit,
  callDates,
  setCallDates,
}: any) => {
  const navigate = useNavigate();

  const [postingPeriod, setPostingPeriod] = useState({
    startDate: formData.postingPeriod.startDate
      ? new Date(formData.postingPeriod.startDate)
      : new Date(),
    endDate: formData.postingPeriod.endDate
      ? new Date(formData.postingPeriod.endDate)
      : new Date(),
    key: "selection",
  });
  const [isPostingPeriodOpen, setIsPostingPeriodOpen] = useState(false);

  const handleDateRangeChange = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    setPostingPeriod({ startDate, endDate, key: "selection" });
    setFormData((prevData: any) => ({
      ...prevData,
      postingPeriod: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    }));
  };

  const handleCallDatesChange = (dates: any) => {
    setCallDates(dates); // Update state with selected dates
  };

  const handleBack = async () => {
    navigate({ to: `/` });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full">
      <form className="space-y-4" onSubmit={handleSubmit}>
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
              src="/assets/images/avatar.png"
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
              name="name"
              value={formData.name}
              onChange={handleInputChange}
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
              name="MCR"
              value={formData.MCR}
              onChange={handleInputChange}
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
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
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
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-form-label rounded-md w-full text-xs p-2 placeholder-form-placeholder placeholder:text-2xs placeholder:xl:text-xs "
          />
        </div>

        <div className="flex justify-between items-center space-x-4">
          <div className="flex flex-col flex-1">
            <label className="text-xs font-medium text-form-label mb-2">
              Call Dates
            </label>

            <DatePicker
              value={callDates}
              onChange={handleCallDatesChange}
              multiple
              sort
              placeholder=" Call Dates"
              inputClass="custom-placeholder"
              plugins={[<DatePanel />]}
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label">
            No. of DCD sessions after deducting leaves and workshop
          </label>
          <input
            type="text"
            name="noSession"
            value={formData.noSession}
            onChange={handleInputChange}
            placeholder="No. of sessions"
            className="border border-form-label rounded-md w-full text-xs p-2 placeholder-form-placeholder placeholder:text-2xs placeholder:xl:text-xs "
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
            className="border border-form-label rounded-md w-full text-xs p-3 py-5  "
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
            className="bg-sidebar-active  text-white font-medium text-xs p-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default SeniorResidentForm;
