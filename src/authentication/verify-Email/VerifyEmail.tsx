import { useEffect } from "react";
import { LoadingSpinner } from "../../screens/LoadingSpinner";

import { toast } from "react-toastify";
import { Router } from "../../navigation/Router";
import { http } from "../../services/http/http";
export const VerifyEmail = () => {
  const token = new URLSearchParams(location.search).get("token");

  const VerifyToken = async () => {
    try {
      await http.VerifyEmail(token);
      toast.success("Email verified");
      Router.goToLogin();
    } catch (e) {
      toast.error("something went wrong");
      // Router.goToHome();
      console.log(e);
    }
  };
  useEffect(() => {
    if (token) {
      VerifyToken();
    } else {
      toast.error("Invalid Token");
      Router.goToHome();
    }
  }, []);
  return (
    <>
      <div className="mt-8">
        <LoadingSpinner className="w-20 h-20" />
      </div>
    </>
  );
};
