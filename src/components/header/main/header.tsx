import { PrimaryButton } from "../../buttons/PrimaryButton";
import { Router, setNavigator } from "../../../navigation/Router";
import { SecondaryButton } from "../../buttons/SecondaryButton";
import Logo from "../../../assets/VIRTUS_transparentazo-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../../../application/IsAuth";
export const Header = () => {
  const navigate = useNavigate();
  setNavigator(navigate);
  return (
    <>
      <section className="bg-gray-300 bg-opacity-20 h-16 rounded-full  mt-3 mx-4 flex items-center justify-between">
        <div className="ml-1 flex items-center ">
          <div
            onClick={() => Router.goToHome()}
            className="font-bold text-lg ml-2 cursor-pointer text-blue-800 max-w-md  bg-white rounded-full px-2 py-1 drop-shadow-lg"
          >
            <img alt="Virtus Logo" src={Logo} className="w-20  " />{" "}
          </div>
        </div>
        {isAuth() ? (
          <div className="mx-5">
            <PrimaryButton
              text="Logout"
              action={() => {
                localStorage.clear();
                Router.goToHome();
              }}
            />
          </div>
        ) : (
          <div className="mx-2 flex gap-2">
            <PrimaryButton text="Login" action={() => Router.goToLogin()} />
            <SecondaryButton text="Signup" action={() => Router.goToSignUp()} />
          </div>
        )}
      </section>
    </>
  );
};
