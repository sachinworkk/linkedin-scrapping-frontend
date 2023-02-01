import axios from "axios";

import { CONTENT_TYPE_JSON } from "./../constants/misc";

/**
 * Get config for axios.
 */
const getConfig = (contentType: string) => {
  return {
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": contentType,
      Accept: CONTENT_TYPE_JSON,
    },
  };
};

/**
 * Axios instance for vaccine management.
 */
export const http = axios.create(getConfig(CONTENT_TYPE_JSON));
