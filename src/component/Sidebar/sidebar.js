import React from "react";

import { Link, NavLink } from "react-router-dom";
import Topbar from "../Topbar/Topbar";
import { Breadcrumb } from "react-bootstrap";
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact";

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";

import "@trendmicro/react-sidenav/dist/react-sidenav.css";

const Sidebar = () => {
  return (
    <SideNav style={{ backgroundColor: "#0D28A6" }} onSelect={(selected) => {}}>
      <SideNav.Toggle />

      <NavItem eventKey="home" backgroundColor="white">
        <div
          style={{
            backgroundColor: "#CFD4ED",
            padding: "20px",
            marginTop: "50px",
            marginRight: "10px",
            marginLeft: "10px",
            marginBottom: "10px",
          }}
        ></div>
      </NavItem>

      <SideNav.Nav defaultSelected="">
        <NavItem eventKey="home" backgroundColor="white">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
          </NavIcon>

          <NavText style={{ paddingRight: 32 }} title="Dasboard">
            <p style={{ color: "#CFD4ED" }}>DASHBOARD</p>
          </NavText>
          <NavItem eventKey="Dashboard/Dashboard">
            <NavText title="Dashboard">
              <Link to="/dashboard">
                <p style={{ fontWeight: "bold" }}>Dashboard</p>
              </Link>
            </NavText>
          </NavItem>
        </NavItem>
        <NavItem eventKey="truck">
          <NavIcon>
            <i className="fa fa-fw fa-truck" style={{ fontSize: "1.75em" }} />
          </NavIcon>

          <NavText style={{ paddingRight: 32 }} title="Cars">
            {" "}
            <p style={{ color: "#CFD4ED" }}> CARS</p>
          </NavText>
          <NavItem eventKey="Cars/Cars">
            <NavText title="Cars">
              <Link to="list-car">
                <p style={{ fontWeight: "bold" }}>Cars</p>
              </Link>
            </NavText>
          </NavItem>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
};

export default Sidebar;
