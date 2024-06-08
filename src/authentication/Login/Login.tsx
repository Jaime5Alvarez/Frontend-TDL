import { useState } from "react";
import { toast } from "react-toastify";
import { Router } from "../../navigation/Router";
import { http } from "../../services/http/http";
import { AxiosError } from "axios";
import { useRevokeToHome } from "../../components/hooks/useRevokeToHome";
import { ErrorBody } from "../../models/models";
import { GoogleLogin } from "@react-oauth/google";

export const Login = () => {
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleGoogleOAuth = async (access_token: string) => {
    const Toastid = toast.loading("Loading...");
    try {
      const response = await http.googleOAuth(access_token);
      localStorage.clear();
      window.localStorage.setItem("access_token", response.access);
      window.localStorage.setItem("refresh_token", response.refresh);
      Router.goToHome();
      toast.update(Toastid, {
        render: "Welcome!",
        type: "success",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    } catch (e) {
      const error = e as AxiosError<ErrorBody>;
      const responseError = error.response?.data;
      const errorMessage = responseError?.message || "An error occurred.";
      toast.update(Toastid, {
        render: errorMessage,
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputForm.email || !inputForm.password) {
      return;
    }

    const Toastid = toast.loading("Loading...");

    try {
      const response = await http.Login({
        email: inputForm.email,
        password: inputForm.password,
      });

      localStorage.clear();
      window.localStorage.setItem("access_token", response.access);
      window.localStorage.setItem("refresh_token", response.refresh);

      Router.goToHome();

      toast.update(Toastid, {
        render: "Login successfull",
        type: "success",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    } catch (e) {
      const error = e as AxiosError<ErrorBody>;
      const responseError = error.response?.data;
      const errorMessage = responseError?.message || "An error occurred.";
      toast.update(Toastid, {
        render: errorMessage,
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    }
  };
  useRevokeToHome();

  return (
    <>
      <section className="translate-y-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="w-full bg-white rounded-lg drop-shadow-2xl  max-w-md   ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  text-blue-800 md:text-2xl ">
                Login at your To-Do-List account
              </h1>
              <div className="w-full flex justify-center">
                <GoogleLogin
                  theme="outline"
                  onSuccess={async (credentialResponse) => {
                    credentialResponse.credential &&
                      handleGoogleOAuth(credentialResponse.credential);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
              <form className="space-y-4 " onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your email
                  </label>
                  <input
                    onChange={handleChange}
                    value={inputForm.email}
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    value={inputForm.password}
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                  />
                </div>

                <button className="w-full text-white bg-blue-800 hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  You need to have a account to login{""}
                  <a
                    onClick={() => Router.goToSignUp()}
                    className="font-medium text-primary-600 hover:underline"
                  >
                    {""} Sign up here
                  </a>
                </p>
                <p className="text-sm font-light text-gray-500 ">
                  Have you forgotten your password?
                  <a
                    onClick={() => Router.goToResetPassword()}
                    className="font-medium text-primary-600 hover:underline"
                  >
                    {""} Reset here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
