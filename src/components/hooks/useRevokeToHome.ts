import { useEffect } from "react";
import { isAuth } from "../../utils/IsAuth";
import { useNavigate } from "react-router";
import { Router, setNavigator } from "../../navigation/Router";

export const useRevokeToHome = () => {
  const navigate = useNavigate();
  setNavigator(navigate);
  useEffect(() => {
    isAuth() && Router.goToHome();
  }, []);
};
