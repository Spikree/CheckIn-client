import { AuthStore } from "@/store/AuthStore";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const AuthRoutes = () => {
  const { authUser, isCheckingAuth } = AuthStore();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const isAuthRoute =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "signup";

  if (isCheckingAuth) {
    return null;
  }

  if (authUser && isAuthRoute) {
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default AuthRoutes;
