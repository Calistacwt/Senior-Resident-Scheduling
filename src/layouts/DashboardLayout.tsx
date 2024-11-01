import Sidebar from "@/component/Sidebar";
import { Outlet } from "@tanstack/react-router";
import { FC } from "react";

const DashboardLayout: FC = () => {
  return (
    <div className="flex min-h-screen bg-background ">
      <Sidebar />
      <div className="flex w-full flex-1 flex-col m-6">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
