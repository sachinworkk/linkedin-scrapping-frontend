import { http } from "./http";

export const loginUser = async (payload: object) => {
  return http.post("/login", payload);
};

export const logoutUser = async () => {
  return http.delete("/logout");
};
