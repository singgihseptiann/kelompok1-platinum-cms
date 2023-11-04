import React, { Fragment, useState, useEffect } from "react";
import { Card, Col, Row, Container, Button, Modal } from "react-bootstrap";
import { API } from "../API";
import moment from "moment";
import axios from "axios";
import { BiEdit, BiTime } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { AiOutlineDelete, AiOutlineUsergroupAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const ResultCar = ({ formatToIDR }) => {
  const location = useLocation();
  const query = location.pathname.split("/search/")[1];
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  const redirect = (id) => {
    navigate(`/edit-car/${id}`);
  };
  useEffect(() => {
    fetchData(query);
  }, [query]);

  const fetchData = (searchQuery) => {
    setIsLoading(true);

    API.get("admin/v2/car?page=1&pageSize=10")
      .then((res) => {
        const allCars = res.data.cars;

        const filteredCars = allCars.filter((car) => {
          const carName = car.name.toLowerCase();
          const search = searchQuery.toLowerCase();

          return carName.includes(search);
        });

        setData(filteredCars);
      })
      .catch((err) => {
        console.log("err:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
  const deleteCar = async () => {
    try {
      await axios.delete(
        `https://api-car-rental.binaracademy.org/admin/car/${selectedCar.id}`,
        {
          headers: {
            access_token: localStorage.getItem("token"),
          },
        }
      );

      setCars((prevCars) =>
        prevCars.filter((car) => car.id !== selectedCar.id)
      );
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };
  return (
    <div style={{ backgroundColor: " #F4F5F7" }}>
      <Container>
        {isLoading ? (
          <h1>Loading....</h1>
        ) : (
          <Row>
            {data.map((car) => (
              <Fragment>
                <Col md={4} key={car.id}>
                  <Card style={{ marginTop: "30px" }}>
                    <Card.Img variant="top" src={car.image} />
                    <Card.Body>
                      <Card.Title>Nama/Tipe Mobil</Card.Title>
                      <Card.Title>{car.name}</Card.Title>
                      <Card.Text>{car.price} / hari</Card.Text>
                      <Card.Text>
                        {" "}
                        <AiOutlineUsergroupAdd />
                        Kategori: {car.category}
                      </Card.Text>
                      <Card.Text>
                        {" "}
                        <BiTime />
                        Update on:{" "}
                        {moment(car.updatedAt).format("MMM, DD YYYY HH:HH")}
                      </Card.Text>
                      <div className="d-flex flex-row ">
                        <Button
                          variant="outline-danger"
                          className="me-2"
                          style={{ width: "142px", height: "48px" }}
                          onClick={() => handleDeleteCar(car)}
                        >
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

                        <Button
                          variant="outline-success"
                          style={{ width: "142px", height: "48px" }}
                          onClick={() => redirect(car.id)}
                        >
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
                </Col>
              </Fragment>
            ))}
          </Row>
        )}
        <Modal
          show={showDeleteConfirmation}
          onHide={handleCloseDeleteConfirmation}
        >
          <Modal.Body className="text-center">
            <img
              src={`${process.env.PUBLIC_URL}/images/modaldelete.png`}
              alt="Gambar"
              style={{ width: "153px", height: "121px" }}
            />
            <h5 className="mt-3">Menghapus Data Mobil</h5>
            <p>
              Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin
              menghapus?
            </p>
            <div className="d-flex justify-content-center ">
              <Button
                variant="outline-primary"
                className="me-2"
                style={{ width: "87px", height: "36px" }}
                onClick={handleConfirmDelete}
              >
                Ya
              </Button>
              <Button
                variant="outline-primary"
                style={{ width: "87px", height: "36px" }}
                onClick={handleCloseDeleteConfirmation}
              >
                Tidak
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default ResultCar;
