// external library
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

// external UI component and icons
import { Modal, Button, Pagination } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

// component
import Searchbar from "./component/searchbar";
import List from "./component/list";

// types
import { srList } from "@/types/srList";

// services
import {
  getSRData,
  searchSRData,
  sortSRDataASC,
  sortSRDataDESC,
} from "@/services/srList";
import { deleteSRInfo } from "@/services/registerSR";

// styles
import "/src/styles/custom-pagination.css";

const SeniorResidentList = () => {
  const navigate = useNavigate();

  // state to store fetched senior resident information
  const [SRData, setSRData] = useState<srList[]>([]);

  // state to track the ID
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // state to toggle sorting order
  const [isAscending, setIsAscending] = useState(true);

  // modal state
  const [openModal, setOpenModal] = useState(false);

  // state to track success and failed badges
  const [isDeletedSuccessfully, setIsDeletedSuccessfully] = useState(false);
  const [isDeletedFailed, setIsDeletedFailed] = useState(false);

  // badge fade out
  const [fadeOutFailed, setFadeOutFailed] = useState(false);
  const [fadeOutSuccess, setFadeOutSucess] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<srList[]>([]);
  const dataPerPage = 10;
  const startIndex = (currentPage - 1) * dataPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + dataPerPage);
  const onPageChange = (page: number) => setCurrentPage(page);

  // calculate total pages
  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  const handleSearch = async (value: string) => {
    try {
      let data;
      if (value.trim() === "") {
        data = await getSRData();
        setSRData(data);
      } else {
        data = await searchSRData(value);
        setSRData(data);
        setFilteredData(data);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error searching SR data:", error);
    }
  };

  // sorts by name only
  // TODO: change to filter by date
  const handleFilterToggle = async () => {
    try {
      const data = isAscending ? await sortSRDataASC() : await sortSRDataDESC();
      setSRData(data);
      setIsAscending(!isAscending);
    } catch (error) {
      console.error("Error sorting SR data:", error);
    }
  };

  // clear the seach input
  const handleClearSearch = async () => {
    const data = await getSRData();
    setSRData(data);
    setFilteredData(data);
    setCurrentPage(1);
  };

  // handle information deletion
  const handleDelete = async () => {
    if (deleteId) {
      try {
        // API call the delete function
        await deleteSRInfo(deleteId);

        const updatedData = SRData.filter((srData) => srData.id !== deleteId);
        setSRData(updatedData);
        setFilteredData(updatedData);

        if (updatedData.length % dataPerPage === 0 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        setIsDeletedSuccessfully(true);

         // badge fade out
         setFadeOutSucess(false);
         setTimeout(() => {
          setFadeOutSucess(true);
         }, 500);

      } catch (error) {
      
        setIsDeletedFailed(true);

        // badge fade out
        setFadeOutFailed(false);
        setTimeout(() => {
          setFadeOutFailed(true);
        }, 500);

        // redirect page
        setTimeout(() => {
          navigate({ to: `/srList` });
        }, 1500);
      } finally {
        setDeleteId(null);
        setOpenModal(false);
      }
    }
  };

  // handle open delete modal
  const handleDeleteModal = (id: string) => {
    setDeleteId(id);
    setOpenModal(true);
  };

  // fetch all sr data information
  useEffect(() => {
    const fetchSRData = async () => {
      const data = await getSRData();
      setSRData(data);
      setFilteredData(data);
    };

    fetchSRData();
  }, []);

  // badge fade out
  useEffect(() => {
    if (fadeOutFailed) {
      setTimeout(() => {
        setIsDeletedFailed(false);
      }, 1500);
    }

    if (fadeOutSuccess) {
      setTimeout(() => {
        setIsDeletedSuccessfully(false);
      }, 1500);
    }
  }, [fadeOutFailed, fadeOutSuccess]);

  return (
    <div className="m-2">
      <div>
        <div className=" mb-3">
          <div className="flex justify-between">
            <div>
              <h1 className="font-bold text-xl">Senior Resident's List</h1>
              <h6 className="text-xs text-dashboard-text">
                List of Senior Residents Doctors in KK Woman's and Children's
                Hospital
              </h6>
            </div>

            {/* success delete badge */}
            {isDeletedSuccessfully && (
              <div className="bg-badge-am font-semibold text-xs text-badge-success p-2 rounded-md mb-4 flex  items-center space-x-2">
                <div>
                  <img
                    src="/assets/images/success.png"
                    alt="Success Icon"
                    className="w-3 rounded-full"
                  />
                </div>
                <div>Deleted Successfully!</div>
              </div>
            )}

            {/* failed delete badge */}
            {isDeletedFailed && (
              <div className="bg-badge-error font-semibold text-xs text-badge-errorText p-2 rounded-md mb-4 flex  items-center space-x-2">
                <div>
                  <img
                    src="/assets/images/error.png"
                    alt="Error Icon"
                    className="w-3 rounded-full"
                  />
                </div>
                <div>Delete Failed!</div>
              </div>
            )}
          </div>
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
        <List SRData={currentData} onDelete={handleDeleteModal} />
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      <div>
        {openModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <Modal
              className=" max-w-lg mx-auto sm:max-w-[90%] md:max-w-[500px] "
              show={openModal}
              size="xs"
              onClose={() => setOpenModal(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center ">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500 dark:text-red-500" />
                  <h2 className="mb-2 text-base font-semibold text-gray-700">
                    Delete Senior Resident
                  </h2>
                  <h6 className="mb-3 text-xs  text-gray-700">
                    Are you sure you want to delete this senior resident's
                    information? <br /> This action cannot be undone.
                  </h6>
                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={() => setOpenModal(false)}
                      className="border-none"
                    >
                      <span className="text-xs text-black rounded-md bg-gray-300 px-6 py-3">
                        Cancel
                      </span>
                    </Button>
                    <Button onClick={handleDelete} className="border-none">
                      <span className="text-xs bg-red-500 rounded-md px-6 py-3">
                        Confirm
                      </span>
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeniorResidentList;
