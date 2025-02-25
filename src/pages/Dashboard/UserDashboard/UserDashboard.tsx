import { logout } from "@/redux/features/auth/authSlice";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("");
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());    
  };


  return (
    <div className="flex">
      <aside className="w-64 bg-white text-black p-5 overflow-y-auto h-screen">
        <h1 className="text-2xl font-bold mb-5">User Dashboard</h1>
        <nav>
          <ul>
            <li className="pb-2">
              <Link
                to="/user/dashboard"
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
                to="/user/dashboard/orders"
                className={`block py-3 px-4 rounded-lg font-semibold hover:bg-[#d5e6fb62] hover:text-[#0062ffb9] ${
                  activeTab === "products" ? "bg-[#D5E6FB] text-[#0060FF]" : ""
                }`}
                onClick={() => setActiveTab("products")}
              >
                Orders
              </Link>
            </li>
            <li className="pb-2">
              <Link
                to="/user/dashboard/profile"
                className={`block py-3 px-4 rounded-lg font-semibold hover:bg-[#d5e6fb62] hover:text-[#0062ffb9] ${
                  activeTab === "orders" ? "bg-[#D5E6FB] text-[#0060FF]" : ""
                }`}
                onClick={() => setActiveTab("orders")}
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
                onClick={handleLogout}
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

export default UserDashboard;
