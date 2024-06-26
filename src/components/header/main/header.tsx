import { PrimaryButton } from "../../buttons/PrimaryButton";
import { Router } from "../../../navigation/Router";
import { SecondaryButton } from "../../buttons/SecondaryButton";
import { isAuth } from "../../../utils/IsAuth";
export const Header = () => {
  return (
    <>
      <section
        className={`bg-gray-50 absolute z-10 w-11/12 h-16  rounded-full  mt-3  flex items-center justify-between`}
      >
        <div className="ml-1 flex items-center ">
          <div
            onClick={() => Router.goToHome()}
            className="font-bold text-lg ml-2 cursor-pointer text-blue-800 max-w-md px-2 py-1 "
          >
          </div>
        </div>
        {isAuth() ? (
          <div className="mx-5">
            <PrimaryButton
              text="Logout"
              action={() => {
                Router.goToLogout();
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
