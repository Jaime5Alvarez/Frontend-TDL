import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "../utils/GetToken";
import { avoidTokenVerificationPath } from "../services/http/http";

export const AxiosInterceptor = () => {
  const updateHeader = (request: AxiosRequestConfig) => {
    const newHeaders = {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    };
    request.headers = newHeaders;
    return request;
  };
  axios.interceptors.request.use((request: any) => {
    if (request.url && avoidTokenVerificationPath?.includes(request.url)) {
      return request;
    }
    return updateHeader(request);
  });
};
