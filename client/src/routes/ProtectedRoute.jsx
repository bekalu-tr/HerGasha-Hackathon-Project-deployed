
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // 1. Wait for authentication verification
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pinkBg">
        <p className="text-plum font-semibold">
          Loading Her Gasha...
        </p>
      </div>
    );
  }

  // 2. Redirect users who are not authenticated
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // 3. Determine the correct dashboard
  const dashboard =
    user.role === "organization"
      ? "/organization/dashboard"
      : "/dashboard";

  // 4. Prevent users from accessing unauthorized pages
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to={dashboard}
        replace
      />
    );
  }

  // 5. Allow authorized users to access the requested page
  return <Outlet />;
}
