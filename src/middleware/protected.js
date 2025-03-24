import { Outlet, Navigate } from "react-router-dom";
/* import Cookies from "universal-cookie"; */
export const ProtectedRoutes = () => {
  let logged = false;
  const token = localStorage.getItem("token");
  if (token) {
    logged = true;
  }
  return logged ? <Outlet /> : <Navigate to="/" />;
};
