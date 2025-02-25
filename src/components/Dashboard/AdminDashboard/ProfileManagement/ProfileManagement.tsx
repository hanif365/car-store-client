import { useState } from "react";
import { useGetUsersQuery, useUpdateUserStatusMutation, useUpdateUserProfileMutation } from "@/redux/features/user/userApi";
import { toast } from "sonner";

const ProfileManagement = () => {
  const { data: usersData, isLoading } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });   
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [profileData, setProfileData] = useState({ name: "", email: "", isActive: true });

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setProfileData({ name: user.name, email: user.email, isActive: user.isActive });
  };

  const handleStatusChange = async (userId, isActive) => {
    try {
      await updateUserStatus({ id: userId, data: { isActive } }).unwrap();
      toast.success("User status updated successfully");
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Something went wrong");
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ id: selectedUser._id, data: profileData }).unwrap();
      toast.success("User profile updated successfully");
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Something went wrong");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Manage User Profiles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {usersData?.data?.data?.map((user) => (
          <div key={user._id} className="border p-4 rounded">
            <h3 className="font-bold">{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Status: {user.isActive ? "Active" : "Inactive"}</p>
            <button onClick={() => handleUserSelect(user)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
            <button onClick={() => handleStatusChange(user._id, !user.isActive)} className="bg-red-500 text-white px-2 py-1 rounded">
              {user.isActive ? "Deactivate" : "Activate"}
            </button>
          </div>
        ))}
      </div>

      {selectedUser && (
        <form onSubmit={handleProfileUpdate} className="mt-6">
          <h3 className="text-lg font-bold">Update Profile for {selectedUser.name}</h3>
          <div>
            <input
              type="text"
              placeholder="Name"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update Profile</button>
        </form>
      )}
    </div>
  );
};

export default ProfileManagement;