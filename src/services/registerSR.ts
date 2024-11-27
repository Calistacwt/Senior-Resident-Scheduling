import { SR } from "@/config/endpoint";
import { srList } from "@/types/srList";
import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const registerSRInfo = async (
  data: Omit<srList, "id">,
): Promise<srList> => {
  const response = await axios.post(`${BASE_URL}${SR}`, data);
  return response.data;
};

// export const getSRInfo = async () => {
//   const response = await axios.get(`${BASE_URL}${REGISTERSR}`);
//   return response.data;
// };

// export const getSRInfoById = async (id: string) => {
//   try {
//     const response = await axios.get(`${BASE_URL}${REGISTERSR}${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching SR data:", error);
//     throw error;
//   }
// };
