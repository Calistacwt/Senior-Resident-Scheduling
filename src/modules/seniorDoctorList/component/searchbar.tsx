import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";

export type SearchProps = {
  onSearch: (value: string) => void;
  onFilterToggle: () => void;
  onClearSearch: () => void;
  seniorDoctorData: any[];
};

const Searchbar = (props: SearchProps) => {
  const { onSearch, onFilterToggle, onClearSearch, seniorDoctorData } = props;
  const [value, setValue] = useState("Search");

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
    const ws = XLSX.utils.json_to_sheet(seniorDoctorData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Senior Doctors");

    // Generate the Excel file and trigger download
    XLSX.writeFile(wb, "Senior_Doctors_List.xlsx");
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
          <button
            className="text-xs text-black rounded p-2 font-semibold border-form-border border flex space-x-2 justify-center items-center"
            onClick={onFilterToggle}
          >
            <img
              src="/assets/images/filter.png"
              alt="Import Logo"
              className="rounded-md cursor-pointer w-4"
            />
            <div>
              <p>Filter</p>
            </div>
          </button>
          <button className="text-xs text-black rounded p-2 font-semibold border-form-border border flex space-x-2 justify-center items-center  hover:bg-sidebar-active hover:bg-opacity-30">
            <img
              src="/assets/images/import.png"
              alt="Import Logo"
              className="rounded-md cursor-pointer w-4"
            />
            <div>
              <p>Import</p>
            </div>
          </button>
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
