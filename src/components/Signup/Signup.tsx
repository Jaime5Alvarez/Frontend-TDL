import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URLS } from "../../application/urls";
import { Router, setNavigator } from "../../navigation/Router";

export const Signup = () => {
  const navigate = useNavigate();
  setNavigator(navigate);
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
      await axios.post(`${URLS.BACKEND}/user/register/`, {
        first_name: inputFormSignUp.name,
        last_name: inputFormSignUp.last_name,
        email: inputFormSignUp.email,
        password: inputFormSignUp.password,
      });

      Router.goToHome();
      toast.update(Toastid, {
        render: "Trainer account created",
        type: "success",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      toast.update(Toastid, {
        render: "Error creating trainer account",
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    }
  };

  return (
    <>
      <section className=" ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
          <div className="w-full bg-white rounded-lg drop-shadow-2xl   max-w-md ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-800 md:text-2xl ">
                Create a To-Do account
              </h1>
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
