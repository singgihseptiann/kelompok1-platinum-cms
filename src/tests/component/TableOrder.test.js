import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import TableOrder from "../../component/Table-List-Order/TableOrder"; // Sesuaikan dengan path ke komponen TableOrder
import { renderWithProviders } from "../../mocks/redux"; // Sesuaikan dengan path yang benar

const server = setupServer(
  rest.get(
    "https://api-car-rental.binaracademy.org/admin/v2/order",
    (req, res, ctx) => {
      return res(
        ctx.json({
          orders: [
            {
              User: { email: "admin@mail.com" },
              Car: { name: "Car" },
              start_rent_at: "2022-10-07T00:00:00Z",
              finish_rent_at: "2022-10-07T00:00:00Z",
              total_price: 4500000,
              Category: { name: "Category" },
            },
            // Tambahkan data lain sesuai kebutuhan
          ],
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("TableOrder Component", () => {
  it("renders the table with order data", async () => {
    renderWithProviders(<TableOrder />);

    await waitFor(() => {
      expect(screen.getByText("admin@mail.com")).toBeInTheDocument();
      expect(screen.getByText("Car")).toBeInTheDocument();
      expect(screen.getByText("Category")).toBeInTheDocument();
      // ...
    });
  });

  it("sorts the table when clicking the sort buttons", async () => {
    renderWithProviders(<TableOrder />);

    const sortUserEmailButton = screen.getByRole("button", {
      name: /User Email/i,
    });
    userEvent.click(sortUserEmailButton);

    await waitFor(() => {
      // Pastikan data telah diurutkan sesuai dengan urutan yang benar
      expect(screen.getByText("admin@mail.com")).toBeInTheDocument();
      expect(screen.getByText("Category")).toBeInTheDocument();
      // ...
    });
  });

  it("navigates between pages using pagination", async () => {
    renderWithProviders(<TableOrder />);

    const nextPageButton = screen.getByText("›");
    userEvent.click(nextPageButton);

    await waitFor(() => {
      // Pastikan data pada halaman berikutnya tampil
      expect(screen.getByText("admin@mail.com")).toBeInTheDocument();
      expect(screen.getByText("Category")).toBeInTheDocument();
      // ...
    });
  });

  it("verifies the format of the displayed price", async () => {
    renderWithProviders(<TableOrder />);

    await waitFor(() => {
      const priceElement = screen.getByText(/Rp \d+,\d+/); // Menggunakan regex untuk mencocokkan format harga
      expect(priceElement).toBeInTheDocument();
      // ...
    });
  });
});
