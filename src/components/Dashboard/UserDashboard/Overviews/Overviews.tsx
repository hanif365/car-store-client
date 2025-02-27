/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetMyOrdersQuery } from "@/redux/features/order/orderApi";
import {
  FaShoppingBag,
  FaMoneyBillWave,
  FaShippingFast,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Loader from "@/components/Shared/Loader/Loader";
import RecentOrdersTable from "./RecentOrdersTable";

const UserOverviews = () => {
  const { data: ordersData, isLoading, error } = useGetMyOrdersQuery(undefined, {
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

  const orders = ordersData?.data?.data || [];

  // Calculate statistics
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((acc: number, order: any) => acc + (order.totalPrice || 0), 0);
  const activeOrders = orders.filter((order: any) => 
    ["Pending", "Processing", "Shipped"].includes(order.status)
  ).length;
  const deliveredOrders = orders.filter((order: any) => order.status === "Delivered").length;

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
        {/* Total Orders Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {totalOrders}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-blue-50 px-5 py-2">
            <span className="text-xs font-medium text-blue-600">
              All your orders
            </span>
          </div>
        </motion.div>

        {/* Total Spent Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Spent</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {formatCurrency(totalSpent)}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaMoneyBillWave className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-green-50 px-5 py-2">
            <span className="text-xs font-medium text-green-600">
              Total amount spent
            </span>
          </div>
        </motion.div>

        {/* Active Orders Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Orders</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {activeOrders}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FaShippingFast className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-purple-50 px-5 py-2">
            <span className="text-xs font-medium text-purple-600">
              Orders in progress
            </span>
          </div>
        </motion.div>

        {/* Delivered Orders Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Delivered Orders
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {deliveredOrders}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FaCheckCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-orange-50 px-5 py-2">
            <span className="text-xs font-medium text-orange-600">
              Completed orders
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Orders Table */}
      <div className="mt-6">
        <RecentOrdersTable orders={orders.slice(0, 5)} />
      </div>
    </div>
  );
};

export default UserOverviews;