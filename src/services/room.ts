import { 
  ROOM, 
  ROOM_NAMESEARCH, 
  ROOM_SORT_ASC, 
  ROOM_SORT_DESC } from "@/config/endpoint";
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

export const deleteRoomData = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}${ROOM}/${id}`);
};

export const searchRoomData = async (name: String) => {
  const response = await axios.get(
    `${BASE_URL}${ROOM_NAMESEARCH.replace("search", String(name))}`,
  );
  return response.data;
};

export const sortRoomDataASC = async () => {
  const response = await axios.get(`${BASE_URL}${ROOM_SORT_ASC}`);
  return response.data;
};

export const sortRoomDataDESC = async () => {
  const response = await axios.get(`${BASE_URL}${ROOM_SORT_DESC}`);
  return response.data;
};

export const importRoomData = async (
  row: roomList
): Promise<void> => {
  await axios.post(`${BASE_URL}${ROOM}`, row, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
