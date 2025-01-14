import { ROOM } from "@/config/endpoint";
import { room } from "@/types/room";

import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const registerRoom = async (data: room): Promise<room> => {
  const response = await axios.post(`${BASE_URL}${ROOM}`, data);
  return response.data;
};
