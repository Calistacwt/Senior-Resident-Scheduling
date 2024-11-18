import { SCHEDULE, SCHEDULE_UPDATE } from "@/config/endpoint";

import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const getSRSchedule = async () => {
  const response = await axios.get(`${BASE_URL}${SCHEDULE}`);
  return response.data;
};

export const updateSRSchedule = async (id: number, updatedData: object) => {
  const response = await axios.put(
    `${BASE_URL}${SCHEDULE_UPDATE.replace(":id", String(id))}`,
    updatedData,
  );
  return response.data;
};
