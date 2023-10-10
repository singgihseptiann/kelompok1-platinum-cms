import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Form, InputGroup } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const BarChartComponent = () => {
  const [apiData, setApiData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format("YYYY-MM")
  );
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl =
          "https://api-car-rental.binaracademy.org/admin/order/reports";
        const fromDate = "2022-01-01";
        const untilDate = "2022-12-31";
        const fullUrl = `${baseUrl}?from=${fromDate}&until=${untilDate}`;

        const axiosConfig = {
          headers: {
            access_token: localStorage.getItem("token"),
          },
        };

        const response = await axios.get(fullUrl, axiosConfig);
        const orderReports = response.data.map((report) => ({
          day: moment(report.day, "YYYY-MM-DD").format("YYYY-MM-DD"),
          orderCount: Number(report.orderCount),
        }));
        setApiData(orderReports);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const selectedYear = selectedMonth.split("-")[0];
      const selectedMonthNumber = parseInt(selectedMonth.split("-")[1]);
      const daysInMonth = moment(
        `${selectedYear}-${selectedMonthNumber}`,
        "YYYY-MM"
      ).daysInMonth();
      const datesArray = Array.from({ length: daysInMonth }, (_, i) =>
        moment(`${selectedYear}-${selectedMonthNumber}-${i + 1}`).format(
          "YYYY-MM-DD"
        )
      );

      const chartDataMapped = datesArray.map((date) => {
        const dataForDate = apiData.find((item) => item.day === date);
        return {
          day: moment(date).format("DD"),
          orderCount: dataForDate ? dataForDate.orderCount : 0,
        };
      });

      setChartData(chartDataMapped);

      console.log(`Chart data for ${selectedMonth}:`, chartDataMapped);
    }
  }, [apiData, selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const ChartData = {
    labels: chartData.map((item) => item.day),
    datasets: [
      {
        label: "Jumlah Pesanan",
        backgroundColor: "#586B90",
        borderWidth: 1,
        data: chartData.map((item) => item.orderCount),
      },
    ],
  };

  const customTooltipPlugin = {
    beforeRender: function (chart, args, options) {
      const { tooltipModel, ctx } = args;
      const { dataIndex } = tooltipModel;

      if (dataIndex !== undefined) {
        const dataset = chart.data.datasets[tooltipModel.datasetIndex];
        const value = dataset.data[dataIndex];

        const tooltipText = `${dataset.label}: ${value}`;
        ctx.font = "16px Arial";
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillText(tooltipText, tooltipModel.x, tooltipModel.y - 10);
      }
    },
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 120,
        beginAtZero: true,
        ticks: {
          stepSize: 30,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Rented Car Data Visualization",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            if (label) {
              return ` ${label}: ${context.parsed.y}`;
            }
            return "";
          },
        },
      },
    },
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="ms-5 mt-5">
              <div className="d-flex">
                <div
                  style={{
                    backgroundColor: "#0D28A6",
                    width: "10px",
                    height: "34px",
                    marginRight: "10px",
                  }}
                ></div>
                <p className="fw-bold">Rented Car Data Visualization</p>
              </div>
              <Form>
                <Form.Group controlId="input2">
                  <Form.Label className="fw-bold">Month</Form.Label>
                  <InputGroup>
                    <Form.Select
                      aria-label="Default select example"
                      name="month"
                      style={{ maxWidth: "200px" }}
                      onChange={handleMonthChange}
                      value={selectedMonth}
                    >
                      <option value="">Select a month</option>
                      <option value="2022-01">January - 2023</option>
                      <option value="2022-02">February - 2023</option>
                      <option value="2022-03">March - 2023</option>
                      <option value="2022-04">April - 2023</option>
                      <option value="2022-05">May - 2023</option>
                      <option value="2022-06">June - 2023</option>
                      <option value="2022-07">July - 2023</option>
                      <option value="2022-08">August - 2023</option>
                      <option value="2022-09">September - 2023</option>
                      <option value="2022-10">October - 2023</option>
                      <option value="2022-11">November - 2023</option>
                      <option value="2022-12">December - 2023</option>
                    </Form.Select>
                    <Button style={{ backgroundColor: "#0D28A6" }}>Go</Button>
                  </InputGroup>
                </Form.Group>
              </Form>
              <div style={{ marginTop: "20px" }}>
                <Bar data={ChartData} options={options} height={400} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BarChartComponent;
