import { useEffect, useState } from "react";
import {
  getSeniorDoctorData,
  searchSeniorDoctorData,
  sortSeniorDoctorDataASC,
  sortSeniorDoctorDataDESC,
} from "@/services/seniorDoctorList";

import List from "./component/list";
import Searchbar from "./component/searchbar";

const srList = () => {
  const [seniorDoctorData, setseniorDoctorData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    const fetchSRData = async () => {
      const data = await getSeniorDoctorData();
      setseniorDoctorData(data);
    };

    fetchSRData();
  }, []);

  const handleSearch = async (value: string) => {
    try {
      if (value.trim() === "") {
        const data = await getSeniorDoctorData();
        setseniorDoctorData(data);
      } else {
        const data = await searchSeniorDoctorData(value);
        setseniorDoctorData(data);
      }
    } catch (error) {
      console.error("Error searching Senior Doctor data:", error);
    }
  };

  //currently sorts by name only, maybe will change to filter by date
  const handleFilterToggle = async () => {
    try {
      const data = isAscending
        ? await sortSeniorDoctorDataASC()
        : await sortSeniorDoctorDataDESC();
      setseniorDoctorData(data);
      setIsAscending(!isAscending); // Toggles between Ascending and Descending sort by name
    } catch (error) {
      console.error("Error sorting SR data:", error);
    }
  };

  const handleClearSearch = async () => {
    const data = await getSeniorDoctorData();
    setseniorDoctorData(data);
  };

  return (
    <div className="m-2">
      <div>
        <div className=" mb-3">
          <h1 className="font-bold text-xl">Senior Doctor's List</h1>
          <h6 className="text-xs text-dashboard-text">
            List of Senior Doctors in KK Woman's and Children's Hospital
          </h6>
        </div>
      </div>

      <div>
        <Searchbar
          onSearch={handleSearch}
          onFilterToggle={handleFilterToggle}
          onClearSearch={handleClearSearch}
          seniorDoctorData={seniorDoctorData}
        />
      </div>

      <div>
        <List seniorDoctorData={seniorDoctorData} />
      </div>
    </div>
  );
};

export default srList;
