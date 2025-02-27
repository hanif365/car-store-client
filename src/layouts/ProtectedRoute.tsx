import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, selectCurrentToken } from "../redux/features/auth/authSlice";

import { Navigate } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";
import { JwtPayload } from "jwt-decode";

type TProtectedRoute = {
  children: ReactNode;
  roles: string[] | undefined; // Changed to accept multiple roles
};

type CustomJwtPayload = JwtPayload & {
  role: string | undefined;
};

const ProtectedRoute = ({ children, roles }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);

  let loginUser;

  if (token) {
    loginUser = verifyToken(token) as CustomJwtPayload;
  }

  console.log("loginUser from ProtectedRoute", loginUser);
  console.log("token from ProtectedRoute", token);

  const dispatch = useAppDispatch();

  // check user role is in the allowed roles
  if (roles !== undefined && !roles.includes(loginUser?.role as string)) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
