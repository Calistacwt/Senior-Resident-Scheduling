import { SR } from "@/config/endpoint";

import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const getSRData = async () => {
  const response = await axios.get(`${BASE_URL}${SR}`);
  return response.data;
};
