import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Topbar from "./component/Topbar";
import Sidebar from "./component/sidebar";
import "./style/Styles.css";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
