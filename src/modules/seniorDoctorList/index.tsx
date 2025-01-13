import { useEffect, useState } from "react";
import {
  deleteSeniorDoctorInfo,
  getSeniorDoctorData,
  searchSeniorDoctorData,
  sortSeniorDoctorDataASC,
  sortSeniorDoctorDataDESC,
} from "@/services/seniorDoctorList";

import List from "./component/list";
import Searchbar from "./component/searchbar";
import { seniorDoctorList } from "@/types/seniorDoctorList";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const SrList = () => {
  const [seniorDoctorData, setSeniorDoctorData] = useState<seniorDoctorList[]>(
    []
  );
  const [isAscending, setIsAscending] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchSRData = async () => {
      const data = await getSeniorDoctorData();
      setSeniorDoctorData(data);
    };

    fetchSRData();
  }, []);

  const handleSearch = async (value: string) => {
    try {
      if (value.trim() === "") {
        const data = await getSeniorDoctorData();
        setSeniorDoctorData(data);
      } else {
        const data = await searchSeniorDoctorData(value);
        setSeniorDoctorData(data);
      }
    } catch (error) {
      console.error("Error searching Senior Doctor data:", error);
    }
  };

  const handleFilterToggle = async () => {
    try {
      const data = isAscending
        ? await sortSeniorDoctorDataASC()
        : await sortSeniorDoctorDataDESC();
      setSeniorDoctorData(data);
      setIsAscending(!isAscending);
    } catch (error) {
      console.error("Error sorting Senior Doctor data:", error);
    }
  };

  const handleClearSearch = async () => {
    const data = await getSeniorDoctorData();
    setSeniorDoctorData(data);
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setOpenModal(true);
  };

  const handleDelete = async () => {
    try {
      if (deleteId) {
        await deleteSeniorDoctorInfo(deleteId);
        setSeniorDoctorData(
          seniorDoctorData.filter(
            (seniorDoctorData) => seniorDoctorData.id !== deleteId
          )
        );
        setDeleteId(null);
      }
    } catch (error) {
      console.error("Error deleting SR data:", error);
    } finally {
      setOpenModal(false);
    }
  };

  return (
    <div className="m-2">
      <div>
        <div className="mb-3">
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
        <List seniorDoctorData={seniorDoctorData} onDelete={confirmDelete} />
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
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500 dark:text-red-500" />
              <h2 className="mb-2 text-sm font-semibold text-gray-700">
                Delete Senior Doctor
              </h2>
              <h6 className="mb-3 text-xs text-gray-700">
                Are you sure you want to delete this senior doctor's
                information?
                <br /> This action cannot be undone.
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

export default SrList;
