import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EditCars from "./pages/EditCars";
import AddCar from "./component/AddCar";
import DashboardPages from "./pages/Header/Dashboard";

import RentedCar from "./pages/dashboardpages/DasboardRentedOrder";

function App() {
  return (
    <BrowserRouter>
      <DashboardPages />
      <Routes>
        <Route path="/dashboard-rented" element={<RentedCar />} />
        <Route path="login" element={<Login />} />
        <Route path="/edit-cars/:id" element={<EditCars />} />
        <Route path="/add-car" element={<AddCar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
