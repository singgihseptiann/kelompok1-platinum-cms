import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../store/Auth";

const Topbar = () => {
  const [carName, setCarName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${carName}`);
  };

  const email = useSelector((state) => state.auth.email);

  return (
    <Navbar expand="lg" className="bg-white">
      <Container fluid className="d-flex justify-content-end">
        <Form className="">
          <InputGroup>
            <Form.Control
              id="carName"
              type="text"
              className="float-end"
              aria-label="Search"
              placeholder="&#128270; Masukkan nama mobil"
              color="#8A8A8A"
              onChange={(e) => setCarName(e.target.value)}
            />
            <Button
              onClick={handleSubmit}
              variant="outline-info"
              style={{ color: "#0D28A6", fontWeight: "bold" }}
            >
              Cari Mobil
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
            <NavDropdown.Item onClick={handleLogOut}>Keluar</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Topbar;
