import { CLINIC_SCHEDULE } from "@/config/endpoint";
import { clinicSchedule } from "@/types/schedule";
import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const clinicScheduleInfo = async (
  row: clinicSchedule,
): Promise<void> => {
  await axios.post(`${BASE_URL}${CLINIC_SCHEDULE}`, row, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchClinicSchedule = async (): Promise<clinicSchedule[]> => {
  try {
    const response = await axios.get(`${BASE_URL}${CLINIC_SCHEDULE}`);
    if (response.status === 200) {
      return response.data; // Return the data fetched from the server
    } else {
      console.error("Failed to fetch schedule from the server");
      return [];
    }
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    return [];
  }
};
