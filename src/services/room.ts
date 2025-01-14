import { ROOM } from "@/config/endpoint";
import { roomList } from "@/types/roomList";

import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const registerRoom = async (data: roomList): Promise<void> => {
  const response = await axios.post(`${BASE_URL}${ROOM}`, data);
  return response.data;
};

export const getRoomData = async () => {
  const response = await axios.get(`${BASE_URL}${ROOM}`);
  return response.data;
};