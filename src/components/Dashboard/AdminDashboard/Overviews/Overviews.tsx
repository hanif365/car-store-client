import { useGetDashboardStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import {
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
  FaCar,
} from "react-icons/fa";
import { motion } from "framer-motion";
import SalesBarChart from "./SalesBarChart";
import MonthlySalesDoughnut from "./MonthlySalesDoughnut";
import RecentOrdersTable from "./RecentOrdersTable";
import Loader from "@/components/Shared/Loader/Loader";

const AdminOverviews = () => {
  const {
    data: statsData,
    isLoading,
    error,
  } = useGetDashboardStatsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Animation variants for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="h-[calc(100vh-160px)] flex justify-center items-center">
        <div className="text-red-500 text-xl">
          Failed to load dashboard statistics
        </div>
      </div>
    );
  }

  // Check the full structure of statsData to debug
  console.log("Full statsData response:", statsData);

  const stats = statsData?.data || {
    totalUsers: 0,
    totalSoldProducts: 0,
    totalRevenue: 0,
    totalProducts: 0,
  };

  // Create fallback monthly data for demonstration
  const demoMonthlySales = [15, 8, 10, 3, 5, 7, 10, 3, 5, 2, 10, 13];
  const demoMonthlySoldProducts = [5, 3, 4, 1, 2, 3, 4, 1, 2, 1, 3, 5];
  
  // Try to access monthlySales and monthlySoldProducts from different possible locations in the response
  const monthlySales = statsData?.data?.monthlySales || demoMonthlySales;
  const monthlySoldProducts = statsData?.data?.monthlySoldProducts || demoMonthlySoldProducts;
  
  console.log("Using monthly sales data:", monthlySales);
  console.log("Using monthly sold products data:", monthlySoldProducts);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="px-1 py-6 max-w-full">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Total Users Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stats.totalUsers}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUsers className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-blue-50 px-5 py-2">
            <span className="text-xs font-medium text-blue-600">
              All registered users
            </span>
          </div>
        </motion.div>

        {/* Products Sold Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Cars Sold</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stats.totalSoldProducts}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaShoppingCart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-green-50 px-5 py-2">
            <span className="text-xs font-medium text-green-600">
              Total cars sold to date
            </span>
          </div>
        </motion.div>

        {/* Total Revenue Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FaMoneyBillWave className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-purple-50 px-5 py-2">
            <span className="text-xs font-medium text-purple-600">
              Total sales revenue
            </span>
          </div>
        </motion.div>

        {/* Total Products Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Cars in Inventory
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stats.totalProducts}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FaCar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-orange-50 px-5 py-2">
            <span className="text-xs font-medium text-orange-600">
              Available cars for sale
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts section - side by side on larger screens */}
      <div className="mt-6 flex flex-col lg:flex-row gap-6">
        {/* Sales revenue chart */}
        {/* <SalesBarChart monthlySales={monthlySales} /> */}
        
        {/* Monthly car sales doughnut chart */}
        <MonthlySalesDoughnut monthlySoldProducts={monthlySoldProducts} />
      </div>

      {/* Recent Orders Table */}
      <RecentOrdersTable />
    </div>
  );
};

export default AdminOverviews;
