// external library
import { useState, useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

// external UI component and icons
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal } from "flowbite-react";

// services
import {
  deleteSRScheduleById,
  getSRSchedule,
  getSRScheduleById,
  updateSRScheduleById,
} from "@/services/dashboard";
import { getSeniorDoctorData } from "@/services/seniorDoctorList";
import { getRoomData } from "@/services/room";

// types
import { srSchedule } from "@/types/dashboard";

// component
import ScheduleSRForm from "../component/scheduleSRForm";
import Card from "../component/card";

const UpdateScheduleSR = () => {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/scheduleSR/$id/edit" });

  // state to store fetched clinic schedule
  const [_scheduleData, setScheduleData] = useState([]);
  const [allSRscheduleData, setAllSRscheduleData] = useState([]);
  
  // state to store senior doctor data -- dropdown
  const [seniorDoctorData, setseniorDoctorData] = useState([]);

  // state to store room data --- dropdown
  const [roomData, setRoomData] = useState([]);

  // state to track the ID
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // state to track success and failed badges
  const [isUpdatedSuccessfully, setIsUpdatedSuccessfully] = useState(false);
  const [isUpdatedFailed, setIsUpdatedFailed] = useState(false);
  const [isDeletedSuccessfully, setIsDeletedSuccessfully] = useState(false);
  const [isDeletedFailed, setIsDeletedFailed] = useState(false);

  // badge fade out
  const [fadeOutFailed, setFadeOutFailed] = useState(false);

  // modal state
  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState<srSchedule>({
    id: 0,
    date: "",
    dcdScreener: "",
    activity: "",
    room: "",
    srRoom: "",
    session: "",
  });

  // handle form submission
  const handleUpdate = async (updatedData: srSchedule) => {
    try {
      // API call the update function
      await updateSRScheduleById(id, updatedData);

      // set success state
      setIsUpdatedSuccessfully(true);

      // redirect page
      setTimeout(() => {
        navigate({ to: `/` });
      }, 1200);
    } catch (error) {
      setIsUpdatedFailed(true);

      // badge fade out
      setFadeOutFailed(false);
      setTimeout(() => {
        setFadeOutFailed(true);
      }, 500);

      // redirect page
      setTimeout(() => {
        navigate({ to: `/` });
      }, 1500);
    }
  };

  // handle information deletion
  const handleDelete = async () => {
    if (deleteId) {
      try {
        // API call the delete function
        await deleteSRScheduleById(deleteId);

        // set open modal state
        setOpenModal(false);

        // set sucess state
        setIsDeletedSuccessfully(true);

        // redirect page
        setTimeout(() => {
          navigate({ to: `/` });
        }, 1200);
      } catch (error) {
        setIsDeletedFailed(true);

        // badge fade out
        setFadeOutFailed(false);
        setTimeout(() => {
          setFadeOutFailed(true);
        }, 500);

        // redirect page
        setTimeout(() => {
          navigate({ to: `/` });
        }, 1500);
      } finally {
        setDeleteId(null);
        setOpenModal(false);
      }
    }
  };

  // handle open delete modal
  const handleDeleteModal = (id: number) => {
    setDeleteId(id);
    setOpenModal(true);
  };

  // fetch srSchedule by ID
  useEffect(() => {
    const fetchSchedule = async () => {
      const data = await getSRScheduleById(id);
      setScheduleData(data);

      if (data) {
        setFormData({
          id,
          date: data.date || "",
          dcdScreener: data.dcdScreener || "",
          activity: data.activity || "",
          session: data.session || "",
          room: data.room || "",
          srRoom: data.srRoom || "",
        });
      }
    };

    fetchSchedule();
  }, [id]);

  // fetch all srSchedule 
  useEffect(() => {
    const fetchAllSchedule = async () => {
      const data = await getSRSchedule();
      setAllSRscheduleData(data);
    };
    fetchAllSchedule();
  }, []);

  // fetch all senior doctor list
  useEffect(() => {
    const fetchSeniorDoctorData = async () => {
      const data = await getSeniorDoctorData();
      setseniorDoctorData(data);
    };

    fetchSeniorDoctorData();
  }, []);

  // fetch all room list
  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getRoomData();
      setRoomData(data);
    };
    fetchRooms();
  }, []);

  // badge fade out
  useEffect(() => {
    if (fadeOutFailed) {
      setTimeout(() => {
        setIsUpdatedFailed(false);
      }, 1500);
    }
  }, [fadeOutFailed]);

  return (
    <div>
      <div className=" mb-3 space-y-1">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-xl">
              Senior Resident Schedule Planner
            </h1>
            <h6 className="text-xs text-dashboard-text">
              Update Senior Resident Doctors Schedule
            </h6>
          </div>

          {/* sucess update badge */}
          {isUpdatedSuccessfully && (
            <div className="bg-badge-am font-semibold text-xs text-badge-success p-2 rounded-md mb-4 flex  items-center space-x-2">
              <div>
                <img
                  src="/assets/images/success.png"
                  alt="Success Icon"
                  className="w-3 rounded-full"
                />
              </div>
              <div>Updated Successfully!</div>
            </div>
          )}
          {/* failed update badge */}
          {isUpdatedFailed && (
            <div className="bg-badge-error font-semibold text-xs text-badge-errorText p-2 rounded-md mb-4 flex  items-center space-x-2">
              <div>
                <img
                  src="/assets/images/error.png"
                  alt="Error Icon"
                  className="w-3 rounded-full"
                />
              </div>
              <div>Update Failed!</div>
            </div>
          )}
          {/* sucess delete badge */}
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

      <div className="bg-white  p-8 rounded-xl mt-5">
        <div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className=" font-bold text-md mb-3 ">
                Senior Resident Schedule
              </h3>
            </div>

            <div>
              <button
                onClick={() => handleDeleteModal(formData.id)}
                className="mb-2 text-xs text-black rounded p-1.5 font-semibold border-sidebar-border border flex space-x-2 justify-center items-center hover:bg-red-500 hover:text-white"
              >
                <div>
                  <p>Delete Session</p>
                </div>
              </button>
            </div>
          </div>

          <hr className="border-1 border-background-hr" />
        </div>

        <div className="flex">
          <div className="flex-1 ">
            <ScheduleSRForm
              seniorDoctorData={seniorDoctorData}
              roomData={roomData}
              formData={formData}
              setFormData={setFormData}
              handleUpdate={handleUpdate}
              handleSubmit={handleUpdate}
              mode="edit"
            />
          </div>

          <div className="flex-2">
            <Card allSRscheduleData={allSRscheduleData} />
          </div>

          {/* delete modal for session */}
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
                      <h2 className="mb-2 text-sm font-semibold text-gray-700">
                        Delete Session
                      </h2>
                      <h6 className="mb-3 text-xs  text-gray-700">
                        Are you sure you want to delete this session
                        information? <br /> This action cannot be undone.
                      </h6>
                      <div className="flex justify-center gap-4">
                        <Button
                          onClick={() => setOpenModal(false)}
                          className="border-none"
                        >
                          <span className="text-xs text-black rounded-md bg-gray-300 px-6 py-3  ">
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
      </div>
    </div>
  );
};

export default UpdateScheduleSR;
