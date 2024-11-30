import { useEffect, useState } from "react";
import {
  getSRData,
  searchSRData,
  sortSRDataASC,
  sortSRDataDESC,
} from "@/services/srList";
import Searchbar from "./component/searchbar";
import List from "./component/list";

const srList = () => {
  const [SRData, setSRData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    const fetchSRData = async () => {
      const data = await getSRData();
      setSRData(data);
    };

    fetchSRData();
  }, []);

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

  return (
    <div className="m-2">
      <div>
        <div className=" mb-3">
          <h1 className="font-bold text-xl">Senior Resident's List</h1>
          <h6 className="text-xs text-dashboard-text">
            List of Senior Residents in KK Woman's and Children's Hospital
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
        <List SRData={SRData} />
      </div>
    </div>
  );
};

export default srList;
