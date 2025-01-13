import {
  SENIOR_DOCTOR,
  SENIOR_DOCTOR_NAMESEARCH,
  SENIOR_DOCTOR_SORT_NAME_ASC,
  SENIOR_DOCTOR_SORT_NAME_DESC,
} from "@/config/endpoint";
import { seniorDoctorList } from "@/types/seniorDoctorList";

import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const registerSeniorDoctorInfo = async (
  data: seniorDoctorList,
): Promise<seniorDoctorList> => {
  const response = await axios.post(`${BASE_URL}${SENIOR_DOCTOR}`, data);
  return response.data;
};

export const getSeniorDoctorData = async () => {
  const response = await axios.get(`${BASE_URL}${SENIOR_DOCTOR}`);
  return response.data;
};


export const getSeniorDoctorDataById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}${SENIOR_DOCTOR}/${id}`);
  return response.data;
};

export const searchSeniorDoctorData = async (name: String) => {
  const response = await axios.get(
    `${BASE_URL}${SENIOR_DOCTOR_NAMESEARCH.replace("search", String(name))}`,
  );
  return response.data;
};

export const sortSeniorDoctorDataASC = async () => {
  const response = await axios.get(`${BASE_URL}${SENIOR_DOCTOR_SORT_NAME_ASC}`);
  return response.data;
};

export const sortSeniorDoctorDataDESC = async () => {
  const response = await axios.get(
    `${BASE_URL}${SENIOR_DOCTOR_SORT_NAME_DESC}`,
  );
  return response.data;
};

export const updateSeniorDoctorInfo = async (
  id: number,
  data: seniorDoctorList,
): Promise<seniorDoctorList> => {
  const response = await axios.put(`${BASE_URL}${SENIOR_DOCTOR}/${id}`, data);
  return response.data;
};

export const deleteSeniorDoctorInfo = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}${SENIOR_DOCTOR}/${id}`);
};