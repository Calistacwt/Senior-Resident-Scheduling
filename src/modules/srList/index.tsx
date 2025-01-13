import { useEffect, useState } from "react";
import {
  getSRData,
  searchSRData,
  sortSRDataASC,
  sortSRDataDESC,
} from "@/services/srList";
import Searchbar from "./component/searchbar";
import List from "./component/list";
import { deleteSRInfo, registerSRInfo } from "@/services/registerSR";
import { srList } from "@/types/srList";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import * as XLSX from "xlsx";

const SeniorResidentList = () => {
  const [SRData, setSRData] = useState<srList[]>([]);
  const [isAscending, setIsAscending] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSearch = async (value: string) => {
    try {
      if (value.trim() === "") {
        const data = await getSRData();
        setSRData(data);
      } else {
        const data = await searchSRData(value);
        setSRData(data);
      }
    } catch (error) {
      console.error("Error searching SR data:", error);
    }
  };

  //currently sorts by name only, maybe will change to filter by date
  const handleFilterToggle = async () => {
    try {
      const data = isAscending ? await sortSRDataASC() : await sortSRDataDESC();
      setSRData(data);
      setIsAscending(!isAscending); // Toggles between Ascending and Descending sort by name
    } catch (error) {
      console.error("Error sorting SR data:", error);
    }
  };

  const handleClearSearch = async () => {
    const data = await getSRData();
    setSRData(data);
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setOpenModal(true);
  };

  const handleDelete = async () => {
    try {
      if (deleteId) {
        await deleteSRInfo(deleteId);
        setSRData(SRData.filter((srData) => srData.id !== deleteId));
        setDeleteId(null);
      }
    } catch (error) {
      console.error("Error deleting SR data:", error);
    } finally {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    const fetchSRData = async () => {
      const data = await getSRData();
      setSRData(data);
    };

    fetchSRData();
  }, []);

  interface ExcelRow {
    "SR NAME": string;
    "START DATE": string;
    "END DATE": string;
    MOBILE: string;
    EMAIL: string;
    MCR: string;
    "NO SESSION": string;
    REMARKS: string;
    "CALL DATES": string;
    "LEAVE DATES": string;
  }
  

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
  
      // Read the file into an array buffer
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet); // Cast the data to ExcelRow[]
  
      console.log("Excel Data:", jsonData); // Log the raw data from the Excel sheet
  
      // Check if the columns are as expected
      if (!jsonData.length || !jsonData[0]["SR NAME"] || !jsonData[0]["START DATE"]) {
        throw new Error("Invalid Excel format. Missing required columns.");
      }
  
      // Map Excel data to the new structure
      const importedData = jsonData.map((entry) => ({
        postingPeriod: {
          startDate: formatExcelDate(entry["START DATE"]),
          endDate: formatExcelDate(entry["END DATE"]),
        },
        name: entry["SR NAME"],
        mobile: entry["MOBILE"],
        email: entry["EMAIL"],
        MCR: entry["MCR"],
        noSession: entry["NO SESSION"] || "", // Default value if not provided
        remarks: entry["REMARKS"] || "", // Default value if not provided
        callDates: entry["CALL DATES"] ? entry["CALL DATES"].split(",") : [], // Assuming call dates are separated by commas
        leaveDates: entry["LEAVE DATES"] ? parseLeaveDates(entry["LEAVE DATES"]) : [], // Parse leave dates if provided
        id: "", // Auto-generated on the backend
      }));
  
      console.log("Mapped Data:", importedData); // Log the mapped data
  
      // Process each entry as if it's being submitted via the form
      for (const sr of importedData) {
        await registerSRInfo({
          ...sr,
        });
      }
  
      alert("Import successful!");
    } catch (error) {
      console.error("Error importing data:", error);
      alert(`Failed to import data. Error: ${error}`);
    }
  };
  
  // Helper function to format Excel date strings
  const formatExcelDate = (dateString: string): string => {
    const [day, month, year] = dateString.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day)).toISOString();
  };
  
  // Helper function to parse leave dates from the Excel data
  const parseLeaveDates = (leaveDatesString: string): { date: string; session: string }[] => {
    return leaveDatesString.split(",").map((leaveDate) => {
      const [date, session] = leaveDate.split("-");
      return { date, session };
    });
  };
  
  
  
  const handleExport = () => {
    try {
      // Format data to match the desired order and format for import
      const formattedData = SRData.map((entry) => ({
        "SR NAME": entry.name,
        "START DATE": formatDate(entry.postingPeriod.startDate),
        "END DATE": formatDate(entry.postingPeriod.endDate),
        MOBILE: entry.mobile,
        EMAIL: entry.email,
        MCR: entry.MCR,
        "NO SESSION": entry.noSession,
        REMARKS: entry.remarks,
        "CALL DATES": entry.callDates.join(","), // Join call dates into a string
        "LEAVE DATES": formatLeaveDatesForExport(entry.leaveDates), // Format leave dates for export
      }));
  
      // Create worksheet and workbook
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Senior Residents");
  
      // Write file
      XLSX.writeFile(workbook, "SeniorResidents.xlsx");
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };
  
  // Helper function to format date into a string (DD/MM/YYYY)
  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };
  
  // Helper function to format leave dates into a string for export
  const formatLeaveDatesForExport = (leaveDates: { date: string; session: string }[]): string => {
    return leaveDates
      .map((leaveDate) => `${leaveDate.date}-${leaveDate.session}`)
      .join(",");
  };
  

  return (
    <div className="m-2">
      <div>
        <div className=" mb-3">
          <h1 className="font-bold text-xl">Senior Resident's List</h1>
          <h6 className="text-xs text-dashboard-text">
            List of Senior Residents Doctors in KK Woman's and Children's
            Hospital
          </h6>
        </div>
      </div>
      <div>
      <Searchbar
        onSearch={handleSearch}
        onFilterToggle={handleFilterToggle}
        onClearSearch={handleClearSearch}
        onImport={handleImport}
        onExport={handleExport}
        />
      </div>
      <div>
        <List SRData={SRData} onDelete={confirmDelete} />
      </div>
      <div>
        <Modal
          className="md:mx-48 xl:mx-[600px]"
          show={openModal}
          size="xs"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center ">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500 dark:text-red-500" />
              <h2 className="mb-2 text-sm font-semibold text-gray-700">
                Delete Senior Resident
              </h2>
              <h6 className="mb-3 text-xs  text-gray-700">
                Are you sure you want to delete this senior resident's
                information? <br /> This action cannot be undone.
              </h6>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={handleDelete}
                  className="border-none"
                >
                  <span className="text-xs bg-sidebar-active rounded-md px-2 py-2">
                    Confirm
                  </span>
                </Button>
                <Button
                  color="gray"
                  onClick={() => setOpenModal(false)}
                  className="border-none"
                >
                  <span className="text-xs text-black rounded-md bg-gray-300 px-2 py-2 ">
                    Cancel
                  </span>
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default SeniorResidentList;
