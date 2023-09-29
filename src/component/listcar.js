import { Row, Col, Container, Button, Form, InputGroup, Card } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";

const ListCarComponent = () => {
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
            <Button variant="outline-primary" className="rounded-0 me-2">
              All
            </Button>
            <Button variant="outline-primary" className="rounded-0 me-2">
              2-4 Peoples
            </Button>
            <Button variant="outline-primary" className="rounded-0 me-2">
              4-6 Peoples
            </Button>
            <Button variant="outline-primary" className="rounded-0 me-2">
              6-8 Peoples
            </Button>{" "}
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="d-flex flex-row">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ListCarComponent;
