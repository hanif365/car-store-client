import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { useState } from "react";
import Loader from "@/components/Shared/Loader/Loader";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

const UserManagement = () => {
  const {
    data: usersData,
    isLoading,
    isError,
  } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateUser] = useUpdateUserMutation();
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const handleToggleStatus = async (user: User) => {
    try {
      setUpdatingUserId(user._id);
      await updateUser({
        id: user._id,
        data: { isActive: !user.isActive },
      }).unwrap();

      toast.success(
        `User ${user.name} ${
          user.isActive ? "deactivated" : "activated"
        } successfully`
      );
    } catch (error) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to update user status"
      );
    } finally {
      setUpdatingUserId(null);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        Error loading users
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-1 py-3 sm:py-6 max-w-full">
      {/* Mobile View */}
      <div className="block sm:hidden space-y-4">
        {usersData?.data?.map((user: User) => (
          <div key={user._id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500 break-all">{user.email}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  user.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {user.role}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleToggleStatus(user)}
                disabled={updatingUserId === user._id}
                className={`px-3 py-1.5 rounded text-white text-xs ${
                  updatingUserId === user._id
                    ? "bg-gray-400 cursor-not-allowed"
                    : user.isActive
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {updatingUserId === user._id
                  ? "Updating..."
                  : user.isActive
                  ? "Deactivate"
                  : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded-lg shadow">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Created At
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {usersData?.data?.map((user: User) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 lg:px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-4 lg:px-6 py-3 whitespace-nowrap text-sm text-gray-500 truncate max-w-[200px]">
                    {user.email}
                  </td>
                  <td className="px-4 lg:px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-3 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 lg:px-6 py-3 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleToggleStatus(user)}
                      disabled={updatingUserId === user._id}
                      className={`px-3 py-1.5 rounded text-white text-sm transition-colors ${
                        updatingUserId === user._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : user.isActive
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {updatingUserId === user._id
                        ? "Updating..."
                        : user.isActive
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
