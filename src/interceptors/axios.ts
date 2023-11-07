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
    const shouldExclude = avoidTokenVerificationPath.some(
      (path) => request.url && request.url.includes(path)
    );
    if (shouldExclude) {
      return request;
    }
    return updateHeader(request);
  });
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
};
