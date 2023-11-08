import axios from "axios";

import { URLS } from "../utils/urls";
import { getAccessToken, getRefreshToken } from "../utils/GetToken";
import { Router } from "../navigation/Router";
export const api = axios.create({
  baseURL: URLS.BACKEND,
});
export const AxiosInterceptor = () => {
  api.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
  // Add a response interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = getRefreshToken();
          const response = await axios.post(
            `${URLS.BACKEND}/user/token/refresh/`,
            {
              refresh: refreshToken,
            }
          );

          const { access } = response.data;

          localStorage.setItem("access_token", access);

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return axios(originalRequest);
        } catch (error) {
          localStorage.clear();
          Router.goToLogin();
          return;
        }
      }

      return Promise.reject(error);
    }
  );
};
