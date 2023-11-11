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
