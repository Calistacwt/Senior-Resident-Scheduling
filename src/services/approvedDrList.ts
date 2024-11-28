import { APPROVED_DOCTOR } from "@/config/endpoint";
import { drList } from "@/types/approvedDrList.ts";

import axios from "axios";

const BASE_URL = "http://localhost:4000";

// Post data
export const registerApprovedDocotrInfo = async (
  data: Omit<drList, "id">,
): Promise<drList> => {
  const response = await axios.post(`${BASE_URL}${APPROVED_DOCTOR}`, data);
  return response.data;
};
