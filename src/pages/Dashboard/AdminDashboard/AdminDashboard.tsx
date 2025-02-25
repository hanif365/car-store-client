import { logout } from "@/redux/features/auth/authSlice";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Extract the last part of the path to set the active tab
    const path = location.pathname.split('/').pop();
    setActiveTab(path === 'dashboard' || !path ? 'overviews' : path);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  return (
    <div className="flex">
      <aside className="fixed w-72 bg-white text-black p-5 overflow-y-auto h-screen border-gray-200 shadow-lg">
        <h1 className="text-2xl font-bold mb-5 text-center">Admin Dashboard</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/dashboard"
                className={`block py-3 px-4 rounded-lg font-semibold transition-colors duration-200 hover:bg-[#d5e6fb62] hover:text-[#0062ffb9] ${
                  activeTab === "overviews" ? "bg-[#D5E6FB] text-[#0060FF]" : ""
                }`}
                onClick={() => setActiveTab("overviews")}
              >
                Overviews
              </Link>
            </li>
            {["users", "products", "orders", "profile"].map((tab) => (
              <li key={tab}>
                <Link
                  to={`/admin/dashboard/${tab}`}
                  className={`block py-3 px-4 rounded-lg font-semibold transition-colors duration-200 hover:bg-[#d5e6fb62] hover:text-[#0062ffb9] ${
                    activeTab === tab ? "bg-[#D5E6FB] text-[#0060FF]" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Link>
              </li>
            ))}
            <hr className="my-5 border-t-2 border-gray-200" />
            <li>
              <Link
                to="/"
                className="block py-3 px-4 rounded-lg font-semibold text-red-600 hover:bg-red-100"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-5 bg-[#F5FAF8] ml-72">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
