import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./components/home";
function App() {
  return (
    <>
      <Router>
        <div className="h-screen bg-gray-200">
          <nav></nav>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
