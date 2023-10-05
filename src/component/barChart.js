import { useState } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Form,
  InputGroup,
  Table,
  Pagination,
} from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
// import "../style/styles.css";
import MyTable from "./myTable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Topbar from "./Topbar";
import Sidebar from "./sidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = Array.from({ length: 30 }, (_, index) => (index + 1).toString());

const options = {
  plugins: {
    title: {
      display: true,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
      min: 0,
      max: 120,
      text: "Chart.js Bar Chart - Stacked",
      ticks: {
        stepSize: 30,
        callback: (value) => {
          return value.toString();
        },
      },
    },
  },
};

const BarChartComponent = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState(generateData(selectedOption));

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleGoClick = () => {
    const newData = generateData(selectedOption);
    setData(newData);
  };

  function generateData(selectedOption) {
    return {
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: labels.map(() => {
            if (selectedOption === "Option 1") {
              return faker.datatype.number({ min: -1000, max: 1000 });
            } else if (selectedOption === "Option 2") {
              return faker.datatype.number({ min: -500, max: 500 });
            } else if (selectedOption === "Option 3") {
              return faker.datatype.number({ min: -200, max: 200 });
            } else {
              return faker.datatype.number({ min: -1000, max: 1000 });
            }
          }),
          backgroundColor: "#586B90",
        },
      ],
    };
  }

  return (
    <>
    <Topbar />
    <Sidebar />
    <Container>
      <Row>
        <Col>
          <div className="d-flex mt-5">
            <div
              style={{
                backgroundColor: "#0D28A6",
                width: "10px",
                height: "34px",
                marginRight: "10px",
              }}
            ></div>
            <p className=" fw-bold">Rented Car Data Visualization</p>
          </div>
          <Form>
            <Form.Group controlId="input2">
              <Form.Label className="fw-bold">Month</Form.Label>
              <InputGroup>
                <Form.Select
                  aria-label="Default select example"
                  name="month"
                  onChange={handleOptionChange}
                  value={selectedOption}
                  style={{ maxWidth: "200px" }}
                >
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option>
                </Form.Select>
                <Button
                  onClick={handleGoClick}
                  style={{ backgroundColor: "#0D28A6" }}
                >
                  Go
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
          <Bar className="" options={options} data={data} />
        </Col>
      </Row>
      <Row>
        <Col className="mt-5">
          {/* <p className=" fw-bold">Dashboard</p> */}
          {/* <div className="d-flex">
            <div
              style={{
                backgroundColor: "#0D28A6",
                width: "10px",
                height: "34px",
                marginRight: "10px",
              }}
            ></div>
            <p className=" fw-bold">List Order</p>
          </div> */}
          <MyTable />
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default BarChartComponent;
