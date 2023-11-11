import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Card, Modal, Breadcrumb, Spinner } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineDelete, AiOutlineUsergroupAdd, AiOutlineRight } from "react-icons/ai";
import { BiEdit, BiTime } from "react-icons/bi";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ListCarComponent = () => {
  const [cars, setCars] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [carDeletedMessage, setCarDeletedMessage] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get("https://api-car-rental.binaracademy.org/admin/v2/car", {
          headers: {
            access_token: localStorage.getItem("token"),
          },
        });
        setCars(response.data.cars);

        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

  const categories = [
    { label: "All", value: "" },
    { label: "2-4 Peoples", value: "small" },
    { label: "4-6 Peoples", value: "medium" },
    { label: "6-8 Peoples", value: "large" },
  ];

  const handleFilter = (categoryValue) => {
    setSelectedCategory(categoryValue);
  };

  const buttonRendered = () => {
    return categories.map((category) => (
      <Button
        key={category.value}
        variant={selectedCategory === category.value ? "primary" : "outline-primary"}
        className={`rounded-0 me-2 ${selectedCategory === category.value ? "active" : ""}`}
        onClick={() => handleFilter(category.value)}
      >
        {category.label}
      </Button>
    ));
  };

  const handleDeleteCar = (car) => {
    setSelectedCar(car);
    setShowDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setSelectedCar(null);
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = () => {
    deleteCar();
    handleCloseDeleteConfirmation();
  };

  const filteredCars = cars.filter((car) => {
    if (!selectedCategory) {
      return true;
    }
    return car.category === selectedCategory;
  });

  const deleteCar = async () => {
    try {
      await axios.delete(`https://api-car-rental.binaracademy.org/admin/car/${selectedCar.id}`, {
        headers: {
          access_token: localStorage.getItem("token"),
        },
      });

      setCars((prevCars) => prevCars.filter((car) => car.id !== selectedCar.id));
      setCarDeletedMessage("Car has successfully been deleted!");
      setTimeout(() => {
        setCarDeletedMessage("");
      }, 1000);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const redirect = (id) => {
    navigate(`/edit-car/${id}`);
  };

  return (
    <div style={{ backgroundColor: "#F4F5F7" }}>
      <Container>
        {loading ? (
          <div data-testid="loader" className="d-flex align-items-center justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <Row>
              <Col>
                <Breadcrumb className="mt-5">
                  <div className="fw-bold">Cars</div>
                  <span className="breadcrumb-separator">
                    {" "}
                    <AiOutlineRight />
                  </span>
                  <Breadcrumb.Item>
                    <Link to="/list-car">List Car</Link>
                  </Breadcrumb.Item>
                </Breadcrumb>
                <div className="d-flex flex-row justify-content-between">
                  <h4>List Car</h4>
                  <Button variant="primary" className="rounded-0" onClick={() => navigate("/add-car")} type="submit">
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <AiOutlinePlus />
                      <span style={{ marginLeft: "8px" }}>Add a new car</span>
                    </span>
                  </Button>
                </div>
                <div className="d-flex flex-row mt-2">{buttonRendered()}</div>
              </Col>
            </Row>
            <Row className="mt-5">
              {carDeletedMessage && <div className="alert alert-success">{carDeletedMessage}</div>}
              {filteredCars.map((car) => (
                <Col xs={12} md={6} lg={3} key={car.id}>
                  <div className="d-lg-flex align-content-center justify-content-between">
                    <Card className="mb-3 rounded">
                      <Card.Img variant="top" src={car.image} style={{ height: "170px", width: "auto" }} />
                      <Card.Body>
                        Nama/Tipe Mobil
                        <Card.Title>{car.name}</Card.Title>
                        <Card.Text>
                          Rp. {car.price} / Hari
                          <br />
                          <AiOutlineUsergroupAdd />
                          Kategori: {car.category}
                          <br />
                          <BiTime />
                          Update on: {moment(car.updatedAt).format("MMM, DD YYYY HH:HH")}
                        </Card.Text>
                        <div className="d-flex flex-row ">
                          <Button variant="outline-danger" className="me-2" style={{ width: "142px", height: "48px" }} onClick={() => handleDeleteCar(car)}>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <AiOutlineDelete />
                              <span style={{ marginLeft: "8px" }}>Delete</span>
                            </span>
                          </Button>

                          <Button variant="outline-success" style={{ width: "142px", height: "48px" }} onClick={() => redirect(car.id)}>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <BiEdit />
                              <span style={{ marginLeft: "8px" }}>Edit</span>
                            </span>
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}

        <Modal show={showDeleteConfirmation} onHide={handleCloseDeleteConfirmation}>
          <Modal.Body className="text-center">
            <img src={`${process.env.PUBLIC_URL}/images/modaldelete.png`} alt="Gambar" style={{ width: "153px", height: "121px" }} />
            <h5 className="mt-3">Menghapus Data Mobil</h5>
            <p>Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?</p>
            <div className="d-flex justify-content-center ">
              <Button variant="outline-primary" className="me-2" style={{ width: "87px", height: "36px" }} onClick={handleConfirmDelete}>
                Ya
              </Button>
              <Button variant="outline-primary" style={{ width: "87px", height: "36px" }} onClick={handleCloseDeleteConfirmation}>
                Tidak
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default ListCarComponent;
