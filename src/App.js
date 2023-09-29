import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import TestComponent from "./component/Test";
import CobaComponent from "./component/coba";
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
        <Route path="/" element={<TestComponent />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
