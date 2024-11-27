import CalendarModel from "@/component/CalendarModel";
import { formatDate } from "@/utils/formatter";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "/src/styles/custom-calendar.css";
import { registerDoctor } from "@/services/approvedDrList";
import { drList } from "@/types/approvedDrList";

//---------
// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import { DateRange } from "react-date-range";

const ApprovedDoctor = () => {
  const [formData, setFormData] = useState<Omit<drList, "id">>({
    doctor: "",
    mobile: "",
    email: "",
    remarks: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update the form data
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newDoctor = await registerDoctor(formData); // Call the POST service
      console.log("Doctor registered successfully:", newDoctor);
      alert("Doctor registered successfully!");
    } catch (error) {
      console.error("Error while submitting form:", error);
      alert("Failed to register doctor.");
    }
  };

  return (
    <div className="w-full">
      <form className="space-y-4">
        {/* <div className="space-y-2 mt-4">
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
        </div> */}

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
              Senior Doctor
            </label>

            <input
              type="text"
              placeholder="Enter Senior Resident Name"
              className="border border-form-label rounded-md w-full text-xs p-2 "
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          {/* <div className="flex flex-col flex-1 mr-3 space-y-2">
            <label className="text-xs font-medium text-form-label">MCR</label>
            <input
              type="text"
              placeholder="Enter MCR"
              className="border border-form-label rounded-md w-full text-xs p-2 placeholder-form-placeholder placeholder:text-2xs placeholder:xl:text-xs "
            />
          </div> */}

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

        {/* <div className="flex justify-between items-center">
          <div className="flex flex-col flex-1">
            <label className="text-xs font-medium text-form-label mb-2">
              Commitment
            </label>
            <button
              type="button"
              onClick={() => setIsCallDateOpen(true)}
              className="text-left w-full text-black text-xs border rounded-md border-form-label p-2"
            >
              {selectedDates.length > 0
                ? selectedDates.map((date) => formatDate(date)).join(", ")
                : "Select Date"}
            </button>

            <div>
              <CalendarModel
                isOpen={isCallDateOpen}
                onClose={() => setIsCallDateOpen(false)}
                selectedDate={selectedDates}
                onDateChange={handleCallDateChange}
              />
            </div>
          </div>
        </div> */}

        {/* <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label">
            No. of DCD sessions after deducting leaves and workshop
          </label>
          <input
            type="text"
            placeholder="No. of sessions"
            className="border border-form-label rounded-md w-full text-xs p-2 placeholder-form-placeholder placeholder:text-2xs placeholder:xl:text-xs "
          />
        </div> */}

        {/* Remarks */}
        <div className="flex flex-col space-y-2 w-full">
          <label className="text-xs font-medium text-form-label">Remarks</label>
          <input
            type="text"
            placeholder="Write down any remarks"
            className="border border-form-label rounded-md w-full text-xs p-3 py-5  "
          />
        </div>

        {/* Button */}
        <div className="flex justify-end items-end space-x-4">
          {/* Back Button */}
          <button
            type="button"
            className="bg-white border  text-black font-medium text-xs p-2 rounded-md px-3"
          >
            Back
          </button>

          {/* Submit Button */}
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
export default ApprovedDoctor;
