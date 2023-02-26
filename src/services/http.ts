import axios from "axios";
import { getToken } from "../utils/localStorage";

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
 * Config header.
 */
const configHeader = (config: any) => {
  if (config.headers) {
    config.headers["liAt"] = getToken("linkedInScrappingLiAt");
    config.headers["jSessionId"] = getToken("linkedInScrappingJSessionId");
  }
  return config;
};

/**
 * Axios instance for vaccine management.
 */
export const http = axios.create(getConfig(CONTENT_TYPE_JSON));

/**
 * Interceptors setup for that instance before sending any request for http data.
 */
http.interceptors.request.use(configHeader);
