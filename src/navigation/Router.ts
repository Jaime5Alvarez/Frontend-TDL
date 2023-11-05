import { NavigateFunction } from "react-router-dom";

let navigator: NavigateFunction;

export const setNavigator = (n: NavigateFunction) => {
  navigator = n;
};
export const Router = {
  goToLogin: () => navigator("/login", { replace: true }),
  goToSignUp: () => navigator("/signup", { replace: true }),
  goToHome: () => navigator("/", { replace: true }),
  goToResetPassword: () => navigator("/reset-password", { replace: true }),
};
