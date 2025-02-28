/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/order/orderApi";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Loader from "@/components/Shared/Loader/Loader";
import { useState } from "react";
import Pagination from "@/components/Shared/Pagination/Pagination";

const OrderManagement = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  const { data: ordersData, isLoading } = useGetOrdersQuery(filters, {
    refetchOnMountOrArgChange: true,
  });

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus({
        id: orderId,
        data: { status: newStatus },
      }).unwrap();
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Something went wrong"
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const totalPages = Math.ceil(
    (ordersData?.data?.meta?.total || 0) / (ordersData?.data?.meta?.limit || 10)
  );

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  return (
    <div className="container mx-auto px-2 sm:px-1 py-3 sm:py-6 max-w-full">
      {/* Mobile view - Card layout */}
      <div className="md:hidden space-y-4">
        {ordersData?.data?.data?.map((order: any) => (
          <div key={order._id} className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <Link
                to={`/order/verification?order_id=${order?.transaction?.id}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                #{order._id.substring(order._id.length - 8)}
              </Link>
              <span className="text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">User:</span>
                <span className="text-sm font-medium">{order?.user?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Total:</span>
                <span className="text-sm font-medium">${order?.totalPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Payment:</span>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-800"
                      : order.paymentStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Status:</span>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className={`px-2 py-1 text-xs font-semibold rounded-full border-0 ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "Processing"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "Shipped"
                      ? "bg-indigo-100 text-indigo-800"
                      : order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view - Table layout */}
      <div className="hidden md:block overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ordersData?.data?.data?.map((order: any) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                      <Link
                        to={`/order/verification?order_id=${order?.transaction?.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {order._id.substring(order._id.length - 8)}
                      </Link>
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                      {order?.user?.name}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                      ${order?.totalPrice}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-800"
                            : order.paymentStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`px-2 py-1 text-xs font-semibold rounded-full border-0 ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Shipped"
                            ? "bg-indigo-100 text-indigo-800"
                            : order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6">
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default OrderManagement;
