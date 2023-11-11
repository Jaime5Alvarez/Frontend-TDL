import { Route, Routes, useNavigate } from "react-router-dom";
import { setNavigator } from "./Router";
import { Header } from "../components/header/main/header";
import { Home } from "../components/home/main/home";
import { Signup } from "../authentication/Signup/Signup";
import { VerifyEmail } from "../authentication/verify-Email/VerifyEmail";
import { ToastContainer } from "react-toastify";
import { Login } from "../authentication/Login/Login";
import { Logout } from "../authentication/Logout/logout";
import { ResetPasswordClient } from "../authentication/Reset-password/reset-password";
import { ErrorPage } from "../screens/ErrorPage";
import "react-toastify/dist/ReactToastify.css";

function MainNavigation() {
  const navigate = useNavigate();
  setNavigator(navigate);
  return (
    <>
      <nav className=" flex justify-center">
        <Header />
      </nav>
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/email-verify/" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPasswordClient />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default MainNavigation;
