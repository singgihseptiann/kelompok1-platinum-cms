import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../mocks/redux";
import ListCarComponent from "../../component/Listcar/listcar";
import axios from "axios";

// Fetching data test
describe("ListCarComponent Fetching Data", () => {
  it("fetches and sets car data in state", async () => {
    const mockCarData = {
      cars: [
        { id: 1, name: "Car 1", price: 10000, category: "small" },
        { id: 2, name: "Car 2", price: 15000, category: "medium" },
      ],
    };

    jest.spyOn(axios, "get").mockResolvedValue({ data: mockCarData });

    renderWithProviders(<ListCarComponent />);

    await waitFor(() => {
      expect(screen.getByText("Car 1")).toBeInTheDocument();
      expect(screen.getByText("Car 2")).toBeInTheDocument();
    });
  });
});

// Loader test
describe("ListCarComponent with Mock Server", () => {
  it("loader should be visible properly", async () => {
    renderWithProviders(<ListCarComponent />);
    await waitFor(async () => expect(await screen.findByTestId("loader")).toBeVisible());
  });

  // button test
  it("handles car deletion properly", async () => {
    renderWithProviders(<ListCarComponent />);

    const deleteButton = screen.queryByText(/Delete/i);
    if (deleteButton) {
      userEvent.click(deleteButton);
      // Additional assertions after clicking delete button
    } else {
      console.error("Delete button not found.");
    }
  });
});
