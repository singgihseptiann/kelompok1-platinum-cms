import React, { useState, useEffect } from "react";
import { Table, Pagination, Container, Row, Col, Form } from "react-bootstrap";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import axios from "axios";
import moment from "moment";

const TableOrder = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]); // State untuk menyimpan data dari API

  // Fungsi untuk mengambil data dari API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api-car-rental.binaracademy.org/admin/v2/order",
        {
          headers: {
            access_token: `${localStorage.getItem("token")}`,
          },
        }
      );

      // Mengambil array dari response API (response.data.orders)
      const apiData = response.data.orders;
      setData(apiData);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  // Mengambil data dari API saat komponen dimuat
  useEffect(() => {
    fetchData();
  }, []);

  const handleSortClick = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    // Lakukan pengurutan data Anda sesuai dengan `newSortOrder` di sini
  };
  function formatRupiah(angka) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(angka);
  }

  // Logika untuk menentukan data yang akan ditampilkan berdasarkan halaman saat ini
  const itemsPerPage = limit;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  return (
    <Container>
      <Row>
        <Col>
          <div className="ms-5 mt-5">
            <p className="fw-bold">Dashboard</p>
            <div className="d-flex">
              <div
                style={{
                  backgroundColor: "#0D28A6",
                  width: "10px",
                  height: "34px",
                  marginRight: "10px",
                }}
              ></div>
              <p className="fw-bold">List Order</p>
            </div>
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th className="" style={{ backgroundColor: "#cfd4ed" }}>
                    No
                  </th>
                  <th style={{ backgroundColor: "#cfd4ed" }}>
                    User Email{" "}
                    {sortOrder === "asc" ? (
                      <FaSortUp onClick={handleSortClick} />
                    ) : (
                      <FaSortDown onClick={handleSortClick} />
                    )}
                  </th>
                  <th style={{ backgroundColor: "#cfd4ed" }}>
                    Car{" "}
                    {sortOrder === "asc" ? (
                      <FaSortUp onClick={handleSortClick} />
                    ) : (
                      <FaSortDown onClick={handleSortClick} />
                    )}
                  </th>
                  <th style={{ backgroundColor: "#cfd4ed" }}>
                    Start Rent{" "}
                    {sortOrder === "asc" ? (
                      <FaSortUp onClick={handleSortClick} />
                    ) : (
                      <FaSortDown onClick={handleSortClick} />
                    )}
                  </th>
                  <th style={{ backgroundColor: "#cfd4ed" }}>
                    Finish Rent{" "}
                    {sortOrder === "asc" ? (
                      <FaSortUp onClick={handleSortClick} />
                    ) : (
                      <FaSortDown onClick={handleSortClick} />
                    )}
                  </th>
                  <th style={{ backgroundColor: "#cfd4ed" }}>
                    Price{" "}
                    {sortOrder === "asc" ? (
                      <FaSortUp onClick={handleSortClick} />
                    ) : (
                      <FaSortDown onClick={handleSortClick} />
                    )}
                  </th>
                  <th style={{ backgroundColor: "#cfd4ed" }}>
                    Category{" "}
                    {sortOrder === "asc" ? (
                      <FaSortUp onClick={handleSortClick} />
                    ) : (
                      <FaSortDown onClick={handleSortClick} />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.User.email}</td>
                    <td>{row.Car ? row.Car.name : "Car"}</td>
                    <td>{moment(row.start_rent_at).format("DD MMMM YYYY")}</td>
                    <td>{moment(row.finish_rent_at).format("DD MMMM YYYY")}</td>
                    <td>{formatRupiah(row.total_price)}</td>
                    <td>{row.Category ? row.Category.name : "Category"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span>Limit</span>
                <Form.Group controlId="limitDropdown">
                  <Form.Select
                    value={limit}
                    onChange={(e) => {
                      setLimit(parseInt(e.target.value, 10));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <Pagination className="">
                <Pagination.First onClick={() => setCurrentPage(1)} />
                <Pagination.Prev
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      prevPage > 1 ? prevPage - 1 : 1
                    )
                  }
                />
                {Array.from({ length: Math.ceil(data.length / limit) }).map(
                  (page, index) => (
                    <Pagination.Item
                      key={index}
                      active={currentPage === index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  )
                )}
                <Pagination.Next
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      prevPage < Math.ceil(data.length / limit)
                        ? prevPage + 1
                        : prevPage
                    )
                  }
                />
                <Pagination.Last
                  onClick={() => setCurrentPage(Math.ceil(data.length / limit))}
                />
              </Pagination>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TableOrder;
