import axios from "axios";

import { URLS } from "../utils/urls";
import { getAccessToken, getRefreshToken } from "../utils/GetToken";

export const AxiosInterceptor = () => {
  axios.interceptors.request.use(
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
  axios.interceptors.response.use(
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
          console.log("Despues de la solicitud");

          const { access } = response.data;

          localStorage.setItem("access_token", access);

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return axios(originalRequest);
        } catch (error) {}
      }

      return Promise.reject(error);
    }
  );
};
