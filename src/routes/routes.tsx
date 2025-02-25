import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/AuthManagementPage/LoginPage";
import Register from "../pages/AuthManagementPage/RegisterPage";

import Homepage from "../pages/Homepage/Homepage";
import ProtectedRoute from "../layouts/ProtectedRoute";
import { USER_ROLES } from "../constants/global";
import AllProducts from "@/pages/ProductManagementPage/AllProductPage/AllProductPage";
import ProductDetails from "@/pages/ProductManagementPage/ProductDetailsPage/ProductDetailsPage";
import About from "@/pages/AboutPage/AboutPage";
import Checkout from "@/pages/CheckoutPage/CheckoutPage";
import OrderDetails from "@/pages/OrderManagementPage/OrderDetailsPage";

import AdminUserManagement from "@/components/Dashboard/AdminDashboard/UserManagement";
import AdminOverviews from "@/components/Dashboard/AdminDashboard/Overviews";
import AdminProductsManagement from "@/components/Dashboard/AdminDashboard/ProductsManagement";
import AdminOrderManagement from "@/components/Dashboard/AdminDashboard/OrderManagement";
import AdminProfileManagement from "@/components/Dashboard/AdminDashboard/ProfileManagement";

import UserOrderManagement from "@/components/Dashboard/UserDashboard/OrderManagement";
import UserOverviews from "@/components/Dashboard/UserDashboard/Overviews";
import UserProfileManagement from "@/components/Dashboard/UserDashboard/ProfileManagement";

import AdminDashboard from "@/pages/Dashboard/AdminDashboard/AdminDashboard";
import UserDashboard from "@/pages/Dashboard/UserDashboard/UserDashboard";

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
            <AdminDashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <AdminOverviews />,
          },
          {
            path: "users",
            element: <AdminUserManagement />,
          },

          {
            path: "products",
            element: <AdminProductsManagement />,
          },
          {
            path: "orders",
            element: <AdminOrderManagement />,
          },
          {
            path: "profile",
            element: <AdminProfileManagement />,
          },
        ],
      },
      {
        path: "/user/dashboard",
        element: (
          <ProtectedRoute roles={[USER_ROLES.USER]}>
            <UserDashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <UserOverviews />,
          },
          {
            path: "orders",
            element: <UserOrderManagement />,
          },
          {
            path: "profile",
            element: <UserProfileManagement />,
          },
        ],
      },
    ],
  },
]);

export default router;
