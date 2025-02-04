import {
  getRoomData,
  importRoomData,
} from "@/services/room";
import { roomList } from "@/types/roomList";
import { ChangeEvent, useRef, useState } from "react";
import * as XLSX from "xlsx";

export type SearchProps = {
  onSearch: (value: string) => void;
  onClearSearch: () => void;
  roomData: roomList[];
};

const Searchbar = (props: SearchProps) => {
  const { onSearch, onClearSearch, roomData } = props;

  const [value, setValue] = useState("Search");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [_fetchedData, setFetchedData] = useState<roomList[]>([]);
  const [_importedData, setImportedData] = useState<roomList[]>([]);

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setValue(target.value);

    if (target.value === "") {
      onClearSearch();
    } else {
      onSearch(target.value);
    }
  };

  // Export table data to Excel
  const handleExport = () => {
    // Convert the table data to a worksheet
    const ws = XLSX.utils.json_to_sheet(roomData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rooms");

    // Generate the Excel file and trigger download
    XLSX.writeFile(wb, "Rooms_List.xlsx");
  };


  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };


  // Handle file import
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (event) => {
      const data = event.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        try {
          // extract senior doctor
          const seniorDoctorData = XLSX.utils.sheet_to_json<roomList>(
            sheet,
            {
              defval: "",
            }
          );

          // save senior doctor data
          for (const row of seniorDoctorData) {
            try {
              await importRoomData(row);
            } catch (error) {
              console.error("Error uploading clinic schedule row:", error);
              break;
            }
          }

          // Refresh data after processing
          const updatedScheduleData = await getRoomData();
          setFetchedData(updatedScheduleData);
          setImportedData(seniorDoctorData);
          window.location.reload();
        } catch (error) {
          console.error("Error processing the file:", error);
          alert("An error occurred while importing data. Please try again.");
        }
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="w-full flex items-center text-sidebar bg-white p-3 rounded-lg">
      <div className="flex w-full space-x-2">
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <img
              src="/assets/images/search.png"
              alt="Search Logo"
              className="rounded-md w-4 "
            />
          </span>
          <input
            type="search"
            name="search"
            placeholder={value}
            className="bg-form-search w-full p-3 pl-10 text-sm focus:outline-none rounded-xl"
            onChange={searchHandler}
          />
        </div>
        <div className="flex-shrink-0 flex justify-center items-center space-x-4">
          <div>
            <button onClick={handleButtonClick} className="text-xs text-black rounded p-2 font-semibold border-form-border border flex space-x-2 justify-center items-center  hover:bg-sidebar-active hover:bg-opacity-30">
              <img
                src="/assets/images/import.png"
                alt="Import Logo"
                className="rounded-md cursor-pointer w-4"
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
              onChange={handleImport}
            />
          </div>

          <button
            onClick={handleExport}
            className="text-xs text-black rounded p-1.5 font-semibold border-form-border border flex space-x-2 justify-center items-center hover:bg-sidebar-active hover:bg-opacity-30"
          >
            <img
              src="/assets/images/export.svg"
              alt="Export Logo"
              className="rounded-md cursor-pointer w-5"
            />
            <div>
              <p className="text-xs">Export</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
