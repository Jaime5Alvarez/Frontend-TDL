import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import MainNavigation from "./navigation/MainNavigation";

function App() {
  return (
    <>
      <Router>
        <MainNavigation />
      </Router>
    </>
  );
}

export default App;
