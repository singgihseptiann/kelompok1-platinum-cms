import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../mocks/redux";
import ListCarComponent from "../../component/Listcar/listcar";

describe("ListCarComponent with Mock Server", () => {
  it("loader should be visible properly", async () => {
    // act(() => {
    renderWithProviders(<ListCarComponent />);
    // });

    await waitFor(async () => expect(await screen.findByTestId("loader")).toBeVisible());
  });

  // it("handles car deletion properly", async () => {
  //   render(<ListCarComponent />);

  //   const deleteButton = screen.getByText("Delete");
  //   userEvent.click(deleteButton);

  //   expect(screen.getByText("Menghapus Data Mobil")).toBeInTheDocument();

  //   const confirmButton = screen.getByText("Ya");
  //   userEvent.click(confirmButton);
  //   // Additional assertions based on behavior after deleting data
  // });

  // button pake fireEvent.click
  // input pake fireEvent.change
});
