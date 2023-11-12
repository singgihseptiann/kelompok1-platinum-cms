import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import ResultCar from "../../component/Searchcar/ResultCar";
import { renderWithProviders } from "../../mocks/redux";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const server = setupServer(
  rest.get(
    "https://api-car-rental.binaracademy.org/admin/v2/car",
    (req, res, ctx) => {
      return res(
        ctx.json({
          cars: [
            {
              id: 1,
              name: "Car1",
              image: "car1.jpg",
              price: 500000,
              category: "Category1",
              updatedAt: "2022-11-05T10:00:00Z",
            },
            {
              id: 2,
              name: "Car2",
              image: "car2.jpg",
              price: 700000,
              category: "Category2",
              updatedAt: "2022-11-05T11:00:00Z",
            },
          ],
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("ResultCar Component", () => {
  it("renders the car data", async () => {
    renderWithProviders(<ResultCar formatToIDR={(value) => value} />);

    await waitFor(() => {
      expect(screen.getByText("Car1")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Car2")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Rp 500,000")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Rp 700,000")).toBeInTheDocument();
    });
  });

  it("displays loading state", async () => {
    server.use(
      rest.get(
        "https://api-car-rental.binaracademy.org/admin/v2/car",
        (req, res, ctx) => {
          return res(ctx.delay(1000), ctx.json({ cars: [] }));
        }
      )
    );

    renderWithProviders(<ResultCar formatToIDR={(value) => value} />);

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  it("displays delete confirmation modal", async () => {
    renderWithProviders(<ResultCar formatToIDR={(value) => value} />);

    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText("Menghapus Data Mobil")).toBeInTheDocument();
    });
  });

  it("deletes the car when confirming delete", async () => {
    renderWithProviders(<ResultCar formatToIDR={(value) => value} />);

    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText("Menghapus Data Mobil")).toBeInTheDocument();
    });

    const confirmDeleteButton = screen.getByRole("button", { name: /Ya/i });
    userEvent.click(confirmDeleteButton);

    await waitFor(() => {
      expect(screen.queryByText("Car1")).toBeNull();
    });
  });

  it("navigates to edit page when clicking the edit button", async () => {
    const navigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(navigate);

    renderWithProviders(<ResultCar formatToIDR={(value) => value} />);

    const editButton = screen.getByRole("button", { name: /Edit/i });
    userEvent.click(editButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/edit-car/1");
    });
  });
});
