import { useEffect } from "react";
import { Navigate } from "react-router-dom";
export const Logout = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return <Navigate to={"/"} />;
};
