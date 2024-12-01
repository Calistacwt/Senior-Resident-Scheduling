import { SCHEDULE } from "@/config/endpoint";

import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const getSRSchedule = async () => {
  const response = await axios.get(`${BASE_URL}${SCHEDULE}`);
  return response.data;
};

export const getSRScheduleById = async (id: any) => {
  const response = await axios.get(`${BASE_URL}${SCHEDULE}/${id}`);
  return response.data;
};
