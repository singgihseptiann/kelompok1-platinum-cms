import React, { useState } from "react";
import { Table, Pagination, Container, Row, Col } from "react-bootstrap";
import { FaSortUp, FaSortDown } from "react-icons/fa";

// Fungsi untuk membuat data palsu
const generateData = () => {
  const data = [];
  for (let i = 1; i <= 100; i++) {
    data.push({
      id: i,
      firstName: `First Name ${i}`,
      lastName: `Last Name ${i}`,
      username: `@username${i}`,
      email: `@mail${i}`,
      category: `category${i}`,
    });
  }
  return data;
};

const MyTable = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini yang ditampilkan
  const [limit, setLimit] = useState(5); // State untuk limit data yang ditampilkan
  // Fungsi untuk mengubah urutan pengurutan saat kolom "User Email" diklik
  const handleSortClick = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc"; // Toggle antara naik (asc) dan turun (desc)
    setSortOrder(newSortOrder);
    // Lakukan pengurutan data  sesuai dengan `newSortOrder` di sini
  };

  // Menggunakan data palsu yang dihasilkan dari fungsi  generateData
  const tableData = generateData();

  // Fungsi untuk mengatur halaman saat ini
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fungsi untuk mengatur limit data yang ditampilkan
  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    setCurrentPage(1); // Set halaman kembali ke halaman pertama ketika limit diubah
  };

  // Logika untuk menentukan data yang akan ditampilkan berdasarkan halaman saat ini
  const itemsPerPage = limit; // Jumlah item per halaman
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = tableData.slice(startIndex, endIndex);

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
            {displayedData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.username}</td>
                <td>{row.email}</td>
                <td>{row.category}</td>
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
              onChange={handleLimitChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev
              onClick={() =>
                handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
              }
            />
            {Array.from({ length: Math.ceil(tableData.length / limit) }).map(
              (page, index) => (
                <Pagination.Item
                  key={index}
                  active={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
            <Pagination.Next
              onClick={() =>
                handlePageChange(
                  currentPage < Math.ceil(tableData.length / limit)
                    ? currentPage + 1
                    : currentPage
                )
              }
            />
            <Pagination.Last
              onClick={() =>
                handlePageChange(Math.ceil(tableData.length / limit))
              }
            />
          </Pagination>
        </div>
      </div>
    </Container>
  );
};

export default MyTable;
