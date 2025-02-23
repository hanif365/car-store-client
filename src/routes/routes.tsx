import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";
import Homepage from "../pages/Homepage";
import ProtectedRoute from "../layouts/ProtectedRoute";
import { USER_ROLES } from "../constants/global";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute role={USER_ROLES.USER}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  //   {
  //     path: "/dashboard",
  //     element: <Dashboard />,
  //     children: [
  //       {
  //         path: "/dashboard",
  //         element: <Dashboard />,
  //       },
  //     ],
  //   },
]);

export default router;
