import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import MainNavigation from "./navigation/MainNavigation";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <Router>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <MainNavigation />
        </GoogleOAuthProvider>
      </Router>
    </>
  );
}

export default App;
