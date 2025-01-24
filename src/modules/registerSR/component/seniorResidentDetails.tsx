import { formatDate } from "@/utils/formatter";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

/*--------- Date Range Picker --------- */
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

/*--------- Date Picker & Calendar Modal --------- */
import "react-datepicker/dist/react-datepicker.css";
import "/src/styles/custom-calendar.css";

import "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "/src/styles/custom-dropdown.css";
import { srList } from "@/types/srList";

const SeniorResidentDetails = ({
  formData,
  postingPeriod,
  SRData,
}: any) => {
  const navigate = useNavigate();

  const [localPostingPeriod, setLocalPostingPeriod] = useState({
    startDate: postingPeriod?.startDate
      ? new Date(postingPeriod.startDate)
      : new Date(),
    endDate: postingPeriod?.endDate
      ? new Date(postingPeriod.endDate)
      : new Date(),
    key: "selection",
  });

  const postingPeriodRef = useRef<HTMLDivElement | null>(null);

  const handleBack = async () => {
    navigate({ to: `/srList` });
  };

  const handleEdit = (srData: srList) => {
    navigate({
      to: `/seniorResidentForm/${srData.id}/edit`,
      params: { id: srData.id },
    });
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

  return (
    <div className="w-full">
      <form className="space-y-7">
        {/* Posting Period */}
        <div className="space-y-2 mt-4" ref={postingPeriodRef}>
          <label className="text-xs font-medium text-form-label mb-2">
            Posting Period <span className="text-red-500 text-xs">*</span>
          </label>

          <p className="text-left w-full text-black text-xs font-semibold">
            {localPostingPeriod.startDate && localPostingPeriod.endDate
              ? `${formatDate(localPostingPeriod.startDate)} - ${formatDate(localPostingPeriod.endDate)}`
              : "Select Date Range"}
          </p>
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

            <p className=" w-full text-xs py-1 font-semibold">
              {formData.name}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col flex-1 mr-3 space-y-2">
            <label className="text-xs font-medium text-form-label">
              MCR <span className="text-red-500 text-xs">*</span>
            </label>
            <p className=" w-full text-xs py-1 font-semibold">{formData.MCR}</p>
          </div>

          <div className="flex flex-col flex-1 space-y-2  ">
            <label className="text-xs font-medium text-form-label">
              Mobile <span className="text-red-500 text-xs">*</span>
            </label>

            <p className=" w-full text-xs py-1 font-semibold">
              {formData.mobile}
            </p>
          </div>

          <div className="flex flex-col flex-1 space-y-2 ">
            <label className="text-xs font-medium text-form-label">
              Email <span className="text-red-500 text-xs">*</span>
            </label>

            <p className=" w-full text-xs py-1 font-semibold">
              {formData.email}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center space-x-4">
          <div className="flex flex-col flex-1">
            <label className="text-xs font-medium text-form-label mb-2">
              Call Dates <span className="text-red-500 text-xs">*</span>
            </label>

            <p className="w-full text-xs py-1 font-semibold">
              {formData.callDates.map((date: any, index: any) => (
                <span
                  key={index}
                  className="m-2 ml-0 py-2 bg-orange-100 px-2 rounded-md"
                >
                  {" "}
                  <span>{date}</span>
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col flex-1">
            <label className="text-xs font-medium text-form-label mb-2">
              Leaves <span className="text-red-500 text-xs">*</span>
            </label>
          </div>
          <div className="flex space-x-4 items-start">
            {(Array.isArray(formData.leaveDates)
              ? formData.leaveDates
              : []
            ).map((item: any) => (
              <div
                key={item.date}
                className="bg-orange-100 p-2 rounded-md shadow-sm max-w-fit"
              >
                <p className="text-xs text-black font-semibold">
                  {item.date} - {item.session || "Select"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <label className="text-xs font-medium text-form-label">
            No. of DCD sessions after deducting leaves and workshop{" "}
            <span className="text-red-500 text-xs">*</span>
          </label>

          <p className=" w-full text-xs py-1 font-semibold">
            {formData.noSession}
          </p>
        </div>

        <div className="flex flex-col space-y-2 w-full">
          <label className="text-xs font-medium text-form-label">Remarks</label>

          <p className=" w-full text-xs py-1 font-semibold">
            {formData.remarks ? formData.remarks : "-- NA --"}
          </p>
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
            onClick={() => handleEdit(SRData)}
            type="button"
            className="bg-sidebar-active text-white font-medium text-xs p-2 rounded-md px-3"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};
export default SeniorResidentDetails;
