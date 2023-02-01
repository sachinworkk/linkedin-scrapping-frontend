import { http } from "./http";

export const searchEmployeeList = async (payload: object) => {
  return http.post("/scrap", payload);
};
