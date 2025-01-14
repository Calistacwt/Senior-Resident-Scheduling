import { CLINIC_SCHEDULE } from "@/config/endpoint";
import { clinicSchedule } from "@/types/schedule";
import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const clinicScheduleInfo = async (
  row: clinicSchedule
): Promise<void> => {
  await axios.post(`${BASE_URL}${CLINIC_SCHEDULE}`, row, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchClinicSchedule = async (): Promise<clinicSchedule[]> => {
  const response = await axios.get(`${BASE_URL}${CLINIC_SCHEDULE}`);
  return response.data;
};

export const deleteAllClinicSchedules = async (): Promise<void> => {
  const schedules = await fetchClinicSchedule();
  const deletePromises = schedules.map((schedule) =>
    axios.delete(`${BASE_URL}${CLINIC_SCHEDULE}/${schedule.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

  await Promise.all(deletePromises);
};