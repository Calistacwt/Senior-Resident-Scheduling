import { SENIOR_DOCTOR } from "@/config/endpoint";
import { seniorDoctorList } from "@/types/seniorDoctorList";

import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const registerSeniorDoctorInfo = async (
  data: seniorDoctorList,
): Promise<seniorDoctorList> => {
  const response = await axios.post(`${BASE_URL}${SENIOR_DOCTOR}`, data);
  return response.data;
};
