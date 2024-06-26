import axios from "axios";
import { URLS } from "../../utils/urls";
import { api } from "../../interceptors/axios";

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
  googleOAuth: async (access_token: string) => {
    const response = await axios.post(`${URLS.BACKEND}/user/google-oauth/`, {
      access_token: access_token,
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
    const res = await api.get(`/todos/get-todos/`);
    return res.data;
  },
  addTodo: async ({
    id,
    title,
    description,
    date,
  }: {
    id: string;
    title: string;
    description: string;
    date: string;
  }) => {
    const res = await api.post(`/todos/add-todos/`, {
      id,
      title,
      description,
      date,
    });
    return res;
  },
  editTodo: async ({
    id,
    title,
    description,
    date,
    completed,
  }: {
    id: string;
    title: string;
    description: string;
    date: string;
    completed: boolean;
  }) => {
    const res = await api.put(`/todos/edit-todos/${id}/`, {
      title,
      description,
      date,
      completed,
    });
    return res;
  },
  deleteTodo: async (id: string) => {
    const res = await api.delete(`/todos/delete-todos/${id}/`);
    return res;
  },
};
