import axios from "axios";
import { URLS } from "../../utils/urls";
import { getToken } from "../../utils/GetToken";

export const http = {
  resetPassword: async ({ email }: { email: string }) => {
    await axios.post(`${URLS.BACKEND}/user/reset-password/`, { email });
  },
  changePassword: async ({
    token,
    uidb64,
    password,
  }: {
    token: string;
    uidb64: string;
    password: string;
  }) => {
    await axios.post(
      `${URLS.BACKEND}/user/reset-password/${uidb64}/${token}/`,
      {
        password,
      }
    );
  },
  getTodos: async () => {
    const res = await axios.get(`${URLS.BACKEND}/todos/get-todos/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  },
};
