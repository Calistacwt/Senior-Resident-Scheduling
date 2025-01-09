import { useEffect, useState } from "react";
import {
  getSeniorDoctorData,
  searchSeniorDoctorData,
  sortSeniorDoctorDataASC,
  sortSeniorDoctorDataDESC,
} from "@/services/seniorDoctorList";

import List from "./component/list";
import Searchbar from "./component/searchbar";
import { Pagination } from "flowbite-react";

import "/src/styles/custom-pagination.css";
const srList = () => {
  const [seniorDoctorData, setseniorDoctorData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const dataPerPage = 10;
  const onPageChange = (page: number) => setCurrentPage(page); // Paginate the filtered data
  const startIndex = (currentPage - 1) * dataPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + dataPerPage);
 
  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  const handleSearch = async (value: string) => {
    try {
      let data;
      if (value.trim() === "") {
        data = await getSeniorDoctorData();
      } else {
        data = await searchSeniorDoctorData(value);
      }
      setseniorDoctorData(data);
      setFilteredData(data);
      setCurrentPage(1); 
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
     
      setFilteredData(data);
      setIsAscending(!isAscending); // Toggles between Ascending and Descending sort by name
      setCurrentPage(1);
    } catch (error) {
      console.error("Error sorting SR data:", error);
    }
  };

  const handleClearSearch = async () => {
    const data = await getSeniorDoctorData();
    setseniorDoctorData(data);
    setFilteredData(data);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchSRData = async () => {
      const data = await getSeniorDoctorData();
      setseniorDoctorData(data);
      setFilteredData(data);
    };

    fetchSRData();
  }, []);

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
        <List seniorDoctorData={currentData} />
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default srList;
