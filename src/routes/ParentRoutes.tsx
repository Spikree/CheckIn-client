import { Outlet, Navigate } from "react-router-dom";

const ParentRoutes = () => {
  const role: string | null = localStorage.getItem("user_role");
  return role === "PARENT" ? <Outlet /> : <Navigate to={"/home"} />;
};

export default ParentRoutes;
