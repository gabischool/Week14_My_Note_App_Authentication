import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="./SignIn" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
