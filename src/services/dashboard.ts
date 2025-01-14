import axios from "axios";
import { SCHEDULE } from "@/config/endpoint";

const BASE_URL = "http://localhost:4000";

// create session for SR schedule
export const createSRSchedule = async (scheduleData: any) => {
  const response = await axios.post(`${BASE_URL}${SCHEDULE}`, scheduleData);
  return response.data;
};

// update session for SR schedule by ID
export const updateSRScheduleById = async (id: number, scheduleData: any) => {
  const response = await axios.put(`${BASE_URL}${SCHEDULE}/${id}`, scheduleData);
  return response.data;
};

// get all session for SR schedule
export const getSRSchedule = async () => {
  const response = await axios.get(`${BASE_URL}${SCHEDULE}`);
  return response.data;
};

// get session for SR schedule by ID
export const getSRScheduleById = async (id: number) => {
  const response = await axios.get(`${BASE_URL}${SCHEDULE}/${id}`);
  return response.data;
};

// delete session for SR schedule by ID
export const deleteSRScheduleById = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}${SCHEDULE}/${id}`);
  return response.data;
};