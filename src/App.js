import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Topbar from "./component/Topbar";
import Sidebar from "./component/sidebar";
import ListCarComponent from "./component/listcar";
// import "./style/Styles.css";
import { BrowserRouter as Router } from "react-router-dom";
import BarChartComponent from "./component/barChart";

function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <Sidebar />
      <Routes>
        <Route path="" element={<BarChartComponent />} />
        <Route path="login" element={<Login />} />

        <Route path="list-car" element={<ListCarComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
