import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/features/auth/authSlice";

import { Navigate } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";
import { JwtPayload } from "jwt-decode";
import { handleLogoutUtilFunction } from "@/utils/auth";

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

  // check user role is in the allowed roles
  if (roles !== undefined && !roles.includes(loginUser?.role as string)) {
    handleLogoutUtilFunction();
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
