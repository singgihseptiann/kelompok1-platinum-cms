import React from "react";
import Sidebar from "../../component/sidebar";
import Topbar from "../../component/Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
};

export default DashboardLayout;
