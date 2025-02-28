import DashboardNavbar from "@/components/Dashboard/DashboardNavbar/DashboardNavbar";
import { logout } from "@/redux/features/auth/authSlice";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { selectIsSidebarOpen } from "@/redux/features/layout/layoutSlice";
import { FaChartBar, FaUsers, FaShoppingCart, FaUserCircle, FaSignOutAlt, FaCar } from "react-icons/fa";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);
  const [activeTab, setActiveTab] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    setActiveTab(path === 'dashboard' || !path ? 'overviews' : path);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  const navItems = [
    { id: 'overviews', label: 'Overviews', icon: <FaChartBar />, path: '/admin/dashboard' },
    { id: 'users', label: 'Users', icon: <FaUsers />, path: '/admin/dashboard/users' },
    { id: 'products', label: 'Products', icon: <FaCar />, path: '/admin/dashboard/products' },
    { id: 'orders', label: 'Orders', icon: <FaShoppingCart />, path: '/admin/dashboard/orders' },
    { id: 'profile', label: 'Profile', icon: <FaUserCircle />, path: '/admin/dashboard/profile' },
  ];

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  const carText = "Car Store".split("");

  return (
    <div className="flex min-h-screen bg-[#F5FAF8]">
      <aside 
        className={`fixed top-0 left-0 z-40 h-full bg-white text-black p-3 sm:p-5 overflow-y-auto border-r border-gray-200 shadow-lg transition-all duration-300 ${
          isSidebarOpen ? 'w-16 md:w-72' : 'w-0 -translate-x-full'
        }`}
      >
        <div className="items-center gap-2 mb-6 px-1 hidden md:flex">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaCar className="text-3xl text-blue-600" />
          </motion.div>
          <div className="flex">
            {carText.map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className={`text-2xl font-bold ${
                  letter === " " ? "mr-2" : ""
                } ${
                  index < 3 ? "text-blue-600" : "text-purple-600"
                }`}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        <nav>
          <ul className="space-y-1 sm:space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`block py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-semibold transition-colors duration-200 hover:bg-[#d5e6fb62] hover:text-[#0062ffb9] ${
                    activeTab === item.id ? "bg-[#D5E6FB] text-[#0060FF]" : ""
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <div className="flex items-center">
                    <span className="text-lg md:text-base">{item.icon}</span>
                    <span className={`ml-3 ${isMobile ? 'hidden' : 'hidden md:inline'}`}>
                      {item.label}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
            <hr className="my-3 sm:my-5 border-t-2 border-gray-200" />
            <li>
              <Link
                to="/"
                className="block py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-semibold text-red-600 hover:bg-red-100"
                onClick={handleLogout}
              >
                <div className="flex items-center">
                  <span className="text-lg md:text-base"><FaSignOutAlt /></span>
                  <span className={`ml-3 ${isMobile ? 'hidden' : 'hidden md:inline'}`}>
                    Logout
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div 
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-16 md:ml-72' : 'ml-0'
        }`}
      >
        <DashboardNavbar />
        <main className="p-3 sm:p-5 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
