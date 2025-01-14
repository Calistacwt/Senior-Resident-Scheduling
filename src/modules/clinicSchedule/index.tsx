// external library
import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";

// external UI component and icons
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

// types
import { clinicSchedule } from "@/types/schedule";

// services
import { getSeniorDoctorData } from "@/services/seniorDoctorList";
import {
  clinicScheduleInfo,
  deleteAllClinicSchedules,
  fetchClinicSchedule,
} from "@/services/schedule";
import { createSRSchedule } from "@/services/dashboard";

const ClinicSchedule: React.FC = () => {
  const navigate = useNavigate();

  const [fetchedData, setFetchedData] = useState<clinicSchedule[]>([]);
  const [_importedData, setImportedData] = useState<clinicSchedule[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // New states for modal and settings
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // state to track success and failed badges
  const [isDeletedSuccessfully, setIsDeletedSuccessfully] = useState(false);
  const [isDeletedFailed, setIsDeletedFailed] = useState(false);

  // badge fade out
  const [fadeOutSuccess, setFadeOutSuccess] = useState(false);
  const [fadeOutFailed, setFadeOutFailed] = useState(false);

  // triage screening by associate psychologist
  const [triageScreeningactivity, setTriageScreeningactivity] =
    useState("Observe DP4");
  const [triageScreeningCount, setTriageScreeningCount] = useState(4);

  // new case clinics
  const [activity, setActivity] = useState("Observe triage clinic");
  const [scheduleCount, setScheduleCount] = useState(4);

  // triage screening by associate psychologist
  const triageScreeningObservation = async (availableSlots: any[]) => {
    availableSlots
      .slice(0, triageScreeningCount)
      .forEach(async (slot, index) => {
        const newSchedule = {
          id: index + 5,
          date: slot.date,
          dcdScreener: "Associate Psychologist",
          activity: triageScreeningactivity,
          room: "Rm 25",
          srRoom: "",
          session: slot.session,
        };

        console.log("Newly inserted DP4 Schedule:", newSchedule);

        // Insert the new schedule into the SR Schedule database
        try {
          await createSRSchedule(newSchedule); // API call to insert new schedule
          console.log("DP4 Schedule successfully inserted into the database.");
        } catch (error) {
          console.error("Error inserting DP4 schedule:", error);
        }
      });
  };

  // o

  // observe new case clinic -- triage
  const newCaseClinicObservation = async (doctors: any[]) => {
    doctors.slice(0, scheduleCount).forEach(async (doctor, index) => {
      const newSchedule = {
        id: index + 1,
        date: doctor.date,
        dcdScreener: doctor.doctor,
        activity,
        room: doctor.room,
        srRoom: "",
        session: doctor.session,
      };

      try {
        await createSRSchedule(newSchedule);
        console.log("Schedule successfully inserted into the database.");
      } catch (error) {
        console.error("Error inserting schedule:", error);
      }
    });
  };

  const handleGenerateSchedule = async () => {
    setIsModalOpen(false);

    const scheduleData = await fetchClinicSchedule();
    const seniorDoctorNames = new Set(
      (await getSeniorDoctorData()).map((doctor: any) =>
        doctor.name.replace(/^Dr\s/, "")
      )
    );

    const matchingDoctors = [];
    const availableSlots = [];

    for (const { Date, Session, ...scheduleItem } of scheduleData) {
      let hasNCDoctor = false;

      for (const [key, value] of Object.entries(scheduleItem)) {
        if (typeof value === "string" && value.includes("(NC)")) {
          const doctorName = value.replace("(NC)", "").trim();
          const updatedDoctorName = doctorName.startsWith("Dr ")
            ? doctorName
            : `Dr ${doctorName}`;

          if (seniorDoctorNames.has(doctorName.replace(/^Dr\s/, ""))) {
            matchingDoctors.push({
              room: key,
              doctor: updatedDoctorName,
              date: Date,
              session: Session,
            });
            hasNCDoctor = true;
          }
        }
      }

      if (!hasNCDoctor) availableSlots.push({ date: Date, session: Session });
    }
    await newCaseClinicObservation(matchingDoctors);

    if (availableSlots.length > 0) {
      console.log("Available slots for DP4 observation:", availableSlots);
      await triageScreeningObservation(availableSlots);
    } else {
      console.log("No available slots for DP4 observation.");
    }
    navigate({ to: "/" });
  };

  const handleUploads = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (event) => {
      const data = event.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // Extract room numbers
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const rawRoomNumbers: string[] = jsonData[0] as string[];
        const newRoomNumbers = rawRoomNumbers.slice(3);

        try {
          // Extract clinic schedule data
          const clinicData = XLSX.utils.sheet_to_json<clinicSchedule>(sheet, {
            defval: "",
          });

          // Save clinic schedule
          let clinicScheduleUploadSuccess = true;
          for (const row of clinicData) {
            try {
              await clinicScheduleInfo(row);
            } catch (error) {
              console.error("Error uploading clinic schedule row:", error);
              clinicScheduleUploadSuccess = false;
              break;
            }
          }

          if (clinicScheduleUploadSuccess) {
            // Fetch existing room data only if the clinic schedule is successfully uploaded
            const { data: existingRoomData } = await axios.get(
              "http://localhost:4000/room"
            );
            const existingRoomNumbers = existingRoomData.map(
              (room: { roomNumber: string }) => room.roomNumber
            );

            // Identify new and removed rooms
            const roomsToAdd = newRoomNumbers.filter(
              (room) => !existingRoomNumbers.includes(room)
            );
            const roomsToRemove = existingRoomNumbers.filter(
              (room: any) => !newRoomNumbers.includes(room)
            );

            // Add new rooms
            for (const roomNumber of roomsToAdd) {
              try {
                await axios.post("http://localhost:4000/room", { roomNumber });
              } catch (error) {
                console.error("Error adding room:", roomNumber, error);
              }
            }

            // Remove old rooms
            for (const roomNumber of roomsToRemove) {
              try {
                await axios.delete(`http://localhost:4000/room/${roomNumber}`);
              } catch (error) {
                console.error("Error removing room:", roomNumber, error);
              }
            }

            // Refresh data after processing
            const updatedScheduleData = await fetchClinicSchedule();
            setFetchedData(updatedScheduleData);
            setImportedData(clinicData);
            alert("Clinic schedule and room data imported successfully!");
          } else {
            alert(
              "Clinic schedule upload failed. No data was saved. Please check the file and try again."
            );
          }
        } catch (error) {
          console.error("Error processing the file:", error);
          alert("An error occurred while importing data. Please try again.");
        }
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleDeleteClinicSchedules = async () => {
    try {
      // API call the update function
      await deleteAllClinicSchedules();

      // set success state
      setIsDeletedSuccessfully(true);

      // badge fade out
      setFadeOutSuccess(false);
      setTimeout(() => {
        setFadeOutSuccess(true);
      }, 500);

      // redirect page
      setTimeout(() => {
        navigate({ to: `/` });
      }, 1500);
    } catch (error) {
      setIsDeletedFailed(true);

      // badge fade out
      setFadeOutFailed(false);
      setTimeout(() => {
        setFadeOutFailed(true);
      }, 500);

      // redirect page
      setTimeout(() => {
        navigate({ to: `/clinicSchedule` });
      }, 1500);
    }
  };

  const handleScheduleSetting = async () => {
    setIsModalOpen(true);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // fetch all clinic schedule
  useEffect(() => {
    const getSchedule = async () => {
      const scheduleData = await fetchClinicSchedule();
      setFetchedData(scheduleData);
    };

    getSchedule();
  }, []);

  // badge fade out
  useEffect(() => {
    if (fadeOutSuccess) {
      setTimeout(() => {
        setIsDeletedSuccessfully(false);
      }, 1500);
    }

    if (fadeOutFailed) {
      setTimeout(() => {
        setIsDeletedFailed(false);
      }, 1500);
    }
  }, [fadeOutSuccess, fadeOutFailed]);

  return (
    <div className="mt-3">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex mb-3 space-y-1">
          <div>
            <h1 className="font-bold text-xl">Clinic Schedule Overview</h1>
            <h6 className="text-xs text-dashboard-text">
              A Overview of Clinic Schedule
            </h6>
          </div>
        </div>

        <div className="flex space-x-4">
          <div>
            <button
              className="text-xs text-black rounded p-1.5 font-semibold border-sidebar-border border flex space-x-2 justify-center items-center"
              onClick={
                fetchedData.length > 0
                  ? handleDeleteClinicSchedules
                  : handleButtonClick
              }
            >
              <img
                src="/assets/images/export.svg"
                alt="KKH Logo"
                className="rounded-md cursor-pointer w-5"
              />
              <div>
                <p>{fetchedData.length > 0 ? "Delete Schedules" : "Import"}</p>
              </div>
            </button>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              onChange={handleUploads}
            />
          </div>

          <div>
            <button
              className="text-xs text-black rounded p-1.5 font-semibold border-sidebar-border border flex space-x-2 justify-center items-center"
              onClick={handleScheduleSetting}
            >
              <img
                src="/assets/images/button/generate.png"
                alt="Generate Logo"
                className="rounded-md cursor-pointer w-5"
              />
              <div>
                <p>Generate Schedule</p>
              </div>
            </button>
          </div>
        </div>
      </div>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-lg font-bold">Schedule Settings</h2>

            <div>
              <p className="text-base font-semibold ">Observation Session</p>
            </div>

            <div>
              <p className="text-sm font-semibold underline ">
                New Case Clinic
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium">Activity</label>
              <input
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium">
                Number of Schedules
              </label>
              <input
                type="number"
                value={scheduleCount}
                onChange={(e) => setScheduleCount(Number(e.target.value))}
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <p className="text-sm font-semibold underline ">
                Triage Screening
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium">Activity</label>
              <input
                type="text"
                value={triageScreeningactivity}
                onChange={(e) => setTriageScreeningactivity(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium">
                Number of Schedules
              </label>
              <input
                type="number"
                value={triageScreeningCount}
                onChange={(e) =>
                  setTriageScreeningCount(Number(e.target.value))
                }
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleGenerateSchedule}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* delete session modal */}
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
                Delete Session
              </h2>
              <h6 className="mb-3 text-xs  text-gray-700">
                Are you sure you want to delete this session information? <br />{" "}
                This action cannot be undone.
              </h6>
              <div className="flex justify-center gap-4">
                <Button color="failure" className="border-none">
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

      {/* Table */}
      <div className="flex justify-center items-center xl:max-w-[1500px] ">
        <div className="overflow-x-auto overflow-y-auto bg-background rounded-lg max-w-2xl xl:max-w-full max-h-xl xl:max-h-[700px]">
          {fetchedData.length > 0 && (
            <table className="whitespace-nowrap bg-white mt-3">
              <thead className="text-left bg-background border border-sidebar">
                <tr className="border border-sidebar">
                  {Object.keys(fetchedData[0]).map((key) => (
                    <th
                      key={key}
                      className=" whitespace-nowrap px-4 py-3 text-2xs font-medium border border-sidebar"
                    >
                      {key.startsWith("__EMPTY") ? "" : key}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="w-full border-y border-outline bg-white rounded-2xl">
                {fetchedData.map((row, index) => (
                  <tr key={index} className="border border-sidebar">
                    {Object.values(row).map((value, idx) => (
                      <td
                        key={idx}
                        className="p-4 font-medium text-2xs xl:text-xs border border-sidebar"
                        style={{
                          backgroundColor:
                            typeof value === "string" && value.includes("(NC)")
                              ? "yellow"
                              : "white", // Check if value is a string before calling includes
                        }}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicSchedule;
