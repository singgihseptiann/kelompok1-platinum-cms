import { handler } from "./handler";

export const loginAdmin = (body) => handler.post("/admin/auth/login", body);
export const getCars = (queryParams) => handler.get("/admin/v2/car", { params: queryParams });
export const getCarsById = (id, queryParams) => handler.get(`/admin/car/${id}`, { params: queryParams });
