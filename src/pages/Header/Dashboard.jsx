import React from "react";
import Sidebar from "../../component/Sidebar/sidebar";
import Topbar from "../../component/Topbar/Topbar";
import { Outlet } from "react-router";

const DashboardHeader = () => {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default DashboardHeader;
