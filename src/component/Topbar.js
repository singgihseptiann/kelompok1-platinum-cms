import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { InputGroup } from "react-bootstrap";
import Sidebar from "./sidebar";
// import "../style/Styles.css";
import React from "react";

import { NavLink } from "react-router-dom";

import { Breadcrumb } from "react-bootstrap";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  //  CDBSidebarSubmenu,
} from "cdbreact";

import SideNav, {
  Toggle,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

function Topbar() {
  return (
    <Navbar expand="lg" className="bg-white" style={{ zIndex: -999 }}>
      <Container fluid className="d-flex justify-content-end">
        <Form className="">
          <InputGroup>
            <Form.Control
              type="search"
              className="float-end"
              aria-label="Search"
              placeholder="&#128270; Search"
              color="#8A8A8A"
            />

            <Button
              variant="outline-info"
              style={{ color: "#0D28A6", fontWeight: "bold" }}
            >
              Search
            </Button>
          </InputGroup>
        </Form>

        <div
          style={{
            backgroundColor: "#CFD4ED",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
          }}
          className="d-flex justify-content-center align-items-center ms-2"
        >
          H
        </div>

        <Nav>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Halim"
            menuVariant="dark"
          >
            <NavDropdown.Item href="#action/3.1">Singgih</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Fandi</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Ilham</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Rifki</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Topbar;
