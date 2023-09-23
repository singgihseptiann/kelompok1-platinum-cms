import React from "react";
import { Row, Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Container } from "react-bootstrap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = Array.from({ length: 30 }, (_, index) => (index + 1).toString()); // Menyesuaikan label sumbu X

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
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
      ticks: {
        stepSize: 30,
        callback: (value) => {
          return value.toString(); 
        },
      },
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      backgroundColor: "#586B90",
    },
  ],
};

const BarChartComponent = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Bar options={options} data={data} />
        </Col>
      </Row>
    </Container>
  );
};

export default BarChartComponent;
