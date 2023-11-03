import React from "react";
import "./App.css";
import { useRoutes } from "react-router";

import { routes } from "./Routes";

const App = () => {
  return useRoutes(routes);
};
export default App;
