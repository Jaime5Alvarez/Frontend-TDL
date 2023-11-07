export const isAuth = () => {
  return !!localStorage.getItem("access_token");
};
