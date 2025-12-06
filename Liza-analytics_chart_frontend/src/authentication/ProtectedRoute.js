import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { token, user } = useContext(AuthContext);

  if (!token || !user) {
    // 🚨 Not logged in = redirect to login
    return <Navigate to="/authentication/sign-in" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // 🚨 User role not allowed = redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Token exists and role allowed = show page
  return children;
};

export default ProtectedRoute;
