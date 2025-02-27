/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/order/orderApi";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const RecentOrdersTable = () => {
  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // Get last 5 orders
  const recentOrders = ordersData?.data?.data?.slice(-5) || [];

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

  if (ordersLoading) {
    return <div className="text-center py-4">Loading recent orders...</div>;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
        <h4 className="text-lg font-medium">Recent Orders</h4>
        <Link
          to="/admin/dashboard/orders"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View All Orders
        </Link>
      </div>
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="hidden sm:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="hidden md:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order: any) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                    <Link
                      to={`/order/verification?order_id=${order?.transaction?.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {order._id.substring(order._id.length - 8)}
                    </Link>
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                    {order?.user?.name}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                    {formatCurrency(order?.totalPrice || 0)}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
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
                      {order.status}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                    {new Date(
                      order._id.getTimestamp?.() ||
                        order.createdAt ||
                        Date.now()
                    ).toLocaleDateString()}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="block w-full sm:w-auto px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none cursor-pointer hover:border-gray-400 transition-colors duration-200"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {(!recentOrders || recentOrders.length === 0) && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 sm:px-6 py-2 sm:py-4 text-center text-xs sm:text-sm text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
