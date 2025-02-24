import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { fetchUsers, deleteUser } from "@/redux/features/user/userApi"; // Adjust the import based on your structure

const UserManagement = () => {
  const dispatch = useAppDispatch();
//   const users = useAppSelector((state) => state.user.users);

//   React.useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const handleDeleteUser = (userId) => {
//     dispatch(deleteUser(userId));
//   };

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      {/* <ul>
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center mb-2">
            <span>{user.name} - {user.email}</span>
            <button onClick={() => handleDeleteUser(user.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default UserManagement; 