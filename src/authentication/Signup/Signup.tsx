import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Router } from "../../navigation/Router";
import { http } from "../../services/http/http";
import { useRevokeToHome } from "../../components/hooks/useRevokeToHome";
import { GoogleLogin } from "@react-oauth/google";
import { ErrorBody } from "../../models/models";

export const Signup = () => {
  const [inputFormSignUp, setInputFormSignUp] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChangeSignUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFormSignUp({
      ...inputFormSignUp,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !inputFormSignUp.email ||
      !inputFormSignUp.name ||
      !inputFormSignUp.last_name ||
      !inputFormSignUp.password
    ) {
      return;
    }
    const Toastid = toast.loading("Loading...");

    try {
      await http.SignUp({
        first_name: inputFormSignUp.name,
        last_name: inputFormSignUp.last_name,
        email: inputFormSignUp.email,
        password: inputFormSignUp.password,
      });

      Router.goToLogin();
      toast.update(Toastid, {
        render: "Account created, check your email",
        type: "success",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      toast.update(Toastid, {
        render: "Error creating the account",
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    }
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
  useRevokeToHome();
  return (
    <>
      <section className=" translate-y-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
          <div className="w-full bg-white rounded-lg drop-shadow-2xl   max-w-md ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-800 md:text-2xl ">
                Create a To-Do account
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
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmitSignUp}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your name
                  </label>
                  <input
                    onChange={handleChangeSignUp}
                    value={inputFormSignUp.name}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                    placeholder="Write your name"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your last name
                  </label>
                  <input
                    onChange={handleChangeSignUp}
                    value={inputFormSignUp.last_name}
                    type="text"
                    name="last_name"
                    placeholder="last name"
                    id="last name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your email
                  </label>
                  <input
                    onChange={handleChangeSignUp}
                    value={inputFormSignUp.email}
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Password
                  </label>
                  <input
                    onChange={handleChangeSignUp}
                    value={inputFormSignUp.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                    required
                  />
                </div>

                <button className="w-full text-white bg-blue-800 duration-200 ease-in-out hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Already have an account?{" "}
                  <a
                    onClick={() => Router.goToLogin()}
                    className="font-medium text-primary-600 hover:underline "
                  >
                    Login here
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
