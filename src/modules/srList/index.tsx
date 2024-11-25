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
        const data = await getSRData(); // Reload the full list if search query is empty
        setSRData(data);
      } else {
        const data = await searchSRData(value); // Fetch the filtered list
        setSRData(data);
      }
    } catch (error) {
      console.error("Error searching SR data:", error);
      //maybe will send to some kind of error page?
    }
  };

  const handleFilterToggle = async () => {
    try {
      const data = isAscending ? await sortSRDataASC() : await sortSRDataDESC();
      setSRData(data);
      setIsAscending(!isAscending); // Toggle the sorting order
    } catch (error) {
      console.error("Error sorting SR data:", error);
    }
  };

  return (
    <>
      <div className="m-3">
        <div className=" mb-3 space-y-1">
          <h1 className="font-bold text-xl">Senior Resident's List</h1>
          <h6 className="text-xs text-dashboard-text">
            List of Senior Residents in KK Woman's and Children's Hospital
          </h6>
        </div>

        <Searchbar
          // onSearch={function (value: string): void {
          //   console.log(value);
          // }}

          onSearch={handleSearch}
          onFilterToggle={handleFilterToggle}
        />

        <List SRData={SRData} />
      </div>
    </>
  );
};

export default srList;
