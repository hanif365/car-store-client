import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";
import Homepage from "../pages/Homepage";
import ProtectedRoute from "../layouts/ProtectedRoute";
import { USER_ROLES } from "../constants/global";
import AllProducts from "@/pages/AllProducts";
import ProductDetails from "@/pages/ProductDetails";
import About from "@/pages/About";
import Checkout from "@/pages/Checkout";
import OrderDetails from "@/pages/OrderDetails";
import AdminDashboardLayout from "@/pages/dashboard/AdminDashboardLayout/AdminDashboardLayout";
import UserManagement from "@/pages/dashboard/AdminDashboardLayout/UserManagement";
import Overviews from "@/pages/dashboard/AdminDashboardLayout/Overviews";
import ProductsManagement from "@/pages/dashboard/AdminDashboardLayout/ProductsManagement";
import OrderManagement from "@/pages/dashboard/AdminDashboardLayout/OrderManagement";
import ProfileManagement from "@/pages/dashboard/AdminDashboardLayout/ProfileManagement";
import UserDashboardLayout from "@/pages/dashboard/UserDashboardLayout/UserDashboardLayout";
// import ProductManagement from "@/pages/ProductManagement";
// import OrderManagement from "@/pages/OrderManagement";

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
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute roles={[USER_ROLES.USER, USER_ROLES.ADMIN]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute roles={[USER_ROLES.USER, USER_ROLES.ADMIN]}>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/verification",
        element: (
          <ProtectedRoute roles={[USER_ROLES.USER, USER_ROLES.ADMIN]}>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute roles={[USER_ROLES.ADMIN]}>
            <AdminDashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Overviews />,
          },
          {
            path: "users",
            element: <UserManagement />,
          },

          {
            path: "products",
            element: <ProductsManagement />,
          },
          {
            path: "orders",
            element: <OrderManagement />,
          },
          {
            path: "profile",
            element: <ProfileManagement />,
          },
        ],
      },
      {
        path: "/user/dashboard",
        element: (
          <ProtectedRoute roles={[USER_ROLES.USER]}>
            <UserDashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Overviews />,
          },
          {
            path: "orders",
            element: <OrderManagement />,
          },
          {
            path: "profile",
            element: <ProfileManagement />,
          },
        ],
      },
    ],
  },
]);

export default router;
