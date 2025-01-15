import {
  getSRData,
  importSRInfo
} from "@/services/srList";
import { srList } from "@/types/srList";
import { ChangeEvent, useRef, useState } from "react";
import * as XLSX from "xlsx";

export type SearchProps = {
  onSearch: (value: string) => void;
  onFilterToggle: () => void;
  onClearSearch: () => void;
  srData: srList[]; 
};

const Searchbar = (props: SearchProps) => {
  const { onSearch, onFilterToggle, onClearSearch, srData } = props;
  const [value, setValue] = useState("Search");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [_fetchedData, setFetchedData] = useState<srList[]>([]);
  const [_importedData, setImportedData] = useState<srList[]>([]);

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setValue(target.value);

    if (target.value === "") {
      onClearSearch();
    } else {
      onSearch(target.value);
    }
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(srData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Senior Residents");

    XLSX.writeFile(wb, "Senior_Residents_List.xlsx");
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  }

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
        const workbook = XLSX.read(data, {type: "binary"});
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        try {
          const srData = XLSX.utils.sheet_to_json<srList>(
            sheet,
            {
              defval: "",
            }
          );

          for (const row of srData) {
            try {
              await importSRInfo(row);
            } catch (error) {
              console.error("Error uploading clinic schedule row:", error);
              break;
            }
          }

          const updatedScheduleData = await getSRData();
          setFetchedData(updatedScheduleData);
          setImportedData(srData);
          window.location.reload();
        } catch (error) {
          console.error("Error processing the file:", error);
          alert("An error occured while importing data. Please try again.")
        }
      }
    };
    reader.readAsBinaryString(file);
  }

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
              alt="Filter Logo"
              className="rounded-md cursor-pointer w-4"
            />
            <div>
              <p>Filter</p>
            </div>
          </button>
          <button
            className="text-xs text-black rounded p-2 font-semibold border-form-border border flex space-x-2 justify-center items-center"
            onClick={handleButtonClick}
          >
            <img
              src="/assets/images/import.png"
              alt="Import Logo"
              className="rounded-md cursor-pointer w-4"
            />
            <div>
              <p>Import</p>
            </div>
          </button>
          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImport}
          />
          <button
            className="text-xs text-black rounded p-1.5 font-semibold border-form-border border flex space-x-2 justify-center items-center"
            onClick={handleExport}
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
