import { Navigate } from "react-router";
import RentedCarOrder from "../pages/dashboardpages/DasboardRentedOrder";
import Login from "../pages/Loginpage/Login";
import DashboardHeader from "../pages/Header/Dashboard";
import EditCars from "../component/Editcar/EditCars";
import AddCar from "../component/Addcar/AddCar";
import ListCarComponent from "../component/Listcar/listcar";
// import AddCar from "../component/AddCar";
const routes = [
  {
    path: "",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "",
    element: <DashboardHeader />,
    children: [
      {
        path: "dashboard",
        element: <RentedCarOrder />,
      },
      {
        path: "edit-cars/:id",
        element: <EditCars />,
      },
      {
        path: "add-car",
        element: <AddCar />,
      },
      {
        path: "list-car",
        element: <ListCarComponent />,
      },
    ],
  },
];

export { routes };
