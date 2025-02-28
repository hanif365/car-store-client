import { Link } from "react-router-dom";

interface Order {
  _id: string;
  totalPrice: number;
  status: string;
  paymentStatus: string;
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
        <h4 className="text-base sm:text-lg md:text-xl font-medium">Recent Orders</h4>
        <Link
          to="/user/dashboard/orders"
          className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm md:text-base font-medium"
        >
          View All Orders
        </Link>
      </div>

      {/* Mobile view - Card layout */}
      <div className="md:hidden space-y-4">
        {recentOrders.map((order) => (
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
                <span className="text-xs text-gray-600">Total:</span>
                <span className="text-sm font-medium">{formatCurrency(order.totalPrice)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Status:</span>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
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
            </div>
          </div>
        ))}
        {recentOrders.length === 0 && (
          <div className="text-center py-4 text-sm text-gray-500">
            No orders found
          </div>
        )}
      </div>

      {/* Desktop view - Table layout */}
      <div className="hidden md:block overflow-x-auto -mx-2 sm:mx-0">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Payment Status
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs lg:text-sm">
                  <Link
                    to={`/order/verification?order_id=${order?.transaction?.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {order._id.substring(order._id.length - 8)}
                  </Link>
                </td>
                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs lg:text-sm">
                  {formatCurrency(order.totalPrice)}
                </td>
                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs lg:text-sm">
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
                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs lg:text-sm">
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
                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs lg:text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {recentOrders.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 sm:px-6 py-4 text-center text-xs lg:text-sm text-gray-500"
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