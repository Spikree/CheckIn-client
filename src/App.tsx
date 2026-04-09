import { useEffect } from "react";
// import { TestStore } from "./store/TestStore";

import { Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/auth/Login";
import SignupPage from "@/pages/auth/Signup";
import AuthRoutes from "@/routes/AuthRoutes";
import { AuthStore } from "@/store/AuthStore";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import Dashboard from "@/pages/parent/Dashboard";
import ParentRoutes from "@/routes/ParentRoutes";
import StudentRoutes from "@/routes/StudentRoutes";
import Home from "@/pages/student/Home";
import StudentDashboard from "@/pages/parent/StudentDashboard";
import TaskDashboard from "@/pages/common/TaskDashboard";
import MainLayout from "./componentWrapers/MainLayout";

function App() {
  const { checkAuth } = AuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          {/*common routes*/}
          <Route element={<MainLayout />}>
            <Route path="/taskDashboard/:taskId" element={<TaskDashboard />} />

            <Route element={<ParentRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/studentDashboard/:studentId"
                element={<StudentDashboard />}
              />
            </Route>

            <Route element={<StudentRoutes />}>
              <Route path="/home" element={<Home />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
