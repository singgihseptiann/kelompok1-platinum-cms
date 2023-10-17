import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { InputGroup } from "react-bootstrap";
import { logOut } from "../../store/Auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import React from "react";
import { useSelector } from "react-redux";

import "@trendmicro/react-sidenav/dist/react-sidenav.css";

function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
  };
  const email = useSelector((state) => state.auth.email);
  return (
    <Navbar expand="lg" className="bg-white">
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

        <Nav className="">
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={email}
            menuVariant="dark"
          >
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Topbar;
