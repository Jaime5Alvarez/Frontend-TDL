import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./components/home/main/home";
import { Signup } from "./components/Signup/Signup";
import { Login } from "./components/Login/Login";
import { Header } from "./components/header/main/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
