import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AuthStore } from "@/store/AuthStore";

const ProtectedRoutes = () => {
  const { authUser, isCheckingAuth } = AuthStore();

  const location = useLocation();

  if (isCheckingAuth) {
    return null;
  }

  return authUser ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} />
  );
};

export default ProtectedRoutes;
