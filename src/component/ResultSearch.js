import { Fragment, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { API } from "./API";
import { Link } from "react-router-dom";
import Topbar from "./Topbar/Topbar";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { InputGroup } from "react-bootstrap";
//import { logOut } from "../../store/Auth";
import { logOut } from "../store/Auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
//import Sidebar from "../Sidebar/sidebar";
import Sidebar from "./Sidebar/sidebar";

import React from "react";
import { useSelector } from "react-redux";
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

import "@trendmicro/react-sidenav/dist/react-sidenav.css";

const ResultSearch = () => {
  const [nameCar, setNameCar] = useState("");
  const [category, setCategory] = useState("");
  const [isRented, setIsRented] = useState(false);
  const [price, setPrice] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmited] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const fetchData = () => {
    const params = `name=${nameCar}&category=${category}&isRented=${isRented}&${mappingPrice(
      price
    )}`;

    API.get(`admin/v2/car?${params}&page=1&pageSize=10`)
      .then((res) => {
        setData(res.data.cars);
      })
      .catch((err) => {
        console.log("err:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchDataDetail = (id) => {
    API.get(`Admin/Car/${id}`)
      .then((res) => {})
      .catch((err) => {});
  };

  const mappingPrice = (price) => {
    switch (price) {
      case "low":
        return "minPrice=0&maxPrice=400000";
      case "medium":
        return "minPrice=400000&maxPrice=600000";
      case "high":
        return "minPrice=600000&maxPrice=1000000";
      default:
        return "";
    }
  };

  const formatToIDR = (idr) => {
    const parsed = idr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${"Rp "}${parsed}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmited(true);
    setIsLoading(true);

    fetchData();
  };

  const handleSubmit1 = () => {
    document.body.style.backgroundColor = "green";
  };

  const email = useSelector((state) => state.auth.email);

  const ResultSearch = () => {
    return (
      <>
        <Topbar onButtonClick={() => navigate("/list-car")} />
        <section className="display-car-section">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <Row>
              {data.map((car) => {
                return (
                  <Fragment key={car.id}>
                    <Col md={4}>
                      <Card
                        style={{
                          marginTop: "30px",
                        }}
                      >
                        <img alt={car.name} src={car.image} />
                        <Card.Body>
                          <Card.Title tag="h5">{car.name}</Card.Title>
                          <Card.Text>{formatToIDR(car.price)} / hari</Card.Text>
                          <Card.Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                          </Card.Text>
                          <Button
                            color="success"
                            style={{ width: "100%" }}
                            onClick={() => console.log(car.id)}
                          >
                            Pilih Mobil
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Fragment>
                );
              })}
            </Row>
          )}
        </section>
      </>
    );
  };
};

export default ResultSearch;
