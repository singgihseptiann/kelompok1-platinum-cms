import { useEffect, useState } from 'react';
import { Card, Button, Container, Modal } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

const AddCar = () => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    status: false,
    image: ''
  });
  const [previewSource, setPreviewSource] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    setForm({
      ...form,
      image: file
    });
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendToAPI();
  };

  const sendToAPI = async () => {
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('category', form.category);
    formData.append('price', form.price);
    formData.append('status', form.status);
    formData.append('image', form.image);

    try {
      const response = await axios.post("https://api-car-rental.binaracademy.org/admin/car", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'access_token': localStorage.getItem("token"),
        },
      });
      console.log("API response:", response);
      setShowModal(true);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <div style={{ background: "#F4F5F7" }}>
      <Container>
        <Row>
          <Col>
            <h2>Add New Car</h2>
            <Card
              body
              style={{ width: "98%", height: "512px", marginBottom: "320px" }}
              className=""
            >
              <Row>
                <Col sm={6}>
                  <Form onSubmit={handleSubmit}>

                    {/* Form input Nama/Tipe Mobil */}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" className="labelAddCar" required>
                        Nama/Tipe Mobil<span className="text-danger">*</span>
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          className="textInput"
                          style={{ width: '100%' }}
                          type="input"
                          placeholder="Input Nama/Tipe Mobil"
                          value={form.name}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              name: e.target.value
                            })
                          }
                        />
                      </Col>
                    </Form.Group>

                    {/* Form input Harga */}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" className="labelAddCar">
                        Harga<span className="text-danger">*</span>
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          className="textInput"
                          style={{ width: '100%' }}
                          type="input"
                          placeholder="Input Harga Sewa Mobil"
                          value={form.price}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              price: e.target.value
                            })
                          }
                        />
                      </Col>
                    </Form.Group>

                    {/* Form input Foto */}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" className="labelAddCar">
                        Foto<span className="text-danger">*</span>
                      </Form.Label>
                      <Col sm="8">
                      <input
                          type="file"
                          accept=".svg" // Hanya menerima file SVG
                          onChange={handleChangePhoto}
                          style={{ width: '350px' }}
                          className="form-control"
                        />
                        <label
                          style={{
                            fontFamily: 'Rubik',
                            fontSize: '10px',
                            fontWeight: '300',
                            lineHeight: '14px'
                          }}>
                          File Size max 2MB{' '}
                        </label>
                      </Col>
                    </Form.Group>

                    {/* Form input Kategori */}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" className="labelAddCar">
                        Kategori<span className="text-danger">*</span>
                      </Form.Label>
                      <Col sm="8">
                        <Form.Select
                          className="textInput"
                          style={{ width: '100%' }}
                          aria-label="Default select example"
                          value={form.category}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              category: e.target.value
                            })
                          }>
                          <option value="">Pilih Kategori Mobil</option>
                          <option value="small">small</option>
                          <option value="medium">medium</option>
                          <option value="large">large</option>
                        </Form.Select>
                      </Col>
                    </Form.Group>

                    {/* Form input Created at */}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" className="labelAddCar">
                        Created at
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue="-"
                          style={{ width: '100%' }}
                        />
                      </Col>
                    </Form.Group>

                    {/* Form input Update at */}
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="4" className="labelAddCar">
                        Update at
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue="-"
                          style={{ width: '100%' }}
                        />
                      </Col>
                    </Form.Group>


                    {/* Tombol Cancel dan Save */}
                    <div className="d-flex gap-3">
                      <Button variant="outline-primary">Cancel</Button>
                      <Button variant="primary" type="submit">
                        Save
                      </Button>
                    </div>
                  </Form>
                </Col>

                {/* Kolom untuk menampilkan preview foto */}
                <Col sm={6} className="d-flex justify-content-center align-items-center">
                  {previewSource && (
                    <img
                      className="textInput"
                      src={previewSource}
                      alt="Preview"
                      style={{
                        width: '250px',
                        height: '250px',
                        border: '1px solid #ccc',
                        marginLeft: '20px' 
                      }}
                    />
                  )}
                </Col>
              </Row>
            </Card>

            {/* Modal untuk menampilkan pesan sukses */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Data berhasil disimpan!</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddCar;
