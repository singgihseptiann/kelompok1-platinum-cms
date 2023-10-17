import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container, Button, Alert } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { FiUpload } from "react-icons/fi";
import Toast from "react-bootstrap/Toast";
import "../../styles/editcars.css";
import { Link } from "react-router-dom";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/sidebar";

const EditCars = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [err, setErr] = useState();
  const [isEditImage, setImageEdit] = useState(false);
  const [sizeImage, setSizeImage] = useState("0");
  const [isChange, setIsChange] = useState(false);
  const [photo, setPhoto] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleDetailCars = () => {
    const token = localStorage.getItem("token");
    const api = `https://api-car-rental.binaracademy.org/admin/car/${id}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        access_token: token,
      },
    };

    axios
      .get(api, config)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleDetailCars();
  }, []);

  const handleChangeName = (e) => {
    setData({ ...data, name: e.target.value });
    setIsChange(true);
  };

  const handleChangePrice = (e) => {
    setData({ ...data, price: e.target.value });
    setIsChange(true);
  };

  const handleChangeCategory = (e) => {
    setData({ ...data, category: e.target.value });
    setIsChange(true);
  };

  const handleChangePhoto = (e) => {
    if (e.target.files[0].size < 2000000) {
      setData({ ...data, image: e.target.files[0] });
      setImageEdit(true);
      setPhoto(URL.createObjectURL(e.target.files[0]));
      const photoSize = e.target.files[0].size;
      setSizeImage(photoSize);
      setIsChange(true);
    } else {
      const photoSize = e.target.files[0].size;
      setSizeImage(photoSize);
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", parseInt(data.price));
    formData.append("image", data.image);
    formData.append("status", true);

    const api = `https://api-car-rental.binaracademy.org/admin/car/${id}`;
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Content_Type: "multipart/orm-data",
        access_token: token,
      },
    };

    axios
      .put(api, formData, config)
      .then((res) => {
        console.log(res);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate("/list-car");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const waktuCreate = new Date(data.createdAt).toLocaleDateString();
  const waktuUpdate = new Date(data.updatedAt).toLocaleDateString();

  return (
    <div>
      <div style={{ background: "#CFD4ED" }}>
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item>Car</Breadcrumb.Item>
            <Breadcrumb.Item>List Cars</Breadcrumb.Item>
            <Breadcrumb.Item active>Edit Car</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
        <Container>
          <div>
            {/* {showToast && (
              <Toast style={{ background: "green" }} autohide>
                <Toast.Body>Berhasil Edit Data</Toast.Body>
              </Toast>
            )} */}
            {showToast && (
              <Alert variant="success" className="alert-seccess">
                Berhasil Edit Data
              </Alert>
            )}
          </div>
          <div>
            {showAlert ? (
              <Alert variant="danger">
                Ukuran gambar lebih dari 2MB, silahkan pilih gambar lain
              </Alert>
            ) : null}
          </div>
          <h1>Edit Cars</h1>
          <Form className="form-background">
            <Form.Group as={Row} className="mb-3">
              <Form.Label className="required-field" column sm="2">
                <span className="text-color-edit">Nama</span>
              </Form.Label>
              <Col sm="4">
                <input
                  required
                  className="editcar-inputsection-form-input-bg"
                  onChange={handleChangeName}
                  value={data.name}
                  // placeholder={data.name}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label className="required-field" column sm="2">
                <span className="text-color-edit">Harga</span>
              </Form.Label>
              <Col sm="4">
                <input
                  className="editcar-inputsection-form-input-bg"
                  onChange={handleChangePrice}
                  type="number"
                  value={data.price}
                  placeholder="Rp"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label className="required-field" column sm="2">
                <span className="text-color-edit">Foto</span>
              </Form.Label>
              <Col sm="4">
                <div className="editcar-inputsection-form-input-bg">
                  <input
                    placeholder="Upload Foto Mobil"
                    type="file"
                    onChange={handleChangePhoto}
                    required
                  />{" "}
                  <FiUpload size={18} />
                </div>
                <p className="p-text-img">File Size max 2MB </p>

                {isEditImage ? (
                  <img
                    src={photo}
                    alt="Load Image"
                    style={{
                      width: "200px",
                      height: "200px",
                      border: "1px solid #ccc",
                    }}
                  />
                ) : (
                  <p className="-text-img">
                    Silahkan pilih ulang Foto untuk disimpan
                  </p>
                  // <img
                  //   src={data.image}
                  //   alt="Load Image"
                  //   style={{
                  //     width: "200px",
                  //     height: "200px",
                  //     border: "1px solid #ccc",
                  //   }}
                  // />
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label className="required-field" column sm="2">
                <span className="text-color-edit">Kategori</span>
              </Form.Label>
              <Col sm="4">
                <Form.Select
                  style={{
                    borderRadius: "1px",
                    width: "339px",
                    color: "#8a8a8a",
                    fontFamily: "Arial",
                    fontStyle: "Normal",
                    fontWeight: "300",
                    fontSize: "14px",
                  }}
                  onChange={handleChangeCategory}
                >
                  <option value={data.category} hidden>
                    {data.category}
                  </option>
                  <option value="small">small</option>
                  <option value="medium">medium</option>
                  <option value="large">large</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label className="required-field" column sm="2">
                <span className="text-color-edit">Created at</span>
              </Form.Label>
              <Col sm="6" className="text-created">
                <div>{waktuCreate}</div>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label className="required-field" column sm="2">
                <span className="text-color-edit">Updated at</span>
              </Form.Label>
              <Col sm="6" className="text-created">
                <div>{waktuUpdate}</div>
              </Col>
            </Form.Group>
          </Form>
          <div style={{ marginTop: 200 }}>
            <Link to="/list-car">
              <Button className="button-cancel">Cancel</Button>
            </Link>
            <Button
              className="button-save"
              onClick={handleSave}
              disabled={!isChange}
            >
              Save
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default EditCars;
