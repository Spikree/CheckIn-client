import { Outlet, Navigate } from "react-router-dom";

const StudentRoutes = () => {
  const role: string | null = localStorage.getItem("user_role");
  return role === "STUDENT" ? <Outlet /> : <Navigate to={"/dashboard"} />;
};

export default StudentRoutes;
