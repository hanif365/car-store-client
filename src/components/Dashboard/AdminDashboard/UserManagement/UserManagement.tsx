import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { useState } from "react";

// import { IUser } from "@/types/user.types";
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
    error,
  } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateUser] = useUpdateUserMutation();
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  console.log("usersData", usersData);

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

  console.log("error", error);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading users...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        Error loading users
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-full">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
        User Management
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {usersData?.data?.map((user: User) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 truncate max-w-[120px] md:max-w-none">
                    {user.email}
                  </td>
                  <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 hidden sm:table-cell">
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
                  <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
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
                  <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 hidden md:table-cell">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm">
                    <button
                      onClick={() => handleToggleStatus(user)}
                      disabled={updatingUserId === user._id}
                      className={`px-2 py-1 md:px-4 md:py-2 rounded text-white text-xs md:text-sm ${
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
