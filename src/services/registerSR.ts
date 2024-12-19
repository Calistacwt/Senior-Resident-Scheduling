import { SR } from "@/config/endpoint";
import { srList } from "@/types/srList";
import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const registerSRInfo = async (data: srList): Promise<srList> => {
  const response = await axios.post(`${BASE_URL}${SR}`, data);
  return response.data;
};

export const updateSRInfo = async (
  id: string,
  data: srList,
): Promise<srList> => {
  const response = await axios.put(`${BASE_URL}${SR}/${id}`, data);
  return response.data;
};