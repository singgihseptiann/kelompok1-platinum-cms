import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import TestComponent from "./component/Test";
import CobaComponent from "./component/coba";
import BarChartComponent from "./component/barChart";

function App() {
  return (
    <div>
      {/* ini buat coba-coba aja */}
      <BarChartComponent />
    </div>
  );
}

export default App;
