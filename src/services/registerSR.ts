import { REGISTERSR } from "@/config/endpoint";
import axios from "axios";
import { registerSR } from "@/types/registerSR.ts";

const BASE_URL = "http://localhost:4000";

export const registerSRInfo = async (
  data: Omit<registerSR, "id">,
): Promise<registerSR> => {
  const response = await axios.post(`${BASE_URL}${REGISTERSR}`, data);
  return response.data;
};

export const getSRInfo = async () => {
  const response = await axios.get(`${BASE_URL}${REGISTERSR}`);
  return response.data;
};

export const getSRInfoById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${REGISTERSR}${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching SR data:", error);
    throw error;
  }
};
