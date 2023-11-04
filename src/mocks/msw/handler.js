import { rest } from "msw";

const baseUrl = "https://api-car-rental.binaracademy.org"; // Ganti dengan URL basis API sebenarnya

export const handlers = [
  rest.get(`${baseUrl}/admin/v2/car`, (req, res, ctx) => {
    // Menentukan respon yang diharapkan saat melakukan permintaan GET ke URL tersebut
    // Mengembalikan daftar mobil yang diharapkan
    return res(
      ctx.status(200),
      ctx.json({
        cars: [
          {
            id: 1,
            name: "Car 1",
            price: 50,
            category: "small",
          },
          {
            id: 2,
            name: "Car 2",
            price: 90,
            category: "medium",
          },
        ],
      })
    );
  }),

  rest.delete(`${baseUrl}/admin/car/:id`, (req, res, ctx) => {
    // Menangani permintaan DELETE yang diharapkan
    const { id } = req.params;
    // Simulasi penghapusan yang sukses
    return res(ctx.status(201));
  }),
];
