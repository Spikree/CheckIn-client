import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header />

      {/* The main content area where your pages will render */}
      <div className="flex-grow overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
