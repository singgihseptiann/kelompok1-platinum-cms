import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container, Button } from "react-bootstrap";
import "../styles/editcars.css";
import { Link } from "react-router-dom";
import Topbar from "../component/Topbar";
import Sidebar from "../component/sidebar";

const EditCars = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [err, setErr] = useState();
  const [isEditImage, setImageEdit] = useState(false);

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
  };

  const handleChangePrice = (e) => {
    setData({ ...data, price: e.target.value });
  };

  const handleChangeCategory = (e) => {
    setData({ ...data, category: e.target.value });
  };

  const handleChangePhoto = (e) => {
    setData({ ...data, image: e.target.files[0] });
    setImageEdit(true);
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
    const token = localStorage.getItem("");
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const waktuCreate = new Date(data.createdAt).toLocaleDateString();
  const waktuUpdate = new Date(data.updatedAt).toLocaleDateString();

  return (
    <div>
      <Topbar />
      <Sidebar />
      <div>
        <Container>
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
                  //   value={data.name}
                  placeholder={data.name}
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
                  {/* <FiUpload size={18} /> */}
                </div>
                <p className="p-text-img">File Size max 2MB </p>

                {isEditImage !== true && isEditImage !== "" ? (
                  <img
                    src={data.image}
                    alt="Preview"
                    style={{
                      width: "200px",
                      height: "200px",
                      border: "1px solid #ccc",
                    }}
                  />
                ) : null}
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
              <Col sm="6">
                <div>-</div>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label className="required-field" column sm="2">
                <span className="text-color-edit">Updated at</span>
              </Form.Label>
              <Col sm="6">
                <div>-</div>
              </Col>
            </Form.Group>
          </Form>
          <div style={{ marginTop: 250 }}>
            <Link to={""}>
              <Button className="button-cancel">Cancel</Button>
            </Link>
            <Button className="button-save" onClick={handleSave}>
              Save
            </Button>
            {/* <Button onClick={handleSave}>Save</Button> */}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default EditCars;
