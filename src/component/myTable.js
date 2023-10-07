import React, { useState, useEffect } from "react";
import { Table, Pagination, Container, Row, Col } from "react-bootstrap";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
const MyTable = () => {
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

  // Logika untuk menentukan data yang akan ditampilkan berdasarkan halaman saat ini
  const itemsPerPage = limit;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  return (
    <Container>
      <Row>
        <Col></Col>
      </Row>
      <div>
        <p className=" fw-bold">Dashboard</p>
        <div className="d-flex">
          <div
            style={{
              backgroundColor: "#0D28A6",
              width: "10px",
              height: "34px",
              marginRight: "10px",
            }}
          ></div>
          <p className=" fw-bold">List Order</p>
        </div>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>No</th>
              <th>
                User Email{" "}
                {sortOrder === "asc" ? (
                  <FaSortUp onClick={handleSortClick} />
                ) : (
                  <FaSortDown onClick={handleSortClick} />
                )}
              </th>
              <th>
                Car{" "}
                {sortOrder === "asc" ? (
                  <FaSortUp onClick={handleSortClick} />
                ) : (
                  <FaSortDown onClick={handleSortClick} />
                )}
              </th>
              <th>
                Start Rent{" "}
                {sortOrder === "asc" ? (
                  <FaSortUp onClick={handleSortClick} />
                ) : (
                  <FaSortDown onClick={handleSortClick} />
                )}
              </th>
              <th>
                Finish Rent{" "}
                {sortOrder === "asc" ? (
                  <FaSortUp onClick={handleSortClick} />
                ) : (
                  <FaSortDown onClick={handleSortClick} />
                )}
              </th>
              <th>
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

                <td>{row.Category ? row.Category.name : "Category"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p>limit</p>
            <select
              id="limitDropdown"
              value={limit}
              onChange={(e) => {
                setLimit(parseInt(e.target.value, 10));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <Pagination>
            <Pagination.First onClick={() => setCurrentPage(1)} />
            <Pagination.Prev
              onClick={() =>
                setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1))
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
    </Container>
  );
};

export default MyTable;
