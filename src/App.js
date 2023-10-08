import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import { BrowserRouter as Router } from "react-router-dom";
import BarChartComponent from "./component/barChart";
import EditCars from "./pages/EditCars";
import AddCar from "./component/AddCar";

function App() {
  return (
    <BrowserRouter>
      {/* <Login /> */}
      <Routes>
        <Route path="/dashboard" element={<BarChartComponent />} />
        <Route path="login" element={<Login />} />
        <Route path="/edit-cars/:id" element={<EditCars />} />
        <Route path="/add-car" element={<AddCar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
