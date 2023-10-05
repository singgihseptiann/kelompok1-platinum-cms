import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  //  CDBSidebarSubmenu,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import Topbar from "./Topbar";
import { Breadcrumb } from "react-bootstrap";
import { loginAdmin } from "../api/index";
import { useEffect } from "react";

const Sidebar = () => {
  useEffect(() => {
    const getToken = async () => {
      try {
        const login = await loginAdmin({
          email: "admin@bcr.io",
          password: "123456",
        });

        localStorage.setItem("token", login.data.access_token);

        console.log(localStorage.getItem("token"));
      } catch (err) {
        console.log(err);
      }
    };
    getToken();
  }, []);

  return (
    <div
      style={{
        marginTop: -60,
        position: "relative",
        zIndex: 999,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "scroll initial",
        }}
      >
        <CDBSidebar textColor="#fff" backgroundColor=" #0D28A6">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/" className="text-decoration-none" style={{ color: "inherit" }} title="Rental">
              Rental
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/list-car" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="car">Cars</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              style={{
                padding: "20px 5px",
              }}
            >
              Sidebar Footer
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>

        <br></br>

        <Breadcrumb className="ms-2" style={{ marginTop: 70 }}>
          <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Cars</Breadcrumb.Item>
          <Breadcrumb.Item active></Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default Sidebar;
