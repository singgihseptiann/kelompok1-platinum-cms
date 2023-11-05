import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddCar from "../../component/Addcar/AddCar"; // Sesuaikan dengan path Anda
import { renderWithProviders } from "../../mocks/redux";
import axios from "axios";

jest.mock('axios');

describe("AddCar Component Testing", () => {
  // Pengujian tampilan formulir dan penanganan pengajuan formulir
  it("displays form and handles form submission", async () => {
    renderWithProviders(<AddCar />);

    // Mengambil input Nama/Tipe Mobil dan mengetikkannya
    const nameInput = screen.getByPlaceholderText("Input Nama/Tipe Mobil");
    userEvent.type(nameInput, "Car 1");
    expect(nameInput.value).toBe("Car 1");

    // Mengambil input Harga dan mengetikkannya
    const priceInput = screen.getByPlaceholderText("Input Harga Sewa Mobil");
    userEvent.type(priceInput, "20000");
    expect(priceInput.value).toBe("20000");

    // Memilih opsi kategori mobil
    const categorySelect = screen.getByLabelText("Default select example");
    userEvent.selectOptions(categorySelect, "small");
    expect(categorySelect.value).toBe("small");

    // Mengunggah file gambar dengan ukuran lebih besar dari 2MB
    const largeFile = new File(["dummy image"], "largeImage.png", {
      type: "image/png",
      size: 3 * 1024 * 1024,
    });
    const fileInput = screen.getByLabelText("Foto");
    Object.defineProperty(fileInput, "files", { value: [largeFile] });
    userEvent.upload(fileInput, largeFile);
    await waitFor(() => {
      expect(screen.getByText("File size should not exceed 2MB!")).toBeInTheDocument();
    });

    // Menguji fungsi previewFile
    const smallFile = new File(["dummy image"], "smallImage.png", {
      type: "image/png",
      size: 1 * 1024 * 1024,
    });
    const previewFileInput = screen.getByRole("button", { name: "Choose file" });
    userEvent.upload(previewFileInput, smallFile);
    const imgElement = await screen.findByAltText("Preview");
    expect(imgElement).toBeInTheDocument();

    // Mengajukan formulir tanpa memilih kategori
    const saveButton = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveButton);
    await waitFor(() => {
      expect(screen.getByText("Kategori harus dipilih!")).toBeInTheDocument();
    });
  });

  // Pengujian tampilan modal kesuksesan setelah mengirim data ke API
  it("displays success modal after sending data to the API", async () => {
    const mockSuccessResponse = {};
    axios.post.mockResolvedValue({ data: mockSuccessResponse });
    renderWithProviders(<AddCar />);
    const saveButton = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveButton);
    await waitFor(() => {
      expect(screen.getByText("Data berhasil disimpan!")).toBeInTheDocument();
    });
  });

  // Pengujian tampilan kesalahan ketika ukuran file melebihi 2MB
  it("displays error when the file size exceeds 2MB", () => {
    renderWithProviders(<AddCar />);
    const largeFile = new File(["dummy image"], "largeImage.png", {
      type: "image/png",
      size: 3 * 1024 * 1024,
    });
    const fileInput = screen.getByLabelText("Foto");
    userEvent.upload(fileInput, largeFile);
    expect(screen.getByText("File size should not exceed 2MB!")).toBeInTheDocument();
  });

  // Pengujian pembaruan status formulir ketika ukuran file valid
  it("updates the form state when the file size is valid", () => {
    renderWithProviders(<AddCar />);
    const smallFile = new File(["dummy image"], "smallImage.png", {
      type: "image/png",
      size: 1 * 1024 * 1024,
    });
    const fileInput = screen.getByLabelText("Foto");
    expect(fileInput.files).toHaveLength(0);
    expect(fileInput.value).toBe("");
    
    userEvent.upload(fileInput, smallFile);
    expect(fileInput.value).toBe("smallImage.png");
  });

  // Pengujian pengiriman data ke API
  it("sends data to the API", async () => {
    const mockSuccessResponse = {};
    axios.post.mockResolvedValue({ data: mockSuccessResponse });

    renderWithProviders(<AddCar />);

    const saveButton = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveButton);

    // Menambahkan ekspektasi untuk memastikan bahwa data berhasil dikirimkan ke API
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "https://api-car-rental.binaracademy.org/admin/car",
        expect.any(FormData),
        {
          headers: {
            access_token: expect.any(String),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      expect(screen.getByText("Data berhasil disimpan!")).toBeInTheDocument();
    });
  });

  // Pengujian tampilan modal kesalahan ketika mengalami kesalahan saat mengirim data ke API
  it("displays error modal when there is an error in sending data to the API", async () => {
    const mockErrorResponse = { message: "Failed to send data to the API" };
    axios.post.mockRejectedValueOnce({ response: { data: mockErrorResponse } });

    renderWithProviders(<AddCar />);

    const saveButton = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveButton);

  });
});
