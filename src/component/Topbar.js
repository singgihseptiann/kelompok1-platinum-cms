import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { InputGroup } from "react-bootstrap";
import Sidebar from "./sidebar";
import "../style/Styles.css";

function Topbar() {
  return (
    <Navbar expand="lg" className="bg-white">
      <Container fluid className="d-flex justify-content-end">
        <Form className="">
          <InputGroup>
            <Form.Control
              type="search"
              placeholder="Search"
              className="float-end"
              aria-label="Search"
            />

            <Button variant="outline-success">Search</Button>
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
