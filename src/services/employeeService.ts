import { http } from "./http";

export const searchEmployeeList = async (payload: object) => {
  return http.post("/scrap", payload);
};

export const lazyLoadStatus = async (payload: object) => {
  return http.post("/lazy-load-employee-status", payload);
};

export const searchEmployeeDetail = async (
  employeeId: String,
  payload: object
) => {
  return http.post(`/scrap/${employeeId}`, payload);
};

export const sendInvite = async (payload: object) => {
  return http.post("/send-invite", payload);
};

export const searchCompanies = async (payload: object) => {
  return http.post("/companies", payload);
};
