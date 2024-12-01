import React, { useState, useEffect, useRef } from "react";
import { clinicScheduleInfo, fetchClinicSchedule } from "@/services/schedule";
import { clinicSchedule } from "@/types/schedule";
import * as XLSX from "xlsx";

const ClinicSchedule: React.FC = () => {
  const [fetchedData, setFetchedData] = useState<clinicSchedule[]>([]); // State for fetched data
  const [_importedData, setImportedData] = useState<clinicSchedule[]>([]); // State for imported data
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const workbook = XLSX.read(event.target?.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const sheetData = XLSX.utils.sheet_to_json<clinicSchedule>(sheet, {
        defval: "",
      });

      setImportedData(sheetData); // Set the imported data

      // Save each row individually using the service
      for (const row of sheetData) {
        await clinicScheduleInfo(row); // Call the service function to save
      }

      // Refresh the fetched data after import is complete
      const updatedScheduleData = await fetchClinicSchedule();
      setFetchedData(updatedScheduleData);
    };
    reader.readAsBinaryString(file);
  };

  const handleButtonClick = () => {
    // Trigger the file input click event when the button is clicked
    fileInputRef.current?.click();
  };

  // Fetch Clinic Schedule
  useEffect(() => {
    const getSchedule = async () => {
      const scheduleData = await fetchClinicSchedule();
      setFetchedData(scheduleData);
    };

    getSchedule();
  }, []);

  return (
    <div className="mt-3">
      {/* Header */}
      <div className="flex justify-between">
        <div className=" mb-3 space-y-1">
          <h1 className="font-bold text-xl">Clinic Schedule Overview</h1>
          <h6 className="text-xs text-dashboard-text">
            A Overview of Clinic Schedule
          </h6>
        </div>

        <div>
          <button
            className="text-xs text-black rounded p-1.5 font-semibold border-sidebar-border border flex space-x-2 justify-center items-center"
            onClick={handleButtonClick}
          >
            <img
              src="/assets/images/export.svg"
              alt="KKH Logo"
              className="rounded-md cursor-pointer w-5"
            />
            <div>
              <p>Import</p>
            </div>
          </button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex justify-center items-center xl:max-w-[1500px]">
        <div className="overflow-x-auto bg-background rounded-lg max-w-2xl xl:max-w-full">
          {fetchedData.length > 0 && (
            <table className="whitespace-nowrap bg-white mt-3">
              <thead className="text-left bg-background border border-sidebar">
                <tr className="border border-sidebar">
                  {Object.keys(fetchedData[0]).map((key) => (
                    <th
                      key={key}
                      className=" whitespace-nowrap px-4 py-3 text-2xs font-medium border border-sidebar"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="w-full border-y border-outline bg-white rounded-2xl">
                {fetchedData.map((row, index) => (
                  <tr key={index} className="border border-sidebar">
                    {Object.values(row).map((value, idx) => (
                      <td
                        key={idx}
                        className="p-4 font-medium text-2xs xl:text-xs border border-sidebar"
                        style={{
                          backgroundColor:
                            typeof value === "string" && value.includes("(NC)")
                              ? "yellow"
                              : "white", // Check if value is a string before calling includes
                        }}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicSchedule;
