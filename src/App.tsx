import { useEffect } from "react";
// import { TestStore } from "./store/TestStore";

import { Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/auth/Login";
import SignupPage from "@/pages/auth/Signup";

function App() {
  // const { testBackend } = TestStore();

  // useEffect(() => {
  //   testBackend();
  // }, [testBackend]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
