import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Card } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { getCars } from "../api";

const ListCarComponent = () => {
  const [cars, setCars] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");

  // Mengambil data mobil dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = {};
        if (currentCategory) {
          queryParams.category = currentCategory;
        }
        const response = await getCars(queryParams);
        setCars(response.data.cars); // Mengambil array 'cars' dari respons API
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentCategory]);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  return (
    <Container className="listcar container-fluid" style={{ backgroundColor: "#D0D0D0" }}>
      <Row>
        <Col>
          <div className="d-flex flex-row justify-content-between">
            <h4>List Car</h4>
            <Button variant="primary" className="rounded-0">
              <span style={{ display: "flex", alignItems: "center" }}>
                <AiOutlinePlus />
                <span style={{ marginLeft: "8px" }}>Add a new car</span>
              </span>
            </Button>{" "}
          </div>
          <div className="d-flex flex-row mt-2">
            <Button variant="outline-primary" className={`rounded-0 me-2 ${currentCategory === "" ? "active" : ""}`} onClick={() => handleCategoryClick("")}>
              All
            </Button>
            <Button variant="outline-primary" className={`rounded-0 me-2 ${currentCategory === "medium" ? "active" : ""}`} onClick={() => handleCategoryClick("medium")}>
              Medium
            </Button>
            {/* Tambahkan tombol kategori lain sesuai data API */}
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        {cars.map((car) => (
          <Col key={car.id} className="d-flex flex-row">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={car.image} />
              <Card.Body>
                <Card.Title>{car.name}</Card.Title>
                <Card.Text>{`Price: $${car.price}`}</Card.Text>
                <Card.Text>{`Status: ${car.status ? "Available" : "Not Available"}`}</Card.Text>
                <Button variant="primary">Detail</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListCarComponent;
