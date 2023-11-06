import { isAuth } from "../../../application/IsAuth";
import { LandingPage } from "../LandingPage";
import { TodoView } from "./todoview";

export const Home = () => {
  return <>{isAuth() ? <TodoView /> : <LandingPage />}</>;
};
