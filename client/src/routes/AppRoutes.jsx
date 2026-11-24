
import { Routes, Route, Navigate } from "react-router-dom";

// Public pages
import Home from "../components/pages/Home.jsx";
import Opportunities from "../components/pages/Opportunities.jsx";
import Login from "../components/pages/Login.jsx";
import Register from "../components/pages/Register.jsx";
import RoleSelection from "../components/pages/RoleSelection.jsx";
import OrganizationRegister from "../components/pages/OrganizationRegister.jsx";
import CloudinaryTest from "../components/pages/CloudinaryTest.jsx";

// Student pages
import Report from "../components/pages/Report.jsx";
import Dashboard from "../components/pages/Dashboard.jsx";
import Support from "../components/pages/Support.jsx";

// Organization pages
import OrganizationDashboard from "../organization/OrganizationDashboard.jsx";
import MyOpportunities from "../organization/MyOpportunities.jsx";
import Applications from "../organization/Applications.jsx";
import OrganizationProfile from "../organization/OrganizationProfile.jsx";
import OrganizationSettings from "../organization/OrganizationSettings.jsx";

// Layout
import MainLayout from "../components/layout/MainLayout";

// Authentication
import ProtectedRoute from "./ProtectedRoute";
import useAuth from "../hooks/useAuth";

// Redirect based on account role
function getDashboardPath(user) {
  return user?.role === "organization"
    ? "/organization/dashboard"
    : "/dashboard";
}

// Guest-only pages
function GuestRoute({ children }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={getDashboardPath(user)} replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC PAGES */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<RoleSelection />} />
        <Route path="/opportunities" element={<Opportunities />} />
      </Route>

      {/* GUEST PAGES */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      <Route
        path="/organization-register"
        element={
          <GuestRoute>
            <OrganizationRegister />
          </GuestRoute>
        }
      />

      <Route path="/cloudinary-test" element={<CloudinaryTest />} />

      {/* STUDENT ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/support" element={<Support />} />
        </Route>
      </Route>

      {/* ORGANIZATION ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["organization"]} />}>
        <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
        <Route path="/organization/opportunities" element={<MyOpportunities />} />
        <Route path="/organization/applications" element={<Applications />} />
        <Route path="/organization/profile" element={<OrganizationProfile />} />
        <Route path="/organization/settings" element={<OrganizationSettings />} />
      </Route>

      {/* UNKNOWN ROUTES */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}
