import {
  SR,
  SR_NAMESEARCH,
  SR_SORT_NAME_ASC,
  SR_SORT_NAME_DESC,
} from "@/config/endpoint";
import { srList } from "@/types/srList";

import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const getSRData = async () => {
  const response = await axios.get(`${BASE_URL}${SR}`);
  return response.data;
};

export const getSRDataById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}${SR}/${id}`);
  return response.data;
};

export const searchSRData = async (name: String) => {
  const response = await axios.get(
    `${BASE_URL}${SR_NAMESEARCH.replace("search", String(name))}`,
  );
  return response.data;
};

export const sortSRDataASC = async () => {
  const response = await axios.get(`${BASE_URL}${SR_SORT_NAME_ASC}`);
  return response.data;
};

export const sortSRDataDESC = async () => {
  const response = await axios.get(`${BASE_URL}${SR_SORT_NAME_DESC}`);
  return response.data;
};

export const importSRInfo = async (
  row: srList
): Promise<void> => {
  await axios.post(`${BASE_URL}${SR}`, row, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
