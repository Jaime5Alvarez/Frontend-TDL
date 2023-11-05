import axios from "axios";
import { URLS } from "../../application/urls";

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
};
