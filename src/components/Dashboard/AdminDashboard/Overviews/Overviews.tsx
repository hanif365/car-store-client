import { useGetDashboardStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import {
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
  FaCar,
} from "react-icons/fa";
import { motion } from "framer-motion";
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
      <div className="min-h-[50vh] md:min-h-[60vh] lg:min-h-[calc(100vh-160px)] flex justify-center items-center p-4">
        <div className="text-red-500 text-base sm:text-lg md:text-xl text-center">
          Failed to load dashboard statistics
        </div>
      </div>
    );
  }

  const stats = statsData?.data || {
    totalUsers: 0,
    totalSoldProducts: 0,
    totalRevenue: 0,
    totalProducts: 0,
  };

  const demoMonthlySoldProducts = [5, 3, 4, 1, 2, 3, 4, 1, 2, 1, 3, 5];

  const monthlySoldProducts =
    statsData?.data?.monthlySoldProducts || demoMonthlySoldProducts;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-2 sm:px-1 py-3 sm:py-6 max-w-full">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Total Users Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="p-4 md:p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500">
                  Total Users
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
                  {stats.totalUsers}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaUsers className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-blue-50 px-4 md:px-5 py-2">
            <span className="text-xs font-medium text-blue-600">
              All registered users
            </span>
          </div>
        </motion.div>

        {/* Products Sold Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="p-4 md:p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500">
                  Cars Sold
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
                  {stats.totalSoldProducts}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-green-50 px-4 md:px-5 py-2">
            <span className="text-xs font-medium text-green-600">
              Total cars sold to date
            </span>
          </div>
        </motion.div>

        {/* Total Revenue Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="p-4 md:p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500">
                  Total Revenue
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaMoneyBillWave className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-purple-50 px-4 md:px-5 py-2">
            <span className="text-xs font-medium text-purple-600">
              Total sales revenue
            </span>
          </div>
        </motion.div>

        {/* Total Products Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="p-4 md:p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500">
                  Cars in Inventory
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
                  {stats.totalProducts}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaCar className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-orange-50 px-4 md:px-5 py-2">
            <span className="text-xs font-medium text-orange-600">
              Available cars for sale
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts and Tables Section */}
      <div className="mt-4 sm:mt-6 md:mt-8 space-y-4 sm:space-y-6 md:space-y-8">
        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="w-full h-[300px] sm:h-[400px] bg-white p-4 rounded-xl shadow-sm">
            <MonthlySalesDoughnut monthlySoldProducts={monthlySoldProducts} />
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <RecentOrdersTable />
        </div>
      </div>
    </div>
  );
};

export default AdminOverviews;
