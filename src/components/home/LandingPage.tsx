import { useNavigate } from "react-router-dom";
import { Router, setNavigator } from "../../navigation/Router";

export const LandingPage = () => {
  const navigate = useNavigate();
  setNavigator(navigate);
  return (
    <>
      <section>
        <div onClick={() => Router.goToLogin()}>login</div>
        <div onClick={() => Router.goToSignUp()}>Signup</div>
      </section>
    </>
  );
};
