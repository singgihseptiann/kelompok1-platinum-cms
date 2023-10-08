import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
<<<<<<< HEAD
import Topbar from "./component/Topbar";
import Sidebar from "./component/sidebar";
=======
import { BrowserRouter as Router } from "react-router-dom";
>>>>>>> acbc720ad03841d5659518ef8f627de6139f02be
import BarChartComponent from "./component/barChart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/landing" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
}

function MainApp() {
  return (
    <>
      <Topbar />
      <Sidebar />
      <Routes>
        <Route path="" element={<BarChartComponent />} />
        
      </Routes>
    </>
  );
}

export default App;
