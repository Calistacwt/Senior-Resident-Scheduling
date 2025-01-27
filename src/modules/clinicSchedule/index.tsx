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
import { createSRSchedule, getSRSchedule } from "@/services/dashboard";
import { getSRData } from "@/services/srList";
import { isPostCall } from "@/utils/calendar";

import { getRoomData, registerRoom } from "@/services/room";

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

  // badge fade out
  const [fadeOutSuccess, setFadeOutSuccess] = useState(false);
  const [fadeOutFailed, setFadeOutFailed] = useState(false);

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
  const [runTriageClinicCount, setRunTriageClinicCount] = useState(12);

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
    // exclude those unavailable on leave dates, call dates, or post-call days
    const filteredSlots = availableDates.filter(
      (availableSlot) =>
        !srData.some(
          (sr) =>
            sr.leaveDates.some(
              (leave: any) =>
                leave.date === availableSlot.date &&
                (leave.session === "FULLDAY" ||
                  leave.session === availableSlot.session)
            ) ||
            isPostCall(
              new Date(availableSlot.date),
              sr.callDates,
              sr.leaveDates
            )
        )
    );

    // track session to avoid duplication of NC doctor per session
    let assignedCount = 0;

    // Iterate through filtered slots
    for (const [index, slot] of filteredSlots.entries()) {
      // Stop assigning once the triageScreeningCount is reached
      if (assignedCount >= triageScreeningCount) {
        break;
      }

      // Check if there's an NC doctor for the session
      const hasNCDoctor = newCaseAssignedDoctors.some(
        (doc) => doc.date === slot.date && doc.session === slot.session
      );

      // Allow assignment if there is no NC doctor or if newCaseClinicObservation has finished assigning
      if (
        !hasNCDoctor ||
        newCaseAssignedDoctors.every((doc) => doc.isAssigned)
      ) {
        const newSchedule = {
          id: index + 1,
          date: slot.date,
          dcdScreener: "Associate Psychologist",
          activity: triageScreeningactivity,
          room: "Rm 25",
          srRoom: "",
          session: slot.session,
        };

        try {
          await createSRSchedule(newSchedule);
          console.log("DP4 Schedule successfully inserted into the database.");
          assignedCount++; // Increment the assigned count
        } catch (error) {
          console.error("Error inserting DP4 schedule:", error);
        }
      }
    }
  };

  // run triage clinics
  const runTriageClinics = async (
    availableDates: any[],
    srData: any[],
    runTriageClinicCount: number
  ) => {
    // Fetch existing SR schedule to check for date conflicts
    const existingSRSchedule = await getSRSchedule();
    const existingDates = existingSRSchedule.map(
      (schedule: any) => new Date(schedule.date)
    );

    // Determine the latest scheduled date
    const latestDate = new Date(
      Math.max(...existingDates.map((date: any) => date.getTime()))
    );

    // Exclude those unavailable on leave dates, call dates, or post-call days
    const filteredSlots = availableDates.filter((availableDates) => {
      const doctorDate = new Date(availableDates.date);
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
    const assignedSessions = new Set();
    let assignedCount = 0;

    await Promise.all(
      filteredSlots.map((doctor, index) => {
        // Stop assigning if the scheduleCount is reached
        if (assignedCount >= runTriageClinicCount) {
          return Promise.resolve();
        }

        // Check if the session has already been assigned
        const sessionKey = `${doctor.date}-${doctor.session}`;
        if (assignedSessions.has(sessionKey)) {
          return Promise.resolve();
        }

        // Mark this session as assigned
        assignedSessions.add(sessionKey);
        assignedCount++;

        // Dynamically extract room numbers from the Excel data
        const roomNumbers = importedData.reduce(
          (rooms: string[], item: any) => {
            if (item.Session === doctor.session && item.Date === doctor.date) {
              Object.keys(item).forEach((key) => {
                if (key.startsWith("Rm") && !rooms.includes(key)) {
                  rooms.push(key);
                }
              });
            }
            return rooms;
          },
          []
        );

        // Find available SR room in the same session
        const assignedRooms = filteredSlots.map((slot) => slot.room);
        const availableRoom = roomNumbers.find(
          (room) => !assignedRooms.includes(room) && room !== doctor.room
        );

        if (!availableRoom) {
          console.error("No available room found for SR.");
          return Promise.resolve();
        }

        // Assign run new case clinic observation
        const newSchedule = {
          id: index + 30,
          date: doctor.date,
          dcdScreener: doctor.doctor,
          activity: runTriageClinicactivity,
          room: doctor.room,
          srRoom: availableRoom, // Assign SR room
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

  const handleGenerateSchedule = async () => {
    if (!importedData || importedData.length === 0) {
      alert("No clinic schedule data available. Please upload a file first.");
      return;
    }

    setIsModalOpen(false);

    const scheduleData = importedData;

    // fetch senior resident data
    const srData = await getSRData();

    const seniorDoctorNames = new Set(
      (await getSeniorDoctorData()).map((doctor: any) =>
        doctor.name.replace(/^Dr\s/, "")
      )
    );

    const matchingDoctors: any[] = [];
    let availableSlots = [];

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
      availableSlots.push({ date: Date, session: Session });
    }
    try {
      // Assign New Case Clinic Observations
      await newCaseClinicObservation(matchingDoctors, srData, scheduleCount);

      // Assign Triage Screening Observation
      await triageScreeningObservation(
        availableSlots,
        srData,
        matchingDoctors,
        triageScreeningCount
      );

      await runTriageClinics(matchingDoctors, srData, runTriageClinicCount);
    } catch (error) {
      console.error("Error while assigning observations:", error);
    }

    setTimeout(() => {
      navigate({ to: "/" });
    }, 1500);
  };

  // handle excel file upload
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
        }
      }
    };

    reader.readAsBinaryString(file);
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
      }, 1500);
    }

    if (fadeOutFailed) {
      setTimeout(() => {
        setIsUploadFailed(false);
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
              onClick={handleButtonClick}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-8">
            <h2 className="text-lg font-bold">Schedule Settings</h2>

            <div>
              <h1 className="text-base font-semibold mb-2">
                Observation Session
              </h1>

              <div className="flex space-x-4">
                {/* Triage Screening by Associate Psychologist */}
                <div className="flex-col space-y-4">
                  <div className="flex-col space-y-2 ">
                    <p className="text-sm font-semibold underline ">
                      Triage Screening
                    </p>

                    <label className="block text-xs font-medium">
                      Activity
                    </label>
                    <input
                      type="text"
                      value={triageScreeningactivity}
                      onChange={(e) =>
                        setTriageScreeningactivity(e.target.value)
                      }
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  <div className="flex-col space-y-2 ">
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
                </div>

                {/* New Case Clinic */}
                <div className="flex-col space-y-4">
                  <div className="flex-col space-y-2 ">
                    <p className="text-sm font-semibold underline ">
                      New Case Clinic
                    </p>
                    <label className="block text-xs font-medium">
                      Activity
                    </label>
                    <input
                      type="text"
                      value={newCaseClinicActivity}
                      onChange={(e) => setNewCaseClinicActivity(e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  <div className="flex-col space-y-2 ">
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
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-base font-semibold mb-2">
                NC clinics to run
              </h1>

              <div className="flex space-x-4">
                {/* Run triage clinic */}
                <div className="flex-col space-y-4">
                  <div className="flex-col space-y-2 ">
                    <p className="text-sm font-semibold underline ">
                      Run triage NC
                    </p>

                    <label className="block text-xs font-medium">
                      Activity
                    </label>
                    <input
                      type="text"
                      value={runTriageClinicactivity}
                      onChange={(e) =>
                        setRunTriageClinicactivity(e.target.value)
                      }
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  <div className="flex-col space-y-2 ">
                    <label className="block text-xs font-medium">
                      Number of Schedules
                    </label>
                    <input
                      type="number"
                      value={runTriageClinicCount}
                      onChange={(e) =>
                        setRunTriageClinicCount(Number(e.target.value))
                      }
                      className="border p-2 rounded w-full"
                    />
                  </div>
                </div>

                <div className="flex-col space-y-4">
                  {/* Admin Days */}
                  <div className="flex-col space-y-2 ">
                    <p className="text-sm font-semibold underline ">Admin</p>
                    <label className="block text-xs font-medium">
                      Activity
                    </label>
                    <input
                      type="text"
                      // value={activity}
                      // onChange={(e) => setActivity(e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  <div className="flex-col space-y-2 ">
                    <label className="block text-xs font-medium">
                      Number of Schedules
                    </label>
                    <input
                      type="number"
                      // value={scheduleCount}
                      // onChange={(e) => setScheduleCount(Number(e.target.value))}
                      className="border p-2 rounded w-full"
                    />
                  </div>
                </div>
              </div>
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
