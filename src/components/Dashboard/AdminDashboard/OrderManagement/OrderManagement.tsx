/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/order/orderApi";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Loader from "@/components/Shared/Loader/Loader";


const OrderManagement = () => {
  const { data: ordersData, isLoading } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  console.log("ordersData", ordersData);

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

  return (
    <div className="container mx-auto px-1 py-6 max-w-full">
      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {ordersData?.data?.data?.map((order: any) => (
            <tr key={order._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Link
                  to={`/order/verification?order_id=${order?.transaction?.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {order._id.substring(order._id.length - 8)}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{order?.user?.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order?.totalPrice}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(
                  order._id.getTimestamp?.() || order.createdAt || Date.now()
                ).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 space-x-2 whitespace-nowrap text-sm text-gray-500">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="block px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none cursor-pointer hover:border-gray-400 transition-colors duration-200"
                >
                  <option value="Pending" className="py-1">
                    Pending
                  </option>
                  <option value="Processing" className="py-1">
                    Processing
                  </option>
                  <option value="Shipped" className="py-1">
                    Shipped
                  </option>
                  <option value="Delivered" className="py-1">
                    Delivered
                  </option>
                  <option value="Cancelled" className="py-1">
                    Cancelled
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
