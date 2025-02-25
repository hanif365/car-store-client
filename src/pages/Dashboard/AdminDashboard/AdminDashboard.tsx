import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("");
  const dispatch = useAppDispatch();


  return (
    <div className="flex">
      <aside className="w-64 bg-white text-black p-5 overflow-y-auto h-screen">
        <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
        <nav>
          <ul>
            <li className="pb-2">
              <Link
                to="/admin/dashboard"
                className={`block py-3 px-4 rounded-lg font-semibold hover:bg-[#d5e6fb62] hover:text-[#0062ffb9] ${
                  activeTab === "overviews" || activeTab === ""
                    ? "bg-[#D5E6FB] text-[#0060FF]"
                    : ""
                }`}
                onClick={() => setActiveTab("overviews")}
              >
                Overviews
              </Link>
            </li>
            <li className="pb-2">
              <Link
                to="/admin/dashboard/users"
                className={`block py-3 px-4 rounded-lg font-semibold hover:bg-[#d5e6fb62] hover:text-[#0062ffb9] ${
                  activeTab === "users" ? "bg-[#D5E6FB] text-[#0060FF]" : ""
                }`}
                onClick={() => setActiveTab("users")}
              >
                Manage Users
              </Link>
            </li>
            <li className="pb-2">
              <Link
                to="/admin/dashboard/products"
                className={`block py-3 px-4 rounded-lg font-semibold hover:bg-[#d5e6fb62] hover:text-[#0062ffb9] ${
                  activeTab === "products" ? "bg-[#D5E6FB] text-[#0060FF]" : ""
                }`}
                onClick={() => setActiveTab("products")}
              >
                Manage Products
              </Link>
            </li>
            <li className="pb-2">
              <Link
                to="/admin/dashboard/orders"
                className={`block py-3 px-4 rounded-lg font-semibold hover:bg-[#d5e6fb62] hover:text-[#0062ffb9] ${
                  activeTab === "orders" ? "bg-[#D5E6FB] text-[#0060FF]" : ""
                }`}
                onClick={() => setActiveTab("orders")}
              >
                Manage Orders
              </Link>
            </li>
            <li className="pb-2">
              <Link
                to="/admin/dashboard/profile"
                className={`block py-3 px-4 rounded-lg  font-semibold hover:bg-[#d5e6fb62] hover:text-[#0062ffb9] ${
                  activeTab === "profile" ? "bg-[#D5E6FB] text-[#0060FF]" : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </Link>
            </li>
            <hr
              className={`my-5 border-t-2 dark:border-[#ffffff1a] border-gray-200 mx-5 `}
            />
            <li className="pb-2">
              <Link
                to="/"
                className={`block py-3 px-4 rounded-lg  font-semibold hover:bg-red-100 hover:text-[#0062ffb9]`}
                onClick={() => dispatch(logout())}
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
