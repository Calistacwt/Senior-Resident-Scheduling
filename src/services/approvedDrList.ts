import { APPROVED_DOCTOR } from "@/config/endpoint";
import { drList } from "@/types/approvedDrList";


import axios from "axios";

const BASE_URL = "http://localhost:4000";


// get method
// export const getSRSchedule = async () => {
//   const response = await axios.get(`${BASE_URL}${SCHEDULE}`);
//   return response.data;
// };

// post method
export const registerDoctor = async (data: Omit<drList, "id">): Promise<drList> => {
  const response = await axios.post(`${BASE_URL}${APPROVED_DOCTOR}`, data);
  return response.data;
};

// export const registerSRInfo = async (data: Omit<registerSR, "id">): Promise<registerSR> => {
//   const response = await axios.post(${BASE_URL}${REGISTERSR}, data);
//   return response.data;
// };


// update method
// export const updateSRSchedule = async (id: number, updatedData: object) => {
//   const response = await axios.put(
//     `${BASE_URL}${SCHEDULE_UPDATE.replace(":id", String(id))}`,
//     updatedData,
//   );
//   return response.data;
// };
