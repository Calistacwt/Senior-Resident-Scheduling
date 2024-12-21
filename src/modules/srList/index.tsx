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
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import "/src/styles/custom-modal.css";
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
        <List SRData={SRData} onDelete={confirmDelete} />
      </div>

      <div>
        <Modal
          show={openModal}
          size="xs"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center ">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500 dark:text-red-500" />
              <h3 className="mb-5 text-sm font-semibold text-gray-700">
                Are you sure you want to delete this senior resident's
                information?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDelete}>
                  <span className="text-2xs py-0.5">Confirm</span>
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  <span className="text-2xs text-black">Cancel</span>
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
