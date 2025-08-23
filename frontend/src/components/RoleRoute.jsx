import { Navigate } from "react-router";
import { useSelector } from "react-redux";

function RoleRoute({ children, roles }) {
  const { user } = useSelector((state) => state.auth);

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Logged in but role not allowed → unauthorized
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleRoute;
