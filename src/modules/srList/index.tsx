import { useEffect, useState } from "react";
import {
  getSRData,
  searchSRData,
  sortSRDataASC,
  sortSRDataDESC,
} from "@/services/srList";
import Searchbar from "./component/searchbar";
import List from "./component/list";
import { deleteSRInfo } from "@/services/registerSR";
import { srList } from "@/types/srList";

const SeniorResidentList = () => {
  const [SRData, setSRData] = useState<srList[]>([]);
  const [isAscending, setIsAscending] = useState(true);

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

  const handleDelete = async (id: string) => {
    try {
      // Call the delete function from your API service
      await deleteSRInfo(id);

      // Remove the deleted SR from the state
      setSRData(SRData.filter((srData) => srData.id !== id));
    } catch (error) {
      console.error("Error deleting SR data:", error);
    }
  };

  useEffect(() => {
    const fetchSRData = async () => {
      const data = await getSRData();
      setSRData(data);
    };

    fetchSRData();
  }, []);

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
        />
      </div>

      <div>
        <List SRData={SRData} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default SeniorResidentList;
