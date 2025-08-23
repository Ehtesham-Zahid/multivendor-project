import { Navigate } from "react-router";
import { useSelector } from "react-redux";

function RoleRoute({ children, roles }) {
  const { user, isLoading, isInitialized } = useSelector((state) => state.auth);

  // Show loading while checking authentication
  if (isLoading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Logged in but role not allowed → unauthorized
  if (roles && (!user.role || !roles.includes(user.role))) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleRoute;
