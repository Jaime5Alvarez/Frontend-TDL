import { useEffect } from "react";
import { isAuth } from "../../utils/IsAuth";
import { Router } from "../../navigation/Router";

export const useRevokeToHome = () => {
  useEffect(() => {
    isAuth() && Router.goToHome();
  }, []);
};
