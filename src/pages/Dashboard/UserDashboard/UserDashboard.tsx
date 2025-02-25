import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white h-screen p-5">
        <h1 className="text-2xl font-bold mb-5">User Dashboard</h1>
        <nav>
          <ul>
            <li>
              <Link
                to="/user/dashboard"
                className={`block py-2 px-4 rounded hover:bg-gray-700 ${
                  activeTab === "overviews" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveTab("overviews")}
              >
                Overviews
              </Link>
            </li>

            <li>
              <Link
                to="/user/dashboard/orders"
                className={`block py-2 px-4 rounded hover:bg-gray-700 ${
                  activeTab === "orders" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveTab("orders")}
              >
                Manage Orders
              </Link>
            </li>
            <li>
              <Link
                to="/user/dashboard/profile"
                className={`block py-2 px-4 rounded hover:bg-gray-700 ${
                  activeTab === "profile" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                User Profile
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
