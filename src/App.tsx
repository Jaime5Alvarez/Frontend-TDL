import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./components/home/main/home";
import { Signup } from "./authentication/Signup/Signup";
import { Login } from "./authentication/Login/Login";
import { Header } from "./components/header/main/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VerifyEmail } from "./authentication/verify-Email/VerifyEmail";
import { ResetPasswordClient } from "./authentication/Reset-password/reset-password";
import { ErrorPage } from "./screens/ErrorPage";

function App() {
  return (
    <>
      <Router>
        <div className="h-screen bg-white">
          <nav>
            <Header />
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user/email-verify/" element={<VerifyEmail />} />
              <Route path="/reset-password" element={<ResetPasswordClient />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>
        </div>
      </Router>
      <ToastContainer
        position="bottom-right"
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

export default App;
