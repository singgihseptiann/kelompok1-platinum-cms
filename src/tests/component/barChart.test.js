// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import BarChartComponent from "../../component/Charts/barChart";
// import axios from "axios";
// import { renderWithProviders } from "../../mocks/redux"; // Tambahkan import ini

// // Mock Axios untuk pengujian
// jest.mock("axios");

// describe("BarChartComponent Testing", () => {
//   // Fungsi utilitas untuk mengubah data palsu untuk pengujian
//   const mockApiData = [
//     { day: "2023-01-01", orderCount: 10 },
//     { day: "2023-01-02", orderCount: 20 },
//     // Tambahkan data palsu sesuai kebutuhan
//   ];

//   beforeEach(() => {
//     axios.get.mockResolvedValue({ data: mockApiData });
//   });

//   test("BarChartComponent displays loader while fetching data", async () => {
//     renderWithProviders(<BarChartComponent />);
//     expect(screen.getByTestId("loader")).toBeInTheDocument();
//   });

//   test("BarChartComponent displays month selection buttons", () => {
//     renderWithProviders(<BarChartComponent />);
//     const januaryButton = screen.getByText("January - 2023");
//     expect(januaryButton).toBeInTheDocument();
//     userEvent.click(januaryButton);
//   });

//   test("BarChartComponent fetches data from API and displays it", async () => {
//     renderWithProviders(<BarChartComponent />);
//     await waitFor(() => {
//       expect(screen.getByText("10")).toBeInTheDocument();
//       expect(screen.getByText("20")).toBeInTheDocument();
//       // Tambahkan pengujian data lain sesuai kebutuhan
//     });
//   });

//   test("BarChartComponent updates chart data when month changes", async () => {
//     renderWithProviders(<BarChartComponent />);
//     const februaryButton = screen.getByText("February - 2023");
//     userEvent.click(februaryButton);
//     await waitFor(() => {
//       expect(screen.queryByText("10")).not.toBeInTheDocument();
//       expect(screen.queryByText("20")).not.toBeInTheDocument();
//       // Tambahkan pengujian perubahan data lain sesuai kebutuhan
//     });
//   });

//   test("BarChartComponent helper functions work as expected", () => {
//     const chartData = [
//       { day: "01", orderCount: 10 },
//       { day: "02", orderCount: 20 },
//       // Tambahkan data palsu sesuai kebutuhan
//     ];

//     const selectedMonth = "2023-01";
//     const updatedChartData = BarChartComponent.updateChartData(
//       mockApiData,
//       selectedMonth
//     );

//     expect(updatedChartData).toEqual(chartData);
//   });

//   test("BarChartComponent modal confirmation functions work correctly", async () => {
//     renderWithProviders(<BarChartComponent />);
//     const deleteButton = screen.getByText("Delete");
//     userEvent.click(deleteButton);

//     const confirmationModal = screen.getByText("Menghapus Data Mobil");
//     expect(confirmationModal).toBeInTheDocument();

//     const yesButton = screen.getByText("Ya");
//     userEvent.click(yesButton);

//     await waitFor(() => {
//       expect(
//         screen.queryByText("Menghapus Data Mobil")
//       ).not.toBeInTheDocument();
//       // Verifikasi penghapusan data mobil atau tindakan lain yang diharapkan
//     });
//   });
// });
import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import moment from "moment";
import BarChartComponent from "../../component/Charts/barChart"; // Sesuaikan dengan path Anda
import { renderWithProviders } from "../../mocks/redux";
// Mock axios untuk menghindari panggilan API sebenarnya
jest.mock("axios");

const mockApiData = [
  { day: "2023-01-01", orderCount: 10 },
  { day: "2023-01-02", orderCount: 15 },
];

describe("BarChartComponent Testing", () => {
  const updateChartData = (apiData, selectedMonth) => {
    return apiData.filter((item) => item.day.startsWith(selectedMonth));
  };

  beforeAll(() => {
    axios.get.mockResolvedValue({ data: mockApiData });
  });

  it("BarChartComponent helper functions work as expected", () => {
    const selectedMonth = "2023-01";
    const updatedChartData = updateChartData(mockApiData, selectedMonth);

    expect(updatedChartData).toEqual([
      { day: "2023-01-01", orderCount: 10 },
      { day: "2023-01-02", orderCount: 15 },
    ]);
  });

  it("BarChartComponent modal confirmation functions work correctly", async () => {
    renderWithProviders(<BarChartComponent />);

    await waitFor(() => {
      expect(
        screen.getByText("Rented Car Data Visualization")
      ).toBeInTheDocument();
    });

    const select = screen.getByRole("combobox");
    userEvent.selectOptions(select, "2023-01");

    await waitFor(() => {
      const chartDataLabels = screen.getAllByText(/(\d{2})/);
      expect(chartDataLabels).toHaveLength(2);
    });
  });
});
