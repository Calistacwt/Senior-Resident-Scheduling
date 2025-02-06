// external library
import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "@tanstack/react-router";

// types
import { clinicSchedule } from "@/types/schedule";
import { srList } from "@/types/srList";

// services
import { getSeniorDoctorData } from "@/services/seniorDoctorList";
import { fetchClinicSchedule } from "@/services/schedule";
import {
  createSRSchedule,
  deleteAllSRSchedules,
  getSRSchedule,
} from "@/services/dashboard";
import { getSRData } from "@/services/srList";
import { isPostCall } from "@/utils/calendar";

import { getRoomData, registerRoom } from "@/services/room";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const ClinicSchedule: React.FC = () => {
  const navigate = useNavigate();

  const [fetchedData, setFetchedData] = useState<clinicSchedule[]>([]);
  const [importedData, setImportedData] = useState<clinicSchedule[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // state for modal and settings
  const [isModalOpen, setIsModalOpen] = useState(false);

  // state to track success and failed badges
  const [isUploadSuccessfully, setIsUploadSuccessfully] = useState(false);
  const [isUploadFailed, setIsUploadFailed] = useState(false);

  // state to track success and failed badges
  const [isDeleteSuccessfully, setIsDeleteSuccessfully] = useState(false);
  const [isDeleteFailed, setIsDeleteFailed] = useState(false);

  // badge fade out
  const [fadeOutSuccess, setFadeOutSuccess] = useState(false);
  const [fadeOutFailed, setFadeOutFailed] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  // triage screening by associate psychologist
  const [triageScreeningactivity, setTriageScreeningactivity] =
    useState("Observe DP4");
  const [triageScreeningCount, setTriageScreeningCount] = useState(4);

  // new case clinics observation
  const [newCaseClinicActivity, setNewCaseClinicActivity] = useState(
    "Observe triage clinic"
  );
  const [scheduleCount, setScheduleCount] = useState(4);

  // run triage new case clinic
  const [runTriageClinicactivity, setRunTriageClinicactivity] =
    useState("Run triage NC");
  const [runTriageClinicCount, setRunTriageClinicCount] = useState(20);

  // admin day
  const [adminactivity, setAdminactivity] = useState("Admin Day");
  const [adminDayCount, setAdminDayCount] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);

  // new case clinic observation
  const newCaseClinicObservation = async (
    availableDates: any[],
    srData: any[],
    scheduleCount: number
  ) => {
    // exclude those unavailable on leave dates, call dates or post-call days
    const filteredSlots = availableDates.filter(
      (availableDates) =>
        !srData.some(
          (sr) =>
            sr.leaveDates.some(
              (leave: any) =>
                leave.date === availableDates.date &&
                (leave.session === "FULLDAY" ||
                  leave.session === availableDates.session)
            ) ||
            isPostCall(
              new Date(availableDates.date),
              sr.callDates,
              sr.leaveDates
            )
        )
    );

    // track session to avoid duplication of NC doctor per session
    const assignedSessions = new Set();
    let assignedCount = 0;

    await Promise.all(
      filteredSlots.map((doctor, index) => {
        // stop assigning if the scheduleCount is reached
        if (assignedCount >= scheduleCount) {
          return Promise.resolve();
        }

        // check if the session has already been assigned
        const sessionKey = `${doctor.date}-${doctor.session}`;
        if (assignedSessions.has(sessionKey)) {
          return Promise.resolve();
        }

        // mark this session as assigned
        assignedSessions.add(sessionKey);
        assignedCount++;

        // assign new case clinic observation
        const newSchedule = {
          id: index + 20,
          date: doctor.date,
          dcdScreener: doctor.doctor,
          activity: newCaseClinicActivity,
          room: doctor.room,
          srRoom: "",
          session: doctor.session,
        };

        return createSRSchedule(newSchedule)
          .then(() =>
            console.log("Schedule successfully inserted into the database.")
          )
          .catch((error) => console.error("Error inserting schedule:", error));
      })
    );
  };

  // triage screening
  const triageScreeningObservation = async (
    availableDates: any[],
    srData: srList[],
    newCaseAssignedDoctors: any[],
    triageScreeningCount: number
  ) => {
    // Exclude unavailable doctors based on leave and post-call schedules
    const filteredSlots = availableDates.filter(
      (availableSlot) =>
        !srData.some(
          (sr) =>
            sr.leaveDates.some(
              (leave) =>
                leave.date === availableSlot.date &&
                (leave.session === "FULLDAY" ||
                  leave.session === availableSlot.session)
            ) ||
            // isPostCall(new Date(availableSlot.date), sr.callDates, sr.leaveDates)
            isPostCall(
              new Date(availableSlot.date),
              sr.callDates,
              sr.leaveDates
            )
        )
    );

    let assignedCount = 0;
    const assignedSessions = new Set(); // Track assigned sessions

    for (const [index, originalSlot] of filteredSlots.entries()) {
      if (assignedCount >= triageScreeningCount) {
        break;
      }

      let selectedSlot = originalSlot; // Use a mutable variable

      // Check if an NC doctor is already present in the session
      const hasNCDoctor = newCaseAssignedDoctors.some(
        (doc) =>
          doc.date === originalSlot.date && doc.session === originalSlot.session
      );

      // Check if the session already has a triage screening observation
      const sessionKey = `${originalSlot.date}-${originalSlot.session}`;
      const isSessionAlreadyAssigned = assignedSessions.has(sessionKey);

      // If an NC doctor is present OR the session already has a triage screening, find another date
      if (hasNCDoctor || isSessionAlreadyAssigned) {
        const nextAvailableSlot = filteredSlots.find(
          (nextSlot) =>
            !newCaseAssignedDoctors.some(
              (doc) =>
                doc.date === nextSlot.date && doc.session === nextSlot.session
            ) && !assignedSessions.has(`${nextSlot.date}-${nextSlot.session}`)
        );

        if (!nextAvailableSlot) {
          console.log("No available slot found for triage screening.");
          continue;
        }

        selectedSlot = nextAvailableSlot; // Update the slot variable
      }

      // Mark session as assigned
      assignedSessions.add(`${selectedSlot.date}-${selectedSlot.session}`);

      const newSchedule = {
        id: index + 1,
        date: selectedSlot.date,
        dcdScreener: "Associate Psychologist",
        activity: triageScreeningactivity,
        room: "Rm 25",
        srRoom: "",
        session: selectedSlot.session,
      };

      try {
        await createSRSchedule(newSchedule);
        console.log(
          `Triage Screening assigned to ${selectedSlot.date} - ${selectedSlot.session}`
        );
        assignedCount++;
      } catch (error) {
        console.error("Error inserting triage screening schedule:", error);
      }
    }
  };

  // run triage clinics
  const runTriageClinics = async (
    availableDates: any[],
    srData: any[],
    runTriageClinicCount: number
  ): Promise<void> => {
    // Fetch existing SR schedule to check for date conflicts
    const existingSRSchedule = await getSRSchedule();
    const existingDates: Date[] = existingSRSchedule.map(
      (schedule: any) => new Date(schedule.date)
    );

    // Determine the latest scheduled date
    const latestDate: Date = new Date(
      Math.max(...existingDates.map((date: Date) => date.getTime()))
    );

    // Exclude unavailable dates (leave, call, post-call days)
    const filteredSlots = availableDates.filter((availableDates) => {
      const doctorDate: Date = new Date(availableDates.date);
      return (
        doctorDate > latestDate &&
        !srData.some(
          (sr) =>
            sr.leaveDates.some(
              (leave: any) =>
                leave.date === availableDates.date &&
                (leave.session === "FULLDAY" ||
                  leave.session === availableDates.session)
            ) ||
            isPostCall(
              new Date(availableDates.date),
              sr.callDates,
              sr.leaveDates
            )
        )
      );
    });

    // Track session to avoid duplication of NC doctor per session
    const assignedSessions: Set<string> = new Set();
    let assignedCount: number = 0;

    await Promise.all(
      filteredSlots.map(async (doctor, index) => {
        // Stop assigning if the scheduleCount is reached
        if (assignedCount >= runTriageClinicCount) {
          return Promise.resolve();
        }

        // Check if the session has already been assigned
        const sessionKey: string = `${doctor.date}-${doctor.session}`;
        if (assignedSessions.has(sessionKey)) {
          return Promise.resolve();
        }

        // Dynamically extract room numbers from the Excel data
        const roomAssignments = importedData
          .filter(
            (item: any) =>
              item.Session === doctor.session && item.Date === doctor.date
          )
          .reduce((rooms: Record<string, string>, item: any) => {
            Object.keys(item).forEach((key) => {
              if (key.startsWith("Rm")) {
                rooms[key] = item[key];
              }
            });
            return rooms;
          }, {});

        // Check if all SR rooms are occupied
        const availableRooms: string[] = Object.keys(roomAssignments).filter(
          (room) => !roomAssignments[room]
        );

        // If no SR room is available, do not assign the session
        if (availableRooms.length === 0) {
          console.log(
            `No available SR room for ${doctor.date} - ${doctor.session}, skipping assignment.`
          );
          return Promise.resolve();
        }

        // Select the closest available SR room
        const srRoomAssignment: string = availableRooms.sort()[0];

        // Mark this session as assigned
        assignedSessions.add(sessionKey);
        assignedCount++;

        // Assign run new case clinic observation
        const newSchedule = {
          id: index + 30,
          date: doctor.date,
          dcdScreener: doctor.doctor,
          activity: runTriageClinicactivity,
          room: doctor.room,
          srRoom: srRoomAssignment, // Assign the closest available SR room
          session: doctor.session,
        };

        return createSRSchedule(newSchedule)
          .then(() =>
            console.log("Schedule successfully inserted into the database.")
          )
          .catch((error) => console.error("Error inserting schedule:", error));
      })
    );
  };

  const assignAdminDay = async (
    availableDates: any[],
    scheduledSessions: any[],
    srData: any[]
  ): Promise<void> => {
    // Track assigned sessions from runTriageClinics
    const assignedSessions = new Set(
      scheduledSessions.map((session) => `${session.date}-${session.session}`)
    );

    // Collect all available dates
    const allAvailableDates = new Set(availableDates.map((slot) => slot.date));

    // Identify completely empty dates
    const assignedDates = new Set(
      scheduledSessions.map((session) => session.date)
    );
    const emptyDates = [...allAvailableDates].filter(
      (date) => !assignedDates.has(date)
    );

    // Assign "Admin" to completely empty dates
    for (const [index, date] of emptyDates.entries()) {
      const newSchedule = {
        id: index + 700,
        date,
        dcdScreener: "Admin",
        activity: "Admin Day",
        room: "",
        srRoom: "",
        session: "FULLDAY",
      };

      try {
        await createSRSchedule(newSchedule);
        console.log(`Admin Day assigned for FULLDAY on ${date}`);
      } catch (error) {
        console.error("Error inserting Admin Day schedule:", error);
      }
    }

    // Filter out unavailable sessions (leave, post-call, existing assignments)
    const unassignedSessions = availableDates.filter((slot) => {
      const isAssigned = assignedSessions.has(`${slot.date}-${slot.session}`);

      const isUnavailable = srData.some(
        (sr) =>
          sr.leaveDates.some(
            (leave: any) =>
              leave.date === slot.date &&
              (leave.session === "FULLDAY" || leave.session === slot.session)
          ) || isPostCall(new Date(slot.date), sr.callDates, sr.leaveDates)
      );

      return !isAssigned && !isUnavailable;
    });

    // Assign "Admin" to remaining unassigned sessions
    for (const [index, session] of unassignedSessions.entries()) {
      const newSchedule = {
        id: index + 800,
        date: session.date,
        dcdScreener: "Admin",
        activity: adminactivity,
        room: "",
        srRoom: "",
        session: session.session,
      };

      try {
        await createSRSchedule(newSchedule);
        console.log(
          `Admin Day assigned to ${session.date} - ${session.session}`
        );
      } catch (error) {
        console.error("Error inserting Admin Day schedule:", error);
      }
    }
  };

  const handleGenerateSchedule = async () => {
    if (!importedData || importedData.length === 0) {
      alert("No clinic schedule data available. Please upload a file first.");
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsModalOpen(false);
    const scheduleData = importedData;

    // Fetch required data once to reduce redundant API calls
    const [srData, seniorDoctorData] = await Promise.all([
      getSRData(),
      getSeniorDoctorData(),
    ]);

    const seniorDoctorNames = new Set(
      seniorDoctorData.map((doc: any) => doc.name.replace(/^Dr\s/, ""))
    );

    let availableSlots: any[] = [];
    let matchingDoctors: any[] = [];

    // Process imported schedule data
    scheduleData.forEach(({ Date, Session, ...scheduleItem }) => {
      let hasNCDoctor = false;

      Object.entries(scheduleItem).forEach(([room, value]) => {
        if (typeof value === "string" && value.includes("(NC)")) {
          const doctorName = value.replace("(NC)", "").trim();
          const formattedName = doctorName.startsWith("Dr ")
            ? doctorName
            : `Dr ${doctorName}`;

          if (seniorDoctorNames.has(doctorName.replace(/^Dr\s/, ""))) {
            matchingDoctors.push({
              room,
              doctor: formattedName,
              date: Date,
              session: Session,
            });
            hasNCDoctor = true;
          }
        }
      });

      availableSlots.push({ date: Date, session: Session });
    });

    try {
      // Assign schedules in the correct priority order
      await newCaseClinicObservation(matchingDoctors, srData, scheduleCount);
      await triageScreeningObservation(
        availableSlots,
        srData,
        matchingDoctors,
        triageScreeningCount
      );
      await runTriageClinics(matchingDoctors, srData, runTriageClinicCount);

      // Gather assigned sessions and ensure Admin Day is last priority
      const assignedSessions = [...matchingDoctors, ...(await getSRSchedule())];

      // Assign Admin Day as the last priority
      await assignAdminDay(availableSlots, assignedSessions, srData);
    } catch (error) {
      console.error("Error during schedule generation:", error);
    }

    setTimeout(() => {
      navigate({ to: "/" });
    }, 1500);
  };

  // handle excel file upload
  const handleUploads = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsProcessing(true);
    const file = e.target.files?.[0];
    if (!file) {
      alert("Please select a file!");
      setIsProcessing(false);
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
          // Extract clinic schedule data from the Excel sheet
          const clinicData = XLSX.utils.sheet_to_json<clinicSchedule>(sheet, {
            defval: "",
          });

          // Fetch existing room data using the service
          const existingRoomData = await getRoomData();
          const existingRoomNumbers = existingRoomData.map(
            (room: { roomNumber: string }) => room.roomNumber
          );

          // Identify new room
          const roomsToAdd = newRoomNumbers.filter(
            (room) => !existingRoomNumbers.includes(room)
          );

          // Add new rooms
          for (const roomNumber of roomsToAdd) {
            try {
              await registerRoom({ roomNumber });
            } catch (error) {
              console.error("Error adding room:", roomNumber, error);
            }
          }

          setImportedData(clinicData);
          setFetchedData(clinicData);

          // set success state
          setIsUploadSuccessfully(true);

          // badge fade out
          setFadeOutSuccess(false);
          setTimeout(() => {
            setFadeOutSuccess(true);
          }, 500);
        } catch (error) {
          // set failed state
          setIsUploadFailed(true);
          // badge fade out
          setFadeOutFailed(false);
          setTimeout(() => {
            setFadeOutFailed(true);
          }, 500);
        } finally {
          setIsProcessing(false);
        }
      }
    };

    reader.readAsBinaryString(file);
  };

  // handle open delete modal
  const handleDeleteModal = () => {
    setOpenModal(true);
  };

  const handleDeleteAndGenerateSchedule = async () => {
    try {
      await deleteAllSRSchedules();
      setIsDeleteSuccessfully(true);

      setFadeOutSuccess(false);
      setTimeout(() => {
        setFadeOutSuccess(true);
      }, 500);

      setOpenModal(false);
    } catch (error) {
      console.error("Error deleting schedules:", error);
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
        setIsUploadSuccessfully(false);
      }, 500);
    }

    if (fadeOutFailed) {
      setTimeout(() => {
        setIsUploadFailed(false);
      }, 500);
    }
  }, [fadeOutSuccess, fadeOutFailed]);

  // badge fade out
  useEffect(() => {
    if (fadeOutSuccess) {
      setTimeout(() => {
        setIsDeleteSuccessfully(false);
      }, 500);
    }

    if (fadeOutFailed) {
      setTimeout(() => {
        setIsDeleteFailed(false);
      }, 500);
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
          <div className="flex">
            <div>
              <button
                className="text-xs mr-2 text-black rounded p-1.5 font-semibold border-sidebar-border border flex space-x-2 justify-center items-center"
                onClick={handleButtonClick}
              >
                <img
                  src="/assets/images/export.svg"
                  alt="KKH Logo"
                  className="rounded-md cursor-pointer w-5"
                />
                <div>
                  <p> Import</p>
                </div>
              </button>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              onChange={handleUploads}
            />
            <div>
              <button
                onClick={handleScheduleSetting}
                className={`text-xs mr-2 text-black rounded p-1.5 font-semibold border-sidebar-border border flex space-x-2 justify-center items-center ${
                  isProcessing ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isProcessing}
              >
                <img
                  src="/assets/images/button/generate.png"
                  alt="Generate Logo"
                  className="rounded-md cursor-pointer w-5"
                />
                <div>
                  {isProcessing ? "Processing..." : "Generate Schedule"}
                </div>
              </button>
            </div>

            <div>
              <button
                className="mr-2 text-xs text-black rounded p-1.5 font-semibold border-sidebar-border border flex space-x-2 justify-center items-center"
                onClick={handleDeleteModal}
              >
                <img
                  src="/assets/images/button/delete.png"
                  alt="KKH Logo"
                  className="rounded-md cursor-pointer w-5"
                />
                <div>
                  <p>Delete Schedule</p>
                </div>
              </button>
            </div>
          </div>

          <div></div>
        </div>
      </div>

      {/* sucess delete badge */}
      {isUploadSuccessfully && (
        <div className="bg-badge-am font-semibold text-xs text-badge-success p-2 rounded-md mb-4 flex  items-center space-x-2">
          <div>
            <img
              src="/assets/images/success.png"
              alt="Success Icon"
              className="w-3 rounded-full"
            />
          </div>
          <div>Upload Successfully!</div>
        </div>
      )}

      {/* failed delete badge */}
      {isUploadFailed && (
        <div className="bg-badge-error font-semibold text-xs text-badge-errorText p-2 rounded-md mb-4 flex  items-center space-x-2">
          <div>
            <img
              src="/assets/images/error.png"
              alt="Error Icon"
              className="w-3 rounded-full"
            />
          </div>
          <div>Upload Failed!</div>
        </div>
      )}

      {/* sucess delete badge */}
      {isDeleteSuccessfully && (
        <div className="bg-badge-am font-semibold text-xs text-badge-success p-2 rounded-md mb-4 flex  items-center space-x-2">
          <div>
            <img
              src="/assets/images/success.png"
              alt="Success Icon"
              className="w-3 rounded-full"
            />
          </div>
          <div>Delete Successfully!</div>
        </div>
      )}

      {/* failed delete badge */}
      {isDeleteFailed && (
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
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-8">
            <div className="flex flex-col items-center justify-center space-y-1 text-center">
              <img
                src="/assets/images/button/settings.png"
                alt="Setting"
                className="rounded-md cursor-pointer w-8 mb-2"
              />
              <h1 className="text-lg font-bold">Schedule Configuration</h1>
              <p className="text-xs text-gray-500">
                Configure the number of schedules per activity to suit your
                needs.
              </p>
            </div>

            <div>
              <div className="flex space-x-4">
                {/* Triage Screening by Associate Psychologist */}
                <div className="flex-col space-y-4">
                  <div className="flex-col space-y-2 ">
                    <h1 className="text-base font-bold">Triage Screening</h1>
                    <label className="text-xs font-medium text-form-label">
                      Activity
                    </label>
                    <input
                      type="text"
                      value={triageScreeningactivity}
                      onChange={(e) =>
                        setTriageScreeningactivity(e.target.value)
                      }
                      className="border border-form-label rounded-md w-full text-xs p-2 placeholder:text-2xs placeholder-form-placeholder"
                    />
                  </div>

                  <div className="flex-col space-y-2 ">
                    <label className="text-xs font-medium text-form-label">
                      Number of Schedules
                    </label>
                    <input
                      type="number"
                      value={triageScreeningCount}
                      onChange={(e) =>
                        setTriageScreeningCount(Number(e.target.value))
                      }
                      className="border border-form-label rounded-md w-full text-xs p-2 placeholder:text-2xs placeholder-form-placeholder"
                    />
                  </div>
                </div>

                {/* New Case Clinic */}
                <div className="flex-col space-y-4">
                  <div className="flex-col space-y-2 ">
                    <h1 className="text-base font-bold">New Case Clinic</h1>
                    <label className="text-xs font-medium text-form-label">
                      Activity
                    </label>
                    <input
                      type="text"
                      value={newCaseClinicActivity}
                      onChange={(e) => setNewCaseClinicActivity(e.target.value)}
                      className="border border-form-label rounded-md w-full text-xs p-2 placeholder:text-2xs placeholder-form-placeholder"
                    />
                  </div>

                  <div className="flex-col space-y-2 ">
                    <label className="text-xs font-medium text-form-label">
                      Number of Schedules
                    </label>
                    <input
                      type="number"
                      value={scheduleCount}
                      onChange={(e) => setScheduleCount(Number(e.target.value))}
                      className="border border-form-label rounded-md w-full text-xs p-2 placeholder:text-2xs placeholder-form-placeholder"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                {/* Run NC Clinic */}
                <div className="flex-col space-y-4 mt-6">
                  <div className="flex-col space-y-2 ">
                    <h1 className="text-base font-bold">Run NC Clinics</h1>
                    <label className="text-xs font-medium text-form-label">
                      Activity
                    </label>
                    <input
                      type="text"
                      value={runTriageClinicactivity}
                      onChange={(e) =>
                        setRunTriageClinicactivity(e.target.value)
                      }
                      className="border border-form-label rounded-md w-full text-xs p-2 placeholder:text-2xs placeholder-form-placeholder"
                    />
                  </div>

                  <div className="flex-col space-y-2 ">
                    <label className="text-xs font-medium text-form-label">
                      Number of Schedules
                    </label>
                    <input
                      type="number"
                      value={runTriageClinicCount}
                      onChange={(e) =>
                        setRunTriageClinicCount(Number(e.target.value))
                      }
                      className="border border-form-label rounded-md w-full text-xs p-2 placeholder:text-2xs placeholder-form-placeholder"
                    />
                  </div>
                </div>

                <div className="flex-col space-y-4 mt-6">
                  <div className="flex-col space-y-2 ">
                    <h1 className="text-base font-bold">Admin Day</h1>
                    <label className="text-xs font-medium text-form-label">
                      Activity
                    </label>
                    <input
                      type="text"
                      value={adminactivity}
                      onChange={(e) => setAdminactivity(e.target.value)}
                      className="border border-form-label rounded-md w-full text-xs p-2 placeholder:text-2xs placeholder-form-placeholder"
                    />
                  </div>

                  <div className="flex-col space-y-2 ">
                    <label className="text-xs font-medium text-form-label">
                      Number of Schedules
                    </label>
                    <input
                      type="number"
                      value={adminDayCount}
                      onChange={(e) => setAdminDayCount(Number(e.target.value))}
                      className="border border-form-label rounded-md w-full text-xs p-2 placeholder:text-2xs placeholder-form-placeholder"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-white border  text-black font-medium text-xs p-2 rounded-md px-3"
              >
                Cancel
              </button>

              <button
                onClick={handleGenerateSchedule}
                className="bg-sidebar-active    text-white font-medium text-xs p-2 rounded-md"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

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
                    Remove Exisiting SR Schedule
                  </h2>
                  <h6 className="mb-3 text-xs  text-gray-700">
                    Are you sure you want to delete all Senior Resident
                    Schedule? <br /> This action cannot be undone.
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
                    <Button
                      onClick={handleDeleteAndGenerateSchedule}
                      className="border-none"
                    >
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

      {/* Table */}
      <div className="flex justify-center items-center xl:max-w-[1500px] ">
        <div className="overflow-x-auto overflow-y-auto bg-background rounded-lg max-w-2xl xl:max-w-full max-h-xl xl:max-h-[700px]">
          {fetchedData.length > 0 ? (
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
          ) : (
            <div className="flex justify-center items-center h-[200px] text-center">
              <p className="text-sm font-medium text-gray-500">
                No data has been imported at this time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicSchedule;
