import { Link } from "react-router-dom";

interface Order {
  _id: string;
  totalPrice: number;
  status: string;
  transaction?: {
    id: string;
  };
  createdAt: string;
}

interface RecentOrdersTableProps {
  orders: Order[];
}

const RecentOrdersTable = ({ orders }: RecentOrdersTableProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Get only the last 5 orders
  const recentOrders = orders.slice(-5) || [];

  return (
    <div className="bg-white rounded-lg shadow-sm p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
        <h4 className="text-lg font-medium">Recent Orders</h4>
        <Link
          to="/user/dashboard/orders"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View All Orders
        </Link>
      </div>
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentOrders.map((order) => (
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
                  {formatCurrency(order.totalPrice)}
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
                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {recentOrders.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 sm:px-6 py-4 text-center text-sm text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;