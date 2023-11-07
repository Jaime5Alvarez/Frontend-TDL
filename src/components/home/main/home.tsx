import { isAuth } from "../../../utils/IsAuth";
import { LandingPage } from "../LandingPage";
import { TodoView } from "../todoview";

export const Home = () => {
  return <>{isAuth() ? <TodoView /> : <LandingPage />}</>;
};
