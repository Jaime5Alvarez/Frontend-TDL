import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { http } from "../../services/http/http";
import { useRevokeToHome } from "../../components/hooks/useRevokeToHome";

export const ResetPasswordClient = () => {
  const [inputForm, setInputForm] = useState({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputForm.email) {
      return;
    }
    const Toastid = toast.loading("Sending...");

    try {
      await http.resetPassword({ email: inputForm.email });
      toast.update(Toastid, {
        render: "Check your email to create a new password",
        type: "success",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      toast.update(Toastid, {
        render: "Error sending the email",
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
              <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-800 md:text-2xl ">
                Reset your password at your client account
              </h1>
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

                <button className="w-full text-white bg-blue-800 duration-200 ease-in-out hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                  Reset password
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Check your spam folder if you don't receive an email.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
