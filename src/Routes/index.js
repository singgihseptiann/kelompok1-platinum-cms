import { Navigate } from "react-router";
import RentedCarOrder from "../pages/dashboardpages/DasboardRentedOrder";
import Login from "../pages/Loginpage/Login";
import DashboardHeader from "../pages/Header/Dashboard";
import EditCars from "../component/Editcar/EditCars";
import AddCar from "../component/Addcar/AddCar";
import ListCarComponent from "../component/Listcar/listcar";
import ResultSearch from "../component/ResultSearch";
import ProtectedRoute from "../component/ProtectedRoute/ProtectedRoute";
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
        element: (
          <ProtectedRoute>
            <RentedCarOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-car/:id",
        element: (
          <ProtectedRoute>
            <EditCars />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-car",
        element: (
          <ProtectedRoute>
            <AddCar />
          </ProtectedRoute>
        ),
      },
      {
        path: "list-car",
        element: (
          <ProtectedRoute>
            <ListCarComponent />
          </ProtectedRoute>
        ),
      },
      {
        path: "result-search",
        element: (
          <ProtectedRoute>
            <ResultSearch />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export { routes };
