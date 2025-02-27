import DashboardNavbar from "@/components/Dashboard/DashboardNavbar/DashboardNavbar";
import { selectIsSidebarOpen } from "@/redux/features/layout/layoutSlice";
import { useAppSelector } from "@/redux/hooks";
import { handleLogoutUtilFunction } from "@/utils/auth";
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const UserDashboard = () => {
  const location = useLocation();
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    setActiveTab(path === 'dashboard' || !path ? 'overviews' : path);
  }, [location.pathname]);

  const handleLogout = () => {
    handleLogoutUtilFunction();
  };

  return (
    <div className="flex min-h-screen bg-[#F5FAF8]">
      <aside 
        className={`fixed top-0 left-0 h-full bg-white text-black p-5 overflow-y-auto border-r border-gray-200 shadow-lg transition-all duration-300 ${
          isSidebarOpen ? 'w-72' : 'w-0 -translate-x-full'
        }`}
      >
        <h1 className="text-2xl font-bold mb-5 text-center">User Dashboard</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/user/dashboard"
                className={`block py-3 px-4 rounded-lg font-semibold transition-colors duration-200 hover:bg-[#d5e6fb62] hover:text-[#0062ffb9] ${
                  activeTab === "overviews" ? "bg-[#D5E6FB] text-[#0060FF]" : ""
                }`}
                onClick={() => setActiveTab("overviews")}
              >
                Overviews
              </Link>
            </li>
            {["orders", "profile"].map((tab) => (
              <li key={tab}>
                <Link
                  to={`/user/dashboard/${tab}`}
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
      <div className={`flex-1 ${isSidebarOpen ? 'ml-72' : 'ml-0'} transition-all duration-300`}>
        <DashboardNavbar />
        <main className="p-5 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
