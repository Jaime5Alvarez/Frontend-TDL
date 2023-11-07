import axios from "axios";
import { URLS } from "../../utils/urls";
export const avoidTokenVerificationPath: string[] = [
  "/user/login/",
  "signup",
  "reset-password",
  "email-verify",
  "token",
];

export const http = {
  resetPassword: async ({ email }: { email: string }) => {
    await axios.post(`${URLS.BACKEND}/user/reset-password/`, { email });
  },
  Login: async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post(`${URLS.BACKEND}/user/login/`, {
      email: email,
      password: password,
    });
    return response.data;
  },
  VerifyEmail: async (token: string | null) => {
    await axios.post(`${URLS.BACKEND}/user/email-verify/`, {
      token: token,
    });
  },
  SignUp: async ({
    first_name,
    last_name,
    email,
    password,
  }: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }) => {
    await axios.post(`${URLS.BACKEND}/user/register/`, {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    });
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
    const res = await axios.get(`${URLS.BACKEND}/todos/get-todos/`);
    return res.data;
  },
};
